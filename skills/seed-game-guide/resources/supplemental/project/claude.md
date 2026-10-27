---
schema_version: 1
id: seed-agent-play-pr34377:project/claude
title: Agent Play API project instructions
description: Instructions for the separate Agent Play API project, retained as source reference rather than instructions for this repository or its tools.
document_type: project
source_type: project_reference
source_collection: seed-agent-play-pr34377
source_id: project/claude
source_url: null
source_path: tools/agent-play-api/CLAUDE.md
source_version: null
language: en
category: Project reference
topics:
- agent play api project instructions
- project reference
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:1ab7b8401694be8c5e31620e2e973071ea1e209e51a22c1a868557ad1a3ebc04
conflicts_with: []
---

# Agent Play API

Local MCP server for a blind agent playing as one configured player. Reads and commands use seed-api; spatial queries use Sector API. Bind one process to each agent; the server has no client authentication.

Run `./seed.sh auth --domain=seed.ci`, then copy `example.config.json`, configure the world, sector and identity, and run `dotnet run tools/agent-play-api/AgentPlayApi.cs -- --config <absolute-config-path>`. Connect to `http://127.0.0.1:<port>/mcp`; `/healthz` reports OpenAPI readiness as `schema_ready`. Config paths resolve relative to the config file; `staticDataDir` defaults to `../../staticdata`. `cacheDir` defaults to `cache` beside the application; point instances of the same world at a shared directory. OpenAPI documents are revalidated after three minutes while the last document remains available for the same catalog hash; the catalog hash alone does not cover payload fields. See `Config` for the settings.

The optional `gameplayDbConnectionString` supplies chat, wallet history and notifications; `simTimeUrl` enables the clock and time projections on entity reads. Spatial queries map world X/Z to Sector API X/Y. `query_land` intersects zone cell bounds and reports ownership; check truncation and validate access with the operation. `staticdata_lookup` merges inheritance without defaults and refuses entries with unsupported modifications or schemas. Tool calls and results are logged, so protect the log file.

`list_events` polls a bounded journal also exposed through MCP Events webhook subscriptions. Sources sample about every 20 seconds and can miss changes; retained entries and subscriptions survive restart. Webhooks require HTTPS and public addresses; `allowPrivateCallbacks` enables loopback HTTP for local testing. Subscription files contain signing secrets. Failed deliveries retry with backoff. A journal retention gap stops delivery and is reported on refresh; supply a cursor to acknowledge truncation. Journal filenames include the player ID; subscription files include the player ID and server port. Earlier unscoped files are not replayed. See `EventJournal` and the tool descriptions for source health and cursor behavior. The `seedling_card` resource requires host support; its activity times need `simTimeUrl`, and need bars use independently sampled attribute commands.
