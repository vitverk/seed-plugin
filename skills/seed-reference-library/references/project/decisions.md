---
schema_version: 1
id: seed-agent-play-pr34377:project/decisions
title: Agent Play API decisions
description: Recorded design decisions and experiments for the separate Agent Play API project.
document_type: project
source_type: project_reference
source_collection: seed-agent-play-pr34377
source_id: project/decisions
source_url: null
source_path: tools/agent-play-api/DECISIONS.md
source_version: null
language: en
category: Project reference
topics:
- agent play api decisions
- project reference
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:b3342ea719532feafd7f6731e12caabde9f80a863dd3dcd19fe0e10cf585ce06
conflicts_with: []
---

# Agent Play API: decision log

A record of the prototype and the experiments behind it.

Round labels identify experiments; P-numbers identify proposals in the round files. Evidence and transcripts under `.context/agent-play-api/` are local and gitignored; the published report (https://share.seed.ci/marijn/2026-10-27/agent-play-api/index.html) summarises them. A and B were the empty-docs and broad-docs arms; holdout IDs name scenarios reserved from tuning. Dots is a periodically waking agent; the mayfly team builds seed-api.

## Destination

A rough local placeholder API that lets a capable agent with no repository access play SEED through seed-api and spatial reads through Sector API: read component data, send commands, and read the explanations a player would otherwise get from the client UI, the tutorial and PAM. Grown gap by gap from blind agent runs; the gaps it surfaces inform the formal seed-api (`services/seed-api`, `/v1/dev`).

## Decisions so far

| # | Decision | Why |
|---|---|---|
| D1 | Superseded by D6 and D8b: direct, god-mode passthrough to Sector API: any command on any entity. | Marijn, 2026-10-26: early demo; the hard part is the agent reasoning about the game, not a polished or restricted surface. |
| D2 | Two worlds on seed.ci: `marijn-apiplay` (fresh, develop) and `marijn-apirepl` (prod `openbeta0003` replica, develop), both with DevCommands. | Fresh world covers onboarding and the tutorial; the replica covers mid-game state. On seed.ci SectorAPI accepts write commands only through DevCommands. |
| D3 | All agents are Codex `gpt-6.1-terra`; blind players run in an empty folder outside the repo with a clean `CODEX_HOME` (auth only). | Marijn: Codex over Claude to conserve tokens. Blindness is by isolation of context and instruction, not by OS sandbox. |
| D4 | Docs and tools are added only against a gap seen in a blind run transcript, and each addition is logged here. | Keeps the docs short; avoids writing the repository into the API. |
| D5 | Code and docs on branch `feat/agent-play-api` in `tools/agent-play-api/`, draft PR, not merged. | Marijn's choice. |
| D6 | Writes and entity reads go through the world's seed-api `/v1/dev`, with the command header `commandInitiatedByUser`, `playerEntityId`, `userId`; Sector API only for spatial queries. Static data and other reads via seed-api public GET routes (superseded by D10). | A write through Sector API (via DevCommands) reaches the handler as system with no player: market orders, `create_player`, `progress_client_quest` and client-state commands fail, and ownership checks gated on `CommandInitiatedByUser` are skipped (round 1 research). seed-api is deployed in every world, reachable at `api.seed.ci/seed-api/<env>-<world>/`, and is where the formal API goes. |
| D7 | C# file-based app, MCP over streamable HTTP, one process per blind agent with its own config and JSONL call log. | Repo prefers C#; per-agent processes give per-agent identity and logs without multiplexing. |
| D8 | Round 0 runs two arms in parallel: A with an empty docs pack, B with a broad pack (PAM game manual split by section, concept pages distilled from gameplay CLAUDE.md files, play-client lessons). | A shows the raw API's gaps; B tests Marijn's view that the PAM manual (player-facing) and the CLAUDE.md files (systems such as organizations, permissions, ownership, AI, locations) carry most of what an agent needs. |
| D8b | The agent-facing surface is our own (any component read, any command, docs). seed-api `/v1/dev` serves only as transport for commands (superseded by D28), because it is the one existing path that carries player identity; its `requiredRole` was documentation, not enforcement (superseded by v2-a1). Sector API is a full fallback backend (superseded by D28). The public seed-api routes are not used. | Marijn: the mayfly seed-api is a reference point only, too restrictive to build on. |
| D9 | Three tracks: fresh-world tutorial players, a small trading DevTown (`marijn-apitown`, 4 households) where blind agents play neighbouring households, and real players in the prod replica. | Marijn: tutorial, a designed setup with buildings where agents trade and interact, and replica play. Marijn approved Codex reading replica player data. |
| D10 | seed-api public routes (`/v1/staticdata`, `/v1/me`, wallets, Spark) are unavailable: they refuse a developer token because it carries roles. Static data, if runs need it, is served by the wrapper from the local checkout. | seed-api auth refuses tokens with roles on public routes; the operator only has a developer login. |
| D11 | Seedling chat replies, if runs need them, are read straight from the world's Postgres by the wrapper. | Replies are not in ECO and the gameplay `ListMessages` RPC is scoped to the authenticated user; a database read is the quickest cheat for a placeholder. |
| D12 | Every round: blind runs → per-run judge (checks live state, not claims) → gap analyst (root causes, smallest change) → adversarial reviewer (evidence, truth, size, overfitting) → implementer → rerun. Holdout scenarios are never used to tune. A meta-reviewer critiques the process every few rounds. All agents are Codex, except an occasional Opus meta-review and whole-API review as a final check. Adversarial Codex reviews run on prompts, approach and process, several angles in parallel. | Keeps additions evidence-based and small; holdouts catch overfitting. Marijn: never take results for granted; Opus only as a last check. |
| D13 | Round 0a (fresh world `marijn-apiplay`) is exploratory only; fresh/tutorial players move to the DevTown society on `marijn-apitown`. | The synthetic society on `marijn-apiplay` has no territory: all seedlings spawned stacked at the map corner (-3072, -3072), navigation failed and no nature was nearby, so failures there were fixture problems, not API gaps. Players created in the town society spawn at the town kernel. |
| D14 | Before blind failures count as API gaps, a non-blind control run (Codex with repo access, same tool surface) establishes that the scenario is reachable and records the recipe for judges. | Adversarial experiment review: without it, fixture problems and impossible goals are misread as API gaps. |
| D15 | Judges score against before/after state snapshots with causal evidence, classify every write as player-equivalent, UI-substitute or privileged, and report the outcome for player-equivalent play separately. | Adversarial prompt and external-player reviews: in round 0a an agent completed all 37 onboarding quests, 18 of them with `skip_quest`. |
| D16 | Superseded by D28: reads go through Sector API when seed-api answers 429; the wrapper retries 429 with backoff. | seed-api `/v1/dev` allows 120 requests/min per caller (`RATE_LIMIT_REQUESTS_PER_MINUTE`), and all wrapper instances share the operator's login. |
| D17 | Docs in two tiers: `docs/` core pages, added only through the gap → review loop; `library/` reference pages (PAM manual sections, concept pages distilled from gameplay CLAUDE.md files), served with a `library-` prefix through the same docs tools and labelled unverified. | Round 0a arm B: agents opened 11 of 35 broad pages and found schedule units there; retrieval costs nothing until read, so broad material can stay available while the curated core stays small (Marijn: careful additions; the manual and CLAUDE.md files explain a lot). |
| D18 | Tutorial scoring: skipped objectives do not count; objectives that concern only the client screen (camera, opening a window) may be reported through the game's client-progress command and are scored as UI substitutes. | Control run: the first objective (move the camera) has no gameplay equivalent, so without this rule the tutorial is unreachable through any API. |
| D19 | P4 (decode activity debug data inside `send_command`) rejected. | Adversarial reviewer: couples the generic command tool to an internal debug format; agents decoded it in the shell. Revisit if diagnosis runs keep failing on it. |
| D20 | Superseded by D27: on our two dev worlds the seed-api rate limit is raised to 3000/min (burst 300) with `kubectl set env`, re-applied every minute because Terraform reverts it (observed: reverted on all five worlds within an hour). | All blind agents share one login, so 120/min caused 429 storms in round 0a. Test-only change on temporary worlds; not a proposal for seed-api. |
| D21 | Isolation: solo scenarios move to fresh colonies (one per run, founded server-side on `marijn-apiplay`, following the automated client runs' "fresh colony per case"); multi-agent and social scenarios run per group on separate DevTown worlds (`marijn-apitown`, `-apitown2`, `-apitown3`). | Marijn: avoid agents interfering with each other. In round 1 a dozen agents shared one town with 2 empty homes and few berry bushes. |
| D22 | Rolling pipeline: an auto-judge daemon judges each run as soon as it finishes; rounds overlap; play-client (Sonnet) sessions on the same town run in parallel as a UI baseline. | Marijn: too serial; get learnings early and apply them quickly; up to ~25 Codex agents. |
| D24 | Campaign experiment: on `marijn-apitown2` and `-apitown3` the Parliament election was reset to a single seat with 8 eligible voters (fixture setup via developer commands); two competing agents per town (Vale, Reyes) campaign for 2 hours while Ito and Quill households are unplayed and vote autonomously (they propose votes for friends or partners they like most; proposals auto-commit after 6 hours). | Marijn: agents convincing seedlings not driven by players, e.g. for mayor; round 1 showed the 5-seat election made persuasion pointless. |
| D25 | After meta-review 1: H1, H2 and H5 are retired as holdouts (H2 leaked into an r2 proposal); H3 and H4 are sealed from analysts and reviewers. A live health check (`health.py`) flags runs with no calls, foreign labels, error or 429 bursts and failed snapshots. Next rounds weight sustained, multi-step scenarios over 3-10 minute smoke tasks and include docs ablations (same scenario with and without docs). | Codex meta-review 1: holdout boundary broken; short tasks no longer informative; per-addition value unmeasured. |
| D26 | Periodic-agent experiment: runs of 4 sessions (12 minutes each, 15 minutes apart) with one wrapper process throughout (the event journal persists) and NOTES.md as the agent's only memory between sessions. | The Dots model is an agent that wakes up periodically; Dots research recommends explicit goal/progress recaps and event cursors for resumption. |
| D28 | Use seed-api for entity reads and commands; Sector API only for spatial reads. Remove system caller mode. | Final whole-API review: no runs used the Sector API backend or system caller. |
| D29 | Read chat and notifications from gameplay Postgres; use the simtime service for the clock. | r0a P1, Dots and r3x P6 supplied the missing reads. |
| D30 | A test player can complete tutorial quests. | Round 0a completed 37; the final review reports 38–40 quests completed in runs. |
| D31 | Society scenarios run pre-founded only (solo: 1 player, 10 seedlings; group: 3 players, 3 seedlings each; 2 societies each, all at tier 0 Expedition). | Founding needs a lobby from the gameplay Lobbies gRPC service, which is scoped to a signed-in user; synthetic fixture players have no login, and a player cannot exist without a society. Founding through the lobby flow is a gap for the formal API. |
| D32 | The campaign group (town 4, Vale vs Reyes, 2 hours) started at 12:31 CET on the build of that moment, ahead of the v2 batch; control town 5 got the same two candidates registered at the same time and no agents. | The single-seat elections opened at 12:28 and close about 20:28; autonomous voters only act on candidates registered more than 6 hours before the close. |
| D33 | The society group (8 agents: solo ×2 with 10 seedlings, group ×2 with 3 players × 3 seedlings, all pre-founded at tier 0) started at 13:33 CET on build 21c3d5c, ahead of the rest of the v2 batch; 6 sessions of 15 minutes, 20 minutes apart. | Marijn: start the longest runs early for faster learnings; results are labelled with their build. |
| D34 | Incident: batch r9a was aborted after 2 minutes (missing database forward) but its agents had already changed state on 21 of 22 fixtures (claims, fields, orders, contracts); the rerun r9b on the same players was therefore contaminated and stopped. Fresh fixtures are built for every spec and the batch reruns as r9d. Rule: never reuse a fixture after any run touched it, even an aborted one. | Blind agents send their first state-changing command within seconds. |

## Incidents

- **D23:** rounds r1 and r1b used the same port range, so 6 r1b agents silently connected to still-running r1 wrappers and acted as other players. 12 runs are marked contaminated and excluded; the runner now reserves free ports across rounds and fails a run whose own server is not the one answering. Found when a chat run made 0 calls through its own wrapper yet reported replies.
- **D27:** (1) round r3 ran twice at once (a queued launch that was thought dead plus a manual one), so all r3 runs, including holdouts H3/H4, are contaminated; (2) the runner chose Sector API ports with per-process random `hash()` and reused any port that answered, so some replica runs read the fresh-colony world and others hit a dead forward (14 runs flagged `FLAG-spatial`). Fixes: round lock, fixed per-world ports with a check that the port forwards to the expected namespace, a forward watchdog. Reconciliation is paused on the five worlds instead of re-applying the rate limit every minute (which restarted seed-api 27 times); resumed after the last round. Results built on those runs are re-checked before the report; claims rest on clean runs only.

## Out of scope

- Authentication, rate limits and per-player read scoping: the formal API has to provide them. seed-api's `/v1/dev` routes used here let a developer token read every component and send any command.
- A polished MCP for external users.

## Changes by round

| Round | Item | Change | Evidence: gap + runs |
|---|---|---|---|
| r9 | P1 | State the dedicated Spark tool gap and post verification boundary. | XP3 #3–7, #65 and #82 searched the surface and forced a hidden action; live MCP read start-here. No new blind run. |
| r9 | P4 | Explain the activity progress completion boundary in seedling_card. | Tree-b #11–12 checked completion after progress 1; live MCP tool listing and card check confirmed the description and output. No later blind run. |
| r9 | P5 | Describe the stored chat length limit on both chat request fields. | XP3 #54–55 showed truncation; live MCP described both commands and stored overlong messages from both paths at 200 UTF-16 units. The directed path processes the full instruction. |
| r9 | P6 | Match activity words and ID tokens at boundaries and describe the rule. | XP2 #5 matched eat inside Wheat; live MCP eat returned no matches within 40 probes, tree returned Harvest Wood, and exact IDs and multiword names matched. A source-extracted matcher check covered wheat, eat words and ID tokens, exact IDs and partial words. Search metadata remained present; no later blind run. |
| v2-gate | Readiness and action discovery | Make instructions optional, serve the last matching OpenAPI while refreshing, cache tile reads for 60 seconds, narrow source queries, preserve partial probe results, and log internal command calls. Clarify ownership ordering, projections and available tools. | check-api passed on marijn-apitown and marijn-apiplay; wood and berries each found a match in one probe on both worlds. An empty-docs server served whoami; six instances made 360 descriptions in five minutes without a loading stub. |
| v2-gate | Events review | Recheck access at delivery, isolate subscription files by player and port, cancel in-flight delivery on refresh/unsubscribe, retry failures, report retention gaps, preserve refresh cursors and reject malformed RPC envelopes. Ignore undefined activity sentinels. | Local receiver replay delivered an owned event, rejected an unowned filter and dropped an unowned event; refresh kept cursor 0. A 2,001-event fixture reported the retention gap without delivery or cursor advancement; delivery resumed after five failed attempts. |
| v2-a3 | MCP Events | Add signed webhook subscriptions with player-scoped journal replay, filters, expiry and callback validation; activity endings are sampled transitions. | On marijn-apitown, a local receiver and the console hook verified signed chat and activity deliveries; refresh, unsubscribe and restart replay were exercised. Sampling can miss short activities and cannot establish outcomes. |
| v2-a1-review | OpenAPI freshness and docs search | Bound cache reuse to three minutes; rank word and phrase matches by their best line rather than repeated substrings. | A1 review found stale request fields and unrelated top search results. |
| v2-a2 | Land and card review | Intersect zone cell bounds, report truncation and direct access questions to command validation; label projected starts and timestamp need samples. Unestimated steps end at the slice boundary. | Both worlds returned a territory for a 1 m edge query with its center 70 m away, without truncation; check-api passed on both. Paused-clock and unestimated-step cases were checked against the clock projection and seed-api logic, not reproduced live. |
| v2-a2 | Seedling card | Show activity start, real duration, step progress and need bars with trends. | Live cards on marijn-apitown and marijn-apiplay returned activity progress and eight need bars each; values are independently sampled. |
| v2-a2 | Land | Show nearby plot and territory ownership as a heuristic. | Live queries returned 19 zones on marijn-apitown and 3 on marijn-apiplay; position-based search may omit intersecting zones. |
| v2-a2 | Static data | Refuse unsupported resolution and rank inherited names ahead of incidental descriptions. | Aluminum sheet returns a modification error instead of inherited aging; the first five GameType tree results include four live trees. Defaults remain omitted. |
| v2-a2 | Action discovery review | Require positioned activity sources, distribute probes across 32 m buckets, preserve partner IDs and resume bounded searches with a cursor; report skipped buckets and candidate-collection limits. | Town wood, berries and water searches returned enabled requests; a returned water request ran. Sleep and shower reached the probe limit. Apiplay searches were rate-limited; a water call timed out before probing and its resume received HTTP 429. Sector API completeness and access skipping remain approximate. |
| v2-a2 | Action discovery | Search nearby landscape cells and activity sources with bounded player context-menu probes and approximate access buckets. | Live marijn-apitown wood and marijn-apiplay berries searches returned enabled targets in 1 and 4 probes; both enqueued harvests finished without interruption. Bucket skipping and Sector API completeness can hide targets. |
| v2-a2 | Action discovery ordering | Rank owned activity sources and likely matching GameTypes first; use zone ownership to prioritize landscape candidates and isolate entity access denials. Context menus remain authoritative. | Vale: wood 1, berries 1, sleep 2 in the home, water 1; no shower found in the live home or nearby entity query. Colony 45: wood 1, berries 1. Both wood requests started. Zone and static data ordering are heuristics; candidate completeness remains unknown. |
| v2-a2 | Wallet history | Read ledger entries for the configured user and owned seedlings. | judge-value found six runs requesting a ledger; live reads on apiplay and apitown returned initial credits, but a sale or purchase remains to be verified. |
| v2-a2 | Time projections | Project simulation timestamps and extrapolated values in entity reads using the live clock. | efficiency found repeated crop polling; a live apiplay field returned projected water and growth, but a growing crop wait remains to be verified. |
| v2-a1 | OpenAPI | Prewarm and share a world-keyed cache keyed by the developer schema; report readiness and loading. | r8 first descriptions took 13–53 s; on marijn-apitown 12 cold instances shared one cache and the slowest first ready description took 87 ms. A cold description returned catalog types with a loading note. |
| v2-a1 | Instructions | Generate MCP instructions from start-here at startup. | Console agents rarely read start-here (judge-value); live initialize returned its identity and action rules. |
| v2-a1 | Components | Return known components and unknown-name suggestions, including spatial queries. | r8 had 29 unknown-component failures (judge-value); live ID and spatial queries returned Position with Location suggestions. |
| v2-a1 | Search and names | Search display fields, resolve static-data inheritance, rank compact docs hits, fold page listing into docs_search and add bounded cached ID hints. | r8 made 271 numeric lookups in 62 runs and 5/23 docs searches were empty; live tree/activity search, inherited tree activities, visit session search and inventory ID 525548979 passed. |
| v2-a1 | Player mode | List player commands by default and refuse commands with any other role; role=all lists all. | Coherence review found server-only llm_discovery usable via god-mode transport; live ActivitySelection listed 10 player commands and 22 total, and a non-player command was refused. |
| c0 | P1 | Document context-menu discovery, commands and outcome checks. | C-R1 #21–28 and C-S4 #30–42; C-T4 #71–77: resource transfers use a different command. marijn-apitown MCP: page read and enabled berry menu. |
| c0 | P2 | Document election ballot, nomination and voting reads. | C-T1 #38, #41, #43, #48: ballot and role discovery, nomination and votes. marijn-apitown MCP: page read. |
| c0 | P3 | Document local market and delivery reads and missing NPC mirror. | C-T4 #43, #58, #64, #158: listings and accepted purchases. marijn-apitown MCP: page read; no independent trade verified. |
| c0 | P4 | Document prerequisites and client-only progress reports. | C-S2 #18–21: locked objective and quest lookup; r0a A-S2 #34–78 and B-S2: reports and skips. marijn-apitown MCP: page read. |
| c0 | P5 | Add nearby visible landscape-cell discovery with bounded snapshot paging. | C-S4 #12, #17, #23–42: grid decoding and menu probes. marijn-apitown MCP: 64 cells matched independent decoding, including an intersecting tile centered outside the radius; berry candidate returned an enabled harvest menu, completed the activity and left an empty cell menu. Sector API does not report query completeness. |
| r0a | P1 | Add user- and seedling-scoped chat history from gameplay Postgres. | A-S3 #8, #13–29; B-S3 #10, #17–31: replies unavailable. marijn-apitown MCP: controlled message and linked replies, exclusive paging, isolation and empty/error reads. |
| r0a | P2 | Explain any-match component queries and truncation. | A-S4 #40; B-S4 #12: partial component matches. marijn-apitown MCP: both backends return partial and complete matches; nearby query reports truncation. |
| r0a | P3 | Add local raw static-data lookup with repository discovery and pagination. | A-S2 #23–34; B-S2 #55, #111: missing quest and field IDs. marijn-apitown MCP: GameType and UserQuests name/ID lookups, paging and errors. |
| r0a | P5 | Document schedule simulation-hour units and start range. | B-S2 #118–120: minutes rejected, hour values accepted. Schedule validation and marijn-apitown MCP add/remove event at 8 for 2 hours. |
| dots | Events and card | Add a bounded polling journal and an MCP Apps seedling card. | Dots experiment: notifications, chat, crisis, election and activity observations; optional card with text fallback. |
| api-review-1 | Docs | Serve core and prefixed library pages directly, with tier labels and core-first search; make start-here the entry page and fold in schedule units. | Whole-API code and product reviews; marijn-apitown MCP docs checks. |
| api-review-1 | API contracts | Remove unusable `api_get`, refuse player-mode commands on Sector API, and describe caller, query completeness and discovery semantics. | Whole-API code and product reviews; marijn-apitown MCP checks on both backends. |
| api-review-1 | Paging | Retain only truncated responses as separate result-ID snapshots, bounded to 50 MiB with LRU eviction. | Whole-API code review; MCP continuation, isolation and eviction checks. |
| api-review-1 | Events | Deduplicate database IDs over a ten-minute lookback, expose source health and reject cursors beyond the head. Cursors are not filter-bound. | Whole-API code review; MCP cursor and late-insert checks. |
| r2 | P1 | Explain inventory reservation handles and authored resource lookup. | r1/S4-harvest-b #15, #18; r2/S4-harvest-b #11, #22: handles queried as entities. Live MCP: page read and GameType numeric ID lookup. |
| r2 | P2 | Document the player plot-claim command and grant checks. | r1/S5-place #37, #43, #51; r2/S5-place #39, #78: placement and privileged workaround. Live MCP: page read; no new blind claim run. |
| r2 | P3 | Distinguish player identity from command-role enforcement. | r2/S5-place #66, #78: developer command sent as player. Live MCP: tool discovery and context-menu command. |
| r2 | P4 | Clarify repository selection and authored resource lookup. | r2/H2-logistics #33; r2/S4-harvest-b #25–30: query without repository. Live MCP: discovery and GameType ID lookup. |
| r2 | P6 | Explain exact landscape GameType filtering. | r2/S4-harvest-a #17: partial category returned no candidates. Live MCP: exact name and ID matched a cell; partial name returned none with unknown completeness. |
| r2 | P7 | Return the final 429 Retry-After header or its absence. | r1b/T3-influence #15–17: retry header omitted. MCP simulated 429: seconds, HTTP date and absence; live seed-api returned Retry-After 1. |
| r2 | Command descriptions | Cache the developer OpenAPI per world and return catalog type names while it loads; instances share the cache when their logs are in the same directory. | 47 of 108 r2 calls timed out; three marijn-apitown instances returned 30 of 30 descriptions, with the second instance’s first call in 1.27 seconds. |
| r3 | P1 | Report command schema readiness, loading and fetch failures, and incomplete resolution. | r3/S5 #17–55: field probing after loading stubs. Live MCP on both backends; delayed and failed OpenAPI fetch recovered, and description pagination passed. |
| r3 | P2 | Document required schedule days and their range. | r1b/T4-trade-vale #111, r2/S2 #240, r3/S6 #67: empty days rejected. Validation code and live MCP page read; r3/S6 created recurring events with days. No new blind run. |
| r3 | P4 | Explain delivery priority matching and schedule scope. | r1b/T4-trade-vale #138, #140: work-only priority rejected in a personal schedule. ActivityTags entries and validation checked; live MCP page read. No new delivery run. |
| r3x | P5 | Explain discovery of introduction and speech commands. | r3/S2-tutorial-c: empty activity menu and later introduction; r2/T2: speech discovery. Live MCP page and three command schemas checked; no fresh introduction run. |
| r3x | P6 | Add a fresh world simtime clock and absolute tick conversion. | r2/S6, r2/T2 and r3/S6 requested a clock. Fake gRPC clock and live MCP on marijn-apitown and marijn-apiplay checked against decision ticks; no fresh scheduling or gathering run. |
| r4 | P1 | Add opt-in, caller-selected live attributes to the seedling card. | r3 E1 repl #72–75 and r4 L2 #315–316: separate attribute reads. Live MCP returned five values, unavailable and error statuses, and matching text and structured results; 20 card calls requested 100 attribute reads with no reported 429. No sustained caretaker rerun. |
| r4 | P5 | Clarify that card home is assigned residence, separate from plot claims and tents. | r4 S4 no-docs inferred no tent; S5 no-docs had home 0 despite a claim. Live MCP confirmed home 0 with a granted claim and tent ID; no new blind run. |
| r5 | P1 | Explain voter-side vote proposals and relationship selection. | Campaign town2 Reyes #29–32, #239–243 and town3 Reyes #257–260: voter relationships and decisions inspected without selection rule. Live MCP read the page; no new blind campaign. |
| r5 | P2 | Wait up to five seconds for the shared OpenAPI prewarm when describing a command. | r5b S6 #10–25 and S5-a #9–24: loading replies and field probing. Live MCP described commands on both backends; a proxy checked failure, concurrent waits, disconnect, recovery and pagination. No comparable blind rerun. |
| r5 | P4 | Explain new plot reservation bounds and the limits of OVERLAP. | S5-b #33–37: retried the same X/Z at five heights. Live MCP read the page; no new blind plot-claim run. |

## Carries to the formal API

- Make action discovery and disabled reasons first-class, including social actions.
- Offer composite seedling status and attribute reads; retain structured results.
- Provide semantic server-side events with durable replay and push.
- Pair chat send and history; expose simulation time and both clocks.
- Distinguish accepted, completed and unknown outcomes.
- Expose command constraints, projections, name-to-ID resolution and world-versioned static data.

## Next steps

- M6: expose validator constraints in `describe_command` and reduce scenario recipes in core docs.
- m1: return MCP `isError` for tool failures.
- m2: report attribute command failures as read errors.
- m3: remove backend internals from agent-facing descriptions.
- m4: resolve landscape component by name and clarify tile height.
- m5: seed database polling baseline from the lookback ID.
- m6: enforce the landscape snapshot cap before work and atomically.
- m7: disclose that local static data can differ from the deployed world.
- m8: use consistent seedling naming.
- m9: prune client-only library pages, improve index keywords and link time guidance.
- Add focused MCP tests for command identity, routing, and representative read and error behaviour.
- Split `PlayService` along its HTTP/auth, schema/commands, spatial, static-data and documentation responsibilities before extending it.
