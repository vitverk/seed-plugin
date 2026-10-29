# SEED release verification

The 3.0.0 distribution removes the retired simulation from active catalogs, default archives, onboarding and release checks. The authenticated plugin keeps its installed identity and uses the display name SEED. The optional direct API package is built separately.

Run `npm run check` and `npm run package` for local evidence. Run `npm run smoke` for public routing and OAuth metadata. Authenticated `npm run smoke:docs` verifies server branding, focused widget selection guidance and current documentation without game mutations. Record the checked source SHA, runtime version, artifact checksums, date and limits in a release receipt after deployment.

Earlier product releases and submission records are preserved under `archive/demo`. Their historical names and versions are evidence from those dates and are not current setup instructions.
