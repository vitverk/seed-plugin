# SEED documentation resources

**Availability, 28 October 2026:** Live 2.0.0 is active; Demo is intentionally offline and its published `/demo/mcp` endpoint returns HTTP 404. The Demo contract below describes the retained artifact, not current hosted availability. See the [post-release availability record](verification.md#post-release-availability).

SEED Demo **2.0.0** and SEED Live **2.0.0** contain zero bundled skills or source-document copies. ChatGPT, Codex, Claude and other MCP clients discover the same server-owned documentation through ordinary MCP tools and resources. The separate SEED API package is unchanged.

The standard documentation contract requires Demo runtime **0.15.0** and Live runtime **2.0.0**. Preparing these packages does not deploy either runtime or establish hosted acceptance. Refresh or reinstall an earlier package, refresh its MCP metadata, and start a new session so the host drops old skill discovery.

## Sources and workflows

The canonical source corpus lives in the [SEED repository](https://github.com/vitverk/seed/tree/main/knowledge/sources). It retains 121 source documents: 81 English help-center pages retrieved on 27 October 2026, and 40 supplied manual, developer, local API and project documents from `pr-34377-additions.zip`. These sources preserve their provenance, content hashes, citations and known conflicts. The repository owner confirmed full-text redistribution authorization on 27 October 2026; source ownership remains with the authors.

Authored guidance lives separately in [knowledge/workflows](https://github.com/vitverk/seed/tree/main/knowledge/workflows). Demo exposes its companion and calendar workflows in `seed-workflows-demo`; Live exposes settlement operations, care, production, building and account checkpoint guidance in `seed-workflows-live`. Each endpoint advertises only its applicable workflows. Workflow guidance does not turn imported reference prose into repository instructions or authorization to act.

The imported archive remains unverified against the current game. Its null source URL and retrieval date are intentional; cite its original source path. Help-center pages remain dated source snapshots. Known farming and Donation Box disagreements remain linked on both documents; neither source is silently chosen as current authority.

## Progressive discovery

Read `seed://docs/index` through `resources/read` to discover collections, topics and environment-specific workflows. Search with `search_seed_docs({query, limit?, category?, sourceCollection?, sourceType?, documentType?, topic?})`. Search returns compact excerpts, provenance, verification notes and related conflict links. For example:

```json
{"query":"calendar","sourceCollection":"seed-workflows-demo"}
```

Use `seed-workflows-live` on the Live connection for settlement or checkpoint questions. Use `seed-agent-play-pr34377` with `sourceType: "in_game_manual"` for supplied manual topics such as Memoria.

Call `read_seed_doc({uri, offset?, limit?, expectedDigest?})` with an exact returned URI. Documents have canonical URIs of the form `seed://docs/<URL-encoded stable document ID>`. Read defaults to 12,000 UTF-16 code units and permits up to 24,000; continue using `nextOffset` until null when a full document is needed, passing the returned digest as `expectedDigest` on later pages to detect a deployment change. `resources/read` returns the full document at the same URI. No MCP Skills extension, `skills/list`, `skills/get`, or `skill://` compatibility route is part of this contract.

Connection manifests keep `/demo/mcp` and `/live/mcp`, their existing authentication and their stable identities. Documentation is registered by the server; `mcp.json` does not invent a `resources` property. Demo remains anonymous. Live documentation uses its authenticated connection and existing static-data permission.

Source documents do not establish current guest state, live account state or simulator capabilities. Imported local API examples may use a different tool surface or units. Use the endpoint's tool descriptions, capability catalog and fresh observed state for executable behavior.

## Refresh and validate

Refresh source snapshots and authored workflows in the SEED repository. Its corpus validation owns metadata schema checks, body hashes, stable IDs, complete source coverage and symmetric conflicts. Do not copy the corpus back into this distribution repository.

From this repository run `npm run check` and `npm run package`. The validator requires zero skill files and no skill manifest bindings for Demo and Live, exact endpoint/authentication contracts, safe assets and synchronized versions. The independent API skill allowlist remains strict. Each archive has an inventory and checksum under `dist/`.

After the matching runtime is deployed, `npm run smoke:docs` performs read-only hosted documentation discovery, canonical resource reads, provenance and conflict checks. It does not call gameplay tools. The separate `npm run smoke` also exercises disposable detached Demo snapshots and requires authorization for that release check. Neither mode establishes installed-host rendering or prompt-routing acceptance.
