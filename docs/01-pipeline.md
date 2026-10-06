# Asset pipeline (Higgsfield API only)

Credentials: `HF_KEY="KEY_ID:KEY_SECRET"` in the environment, never in the repo. Client: `scripts/hf.py`.
Endpoint pattern: `POST https://api.higgsfield.ai/<model-id>` with `Authorization: Key $HF_KEY`, then poll `status_url` until `completed`. Reference media is passed as public URLs; local files go through `hf.py upload` (presigned PUT, returns a public URL).

## Model map (verified 6 Oct 2026 from the model docs)

| Job | Model id | Reference input |
|---|---|---|
| Mascot sheets, riverbed masters, props (reference-guided) | `alibaba/qwen-image-3/edit` | `image_urls` (list, required) |
| Alternative reference-guided stills | `xai/grok-imagine-image-2.0` | `image_urls` (list, optional) |
| Single-reference stills | `ideogram/v4.0` | `image_url` + `image_weight` |
| Clean text-to-image | `alibaba/qwen-image-3/text-to-image`, `higgsfield-ai/soul/v2/standard`, `recraft/v4.1/text-to-image`, `z-image/turbo` | none |
| Short loops with cast references | `bytedance/seedance-2.5/reference-to-video` | `image_urls`, `video_urls`, `audio_urls` |
| Scrub-ready motion from a still (The Drop) | `bytedance/seedance-2.5/image-to-video` | `image_url`, optional `end_image_url` |
| Other reference-to-video | `minimax/h3/reference-to-video`, `alibaba/wan-3.0-prime/reference-to-video`, `xai/grok-imagine-video/v1.5/reference-to-video` | see docs |
| Other image-to-video | `kling-video/v3.0/std/image-to-video`, `minimax/h3/image-to-video`, `alibaba/wan-3.0-prime/image-to-video` | `image_url` |

Not on the API (404 on the docs host): Nano Banana, GPT Image, Seedream, FLUX. Do not plan around them.

## Order of work
1. Mascot cast sheet for the gummies trio (hare, tiger, gorilla) from the pack art, plus the vape mascots from the Drive pack art. Qwen edit, one sheet per character, approved one at a time.
2. Riverbed masters: one portrait (9:16, phone) and one landscape (16:9, desktop), each a tall or wide illustration with marked mascot stations. Approved before any character is placed.
3. Station stills: each mascot composited into its station with its product, both masters.
4. The Drop: one gummy, rendered once as a tumble (image-to-video from an approved still), scrubbed by scroll.
5. The pool (store) and the ranger notes.

Every reference image is shown to Jon before generation. Every output goes in `docs/asset-ledger.csv`.
