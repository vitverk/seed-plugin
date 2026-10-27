# SEED

Connect your SEED account through `https://mcp.flaxa.app/live/mcp`. This is the Flaxa proxy, currently reading and acting on the SEED staging world. OAuth sign-in requires a licensed SEED account. Developer tools also require the SEED MCP `developer` role.

Install **SEED** from the **SEED by Vitverk** repository marketplace, connect the server, and complete Flaxa and SEED consent. Open a new chat, then ask: “Give me a compact care overview of my seedlings without changing anything.” Ask “Open my SEED account view” to show the interactive panel. Routine reads do not open panels.

Developer commands can change the game. Start with reads; ask the assistant to explain a proposed command before sending it. This package does not bundle the guest-only calendar or simulation skills. Install **SEED Demo** separately for the temporary anonymous mock world.

If the client only requests catalog permission during sign-in, use the explicit scope login in the [connection quickstart](https://github.com/vitverk/seed/blob/main/mcp-app/docs/staging-quickstart.md), using the server name reported by your client. The old `/staging/mcp` proxy alias continues to work for existing connections.
