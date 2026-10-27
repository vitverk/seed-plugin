---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-locations-and-buildings
title: Locations, plots and buildings
description: This page explains locations, plots and buildings.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-locations-and-buildings
source_url: null
source_path: tools/agent-play-api/library/concept-locations-and-buildings.md
source_version: null
language: en
category: Developer concepts
topics:
- locations, plots and buildings
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:10b4270ae2b782e364b4aac7f6f8d6a825d185e97b1ff430b23d9a0de4c1b7fa
conflicts_with: []
---

This page explains locations, plots and buildings.

# Locations, plots and buildings

## Location hierarchy
- Locations form a hierarchy: territory, plot, building, floor and room.
- A structure is a physical construction such as a building or road.
- A building is both a structure and a location.
- A room is a location but not a separately placed structure.
- A road is a structure but not a location in that hierarchy.
- Room quality affects mood and available activities.
- A room a seedling cannot access is invisible to its activity selection.

## Land
- A territory is the footprint controlled by a society.
- A plot is a separately owned area drawn on that territory.
- A plot can be owned by a seedling, society or organization.
- A society starts with no plots; a plot and territory may have identical bounds.
- `Zone` represents a land zone; `ZoneCanvas` holds zone data.
- Territory, plot and plot reservation occupy distinct layers.
- Schedule zones can overlap one another and other layers.
- At a position, ownership resolves plot, then reservation, then territory.
- This is a position lookup, not a promise that every entity stores its parent zone.
- `BuildingZoneMapping` relates buildings and zones.
- Zone split and merge replace IDs; refresh cached references.

## Claiming
- A created seedling receives a single non-tradable claim flag.
- A seedling grown from an infant does not receive that flag.
- The flag can claim eligible unclaimed society territory or a claimable plot.
- A seedling can claim only once.
- A plot cannot be claimable and for sale at the same time.
- `TerritoryClaims.set_zone_claimable` changes claimability.
- `TerritoryClaims.delete_plot_reservation` removes a reservation.
- These commands require the relevant authority and valid land state.

## Buildings and infrastructure
- Buildings have floors and rooms; objects can be inside them.
- Construction requires delivered materials and work.
- Roads are built on land; subway stations connect through a network.
- A spaceport is required for global market trade.
- Ownership and administration may differ for rented locations.
- Check the plot, building and room separately when diagnosing access.
- Check the command schema and target component before changing a zone.
