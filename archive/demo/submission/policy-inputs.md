# Publisher decisions and remaining inputs

Owner decisions recorded on **2026-10-26**:

| Item | Confirmed choice |
| --- | --- |
| Publisher | **Vitverk**; author URL `https://vitverk.is/` |
| Intended marketplace audience | **Iceland only**; OpenAI `publication.countries` is `["IS"]` |
| Payments or purchases | **None**; OpenAI `review.commerce` is `false` |
| Privacy policy | A new Seed-specific page at `https://flaxa.app/privacy` |
| Terms of service | New Seed-specific terms at `https://flaxa.app/terms` |
| Distribution license | Deferred by the owner; no license grant added |
| Demo video | The owner will provide it later; no recording URL supplied |

Both platform manifests use the selected policy URLs. Both pages were published and verified anonymously on 2026-10-26; each returned HTTP 200 and matched the reviewed source content exactly. See [publication evidence](policy-check.json). This document records the decisions; it is not itself a privacy policy or terms of service.

Vitverk's public contact is **support@vitverk.is**. GitHub Issues is the package support page. Confirm Vitverk's verified identity in the OpenAI and Claude portals and designate the review contact in their secure forms. No reviewer account or credentials are needed for the anonymous guest app, and none are invented here.

The reviewed Claude manifest reference has no documented country-targeting field. Confirm that the portal can satisfy the Iceland-only publication choice before releasing there; do not add an unsupported field or claim that the public repository or MCP endpoint is geographically restricted.

Remaining preparation:

- Resolve the deferred license for original instructions and tooling, plus clearance for the SEED mark and third-party imagery. Public repository access is not an open-source license.
- Receive and verify the actual reviewer-accessible demo recording. The prepared steps are in `submission/demo-walkthrough.md`.
- Capture actual target-host screenshots and run the review cases. Keep unrun cases marked accordingly.
- Complete portal identity/domain checks, availability confirmation, scans, review-contact setup and authorized attestations.

After each item is completed, update the matching manifest fields and `submission/readiness.json` with evidence, rebuild the archive, and run the submission gate again. A package check is separate from platform approval.
