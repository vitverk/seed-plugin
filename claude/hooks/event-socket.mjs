#!/usr/bin/env node
// PreToolUse hook. A long wait for SEED events holds the player's messages back until it
// ends, so a chat waits behind a socket that Claude Code's Monitor tool opens instead. Monitor
// asks the player about each new URL with no way to always allow one, and a chat left on that
// question could never wake. So this allows SEED's own socket, which carries no game data, and
// nothing else: any other Monitor call asks as usual. It also adds monitor true to each wait,
// which is what makes SEED offer that socket; without it, SEED waits the ordinary way. An agent
// with no Monitor tool passes monitor false, as SEED's answer tells it to.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const SOCKET = /^wss:\/\/mcp\.flaxa\.app\/events\/socket\?ticket=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[A-Za-z0-9_-]{43}$/;
const WAIT = /^mcp__.*seed.*__wait_for_events$/;

/** The hook's answer for its input, or null to leave the call as it is. */
export function decide(input) {
  const name = input?.tool_name, args = input?.tool_input;
  if (!args || typeof args !== 'object') return null;
  if (WAIT.test(name ?? '')) return args.monitor === undefined ? {hookSpecificOutput: {hookEventName: 'PreToolUse', updatedInput: {...args, monitor: true}}} : null;
  if (name !== 'Monitor' || 'command' in args) return null;
  const socket = args.ws;
  if (!socket || typeof socket.url !== 'string' || !SOCKET.test(socket.url) || Object.keys(socket).length !== 1) return null;
  return {hookSpecificOutput: {hookEventName: 'PreToolUse', permissionDecision: 'allow', permissionDecisionReason: 'SEED\'s own event socket'}};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const answer = decide(JSON.parse(readFileSync(0, 'utf8')));
    if (answer) console.log(JSON.stringify(answer));
  } catch { /* An unreadable input leaves the call to Claude Code's usual permission check. */ }
}
