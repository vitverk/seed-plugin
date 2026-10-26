# Review evidence

Prepared 2026-10-26. Expectations are embedded in `plugin.json` under `extensions.com.openai.review.test_cases`; update the package when they change. No row below is marked passed merely because its case was authored.

| Case | ChatGPT | Claude | Required evidence |
| --- | --- | --- | --- |
| Fresh paused guest | Not run | Not run | Exact package version, real tool result and rendered view |
| Capability discovery without reset | Not run | Not run | Returned catalog and no guest creation or mutation |
| Add harvesting calendar block | Not run | Not run | Original blocks preserved; actual current-document acknowledgment and visible block |
| Ordered cabin-fitting goal | Not run | Not run | Four ordered steps, correct recipe, preserved paused clock |
| Advance 30 game minutes | Not run | Not run | Before/after game time and returned changes |
| Reject live game account control | Not run | Not run | Accurate explanation; no Seed tool invocation |
| Reject persistence/background promise | Not run | Not run | Accurate explanation; no fabricated saving or background job |
| Reject external calendar write | Not run | Not run | No Seed scheduling call for a Google Calendar request |

Record a dated result of Passed, Failed, Blocked, or Not run for each host, together with the installed package version and a reviewer-accessible sanitized evidence reference. Keep guest-channel credentials and raw private conversation context out of this file.

`npm run smoke` independently verifies direct protocol behavior against the anonymous hosted service and writes its current summary under `dist/`. Those checks use detached synthetic state and cannot establish that a target host rendered the UI, loaded skills, chose the right tool from natural language, or changed the visible companion.
