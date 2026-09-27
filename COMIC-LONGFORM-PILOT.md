# Comic long-form pilot — Episodes 1–3

## What is implemented
- Episodes 1–3 contain full localized reading scripts in PL / DE / EN / CS.
- Existing three illustrations per episode are reused.
- Dialogue and narration render below the illustration, never over character faces or map details.
- Server unlock state is still authoritative: the long-form transformer only runs after `comic.js` has successfully opened an already-unlocked episode.
- Existing artwork selection and offline replay logic remain in `comic.js`.
- Episode 1–3 long-form data does not grant access and does not contain unlock thresholds.

## Reading layout
Each illustrated panel becomes:
1. artwork,
2. narration / character dialogue,
3. next artwork,
4. more story.

The pilot is intentionally limited to Episodes 1–3 so mobile readability can be evaluated before localizing Episodes 4–15.

## Canon
- Episode 1 does not identify a missing physical layer.
- Episode 2 explicitly establishes three whole intact transparent sheets.
- Episode 3 introduces only an uncertain K-like mark.
- No fourth-sheet reveal occurs.

## Next test
Test at 360 / 390 / 430 px widths in PL / DE / EN / CS.
If the reading rhythm is good, use the same data structure for Episodes 4–15.
