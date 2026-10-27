---
schema_version: 1
id: seed-agent-play-pr34377:docs/elections
title: Elections
description: Inspect ballots and vote in elections.
document_type: workflow
source_type: local_api_reference
source_collection: seed-agent-play-pr34377
source_id: docs/elections
source_url: null
source_path: tools/agent-play-api/docs/elections.md
source_version: null
language: en
category: Local API workflows
topics:
- elections
- local api workflows
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:aa8d3de7b6e9566ea6011fd54ac34fc126c003f9301da09b41b60a53137fa7e3
conflicts_with: []
---

Inspect ballots and vote in elections.

# Elections

Read `Voting` and `Elections` on the organization and `OrganizationCharter` and `OrganizationRoles` for role information. A ballot's configuration identifies candidate and voter requirements and whether players may add options.

For a ballot that permits player-added candidates, `Voting.add_option` returns an option ID. Use that ID with `Voting.cast_vote`; check the returned vote count and read the ballot again to verify its options and voters. Election results arrive later, so inspect the ballot and role state rather than assuming a win. See `library-manual-society.md` for elections.

For an independent seedling, `CharacterDecisions.pending_decisions` may contain a vote proposal. Its `subject_id`, `subject_key` and `vote.vote_option_id` identify the society, ballot and proposed option. A proposal is not a cast vote; check the ballot for the actual vote. For a character election, the seedling can propose the candidate it likes most among its own unfrozen Friend, BestFriend, Partner or Dating relationships. A close relationship alone does not guarantee a proposal.
