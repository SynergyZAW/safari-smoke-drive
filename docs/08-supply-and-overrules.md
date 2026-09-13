# 08 — SUPPLY blanks and overrules

## SUPPLY — answered 13 Sep

| # | Item | Answer |
|---|---|---|
| 1 | Third hero strain | Apples & Bananas is out (distillate only). **Provisional pick: Sour Diesel, the rhino ranger.** Alternate: GMO, the panda monk. Jon to confirm. |
| 2 | Device photographs | Supplied in chat. Please also copy to Drive for the Higgsfield upload. |
| 3 | Oil photograph | Supplied in chat. Same request. |
| 5 | Badaboom licence | Confirmed purchased. Closed. |
| 6 | 18+ or 21+ | **21+.** Gate, footer, meta and copy updated. |
| 8 | Vehicle | Still my call: a generic open-sided tiered game viewer, right-hand drive. |
| 9 | Vercel project | Registered in `jarvis.projects` as `safari-smoke-drive`, then created in Vercel from the `SynergyZAW/safari-smoke-drive` repo. IDs in the registry row. |
| 10 | Analytics vendor, stockist route | Still stubs. |

## SUPPLY — still open

1. **"Proof photographs", explained.** The brief's chapter 5 reads: *"Chapter 5 is proof: the real facility, the real growers, the real rosin press, the flag seal."* I read that as real photographs of the real place, the people who grow it and the press that makes the rosin, shown to prove the product is what it says it is, and I built four empty slots for them on the camp noticeboard. If those photographs do not exist, or "proof" meant something else, say so and the slots go, leaving only the flag seal next to the range.
2. **Third chair.** Rhino or panda, or something else from the SOIL2OIL packs. The sheets are not generated until this is settled.
3. **Drive copies** of the device and oil photographs.
4. **Drive folders.** Confirm the four folders under this morning's project folder are the approved set.
5. **Analytics vendor and the real stockist route**, when they exist.

## OVERRULES — where I departed from the brief, and why

1. **Proof moved from chapter 5 to camp.** The brief puts "the real facility, the real growers, the real rosin press, the flag seal" at chapter 5, but the arc it also gives runs "airborne at golden hour → the reveal → camp", and it locks the camera inside the vehicle. Real photographs cut into a first-person mascot drive break the POV and the tone, and they would land between the biggest hit and the reveal. They pin up at camp as real prints on the noticeboard, beside the range, in plain type, which also obeys the "if it is comic, it is an object" rule. Chapter 5 is airborne, chapter 6 is the reveal.
2. **The viewer is unresolved, by design.** The brief left this to me. Reasoning in 01: the ape's and the monkey's hands are dark and five-fingered, so an honest shot is ambiguous between them and you; the rhino is honestly ruled out; the question stays a question; the empty fourth chair at camp turns "which one are you?" into "pick a strain".
3. **Confirmation by eyeline and mirror, not wing mirror alone.** A wing mirror needs a resolved face. The rear-view mirror tilts and the driver's sunglasses find you, full of sun. The raccoon's unchanged stare and the monkey's turn do the confirming.
4. **"Get in." moved to the age gate.** In the film you are already in the truck from the first frame, so the line does not fit chapter 1. It is exactly right as the yes button. Chapter 1 closes on `Hold on.` instead.
5. **"Same couch. Same night. Same nothing." kept, over pre-dawn black.** It is the thing you are leaving, said before the engine catches. It survives.
6. **No halftone overlays, no speech-balloon UI at all.** The brief offered halftone as one direction to weigh; I have rejected it as an interface layer entirely and kept it only as physical texture (dapple, dust) and on the packs themselves.
7. **Mud on the lens, once.** Obscuring the frame twice would fight "nothing critical hidden behind animation". One crossing, five percent of the track, wipes clear.
8. **Image sequences on canvas, not video scrubbing.** Scrubbing `currentTime` on iOS Safari is unreliable. Frame sequences per chapter, lazy-loaded, are the robust route and they make the stills fallback free.
9. **CSS sticky for the pin, ScrollTrigger for progress.** GSAP's pin-spacer is the usual source of iOS jank; sticky is not. ScrollTrigger still owns progress, refresh and the velocity read. Lenis is not used: it fights native iOS scrolling and reduced motion, and the brief only wanted it if it measurably helped.
10. **The driver's hands.** The pack has hands in pockets. A driver with hands in pockets is a driver steering with a knee, with one arm out of the window. That is not a change to the character, it is the joke the character was already telling.
11. **The ranger's eyes are on you from frame one.** The brief has "one never breaks eye contact". Making it the rhino, and making it start at the gate, turns the reveal's confirmation into a joke that was running the whole film.
12. **Frosty plants: yes, as a locked set-dressing asset, in three places.** Your optional note. Modelled once, like the device, and kept out of the cast's frames so it cannot introduce drift. Two of the three appearances are at the edges of the drive; the third is the grow behind camp, which is also the "soil" in SOIL2OIL. Private-use cultivation is legal in South Africa; a plant in the background makes no claim. If generation quality is poor it comes out without touching anything else.
13. **The age gate remembers "no" for the session only.** "Remembered per device" for a yes is 30 days. A permanent no would lock out someone who mis-tapped on a shared phone. Say if you want it stricter.
14. **Copy compliance line in the footer.** Added "Not for medical use", echoing the pack. Not in the brief; consistent with it.
15. **Right-hand drive.** Not in the brief, corrected by Jon: the driver sits on the right in South Africa. The animatic, the scene list and the generation specs now put the driver in the right front seat with his arm out of the right-hand window, and the ranger on the left.
16. **The third chair is not the raccoon.** Apples & Bananas is distillate only, so the character has no product at camp. Replaced by a SOIL2OIL mascot; the rhino ranger is my pick, pending Jon.
17. **The wild.** Jon's idea, 13 Sep: the rest of the range as wildlife, glimpsed. Adopted in full, six sightings placed against the hits that already exist so they cost no new beats, and paid off at camp with a sightings board that names the whole range calmly.
18. **Humans, once.** Jon floated humans in the wild looking for the animals. Adopted as a single inversion gag rather than the mechanic: one truck of tourists with every lens on you, at the mud. The brand world stays animal; the humans are the wildlife for one beat.
