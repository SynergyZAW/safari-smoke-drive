# 04 — Impact library

One physics. Every hit in the film is one of these envelopes, so every hit feels like the same truck on the same road. Each entry is a **motion envelope** (already live in `src/lib/scene.ts`) plus a **visual asset** to be generated once and reused.

## Caps (the ride is violent, the page is not)

| Axis | Cap |
|---|---|
| Translate X | ±14px |
| Translate Y | ±18px |
| Rotate | ±2.5°, never continuous |
| Scale Y (compression) | ≥0.95 |
| Idle rumble | ≤2px, scales with scroll velocity, zero when the thumb stops |
| Reveal hold | all zero |

Only the stage contents transform. The page never moves. All motion is transform and opacity.

## The twelve

| # | Hit | Envelope | Visual asset | Used at |
|---|---|---|---|---|
| 1 | **Cough** | y 4px sin 3 cycles, decays; dashboard flicker | Warm flicker plate, dashboard glow | 0.02, 0.05, 0.085 |
| 2 | **Lurch** | x −12px half-sine, rot −0.8° | none (frame only) | 0.12 |
| 3 | **Jolt** | x ±14px sin 3 cycles, y 8px, rot 1.2°, decays | Signboard spinning past · termite mound crumble | 0.155 (gate post), 0.46 (termite mound) |
| 4 | **Lean** | rot 2.5° half-sine one way, x 8px | Cast slide (characters lean as a group) | 0.20 left, 0.245 right |
| 5 | **Washboard** | y 3.5px at 16 cycles, x 1.2px at 11, rot 0.35°, dust 0.35 | Corrugated sand ahead, jerry can bounce loop | 0.29, 0.70 |
| 6 | **Dust burst** | dust 0→1→0 half-sine, y 2px | Alpha dust plate, ochre, 1.5s | 0.34, and layered into landings |
| 7 | **Landing** | y 18px 1.5 cycles decaying, scaleY to 0.95, dust 0.7 | Dust plate + a two-frame contents squash | 0.395 (monkey), 0.80 (truck) |
| 8 | **Brush** | x 6px at 4 cycles, branches sweep R→L | Acacia branch foreground plate with dapple strobe | 0.53 |
| 9 | **Mud wall** | x 10px, y 6px, mud 0→1 in 20% then clears | Brown water over lens plate, wipe-clear | 0.62 |
| 10 | **Rise** | y 10px half-sine, scaleY to 0.97 | none (pre-compression) | 0.735 |
| 11 | **Hang** | airborne 0→1→0; horizon drops 10%, contents float −10px, rumble off | Awning lift, floating kit, backlit dust motes | 0.75–0.80 |
| 12 | **Awning tear** | continuous from 0.24, flap amplitude with velocity | Torn canvas flap, gold/wood halftone stripe visible | 0.24 onward |

Also continuous: **jerry can** rattles from 0.12, leaves the frame at 0.30–0.33; **acacias** approach and pass on both sides for the whole drive; **rumble** whenever the truck is moving and the thumb is moving.

## How the assets are made

Each visual asset is generated as a **short alpha plate or foreground element** with the same lens, the same light key for its chapter, and the same negative prompt as the film. They are composited over the frame sequence, not baked into it, so a hit can be tuned in code without a regeneration. This is also why the dust burst at 0.34 and the dust in the landing at 0.80 are the same asset in two colour keys.

## Reduced motion

Every hit collapses to its still. The stills story shows one key frame per chapter with all copy and the CTA. The stills are chosen at the calmest readable moment of each chapter, not mid-hit.
