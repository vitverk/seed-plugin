---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-caretaking-and-home
title: Caretaking and home
description: This page explains caretaking and home.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-caretaking-and-home
source_url: null
source_path: tools/agent-play-api/library/concept-caretaking-and-home.md
source_version: null
language: en
category: Developer concepts
topics:
- caretaking and home
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:250e17b4a9bf45e139b3560a87e23ba22f6d1892753d7d9d7df0cdcecfdd60a8
conflicts_with: []
---

This page explains caretaking and home.

# Caretaking and home

## Needs and health
- Seedlings have needs, stats, mood, thoughts, skills and traits.
- Needs and stats are represented as attributes.
- `AttributeBag` holds attribute data on an entity.
- `AttributeBag.try_get_attribute_value` queries an attribute.
- `CharacterHealth.ailments` lists current ailments.
- An ailment has a type, body part, severity and unique ID.
- It also records expiry and the next treatment time in simulation ticks.
- `CharacterHealth.immunity` and `recent_recoveries` provide related state.
- `CharacterLife` holds life-related state.
- Needs decay and ailments can progress over time.
- Where the character's life stage allows it, deadly conditions first cause unconsciousness.
- A seedling's life stage determines which kinds of behavior apply.

## Remedy
- `CharacterHealth.request_apply_remedy` is a player command.
- Its request names an activity identifier and `ailment_unique_id`.
- The request also has `skip_queue`.
- Treat this as an activity request, not proof that treatment succeeded.
- Availability, access, resources and the activity outcome can matter.
- Re-read the ailment after the activity completes.
- Some treatment outcomes consume a remedy without curing the ailment.

## Home
- `Resident.assigned_residence` identifies the seedling's assigned residence.
- Read the referenced entity's `Residence` component for residence state.
- `Resident.set_residence` takes a `residence_id`.
- `Resident.remove_from_current_residence` removes the assignment.
- Residency is distinct from owning a building or being inside it.
- Use the command result to discover whether an assignment is allowed.
- An initial residence may be absent when a character is created.

## Decisions and autonomy
- `CharacterDecisions.pending_decisions` lists proposals awaiting response.
- Each proposal has a deadline and commits automatically if unanswered.
- `CharacterDecisions.respond_to_decision` approves or declines a proposal.
- `CharacterDecisions.autonomy_level` indicates the current autonomy level.
- How much a seedling decides alone depends on real time since the player was away.
- Autonomy decisions are distinct from ordinary activity selection.
- Observe both pending decisions and current activity when checking the seedling.
- Game time runs at 24 times real time: one simulation day takes one real hour.
- Do not interpret simulation ticks as wall-clock timestamps.
