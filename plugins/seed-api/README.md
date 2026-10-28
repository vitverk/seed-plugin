# SEED API

Connect directly to Klang Games’ SEED staging world **`mcp-dev2`** with your
seed-universe.com account. This world is separate from `mcp-dev`: rediscover
your society and seedlings instead of reusing old-world IDs or campaign notes.
SEED API (`seed-api`), the Flaxa proxy (`seed-live`) and the guest Demo (`seed`)
are separate connections. Game writes affect real staging state.

## Install and connect

```sh
codex plugin marketplace add vitverk/seed-plugin
codex plugin add seed-api@vitverk-seed
```

For Claude Code, use `claude plugin marketplace add vitverk/seed-plugin` and
`claude plugin install seed-api@vitverk-seed`. Refresh/reinstall an existing
API package to version **0.2.1**, refresh connection metadata, and sign in again.
On the consent screen, include **`seed:market:read`** for Global Market access.
Installing or updating the package does not grant a developer role.

For a direct connector, add this as a new connection and sign in:

```text
https://api.seed-universe.com/seed-api/staging-mcp-dev2/mcp
```

Claude Code also supports:

```sh
claude mcp add --transport http seed-dev2 https://api.seed-universe.com/seed-api/staging-mcp-dev2/mcp
```

Use either the plugin or a direct connection in a chat to avoid duplicate tools.
Retain an old-world connection only when intentionally working in that world.

## Tools and events

The 28 October 2026 developer update announces the renamed `find_schematics`,
`query_zones`, `seedling_chat_history` and `user_events` tools, the read-only
`market` tool, and developer-only `create_seedling`. Use the currently advertised
schemas. See the [tool reference](skills/seed-api/references/tools.md).

MCP Events is advertised upstream, but delivery remains unverified. The developer
announcement said callback-host setup was pending; its current configuration has
not been independently measured. `user_events` is a polling tool and does not prove push delivery.
The [Events test guide](skills/seed-api/references/events.md) covers discovery,
signed callback verification, delivery into ChatGPT and unsubscribe. The Flaxa
proxy currently does not forward the Events protocol; test the direct connector.

## Verification boundary

Source: the developer’s 28 October 2026 `mcp-dev2` announcement supplied by the
user, following the 27 October staging announcement. An anonymous request to the
new endpoint on 28 October returned HTTP 401 with OAuth resource discovery for
`staging-mcp-dev2`. This verifies the public endpoint and authentication challenge,
not sign-in by itself. Subsequent authenticated local verification passed tool
discovery, a static read and token refresh on server `a846fcb5`. Its catalog
contains all 18 expected tools. MCP2 Events discovery also passed and lists
`seedling.chat_reply`, `seedling.need_crisis_started` and `user.notification`.
A later ChatGPT Work/Cloud check discovered the same events, but native task
creation failed with a generic host service error. No event arrived; no matching
saved host task was found, and upstream subscription state remains unknown.
See the [Events test guide](skills/seed-api/references/events.md) for this
inconclusive result and the timing/cleanup limits. Refresh the connected catalog
before use. The package's offline checks do not establish authenticated access.
