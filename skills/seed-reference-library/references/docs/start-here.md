---
schema_version: 1
id: seed-agent-play-pr34377:docs/start-here
title: Start here
description: 'Start playing: identity, actions and verification.'
document_type: workflow
source_type: local_api_reference
source_collection: seed-agent-play-pr34377
source_id: docs/start-here
source_url: null
source_path: tools/agent-play-api/docs/start-here.md
source_version: null
language: en
category: Local API workflows
topics:
- start here
- local api workflows
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:ad58c2ee4850b0301939d29ded9a44bee27a70ae713066749f52fdcd830a0539
conflicts_with: []
---

Start playing: identity, actions and verification.

# Start here

Use `whoami` for your player, society and owned seedlings. Entities hold components: `get_entity` reads one, and `query_entities` finds them by ID, component or position. `list_commands` and `describe_command` discover actions; `send_command` sends player-role commands. Use `role: "all"` to inspect other roles. `staticdata_lookup` searches local game definitions; use `resolved: true` for inherited fields. Local data may differ from the world. `list_events` polls observed changes. Sources are sampled about every 20 seconds and can miss short-lived changes. `character_chat_history` reads conversations.

Use `seedling_card`, `sim_time`, `wallet_history`, `query_land`, `query_landscape_objects` and `docs_search` for status, time, history, land and documentation.

Observe the current state, act, then read the relevant state again. Command acceptance does not prove completion. If the outcome is unknown, read state before retrying.

In `CharacterInventory.reservation_handles`, keys are resource IDs; values are reservation handles, not entity IDs. Look up an authored resource ID in `GameType` with `staticdata_lookup`.

## Seedling actions

Use `find_actions` to discover enabled nearby activities and ready-to-send requests.

For an action on a target, send `ActivitySelection.get_context_menu_activities` to the seedling with the target as `issuer_id`. For a landscape cell use its tile ID as `issuer_id` and also supply `grid_index`. The menu returns activity identifiers, availability and disabled reasons.

“No access” in an activity menu can mean the target is in a zone or room the seedling cannot use. Check the target location and the access granted there.

The activity menu does not include all social actions. For seedlings who have not been mutually introduced, inspect `InteractionAgent.start_introduction` on the acting seedling. For introduced pairs, inspect `InteractionAgent.get_context_menu_speech_primitives` and `InteractionAgent.start_directed_opening`.

Use `describe_command` to inspect the request. For ordinary activities, send the returned identifier to `ActivitySelection.enqueue_activity`; for resource transfers inspect `enqueue_resource_transfer`. For a landscape cell, include `tile_id` and `grid_index` in `grid_cell`. Recheck availability when circumstances change.

Check the inner response. Allow time and compare relevant activity, inventory or other state before and after. `CharacterSchedule` event `start_time` and `duration` are in simulation hours; `start_time` is from 0 inclusive to 24 exclusive. See `library-concept-activities-and-schedules.md` for more.

Schedule events require a nonempty `days_of_week`, including one-time events. Values are 0 through 6.

## More

This API has no dedicated tools to read the Spark feed or reactions or create a Spark post. A chat reply or accepted activity does not verify a post.

Read `elections.md`, `market.md`, `onboarding.md` and `plots-and-claims.md` for specific recipes. `docs_search` finds pages, or lists them without a query; `library-index.md` lists the reference library, which is not verified against the live game.
