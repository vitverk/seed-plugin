# SEED Live

Connect your SEED account through `https://mcp.flaxa.app/live/mcp`. This is the Flaxa proxy, currently reading and acting on the SEED staging world. OAuth sign-in requires a licensed SEED account. Developer tools also require the SEED MCP `developer` role.

Install **SEED Live** from the **SEED by Vitverk** repository marketplace, connect the server, and complete Flaxa and SEED consent. Open a new chat, then ask: “Give me a compact care overview of my seedlings without changing anything.” Ask “Open my SEED account view” to show the interactive panel. Routine reads do not open panels.

Developer commands can change the game. Start with reads and use them within the user's requested scope. The live-only [settlement operations skill](skills/settlement-operations/SKILL.md) routes to focused care, production, and building references when needed; it does not load the full play journal into every session. Its observations come from staging and should be revalidated in the current world. Building guidance uses the read-only `prepare_building_plan` helper for single-floor layouts when available, then the existing authorized player-command path for site creation and ordinary construction. Compiled plans do not verify terrain, access, materials or server acceptance. This package does not bundle the guest-only calendar or simulation skills. Install **SEED Demo** separately for the temporary anonymous mock world.

If the client only requests catalog permission during sign-in, use the explicit scope login in the [connection quickstart](https://github.com/vitverk/seed/blob/main/mcp-app/docs/staging-quickstart.md), using the server name reported by your client. The old `/staging/mcp` proxy alias continues to work for existing connections.
