---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-nature-and-farming
title: Nature and farming
description: This page explains nature and farming.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-nature-and-farming
source_url: null
source_path: tools/agent-play-api/library/concept-nature-and-farming.md
source_version: null
language: en
category: Developer concepts
topics:
- nature and farming
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:5fca35607baa23e42c753c01f90addf035e795bfe24d26ff4bff4bc0d65fa023
conflicts_with: []
---

This page explains nature and farming.

# Nature and farming

## Living world
- Nature includes saplings, creatures and weather.
- Trees, rocks and resource deposits are also part of the world.
- `SaplingGrowth` represents sapling growth state.
- `Weather` and `WeatherForecast` represent weather data.
- `HarvestableState` describes harvestable world resources.
- Natural resources and farm fields are different entities.
- Do not assume a visible object is available for harvest or accessible.

## Farming fields
- `FarmingField.current_state` describes the field's present state.
- `current_stage` and `current_seed_type_id` describe crop progress and seed.
- `water` and `growth` are extrapolated values.
- States include waiting for seed, growing and waiting for water.
- Other states include waiting for harvest, clearing and removal.
- Read the live field state before issuing another action.
- A field's water and growth can change with time.

## Commands
- `FarmingField.plant` takes a `seed_resource_id`.
- `mark_for_clearing` marks a crop for clearing.
- `cancel_clearing` cancels that mark.
- `mark_for_removal` marks a field for removal.
- `cancel_removal` cancels that mark.
- These are player commands on the field entity.
- `harvest` exists in the schema but is not marked as a player command.
- Do not treat every listed internal or developer command as a player action.
- Inspect the live schema and returned error for the actual request and result.

## Getting work done
- Planting and field work depend on field state and available resources.
- Seedlings select productive activities using schedule priorities.
- Watering is an activity flow, rather than ordinary container provisioning.
- Harvest results and movement of goods can happen after the initial request.
- Check the field again to see whether it reached the desired state.
- Check the seedling's active schedule when work remains pending.
- Check access to the location and sources of any needed resources.
- A field waiting for water is a different problem from one waiting for harvest.
- A crop can be marked for clearing without the clearing being complete.
- Natural sapling growth and field crop growth use different components.
- The schema alone does not enumerate all planting restrictions.
