---
schema_version: 1
id: seed-agent-play-pr34377:docs/plots-and-claims
title: Plots and claims
description: Claim a plot using a seedling’s plot-claiming object.
document_type: workflow
source_type: local_api_reference
source_collection: seed-agent-play-pr34377
source_id: docs/plots-and-claims
source_url: null
source_path: tools/agent-play-api/docs/plots-and-claims.md
source_version: null
language: en
category: Local API workflows
topics:
- plots and claims
- local api workflows
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:fe5dc1ef9b54440de3cd6d3e58bc7b42e13502864613da722660d61abe89fc37
conflicts_with: []
---

Claim a plot using a seedling’s plot-claiming object.

# Plots and claims

For a plot-claiming object in a seedling’s inventory, send `PlotClaimer.claim_plot` to the seedling. Use `describe_command` for the request. An OK response places a hologram and reserves the plot; the claim is granted after assembly. Inspect the seedling’s activity and `PlotClaimer.has_been_granted_claim` and `claimed_plot_tent_id` before issuing another construction order.

A new plot reservation’s bounds depend on X and Z, not height. A failed new reservation is reported as `OVERLAP`, but `OVERLAP` does not identify an obstruction.
