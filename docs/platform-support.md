# Platform support

Distribution requirements reviewed on **2026-10-26**. This page describes package routes and test boundaries; it is not a claim that every host has passed acceptance testing.

Seed Demo is an anonymous guest simulation. It does not connect to a live SEED account. Guest progress resides in the open view and resets when that view is reloaded or closed. Chat hosts may retain supplied context and tool results.

## Distribution surfaces

| Surface | Package route | What must still be verified in that host |
| --- | --- | --- |
| OpenAI ChatGPT and Codex | Portable root manifest with OpenAI metadata; follow the OpenAI publishing guide for the registered app and remote MCP submission | App connection, tool discovery, opening the embedded companion, current-view context, and confirmed mutations |
| Claude chat | Claude manifest, skills, and remote `.mcp.json` connector | Install/upload, connector activation, available tools, embedded app rendering, and current-view updates |
| Claude Cowork | Same Claude package and remote connector | Connector availability in the actual Cowork environment and the complete user workflow |
| Claude Code | Same package, installed from `vitverk-seed` or loaded with `--plugin-dir` | `/mcp` connection, skill loading, tool behavior, and any UI capability actually provided by the client |
| Standalone browser | Hosted companion at [mcp.flaxa.app](https://mcp.flaxa.app) | Interactive guest controls; host chat context is unavailable outside an embedding chat host |

Claude's documented cross-surface components include skills and remote MCP connectors. Claude chat and Cowork expose a bundled remote server through the plugin's Connectors tab; installation alone does not establish a connected session. Claude Code connects to the declared server directly. Local stdio servers have narrower availability, so this package uses the existing remote endpoint. [Claude plugin structure and testing](https://claude.com/docs/plugins/build)

## Tools and interactive views

MCP tool access and an embedded MCP App are different capabilities. A successful HTTP smoke check proves the operations it exercised against that endpoint; it does not prove host installation, rendering, context delivery, or mobile support. A manifest can describe the integration without adding UI features to a host that does not implement them.

Use the capabilities available in the current session. An open guest's supported document tools or acknowledged guest channel can act on that view. A detached snapshot result confirms only that the supplied snapshot changed. Do not claim the visible calendar changed without a current-view receipt or other direct evidence. Preserve an existing guest when diagnosing missing context rather than opening another guest to answer about it.

Record host name/version, plugin version, endpoint, test date, prompts, relevant receipts, and whether UI/state changes were observed. Keep failures and unavailable capabilities in the record. Physical mobile-device behavior requires a device test; desktop or protocol checks do not establish it.

## Publication status

GitHub availability, repository-marketplace installation, account-local installation, and official directory publication are separate states. The Claude directory requires its own submission and review. Submit both the remote connector and the plugin from the same organization when distributing a product that provides both. No MCPB package is required for Seed Demo's hosted HTTP server. [Claude directory publishing](https://claude.com/docs/directory/publish)

OpenAI's public directory and repository marketplaces are also separate distribution routes. The portable package and OpenAI-specific metadata follow the [OpenAI plugin packaging guide](https://developers.openai.com/plugins/build/plugins); public listing follows the [OpenAI submission process](https://developers.openai.com/plugins/deploy/submission).

The owner selected Vitverk, Iceland, and no payments or purchases. Both platform manifests use the Seed Demo-specific policy URLs at `https://flaxa.app/privacy` and `https://flaxa.app/terms`. OpenAI declares `IS`; Claude's reviewed manifest has no documented country-targeting field, so confirm its publication availability in the portal. These metadata do not geographically restrict the public repository or endpoint.

Before claiming submission readiness, complete portal identity and review-contact checks, licensing and asset rights, the deferred demo video, required Claude screenshots, and host acceptance testing. The policy pages are published and verified; see [publication evidence](../submission/policy-check.json). See [Claude publishing](claude-publishing.md) for the remaining preparation gaps. `npm run check:submission` is a repository readiness gate, not a substitute for either platform's review.
