# Full long-form Season 1 — RC v5

The v4 pilot format is now extended through Episodes 4–15.

## Content
- Episodes 1–15 have long-form story content.
- Languages: PL / DE / EN / CS.
- Existing artwork is reused; no extra art is required.
- The reader format remains artwork → narration/dialogue → next artwork.
- Text stays below artwork.

## Canon locks
- E1–E12 never identify a missing/fourth physical sheet.
- E13 contains the first explicit hypothesis that one more whole transparent sheet may exist.
- E14 confirms the transparent envelope sleeve as the complete fourth rectangular sheet.
- E15 confirms K and introduces a second-map hook.

## Functional constraints unchanged
- `comic.js` still owns server-derived unlock state.
- Long-form data does not contain thresholds or grant access.
- No database/RPC/auth changes.
- Customer UX v3 and Staff v4 remain included.

## Visual test limitation
The current execution sandbox blocks Chromium from navigating even to local `file://` and localhost pages (`ERR_BLOCKED_BY_ADMINISTRATOR`), so a genuine browser screenshot test could not be completed here.
Static layout and content checks were run instead. A real mobile browser smoke test remains required before production.
