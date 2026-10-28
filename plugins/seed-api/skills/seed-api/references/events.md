# MCP Events verification

Reviewed 28 October 2026 against the developer’s `mcp-dev2` announcement and
[OpenAI’s Events contract](https://developers.openai.com/plugins/build/mcp-events).
The feature is included upstream but disabled pending Klang’s callback-host
configuration. Authenticated dev2 discovery passed on 28 October (server `a846fcb5`), before
and after token refresh. Delivery remains unverified. The advertised webhook
events are `seedling.chat_reply` and `seedling.need_crisis_started` (optional
`seedling_id` filter for your own Seedling), plus `user.notification` (no filters).
This push catalog differs from the broader sampled polling names.

Use the direct SEED API connection. The Flaxa proxy currently exposes tools and
resources only; it does not forward Events. `user_events` is a separate sampled
polling tool. A successful polling call is not a push-delivery test.

## Discovery gate

MCP Events requires MCP 2.0 (`2026-07-28`), `server/discover` advertising
`capabilities.events`, and `events/list`, `events/subscribe`, `events/unsubscribe`
on the authenticated endpoint. OpenAI supports Work on web, Work with Cloud in
the desktop app, and dots. Refresh the plugin’s server scan after changes.

From the repository, `npm run probe:api-events` performs bounded, read-only
discovery. Supply a dev2 access token as `SEED_API_ACCESS_TOKEN` through a secure
environment; never put it in a command argument, source file or committed report.
Without a token the probe checks only the anonymous authentication boundary.
It never subscribes, configures a callback or changes the game.

## Bounded host acceptance test

After Klang enables the real host destination, connect dev2, sign in and rescan.
Choose one actual event and its exact filters from the discovered catalog.
Ask ChatGPT in a supported host to watch that event for a short test, report one
matching update, and then stop. Keep the test read-only unless the user separately
authorizes a game action needed to produce the event. Do not create a Seedling
just to generate a test event.

Record each stage independently:

1. Discovery: endpoint/world, protocol, advertised event/filter/payload schemas.
2. Subscribe: correct account and filters; returned ID and expiration.
3. Verification: signed HTTPS challenge succeeds before application data flows.
4. Delivery: a matching event receives HTTP 2xx from the host callback.
5. Chat receipt: the subscribed chat receives it and follows the test instruction.
6. Filtering: a nonmatching event does not arrive; silence alone is inconclusive.
7. Stop: unsubscribe succeeds and subsequent matching events stop arriving.

OpenAI uses Standard Webhooks signatures and the subscription ID header.
The payload contains `eventId`, `name`, `timestamp`, `data` and `cursor`.
Keep callback URLs, signing secrets and private game payloads out of reports.

Before relying on sustained monitoring, also test repeated subscription requests,
refresh/expiry across restart, disconnection/revoked access, bad signatures,
duplicate delivery and bursts. Preserve replay/truncation limits from the actual
server. Events prompt a fresh bounded state read before any authorized response;
they are not a complete health feed or new permission to make game changes.

Report the first blocked stage precisely. An anonymous 401, discovered catalog,
successful subscription, webhook 2xx and actual chat receipt prove different
things. Never mark delivery verified from an earlier stage alone.
