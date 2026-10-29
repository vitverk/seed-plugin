# Try SEED in Codex

## Install from the repository marketplace

On your machine, add the marketplace:

```sh
codex plugin marketplace add vitverk/seed-plugin
```

If you already added it, refresh the published snapshot:

```sh
codex plugin marketplace upgrade vitverk-seed
```

Restart Codex if the refreshed marketplace is not visible. Open Plugins, choose **SEED by Vitverk**, and install **SEED Live** for the live proxy. Connect it and complete Flaxa and SEED OAuth consent. No client secret, API key or local server is needed.

Use your own licensed SEED account. The connection currently uses the **SEED staging world**. The SEED MCP **developer** role is needed for developer reads and game-changing commands. **SEED Demo** is intentionally offline; installing it does not restore the anonymous temporary simulation. Existing `seed` installations are the demo; installing the live plugin (`seed-live`) does not replace them.

Demo 2.0.0 and Live 2.1.0 load guidance on demand through standard MCP documentation tools and resources and contain zero bundled skills. After upgrading, refresh or reinstall the package, refresh connection metadata and open a **new chat** to discard old skill discovery. The same documentation contract serves ChatGPT, Codex and other MCP clients.

Try:

- “Using SEED Live, give me a compact care overview of my seedlings. Do not change anything or open a panel.”
- “Using SEED Live, open my account view.”
- “Using SEED Live, find workbench in the game catalog in English. Do not change anything.”
- With developer access: “Using SEED Live, show simulation time and list available commands. Do not send any commands.”

Only explicit open/browse requests render the account UI. Discover the current tool list after connecting; Live runtime 2.1.0 provides documentation search and reads to both role-specific catalogs, including the connected start guide and focused schedule, market, election and onboarding guidance. The `send_command` tool can change the staging world. The demo plugin's calendar and fictional activities do not control your real account.

## Direct SEED API plugin

Install **SEED API** from the same **SEED by Vitverk** marketplace to connect
directly to Klang’s staging MCP instead of the Flaxa proxy:

```sh
codex plugin add seed-api@vitverk-seed
```

Sign in with your SEED account. Developer tools require `mcp_developer` and a
fresh token with `seed:developer`. See the [SEED API guide](../plugins/seed-api/README.md)
for all 16 announced tools and staging limitations. Select the intended connection
explicitly when both SEED Live and SEED API are installed.

## Connect directly without a plugin

Add **`https://mcp.flaxa.app/mcp`** to an OAuth-capable Streamable HTTP MCP
client and complete Flaxa and SEED sign-in. No package, local checkout, API key
or client secret is needed. The [direct-connection quickstart](https://github.com/vitverk/seed/blob/main/mcp-app/docs/staging-quickstart.md)
includes Codex setup and explicit scopes when automatic login requests only
catalog permission. Use one connection to avoid duplicate tools.

Ask “Read the SEED start guide,” or use `read_seed_doc` with `seed://docs/index`.
Search/read tools and standard resources supply guidance on demand, including
care, schedules, production, building, market, elections, onboarding and notes.
Clients without MCP Apps can still read documentation and data as text.

Existing `/live/mcp` and `/staging/mcp` proxy connections keep working. Each URL
has its own OAuth audience; keeping an existing connection on its URL preserves
its grant. The `seed-api` package remains the separate direct upstream connection.
The anonymous Demo remains offline following its separate service migration.

The marketplace commands and package layout follow [official OpenAI documentation](https://developers.openai.com/plugins/build/plugins). This repository marketplace is a team-distribution source, separate from a reviewed public directory listing.
