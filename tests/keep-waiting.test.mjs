import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {decide, REASON, readTranscript} from '../claude/hooks/keep-waiting.mjs';

const line = entry => JSON.stringify(entry);
const assistant = (name, input, id = 'call') => line({type: 'assistant', message: {role: 'assistant', content: [{type: 'tool_use', id, name, input}]}});
const result = (id, content) => line({type: 'user', message: {role: 'user', content: [{type: 'tool_result', tool_use_id: id, content}]}});
const player = text => line({type: 'user', message: {role: 'user', content: text}});
const resume = (purpose, name = 'mcp__plugin_seed_seed__resume_play') => assistant(name, {purpose});
const notified = id => player(`<task-notification>\n<task-id>${id}</task-id>\n<status>completed</status>\n</task-notification>`);
const queued = id => line({type: 'attachment', attachment: {type: 'queued_command', prompt: `<task-notification>\n<task-id>${id}</task-id>\n<tool-use-id>toolu_1</tool-use-id>\n</task-notification>`}});
const answer = (lines, extra = {}) => decide({transcript_path: 't', ...extra}, () => lines);

const wait = id => assistant('mcp__plugin_seed_seed__wait_for_events', {}, id);
const reminded = player(`Stop hook feedback:\n${REASON}`);

test('ongoing play with nothing running is sent back to wait', () => {
  const lines = [resume('ongoing_play'), wait('w'), result('w', [{type: 'text', text: '{"status":"event"}'}])];
  assert.deepEqual(answer(lines), {decision: 'block', reason: REASON});
});

test('after a reminder, another wait keeps the chat going and a plain reply ends it', () => {
  const start = [resume('ongoing_play'), wait('w'), result('w', 'quiet'), reminded];
  assert.equal(answer(start, {stop_hook_active: true}), null, 'The agent declined');
  const again = [...start, wait('x'), result('x', 'quiet')];
  assert.ok(answer(again, {stop_hook_active: true}), 'It obeyed, so this is a new stop');
  assert.equal(answer([...again, reminded], {stop_hook_active: true}), null, 'And it can decline the next one');
});

test('other chats end as they like', () => {
  assert.equal(answer([]), null, 'Not a SEED chat');
  assert.equal(answer([assistant('Bash', {command: 'ls'})]), null);
  for (const purpose of ['one_request', 'one_project', undefined]) assert.equal(answer([resume(purpose)]), null);
  assert.equal(answer([resume('ongoing_play'), resume('one_request')]), null, 'The latest request decides');
  assert.ok(answer([resume('one_request'), resume('ongoing_play')]));
  assert.ok(answer([resume('ongoing_play', 'mcp__seed__resume_play')]), 'However the server is named');
  assert.equal(answer([resume('ongoing_play', 'mcp__other__resume_play')]), null);
});

test('the hook input says what is still due to wake the chat', () => {
  const lines = [resume('ongoing_play')];
  assert.ok(answer(lines, {background_tasks: [], session_crons: []}));
  assert.equal(answer(lines, {background_tasks: [{id: 'a', type: 'MCP task', status: 'running'}], session_crons: []}), null);
  assert.equal(answer(lines, {background_tasks: [], session_crons: [{id: 'c'}]}), null);
});

test('without that input, a backgrounded wait, command or helper counts until it reports', () => {
  for (const [id, text] of [
    ['kcx7lrvct', 'MCP tool "plugin:seed:seed/wait_for_events" was moved to the background as task kcx7lrvct so that a message that arrived while it was running can reach you'],
    ['bq7wneg2j', 'Command running in background with ID: bq7wneg2j. Output is being written to: x'],
    ['a3be6710f6b12ff4b', 'Async agent launched successfully. (Internal.)\nagentId: a3be6710f6b12ff4b (internal ID)'],
  ]) {
    const lines = [resume('ongoing_play'), result('b', [{type: 'text', text}])];
    assert.equal(answer(lines), null, text);
    assert.ok(answer([...lines, notified(id)]), `Reported as a message: ${text}`);
    assert.ok(answer([...lines, queued(id)]), `Reported as a queue entry: ${text}`);
    assert.equal(answer([...lines, notified('other')]), null, 'Another task does not count');
  }
  const two = [resume('ongoing_play'), result('a', 'Command running in background with ID: one.'), result('b', 'Command running in background with ID: two.'), notified('one')];
  assert.equal(answer(two), null, 'One is still due');
});

test('subagents and bad lines do not count', () => {
  const sidechain = line({type: 'assistant', isSidechain: true, message: {content: [{type: 'tool_use', id: 's', name: 'mcp__seed__resume_play', input: {purpose: 'ongoing_play'}}]}});
  assert.deepEqual(readTranscript([sidechain, 'not json', '', 'null']), {ongoing: false, obeyed: false, background: false});
});

test('the script answers on stdout and never fails a stop', () => {
  const script = new URL('../claude/hooks/keep-waiting.mjs', import.meta.url).pathname;
  const dir = mkdtempSync(join(tmpdir(), 'seed-hook-')), transcript = join(dir, 't.jsonl');
  writeFileSync(transcript, `${resume('ongoing_play')}\n`);
  const run = input => execFileSync(process.execPath, [script], {input}).toString();
  assert.equal(JSON.parse(run(JSON.stringify({transcript_path: transcript}))).decision, 'block');
  writeFileSync(transcript, `${resume('ongoing_play')}\n${reminded}\n`);
  assert.equal(run(JSON.stringify({transcript_path: transcript, stop_hook_active: true})), '');
  assert.equal(run(JSON.stringify({transcript_path: join(dir, 'missing')})), '');
  assert.equal(run('not json'), '');
});
