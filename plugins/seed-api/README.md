# seed-api

Connect to Klang Games’ SEED API in the staging world `mcp-dev`, using your
seed-universe.com account. This is a live staging game connection, separate
from the SEED Flaxa proxy (`seed-live`) and SEED Demo (`seed`). Game commands affect
staging state.

## Install and connect

From the SEED by Vitverk marketplace:

```sh
codex plugin marketplace add vitverk/seed-plugin
codex plugin add seed-api@vitverk-seed
```

For Claude Code:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed-api@vitverk-seed
```

Sign in with your SEED account and choose the permissions to grant on the
consent screen. The server determines which tools your account can use.

To connect directly without the marketplace:

```sh
claude mcp add --transport http seed-dev https://api.seed-universe.com/seed-api/staging-mcp-dev/mcp
```

Then open `/mcp` and sign in. Use either the plugin or the direct connection
to avoid duplicate tools. In clients that support custom remote MCP connectors,
use this endpoint:

```text
https://api.seed-universe.com/seed-api/staging-mcp-dev/mcp
```

## Available tools

Oddur’s 27 October 2026 staging announcement describes eight read-only player
tools and eight additional developer tools. Player tools cover seedlings,
account data, game data, schematics, the game manual, societies, wallets and
public player profiles. `my_seedlings` includes a live seedling card in supported
ChatGPT and Claude clients.

Developer tools require the SEED MCP `mcp_developer` role and a token containing
`seed:developer`. Ask Oddur for the role. If it is granted after connecting,
sign out and sign in again; in Claude Code, use `/mcp` to clear authentication.
Installing the plugin does not grant the role.

`send_command` changes the live staging game and is limited to one request per
second per developer. The other announced tools read state or discover actions.
See the [tool reference](skills/seed-api/references/tools.md) for all 16 tools
and the [connection record](CONNECTION.md) for the configured environment.

`list_events` supports cursor-based polling. MCP Events push delivery was
announced as planned work later that evening; this package does not claim
that push delivery or background automation is available.

## Evidence and validation

Connection and tool information is based on Oddur’s
[staging announcement](https://vitverk.slack.com/archives/C0835FED87P/p1793143018303469)
and [tool-reference reply](https://vitverk.slack.com/archives/C0835FED87P/p1793143081402939)
on 27 October 2026, reviewed on 28 October. These source links require Slack access. Oddur
reported end-to-end testing of all 16 tools. This package has not independently
completed authenticated installation or tool testing in each client.

The endpoint responded with HTTP 401 and OAuth resource discovery on
28 October 2026. That confirms an authentication challenge, not successful
sign-in or tool access. Inspect the connected server’s current schemas before
use; names and capabilities can change during staging.
