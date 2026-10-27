---
schema_version: 1
id: seed-agent-play-pr34377:docs/market
title: Market
description: Inspect local market orders and verify deliveries.
document_type: workflow
source_type: local_api_reference
source_collection: seed-agent-play-pr34377
source_id: docs/market
source_url: null
source_path: tools/agent-play-api/docs/market.md
source_version: null
language: en
category: Local API workflows
topics:
- market
- local api workflows
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:8d43fff9c2424ac0fbff0735f6ca5f2b34aae7cc2e472a9325c6435b8335db81
conflicts_with: []
---

Inspect local market orders and verify deliveries.

# Market

Read `CentralMarket` on the society for local orders and `DeliveryLocation` on a branch for its inbox and outbox. Stock in a business is not itself a listing. The local market does not show all offers: NPC offers have no local mirror, so an empty component does not prove no offers exist.

A successful `direct_buy` response can mean the purchase was accepted for processing. Check delivery and destination inventory to establish completion. See `library-concept-market.md` for orders, permissions and delivery.
