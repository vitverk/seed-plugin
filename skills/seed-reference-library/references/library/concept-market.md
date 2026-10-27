---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-market
title: Market and trade
description: This page explains market and trade.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-market
source_url: null
source_path: tools/agent-play-api/library/concept-market.md
source_version: null
language: en
category: Developer concepts
topics:
- market and trade
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:6d2accfb6e9411f3ec44a2218a6261d02d0d65c95660d17ba6c347a537f427bb
conflicts_with: []
---

This page explains market and trade.

# Market and trade

## Market entities
- The central market handles resource buy and sell orders.
- `CentralMarket` is the component receiving market commands.
- Orders refer to containers and wallet entities in their request data.
- `AutomatedResourcePurchaser` supports automatic buying.
- `AutomatedMarketOrders` holds automated market order state.
- Resource trade is distinct from the location sale and rental market.
- Same-society and global trades have different delivery paths.
- Direct buys match a specific sell order once, at its price.
- Buy orders set a maximum unit price; a match uses the sell order price.
- Repeat buy orders are limited to the same society.
- One-time and repeat sell orders and one-time buys can allow cross-society matches.
- Auto-restock counts goods still being delivered when deciding whether to reorder.
- A spaceport is required for global market trade.

## Commands
- `CentralMarket.add_sell_order` creates a sell order.
- `CentralMarket.add_one_time_sell_order` creates a one-time sell order.
- `CentralMarket.remove_sell_order` removes a sell order.
- `CentralMarket.add_buy_order` creates a buy order.
- `CentralMarket.remove_buy_order` removes a buy order.
- `CentralMarket.direct_buy` purchases from a sell order.
- `AutomatedResourcePurchaser.add_auto_buy` sets up automatic buying.
- `AutomatedResourcePurchaser.cancel_auto_buy` cancels it.
- Inspect the live schema for prices, amounts, wallet and container fields.
- Use the entity carrying the relevant component as the command target.

## What happens after a match
- A sell order can create demand for resources in the seller's outbox.
- Local hauling moves stock into that outbox.
- Delivery moves resources from seller to buyer where required.
- The buyer's inbox is a physical destination with finite capacity.
- A matched order is therefore not proof the goods have arrived.
- Read order state, stock, inbox, outbox and delivery state separately.
- A delivery service may charge a distance-based fee.
- A business's available couriers and schedule affect delivery time.

## Permission and failure
- Organizations need the society permission to trade.
- The acting player also needs the relevant permission for its action.
- A wallet, source or destination may belong to a different legal actor.
- Verify authority over those subjects before creating an order.
- Inspect the returned error for invalid order data, access or other rules.
- Check stock and transport when an accepted sale does not deliver promptly.
- The command list alone does not establish that every trade path is available.
- World-level market state may not be fully represented on a sector entity.
