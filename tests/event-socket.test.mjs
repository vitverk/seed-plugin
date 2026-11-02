import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {decide} from '../claude/hooks/event-socket.mjs';

const url = 'wss://mcp.flaxa.app/events/socket?ticket=0a1b2c3d-1111-4222-8333-444455556666.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQ';
const monitor = (ws, extra = {}) => ({tool_name: 'Monitor', tool_input: {ws, description: 'SEED events', timeout_ms: 1800000, ...extra}});
const wait = args => ({tool_name: 'mcp__plugin_seed_seed__wait_for_events', tool_input: args});

test('a wait tells SEED this chat can open its socket, and keeps its arguments', () => {
  const {hookSpecificOutput: output} = decide(wait({cursor: 'c1', max_wait_seconds: 600}));
  assert.equal(output.hookEventName, 'PreToolUse');
  assert.deepEqual(output.updatedInput, {cursor: 'c1', max_wait_seconds: 600, monitor: true});
  assert.equal(output.permissionDecision, undefined, 'The usual permission check still applies to the wait');
});

test('an agent with no Monitor tool opts out, and other servers\' tools stay as they are', () => {
  assert.equal(decide(wait({cursor: 'c1', monitor: false})), null);
  assert.equal(decide({tool_name: 'mcp__other__wait_for_events', tool_input: {}}), null);
});

test('Monitor is allowed for SEED\'s own socket', () => {
  const {hookSpecificOutput: output} = decide(monitor({url}));
  assert.equal(output.permissionDecision, 'allow');
  assert.equal(output.updatedInput, undefined);
});

test('every other Monitor call gets the usual question', () => {
  for (const other of [
    'wss://mcp.flaxa.app/events/socket',
    `${url}&x=1`,
    url.replace('wss://mcp.flaxa.app', 'wss://mcp.flaxa.app.example.com'),
    url.replace('wss://mcp.flaxa.app', 'wss://example.com'),
    url.replace('wss://', 'ws://'),
    url.replace('/events/socket', '/mcp'),
    `${url}\n`,
  ]) assert.equal(decide(monitor({url: other})), null, other);
  assert.equal(decide(monitor({url, protocols: ['v1']})), null, 'Subprotocols are not part of the socket');
  assert.equal(decide(monitor({url}, {command: 'curl https://example.com'})), null, 'Never a command');
  assert.equal(decide({tool_name: 'Monitor', tool_input: {command: 'tail -f log', description: 'x', timeout_ms: 1000}}), null);
  assert.equal(decide({tool_name: 'Bash', tool_input: {ws: {url}}}), null);
});

test('anything unreadable leaves the call alone', () => {
  assert.equal(decide(undefined), null);
  assert.equal(decide({tool_name: 'Monitor'}), null);
  assert.equal(decide({tool_name: 'Monitor', tool_input: {ws: {url: 7}}}), null);
  const hook = new URL('../claude/hooks/event-socket.mjs', import.meta.url).pathname;
  assert.equal(execFileSync('node', [hook], {input: 'not json', encoding: 'utf8'}), '');
  assert.match(execFileSync('node', [hook], {input: JSON.stringify(monitor({url})), encoding: 'utf8'}), /"permissionDecision":"allow"/);
});
