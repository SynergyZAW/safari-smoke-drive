# What shipped (store integration, phase 1 groundwork)

## 8 Oct 2026
- Production (`main`, PR #3): dose copy restored at 20 mg per gummy, 10 per bag; Buy buttons read "Coming soon" everywhere and take no payment; store page at `/#/store` with Vapes and Gummies tabs and search; homepage links to it.
- Production (PR #4): the store's vape list now carries all 20 active Eco-Star strains and their ecosystem SKUs, keyed on SKU, with only the sizes that exist per strain (no picker where there is one size). Gummies carry no SKU and no price until the ecosystem issues the six new Safari Snaxx SKUs. Nothing here decides what is on sale: the channel toggle does, once the API is wired.
- Still to come: wiring `fetchCatalogue()` to `GET {API}/api/channel/safari-smoke/products` once `docs/channel-stores/SAFARI_SMOKE_API.md` is merged (ecosystem PR #383), live prices and stock, the distributor form, and strain artwork for the 17 strains beyond the three rangers (the official strain mascots live in Drive, 2026/Vapes).
