# SEED for Claude

Connect your licensed SEED account to Claude at **https://mcp.flaxa.app/mcp** with OAuth. SEED provides account and Seedling data, care and production reads, game guidance, persistent account notes, permission-scoped actions and interactive views. Sign-in offers each SEED permission separately; developer tools require the SEED MCP developer role and can change the game.

This folder is the Claude Code plugin published by the repository marketplace as `seed@vitverk-seed`. Its plugin and server are named `seed`, like the Codex and archive packages at the repository root; this folder holds only the files Claude needs. See the [repository README](https://github.com/vitverk/seed-plugin#readme) for usage and release checks.

When you ask Claude Code to keep playing, a small hook stops that chat from ending its turn with nothing due to wake it, and sends Claude back to waiting for game events. It does nothing in other chats, and it needs Node.js on your computer; without Node.js it stays out of the way. To end a play session, tell Claude to stop.

While Claude waits for game events, a second small hook lets it wait through Claude Code's Monitor tool, so that you can still send messages in that chat. It allows only SEED's own event socket at `mcp.flaxa.app`, which carries no game data, without asking you each time; any other Monitor call still asks. Without it, Claude waits the ordinary way.
