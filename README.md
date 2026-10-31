# SEED by Vitverk

Connect your SEED account at **https://mcp.flaxa.app/mcp** using OAuth and Streamable HTTP. The plugin is optional: the same server works with compatible MCP clients directly.

SEED provides account and Seedling data, care and production reads, game guidance, persistent account notes, permission-scoped actions and interactive views. It shows useful focused cards for substantive answers and verified society completions, character milestones/health changes, saved-plan updates, priority supply transitions and project stages. Panels explain their trigger, group at progress reviews and remember delivered milestones across chats. Simple facts, unsaved proposals and action receipts stay in text; full companion views open when requested. The companion speaks in game terms and groups meaningful outcomes into concise updates. It verifies direct interventions with focused checks, spaces stable settlement reviews farther apart, and waits much longer during quiet periods. Observation frequency and reporting frequency are separate; unchanged checks stay quiet.

## Install or connect

Install **SEED** from the **SEED by Vitverk** repository marketplace. Codex and Claude Code both install it as `seed`, with an MCP server also named `seed`; Claude Code installs it from the [`claude`](claude/) folder.

```sh
codex plugin marketplace add vitverk/seed-plugin
codex plugin add seed@vitverk-seed
```

If you added the marketplace earlier, run `codex plugin marketplace upgrade vitverk-seed` first so Codex sees the current catalog.

For Claude Code:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed@vitverk-seed
```

Gemini CLI requires supported model authentication, such as a Gemini API key or an eligible existing organizational entitlement. Personal Google sign-in, including Google AI Pro and Ultra, stopped serving Gemini CLI requests on 18 June 2026; see Google's [deprecation notice](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals).

With model access configured, install the extension from the repository's `main` branch:

```sh
gemini extensions install https://github.com/vitverk/seed-plugin --ref main
```

Restart Gemini CLI, then run `/mcp auth seed` to authorize your SEED account separately from Google's model access. The extension and MCP server are both named `seed`. Authenticated SEED tool use remains unverified in Gemini CLI; this package does not install a consumer Gemini web app or establish interactive-card support. See the [Gemini CLI quickstart](docs/colleague-quickstart.md#gemini-cli) for authentication, status and update commands.

Sign in with your own licensed SEED account. The first sign-in asks for all currently supported SEED permissions together: profile, character information, societies, wallet, static data and market reads, and developer access. Codex also requests `offline_access` for refresh access. Review and explicitly approve the requested access during sign-in. Developer access can enable actions that change the game and also requires the upstream SEED MCP developer role. Wallet and market read access does not authorize purchases.

Installing or updating the plugin, or requesting a scope, does not grant access. Existing grants remain unchanged; reconnect and approve a new consent request if your connection needs additional permissions. The connection files and Gemini CLI server entry are URL-only; the permissions come from the server's OAuth discovery. See the [connection quickstart](docs/colleague-quickstart.md) and [data behavior](docs/data-behavior.md).

SEED is the sole plugin offered by this repository. The former optional direct API plugin has been removed; use SEED for the connected companion.

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

The archive contains the authenticated SEED package only. Smoke checks verify public routing and OAuth metadata; `SEED_SMOKE_TOKEN` enables bounded authenticated documentation and widget-discovery checks. Keep tokens out of shell history and logs. See [release checks](docs/releasing.md).

This repository distributes source and packages; it is not an approved public directory listing. Public submission has separate identity, policies, licensing and host-review requirements. `npm run check:submission` reports the unresolved requirements for SEED and does not reuse evidence from the retired simulation.

The former anonymous simulation is retired from active catalogs and releases. Its old endpoint is not redirected to SEED. Codex and Claude Code now both use the `seed` name for the authenticated companion, so an old demo install of `seed@vitverk-seed` in either host becomes SEED once its marketplace refreshes, and asks for sign-in. Its historical material was removed in 3.3.0 and remains in the Git history.
