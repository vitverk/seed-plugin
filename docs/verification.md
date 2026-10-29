# SEED release verification

The 3.0.1 distribution removes the retired simulation from active catalogs, default archives, onboarding and release checks. The authenticated plugin keeps its installed identity and uses the display name SEED. The optional direct API package is built separately.

Run `npm run check` and `npm run package` for local evidence. Run `npm run smoke` for public routing and OAuth metadata. Authenticated `npm run smoke:docs` verifies server branding, focused widget selection guidance and current documentation without game mutations. Record the checked source SHA, runtime version, artifact checksums, date and limits in a release receipt after deployment.

Earlier product releases and submission records are preserved under `archive/demo`. Their historical names and versions are evidence from those dates and are not current setup instructions.

## Verified release — 29 October 2026

SEED 3.0.1 source `4601bdc8a1274e7f2d6bd2f8992e8f833f5ea2f1` was shipped to `origin/main`, with the primary local main synchronized. Package validation and all 29 tests pass. The nine-file default archive uses the canonical S logo and has SHA-256 `d04b16d2d711ef2e1cb1d48f0947ef35483836db178f1f7ab70526907490b8d5`.

Public smoke passes against deployed MCP 2.5.1. The existing authenticated connection confirms the new version and SEED documentation, and refreshed discovery includes the revised widget, game-language and goal-progress guidance. The design site and widget preview remain available. Runtime source, deployment and verification limits are recorded in the [SEED 2.5.1 receipt](https://github.com/vitverk/seed/blob/main/mcp-app/docs/seed-2.5.1-release.md).

The hosted custom app's settings page still shows a fallback cube. Its description and tools were updated, but the app-owned logo editor is unavailable in the exposed Manage UI and Plugin Creator rejects changes to App-backed presentation. MCP and package icons supply the correct S; the host's settings icon remains an explicit unresolved item.
