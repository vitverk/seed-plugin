# Seed plugin

Seed is a temporary Seedling companion simulation with an interactive calendar, activities, resources, needs, and ordered goals. Open a populated guest, plan its day, and inspect the results of simulated work. It uses an anonymous hosted MCP server; you do not need a Seed account, API key, or local server.

**This repository is a public distribution and submission-preparation package. It is not an approved OpenAI or Claude directory listing.** The manifests and ZIP can be validated locally. Publisher verification, policy pages, licensing, recorded demo, and host review evidence still need completion before official submission. See the [readiness checklist](https://github.com/vitverk/seed-plugin/blob/main/submission/readiness.json).

Seed is an independent prototype, with no Klang Games API connection or control over a live SEED game account. Progress lives in the open guest view, starts paused, and disappears on reload or close. No simulation continues after closing the view. The chat host may retain shared context and tool results; see [data behavior](https://github.com/vitverk/seed-plugin/blob/main/docs/data-behavior.md).

![Actual standalone Seed companion](https://raw.githubusercontent.com/vitverk/seed-plugin/main/docs/images/standalone-companion.png)

*Standalone browser capture, 26 October 2026. This is not evidence of ChatGPT or Claude host acceptance.*

## Connect or install

Remote MCP endpoint: **`https://mcp.flaxa.app/mcp`**

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

Use a supported desktop host's Plugins Directory to select **Seed by vitverk** and install Seed. Repository marketplace availability varies by client. Public ChatGPT/Codex distribution requires the OpenAI submission flow; see the [OpenAI publishing guide](https://github.com/vitverk/seed-plugin/blob/main/docs/openai-publishing.md).

## Try it

- “Open a fresh Seed guest companion.”
- “What can my Seedling do?”
- “Schedule an hour of harvesting in my open Seed companion.”

The two bundled skills cover companion state, activities, resources and goals (`seedling-companion`), and game schedules and recurring routines (`manage-calendar`). They distinguish edits acknowledged by the current visible guest from detached snapshot edits. A read question should reuse current state, never reset the demo.

## Maintain and package

Requires Node.js 24 and Python 3. No app hosting credentials are needed.

```sh
npm ci
npm run check
npm run package
npm run smoke
npm run check:submission
```

`check` validates the package and runs offline regression checks. `package` writes a repeatable ZIP and checks its contents. `smoke` exercises the hosted anonymous endpoint using disposable detached sample state; it does not read or edit anyone's open guest. `check:submission` deliberately fails while required publisher information or review materials are missing. A passing local check does not imply directory approval.

| File | Purpose |
| --- | --- |
| `plugin.json` | Portable Agent Plugins identity and OpenAI listing/review metadata |
| `mcp.json` | Portable remote MCP connection |
| `.codex-plugin/plugin.json` | OpenAI compatibility manifest |
| `.claude-plugin/plugin.json` | Claude plugin and listing manifest |
| `.mcp.json` | Claude/legacy HTTP connection configuration |
| `.agents/plugins/marketplace.json` | OpenAI repository marketplace |
| `.claude-plugin/marketplace.json` | Claude repository marketplace |
| `skills/` | Companion and calendar workflows |
| `submission/` | Readiness, review evidence plan, and demo walkthrough |

The ZIP contains one plugin and excludes marketplace catalogs, source deployment files, private app bindings, credentials, and repository history. This package connects to the existing hosted app; it does not deploy the service or replace its private development installation. Package version **1.3.0** and server runtime **0.9.0** are separate version lines.

See [release maintenance](https://github.com/vitverk/seed-plugin/blob/main/docs/releasing.md) and [platform support](https://github.com/vitverk/seed-plugin/blob/main/docs/platform-support.md). Use [GitHub Issues](https://github.com/vitverk/seed-plugin/issues) for package support.

## License and branding

A distribution license has not yet been selected. Public repository access does not grant an open-source license. The existing SEED mark and app artwork are not relicensed by this package; rights clearance is a release requirement. See [asset provenance](https://github.com/vitverk/seed-plugin/blob/main/assets/README.md). Do not treat this prototype as an official Klang Games product.
