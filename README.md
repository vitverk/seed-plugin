# SEED plugins

This marketplace includes three separate plugins:

| Install | Connection | Sign-in |
| --- | --- | --- |
| **SEED** (`seed-live`) | `https://mcp.flaxa.app/live/mcp` — real SEED staging account | OAuth; game license required |
| **seed-api** (`seed-api`) | `https://api.seed-universe.com/seed-api/staging-mcp-dev/mcp` — direct Klang SEED staging API | SEED OAuth; developer tools need a role |
| **SEED Demo** (`seed`) | `https://mcp.flaxa.app/demo/mcp` — temporary mock world | None |

For your first Codex setup, follow the [colleague quickstart](docs/colleague-quickstart.md). Existing demo installs keep their `seed` identity. The `seed-api` plugin connects directly to Klang’s staging MCP, while `seed-live` uses the Flaxa proxy.

The rest of this README describes the **SEED Demo** package and its submission materials. The live plugin has its own [README](plugins/seed-live/README.md); the direct API has a [connection and tool guide](plugins/seed-api/README.md).

SEED Demo is a temporary Seedling companion simulation with an interactive calendar, activities, resources, needs, and ordered goals. Open a populated guest, plan its day, and inspect the results of simulated work. It uses an anonymous hosted MCP server; you do not need a SEED account, API key, or local server.

**This repository is a public distribution and submission-preparation package. It is not an approved OpenAI or Claude directory listing.** The manifests and ZIP can be validated locally. Portal identity verification, licensing, the recorded demo, and host review evidence still need completion before official submission. See the [readiness checklist](https://github.com/vitverk/seed-plugin/blob/main/submission/readiness.json).

The publisher is **Vitverk**. The owner selected **Iceland** as the intended marketplace audience and confirmed **no payments or purchases**. OpenAI's publication metadata declares `IS`; Claude availability still needs confirmation in its portal. Neither the public repository nor the MCP endpoint is geographically restricted by these declarations. The listings use the new SEED Demo-specific [privacy policy](https://flaxa.app/privacy) and [terms](https://flaxa.app/terms); both pages were published and verified on 2026-10-26. See the [publication evidence](https://github.com/vitverk/seed-plugin/blob/main/submission/policy-check.json).

SEED Demo is an independent prototype, with no Klang Games API connection or control over a live SEED game account. Progress lives in the open guest view, starts paused, and disappears on reload or close. No simulation continues after closing the view. The chat host may retain shared context and tool results; see [data behavior](https://github.com/vitverk/seed-plugin/blob/main/docs/data-behavior.md).

![Guest companion before the SEED Demo rename](https://raw.githubusercontent.com/vitverk/seed-plugin/main/docs/images/standalone-companion.png)

*Standalone browser capture, 26 October 2026. This is not evidence of ChatGPT or Claude host acceptance.*

## Connect or install

Remote MCP endpoint: **`https://mcp.flaxa.app/demo/mcp`**

The existing plugin identifier `seed` and marketplace identifier `vitverk-seed` stay unchanged, so installed copies can update in place. The former `/mcp` endpoint is removed. Existing clients must use `/demo/mcp`, as both connection manifests in this package do.

Transport: Streamable HTTP. Authentication: **None**.

For an MCP-compatible chat host, add that endpoint as a custom remote connector. A host with MCP Apps support can render the interactive view. Text-only hosts can use tools with explicit full snapshots; their responses do not automatically update an open browser view.

### Claude marketplace

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed@vitverk-seed
```

In Claude Code, check `/mcp` after installation. Use a recent CLI: the additional listing fields require Claude Code 2.1.281 or later. For Claude chat and Cowork, test the ZIP through **Customize → Plugins → Add → Upload plugin**, then connect its remote connector. See the [Claude publishing guide](https://github.com/vitverk/seed-plugin/blob/main/docs/claude-publishing.md).

### OpenAI local marketplace

```sh
codex plugin marketplace add vitverk/seed-plugin
```

Use a supported desktop host's Plugins Directory to select **SEED by Vitverk** and install SEED, SEED Demo or seed-api. Repository marketplace availability varies by client. Public ChatGPT/Codex distribution requires the OpenAI submission flow; see the [OpenAI publishing guide](https://github.com/vitverk/seed-plugin/blob/main/docs/openai-publishing.md).

Routine answers and action confirmations stay in text. Ask explicitly for a card, calendar or visual view when you want one. Focused cards have local expansion for longer lists and do not follow unrelated background reads. Design changes are served by the MCP endpoint after connection metadata is refreshed; no skills ZIP is needed for appearance changes.

## Try it

- “Open a fresh SEED Demo guest companion.”
- “What can my Seedling do?”
- “Schedule an hour of harvesting in my open SEED Demo companion.”

The three bundled skills are `seed-game-guide`, `seedling-companion` and `manage-calendar`. The [game guide](skills/seed-game-guide/SKILL.md) links to topic indexes under `resources/` for getting started, care, building, economy, society, support and supplemental references. All 121 source documents are retained: 81 help-center pages plus 40 supplied manual, developer, local API and project documents. The package contains 133 Markdown files: three skill instructions, 121 sources, eight navigation indexes and one guest calendar reference. Source metadata, body hashes, citations and conflict links remain intact. The two guest workflows handle current simulation state and actions.

Use “How does farming work in the real SEED game?” or “What does the supplied manual say about Memoria?” to try documentation discovery. The hosted documentation interface uses `search_seed_docs`, `read_seed_doc`, MCP resources, and the MCP Skills extension to load relevant guides on demand. See [documentation resources](docs/help-center.md) for the catalog, source refresh process, and verification boundaries.

## Maintain and package

Requires Node.js 24 and Python 3. No app hosting credentials are needed.

```sh
npm ci
npm run check
npm run package
npm run smoke
npm run check:submission
```

`check` validates the package and runs offline regression checks. `package` writes separate ZIPs for SEED Demo, SEED and seed-api and checks their contents. `smoke` exercises the hosted anonymous endpoint using disposable detached sample state; it does not read or edit anyone's open guest. `check:submission` deliberately fails while required publisher information or review materials are missing. A passing local check does not imply directory approval.

| File | Purpose |
| --- | --- |
| `plugin.json` | Portable Agent Plugins identity and OpenAI listing/review metadata |
| `mcp.json` | Portable remote MCP connection |
| `.codex-plugin/plugin.json` | OpenAI compatibility manifest |
| `.claude-plugin/plugin.json` | Claude plugin and listing manifest |
| `.mcp.json` | Claude/legacy HTTP connection configuration |
| `.agents/plugins/marketplace.json` | OpenAI repository marketplace |
| `.claude-plugin/marketplace.json` | Claude repository marketplace |
| `skills/` | Two guest workflows and one game guide with topic resources |
| `submission/` | Readiness, review evidence plan, and demo walkthrough |

The ZIP contains one plugin and excludes marketplace catalogs, source deployment files, private app bindings, credentials, and repository history. This package connects to the existing hosted app; it does not deploy the service or replace its private development installation. Public demo package version **1.6.5**, SEED live package version **1.0.0**, SEED Demo server runtime **0.14.4**, and App-backed demo source version **1.7.4** are separate version lines. See [documentation resources](docs/help-center.md) for their shared three-skill layout.

See [release maintenance](https://github.com/vitverk/seed-plugin/blob/main/docs/releasing.md) and [platform support](https://github.com/vitverk/seed-plugin/blob/main/docs/platform-support.md). Use [GitHub Issues](https://github.com/vitverk/seed-plugin/issues) for package support.

## License and branding

The owner has deferred selection of a distribution license. Public repository access does not grant an open-source license. The existing SEED mark and app artwork are not relicensed by this package; rights clearance is a release requirement. See [asset provenance](https://github.com/vitverk/seed-plugin/blob/main/assets/README.md). Do not treat this prototype as an official Klang Games product.

## Optional MCP event experiment

Supporting Cloud Work hosts can discover `seed.demo.notification` on the same hosted endpoint. It emits clearly synthetic notifications independently of any open guest. `interval_minutes` defaults to 15; optional `until` is an absolute ISO 8601 stop time enforced by the server, including across subscription refreshes. Create a native event-triggered task and specify the response to each notification. Timer-based polling is a separate mechanism.

For example: “Create an event-triggered task for SEED Demo’s seed.demo.notification every minute, with until set to ten minutes from now. When one arrives, say SEED Demo event received, its sequence, and the fictional message.” Refresh the custom MCP connection’s metadata if the event is missing. This does not require re-uploading a skills ZIP. The public marketplace package’s direct MCP declaration remains desktop-only under current OpenAI import rules; web/Cloud Work needs its own eligible hosted connection. See [data behavior](docs/data-behavior.md) for retained subscription data.
