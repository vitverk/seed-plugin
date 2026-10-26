# Observed data behavior

Technical preparation notes as of 2026-10-26. These notes are **not a privacy policy** and do not establish legal commitments or infrastructure-provider retention periods.

The app and server source describe an anonymous guest simulation. The guest world lives in browser memory, begins paused, and is lost on close or reload. The client does not use cookies, local/session storage, IndexedDB, or host widget storage to persist progress. There is no account flow or live SEED game API integration.

In supporting embedded hosts, the client sends captured summary and state through MCP Apps model context. The host may retain that context, conversation messages, and tool results according to its policies. The explicit **Share with chat** action sends a snapshot as a message and can trigger a response; normal model-context updates are separate.

The visible guest can create a temporary Cloudflare command mailbox. Its random scoped command capability appears in host context; a separate owner capability controls polling and acknowledgments. The mailbox holds bounded commands and receipts in memory, expires after five minutes without its owner heartbeat, and never owns or persists the game world. Acknowledged channel calls can change that same open guest. State-only tool calls transform a supplied detached snapshot and do not update the visible guest.

Cloudflare receives service requests and may retain ordinary infrastructure logs. Application observability is disabled in the inspected deployment configuration, but that does not establish zero provider logging. The source retains inert legacy storage bindings for deployment compatibility; it does not expose or delete any previous stored data. Exact service-log retention and historical-data handling are not established by these technical observations.

The owner selected **Vitverk** as publisher, **Iceland** as the intended marketplace audience, and confirmed **no payments or purchases**. The published Seed policies are [privacy](https://flaxa.app/privacy) and [terms](https://flaxa.app/terms); see [publication evidence](../submission/policy-check.json). Vitverk's known public contact is **support@vitverk.is**. These technical notes do not replace those policies or make claims about platform retention periods or jurisdictional enforcement.

Do not publish raw guest-channel credentials or context in screenshots, issues, logs, or review fixtures. The supplied smoke check uses synthetic detached state and stores a bounded non-sensitive summary.
