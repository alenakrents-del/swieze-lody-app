# Season 1 — illustrated reader production brief

Status: local art-direction work in progress. Not approved final artwork. No content migration or production write is included.

## Invariants

- The existing RPC response remains authoritative for titles, episode order and unlocks. Stored story prose remains unchanged.
- Do not infer unlocks from an illustration filename or the current purchase total.
- Keep PL/DE/EN/CS text outside artwork. Do not mechanically attribute narration to speakers.
- All public artwork is downloadable; obscuring a thumbnail is a visual teaser, not an access-control boundary. Never put a protected story solution into an asset intended for locked previews.
- The user-authorized Episode 1 dialogue pilot uses reviewed presentation content in `comic-story-data.js`. This is not a second unlock catalog. Episodes 2–15 continue to use the existing server prose; expansion and database content changes require separate approval.
- Contemporary fictional map activity must not be represented as a historical event or an actual museum programme.

## Visual direction

Expressive hand-inked family adventure; cinematic staging, textured cel shading, warm natural faces and believable hands. Teal sea, warm sand and restrained coral accents. No preschool proportions, logos, in-art text or baked-in speech balloons.

Proposed recurring cast (visual design still subject to product review):

- Maja: observant adult, short dark wavy bob, teal outdoor jacket; gestures that guide without explaining everything.
- Maks: energetic preteen, tousled brown hair, mustard hoodie; anticipation, overconfidence and comic surprise.
- Lea: analytical preteen, tied-back curls, round glasses, coral windbreaker; close observation followed by expressive discovery.
- Frytka: natural white/grey gull, yellow beak; humour through posture, timing and reactions rather than clothing.

## Episode shot plan and editorial gates

| Episode | Establishing/action shot | Reaction/detail shot | Final reveal / next question | Editorial gate |
| --- | --- | --- | --- | --- |
| 1 — Envelope | Low promenade view; the family discovers the envelope | Top-down hands, translucent card and four abstract symbols | Lea lifts the card; its outline aligns with a distant windmill beacon | Strong opening; make the discovery tactile and the reactions distinct |
| 2 — Windmill | Low-angle silhouette of the navigation beacon | Sails reflected in a translucent symbol, surprised recognition | A line continues beyond the frame along the breakwater | Reduce exposition; avoid repeating episode 1's alignment composition |
| 3 — Waves | Spray reaches the card from the sea | Maks celebrates too early; Lea notices a different clue | Newly visible park symbol, with the next path out of frame | Keep humour; do not stage unsafe access to the water |
| 4 — Park | Wide tree canopy and branching public paths | Frytka confidently selects the wrong bench; family reacts | Overhead path pattern resolves into a round outline | Map comparison risks repetition; stage it as a visual search |
| 5 — Round fort | Ground-level curve of brickwork, visitors on the public route | Guide recognises the card; the group's posture changes | Recognition becomes an unanswered question, not another building portrait | Rewrite needed: weak action and ending; keep conservation/safety meaning without a disclaimer paragraph |
| 6 — Museum | Interior depth, modern card clearly separate from exhibits | Guide indicates the unfinished layers; Lea examines the gap | A gesture or sightline across the water | Rewrite needed: move exposition into an intentional panel script |
| 7 — Crossing | Wide port view from a permitted public crossing | Wind, gull and map nearly escaping; Maks reacts | A distant light draws the whole group's gaze | Strong movement; no invented bridge, route or timetable claim |
| 8 — View above | Expansive view from a visitor terrace | Lea aligns the map while Maks tries to align Frytka | Four lines converge at the next destination | Preserve the panorama and comic reaction; avoid generic striped-lighthouse art |
| 9 — Fort answer | Distinct fort courtyard and organised visit | Printed modern puzzle echoes the map; recognition close-up | Shadowed clue about a city unseen from the street | Rewrite needed: the final clue is intriguing but abstract |
| 10 — Beneath dunes | Dark permitted visitor corridor with the group | Torch reflection and widened eyes, strong light/shadow | The line disappears beneath a suggestion of water | Strong atmosphere; do not invent historical inscriptions |
| 11 — Under river | Graphic reflection of water and the route connection | A character weighs two interpretations of the line | Bird-in-reeds symbol interrupts the expected answer | Rewrite needed: transitional explanation lacks a dramatic event |
| 12 — Quiet reeds | Wide marsh atmosphere viewed from a permitted path | Quiet reaction and a finger tracing the map, not disturbing wildlife | Island shapes emerge between water channels | Trim safety exposition; silence should become suspense |
| 13 — 44 islands | High-view map composition clearly illustrated, not a survey | Group discovers how the journey connects | The missing layer leaves one unmistakable empty space | Rewrite needed: factual payoff needs an emotional reaction and a sharper unresolved beat |
| 14 — Four layers | Overhead arrangement of three transparent layers | Envelope sleeve lifted; sudden recognition | Fourth layer aligns and points toward the night return | Strong twist; vary close-ups, transparency and colour |
| 15 — Course found | Return by the beacon; completed map and relieved faces | Quiet collectible moment, shared achievement | Author K. and the second map revealed by localized text outside the art | Trim explanation; give the conclusion room before the Season 2 sting |

## Asset contract

- A character reference sheet establishes consistency but is not shown as episode artwork.
- Each episode needs three independently composed landscape panels. Never reuse one picture with three crops as three narrative events.
- Covers may reuse an establishing panel initially; final key art is a separate deliverable.
- For the first illustrated slice, map exact existing `beat-00` / `scene-00` artwork keys to local assets. Future seasons and unknown keys retain the existing fallback without borrowing Season 1 art.
- Keep explicit image dimensions, uncropped panel presentation, and captions below the art on phones.
- Locked thumbnails must not show a later panel's solution; dedicated fragment/silhouette teasers remain a separate final-art task.

## Remaining content approval

Episodes 5, 11 and 13 need stronger story beats. Episodes 6, 9, 12 and 15 need less exposition. Final panel dialogue, speaker attribution, scene-specific teasers and translations require a reviewed content-only change; this visual pass does not silently replace database text.

## Generation record

Mode: built-in image generation, not API/CLI fallback.

Character-sheet prompt: a contemporary family-adventure cast (Maja in teal, Maks in mustard, Lea in coral with glasses, Frytka the gull), full-body poses and curiosity/surprise/uncertainty/delight expressions, professional hand-inked graphic novel with cinematic cel shading, ivory background, no text/logos/speech balloons. Output is an art-direction reference, not an approved final model sheet.

Panel prompts: [episode-01-generation-prompts.md](episode-01-generation-prompts.md).

## Implemented local slice — 2026-09-02

- Three different 1536×1024 panels for episode 1 under `assets/comic/season-1/`; the held card in panel 3 was corrected to transparent acetate.
- Existing server keys select these assets. No schema, RPC, stored text or unlock/progress changes.
- Episode and season titles sit below the artwork, not over faces. Reader images are shown without cropping.
- Narrative prose uses captions; no invented speech attribution. The ending repeats the last unlocked narrative clue as a pull quote, not as new canonical story content.
- Only these three exact same-origin images are runtime-cached when viewed. They do not hold up service-worker installation. Customer RPC responses are not cached.

## Verification and limitations

PASS: JS syntax (`comic.js`, `sw.js`) and `git diff --check`.

Isolated local browser fixtures, no Supabase connection: 15 journey positions; 1/8/15 unlocked at mocked 0/50/100%; PL/DE/EN/CS switching; next-episode navigation; reader close and reload; no horizontal overflow at 320/375/390/430px; all three images load; missing artwork falls back; RPC error remains localized; untrusted HTML title renders as text, not executable markup. The fixture server initially failed on a missing asset; its 404 handler was fixed and the affected checks repeated. No production code change was required for that test-harness issue.

Service-worker VM contract PASS: matching core versions, install/activate lifecycle, only own old cache deleted, viewed art returned from cache while network is offline, quota/denied-storage fallback and no external image caching. This is a contract test, not a real-device airplane-mode certification.

Not production-ready: episodes 2–15 still use the prior CSS artwork and automatically segmented prose; final covers and safe locked-teaser art are missing; PNG panels total roughly 9 MB and need web delivery optimization; true offline server story-data reading and physical-iPhone Safari verification remain open. The illustration of Stawa Młyny is stylized, not a source-verified architectural depiction; validate it against location reference photography before treating it as final.

## Episode 1 dialogue pilot (supersedes the caption-only pilot above)

`comic-story-data.js` contains exactly one presentation script, keyed by `season-1/beat-00-unmarked-envelope`, with three panels and nine attributed lines in PL/DE/EN/CS. Maja questions assumptions, Maks sees treasure, and Lea spots visual connections. The renderer only selects this script after the server reports the episode unlocked and supplies the matching scene. No unlock amount or progress is stored in this script.

Dialogue is always visible, in reading order, below each illustration with named speakers, distinct accents and speech tails. No taps are required to expose text. The final question is spoken by Maja; the ending and locked Episode 2 reuse a short spoiler-free teaser, not a duplicated narration paragraph. Unknown/missing localized lines fall back to PL. All content is inserted with `textContent`; imagery contains no language-specific text.

The data script is included in the versioned service-worker core cache. Artwork retains on-view caching. This makes the presentation assets cacheable, but does not add offline persistence of private RPC responses or grant offline access to locked episodes.

Pilot verification: isolated browser fixtures passed at 320/375/390/430 px in all four languages (16 combinations): three panels, nine visible speech bubbles, no clipped text or horizontal overflow; at most three text lines per bubble. PL→EN switching, unchanged Episode 2 reader navigation, localized RPC failure UI and literal rendering of a hostile title were checked. Node checks cover all localized lines, PL fallback, matching/unlocked scene selection and exclusion of other episodes/seasons. Syntax, whitespace and mocked service-worker lifecycle/cache checks pass. Screenshots show all three PL/EN panels, the ending, the locked Episode 2 teaser and the longest DE bubble at 320 px. These are browser viewport checks, not physical-iPhone Safari certification.
