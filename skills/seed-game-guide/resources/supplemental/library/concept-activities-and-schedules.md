---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-activities-and-schedules
title: Activities and schedules
description: This page explains activities and schedules.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-activities-and-schedules
source_url: null
source_path: tools/agent-play-api/library/concept-activities-and-schedules.md
source_version: null
language: en
category: Developer concepts
topics:
- activities and schedules
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:ca11a58ed8310408aec7afb597705746d720c7540024a1c781e0fde190a943f3
conflicts_with: []
---

This page explains activities and schedules.

# Activities and schedules

## Autonomous behavior
- Seedlings are agents that choose and execute activities.
- An issuer offers an activity: a bed, a plot, a machine or another agent.
- Agents discover available activities and select among eligible candidates.
- Needs, priorities, distance and other conditions affect selection.
- The highest-scoring candidate must also beat an interruption margin.
- Forced activities bypass ordinary scoring and the interruption margin.
- Activities can require a free slot, access, resources or another agent.
- A chosen activity can fail after it begins.
- Outcomes apply on successful completion.

## Inspect the seedling
- `ActivityAgent.current_activity` is optional.
- `ActivityAgent.pending_activity` and `activity_queue` show pending work.
- `ActivityAgent.slot_reservations` records reserved issuer slots.
- `ActivityAgentClient.current_activity_id` identifies the displayed activity.
- `ActivityAgentClient.issuer_entity_id` identifies its issuer.
- `ActivityAgentClient.other_agent_id` may identify a second agent.
- `ActivityAgentClient.user_facing_selection_reason` can explain selection.
- `CharacterSchedule` holds schedule data.
- `ActivitySource` exists on entities offering activities.
- `ActivitySource.get_registered_activities` is a schema command for inspection.
- A building can summarize activities offered by objects inside it.
- The individual indoor objects become candidates once the agent is inside.

## Scheduling
- Schedule slots specify a location and priorities.
- A player sets ordinary schedule priorities.
- An employer sets the priorities for a job role's shift.
- Without productive priorities a seedling can still fulfill needs and idle.
- A schedule zone defines an area for a player's seedlings.
- `CharacterSchedule.add_event`, `change_event`, and `remove_event` edit events.
- `apply_schedule_preset` applies a saved preset.
- `set_schedule_suspended` changes whether the schedule is suspended.
- The live request schema determines the event and priority fields.

## Direct control and troubleshooting
- Direct control overrides autonomy to run or queue a requested activity.
- `ActivityAgentCommands.abort_current_activity` aborts the current activity.
- Check issuer access and whether an appropriate slot is available.
- Check the active schedule and the priorities for productive work.
- A missing prerequisite may require hauling resources first.
- If no source can supply the prerequisite, the activity cannot run.
- Two-agent activities also depend on an available eligible partner.
- Re-read state after an abort or request; acceptance is not completion.
