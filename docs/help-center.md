# SEED documentation resources

The plugin packages the full English Klang Games SEED help-center snapshot retrieved on 27 October 2026: **73 articles, seven category pages and the home page**. The owner confirmed authorization to redistribute the full articles on that date. Source ownership remains with its authors; this does not relicense the SEED mark, artwork or other package assets.

Every source page is a Markdown file with YAML frontmatter: title, description, canonical source URL, source ID, category, language, retrieval time and a SHA-256 content hash. The original category spelling, including “Craing For Your Seedling”, is preserved as provenance. External images remain source URLs rather than copied binary assets.

## Organization

| Skill | Source categories | Articles |
| --- | --- | ---: |
| `seed-game-guide` | Beginner's Guide; full catalog | 5 |
| `seedling-care` | Craing For Your Seedling | 5 |
| `seed-building` | Building & The World | 10 |
| `seed-economy` | Work & Economy | 7 |
| `seed-society` | Society & Governance; Community & Social | 12 |
| `seed-support` | Community & Support | 34 |

The [complete catalog](../skills/seed-game-guide/references/catalog.md) links every source page. Each topic has a compact `SKILL.md` and article index, with full source files under `references/`. The existing companion and calendar skills remain the action workflows for the independent guest simulator.

## Progressive discovery

The server's documentation layer exposes `search_seed_docs({query, limit?, category?})` for article discovery, then `read_seed_doc({uri, offset?, limit?})` for bounded retrieval. Search accepts limits from one to ten. Read defaults to 12,000 characters and permits up to 24,000; use the returned `nextOffset` for continuation.

Clients with MCP resource support can read a full document at `skill://<skill-name>/<path>`, for example `skill://seed-building/references/farming-310.md`. Resource listings expose compact skill entries, while the MCP Skills extension provides complete file manifests with byte sizes and digests. Skills and resources are protocol discovery surfaces; individual articles are not separate tools.

The plugin's portable and compatibility MCP configurations continue to connect to the existing anonymous hosted endpoint. Resource registration belongs to that server, so no unrecognized `resources` property is added to `mcp.json`. Local clients can read the same packaged files without the server. A local package check does not establish that a particular host has refreshed its remote metadata or supports the Skills extension.

Hosted documentation requires runtime 0.11.0 or later to be deployed. The release smoke check requires all 15 tools and eight skills and verifies a sourced article through both resource and tool reads. Until that runtime is deployed, the packaged Markdown remains usable offline but a hosted smoke check will report the missing documentation surface.

The guides explain native SEED behavior. They do not grant live-game account access or prove that a mechanic is implemented by the guest simulator. Use the current capability tool and observed state for executable behavior. A retrieval timestamp identifies the archived snapshot; current prices, support policies, server availability or patch behavior may need a fresh source check.

## Refresh and validate

The canonical scraper and corpus live in the `vitverk/seed` application repository under `knowledge/sources/seed-help-center/`. Its README documents the crawl, extraction, coverage and refresh command. The scraper follows all in-scope article and category links, and records crawl failures rather than silently publishing an incomplete archive.

After refreshing the application corpus, run its `mcp-app/scripts/sync-help-center-plugin.mjs` with `--public-dir` pointing at this repository. It updates both the application's private skill package and this public package with the same generated files. Run the same command with `--check` to verify byte-for-byte parity without writing. An unknown category or a source manifest with crawl failures stops the sync for review.

From this repository run:

```sh
npm ci
npm run check
npm run package
```

Validation checks all eight skill identities, YAML metadata, every source page's content digest, article/page coverage, catalog links and the archive allowlist. Tests include missing-article and changed-content failures. The ZIP is deterministic and contains the full documentation corpus, without the scraper, application source, private App binding or marketplace catalogs. Deployment and host discovery checks remain separate from these offline checks.
