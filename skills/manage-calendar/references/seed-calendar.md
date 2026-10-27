---
schema_version: 1
id: seed-plugin:skills/manage-calendar/references/seed-calendar
title: Seed guest calendar reference
description: Explain the guest simulation calendar, state scope and recurrence contracts.
document_type: reference
source_type: derived
source_collection: seed-plugin
source_id: skills/manage-calendar/references/seed-calendar.md
source_url: null
source_path: skills/manage-calendar/references/seed-calendar.md
source_version: null
language: en
category: Documentation navigation
topics:
  - guest-simulation
  - calendar
retrieved_at: null
imported_at: null
verification_status: derived
conflicts_with: []
content_hash: sha256:27bf637fa9ab54b3e3b10de1b3c293f72c8196f42f0b427842c8597cfa939efb
---

# Seed guest calendar reference

This reference describes the temporary Seedling guest simulation. The current tool schemas, `get_companion_capabilities`, and observed guest state define its supported behavior. Progress lives in the open view and resets on reload or close; the calendar does not connect to an external account or personal calendar.

## State and context

Use the latest observation from the relevant guest. Preserve its browser session identity, game clock and world version. A current `guestChannel` lets remote tools read or change that same open view; document-local tools and visible controls also act on it. Keep channel credentials out of prose.

Captured companion context is an observation, not a promise of continuous access. A compact summary is not a full snapshot. Without a current guest target, remote mutations require an explicitly supplied full `state` and remain detached from the visible view. Report that scope. Missing context does not mean an empty calendar, and a fresh demo cannot answer questions about an existing guest.

## Game time and recurrence

“Today” means `state.clock.day`; a selected future day is not today. Times are game minutes after midnight, so 09:00 is 540. Day 1 is Monday. Sort matching blocks by start time and retain their location and recurrence when presenting the schedule.

| Repeat | Occurrences |
| --- | --- |
| `once` | On the block's start day only. |
| `daily` | Every day from the start day. |
| `weekdays` | Monday–Friday from the start day. |
| `weekly` | Every seven days, anchored to the start day. |

Editing or deleting a recurring block changes the whole series; there are no single-occurrence exceptions. Preserve an explicit requested day and time. Blocks cannot overlap or cross midnight, and the guest holds at most 50 blocks. If the requested slot is unavailable, report the conflict rather than removing another activity or silently moving the request.

## Plans, execution and fiction

A planned block is not proof that work is running or complete. A due block queues one action for its duration when capacity permits; a full queue records a skipped action, and earlier running work can delay it. Production makes one batch per action, rather than multiplying output for a longer block. Prerequisites and the returned events determine actual effects. Editing or removing a block cancels its queued work and leaves already-running work to finish.

Modeled activities use the catalog's compatible locations and recipes. Custom activities carry fictional provenance: their titles and narrative do not create resources, wages, skill gains, purchases or external effects. Ordinary clock effects still apply. A failed modeled action must not be relabeled as successful fiction.

Preserve existing activities, recurrence and clock state unless the user asks to change them. Use a fresh `commandId` and the latest `expectedVersion` for a new mutation; reuse the same ID and arguments only for an uncertain retry. Report a visible-view change only after its acknowledgment. Goals stack queued activities and do not add timed or recurring calendar blocks by themselves.
