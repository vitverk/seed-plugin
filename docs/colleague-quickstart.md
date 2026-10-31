# Connect SEED

Use **https://mcp.flaxa.app/mcp** in a compatible OAuth-capable MCP client, or install **SEED** from the **SEED by Vitverk** repository marketplace. A plugin installation is optional. Sign in with your licensed SEED account and review the permissions before explicitly approving consent.

The first sign-in asks for all currently supported permissions, which the server advertises: `seed:profile:read`, `seed:character-information:read`, `seed:societies:read`, `seed:wallet:read`, `seed:staticdata:read`, `seed:market:read` and `seed:developer`. Codex also requests `offline_access` for refresh access. Requesting these scopes does not grant them; access depends on the approved OAuth grant and the upstream account's permissions. Wallet and market read scopes do not authorize purchases.

For a new Codex connection:

```sh
codex mcp add seed --url https://mcp.flaxa.app/mcp --oauth-client-registration dcr
codex mcp login seed --oauth-client-registration dcr
```

If you also install the plugin, Codex uses this custom `seed` server in place of the plugin's, so SEED tools are not listed twice.

Existing connections may have an older local name. Use the name reported by your client when reconnecting. Updating the plugin does not expand existing grants or refresh tokens. To add missing permissions, explicitly reconnect and approve the new consent request; refreshing metadata or opening a new chat alone does not grant access. Existing `/live/mcp` and `/staging/mcp` URLs remain compatibility aliases; new connections should use `/mcp`.

The canonical connection discovers the OAuth issuer `https://mcp.flaxa.app` and uses `/oauth/authorize`, `/oauth/token` and `/oauth/register`. Existing alias connections retain the `/staging` issuer and their own resource audiences. If a connection at `/mcp` still opens `/staging/oauth/authorize`, refresh its OAuth metadata and reconnect at `/mcp`. These proxy URLs do not change the upstream game world.

Open a new chat and ask for a care overview without changing anything. SEED can show a useful focused card for substantive questions. Ask for text only when preferred, or “Open my SEED account view” for the full companion. A previous card does not cause background refreshes.

The requested developer scope can enable commands that change the game and also requires the upstream SEED MCP developer role. A scope request cannot assign that role. Use actions only within the user's authorized task; a successful receipt is not proof that the requested work finished. Missing permissions require explicit reauthorization, not a switch to a different account or interface.

The current upstream deployment is the `mcp-dev2` staging world. This is an environment detail, not a separate plugin. Rediscover world-specific identifiers after a world migration; older notes and credentials may not apply.

SEED is the sole plugin offered by this repository. If you previously installed the separate SEED API plugin, remove it in your client and use SEED. Removing it from the repository does not uninstall existing client installations.

Refresh MCP metadata and start a new chat after an upgrade. Codex and Claude Code both install `seed@vitverk-seed`, whose MCP server is named `seed`. The earlier `seed-live@vitverk-seed` plugin and its `seed_live` server are no longer offered. To move a Codex install over, refresh the marketplace, replace the plugin and sign in again:

```sh
codex plugin marketplace upgrade vitverk-seed
codex plugin remove seed-live@vitverk-seed
codex plugin add seed@vitverk-seed
```

In Claude Code, uninstall `seed-live@vitverk-seed` if it is still installed and install `seed@vitverk-seed`. The retired anonymous demo plugin is no longer offered and cannot be used to control your SEED account. An old demo install of `seed@vitverk-seed` in either host becomes the authenticated SEED companion once its marketplace refreshes, and always requires sign-in.

## Gemini CLI

First configure supported Gemini CLI model access: a [Gemini API key](https://geminicli.com/docs/get-started/authentication/#use-gemini-api-key) or an eligible existing organizational entitlement. Personal Google sign-in, including Google AI Pro and Ultra, stopped serving Gemini CLI requests on 18 June 2026, as Google's [deprecation notice](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) explains. The separate `/mcp auth seed` flow authorizes SEED access and cannot resolve a Google model-access rejection.

With Gemini CLI and Git installed, run these commands in your terminal:

```sh
gemini extensions install https://github.com/vitverk/seed-plugin --ref main
gemini extensions list
```

The explicit `main` ref follows this repository's release branch. Restart Gemini CLI after installing or updating. In its interactive session, run:

```text
/extensions list
/mcp auth seed
/mcp list
```

Complete SEED sign-in in the browser and review the requested permissions. The extension configures `seed` with the canonical Streamable HTTP endpoint through `mcpServers.seed.httpUrl`; OAuth settings come from server discovery. If your Gemini CLI `settings.json` already defines a server named `seed`, that configuration takes precedence over the extension's. See Google's [extension reference](https://geminicli.com/docs/extensions/reference/) and [MCP authentication guide](https://geminicli.com/docs/tools/mcp-server/#managing-oauth-authentication).

Ask “How are my seedlings doing? Use text only and don't change anything.” Guidance comes from the server through `search_seed_docs`, `read_seed_doc` and `seed://docs/index`; this extension adds no skills, `GEMINI.md` or hooks. Authenticated SEED tool use remains unverified in Gemini CLI, and this package makes no claim of interactive-card support in the CLI or consumer Gemini web app. See the [client support record](platform-support.md) for the tested onboarding limitation.

To update, run `gemini extensions update seed` in your terminal, then restart Gemini CLI. Updating preserves existing OAuth grants; use `/mcp auth seed` when reauthorization is needed.

## Antigravity CLI

Install and sign in to Antigravity CLI using Google's [quickstart](https://antigravity.google/docs/getting-started/). Personal Google model sign-in works in the tested Antigravity version. Install the SEED Gemini extension with the command above if needed; extension installation does not require Gemini CLI model access. Then import it using Google's [migration workflow](https://antigravity.google/docs/cli/gcli-migration):

```sh
agy plugin import gemini
agy
```

Open `/mcp`, select `seed_seed`, then choose **Authenticate**. Complete SEED sign-in and review its permissions separately from Google model sign-in. For a read-only trial, omit developer access during consent. The importer converts `httpUrl` to `serverUrl` in native `mcp_config.json`; the imported plugin is `seed`, while its runtime server name is `seed_seed`.

Ask “Show my SEED profile in text. Don't change anything.” With Antigravity 1.4.12 and SEED 3.4.0, this returned visible profile values, and saved SEED authorization worked in fresh headless processes. The current deployed server's documentation tools return success receipts but omit search links and document text from the model-visible result, so documentation navigation remains blocked pending a server fix and retest. Interactive cards remain unverified. See the [client support record](platform-support.md).
