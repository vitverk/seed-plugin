# SEED documentation resources

Public plugin **1.6.6** packages **121 source documents** in two collections. The hosted search interface uses runtime **0.14.5**. The separate App-backed plugin uses version **1.7.5**; these version lines do not change the public package's direct MCP connection.

| Collection | Contents | Provenance |
| --- | --- | --- |
| `seed-help-center` | 73 articles, seven category pages and the home page | Full English Klang Games help-center snapshot retrieved on 27 October 2026 |
| `seed-agent-play-pr34377` | 22 in-game manual chapters, ten developer concept pages, five local API workflows, two project documents and one original library index | The 40 Markdown files supplied in `pr-34377-additions.zip`; unverified against the current game |

The repository owner confirmed full-text redistribution authorization on 27 October 2026. Source ownership remains with the authors. The supplied archive's bodies are preserved, including conditional wording, unresolved game-client references and world-dependent placeholders. Its import date does not establish when its claims were written or which game version they describe. Archive code and configuration files are not packaged.

## Organization

[Seed Game Guide](../skills/seed-game-guide/SKILL.md) is the single documentation skill. Its `resources/` folder contains topic indexes for getting started, care, building, economy, society, support and supplemental references. The [complete catalog](../skills/seed-game-guide/resources/catalog.md) links all 121 source documents. The [supplemental index](../skills/seed-game-guide/resources/supplemental/index.md) separates manual, developer concept, local API, project and collection-index documents and links both sides of known conflicts.

Companion and calendar remain the two guest action workflows. The package has **three skills and 133 Markdown files**: three `SKILL.md` instructions, 121 sources, eight generated navigation indexes and the guest calendar reference. Imported project documents are reference text, not repository instructions or permission to execute their commands. Source bodies and metadata are unchanged by the move; search and resource manifests advertise `skill://seed-game-guide/resources/...` URIs. Refresh resource discovery after updating.

## Consistent metadata

Every non-`SKILL.md` reference uses the same 19-field [JSON schema](../schemas/document-metadata.schema.json). Skill instructions keep the standard `name` and `description` frontmatter expected by skill hosts.

| Fields | Meaning |
| --- | --- |
| `schema_version`, `id`, `title`, `description` | Schema revision, stable identity and discovery text |
| `document_type`, `source_type`, `source_collection` | Document purpose and source classification |
| `source_id`, `source_url`, `source_path`, `source_version` | Source identity, available citation and recorded version |
| `language`, `category`, `topics` | Language and discovery filters |
| `retrieved_at`, `imported_at`, `verification_status` | Distinct retrieval/import dates and evidence status |
| `content_hash`, `conflicts_with` | Canonical body SHA-256 and related conflicting document IDs |

Archive-only references have a null `source_url` and `retrieved_at`; cite their original `source_path`. Unknown source versions remain null. Their status is `unverified_reference`, while help-center pages are `source_snapshot` and generated indexes are `derived`. Hashes cover the complete canonical Markdown body, including its title: line endings become LF, surrounding blank lines are removed and one final newline is retained. Frontmatter is not part of the body hash.

Known disagreements are retained on both source documents. The imported farming manual allows Outdoor Block fields while the help-center article excludes them. The imported seasonal-events manual says Donation Boxes cannot be crafted while the help-center article describes crafting them. Search and reads return the linked conflict IDs and resources; neither source is silently selected as current authority.

## Progressive discovery

Use `search_seed_docs({query, limit?, category?, sourceCollection?, sourceType?, documentType?, topic?})` to search across both collections. Search returns compact excerpts, source classification, dates, nullable URL/version fields, citation text, verification notes and resolved conflict links. Limits range from one to ten. For example:

```json
{"query":"Memoria","sourceCollection":"seed-agent-play-pr34377","sourceType":"in_game_manual"}
```

Then call `read_seed_doc({uri, offset?, limit?})` with an exact returned URI. Read defaults to 12,000 UTF-16 code units and permits up to 24,000; continue using `nextOffset` until null when the entire document is needed. Resources return full Markdown at the same `skill://<skill-name>/<path>` URI. Read `seed://docs/index` to discover collections and topics. The MCP Skills extension exposes all three skills and complete file manifests with byte sizes and digests; individual documents are not additional tools.

Connection manifests continue to target the existing anonymous endpoint. Resources are registered by the server, so `mcp.json` has no invented `resources` property. Packaged references can also be read offline. The release smoke check expects 25 tools and three skills, tests an original help-center article and imported Memoria guidance, and checks null-URL citations and symmetric conflicts. It is a live check, separate from package validation.

References explain their own source systems. They do not establish guest state, account access or simulator capabilities. In particular, imported local API workflows describe another tool surface and may use different units or command contracts. Use the guest's current capability tool and observed state for its executable behavior. Current game behavior, prices, policies and server availability may require a fresh source check.

## Refresh and validate

The canonical sources live in the `vitverk/seed` application repository under `knowledge/sources/seed-help-center/` and `knowledge/sources/seed-agent-play-pr34377/`. Refresh the help center through its staged scraper; review archive imports separately. After a source change, run `mcp-app/scripts/sync-help-center-plugin.mjs --public-dir <this-repository>`. It synchronizes normalized references, navigation, the shared schema and `sources/documentation-inventory.json`. Add `--check` to verify parity without writing.

From this repository run:

```sh
npm ci
npm run check
npm run package
```

Validation checks every reference against the shared schema and body hash, unique IDs, exact source-inventory metadata and coverage, collection links, source classifications, and resolvable symmetric conflicts. The canonical inventory enumerates source files so deleting one cannot be hidden by recalculating a count. Regression tests cover missing source pages, altered content, invented source URLs, invalid metadata, duplicate IDs, removed conflict links and archive code accidentally entering the package. The ZIP is deterministic and excludes schemas, source inventories, scraper/code files, private App bindings and marketplace catalogs. Deployment and host verification remain separate checks.
