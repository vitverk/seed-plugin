---
name: seed-api
description: Connect to the SEED staging MCP, understand its player and developer tools, or troubleshoot missing access to the mcp-dev world.
---

# SEED staging API

Read the [connection record](../../CONNECTION.md) before using this plugin.
It targets Klang Games’ live staging world `mcp-dev`. Keep this connection
distinct from the Seed / Seed Demo guest simulations and other SEED worlds.

Use the connected server’s current tool schemas and returned permissions as
the authority. The [tool reference](references/tools.md) explains the naming
transition, access requirements and limits. Prefer new names when advertised;
use older names only when the connected schema still requires them. Use `my_seedlings` with
`section: now` for a compact current-state read when the current schema supports
it. Use `game_guide` and `game_data` for game documentation and published data.

Users sign in with their own SEED account and select consent permissions.
Player tools read data. Additional developer tools require `mcp_developer`
and a token with `seed:developer`. Missing tools may require role assignment
and a fresh sign-in; do not change worlds or identities to bypass access.

For authorized game changes, inspect `commands` and/or `find_actions` first.
Use the returned identifiers and schemas. `send_command` changes live staging
state, acts for the identity in `header`, and permits at most one request per
second per developer. Preserve the intended player identity; do not default to
system authority. Upstream describes command delivery as at least once and may
retry after a timeout even when the proxy does not. If the outcome is unknown,
read state before retrying; one tool call is not an exactly-once guarantee.
Confirm effects with fresh state before reporting success.

`user_events` (formerly `list_events`) is cursor-based polling, not proof of MCP Events push support
or an unattended background task. Do not promise either without verifying
that the connected server and host support it.
