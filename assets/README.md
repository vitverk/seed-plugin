# Asset provenance

- All three plugins use the same original SEED “S” vector geometry from `vitverk/seed:mcp-app/public/brand/seed-s-mark-v2.svg`, derived from `design-system/icons/seed/Seed/s-icon.svg`.
- Each package stores its editable vector as `assets/mark.svg` and transparent 512 × 512 PNG exports as `assets/icon.png` and `assets/composer.png`. Geometry, padding and transparency are identical; only the fill differs.
- Colors are copied exactly from `vitverk/seed:design-system/tokens/tokens.json` (`palette`), reviewed 2026-10-28:

| Package | Design token | Previous fill | New fill |
| --- | --- | --- | --- |
| SEED Demo (root assets) | orange | `#F99400` | `#EF6C00` |
| SEED Live (`plugins/seed-live/assets`) | green | `#F99400` | `#00A857` |
| SEED API (`plugins/seed-api/assets`) | blue | `#F99400` | `#1284ED` |

The change gives each marketplace entry a distinct design-system color. OpenAI
`brandColor` metadata uses the same exact hex values, as required by the manifest
format. No color-token definitions were changed.

Regenerate either PNG from its package directory with:

`rsvg-convert --width 512 --height 512 --output assets/icon.png assets/mark.svg`

Repeat with `--output assets/composer.png`. These are reused branding assets,
not newly commissioned or newly licensed artwork.

- The repository's standalone screenshot was captured from the real public guest application on 2026-10-26. It includes existing application artwork and contains only disposable synthetic guest data.

No license or redistribution grant for the SEED mark or third-party artwork was found in the supplied source. Their inclusion preserves existing app branding for this user-requested publication-preparation repository; it does not assert ownership, endorsement, or permission from Klang Games. Confirm the necessary rights before marketplace release, or replace these assets with cleared originals. Do not extend a license for original package code to third-party marks or artwork.
