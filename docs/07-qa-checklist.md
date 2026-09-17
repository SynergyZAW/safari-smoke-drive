# 07 — QA checklist

`[x]` verified this session on the pre-viz build. `[ ]` to run on the film build or on a device I do not have here.

## Desktop
- [x] 1440 and 1024: no horizontal overflow, copy in the left third, hand bottom-right, CTA reachable
- [x] Keyboard: Tab reaches the gate buttons, the skip link, the CTA pill, the camp CTA, the placeholder form
- [ ] Safari macOS, Firefox, Edge

## Tablet
- [x] 768 portrait and 1024 landscape screenshots
- [ ] iPad Safari touch scrub

## Mobile
- [x] 320 and 375: no overflow, copy legible, CTA pill inside the safe area, cards snap
- [x] `100dvh` stage, viewport-fit cover
- [ ] iOS Safari real device: sticky pinning, rubber-band at the ends, address-bar collapse
- [ ] Android Chrome real device

## Film continuity
- [x] All chapter key frames tiled in one row before any clip is shot: rhino front-left at one scale, ape driver front-right in the orange fedora, monkey where the beat puts him, in every frame (caught late on 13 Sep: three frames disagreed and the video model morphed a bump into a character swap; re-edited and reshot)
- [ ] Every final clip stripped at one frame per second and checked for a seat change, a scale change or a missing character before it goes to the extractor

## Motion
- [x] Only the stage transforms; the page never moves
- [x] Caps enforced in code (±14px, ±18px, ±2.5°, scaleY ≥0.95); rumble scales with velocity and stops with the thumb
- [x] Reveal hold: shake zeroed from p 0.90
- [x] `prefers-reduced-motion`: stills story, all copy, CTA intact; `reduced_motion_used` fired
- [ ] Film frames: no continuous roll, no autoplay, no audio

## Performance
- [x] JS 373KB / 126KB gzip (React + GSAP); CSS 25KB; fonts 33KB total; hero preloads only the display font
- [x] Film: chapter 1 frames warmed on load, rest lazy per beat, poster per beat, stills story uses the posters. Final clips: 480 frames / ~23MB at 648×1152 q58, 8fps, ~3MB per beat lazy; landscape set 1152×648 ~24MB served only to wide viewports. Above the 13MB target; per-beat lazy loading keeps the first paint to chapter 1 (~2MB). Revisit with AVIF if the real-device numbers ask for it
- [ ] Lighthouse mobile on the deployed build

## Accessibility
- [x] Gate is `role=dialog aria-modal`, labelled, focus-trapped, keyboard-complete
- [x] Every control has a label; the film SVG is `aria-hidden`; copy lines are real text and toggle `aria-hidden` with visibility
- [x] Skip link to camp
- [x] Focus ring visible (gold, 3px)
- [ ] Screen-reader pass (VoiceOver iOS, NVDA)
- [ ] Colour contrast audit on gold-on-ink small text (currently used only for labels ≥14px)

## Compliance
- [x] 21+ gate (per the pack, confirmed by Jon 13 Sep), real barrier, remembered per device
- [x] No medical or therapeutic claims anywhere. The old rosin brief on Drive carries effects and medical language; none of it is used
- [x] No THC percentages. No prices anywhere
- [x] No distillate livery. No distillate mascot in the cast
- [x] B2B specs ("available for customization", the compatibility list) absent
- [x] No invented proof: the proof board is empty slots
- [x] 21+ everywhere: gate, footer, meta description, noscript

## Conversion path
- [x] CTA visible from chapter 2, sticky, mobile-safe, keyboard-reachable; second CTA at camp
- [x] `cta_click` fires with location; `form_start` / `form_submit` fire on the placeholder
- [ ] Real stockist route
- [ ] Real analytics vendor

## Analytics events wired (stubs)
`page_view` · `age_gate_passed` · `age_gate_failed` · `hero_viewed` · `story_50_percent` · `sighting_viewed {strain}` ×3 · `cta_click {location}` · `form_start` · `form_submit` · `video_fallback_activated` · `reduced_motion_used`. Inspect at runtime via `window.__ss_events`.


## Previs camera rule (16 Sep)

Check the seat map only from cameras behind the truck or from the bonnet looking back. Side and front three-quarter views mirror the truck's left and right and the generator flips the cast in them; three rounds went wrong that way. Seat map: ape front right at the wheel, rhino front left beside him, monkey middle left behind the rhino, viewer back right.


## Depth order from the back row (16 Sep)

Every back-row frame must layer, nearest to farthest: middle bench top, monkey, front headrests, ape and rhino rising above them, THEN the dashboard mostly hidden behind them, THEN windscreen, bonnet, track. If any dashboard or steering wheel is visible in front of or beside a front-row character, the frame is wrong. The flat POV plate vehicle-04 had this error and is no longer a layout reference.


## Device glow (revised 17 Sep, Jon approved)

The oil window glows warm gold at rest. At the top of every raise the window flares bright white for about a second: that is the LED coming on for the draw, and it is canon for the gag (the light comes on, then the hit). It happens in every take from take 2 on. Take 1's single raise has no flare and reads as a raise that never got far enough. Do not spend generations trying to suppress it; three shoots with three wordings all produced it.

## Take chaining (16 Sep)

The platform caps a single generation at 30 s (Seedance 2.5, Wan 3.0). The film is chained. Prefer Seedance 2.5 video_extension forward from the approved take, which continues the actual footage, over starting a new take from a still frame.
