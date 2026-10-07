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
