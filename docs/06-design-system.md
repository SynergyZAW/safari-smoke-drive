# 06 — Design system

Deliberately small. The film is the design. The interface is a gold line, the copy and one button.

## Type

- **Badaboom Pro BB** — display only. Strain names, chapter copy, headings, buttons. All caps. Never below 18px. Never for paragraphs or form labels. Subset to Latin (10KB woff2), self-hosted, `font-display: swap`, fallback stack `Impact, "Arial Narrow", sans-serif`. Comic lettering treatment: 0.06em ink stroke with `paint-order: stroke fill` and a hard 0.08em drop, matching the pack balloons.
- **Atkinson Hyperlegible** — the one quiet sans. Body, UI, labels, footer, facts. Two weights, self-hosted (OFL). Chosen because the compliance copy and the device facts must be legible at 14–16px on a phone in sunlight, and because it has no personality to fight Badaboom.
- Scale: chapter copy `clamp(38px, 10.5vw, 84px)`; sighting beats `clamp(28px, 7.5vw, 58px)`; camp title `clamp(48px, 14vw, 120px)`; body 16px/1.6.

## Palette (the whole palette)

| Token | Hex | Use |
|---|---|---|
| gold | `#C99A2E` | CTA, progress line, strain names, sun |
| crimson | `#D8253F` | Accents, golden-hour sun, the monkey |
| cobalt | `#3A96E5` | Morning sky |
| flag green | `#007A4D` | Leaf emblem, roundel |
| ink | `#0B0B0B` | Ground, linework, backgrounds |
| paper | `#FFFDF7` | Type on ink |

Product materials (product truth, not palette): bone `#EDE4D0` and its base band `#8D8378` for the natural device; rosin `#F6C945` with a hot core `#FFF2A8` for the oil. No pink. No yellow-to-pink gradient. No distillate frame palette.

## Components

- **Age gate.** Full-screen, ink, logo, one question, two buttons. Focus trapped, Tab cycles, Escape does nothing. Yes remembered 30 days in localStorage; No remembered for the session.
- **Stage.** `position: sticky` full-viewport stage inside a 1000vh track. ScrollTrigger owns progress and refresh. A single transform wrapper shakes the contents. A 3px gold progress line on the top edge is the only chrome.
- **Copy layer.** HTML, absolutely positioned in the text-safe zone, opacity and 10px lift only.
- **CTA pill.** `Find a stockist`, gold on ink shadow, fixed at the bottom safe area from chapter 2 onward, `tabIndex` off when hidden, tracked by location.
- **Camp cards.** Horizontal snap on phones (78% width cards), 2-up on tablet, 4-up on desktop.
- **Proof board.** Four dashed slots. Real photographs only. Empty until supplied.

## Motion

Transforms and opacity only. Caps in 04. `prefers-reduced-motion` and Save-Data / 2G swap the film for the stills story with every line and the CTA intact. Nothing autoplays. No audio.

## Mobile first

Portrait is the master composition. The stage is `100dvh`. Safe areas respected on the gate, the CTA pill and the scroll hint. Cards snap. Copy zone is the top band. Hit targets ≥44px. Tested at 320, 375, 768, 1024, 1440 by `scripts/qa-screens.mjs`.
