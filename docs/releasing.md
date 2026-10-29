# Release SEED

The root package is the authenticated SEED companion. Its stable internal plugin identifier remains `seed-live`; display names and normal guidance use SEED. The optional direct API package is separate. Historical anonymous-package material under `archive/demo` is excluded from active catalogs, validation, packages and host smoke checks.

1. Update the SEED manifests, root package version and lockfile together. Preserve the existing OAuth connection configuration and plugin identity.
2. Run `npm ci --ignore-scripts` and `npm run check`. Checks cover the active catalogs, canonical endpoint, OAuth configuration, public branding, package boundaries and optional API guidance.
3. Run `npm run package`. It clears generated `dist/` output before creating only `seed-plugin-<version>.zip`, `SHA256SUMS` and `archive-inventory.json`. Run `npm run package:api` separately when releasing the optional API package.
4. Run `npm run smoke` for public health, retired-route rejection, authenticated endpoint challenges and OAuth metadata. To verify the deployed model instructions and widgets, supply a valid canonical-audience token in `SEED_SMOKE_TOKEN` through your credential environment and run `npm run smoke:docs`. This mode requires authentication and performs documentation reads only. Tokens are neither printed nor saved in receipts.
5. Fetch and integrate `origin/main`, revalidate the integrated change, then push without forcing. Synchronize the clean primary checkout's local main and verify the shipped SHA on the remote.
6. Deploy the server independently from `vitverk/seed`, then rerun hosted smoke against the expected runtime version. A package push does not establish runtime deployment or refreshed host discovery.

Public directory submission is separate from shipping repository changes. `npm run check:submission` validates SEED's current submission inputs and reports missing identity, policies, licensing, country, commerce, recording and host-review evidence. A product demonstration recording is distinct from the retired Demo product. Do not copy earlier anonymous-service policies or review results into the authenticated SEED submission as proof of readiness.
