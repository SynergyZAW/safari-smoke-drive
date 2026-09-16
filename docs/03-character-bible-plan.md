# 03 — Character bible plan

> **Status 13 Sep, after Jon's "go".** First-pass sheets generated and reviewed against the checklist below. Images in `docs/sheets/`, every prompt and job in `docs/asset-ledger.csv`.
>
> | Sheet | Verdict | Note |
> |---|---|---|
> | Banana Shack turnaround v1 | Superseded | Five heads, costume verbatim, sunglasses, deadpan, five-fingered hands, bold linework. First pass. |
> | Permanent Marker turnaround v2 | Superseded | v1 drifted to a smooth render with clip-art leaves and was rejected. v2 used the ape sheet as a style anchor: same line weight, heavy-lidded deadpan, tiny abstract sprig emblems. |
> | Sour Diesel turnaround v1 | Superseded | Flat comic pass. Its 3D lifts grew a second face on the back of the head and were rejected on 16 Sep. |
> | Sour Diesel turnaround v2b (3D look) | **Approved by Jon, 16 Sep** | Redrawn from the pack mascot only, feature-animation render, heavy and low, clean back view (hat, ears, shirt). `docs/sheets/sheet-03-sour-diesel-turnaround-v2b-3d.jpg`. This is the rhino's identity reference for every generation from here. |
> | Banana Shack turnaround v2 (3D look) | Candidate, awaiting Jon (16 Sep) | Redrawn in the rhino v2b render: heavy low-shouldered ape, fedora with leaf, round sunglasses, pineapple shirt, denim shorts, belt, sandals; clean back view. `docs/sheets/sheet-01-banana-shack-turnaround-v2-3d.jpg` |
> | Permanent Marker turnaround v2 (3D look) | Candidate, awaiting Jon (16 Sep) | Same render: lanky monkey, red quarter-zip with small leaf, red shorts, black cap with leaf, tail, bare feet; clean back view. `docs/sheets/sheet-02-permanent-marker-turnaround-v2-3d.jpg` |
> | Eco-Star prop v1 (3D look) | Candidate, awaiting Jon (16 Sep) | Cream and black units, front/3-4/side/back plus a draw-grip hand hero, drawn from the v4 geometry sheet in the rhino v2b render; window glows gold, vents, LED, USB-C, base cap. Described to the generator as a herbal nicotine vape. `docs/sheets/sheet-04-ecostar-prop-v1-3d.jpg` |
> | Eco-Star prop v4 | **Approved candidate, geometry lock** | v1 came out as a squat pod. A scale-accurate outline template fixed the 4:1 body (v2), and a fresh pass on the reference-editing model fixed the side-view width, the single window and the rectangular aperture (v4). The v2 sheet is kept as the reference for how the oil glows. |
> | Viewer hand v2 | **Approved candidate** | Draw grip, whole device visible, ambiguous and revealed states, gold rim on the fur, LED lit. |
> | Expression sheets ×3, v1 | **Approved candidates** | Identity holds against each turnaround. Ape: deadpan through everything, brows up once. Monkey: whoop, cling, pull, turn, asleep. Rhino: six identical stares through dust, mud, golden hour and firelight, LED under the horn. |
>
> Still to generate in this step: hands sheets (cling, pocket, wheel), the seated-in-truck pose, and the six wild plates. Then the vehicle. **Jon: sign off the cast here before the vehicle is generated.**

This is the gate before any cinematic asset. Nothing in chapters 1–8 is generated until the three sheets below are approved and locked.

## Why rebuild

The pack mascots are painted 2D cut-outs. Across the three packs the head-to-body ratio runs from roughly 4.5 to 7 heads, the faces are semi-naturalistic with small eyes and real hide wrinkles, and there is one three-quarter view each with soft hands. They cannot share a frame, cannot act, and cannot hold a device convincingly. The costume, colour, species and attitude are the brand and stay. The form is rebuilt.

## The one proportion rule

**Five heads. Every character. No exceptions.**

- Head is 1/5 of standing height. Eye line at 55% of head height. Eyes are large enough to act (each eye about 1/5 of head width) and no larger: readable, not kawaii.
- Brows are built as fur ridges so they can move. Mouth corners are drawn, not implied.
- Hands are one head-length long, five-fingered with an opposable thumb, drawn explicitly. They must be able to hold the Eco-Star in the **draw grip**: two fingers and thumb around the body, mouthpiece to the lips, **no thumb press ever**. Inhale activated. There is no button.
- Species is carried by silhouette, not by head ratio: the ape is wide and low-shouldered, the monkey is long-limbed with a tail, the raccoon is compact and round. Same head unit across all three so they read as one cast in one truck.
- Heavy black linework as rim and contact shadow. Matte fur. Costume colours are flat brand primaries.

## Style preset

Higgsfield `character-sheet` workflow, **3d-stylized** preset as the base, with a custom render module: *stylized 3D character render, matte fur with visible groom, flat hard-primary costume colours, black rim light as linework, no subsurface glow, no plush-toy softness, adult proportions, five heads tall.* The default preset's "soft rounded features" line is struck; these are adults with attitude, not toys.

## The three sheets

Each sheet: **turnaround** (front, 3/4, profile, back), **expression sheet** (six), **hands sheet** (the draw grip, the cling grip, the pocket, the wheel), and **the seated pose** in a truck bench. 16:9 for the turnaround and expressions, 3:2 for hands.

### A. Banana Shack — the ape, the driver
- **Locked.** Orange pineapple-print Hawaiian shirt, orange fedora with a leaf tucked in the band, denim shorts, sandals, hands in pockets, dead-eyed stare. Sunglasses for the film (the brief's casting note).
- **Rebuild.** Wide, low, heavy shoulders, long arms. The stare is the performance: eyelids at half, mouth a flat line. Sunglasses on from 4am. One arm out of the window is his resting pose; the wheel is steered with a knee.
- **Expressions.** Deadpan (default) · deadpan with a pull · deadpan exhale · deadpan at the rise · the mirror look (the one time his brows move) · deadpan at camp.
- **Device.** Black 1ml. Gloss mouthpiece against matte body reads against the matte shirt.

### B. Permanent Marker — the monkey, the clinger
- **Locked.** Red long-sleeve with a small leaf emblem, army cap, caught mid-leap, arms out, tail whipping.
- **Rebuild.** Long limbs, prehensile tail drawn as a fifth limb, five heads tall like the others. Built for the vault (chapter 3) and the cling (chapters 4–8): feet never touch the floor.
- **Expressions.** Mildly interested (default) · the whoop (mid-leap) · the cling · the pull · the turn (reveal) · asleep in the back row (afterglow, refuses to get out).
- **Device.** Natural 0.5ml. Cream against red long-sleeve and dark fur.

### C. Sour Diesel — the rhino, the ranger (provisional: Jon to confirm, see 08)
- **Locked.** The ranger's kit from the pack: khaki bush shirt with epaulettes and chest pockets, khaki shorts, wide-brim ranger hat, boots. A rhino. The one animal in the truck dressed for the job, riding shotgun while an ape drives.
- **Rebuild.** Heavy, wide, low; the horn is the silhouette. Small eyes built as two pale points that read at any size under the hat brim. Three-toed hands (rhino) drawn honestly, which is exactly why he is ruled out at the reveal. The performance is a non-performance: he never breaks eye contact with the camera, from the gate to camp.
- **Expressions.** The stare (default) · the stare with a pull · the stare through dust · the stare through mud · the stare at the reveal (identical, which is the joke) · the stare at camp.
- **Device.** Black 1ml (Sour Diesel ships on the 1ml Eco-Star). The LED on the draw lights the underside of the horn at dusk.
- **Why the rhino, in one line.** A rhino ranger is the game-drive joke, it is South African, the horn is a silhouette no other seat has, and it is on a SOIL2OIL pack. Alternate if Jon prefers: the GMO panda in the orange monk's robe (five-fingered, so it would keep the reveal ambiguous three ways).

## The wild — six secondary characters, lighter sheets

The Church (sheep, monk's robe) · GMO (panda, orange robe) · Monkey Business (baboon, grey suit) · Sapphire OG (leopard, blue bucket hat and chain) · Grape Garcia (warthog, tie-dye shirt) · Nerdz (lemur, rainbow tracksuit and glasses). Costumes verbatim from the SOIL2OIL packs. Same five-head rule so they share the world, but each needs only **one locked pose in one plate**: they are seen for a second and a half, mid-distance, half-hidden. One 3/4 pose, one expression (deadpan, all of them), generated once against the lighting key of the chapter they appear in. No turnaround, no expression sheet. If a sheet of theirs is ever needed for a second film, it is made then.

Note on palette: Nerdz's tracksuit and Grape Garcia's tie-dye are the two costumes that carry colours outside the six. They are locked costume, so they stay, but they appear small and far, at dusk and in mud respectively, so they never dominate a frame.

**The tourists** are the one human element: four to six stylised adults in khaki in a rival game viewer, long lenses, hats. Same five-head rule, adult, deadpan, never photoreal, never smoking, never holding product. One plate.

## The viewer's hand — a fourth character, deliberately underspecified

A dark-furred, five-fingered hand. It must be drawable as the ape's hand or the monkey's hand: dark fur, dark palm, five fingers, no distinguishing marks (no ape knuckle calluses, no monkey finger length). Two states: **ambiguous** (chapters 1–5: shadow, blur, backlight, glow-lit from below) and **revealed** (chapter 6: raking gold rim, visible fur on the top edge). One sheet, hands only, both states, holding the natural 0.5ml in the draw grip.

## The Eco-Star — locked prop, modelled once

Modelled once from the reference photographs, locked, reused in every hand. Never regenerated per scene.

- 89 × 22.1 × 16.6 mm. 4.03:1 height to width. Cross-section about 4:3, a gently flattened rounded rectangle. Mild flattening. Soft-edged silhouette.
- Integrated angled mouthpiece, one piece with the body, shallow scooped duckbill. On black: gloss mouthpiece against matte body.
- Face, top to bottom: a **circular recessed dish** about a third down with a **rectangular window aperture** inside it, through which the chrome cartridge and the oil are visible (the oil glows in the aperture; the dish catches the rim light) · small oval LED below it · "Powered by CCELL" small and vertical, low on the black unit, never legible as copy.
- Shoulders: **two arched vent cutouts**, one each side, just below the mouthpiece seam. These are the dual air vents and they are the second most recognisable silhouette feature after the window. A horizontal seam separates the mouthpiece from the body.
- Back: USB-C port mid-body. Base: a separate cap section, the removable battery, fine-grained texture on the natural unit.
- Reference photographs received from Jon in chat on 13 Sep: black front view, natural front, 3/4, side and back views, and the oil in a clear cartridge. These are the prop references. (The four-device "Powered by CCELL" family image shows a different CCELL body with a rectangular window and is not the Eco-Star; not used.)
- **Black = 1ml.** Matte black, gloss black mouthpiece, white lettering. **Natural = 0.5ml.** Speckled cream/bone bio-composite with dark flecks that have depth and irregularity, warm-grey base band about the bottom 15%, matte textured, small green mark near the base.
- Same size, both. The colourway is the format.
- Three specular behaviours in one object: matte body, gloss mouthpiece, chrome inner cartridge. That contrast is what makes it feel real in hand.

**The oil.** Bright, clean, translucent golden yellow. Cold-pressed oil or a pale lager held to the light. High transparency, high luminosity, faint green cast in the highlights. Refractive: transmission, caustics, a bright rim where glass meets oil, a real glow with anything behind it. Large slow air bubbles as the evidence of viscosity; where the window is on screen long enough, they move, slowly. Backlit at golden hour the window is a lamp. **Never** dark, brown, amber-black, murky, muddy, opaque, red-shifted or syrupy. Every generation with the device in frame is checked against this before it is accepted. The reference photograph has been supplied (a clear cartridge, bright gold, two large slow bubbles, small dark bubble shadows on the far wall). Match it.

## Sheet acceptance checklist

- Five heads, measured.
- Same head unit across the three.
- Eyes act. Brows act. Mouth corners exist.
- Five fingers, thumb, the draw grip works, no button press.
- Costume verbatim from the pack. Colours from the palette.
- Species silhouette distinct at thumbnail size.
- Adult. Not cute. Not plush. Not a baby animal.
- Original characters. Not a recognisable existing IP.
- Nothing pink. No distillate colours anywhere.
