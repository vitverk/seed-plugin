# Release SEED

The root package is the authenticated SEED companion. Codex and the archive install it as `seed`, and the Claude marketplace installs the `claude` folder as `seed`; every host names the MCP server `seed`. Display names and normal guidance use SEED. SEED is the sole installable plugin.

1. Update the SEED manifests (including `claude/.claude-plugin/plugin.json`), root package version and lockfile together. Preserve the existing OAuth connection configuration and plugin identity.
2. Run `npm ci --ignore-scripts` and `npm run check`. Checks cover the active catalogs, canonical endpoint, OAuth configuration, public branding, package boundaries and exclusion of retired plugins.
3. Run `npm run package`. It clears generated `dist/` output before creating only `seed-plugin-<version>.zip`, `SHA256SUMS` and `archive-inventory.json`.
4. Run `npm run smoke` for public health, retired-route rejection, authenticated endpoint challenges and OAuth metadata. It checks that `/mcp` discovers the root issuer and `/oauth/authorize`, `/oauth/token` and `/oauth/register`, while existing aliases retain the `/staging` issuer. The public checks read discovery metadata without registering clients or starting sign-in. To verify the deployed model instructions and widgets, supply a valid canonical-audience token in `SEED_SMOKE_TOKEN` through your credential environment and run `npm run smoke:docs`. This mode requires authentication and performs documentation reads only. Tokens are neither printed nor saved in receipts.
5. Fetch and integrate `origin/main`, revalidate the integrated change, then push without forcing. Synchronize the clean primary checkout's local main and verify the shipped SHA on the remote.
6. Deploy the server independently from `vitverk/seed`, then rerun hosted smoke against the expected runtime version. A package push does not establish runtime deployment or refreshed host discovery.

Public directory submission is separate from shipping repository changes. `npm run check:submission` validates SEED's current submission inputs and reports missing identity, policies, licensing, country, commerce, recording and host-review evidence. A product demonstration recording is distinct from the retired Demo product. Do not copy earlier anonymous-service policies or review results into the authenticated SEED submission as proof of readiness.
