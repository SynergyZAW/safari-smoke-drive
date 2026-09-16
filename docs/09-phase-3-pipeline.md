# Phase 3: the 3D pipeline

> Started 15 Sep after Jon's call: film the whole drive once, split it by markers, and move to the feature-animation look. Consistency becomes structural instead of prompted.

## Why

The phase-2 film was eight generations between hand-made stills. Every start frame was a fresh reading of the cast, so the rhino's scale and the driver's identity drifted between beats. Prompts nudge; meshes don't move.

## The chain

1. **Characters as meshes.** The three approved turnaround sheets are cut into front, side and back views and lifted to textured PBR meshes (Tripo H3.1 multiview). One mesh per character, rigged once after approval. Viewer for approval: the "Safari Smoke Cast Models" artifact. Turntables in `docs/3d/`.
2. **Truck, device and set as meshes.** Same route for the Eco-Star (from the geometry sheet) and the truck (from the four vehicle views), plus low-detail set dressing (acacias, mound, gate, rocks).
3. **One scene, one camera.** Camera bolted in the back row, right-hand drive, hand plant bottom-right. The road is a spline with the bumps keyframed where the impact library puts them. Rendered locally with three.js in headless Chromium (no dependency on a hosted scene builder, which only takes catalogue assets), portrait and landscape from the same take.
4. **One timeline, markers not clips.** The whole drive renders as a single frame sequence. Chapters, copy and sightings are marker positions on it. The site scrubs time, not beats.
5. **Restyle pass.** The clean render goes through a video-to-video restyle for the soft feature-animation finish (skin, fur, cloth, light). Identity and position are fixed by the render, so the restyle only changes surface.

## Status 16 Sep: Jon's route, and it works

Jon's call after seeing the 3D tests: skip the seat physics, hand the model the three approved characters and ask for one long continuous drive. Done on Seedance 2.5 (omni reference, 25 s, 1080p, 9:16): opening frame = the FLUX-restyled first frame of the 3D test (so the look and the first-person framing are fixed), identity references = one sheet per approved character rendered from the approved meshes at three angles. Take A holds the cast for the full 25 seconds and hits every beat asked for on cue. Ledger rows `gen-longtake-*`. A 15 s Seedance 2.0 take from the same inputs is steadier but the driver turns to face the camera.

What this changes: the 3D scene is no longer the film. It is the reference factory: it renders the approved meshes into consistent sheets and clean opening frames, and it can still produce exact key frames when a beat needs precise blocking. The film is generated as long continuous takes from those references, split by markers on the site.

## Status 15 Sep, afternoon

- Cast approved by Jon as meshes (Tripo). Rigging those meshes failed on the only rigger available, so Meshy rebuilt rigged copies from the same views; they carry a seated idle. Used for animation.
- Generated truck rejected (two-ended). The film truck is procedural, real scale, right-hand drive, in `scripts/3d/drive.html`: chassis, bonnet with spare and jerry can, roll cage, torn awning, three rows of seats, dashboard, mirror, wheels. The Eco-Star is modelled to 89 × 22.1 × 16.6 mm and sits in a draw-grip hand parented to the camera.
- Road: 6 km of track with scripted bumps (base rumble, riverbed washboard 3 to 6 s, launch and landing at 7 s, mound clip at 9.8 s). Camera in the back-right seat, 84° vertical, portrait.
- Ten-second clean render done and restyled with FLUX 3 Video Edit: camera, cast and positions held frame for frame; light, canvas, skin and cloth upgraded. This is the proof the pipeline works. Seedance video-edit run for comparison.
- Wording rule from Jon: no product category is ever named in a prompt. The device is a mesh; the restyle prompt describes the look only.

## Status 15 Sep, morning

- Step 1 done for the three leads, awaiting Jon's approval. Rhino also run on Meshy for comparison; Tripo kept.
- Steps 2 to 5: next, starting with a ten-second back-seat test render with the rhino in a placeholder truck, then the restyle on that.

## Decisions to make

- Rigging: auto-rig (humanoid) for the ape and monkey; the rhino may need a manual seated pose.
- Restyle model and strength: test on the ten-second clip before committing the full drive.
