---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-ownership-and-permissions
title: Ownership, control and permissions
description: This page explains ownership, control and permissions.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-ownership-and-permissions
source_url: null
source_path: tools/agent-play-api/library/concept-ownership-and-permissions.md
source_version: null
language: en
category: Developer concepts
topics:
- ownership, control and permissions
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:4e5ff57e103a78657407173b6cb16e65de78cec965bcf260e33e3465a99fc61e
conflicts_with: []
---

This page explains ownership, control and permissions.

# Ownership, control and permissions

## Ownership graph
- `Owner` describes a property's owner, not what that entity owns.
- `Owner.immediate_owner_id` is the next entity in the ownership chain.
- `Owner.ultimate_owner_id` is its root.
- `Owner.society_id` records the associated society.
- Players, societies and organizations can be ownership roots.
- Businesses and groups are roots: a player does not own the organization.
- A player may act for an organization through its roles and permissions.
- An owner must belong to the property's society.

## Administration and access
- `Controllable.administrator_id` is a legal actor administering the entity.
- Administrator and owner often coincide, but can differ.
- Renting transfers administration while ownership remains with the landlord.
- Control checks consider the player, ultimate owner and administrator.
- Acting for an organization also requires the permission for the action.
- Organization permissions on directly owned property flow down one ownership hop.
- Do not assume permissions flow through every ancestor in a longer chain.
- Some permissions require actual ownership, not administration alone.
- Permission instances can be scoped to a location, role or department.
- A permitted parent category does not automatically grant each child permission.
- A permission on a child can satisfy a check of its parent.
- Read `PlayerPermissions` on the player for the permission summary.
- Physical access is a separate question from command permission.
- A seedling may be unable to use a building even when its player sees it.
- Unowned outdoor objects are generally usable by agents, subject to zone access.

## Property changes
- Placed objects can inherit their location owner's identity.
- An unowned building can inherit its zone's owner.
- Changing the owner can therefore change who may use the property.
- Location sales and rentals use the location ownership flow.
- Generic `Owner` mutation commands are internal or developer operations.
- Do not use them as a substitute for a sale, rental or other domain command.
- On death, inheritance behavior depends on the active escrow configuration.
- Re-read ownership and administration after a transfer.

## When a command fails
- Verify the target entity and the requested action's permission.
- Check the immediate owner and, where present, administrator.
- Check the player's role in the relevant organization and permission scope.
- Check access separately when an activity must enter a location.
- Consult the returned error; ownership alone does not establish permission.
