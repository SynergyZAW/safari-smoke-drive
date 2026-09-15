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

## Status 15 Sep

- Step 1 done for the three leads, awaiting Jon's approval. Rhino also run on Meshy for comparison; Tripo kept.
- Steps 2 to 5: next, starting with a ten-second back-seat test render with the rhino in a placeholder truck, then the restyle on that.

## Decisions to make

- Rigging: auto-rig (humanoid) for the ape and monkey; the rhino may need a manual seated pose.
- Restyle model and strength: test on the ten-second clip before committing the full drive.
