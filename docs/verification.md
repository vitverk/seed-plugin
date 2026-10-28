# Package verification

## Marketplace freshness check — 28 October 2026

Compared both marketplace catalogs and the Live package with Jón's recent source
changes through the recorded standalone MCP 2.1.0 deployment. Both catalogs resolve
the current Live 2.1.0 package. The connected server supplies the updated workflow
guidance; it is not copied into bundled skills.

All 21 package tests and all three archive builds passed. A fresh download of the
published Live 2.1.0 ZIP matched the rebuilt archive byte for byte and the published
checksum `32a79480ca60ee1e6c12778194893711ded899ffa86a637201953118d47719e7`.
The API archive retains its recorded checksum. `/health` returned Live 2.1.0,
unauthenticated `/mcp` returned 401, and `/demo/mcp` returned 404.

Corrected current setup documentation that still referred to Live 2.0.0, described
`/mcp` as removed, or suggested installing the offline Demo. Published release
assets were not replaced; the locally rebuilt Demo ZIP includes README corrections
and is not a new Demo release. Official-directory submission remains incomplete
for the previously recorded publisher, licensing and host-review requirements.
Installed-host refresh and authenticated gameplay were not exercised in this check.

## Live 2.1.0: direct MCP connection

Published on 28 October 2026 after verifying runtime 2.1.0 at `/mcp`, with
`/live/mcp` and `/staging/mcp` retained. Live owns the hostname and branding;
Demo remains offline. A plugin is optional. A fresh catalog-only SDK client
completed OAuth, discovered tools/resources, retrieved the five new guides,
verified manual pagination/digest, exercised both protocol generations and
rotated its refresh token. No gameplay commands or note writes were sent.

All 187 server tests and 21 package tests passed. The
[Live release](https://github.com/vitverk/seed-plugin/releases/tag/seed-live-v2.1.0)
contains a nine-file archive, checksum and inventory, downloaded and verified
after publication. The archive contains zero skills and uses `/mcp` as its OAuth
resource. API source and package are unchanged. See the
[publication receipt](../submission/seed-live-release-2.1.0.json) and the
[server verification](https://github.com/vitverk/seed/blob/main/mcp-app/docs/standalone-mcp-release.md).
Fresh native-host model routing and UI acceptance remain separate from SDK
protocol verification. Refresh host metadata and start a new chat after updating.


## Post-release availability

Verified on **2026-10-28 at 14:45:32 UTC**, after service consolidation: Demo is intentionally offline by the owner's choice. `https://mcp.flaxa.app/health` and `https://mcp.flaxa.app/demo/mcp` both return **HTTP 404**. Live and staging health routes return **HTTP 200**, runtime **2.0.0**. Demo source is maintained separately in a private repository; no replacement endpoint is announced.

The Demo 2.0.0 artifact remains published. Versions, ZIPs, checksums, inventories and the `v2.0.0` tag are unchanged. The six passing Demo smoke checks at **14:21:44 UTC** below are historical observations of the earlier deployment and do not establish current Demo readiness. The [publication receipt](../submission/github-release-2.0.0.json) and [smoke receipt](../submission/seed-demo-docs-smoke-2.0.0.json) retain that evidence and append this availability update.

## Demo 2.0.0 and Live 2.0.0: standard MCP documentation

Checked locally on **2026-10-28**. Demo and Live contain zero bundled skills; their identities, endpoints, OAuth configuration, artwork and marketplace entries are preserved. The independent API package remains **0.1.2**, with its complete source tree unchanged. Canonical sources and workflows are maintained by the SEED application repository.

- `npm run check`: passed, **21 offline tests**, including zero-skill archive guards, all manifest variants, API skill allowlist, connection isolation and security checks.
- `npm run package`: passed; Demo has **11 files / zero skills**, Live has **9 files / zero skills**, API has **12 files / two skill files**. ZIP entries match their generated inventories.
- Documentation smoke regression: passed against an offline protocol fixture, including canonical document URIs, Demo workflow discovery and a guarantee that documentation-only mode calls no gameplay tools or Skills extension methods.
- Historical hosted `npm run smoke:docs`: **six checks passed** on 2026-10-28 at **14:21:44 UTC** against the then-deployed Demo runtime **0.15.0**. Demo was taken offline later that day, as recorded above. It verified canonical resources, Demo workflow discovery, provenance and conflict links without gameplay calls; see the [read-only smoke receipt](../submission/seed-demo-docs-smoke-2.0.0.json).
- Hosted gameplay `npm run smoke`: **not run**. Live runtime **2.0.0** returned HTTP 200 on Live/staging health routes; anonymous documentation calls returned HTTP 401 with the expected OAuth resource metadata. Authenticated account workflows remain untested by this release check.
- `npm run check:submission`: existing readiness requirements remain incomplete, including licensing, recorded demo, publisher/contact confirmation and installed-host/portal evidence.
- ChatGPT, Codex, Claude and other MCP client acceptance: **pending**. Local tests do not establish installed-plugin cache refresh, rendered UI or model prompt routing.

```text
4203815afac4a276f78c40fec5e87e4e624a1cb3d419f1b96b2f3b7a061b8a3b  seed-plugin-2.0.0.zip
62fb6632b019aaf732dabc9f6e3b1d519a367a9218d04f82293e78804b40f6e9  seed-live-plugin-2.0.0.zip
62ebe8dab6f8479e8153478a78348f9f223e90c4ce21de6bd2d16a77545c0fe0  seed-api-plugin-0.1.2.zip
```

Published [SEED Demo and Live 2.0.0](https://github.com/vitverk/seed-plugin/releases/tag/v2.0.0) on 2026-10-28 from commit `55d47ac4186cae29c29209c6e615e708160a12a8`. All six attached assets were downloaded after publication and matched byte for byte against the validated artifacts; see the [publication receipt](../submission/github-release-2.0.0.json). The release includes the two ZIPs, two checksum files and two inventories. It includes no new API package or directory approval claim.

Earlier observations below retain their original package/runtime scope; references to bundled skills describe those prior releases. Version 2.0.0 requires a package refresh or reinstall, MCP metadata refresh and a new session; removed skill discovery is not preserved by compatibility aliases.

## Three-plugin marketplace: Demo 1.6.7, Live 1.0.1, API 0.1.1

Checked on **2026-10-28** after integrating the latest `origin/main`. Both repository marketplace catalogs include `seed`, `seed-live`, and `seed-api`. Their display names are **SEED Demo**, **SEED Live**, and **SEED API**; all use the SEED S mark in design-system orange, green, and blue respectively. The existing Demo widget-routing changes and runtime 0.14.5 compatibility are preserved.

- `npm ci --ignore-scripts`: passed, no reported vulnerabilities.
- `npm run check`: all 27 tests passed, including both catalogs, connection isolation, version synchronization, and packaged assets.
- `npm run package`: all three ZIPs built; Demo contains 144 allowlisted files.
- `npm run smoke`: all 12 anonymous detached-state checks passed against Demo runtime 0.14.5.
- `claude plugin validate . --strict`: marketplace validation passed; separate directory-readiness advice still identifies the existing missing license.
- `npm run check:submission`: existing official-directory submission requirements remain incomplete. This release updates the Git-backed marketplace; it does not submit a listing to either official directory.

Package SHA-256 checksums:

```text
8ead6378b1ca0358ec06a8bbcbe19ec9df437f5ba512ac18e6ce5704475f5d1c  seed-plugin-1.6.7.zip
77c53de5600bc100dcdf0bbf6e31aba259b8c1baf7ac2b6f1f5b21fe6b5cf05f  seed-live-plugin-1.0.1.zip
8bc4a9ec7285332ce0624274ea65356f74b632a683753c1a56ef5dd05d42d478  seed-api-plugin-0.1.1.zip
```

The Git-backed marketplace reads its catalogs and plugin files from the repository. No server deployment is needed for these listing changes. Installed-host refresh and authenticated gameplay are not established by package validation.

## Package 1.6.6: focused Demo widgets

Checked on **2026-10-28**. The two guest skills match the application source and prefer one useful focused widget from the existing guest. An ordinary “show next week” request selects the compact agenda; requested calendar controls select the calendar. Opening the full companion requires an explicit full-app or fresh-demo request. Simple facts, missing data and action confirmations stay in text. These rules do not change the separate SEED staging plugin.

| Check | Result | Scope |
| --- | --- | --- |
| `npm ci` | Passed; no reported vulnerabilities | Locked package dependencies |
| `npm run check` | Passed; 26 tests | Schemas, manifest versions, guest skills, references, archive guards and preserved live-package metadata |
| `npm run package` | Passed; 143 files | Deterministic `seed-plugin-1.6.6.zip`; inventory and SHA-256 verified |
| `npm run smoke` | Passed; 12 checks against runtime 0.14.5 | 25 tools, three skills, documentation, app resources and anonymous detached synthetic gameplay; no guest channel or live account |
| `claude plugin validate . --strict` | Passed | Separate directory-readiness output still flags the missing distribution license |
| `npm run check:submission` | Existing readiness failures remain | Licensing/brand clearance, demo recording, publisher/contact and portal confirmation, Claude screenshots and installed-host review evidence |
| Installed-host prompt-routing review | Not rerun for this distribution package | Direct MCP smoke does not prove model routing or rendered UI acceptance in ChatGPT or Claude |

Review these additional prompts in each target host when completing installed-package acceptance:

| Prompt and context | Expected routing |
| --- | --- |
| “How is Bowen doing?” with a known existing guest | Read that guest and show one useful status widget; preserve identity and capture time |
| “Show next week” in ordinary chat | Use one compact agenda from the same guest's returned scheduled events |
| “Show the calendar with week controls” | Use the calendar widget instead of also rendering an agenda |
| “Open the full companion” or “Start a fresh demo” | Use the full-app opening route and identify its fresh paused guest |
| A simple fact, missing data or successful change receipt | Answer in text; do not create a guest or fabricate values for a widget |

The generated `dist/smoke-results.json` records this release's direct MCP evidence. Earlier committed receipts and dated sections below retain their original version scope.

## Earlier endpoint policy (1.6.7)

Verified runtime **0.14.5** serves the guest MCP at `https://mcp.flaxa.app/demo/mcp`; both package connection manifests use that endpoint. The `/mcp` compatibility alias was removed. Public Demo package **1.6.7**, live package **1.0.1**, direct API package **0.1.1**, server runtime **0.14.5** and App-backed Demo source **1.7.5** are independent version lines. This repository update does not deploy the server or update an installed App-backed plugin.

## Initial package 1.6.1 verification: Seed Demo

Checked on **2026-10-27**. All three plugin manifests display **Seed Demo**, and both connection manifests use `https://mcp.flaxa.app/demo/mcp`. The OpenAI repository marketplace is labeled **Seed Demo by Vitverk**; Claude's listing description uses Seed Demo. Stable plugin identifier `seed` and marketplace identifier `vitverk-seed` are preserved. Existing `/mcp` connections retain a compatibility alias.

| Check | Result | Scope |
| --- | --- | --- |
| `npm run check` | Passed; 24 regression tests | Package schemas, synchronized manifests, skills, references and archive guards |
| `npm run package` | Passed; 143 files | Deterministic `seed-plugin-1.6.1.zip`, verified inventory and SHA-256 |
| `npm run smoke` | Passed; 12 live checks | Canonical `/demo/mcp`, Seed Demo 0.13.1 metadata, sixteen tools, three skills, documents, app resources and detached synthetic gameplay |
| Claude Code 2.1.224 `plugin validate . --strict` | Five compatibility warnings treated as errors | This older CLI ignores existing directory fields `documentationUrl`, `supportUrl`, `icon`, `privacyPolicyUrl` and `termsOfServiceUrl`; those required listing fields were preserved |
| `npm run check:submission` | Expected failure | Existing license, demo recording, publisher/portal and installed-host evidence remain incomplete |
| Installed-host review | Not rerun for this public package | Direct MCP success does not establish ChatGPT/Claude host UI acceptance |

The [live smoke receipt](../submission/seed-demo-smoke.json) records the endpoint, server identity/version and each passing check. The smoke uses detached sample state only, with no browser channel or real game account.

## Earlier package 1.3.3

Checked on **2026-10-27**. The calendar reference now covers only the guest simulation, with its state, recurrence and fictional-activity boundaries. Skills no longer route requests to native-game research. Package identity, branding, MCP connections and host distribution support are unchanged.

| Check | Result | Scope |
| --- | --- | --- |
| `npm run check` | Passed; fourteen regression tests | Existing package checks plus guest skill inventory/content and lockfile version guards |
| `npm run package` | Passed; 13 files | Deterministic `seed-plugin-1.3.3.zip`, verified inventory and SHA-256 |
| `npm run smoke` | Passed; ten live checks against runtime 0.10.0 | Direct anonymous MCP and detached synthetic snapshots; no browser channel used |
| `npm run check:submission` | Expected failure | Existing license/video, portal identity/contact, screenshots and host review evidence remain unfinished |
| Installed-host review | Not rerun | No new ChatGPT/Claude UI or prompt-routing acceptance claim |

## Earlier package 1.3.1

Metadata and package checks observed on **2026-10-26**. This update selects **Vitverk** as publisher, preserves the owner's **Iceland** audience and **no payments or purchases** decisions, and configures the new Seed-specific policy URLs in both platform manifests and the OpenAI compatibility manifest:

- Privacy: `https://flaxa.app/privacy`
- Terms: `https://flaxa.app/terms`

Both policy pages returned HTTP 200 anonymously and matched the reviewed Seed-specific source content byte for byte on 2026-10-26. The homepage links and shared stylesheet were also verified. See [publication evidence](../submission/policy-check.json) for content hashes. This verifies publication, not legal compliance. Portal identity verification remains pending. OpenAI declares `publication.countries: ["IS"]`; no unsupported Claude country field is added, and Claude availability must be confirmed in its portal. Public repository and endpoint access are not geographically restricted by these metadata.

| Check | Result | Scope |
| --- | --- | --- |
| `npm run check` | Passed; eleven regression tests | Agent Plugins schemas, synchronized manifests, package safety and both-platform submission-gate regression |
| `npm run package` | Passed; 13 files | Deterministic `seed-plugin-1.3.1.zip`, verified inventory and SHA-256 |
| Claude Code 2.1.310 plugin manifest validation, `--strict` | Passed | Basic manifest/component checks; separately reports the missing license |
| Claude Code 2.1.310 marketplace validation, `--strict` | Passed | Repository catalog structure |
| Claude Code 2.1.310 `--profile directory` | Expected failure: `LICENSE_MISSING` | The owner has deferred licensing; no license grant was invented |
| `npm run check:submission` | Expected failure | Deferred license/video, portal identity/contact/availability, screenshots and host review evidence remain unfinished |
| Live runtime and target-host review | Not rerun for this metadata update | Earlier direct runtime evidence is retained below; no new installed-host acceptance is claimed |

The owner will provide the demo recording later. The actual video URL remains absent. The package's policy publication checks are passed based on anonymous retrieval and exact source-content comparison.

## Earlier package 1.3.0 and runtime 0.9.0

The following evidence was observed on **2026-10-26** for Seed package **1.3.0** and server runtime **0.9.0**. Its missing-policy warning describes that earlier package, before the 1.3.1 metadata update.

| Check | Result | Scope |
| --- | --- | --- |
| `npm run check` | Passed; eleven regression tests | Vendored Agent Plugins schemas, compatible manifests, skills, icons, bindings, archive safety and submission-gate regression |
| `npm run package` | Passed; 13 files, deterministic ZIP with verified inventory and SHA-256 | One plugin; marketplace catalogs, private app bindings and development files excluded |
| `npm run smoke` | Passed; ten live checks | Anonymous MCP and disposable detached sample state; see `submission/protocol-check.json` |
| Claude Code 2.1.310 plugin manifest validation, `--strict` | Passed | Manifest/component checks; directory gaps are reported separately |
| Claude directory readiness | Incomplete | Missing distribution license; missing privacy-policy URL warning; additional publisher/review requirements remain |
| `npm run check:submission` | Expected failure | Reports missing declarations and unfinished evidence without preventing a technically valid package |
| Standalone app screenshot | Captured and visually inspected | Real guest app only; no private host UI. Not target-host review evidence |
| ChatGPT/Claude installed-host review cases | Not run | See `submission/test-results.md` |

The production smoke was executed against `https://mcp.flaxa.app/mcp`. It verified health, initialization, twelve expected titled/annotated tools, the app resource and CSP, capabilities, a new paused snapshot, calendar preservation after adding harvesting, ordered goals, 30-minute time advancement, and missing-target rejection. It did not obtain guest channels or touch a live game account.

Claude CLI validation was invoked from the official `@anthropic-ai/claude-code` npm package at pinned version 2.1.310. Its basic validator can pass while emitting directory failures; use `--profile directory` to make directory blockers affect the exit status. This distinction is why package validity is reported separately from submission readiness.

GitHub package CI and the automatic CodeQL setup both passed for the initial public commit `92dd7f44a7f449dbb6a4e04f74086f7a94ec5414`. The submission gate subsequently gained separate Claude metadata/license checks and regression coverage; see the repository Actions tab for checks on each later commit.

CI runs offline validation and packaging on pushes and pull requests. Live endpoint checks can be requested with the manual workflow input. Neither CI nor this record certifies marketplace approval, policy compliance, licensing, or embedded-host behavior.
