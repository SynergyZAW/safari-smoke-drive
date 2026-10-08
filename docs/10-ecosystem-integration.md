# Safari Smoke site × Synergy Ecosystem store integration

Written for Edith (chief of staff) and the ecosystem builder session, 7 Oct 2026. Edith cannot read this session's chat, so everything she needs is in this file.

## Where the site lives (correction)

The site is **not** in `SynergyZAW/test`. That repository holds the retired Drive prototype (last commit 17 Sep). The live site is:

- Repository: `SynergyZAW/safari-smoke-drive`, branch `main` (production). Working branch: `watering-hole`.
- Hosting: Vercel project `safari-smoke-drive` (team `jonhodes-7086s-projects`), serving `https://safarismoke.co.za` (www redirects to the bare domain).
- Launch merge: PR #2, 7 Oct.

## Stack

- Vite 8, React 19, TypeScript, Tailwind v4, GSAP (scroll scrubbing).
- **Static SPA. No server routes, no API routes, no secrets.** Everything runs in the browser.
- Vercel can host a serverless function if a signed call is ever required, but the design below needs none: the catalogue API is public and read-only, and checkout is hosted by the ecosystem.
- Age gate: a 21+ confirmation on first visit, stored in `localStorage` (`ss-21`). It stays.
- Catalogue, prices and stock will be read from the ecosystem at page load. Nothing is duplicated in the repo except display names and artwork.

## The products as the site shows them

Nine cards on the page. The gummies are one SKU each; each vape strain card carries two sizes, so twelve SKUs behind nine cards. Page product ids are in brackets.

### Safari Snaxx Premium Gummies (format: bag, 50 g, 10 gummies × 20 mg)

| Card (page id) | Name | Size | Format |
|---|---|---|---|
| cherry | Safari Snaxx Premium Gummies — Cherry | 50 g bag, 10 × 20 mg | bag |
| pink-lemonade | Safari Snaxx Premium Gummies — Pink Lemonade | 50 g bag, 10 × 20 mg | bag |
| watermelon | Safari Snaxx Premium Gummies — Watermelon | 50 g bag, 10 × 20 mg | bag |
| tangerine | Safari Snaxx Premium Gummies — Tangerine | 50 g bag, 10 × 20 mg | bag |
| blueberry | Safari Snaxx Premium Gummies — Blueberry | 50 g bag, 10 × 20 mg | bag |
| variety | Safari Snaxx Premium Gummies — Variety Pack (all five flavours) | 50 g bag, 10 × 20 mg | bag |

Product copy on the site: "fast-acting, full-spectrum rosin". No medical claims anywhere.

### Eco-Star Live Rosin Disposables (format: disposable vape, two sizes)

| Card (page id) | Name | Size 1 | Size 2 | Format |
|---|---|---|---|---|
| sour-diesel | Eco-Star Live Rosin Disposable — Sour Diesel | 0.5 ml | 1 ml | disposable |
| permanent-marker | Eco-Star Live Rosin Disposable — Permanent Marker | 0.5 ml | 1 ml | disposable |
| banana-shack | Eco-Star Live Rosin Disposable — Banana Shack | 0.5 ml | 1 ml | disposable |

Mascots on the cards: rhino = Sour Diesel, monkey = Permanent Marker, ape = Banana Shack.

Once the SKU mapping arrives, each vape card gets a size picker and each card's "Buy" carries the ecosystem SKU.

## How "buy" should work (site-side recommendation)

- **Phase 1 (now):** the site reads `GET {API}/api/channel/safari-smoke/products` on load and shows `retailPriceCents`, `inStock` and `stockAvailable` per card. "Buy" does not take payment. Pending Jon's choice, it either links to the stockist finder or reads "Coming soon". Until the contract in `docs/channel-stores/SAFARI_SMOKE_API.md` is merged, no code is written against guessed shapes; the buttons stay as the placeholder anchor they are today.
- **Phase 2:** "Buy" hands off to the ecosystem-hosted checkout with a channel tag of `safari-smoke`, so stock, Paystack and the 21+ record on the order all stay in one system and the site holds no keys.
- Staging first. No real-money calls from the site at any stage; production API only after the staging run is signed off.

## Distributor sign-up (not built yet; planned fields)

A form on the site posting to the ecosystem's existing partner form with `source: "safari_smoke"`. Fields:

1. Business name
2. Trading name (if different)
3. Company registration number
4. VAT number (optional)
5. Contact name
6. Email
7. Phone
8. Delivery address
9. Licence or permit type, if any (free text)
10. Expected monthly volume (range picker)
11. How did you hear about us (free text)
12. Agreement to terms (checkbox)

After submit the page shows "Application received, we'll be in touch". Approval happens in Synergy Admin; approved distributors order wholesale on the AFP store. Wholesale prices never appear on this site.

## Open items for the ecosystem side

- The merged API contract (shapes, example responses, error cases).
- The SKU and product id for each of the twelve SKUs above.
- The staging API base URL and confirmation that CORS allows `safarismoke.co.za`, `www.safarismoke.co.za` and `*.vercel.app` previews.
- Where the distributor form posts (exact endpoint and field names).
- Phase 2: the checkout URL pattern and the channel tag.

## Update 7 Oct, 17:30 UTC (reply to Edith's SKU map message)

- **Buy buttons** now read "Coming soon" and are not links. The header pill reads "Store" and scrolls to the grid.
- **Dose copy removed from the site** pending Jon's confirmation: the cards now say "50 g bag · 10 gummies", the film beats say "Ten to a 50 g bag" and "Start with one and give it 20 minutes". No milligram figure appears anywhere. Source of the 20 mg figure: Jon, in this session, 6 Oct ("Each has 10 x 20mg gummies inside") and his approval of the dose line on 7 Oct. The 5 mg FAR Gummies in the ecosystem may be a different product. Jon decides; the site follows.
- **Vape SKUs received** (keyed on SKU, not product id): sour-diesel ES-SOURDIES-0.5ML-CART / ES-SOURDIES-1ML-CART; permanent-marker ES-PERM-0.5ML-CART / ES-PERM-1ML-CART; banana-shack ES-BASH-0.5ML-CART / ES-BANSHA-1ML-CART. Wiring waits for the merged contract.
- **"Live Rosin" wording** kept as is, no further process claims added, pending Jon's confirmation.
- **Preview hostnames** for CORS, both under team jonhodes-7086s-projects: `safari-smoke-drive-git-<branch>-jonhodes-7086s-projects.vercel.app` (branch alias) and `safari-smoke-drive-<hash>-jonhodes-7086s-projects.vercel.app` (per deployment). Production is `safarismoke.co.za`.
- **Gummies wiring** on hold as asked. **Distributor form** not built until the contract is merged.
- These changes are on branch `watering-hole` (preview) and go to production on Jon's go-ahead.

## Update 8 Oct (Jon, this morning)

- **Dose confirmed by Jon: 20 mg per gummy, 10 per bag.** Safari Snaxx is a separate range from FAR Gummies: different brand, different claims on the bag, different everything, same six flavour names. So the FAR Gummies 5 mg SKUs are **not** these products. Edith: please have six new Safari Snaxx gummy SKUs created (or tell me the existing ones if they already exist under another name). The 20 mg copy is back on the site.
- **Vapes: the full range goes in the store.** Jon has 30 to 40 Eco-Star varieties. The homepage keeps the three hero strains (Sour Diesel, Permanent Marker, Banana Shack) with their rangers. A new store page at `safarismoke.co.za/#/store` lists every vape the channel API returns, one card per strain with both sizes, plus a search box, and a Gummies tab. Strains without a ranger use a generic Eco-Star card. So the Store Ops toggle decides what appears; the site has no list of its own beyond the twelve fallback SKUs shown until the API is live.
- Buy buttons read "Coming soon" everywhere (phase 1). Out-of-stock items will show "Out of stock" once stock is live.
- The catalogue adapter is `src/lib/catalogue.ts`. It expects, per product: sku, line (gummies or vapes), name, strain or flavour, size, format, image, retailPriceCents, inStock, stockAvailable. If the API's field names differ, the mapping goes in that one file.

## Update 8 Oct, 05:10 UTC (reply to Edith's "carry on" message)

- Merge done earlier this morning (PR #3) with 20 mg restored and Buy as "Coming soon". The full Eco-Star range follows in PR #4.
- All 20 strains and their SKUs are in `src/lib/catalogue.ts` exactly as listed, keyed on SKU; `ES-MONKBUS-1ML-CART` is omitted as inactive. Single-size strains show one size and no picker.
- Gummies: no SKU codes and no prices on the site until you send the six new ones; the cards render from a flavour id only.
- Strain artwork: the three rangers stay. For the other 17 I'll use the official strain mascots from Drive (2026/Vapes) once Jon opens that folder; until then they show the generic Eco-Star card. No effects or medical copy on any strain.
- Waiting on: `SAFARI_SMOKE_API.md` (then I wire `fetchCatalogue()` and stock), the gummy SKUs, the distributor form field names.
