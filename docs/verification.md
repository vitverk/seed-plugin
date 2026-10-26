# Package verification

Observed on 2026-10-26 for Seed package 1.3.0 and server runtime 0.9.0.

| Check | Result | Scope |
| --- | --- | --- |
| `npm run check` | Passed; nine regression tests | Vendored Agent Plugins schemas, compatible manifests, skills, icons, bindings, archive safety and submission-gate regression |
| `npm run package` | Passed; 13 files, deterministic ZIP with verified inventory and SHA-256 | One plugin; marketplace catalogs, private app bindings and development files excluded |
| `npm run smoke` | Passed; ten live checks | Anonymous MCP and disposable detached sample state; see `submission/protocol-check.json` |
| Claude Code 2.1.310 plugin manifest validation, `--strict` | Passed | Manifest/component checks; directory gaps are reported separately |
| Claude directory readiness | Incomplete | Missing distribution license; missing privacy-policy URL warning; additional publisher/review requirements remain |
| `npm run check:submission` | Expected failure | Reports missing declarations and unfinished evidence without preventing a technically valid package |
| Standalone app screenshot | Captured and visually inspected | Real guest app only; no private host UI. Not target-host review evidence |
| ChatGPT/Claude installed-host review cases | Not run | See `submission/test-results.md` |

The production smoke was executed against `https://mcp.flaxa.app/mcp`. It verified health, initialization, twelve expected titled/annotated tools, the app resource and CSP, capabilities, a new paused snapshot, calendar preservation after adding harvesting, ordered goals, 30-minute time advancement, and missing-target rejection. It did not obtain guest channels or touch a live game account.

Claude CLI validation was invoked from the official `@anthropic-ai/claude-code` npm package at pinned version 2.1.310. Its basic validator can pass while emitting directory failures; use `--profile directory` to make directory blockers affect the exit status. This distinction is why package validity is reported separately from submission readiness.

CI runs offline validation and packaging on pushes and pull requests. Live endpoint checks can be requested with the manual workflow input. Neither CI nor this record certifies marketplace approval, policy compliance, licensing, or embedded-host behavior.
