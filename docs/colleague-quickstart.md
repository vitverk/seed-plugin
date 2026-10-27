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

Restart Codex if the refreshed marketplace is not visible. Open Plugins, choose **SEED by Vitverk**, and install **SEED** for the live proxy. Connect it and complete Flaxa and SEED OAuth consent. No client secret, API key or local server is needed.

Use your own licensed SEED account. The connection currently uses the **SEED staging world**. The SEED MCP **developer** role is needed for developer reads and game-changing commands. Install **SEED Demo** separately if you want the anonymous temporary simulation. Existing `seed` installations are the demo; installing the live plugin (`seed-live`) does not replace them.

Open a **new chat** and try:

- “Using SEED, give me a compact care overview of my seedlings. Do not change anything or open a panel.”
- “Using SEED, open my account view.”
- “Using SEED, find workbench in the game catalog in English. Do not change anything.”
- With developer access: “Using SEED, show simulation time and list available commands. Do not send any commands.”

Only explicit open/browse requests render the account UI. A developer connection exposes 24 proxy tools (17 data/action tools plus seven presentation tools); a player connection exposes 18 (11 data tools plus seven presentation tools). The `send_command` tool can change the staging world. The demo plugin's calendar and fictional activities do not control your real account.

## Direct MCP fallback

If your Codex version does not expose repository plugins, follow the [direct-connection quickstart](https://github.com/vitverk/seed/blob/main/mcp-app/docs/staging-quickstart.md). It includes explicit DCR login and the full scopes needed when automatic login requests catalog permission only. Use a separate connection rather than adding this fallback alongside an already-working SEED plugin.

Canonical endpoints are `/live/mcp` for SEED and `/demo/mcp` for SEED Demo. Existing `/staging/mcp` proxy connections still work. The separate diagnostic upstream connection may stay installed.

The marketplace commands and package layout follow [official OpenAI documentation](https://developers.openai.com/plugins/build/plugins). This repository marketplace is a team-distribution source, separate from a reviewed public directory listing.
