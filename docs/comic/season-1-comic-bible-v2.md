# Season 1 comic bible — benchmark v2

Baseline: Episode 1 benchmark commit `462b041b7206847d1cfbd7ce0e7d925b0d863619`.

## Canonical product rules

1. Server/RPC data remains authoritative for episode order, thresholds and unlocks. Presentation JS never grants access.
2. Each authored episode has exactly three independently composed portrait panels. Do not reuse one image as three crops.
3. Working master ratio is approximately **4:7 portrait**. Minimum accepted width: **900 px**. Preferred generation master: 1024×1792 or larger at the same ratio.
4. No baked-in text, labels, logos or speech balloons. All PL/DE/EN/CS copy remains DOM text.
5. Keep cast consistent with the approved Episode 1 visual reference:
   - Maja — adult, short dark wavy bob, teal outdoor jacket; measured, practical reactions.
   - Maks — energetic preteen, tousled brown hair, mustard hoodie; fast conclusions and comic confidence.
   - Lea — analytical preteen, tied-back curls, round glasses, coral windbreaker; visual discovery.
   - Frytka — natural white/grey gull, yellow beak; humour through timing/posture, no clothing.
6. Dialogue rhythm must vary. Do not mechanically use three speakers in the same order in every panel.
7. Target **7–8 short lines per episode**. Every line must either move the clue, reveal character or sharpen the cliffhanger.
8. Final line must create a concrete unresolved question that makes the next unlock desirable.
9. Balloon positions are explicit presentation metadata. Artwork composition should reserve quiet negative-space bands that match the proposed placements. Final coordinates are not approved until checked against the actual generated master.
10. If a translation/enlarged text would cover protected art or leave the panel, the existing lettering-gutter fallback is preferable to shrinking/clipping text.
11. Real places must remain visually/factually recognisable. The transparent-map puzzle is contemporary fiction and must not be presented as an actual historical event, official trail or museum programme.
12. Locked thumbnails must never reveal a later solution.

## Batch gate: Episodes 2–4

Do not start Episode 5 until all three pass:
- PL/DE/EN/CS at 320/375/390/430 px;
- no face/hand/map/landmark overlap at standard text size;
- 27 responsive WebP assets load and cache after viewing;
- last-viewed offline replay restores the actual viewed episode, not Episode 1 by mistake;
- server unlock guards remain unchanged;
- real landmark forms are checked against reliable references.

## Story progression

- Episode 2: beacon identity → sail-angle recognition → line along breakwater → water question.
- Episode 3: sea spray reveals hidden print → Maks celebrates too early → park symbol → which path?
- Episode 4: search the path pattern → Frytka chooses crumbs/bench → pattern resolves toward Fort Anioła → sender suspicion continues.


## Batch v2 security clarification

Offline replay is a stored snapshot of an episode already opened after server-backed authorization. It is never an alternate unlock path and never reconstructs `is_unlocked`. Static public assets are not treated as DRM-protected secrets.
