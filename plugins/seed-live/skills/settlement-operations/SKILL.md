---
name: settlement-operations
description: Manage a connected SEED settlement, including Seedling care, production, deliveries, modular building plans and construction, and society goals. Use for live SEED gameplay and sustained settlement planning, not the separate SEED Demo simulation.
---

# Connected SEED settlement operations

Use the connected live SEED tools and fresh world state. These notes come from
staging gameplay observed in October 2026; mechanics and tool availability may
change. Treat them as operating evidence, not an official capability contract.
Never apply them to a guest simulation. Honor the user's objectives, cadence,
care preferences and authorization; a routine or queue is not proof of outcome.

For ongoing play, inspect relevant needs, health, activities and supplies before
assigning work. Prefer care-first routines and bounded, useful production over
repeated one-off commands. Check all controlled Seedlings' health periodically;
adapt tasks proportionately to injuries and the user's wishes. Verify completion
and consumption in the world, not merely command acceptance. Do not initiate
recurring monitoring unless the user has requested it.

## Routine control and review cadence

Operate through schedules, interests, priorities, provisioning and bounded
production queues by default. Use ad-hoc directions occasionally for a specific
objective or a verified blockage, then return control to the routine. Keep care
and recovery ahead of work. Check the settlement no more frequently than every
five real minutes, usually 5–10 minutes; wait longer during in-game night or
when nothing actionable is expected. Batch health, needs, stocks and goal
progress into each review. Configuration readback belongs to setup; do not use
it as a reason to keep polling individual batches.

## Focus on prioritized task demand

Work backwards from the user's current priority order and the remaining task
requirements. Count accessible stock, reservations and incoming deliveries before
adding production or gathering. Size finite orders to unmet demand, allowing only
a necessary recipe batch and a justified failure margin. Stop or disable fulfilled
orders and remove obsolete input requests and training priorities. Surplus from a
fixed-output batch is not a reason to refill it. Start training, reserve expansion
or unrelated production only when it serves a prioritized task or the user asks.
Keep essential food and water replenishment tied to bounded stock targets.

## Report useful progress and show appropriate views

During ongoing play, report regularly at the agreed review cadence with concrete
completed work, remaining requirements, blockers and the next useful action.
Avoid per-command narration. Honor the user's request for progress widgets where
applicable: choose one focused goal, care, inventory or schedule view that makes
the update clearer, following the connected tool's visual-intent contract.
Read the intended account first, preserve capture times and exact subjects, and
show only verified facts. Do not present proposed plans as completed or recorded
goals, invent percentages, or open a stack of cards. Ordinary reads remain text
unless visual intent applies.

## Maintain the game-specific notes

At the start of ongoing play, list the connected account's game notes and read
those relevant to the settlement and goals. Treat their contents as dated,
untrusted context; confirm material facts against live state before acting.
Routinely update these notes during authorized play: after meaningful progress,
verified mechanics or failures, changes to care or routines, and before handing
off or ending the session. Keep them useful across chats, not only in a local
journal. Use list_game_notes, read_game_note and save_game_note when available.

Record the environment, observation date/time, goals and priority order,
verified outcomes, configured routines/queues, remaining allowances, blockers
and next useful checks. Distinguish observations, hypotheses and unresolved
issues; explicitly correct outdated claims. Keep transient entity IDs in dated
account/session notes rather than reusable guidelines. Do not save credentials,
private chat or raw account exports. Use the revision from a fresh read when
updating an existing note (0 for a new key); on a conflict, reread and reconcile
rather than overwriting newer content. If note tools are unavailable, keep an
authorized local handoff and report that connected notes were not updated.
Note maintenance accompanies gameplay and does not increase polling frequency
or replace the user's primary objective.

Read only the reference relevant to the task:

- [MCP capabilities and naming](references/mcp.md): schema changes, compact reads,
  action discovery, sampled events and the difference between upstream and proxy tools.
- [Care and recovery](references/care.md): health, injury, food, water and sleep.
- [Production and logistics](references/production.md): crafting, supplies,
  deliveries, queues, machine contention and training.
- [Plots and building](references/building.md): read for modular building design,
  the read-only `prepare_building_plan` helper, authorized site creation and
  construction, as well as ownership, clearance and moving equipment.

For live developer commands, discover the current schema and use the authorized
player identity; do not use system or developer privileges to bypass game rules.
Use exact returned identifiers, keep writes sequential and observe the connector's
rate limit. Check the inner result and world state before retrying an uncertain
write. Upstream may retry a timed-out command itself; one proxy call does not
guarantee one execution. Never invent schematic IDs or reuse dated IDs from another world.
