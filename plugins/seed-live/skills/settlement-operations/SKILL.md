---
name: settlement-operations
description: Manage a connected SEED settlement, including Seedling care, production, deliveries, buildings and society goals. Use for live SEED gameplay and sustained settlement planning, not the separate SEED Demo simulation.
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

Read only the reference relevant to the task:

- [Care and recovery](references/care.md): health, injury, food, water and sleep.
- [Production and logistics](references/production.md): crafting, supplies,
  deliveries, queues, machine contention and training.
- [Plots and building](references/building.md): ownership, placement, site
  clearance and moving equipment.

For live developer commands, discover the current schema and use the authorized
player identity; do not use system or developer privileges to bypass game rules.
Use exact returned identifiers, keep writes sequential and observe the connector's
rate limit. Check the inner result and world state before retrying an uncertain
write. Never invent recipe IDs or reuse dated IDs from another world.
