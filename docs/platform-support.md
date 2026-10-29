# SEED client support

SEED uses authenticated Streamable HTTP at `https://mcp.flaxa.app/mcp`. Compatible clients can connect directly or install the repository plugin. OAuth sign-in and upstream permissions remain required.

The portable `mcp.json` and the compatibility `.mcp.json` are both URL-only and rely on the server's OAuth discovery and the host's authorization flow; these files are not assumed to merge. The canonical challenge offers all seven currently supported SEED scopes, and Codex also requests `offline_access`. Do not add scope fields or `extensions` to either file: Codex installs the plugin without its MCP server when `mcp.json` declares them. Requesting scopes does not grant them, and existing connections need explicit reauthorization to add permissions.

MCP Apps-capable hosts can display the full companion, focused widgets and character creator. Other clients can use the same data and documentation tools in text. Source and protocol checks do not prove UI rendering or model routing in a particular host.

Verified on 29 October 2026 with Claude Code 2.1.301: the Claude desktop app's Code tab rendered SEED's focused Seedling status card inline after a `seed@vitverk-seed` sign-in. The model receives only the card's JSON snapshot, so confirm rendering with the person viewing the session rather than from the tool result. A headless `claude -p` run advertised no MCP Apps capability, and Claude Code in a terminal shows text only. The full companion and character creator have not yet been checked in the Code tab.

SEED bundles no skills. Standard `search_seed_docs`, `read_seed_doc` and `seed://docs/index` discovery supply its guidance. Refresh metadata and begin a new chat after updating.

Existing OAuth aliases and internal identifiers remain compatibility details; user-facing presentation is SEED.

The server advertises the SEED S logo in its initialization metadata and on tools and resources, using the same-origin PNG at `https://mcp.flaxa.app/brand/seed-s-mark-v2.png`. MCP-capable clients choose how to display supplied icons. OpenAI UI entrypoints prefer tool icons; hosted app listings can instead use the app's registered logo. A custom app's listing logo may therefore need its own setting even when MCP icons are present. See the [MCP icon contract](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2025-11-25/basic/index.mdx#icons) and [OpenAI entrypoint icon precedence](https://github.com/openai/mcp-extensions/blob/main/docs/spec.md#entrypoint-icons).
