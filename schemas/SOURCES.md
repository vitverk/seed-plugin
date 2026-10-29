# Agent Plugins schemas

These unmodified JSON schemas were retrieved on 2026-10-26 from their canonical
Agent Plugins 1.0.0 URLs:

- [plugin.schema.json](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json)
- [mcp.schema.json](https://agent-plugins.org/schemas/1.0.0/mcp.schema.json)

`npm run check` validates the portable manifests against these offline copies
using JSON Schema Draft 2020-12. It also checks package-specific requirements and
the compatibility manifests. Schemas are development files and are excluded from
the release ZIP.

The published MCP 1.0.0 schema currently forbids server-level extension fields.
Seed uses the portable URL and transport only and validates `mcp.json` without
removing any field. The endpoint advertises its own OAuth metadata. Codex reads
the root manifests and silently drops a server that declares extensions.

These schemas do not validate OpenAI or Claude portal readiness. The separate
`npm run check:submission` command reports missing listing/review declarations
and unfinished evidence in `submission/readiness.json`.
