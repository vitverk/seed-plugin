# Production and logistics

Observed in SEED staging, October 2026; inspect the current world and schemas.

- Plan backwards from the desired output through recipes, machines, inputs,
  skills, access and delivery. Prefer useful training that also supplies an
  actual need. A published recipe's level may not show every live skill gate:
  check the character's available action and its reason when disabled.
- A filtered stock list cannot establish that a container is empty. Inspect
  relevant finished outputs as well as inputs before diagnosing a blockage.
- Inspect inputs, output capacity, active step, reservations, completed count,
  stop conditions and assigned workers. A stock target combined with an
  exhausted completion cap will stop even when stock is low. Preserve bounded
  production and verify output; failed attempts and occupied stations can
  interrupt a chain. Queue acceptance is not execution or successful output.
- Use `production_status` for compact known-machine progress and
  `inspect_entities` with `view: work` for work details. Read character activity
  through `care_status`; a machine's process does not establish who is doing it.
- A cooking station can be unavailable while occupied by another activity. A
  separate resting place and ingredient/output storage can reduce contention;
  verify the action's actual disabled reason before moving anyone.
- In observed staging, a player-created transfer route reserved exact source
  quantities for a destination and exposed private-haul actions. Route creation
  did not provide a worker; one haul could move only one carrying load. The
  route's delivered counter remained zero during a verified partial delivery.
  Inspect source and destination stock and active reservations before retrying.
- After a verified machine relocation, resolve the exact old/new `entity_id`,
  destination room and floor. Audit known workers' schedule and priority
  references, finite production orders, provisioner requests and routes for the
  old ID. Restore only still-needed work against verified destinations, read
  each change back and preserve care ordering and capacity. Do not blindly
  retarget all references or recreate a fulfilled queue.
- Reserved ingredients may be unavailable to ordinary pickup until delivered.
  Check that personal harvest has been unloaded before counting it as shared
  stock. On one trial, general storage repeatedly received cooking ingredients
  from a campfire; a higher request rank was tried, but its lasting effect was
  not established. Do not claim a self-sustaining logistics fix without testing.
- Use current resource and schematic lookup results: `find_schematics` with
  `direction: produces` when advertised, or the older `find_recipes`/`makes`
  schema while still deployed. Do not assume the rename supplies missing IDs.
  Numeric schematic IDs from a temporary fallback are build-specific and may
  expire; inspect provenance and prefer actual upstream IDs. Never guess an ID.
