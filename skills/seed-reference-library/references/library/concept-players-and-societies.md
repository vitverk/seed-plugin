---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-players-and-societies
title: Players, seedlings and societies
description: This page explains players, seedlings and societies.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-players-and-societies
source_url: null
source_path: tools/agent-play-api/library/concept-players-and-societies.md
source_version: null
language: en
category: Developer concepts
topics:
- players, seedlings and societies
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:1e80efffda080f24c090612e3a2c81bb78c48791120c841fb589663604c71d97
conflicts_with: []
---

This page explains players, seedlings and societies.

# Players, seedlings and societies

## Entities
- A user is a world-level account; a player is its representation in a society.
- A seedling is a character entity owned by a player.
- A society is the colony that seedlings and players belong to.
- A visitor player can be without a society.
- A player can own several living seedlings.
- A society has a population limit and progression.

## Follow the data
- Read the player's `CharacterOwner.owned_characters` map for living character IDs.
- Each map value has `society_id`.
- On a seedling, `Owner.immediate_owner_id` identifies its immediate owner.
- `Owner.ultimate_owner_id` identifies the ownership root.
- `Owner.society_id` identifies the society associated with the property.
- On a player, `PlayerState.player_data.user_id` is the world user ID.
- `PlayerState.player_data.society_entity_id` is optional.
- Read `SocietyState` on the society for population and membership state.
- `SocietyStructures.kernel_id` points to its kernel.
- A world user ID is not necessarily a sector entity ID.
- Read the returned entity before assuming it has a particular component.

## Acquisition and movement
- `CharacterOwner.buy_character` is a player command on the player entity.
- Its request includes a society, character data and payment method.
- Purchase can be limited by available slots and population capacity.
- Some acquisition paths are not purchases and have different checks.
- Migration moves a character to a different society, possibly in another sector.
- Jobs, organization roles and residence do not travel with it.
- Re-read the character and player at the destination after migration.
- Society membership, owner and location are different relationships.
- A society can own land without every member owning it.

## Practical checks
- Start with your player entity and enumerate owned characters.
- Check the seedling's society before looking for jobs or property there.
- Use the live command schema for request fields and returned errors.
- The presence of a command does not grant permission to use it.
- Account-level data such as inventory and pollen lives outside sector entities.
- Do not assume Sector API exposes all account-level operations.
