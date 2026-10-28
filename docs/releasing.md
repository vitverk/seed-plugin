# Release maintenance

The root `plugin.json` is the public package identity. Keep its name and version synchronized with `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `package.json`, and both root version fields in `package-lock.json`. Both MCP configurations must point at the same hosted endpoint; `streamable-http` is the portable transport spelling and `http` is Claude's spelling. Marketplace entries resolve the plugin at the repository root and do not override its version.

When publisher information is supplied, update each platform's actual manifest. OpenAI's interface is also duplicated in the Codex compatibility manifest; a root portable field does not populate Claude's listing automatically.

| Publisher value | OpenAI `extensions.com.openai.interface` | Claude `.claude-plugin/plugin.json` |
| --- | --- | --- |
| Support page | `supportURL` | `supportUrl` |
| Privacy policy | `privacyPolicyURL` | `privacyPolicyUrl` |
| Terms of service | `termsOfServiceURL` | `termsOfServiceUrl` |
| Documentation | Product information in `websiteURL` | `documentationUrl` |
| Distribution license | Root `license`, or packaged `LICENSE` | Manifest `license`, or packaged `LICENSE` |

The submission gate checks both platforms independently and requires matching privacy and terms URLs. A checked-off readiness item cannot replace a missing manifest field. The gate also checks the demo URL format, country-code format, and a commerce explanation when commerce is declared; these syntax checks do not verify the publisher's facts or external pages.

1. Maintain source documents and authored workflows in the SEED application repository, following [documentation refresh](help-center.md#refresh-and-validate). Demo and Live packages must contain zero skills. Do not copy the corpus, private account notes, deployment secrets, app bindings or host screenshots into them. The independent SEED API guidance remains unchanged.
2. Update release notes, supported behavior, review cases, and server compatibility when the runtime changes. Package and server runtime versions are independent.
3. Update publisher-provided facts in both platform listings, and update `submission/readiness.json` with evidence rather than simply marking all entries passed. Preserve unknown fields as absent.
4. Run `npm ci`, `npm run check`, `npm run package`, and, after runtime deployment, `npm run smoke:docs`. Run the separate detached-gameplay `npm run smoke` only when authorized. Review the generated archive inventory and checksum. CI performs offline package checks; live checks are separately invoked.
5. Run `npm run check:submission`. A successful package build is not sufficient while this gate reports missing licensing, policies, demo, or host/portal evidence.
6. Validate with a current Claude CLI when available: `claude plugin validate . --strict`. The Claude portal applies additional checks. Test the exact ZIP or direct MCP connection in ChatGPT, Codex and other target MCP clients, including state freshness, read-only questions, tool errors, and visible-versus-detached edits.
7. After readiness, tag the reviewed commit and publish its verified ZIP/checksum as a GitHub release if desired. Submit or update each directory listing through its own portal; Git pushes and tags do not automatically confer directory approval.

The ZIP is generated from an explicit file allowlist and is not committed. Repository marketplace catalogs are excluded from plugin uploads. Never use `zip -r .` or upload the entire repository as a plugin. No lifecycle hooks, stdio wrappers, local servers, or secret headers are required.

[The package validator](../scripts/validate.mjs) enforces zero skills and no onboarding-skill declarations for Demo and Live. It keeps strict secret, app-binding, symlink and connection checks. The direct API package retains its exact two-file skill allowlist and independent version. Package inventories and checksums cover all three archives.

Demo and Live 2.0.0 remove the previous bundled skills without a compatibility layer. Release notes must tell existing users to refresh or reinstall, refresh MCP metadata and start a new session. The matching runtime must support `search_seed_docs`, `read_seed_doc`, `seed://docs/index` and canonical `seed://docs/<URL-encoded stable document ID>` resources. Corpus fidelity is validated in the application repository; distribution tests validate the slim package contract. Hosted checks and installed-host acceptance remain separate evidence.
