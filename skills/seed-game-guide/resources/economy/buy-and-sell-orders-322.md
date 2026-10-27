---
schema_version: 1
id: seed-help-center:article:322
title: Buy & Sell Orders
description: Every building you own or manage has a Market tab in its Management Panel; orders are delivered to or dispatched from that building. You can also manage ever...
document_type: article
source_type: help_center
source_collection: seed-help-center
source_id: '322'
source_url: https://klang-games.eu.theymes.com/hc/en/seed/articles/buy-and-sell-orders-322
source_path: articles/buy-and-sell-orders-322.md
source_version: null
language: en
category: Work & Economy
topics:
- buy & sell orders
- work & economy
retrieved_at: '2026-10-27T14:26:25Z'
imported_at: null
verification_status: source_snapshot
content_hash: sha256:f15d5fb34e3fd659fc181816b2bb2f6f1d7ee9755ae69d8e19012bc403c7afc1
conflicts_with: []
---

# Buy & Sell Orders

Every building you own or manage has a **Market tab** in its Management Panel; orders are delivered to or dispatched from that building. You can also manage everything through the Marketplace Panel. What you can do depends on the building type: **Business Branches** get both Sell and Buy Orders; **other buildings (e.g., Homes)** get Buy Orders only.

**Selling**

To sell items you must have a Business Branch. Create a **Sell Order** through the branch's Market tab or directly from the Inventory UI in the Business Panel. Once created, Seedlings move the listed item into the **Outbox**, where delivery personnel or drones collect it for the buyer. Sell orders don't expire on a fixed timer. A listing stays up until it's sold, you remove it, or a rare market sync prunes very old entries. If a listing seems to have vanished, it was most likely **sold**: check the business wallet for the proceeds before assuming something went wrong.

**Buying**

Any building can place a **Buy Order** through its Market tab, or buy directly through the Marketplace Panel. Buy Orders can be set as **recurring**, automatically renewing after being fulfilled. Orders you place yourself go to the market right away and match as soon as a compatible counter-order exists. **Automatic orders** (Auto-Restock purchases and Auto-Sell listings) are placed and updated multiple times per day, so they can take a little while to appear or reflect new stock. If a recurring order isn't filling, no compatible counter-order exists yet.
