---
schema_version: 1
id: seed-agent-play-pr34377:library/manual-plots-and-territory
title: Plots and Territory
description: This section covers plots and territory.
document_type: manual
source_type: in_game_manual
source_collection: seed-agent-play-pr34377
source_id: library/manual-plots-and-territory
source_url: null
source_path: tools/agent-play-api/library/manual-plots-and-territory.md
source_version: null
language: en
category: In-game manual
topics:
- plots and territory
- in-game manual
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:5aad9edcce387c8373dd1babadaef43bad8a4a5603d2a8d457b00d9000998f32
conflicts_with: []
---

This section covers plots and territory.

## Plots and Territory

*Society territory, drawing and owning plots, building rights, and harvesting rules.*
A society's territory is the overall area of land it controls. Plots are smaller pieces of land within the territory, and can be owned by a Seedling, a Business, the Society, a Department, or a Group. Plots don't exist by default: a Seedling with the right permission draws new plots directly onto the territory in the Land Planner. Buildings can then be constructed on those plots.

In the Land Planner you can see all the plots you manage. You can also switch to Territory view from the bottom left to see the entire land of the society. Seedlings with the right permission can purchase further territory with SeedCoin to expand the society.

Building on a plot requires the right to build, such as being the owner or holding a role with the right permission in the society. In practice this means only the plot's owner, or a Seedling holding an owner-side role that grants the right to build, can build there. Society-owned plots can be built on by Seedlings whose society role grants that right (typically the Housing Manager or Urban Minister, or a custom role the Mayor has granted that authority to).

Harvesting natural resources (trees, shrubs, ore deposits, and similar) is more open. Any Seedling in the same society can harvest from anywhere within the society's territory, regardless of which plot the resource sits on. Harvesting is only blocked across societies: a Seedling cannot harvest in another society's territory.

A plot is also something you can point a Seedling at in their Calendar. Setting a schedule block's location to a plot makes the plot and all its buildings count as a single workspace for that block, which is the usual way to run a farm or a workshop yard where the work happens both outdoors and indoors.

When a resource is harvested, the resulting pile is dropped on the ground at the plot where the resource was. The pile inherits the plot's owner via implicit ownership, so on someone else's plot it becomes their property. The harvester is given a short exclusive window to pick the pile up first; if they don't collect it in time, the pile is no longer accessible to them. This is why a Seedling can sometimes harvest a resource and then find it "belongs to someone else": the dibs window expired before they picked it up.
