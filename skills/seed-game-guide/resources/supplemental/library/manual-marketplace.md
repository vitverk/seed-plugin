---
schema_version: 1
id: seed-agent-play-pr34377:library/manual-marketplace
title: Marketplace
description: This section covers marketplace.
document_type: manual
source_type: in_game_manual
source_collection: seed-agent-play-pr34377
source_id: library/manual-marketplace
source_url: null
source_path: tools/agent-play-api/library/manual-marketplace.md
source_version: null
language: en
category: In-game manual
topics:
- marketplace
- in-game manual
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:eb1afabdfcf7163038d332d5ce167d88f2603aa02fd830e77559274bc5d76e1f
conflicts_with: []
---

This section covers marketplace.

## Marketplace

<!-- keywords: make money sell stuff buy empty market money gone seedcoin missing money held reserved what price did i pay -->
*The Marketplace Panel: what is for sale, what people want to buy, and trade with other societies.*

The Marketplace Panel is in the Management Hub. It shows what is for sale and what people want to buy. Switch between Supply (items for sale) and Demand (Buy Orders). Seed Industries also posts Buy Orders. Selling to them is a reliable way to earn SeedCoin. All trades use SeedCoin.

Click an item to open its page. The Sell Orders tab lists offers you can buy. The Buy Orders tab lists what others want. Compare Orders and Price History help you pick a price.

At first you only trade inside your own society. Building a Spaceport opens the Global Market, where you can trade with other societies. If nobody sells what you need, place a Buy Order and wait, craft it yourself, or ask other Cultivators in [PlayersChat].

### Buying on the Marketplace
<!-- keywords: buy item purchase buy now buy order wait offer personal wallet without business homeless receive delivery -->
*Buying right away with Buy Now, or placing a Buy Order that waits for a seller.*

Any Cultivator can buy. You don't need a business. You can pay from your Seedling's own wallet, or from any business, society or group wallet you are allowed to use.

Every purchase asks for a Delivery destination. This is the Inbox of a building in your society where you can edit the storage, for example a home you own, or the Kernel. Living in a home is not enough. Orbital Storage can't receive purchases.

Every purchase also asks who carries it: a Delivery Business, or Self Pickup to carry it with your own Seedlings. A Delivery Business charges a fee that is not part of the Total. The order form shows its price per km. The fee grows with the distance and the size of the goods. You pay it when the goods are picked up.

**Buy Now**: On the item's page, open Sell Orders and click Buy Now on an offer. Choose the Quantity, the Delivery destination, the Delivery Business and the wallet. You pay the listed price. The money is held right away. The goods are then carried to your Inbox.

Buy Now can end up buying fewer than you asked for. This happens when someone else bought from the same offer first, or when the wallet's money was spent before your purchase went through. You only pay for what you got. A notification tells you how many you got and why. Buy Now only buys from the offer you clicked. It never waits for a later Sell Order. To wait for more, place a Buy Order.

**Buy Order**: Use this when nobody sells what you want, or not at your price. Click Buy Order on the item's page. Set the Price, which is the most you pay per unit. Set the Quantity, the Delivery destination, the Delivery Business and the wallet. Then click Create Buy Order. If a matching offer already exists, it buys right away. If not, the order waits until someone sells to it. Buy Orders never expire. The money is taken from the wallet when you place the order. You can't spend it while the order is open. Any unused part comes back to you.

You pay the seller's listed price. When you place a Buy Order, it buys from the lowest-priced offers first.

You pay for goods once they are picked up for your order. If they are lost on the way after that, you don't get the money back. Goods that are never picked up cost you nothing.

If a delivery for your Buy Order fails and you were not charged, the items go back on the order, unless the order was cancelled. The money for them is held again at your Price. If the wallet can't cover that, fewer items stay on the order. When none can stay, the order stops buying.

To cancel a Buy Order that you placed, you need only the "Spend money" permission on the wallet that pays.

**Buying from another society**: your society needs a Spaceport. With Buy Now, you also choose a Shipment Method: Economy, Standard or Express. With a Buy Order, tick "Buy from other societies", then choose a Shipment Method the same way. You pay an import tax and a shipping fee on top. Both are shown before you confirm. If several Sell Orders fill your order, you pay a separate shipping fee for each one. Each fee has a minimum. So buying from many small Sell Orders costs more shipping than buying from one big one. Offers from Seed Industries never need a Spaceport.

### Selling on the Marketplace
<!-- keywords: sell item list sell order get paid when listing gone paid less than buy order price -->
*Who can sell, how to list an item with a Sell Order, and when the seller gets paid.*

To sell by hand, you need a Business Branch or a Department Branch. A Seedling's home can't sell.

To list an item, select it in the branch's storage, open the "..." menu and click Sell Order(May not apply: !organization browser enabled.)  (this also works from the Inventory in the Business Panel). You can also click Sell Order on the item's Marketplace page and choose which branch to Sell from. To sell to a Buy Order, click Sell on it in the Buy Orders tab. Your goods sell at the Price on your Sell Order, even when a Buy Order offers more. To sell automatically, use Auto-Sell on the building's Market page. To sell to other societies, tick "Sell to other societies". This needs a Spaceport.

After you list an item, Seedlings move it into the Outbox. From there it is carried to the buyer. A listing stays up until it sells or you remove it. If a listing is gone and you didn't remove it, it most likely sold. Check the wallet for the money.

Inside your society, you are paid when the goods arrive at the buyer. When you sell to another society, Seedlings take the goods from your Outbox to the Spaceport's Inbox. They ship from there. You are paid when they ship, and only for the amount that shipped. Anything that didn't ship is refunded to the buyer. So one order can end up paid and only partly delivered. Your society can charge you an Export Tax on sales to other societies (see Society Policies).

### My Orders
<!-- keywords: where is my order stuck order cancel order order status -->
*Checking and cancelling your orders, and what each order status means.*

Click "My Orders" in the bottom left of the Marketplace Panel. It has two tabs: My Buy Orders and My Sell Orders. Every order shows a status. When something blocks it, a hint says what to do next. This is the first place to look when an order or delivery hasn't arrived. Don't guess at a single cause. Walk the Cultivator through it:
1. Find the order and read its status. "Open" or "Partially Filled" means it hasn't fully matched yet. "Purchased, Delivering" or "Sold, Delivering" means it matched and is on its way (see Deliveries). "Failed" or "Cancelled" means it stopped, and the hint should say why.
2. If a Sell Order stays at "Awaiting Haul to Outbox" or "Sold Out, Awaiting Restock", check the building's Outbox. The stock may be missing, or it may have decayed.
3. If an order is stuck with no status change and no helpful hint, direct the Cultivator to [ReportBug] rather than guessing.

To cancel an open order, click its trash icon. The held money comes back. To cancel a Buy Order, you need the "Spend money" permission on its wallet. To cancel a Sell Order, you need the "Edit market orders" and "Manage storage" permissions on its building. If you cancel an Auto-Restock order without the "Edit market orders" permission, Auto-Restock places it again.
