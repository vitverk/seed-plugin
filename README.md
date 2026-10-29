# SEED by Vitverk

Connect your SEED account at **https://mcp.flaxa.app/mcp** using OAuth and Streamable HTTP. The plugin is optional: the same server works with compatible MCP clients directly.

SEED provides account and Seedling data, care and production reads, game guidance, persistent account notes, permission-scoped actions and interactive views. It prefers one useful focused card for substantive care, inventory, health, goals and schedule answers. Simple facts, proposed plans and action receipts stay in text; full companion views open when requested. The companion speaks in game terms, reports verified successes, and shares meaningful progress toward your goals during ongoing play.

## Install or connect

Install **SEED** from the **SEED by Vitverk** repository marketplace. Existing authenticated installations retain the internal `seed-live` identifier and connection configuration; their display name is now SEED.

```sh
codex plugin marketplace add vitverk/seed-plugin
```

For Claude Code:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed-live@vitverk-seed
```

Sign in with your own licensed SEED account. Developer tools require the SEED MCP developer role and the relevant OAuth permissions. See the [connection quickstart](docs/colleague-quickstart.md) and [data behavior](docs/data-behavior.md).

The optional **SEED API** plugin connects directly to Klang's API for developer workflows and upstream-only capabilities. It is a separate interface, not another SEED companion. Most users need only SEED.

## Use it

- “How are my seedlings doing? Don't change anything.”
- “What do I have in storage?”
- “Open my SEED account view.”
- “Save my SEED goals and context remotely.”

Guidance loads on demand through `search_seed_docs`, `read_seed_doc` and `seed://docs/index`. The SEED package bundles no skills. Refresh connection metadata and start a new chat after upgrading to receive the new name and widget guidance.

## Development and release

Requires Node.js 24+ and Python 3.

```sh
npm ci
npm run check
npm run package
npm run smoke
```

The default archive is the authenticated SEED package only. `npm run package:api` additionally builds the optional API archive. Smoke checks verify public routing and OAuth metadata; `SEED_SMOKE_TOKEN` enables bounded authenticated documentation and widget-discovery checks. Keep tokens out of shell history and logs. See [release checks](docs/releasing.md).

This repository distributes source and packages; it is not an approved public directory listing. Public submission has separate identity, policies, licensing and host-review requirements. `npm run check:submission` reports the unresolved requirements for SEED and does not reuse evidence from the retired simulation.

The former anonymous simulation is retired from active catalogs and releases. Its old `seed` identity and endpoint are not redirected to SEED. Historical material is preserved under [archive/demo](archive/demo/RETIRED.md); it is excluded from packages and release checks.
