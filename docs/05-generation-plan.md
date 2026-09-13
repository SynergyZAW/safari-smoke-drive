# 05 — Generation plan

Higgsfield, in this order. Do not skip ahead. Each step is checked against the ones before it.

**Balance at time of writing:** ~1,036 credits on an Ultra plan. Enough for steps 1–4 and a first pass at 5. Cinematic sequences are the expensive part; approve the sheets first.

## Order

1. **Character sheets** — three hero mascots + the viewer's hand + the Eco-Star prop. `character-sheet` workflow, 3d-stylized preset with the custom render module in 03. Turnaround, expressions, hands, seated. Iterate until the acceptance checklist in 03 passes. **Locked.**
2. **The vehicle** — four angles (front 3/4, rear 3/4, driver side, the back-row POV), final paint, wear, torn awning, loose kit. Livery: acacia-and-sun lockup hand-painted on the door, `SOIL2OIL` stripe on the roll bar, flag roundel on the bonnet, all as weathered paint with no legible words. An open-sided tiered game viewer with a canvas awning, roll bar, spare on the bonnet. Generic. **Locked.**
3. **Lighting and palette keys** — five stills, one per time of day, from the back-row POV with the locked truck: pre-dawn, morning, noon, golden hour, dusk/night. These are the grade reference for every subsequent generation.
4. **Impact library** — the twelve plates in 04, generated against the keys in 3.
5. **Set dressing** — the ranger signboards (gate, riverbed, camp), the acacia (the logo tree), and the **frosty plant** as one locked asset: a mature flowering plant, dense frosted colas, generated once and reused in three places (the gate exit in chapter 2, the grow beside camp in chapter 7, one silhouette on the trail at golden hour). It is the same trick as the device: model once, reuse, never regenerate per scene. Kept out of the cast's hands and out of every character frame so it cannot fight consistency.
6. **Cinematic sequences** — chapter by chapter, portrait master first, checked against 1–5. Image-to-video from an approved key frame per beat, extracted to frames at 12fps.

## Models

Checked against the Higgsfield catalogue at run time with `models_explore recommend` before each step; not assumed. Character sheets and key frames on the current best image model with reference-image support (identity lock on the sheets). Video on the current best image-to-video model that accepts a start frame and a reference. The exact IDs go in the asset ledger with each generation.

## Per-scene spec template (written before every generation)

```
scene · objective · camera · subject and action · environment · light and colour ·
composition with text-safe space · motion needed for scroll continuity · negative prompt
```

Composition: leave the top band (portrait) or the left third (landscape) empty for copy. Bake in no text, no logos, no prices, no buttons, no pseudo-text, no watermarks. Every word is HTML.

## The negative prompt (every generation)

> no humans smoking, no children, no baby animals, no oversized kawaii eyes, no pastel or nursery palette, no plush-toy proportions, no medical or pharmacy imagery, no cannabis leaf clip-art, no visible text, no logos, no price tags, no photorealistic real people, no serene wildlife-documentary framing, no human hands anywhere in frame, no dark oil, no brown oil, no amber oil, no murky oil, no opaque oil, no hot pink, no yellow-to-pink gradient, no camera roll, no smooth camera moves.

Two tensions to manage deliberately: the leaf in the fedora band and the leaf emblem on the monkey's shirt are locked costume elements, so they are described as *"a small leaf tucked in the hat band"* and *"a small leaf emblem on the chest"* in the positive prompt while the negative bans clip-art leaves; and the frosty plant asset in step 5 is the one generation where a cannabis plant is the subject, so its prompt is written as a botanical subject and the leaf clip-art negative is kept.

## Scene specs, first pass (portrait master)

| Scene | Objective | Camera | Subject and action | Environment | Light | Text-safe | Motion for continuity |
|---|---|---|---|---|---|---|---|
| 1 Cough | Plant the hand; first light is the oil | Back row, 20mm, static, right-hand drive | Driver's hat + sunglasses in mirror (right seat); rhino ranger turned round staring (left seat); viewer's natural device bottom-right glowing; a pull with LED | Camp gate, dark bush | Pre-dawn steel blue, one gold source | Top 30% | Three shudders, no travel |
| 2 Bad start | He should not be driving | Locked to truck | Gate post clipped, signboard spins, two switchbacks, one arm out of the window, knee on the wheel | Dawn trail, ranger board, acacias, edge of a grow row | Gold horizon, long shadows | Top 30% | Continuous travel, two leans |
| 3 First hit | Dust swallows the frame; monkey vaults in | Locked | Riverbed washboard, jerry can bounces out, dust burst, monkey lands and grips roll bar | Riverbed, bleached banks | Hard morning, cobalt | Top 30% | Buzz, dust, landing |
| 4a Ranger | Product in hand, no reaction | Locked | Termite mound clip; the rhino ranger pulls on black 1ml without breaking eye contact; LED under the horn | Open bush | Late morning | Top 30% | Jolt |
| 4b Clinger | Feet off the floor | Locked | Acacia branches whip the lens, dapple strobes; monkey hangs, natural device glowing | Under acacias | Noon, bleached, dapple | Top 30% | Brush |
| 4c Driver | Has not looked at the road | Locked | Mud over lens, wipes clear; driver one-handed pull under fedora; viewer's second pull in awning shade | Mud crossing | Afternoon | Top 30% | Mud |
| 5 Airborne | Biggest hit, best light | Locked | Corrugations, the rise, the hang, landing | Open plain, sun behind truck | Golden hour, brand palette | Top 30%, empty in the hang | Rise, hang, landing |
| 6 Reveal | It is a paw | Locked, then still | Rim light on the hand, fur, five fingers; rhino unchanged; monkey turns; mirror tilts, sunglasses full of sun | Same plain, dust settling | Golden hour into dusk | Top 30% for the question | None. Hold. |
| 7 Camp | Name everything, calmly | Static wide | Four chairs, three seated, one empty with the device; packs on the table; the grow behind, backlit by fire | Camp beside the facility | Dusk, firelight | Full page, HTML | Static |
| 8 Afterglow | One will not get out | Static | Parked truck, monkey in the back, LED on | Night, stars | One LED | Top band | Static |

## Asset ledger

Kept at `docs/asset-ledger.csv` from the first generation onward, one row per asset:

`scene · filename · format · ratio · display location · load priority · fallback · model · exact prompt used · negative prompt · status`

No generation without a row. No row without a spec.

## Reference inputs available now

Found on Drive this session (not yet uploaded to Higgsfield; the upload is the first action after sheet approval):

- Pack renders: `ecostar-1ml-disp/bananashack.png`, `ecostar-0.5ml/permmarker.png`, `ecostar-1ml-disp/sour-diesel.png` (character and costume reference). Also reviewed for the third chair: GMO, The Church, Cheese, Grape Garcia, Nerdz, Monkey Business, Sapphire OG.
- Logo: `Safari Smoke Logo.jpeg` (the acacia-and-sun lockup for the truck door).
- Device and oil references: supplied by Jon in chat on 13 Sep (black front; natural front, 3/4, side, back; oil cartridge). They need to be dropped into the Drive project folder so they can be uploaded to Higgsfield as reference images for the prop and the window; chat images cannot be pulled into the generator directly.
