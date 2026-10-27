---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-objects-and-construction
title: Objects and construction
description: This page explains objects and construction.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-objects-and-construction
source_url: null
source_path: tools/agent-play-api/library/concept-objects-and-construction.md
source_version: null
language: en
category: Developer concepts
topics:
- objects and construction
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:ffde42e688289b0f6d426a11071ff77f3d8cef143372ecefb621120839ec2eb3
conflicts_with: []
---

This page explains objects and construction.

# Objects and construction

## Objects
- Objects include furniture, machines, decorations and attachments.
- An object can offer activities, hold resources or serve as equipment.
- `PlacedObject` marks placed-object state.
- `ObjectPlacementLocation` receives placement commands for a building or plot.
- `Packaging` records an object being packed or moved.
- `ConstructibleObject` describes the placeholder for an unbuilt object.
- A building's construction is a separate process from an object placeholder.

## Placing an object
- Send `ObjectPlacementLocation.place_object` to the placement location.
- Inspect its request schema for object, source and placement details.
- The server checks the requested surface, location and collision rules.
- For ordinary deferred placement it reserves the source resource.
- It creates a placeholder at the destination.
- A seedling hauls the resource and constructs the real object.
- Command acceptance therefore does not mean construction has finished.
- Some placements, including unreachable exterior spots, can be instant.
- A placeholder blocks movement and collides like the eventual object.
- Allowed surfaces and packability depend on the object type.
- A host object can offer attachment slots; the server decides slot validity.

## Moving, packing and removing
- `move_object` requests disassembly, transport and reconstruction.
- `package_object` requests disassembly and pickup.
- After packing, provisioning can haul the item to storage.
- `cancel_packaging` cancels packaging.
- `destroy_object` removes an object.
- `steal_object` is a separate action requiring a character in its request.
- `get_object_removal_candidates` inspects removal candidates.
- Moving or deleting checks permissions on the object.
- A plot move also checks the destination zone.
- Editing a building revalidates objects placed in it.

## Diagnose a stalled placement
- Check that the source container still has the resource.
- Check the placeholder, location access and available seedlings.
- Check the active schedule and construction or hauling priorities.
- Confirm the requested surface is valid and the target does not overlap.
- Re-read the location and object after the activity completes.
- `Owner` may reflect implicit ownership inherited from the location.
- Access to a location and permission to change its objects are separate.
