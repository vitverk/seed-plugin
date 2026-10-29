# SEED on OpenAI hosts

Install SEED from the repository marketplace or connect `https://mcp.flaxa.app/mcp` directly in an OAuth-capable host. The root portable manifest and Codex compatibility manifest share the same SEED presentation and the `seed` plugin identity.

The package contains no private App binding, credentials or bundled skills. Its remote connection declares only the portable URL and transport; hosts discover OAuth, verified dynamic client registration and the full SEED scope set from the server. Codex installs the plugin without its MCP server if `mcp.json` declares server-level `extensions`, so `npm run check` rejects them. Users must review and explicitly approve consent. Requesting scopes does not grant them; installation and updates leave existing grants unchanged. See the [connection quickstart](colleague-quickstart.md) for permission details and reconnection guidance.

Public directory publication requires its own reviewed publisher identity, policies, licensing, support, recording and host acceptance evidence. Run `npm run check:submission` against the current SEED inputs; historical anonymous-service submission records do not establish readiness.
