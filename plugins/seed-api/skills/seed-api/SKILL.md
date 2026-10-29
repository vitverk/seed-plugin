---
name: seed-api
description: Connect to the direct SEED MCP, understand its player and developer tools, or troubleshoot missing access to the mcp-dev2 world.
---

# SEED API

Read the [connection record](../../CONNECTION.md) before using this plugin.
It targets Klang Games’ live staging world `mcp-dev2`. Keep this connection
distinct from the SEED companion proxy and other SEED worlds.

Use the connected server’s current tool schemas and returned permissions as
the authority. The [tool reference](references/tools.md) explains the naming
transition, access requirements and limits. Prefer new names when advertised;
use older names only when the connected schema still requires them. Use `my_seedlings` with
`section: now` for a compact current-state read when the current schema supports
it. Use `game_guide` and `game_data` for game documentation and published data.

Users sign in with their own SEED account and select consent permissions.
Request `seed:market:read` at consent for Global Market access. Player tools read data. Rediscover society/seedling IDs in this new world; keep old-world notes and IDs separate. Additional developer tools require `mcp_developer`
and a token with `seed:developer`. Missing tools may require role assignment
and a fresh sign-in; do not change worlds or identities to bypass access.

For authorized game changes, inspect `commands` and/or `find_actions` first.
Use the returned identifiers and schemas. `send_command` changes live staging
state, acts for the identity in `header`, and permits at most one request per
second per developer. Preserve the intended player identity; do not default to
system authority. Upstream describes command delivery as at least once and may
retry after a timeout even when the proxy does not. If the outcome is unknown,
read state before retrying; one tool call is not an exactly-once guarantee.
Game-level failures now return `isError` with a `SeedStatusCode` and reason
(such as `NoAccess` or `InvalidRequest`). Preserve that failure; an HTTP/MCP
response is not command success. Confirm effects with fresh state before reporting success.

`market` only reads. Resolve goods and inspect offers/bids before requesting a
quote; quotes have a separate small budget. Do not treat a quote as a purchase.
`create_seedling` changes the world and requires an explicit creation request.
Use its advertised BasicCharacterData schema, preserve the user's chosen name,
visuals, traits, stats and clothes, and let the game validate slots and inputs.
Explain that it can first create a society/player. `complete_progression: true`
unlocks every progression quest; use it only when that effect is requested.
Find and verify the result with `my_seedlings`; do not automatically retry creation.

`user_events` (formerly `list_events`) is cursor-based polling. MCP Events is
advertised upstream; delivery remains unverified. The developer announcement
said callback-host setup was pending. Read the
[Events test guide](references/events.md) for protocol discovery and the bounded
host test. Do not promise push delivery until signed callback verification,
a matching event received in ChatGPT, and unsubscribe have been verified.
