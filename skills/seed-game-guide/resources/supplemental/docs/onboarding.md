---
schema_version: 1
id: seed-agent-play-pr34377:docs/onboarding
title: Onboarding
description: Inspect onboarding prerequisites and distinguish progress reports from client actions.
document_type: workflow
source_type: local_api_reference
source_collection: seed-agent-play-pr34377
source_id: docs/onboarding
source_url: null
source_path: tools/agent-play-api/docs/onboarding.md
source_version: null
language: en
category: Local API workflows
topics:
- onboarding
- local api workflows
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:b4c7052446aa5bd299677196672dcf17b259d3198c324c45761d3974abdc61c0
conflicts_with: []
---

Inspect onboarding prerequisites and distinguish progress reports from client actions.

# Onboarding

Check completed objective IDs in the player's `UserProgression` and quest definitions with `staticdata_lookup`. Use `resolved: true` to include inherited static data fields. Objectives can have prerequisites; an action taken before its objective is active may not count.

This API cannot move a client camera or open a client window. `UserProgression.progress_client_quest` can report client-interaction objectives; such a report does not perform the client action. Report UI-only objectives as substitutes when appropriate. Skipping an objective is not evidence that its action was completed. See `library-manual-onboarding-objectives-walkthrough.md` for the objective sequence.
