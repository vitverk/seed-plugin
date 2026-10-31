#!/usr/bin/env node
// Stop hook. A turn that ends in ongoing SEED play with nothing due to wake it can
// never start again, so send the agent back to wait_for_events. The agent can still
// stop: if it answers a reminder without calling a tool, the turn ends. Any failure
// lets the turn end too.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export const REASON = 'This ongoing SEED chat has no wait running, so nothing will wake it. Call wait_for_events now with the last nextCursor, unless the player told you to stop or nothing can move until they decide. Do not mention this reminder to the player.';

const RESUME_PLAY = /^mcp__.*seed.*__resume_play$/;
const REMINDED = 'Stop hook feedback:';
// For a Claude Code that leaves background_tasks out of the hook's input.
const BACKGROUND = /was moved to the background as task (\w+)|Command running in background with ID: (\w+)|Async agent launched[\s\S]*?agentId: (\w+)/;
const FINISHED = /<task-id>(\w+)<\/task-id>/g;

const blocks = content => Array.isArray(content) ? content.filter(block => block && typeof block === 'object') : [];
const resultText = content => typeof content === 'string' ? content : blocks(content).map(block => block.text ?? '').join('\n');

/** What the transcript's JSON lines say about this chat. */
export function readTranscript(lines) {
  let ongoing = false, obeyed = false;
  const pending = new Set();
  for (const line of lines) {
    let entry;
    try { entry = JSON.parse(line); } catch { continue; }
    if (entry?.isSidechain) continue;
    // A finished task's notice may be a message, an attachment or a queue entry, so look at the raw line.
    for (const [, id] of line.matchAll(FINISHED)) pending.delete(id);
    const content = entry?.message?.content;
    if (entry?.type === 'assistant') {
      for (const block of blocks(content)) {
        if (block.type !== 'tool_use') continue;
        obeyed = true;
        if (RESUME_PLAY.test(block.name ?? '')) ongoing = block.input?.purpose === 'ongoing_play';
      }
    } else if (entry?.type === 'user') {
      if (typeof content === 'string' && content.startsWith(REMINDED)) obeyed = false;
      for (const block of blocks(content)) {
        const started = block.type === 'tool_result' && BACKGROUND.exec(resultText(block.content));
        if (started) pending.add(started[1] ?? started[2] ?? started[3]);
      }
    }
  }
  return {ongoing, obeyed, background: pending.size > 0};
}

/** The hook's answer for its input, or null to let the turn end. */
export function decide(input, readLines) {
  if (typeof input?.transcript_path !== 'string') return null;
  const {ongoing, obeyed, background} = readTranscript(readLines(input.transcript_path));
  // stop_hook_active stays true across the tool calls that follow a reminder, so it only means
  // the agent has declined when no tool has been called since.
  if (!ongoing || (input.stop_hook_active && !obeyed)) return null;
  const waking = Array.isArray(input.background_tasks) ? input.background_tasks.length > 0 || (input.session_crons?.length ?? 0) > 0 : background;
  return waking ? null : {decision: 'block', reason: REASON};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const answer = decide(JSON.parse(readFileSync(0, 'utf8')), path => readFileSync(path, 'utf8').split('\n'));
    if (answer) console.log(JSON.stringify(answer));
  } catch { /* An unreadable input or transcript must never hold a chat open. */ }
}
