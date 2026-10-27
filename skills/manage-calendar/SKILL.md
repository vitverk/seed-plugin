---
name: manage-calendar
description: Read or change the Seed Seedling game calendar, modeled or fictional activities, and once, daily, weekday or weekly routines. Use for “what is on my calendar?”, “what is Bowen doing today?”, brief “Schedule?” follow-ups, and requests to add or change activities in Seed context.
---

# Manage a Seedling calendar

In Seed context, schedule/calendar/harvesting refers to the **Seedling's game calendar**. Do not search Codex automations, cron or external calendars unless the user explicitly asks for those. Seed is a guest simulation: no login, saved progress or live SEED control.

## Answer calendar questions

For “what is on my calendar?”, “what does Bowen have today?” or “Schedule?”, use the latest successful browser read or the latest embedded companion context for the relevant session. Follow the companion's [state and freshness guidance](../seedling-companion/SKILL.md#answer-activity-and-status-questions). Read-only questions need no mutation, time advancement, research or fresh demo.

Today means `state.clock.day`. A selected future calendar day is not today. Include one-off blocks on their day, daily blocks from their start day, weekday blocks on Monday–Friday from their start day, and weekly blocks every seven days anchored to their start day. Day 1 is Monday in this demo. Sort by start time. Give game times, activity names, locations and daily recurrence when relevant. Retain the fictional provenance of custom activities; a fictional plan does not establish resource effects or external changes. A planned block is not proof that an action is currently running or completed: use active actions and history for those claims. State when the clock is paused.

If document-local tools are unavailable but current companion context or explicit shared state exists, answer from it and label it as the latest shared state. Do not claim no calendar access: a current guestChannel can read the visible guest, and captured context can answer directly. If no usable state or visible UI is available, offer the companion's single **Share with chat** fallback; opening another demo would answer a different question.

For an outcome with several dependent activities, use the companion’s [goal workflow](../seedling-companion/SKILL.md#connected-simulation-loops). A goal stacks queued actions; it does not add timed calendar blocks or recurring routines unless those are separately requested.

## Fast path for the open demo

1. Reuse the open Seed view. If its latest context includes `guestChannel`, call remote `get_seedling_state`, `schedule_activity` or `update_schedule` with that channel instead of state. Mutations require a new `commandId` and the latest `state.version` as `expectedVersion`. An acknowledged channel mutation changes the same visible calendar without browser discovery or manual sharing. See the companion’s channel instructions for uncertain retries. Use its document-local App-side tools through the MCP Apps bridge when available, or discover its browser WebMCP tools. Both act on the same visible guest. Do not reopen/reset it.
2. Call `flaxa_get_state({})` once. Parse a JSON-string response if needed, then inspect `ok` and use its `state.version`, game day/time, schedule and valid locations.
3. Call the matching tool below. Every mutation requires a fresh `commandId` and `expectedVersion`. Use the successful result as the next state and confirmation; do not add a redundant read.

Return the command receipt before any separate visual capture. If a later screenshot times out, the calendar may already have changed. For uncertain completion or repeated stale tool registration, follow [embedded host recovery](../seedling-companion/SKILL.md#embedded-host-recovery); preserve the current guest and avoid duplicate commands.

| Request | Browser tool and intent |
|---|---|
| “Schedule harvesting” / “set the schedule to harvesting” without a named existing block | `flaxa_schedule_activity` with `activity: "harvest"`. Adds one hour in today's next free half-hour-aligned slot, preserving other blocks. State the chosen time. |
| Specific day/time/duration or recurring routine | Same tool, adding `day`, `startMinute`, `durationMinutes`, `repeat` and optional `locationId`, `recipeId`, `title`. |
| A game request outside the modeled activity catalog | `flaxa_schedule_activity` with `activity: "custom"`, a concise invented `title`, reasonable `durationMinutes` (default 30) and a suitable existing `locationId`. Briefly call it fictional. |
| Change/move/resize a particular block | `flaxa_update_schedule` with `operation: "upsert"` and the complete existing `block`, retaining its `id` and unchanged fields. |
| Remove a block | `flaxa_update_schedule` with `operation: "delete", blockId`. |
| “Harvest now” | `flaxa_queue_action`; this starts/queues an action without creating a calendar block. |
| Run the schedule / skip ahead | `flaxa_set_clock` / `flaxa_advance_time`. Only advance or start time when requested. |

For example, after a read returning version `v`, schedule harvesting with:

```json
{"activity":"harvest","commandId":"<new-intent-id>","expectedVersion":123}
```

Replace `123` with `v`; do not fabricate a version. Defaults select a compatible location and the next free 60-minute slot. On the fresh demo this is Day 1, 10:00–11:00. Do not hard-code that time for an existing session.

## Interpret and preserve intent

- Times are **game minutes after midnight**: 09:00 = 540. Tomorrow = `state.clock.day + 1`. Preserve an explicit time; an overlap is an error, not permission to move it. If no time is supplied, let the helper choose. If the user specifies “morning”, choose a free morning interval from the calendar rather than accepting the future-day default of midnight.
- Add one block for an unspecified scheduling request. If the user clearly references an existing block, edit it by ID. If several blocks match, ask which one. Do not replace the whole day, remove meals/rest, or change unrelated routines without instruction.
- “Work more” following a harvesting discussion can add one hour of harvesting in the next free slot, stating the choice. When the user asks to replace social time in a discussion of today's plan, identify the social block and its recurrence first. If doing so would also alter future days, ask only whether to change the whole daily routine; do not silently remove it or ask the user to restate the entire request. “Stop socialising” may instead refer to a queued/running action; inspect that state before editing the calendar. Queued actions can be cancelled, running actions cannot.
- Use the modeled activity for a modeled request. For other game requests, schedule a custom fictional activity using the same tool; invent a title of at most 120 characters and choose a reasonable duration and existing location without asking for optional creative details. Mention fiction once and carry on constructively. Fiction supplies narrative, not extra resources, wages, skills, purchases or external control. A failed tool call is still a failure; preserve its reason and do not claim the activity was added or completed.
- Read the activity catalog, five recipes and cooperative fiction action settings from `get_companion_capabilities` or the current view. Locations and recipes must support the selected modeled activity; custom fiction uses an existing location. Recurrence is `once`, `daily`, `weekdays` or `weekly`; Day 1 is Monday, and weekly recurrence is anchored to the start day. Editing/deleting a recurring block changes the whole series, with no single-occurrence exception. If a request targets one occurrence of a recurring block, explain the limitation and ask whether to change the whole routine before mutating it. Never silently expand a one-day request to every day.
- Blocks cannot overlap or cross midnight; at most 50 blocks. An omitted time searches only the selected day and fails if full. A due block queues an activity for its duration when the queue has capacity; a full queue records a skipped action. An earlier running action can delay it. Removing/editing a block cancels its queued work but leaves already-running work to finish.
- Reuse the same ID and arguments for an uncertain retry to avoid duplicates. On a stale version, read once and reassess. On overlap/invalid location/no room, use the returned reason; do not retry unchanged or silently delete conflicts. Stop after a repeated unexplained failure and report it.

## Prepare or inspect the visible editor

For “show next week”, “open this activity” or “fill the form so I can review it”, use `view` from the current browser result, or read `flaxa_get_view({})` if needed. Use `flaxa_set_view` with `calendarView: "day" | "week"`, a selected `day`, or `navigate: "previous_week" | "next_week" | "today"`. Use `flaxa_edit_activity` for the visible editor:

| Operation | Effect |
|---|---|
| `new` | Open a new draft using the calendar selection and compatible activity/location defaults. No schedule block is added. |
| `open` | Supply `blockId` and optional occurrence `day`; selects its visible day without changing a daily routine's start day. |
| `patch` | Supply `changes: {title?, activity?, locationId?, recipeId?, day?, startMinute?, endMinute?, repeat?}`. Fields remain unsaved. Changing activity applies the UI's default title/location unless supplied in the same patch. |
| `reload` | Refresh a stale draft against the latest world, matching Reload activity / Use latest schedule. Review the returned draft before submitting. |
| `submit` | Add/update the draft through calendar validation. |
| `delete` | Remove the existing block being edited. |
| `close` | Close the editor and discard its unsaved draft. |

These view commands require `commandId` and `expectedViewVersion` from `view.version`, distinct from the world tools' `expectedVersion`. The editor retains the world version it was opened/reloaded against; submitting or deleting a stale draft fails until it is reviewed against the latest world. Reloading an existing draft can replace unsaved fields. Do not automatically reload and submit past a conflict or stale warning. A daily block still represents the whole routine, including when opened from one occurrence.

The returned view exposes the draft, whether it is stale, and visible feedback. A direct `flaxa_schedule_activity` / `flaxa_update_schedule` call remains the faster path when the user requested the calendar change itself. `flaxa_get_history` reads retained journal events with game timestamps; it does not require expanding the journal or sharing a snapshot.

## Other guest surfaces

If browser tools are unavailable, use guestChannel or the visible calendar controls. Without a guestChannel, remote MCP `schedule_activity` / `update_schedule` take a supplied full `state` from companion context, an explicit share or a prior remote result; they do not read a browser session. Never send the compact WebMCP state as a remote snapshot. Remote edits remain detached unless the visible guest separately confirms a change. For no open view and a requested fresh demo, call `open_seedling` once and use its full snapshot or the resulting browser tools.

On mobile or a host without browser context, do not repeatedly search for tabs or require an additional host or browser integration. If UI access is also unavailable, follow the companion's [explicit-snapshot fallback](../seedling-companion/SKILL.md#explicit-snapshots). An acknowledged guestChannel result confirms the visible guest handled the command. A detached state result confirms only the supplied snapshot changed.

Use the [guest calendar reference](references/seed-calendar.md) for state scope, game time, recurrence and the distinction between plans and completed actions. Read `get_companion_capabilities` for the current modeled activities and recipes. A creative request outside that catalog can become a custom fictional calendar activity following [Play cooperatively](../seedling-companion/SKILL.md#play-cooperatively); it does not create external effects. Ordinary guest edits and fictional play require no documentation research.

## Real-game documentation

For an explanation of native SEED mechanics or a help-center question, use [seed-game-guide](../seed-game-guide/SKILL.md) to search and read the source articles. The linked care, building, economy, society and support skills load detailed references only when needed. Cite each article's source URL and distinguish its retrieval date from current game behavior. These guides do not establish the guest simulator's executable capabilities; use `get_companion_capabilities` and actual state for those. Ordinary guest actions, status questions and fictional play keep the direct routes above and require no documentation search.
