# Connect SEED

Use **https://mcp.flaxa.app/mcp** in a compatible OAuth-capable MCP client, or install **SEED** from the **SEED by Vitverk** repository marketplace. A plugin installation is optional. Sign in with your licensed SEED account and approve only the access you need.

For a new Codex connection:

```sh
codex mcp add seed --url https://mcp.flaxa.app/mcp --oauth-client-registration dcr
codex mcp login seed --oauth-client-registration dcr
```

Existing connections may have an older local name. Use the name reported by your client when reconnecting. Existing `/live/mcp` and `/staging/mcp` URLs remain compatibility aliases; new connections should use `/mcp`.

The canonical connection discovers the OAuth issuer `https://mcp.flaxa.app` and uses `/oauth/authorize`, `/oauth/token` and `/oauth/register`. Existing alias connections retain the `/staging` issuer and their own resource audiences. If a connection at `/mcp` still opens `/staging/oauth/authorize`, refresh its OAuth metadata and reconnect at `/mcp`. These proxy URLs do not change the upstream game world.

Open a new chat and ask for a care overview without changing anything. SEED can show a useful focused card for substantive questions. Ask for text only when preferred, or “Open my SEED account view” for the full companion. A previous card does not cause background refreshes.

Developer tools require the SEED MCP developer role and the corresponding OAuth scope. Commands can change the game; a successful receipt is not proof that the requested work finished. Missing permissions require reauthorization, not a switch to a different account or interface.

The current upstream deployment is the `mcp-dev2` staging world. This is an environment detail, not a separate plugin. Rediscover world-specific identifiers after a world migration; older notes and credentials may not apply.

Most users need only SEED. Install the optional SEED API plugin only for a workflow that requires the direct upstream interface, such as testing its event protocol. Its tools, permissions and documentation are distinct.

Refresh MCP metadata and start a new chat after an upgrade. Existing authenticated plugin installs retain the internal `seed-live` identifier; its displayed name is SEED. The retired anonymous `seed` plugin is no longer offered and cannot be used to control your SEED account.
