# Release maintenance

The root `plugin.json` is the public package identity. Keep its name and version synchronized with `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, and `package.json`. Both MCP configurations must point at the same hosted endpoint; `streamable-http` is the portable transport spelling and `http` is Claude's spelling. Marketplace entries resolve the plugin at the repository root and do not override its version.

1. Update skills from the application source only after reviewing their public contents and preserving internal references. Do not copy deployment secrets, app bindings, host screenshots, or private verification dumps.
2. Update release notes, supported behavior, review cases, and server compatibility when the runtime changes. Package and server runtime versions are independent.
3. Update publisher-provided facts in both platform listings, and update `submission/readiness.json` with evidence rather than simply marking all entries passed. Preserve unknown fields as absent.
4. Run `npm ci`, `npm run check`, `npm run package`, and `npm run smoke`. Review the generated archive inventory and checksum. CI performs offline package checks; live checks are separately invoked.
5. Run `npm run check:submission`. A successful package build is not sufficient while this gate reports missing licensing, policies, demo, or host/portal evidence.
6. Validate with a current Claude CLI when available: `claude plugin validate . --strict`. The Claude portal applies additional checks. Test the exact ZIP in both target hosts, including state freshness, read-only questions, tool errors, and visible-versus-detached edits.
7. After readiness, tag the reviewed commit and publish its verified ZIP/checksum as a GitHub release if desired. Submit or update each directory listing through its own portal; Git pushes and tags do not automatically confer directory approval.

The ZIP is generated from an explicit file allowlist and is not committed. Repository marketplace catalogs are excluded from plugin uploads. Never use `zip -r .` or upload the entire repository as a plugin. No lifecycle hooks, stdio wrappers, local servers, or secret headers are required.
