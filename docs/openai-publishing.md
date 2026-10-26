# Publish Seed to OpenAI

Requirements verified against official documentation on **2026-10-26**. OpenAI publishes approved plugins to the universal directory shared by ChatGPT and Codex. A public GitHub marketplace and a private development installation are separate distribution routes. [Package your plugin](https://developers.openai.com/plugins/build/plugins)

## Files already prepared

The canonical `plugin.json` uses the Agent Plugins 1.0 schema. OpenAI listing metadata, five positive and three negative review cases, prompts, and release notes live under `extensions.com.openai`. `mcp.json` points at `https://mcp.flaxa.app/mcp`, using `streamable-http`. The compatibility manifest has synchronized identity and presentation. Both portable skills and actual PNG icons are bundled.

The portable MCP schema currently excludes arbitrary server extension fields, while OpenAI documents additional authentication extensions. Seed does not need an explicit auth declaration: it is anonymous, contains no headers or credentials, and **None** must be selected during portal setup. This keeps the configuration valid against the upstream portable schema.

Public author uploads must not contain `.app.json` or non-null `apps` declarations. This package intentionally has neither. Preserve private development bindings in their existing source; do not copy them here. If the portal generates bindings after MCP conversion, preserve them in its finalized release rather than stripping them from the saved portal version. [Submission package requirements](https://developers.openai.com/plugins/deploy/submission)

The app's interactive UI and thread/global entrypoints are served by the MCP server. They are not a separate browser extension or a new service in this repository. Standard MCP Apps clients use the `text/html;profile=mcp-app` resource; OpenAI-specific display and entrypoint metadata stay on the server.

## Complete preparation

1. Confirm the intended verified publisher. `vitverk` currently identifies the requested repository owner; it is not an assertion of verified legal identity.
2. Publish real privacy and terms pages, verify their content anonymously, then add `privacyPolicyURL` and `termsOfServiceURL` to the portable interface and compatibility interface. The repository homepage and Issues page provide website and package-support destinations; verify them after publication.
3. Resolve distribution licensing and rights to the existing SEED branding. Do not add a blanket MIT declaration over third-party assets.
4. Confirm countries and whether payments or purchases are involved. Add `publication.countries` only after that decision; `[]` explicitly means no country restrictions. Put the commerce declaration under `review.commerce`, with `commerce_description` where applicable.
5. Rehearse and record the real target-host flow in `submission/demo-walkthrough.md`. Host the actual video for reviewers, verify playback without private access, and add `review.demo_recording_url`. A written walkthrough or standalone screenshot does not meet that requirement.
6. Run the five positive and three negative cases from `plugin.json` in the intended host and record results in `submission/test-results.md`. Direct MCP checks are additional evidence, not replacements for host cases.
7. Run `npm run check`, `npm run package`, `npm run smoke`, and `npm run check:submission`. Inspect the produced ZIP and its exact version after every content change.

Required MCP listing URLs are website, support, privacy policy, and terms of service. Display name and subtitle each allow at most 30 characters. The actual category is **Entertainment**. Initial MCP review requires exactly five positive and three negative cases. [Submission metadata and review requirements](https://developers.openai.com/plugins/deploy/submission)

## Final portal setup

When the package preparation items are complete, use the intended verified organization in the [OpenAI Platform](https://platform.openai.com/) plugin submission flow. Upload the final ZIP as a draft, connect the remote MCP endpoint through **With MCP**, and select **None** authentication. Seed opens with synthetic sample data, so it needs no reviewer login. Confirm that the portal imported the exact metadata, review cases, server URL, and version.

Complete connection/tool checks, required scans, domain and developer verification, and secure review-contact fields. The authorized publisher must complete legal and policy attestations. Submit for review only after these checks, then publish separately after approval. Uploading a draft does not submit it or make it public. Re-uploading replaces the bundle and may reset attestations. [Official submission workflow](https://developers.openai.com/plugins/deploy/submission)

The full `check:submission` gate also includes portal validation, so that checklist item remains pending until this final setup is complete; it does not prevent preparing or uploading a draft.

No OpenAI portal draft, submission, approval, or publication has been performed by this repository's creation workflow.
