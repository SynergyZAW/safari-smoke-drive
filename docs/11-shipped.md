# What shipped (store integration, phase 1 groundwork)

## 8 Oct 2026
- Production (`main`, PR #3): dose copy restored at 20 mg per gummy, 10 per bag; Buy buttons read "Coming soon" everywhere and take no payment; store page at `/#/store` with Vapes and Gummies tabs and search; homepage links to it.
- Production (PR #4): the store's vape list now carries all 20 active Eco-Star strains and their ecosystem SKUs, keyed on SKU, with only the sizes that exist per strain (no picker where there is one size). Gummies carry no SKU and no price until the ecosystem issues the six new Safari Snaxx SKUs. Nothing here decides what is on sale: the channel toggle does, once the API is wired.
- Still to come: wiring `fetchCatalogue()` to `GET {API}/api/channel/safari-smoke/products` once `docs/channel-stores/SAFARI_SMOKE_API.md` is merged (ecosystem PR #383), live prices and stock, the distributor form, and strain artwork for the 17 strains beyond the three rangers (the official strain mascots live in Drive, 2026/Vapes).
- PR #5: dose wording is "20 mg full spectrum" everywhere (cards, store page, film beats). A whole-word search for "THC" across source, docs, the built site and the live bundle found none; the only hits are the letters "thC" inside minified JavaScript identifiers, which are not text. The six Safari Snaxx gummy SKUs (SSG-CHRY-50G, SSG-PKLD-50G, SSG-WTML-50G, SSG-TGRN-50G, SSG-BLBY-50G, SSG-VTPC-50G) are wired the same way as the vapes, keyed on SKU. Prices are not hardcoded; they come from the API when it is live. Buy stays "Coming soon".

## 8 Oct, PR #6 (live)

- Film: ranger keyframe K6 corrected on both orientations (third rhino arm and oversized monkey hand removed); segments 5 and 6 reshot from the corrected still, frames 0–240 untouched.
- Store: 19 official strain mascots from Jon's box art as 3:4 cards (`public/img/card-<strain>.webp`), wired through `STRAIN_ART`; store grid prefers the official mascot, the three film rangers stay the homepage trio. G-Rolls, Sticky Glue and VB Fire still use the generic Eco-Star card until art arrives.
- Brand: Safari Smoke logo in the header and as favicon.
- No change to the catalogue contract: still keyed on SKU, prices and stock still come from the API once `SAFARI_SMOKE_API.md` lands.

## 10 Oct, PR #7 (live)

- Store: official mascots for G-Rolls and VB Fire added from Jon's dielines; only Sticky Glue still uses the generic Eco-Star card (no asset yet, on hold).
- Assets outside the site: 21 3D mascot renders and two Eco-Star device masters (cream 0.5 ml, black 1 ml, amber oil) delivered to Jon's studio; reference copies in `refs/mascots` and `refs/out`.

## 10 Oct, PR #8 (live)

- Store and homepage: every vape card now shows the 3D mascot composited onto one of three warm savanna plates (rotating A/B/C); Sticky Glue shows the cream Eco-Star on the same plate. Box-art crops kept in `public/img/boxart/` as fallback, not referenced.
- Homepage store section copy: "The trading post / Everything on the counter." (the last trace of the rejected watering-hole concept).
- Catalogue contract unchanged (keyed on SKU; prices and stock from the API when it lands).
