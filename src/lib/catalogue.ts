// Catalogue adapter. The site never holds prices or stock; they come from the Synergy
// ecosystem's public channel API once its contract is merged (docs/10-ecosystem-integration.md).
// Until then `fetchCatalogue` returns the static fallback, which carries no prices.

export type Line = 'gummies' | 'vapes'

export type CatalogueItem = {
  sku: string // '' until the ecosystem issues one
  id: string // stable key for the page
  line: Line
  name: string // display name without size
  strain?: string
  flavour?: string
  size: string // "0.5 ml", "1 ml", "50 g"
  format: 'bag' | 'disposable' | 'cartridge' | 'other'
  image?: string
  retailPriceCents?: number
  inStock?: boolean
  stockAvailable?: number
}

const G = (sku: string, id: string, flavour: string, img: string): CatalogueItem => ({
  sku, id, line: 'gummies', name: 'Safari Snaxx Premium Gummies', flavour, size: '50 g · 10 × 20 mg full spectrum', format: 'bag', image: img,
})
const V = (sku: string, strain: string, size: string): CatalogueItem => ({
  sku, id: sku, line: 'vapes', name: 'Eco-Star Live Rosin Disposable', strain, size, format: 'disposable',
})

/**
 * Known catalogue, shown until the channel API is live. All SKUs are the ecosystem's, keyed on SKU
 * (Edith, 8 Oct). Prices come from the API only. What is on sale is the channel toggle, never decided here.
 */
export const FALLBACK: CatalogueItem[] = [
  G('SSG-CHRY-50G', 'cherry', 'Cherry', '/img/gummy-cherry.webp'),
  G('SSG-PKLD-50G', 'pink-lemonade', 'Pink Lemonade', '/img/gummy-pink-lemonade.webp'),
  G('SSG-WTML-50G', 'watermelon', 'Watermelon', '/img/gummy-watermelon.webp'),
  G('SSG-TGRN-50G', 'tangerine', 'Tangerine', '/img/gummy-tangerine.webp'),
  G('SSG-BLBY-50G', 'blueberry', 'Blueberry', '/img/gummy-blueberry.webp'),
  G('SSG-VTPC-50G', 'variety', 'Variety Pack', '/img/gummy-variety.webp'),
  V('ES-BASH-0.5ML-CART', 'Banana Shack', '0.5 ml'),
  V('ES-BANSHA-1ML-CART', 'Banana Shack', '1 ml'),
  V('ES-BLOBER-0.5ML-CART', 'Block Berry', '0.5 ml'),
  V('ES-BLOBER-1ML-CART', 'Block Berry', '1 ml'),
  V('ES-BLUHAS-0.5ML-CART', 'Blue Berry Hash Plant', '0.5 ml'),
  V('ES-CHEESE-0.5ML-DISP', 'Cheese', '0.5 ml'),
  V('ES-CHEESE-1ML-CART', 'Cheese', '1 ml'),
  V('ES-CROICER-0.5ML-DISP', 'Croissant', '0.5 ml'),
  V('ES-CROICER-1ML-DISP', 'Croissant', '1 ml'),
  V('ES-GRLS-1ML-DISP', 'G-Rolls', '1 ml'),
  V('ES-GELA-0.5ML-CART', 'Gelato 41', '0.5 ml'),
  V('EM-GMO-0.5ML-CART', 'GMO', '0.5 ml'),
  V('ES-GMO-1ML-CART', 'GMO', '1 ml'),
  V('ES-GRAGAR-0.5ML-CART', 'Grape Garcia', '0.5 ml'),
  V('ES-MSPC-0.5ML-CART', 'Masterpiece', '0.5 ml'),
  V('ES-MAPCE-1ML-CART', 'Masterpiece', '1 ml'),
  V('ES-MONBUS-0.5ML-CART', 'Monkey Business', '0.5 ml'),
  V('ES-MONBUS-1ML-CART', 'Monkey Business', '1 ml'),
  V('ES-NERD-0.5ML-CART', 'Nerdz', '0.5 ml'),
  V('ES-NERDZ-1ML-CART', 'Nerdz', '1 ml'),
  V('ES-PAPACOOK-0.5ML-CART', 'Papaya Cookies', '0.5 ml'),
  V('ES-PAPACOOK-1ML-CART', 'Papaya Cookies', '1 ml'),
  V('ES-PERM-0.5ML-CART', 'Permanent Marker', '0.5 ml'),
  V('ES-PERM-1ML-CART', 'Permanent Marker', '1 ml'),
  V('ES-RAIMAR-0.5ML-CART', 'Rainbow Marker', '0.5 ml'),
  V('ES-RAIMAR-1ML-CART', 'Rainbow Marker', '1 ml'),
  V('ES-RLC-0.5ML-CART', 'Runtz Layer Cake', '0.5 ml'),
  V('ES-RLC-1ML-CART', 'Runtz Layer Cake', '1 ml'),
  V('ES-SOURDIES-0.5ML-CART', 'Sour Diesel', '0.5 ml'),
  V('ES-SOURDIES-1ML-CART', 'Sour Diesel', '1 ml'),
  V('ES-STICGLU-0.5ML-DISP', 'Sticky Glue', '0.5 ml'),
  V('ES-THECHU-0.5ML-CART', 'The Church', '0.5 ml'),
  V('ES-VBFR-1ML-DISP', 'VB Fire', '1 ml'),
]

/** Strains with a ranger of their own. Everything else uses the generic Eco-Star card until its art lands. */
export const HERO_STRAINS: Record<string, string> = {
  'Sour Diesel': '/img/card-rhino.webp',
  'Permanent Marker': '/img/card-monkey.webp',
  'Banana Shack': '/img/card-ape.webp',
}
/** Strain artwork beyond the three rangers, added as it is approved (keyed by strain name). */
export const STRAIN_ART: Record<string, string> = {}
export const GENERIC_VAPE_IMAGE = '/img/card-ecostar.webp'

export async function fetchCatalogue(): Promise<{ items: CatalogueItem[]; live: boolean }> {
  // Wired to GET {API}/api/channel/safari-smoke/products when the contract lands.
  return { items: FALLBACK, live: false }
}

export const money = (cents?: number) =>
  cents == null ? null : new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100)

/** Group vape SKUs by strain so one card can carry both sizes. */
export function groupByStrain(items: CatalogueItem[]) {
  const map = new Map<string, CatalogueItem[]>()
  for (const it of items) {
    const k = it.strain ?? it.name
    map.set(k, [...(map.get(k) ?? []), it])
  }
  return [...map.entries()].map(([strain, skus]) => ({ strain, skus: skus.sort((a, b) => parseFloat(a.size) - parseFloat(b.size)) }))
}
