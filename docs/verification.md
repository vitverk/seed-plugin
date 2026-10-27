# Package verification

## Current package 1.6.1: Seed Demo

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
