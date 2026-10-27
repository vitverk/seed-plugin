# Publish Seed for Claude

Requirements reviewed against official Claude documentation on **2026-10-26**.

This repository prepares Seed for distribution. Publishing the GitHub repository, passing local checks, or installing its marketplace entry does **not** mean Anthropic has listed or approved it.

## Package and marketplace

The plugin lives at this repository's root. Its identity is `seed`, version `1.5.0`. Claude reads `.claude-plugin/plugin.json`, the remote server in `.mcp.json`, and the root `skills/` directory. The MCP endpoint is `https://mcp.flaxa.app/mcp`; its Claude transport is `http`. No API key, account credential, local server, or MCPB bundle is required for this anonymous guest simulation. See [plugin structure and testing](https://claude.com/docs/plugins/build).

The repository's `.claude-plugin/marketplace.json` declares marketplace `vitverk-seed`, with plugin source `./`. Users can install the repository catalog with:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed@vitverk-seed
```

This is a catalog maintained by Vitverk. It is separate from listing in Anthropic's directory. [Create a marketplace](https://code.claude.com/docs/en/plugin-marketplaces)

For local development:

```sh
npm run check
npm run package
npm run smoke
npm run check:submission
claude plugin validate .claude-plugin/plugin.json --strict
claude plugin validate .claude-plugin/marketplace.json --strict
claude plugin validate . --profile directory
claude --plugin-dir .
```

Run `/mcp` in the Claude Code session to inspect the connection. The npm checks supplement Claude's validation; they cannot certify portal approval or a functioning embedded UI. Claude Code version 2.1.281 or later recognizes directory listing fields and validates declared MCP entries. Older versions may warn about valid listing fields, making `--strict` fail. See the [manifest validation reference](https://code.claude.com/docs/en/plugins-reference#validate-the-manifest).

## Submit the connector and plugin

Use the [Claude developer portal](https://claude.ai/directory/manage) from the organization that should own the listings. Submit the remote server as an **MCP connector**, then submit this repository as a **Plugin bundle**. Keep both submissions in the same organization and use the same MCP URL so the listings can be paired. Current directory guidance accepts submissions from paid Claude accounts; Team and Enterprise also impose role requirements. Standalone desktop-extension directory submissions are deprecated. [Directory publishing](https://claude.com/docs/directory/publish)

For the plugin Source step, use:

| Field | Value |
| --- | --- |
| Repository | `https://github.com/vitverk/seed-plugin` |
| Plugin path | Leave empty; the plugin is at the root |
| Branch or tag | Choose the release to review, or leave empty for the default branch |

Connect a GitHub account with push access, run the portal's Validate step, and correct any blocking findings. Validation applies to one commit; revalidate after pushing changes. The repository must be public before listing goes live. Check the listing copied from the manifest and README, complete data-handling and contact fields, and submit for review. [Submit a plugin](https://claude.com/docs/plugins/submit)

## Prepare the remaining review material

The owner selected **Vitverk**, **Iceland** as the intended audience, and **no payments or purchases**. The current manifest carries Vitverk's name and the new Seed-specific policy URLs. Portal identity verification, availability controls, and review evidence remain separate requirements:

- **License and rights:** the owner deferred licensing. Before submission, obtain the chosen distribution license and confirm permission to distribute any third-party names and visual assets. Add the approved license in the plugin folder or manifest. The directory requires a license; its documentation does not establish that an all-rights-reserved notice alone grants sufficient distribution rights. See the [plugin pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist).
- **Legal and contact information:** the manifest now declares [Seed privacy](https://flaxa.app/privacy) and [Seed terms](https://flaxa.app/terms). Both pages were published and verified anonymously on 2026-10-26; see [publication evidence](../submission/policy-check.json). Use the intended Vitverk identity and confirm its portal verification. **support@vitverk.is** is a known public support contact; designate the review contact in the secure portal without inventing reviewer credentials.
- **Availability and commerce:** the owner requested Iceland only and confirmed no payments or purchases. The reviewed Claude manifest reference does not document a country-targeting field, so none is added. Confirm an Iceland-only publication route in the portal before releasing; do not infer geographic enforcement from the OpenAI `IS` declaration. The repository and remote endpoint remain public.
- **Demo recording:** the owner will provide the video later. The prepared walkthrough remains in `submission/demo-walkthrough.md`; no recording or recording URL is claimed.
- **MCP App carousel:** capture 3–5 actual app-response PNGs, each at least 1000 pixels wide. Exclude the chat prompt from the crop and record each paired prompt separately. Do not present mockups or older host captures as fresh Claude verification. See [connector screenshot requirements](https://claude.com/docs/connectors/building/submission#carousel-screenshots-for-mcp-apps).
- **Host testing:** install the package in Claude chat and Cowork, connect its bundled connector, and exercise the supported workflows. Test the tools and record the actual results. For anonymous reviewer access, explain that no account is needed and that opening the app creates a temporary populated guest; do not invent test credentials. See [connector submission](https://claude.com/docs/connectors/building/submission).

Claude's manifest already declares `icon` as a bundled relative path and `documentationUrl`, `supportUrl`, `privacyPolicyUrl`, and `termsOfServiceUrl` as HTTPS URLs. Keep these fields in `.claude-plugin/plugin.json`, not the marketplace entry, and verify the linked content separately. [Directory listing fields](https://code.claude.com/docs/en/plugins-reference#directory-listing-fields)

The portal's validation and review remain authoritative. Keep submission status and observed host-test results separate from package validation results.
