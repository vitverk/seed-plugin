# SEED Live

Connect your SEED account through `https://mcp.flaxa.app/mcp`. This is the Flaxa proxy, currently reading and acting on the SEED staging world. OAuth sign-in requires a licensed SEED account. Developer tools also require the SEED MCP `developer` role.

The plugin is optional: add the MCP URL directly in an OAuth-capable Streamable HTTP client and sign in. Read `seed://docs/index` with `read_seed_doc`, or search for “start here” with `search_seed_docs`. The connected start guide and focused care, schedule, production, building, market, election and onboarding guides come from the server.

For marketplace installation, install **SEED Live** from the **SEED by Vitverk** repository marketplace, connect the server, and complete Flaxa and SEED consent. Open a new chat, then ask: “Give me a compact care overview of my seedlings without changing anything.” Ask “Open my SEED account view” to show the interactive panel. Routine reads do not open panels.

SEED Live **2.1.0** contains zero bundled skills. ChatGPT, Codex, Claude and other MCP clients load applicable guidance from this authenticated MCP connection through `search_seed_docs`, `read_seed_doc`, `seed://docs/index`, and canonical `seed://docs/<URL-encoded stable document ID>` resources. Search collection `seed-workflows-live` for settlement operations, care, production, building or account checkpoints. The source corpus and authored workflows are maintained in the SEED application repository.

Developer commands can change the game. Start with reads and act within the user's requested scope. Settlement observations come from staging and need revalidation in the current world. Building guidance uses the read-only `prepare_building_plan` helper for supported single-floor layouts, then the authorized player-command path for construction. Compiled plans do not verify terrain, access, materials or server acceptance.

Ask “Save my SEED goals and context remotely” to load the checkpoint workflow and write a compact note to the connected account. It preserves priorities, observations, pending work and next checks, checks revisions before updating, and reads the note back. A new chat can read that note after refreshing live state. Saving does not resume gameplay or transfer running monitors.

This breaking package update requires Live runtime **2.1.0**. Refresh or reinstall the package, refresh MCP metadata and start a new session to remove earlier skill discovery. The `seed-live` identity, OAuth scopes and artwork stay unchanged. Existing `/live/mcp` and `/staging/mcp` connections keep working; new installations use `/mcp`. No MCP Skills extension or `skill://` compatibility route is required. Install **SEED Demo** separately for the temporary anonymous simulation; **SEED API** remains the independent direct connection. Package validation does not establish deployment or host acceptance.

If the client only requests catalog permission during sign-in, use the explicit scope login in the [connection quickstart](https://github.com/vitverk/seed/blob/main/mcp-app/docs/staging-quickstart.md), using the server name reported by your client. The old `/staging/mcp` proxy alias continues to work for existing connections.
