---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-logistics-and-storage
title: Storage, hauling and deliveries
description: This page explains storage, hauling and deliveries.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-logistics-and-storage
source_url: null
source_path: tools/agent-play-api/library/concept-logistics-and-storage.md
source_version: null
language: en
category: Developer concepts
topics:
- storage, hauling and deliveries
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:78598ebf88f42061457a9b667d3141f765addc20faf726cf832f667f065d1d3f
conflicts_with: []
---

This page explains storage, hauling and deliveries.

# Storage, hauling and deliveries

## Containers
- A `Container` holds resource stacks and has limited capacity.
- Containers include storage, machines, inventories and outdoor piles.
- `ResourceProvisioner` lets a container request resources.
- Its `provisioner_rank` influences demand priority.
- Its `request_distance` limits the request radius.
- `DeliveryLocation.inbox_entity_id` points to an inbound container.
- `DeliveryLocation.outbox_entity_id` points to an outbound container.
- Read those containers to inspect actual stock and space.

## Hauling
- A transfer order requests movement from a source to a destination.
- One order can require several hauls, one trip per haul.
- A haul reserves resources and destination space while in flight.
- Interrupted orders and hauls have expiry limits on reservations.
- If a haul is cancelled after pickup, the agent keeps the resources.
- Provisioning can later drain its inventory into an accepting container.
- Within a location, provisioning responds to container requests.
- Prerequisite hauls fetch inputs an activity needs before it can run.
- Machines and fields can receive inputs through other activity flows.
- A provisioning hauler needs access to source and requester.
- A transfer route is a player-defined one-time movement rule.
- `TransferRoutes.create_transfer_route` creates one.
- `TransferRoutes.cancel_transfer_route` cancels one.

## Deliveries
- Deliveries move resources between locations.
- A market sale can first request stock into the seller's outbox.
- A delivery then carries it to the buyer's inbox.
- `DeliveryHub.create_direct_delivery` creates a direct delivery.
- `DeliveryHub.cancel_delivery` requests cancellation.
- `DeliveryServiceLocation.set_open` opens or closes a delivery service.
- `set_price_per_distance` changes its price.
- `DeliveryDrone.set_operating_modes` changes drone operating modes.
- A selected delivery business charges for delivery.
- External-mode drones or workers with Client Deliveries can serve clients.
- Unassigned deliveries can be handled by suitable self-delivery haulers.
- Hauling can match unassigned self-deliveries. Client Deliveries matches deliveries assigned to a business and is work-only, so it is not accepted in a personal schedule.
- Look up a priority's `Scope` in the `ActivityTags` repository. Personal schedule events accept Personal or Both; job priorities use Work or Both.
- A closed or missing selected business can cause self-delivery fallback.

## Diagnose delays
- Inspect source stock, destination space, and the inbox and outbox.
- Check reservations, delivery state, location access and schedule priorities.
- A staffed business can still be delayed if workers are off shift or busy.
- A delivery accepted by a hauler can cross access boundaries for that delivery.
