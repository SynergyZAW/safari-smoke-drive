// Catalogue adapter. The site never holds prices or stock; they come from the Synergy
// ecosystem's public channel API once its contract is merged (docs/10-ecosystem-integration.md).
// Until then `fetchCatalogue` returns the static fallback, which carries no prices.

export type Line = 'gummies' | 'vapes'

export type CatalogueItem = {
  sku: string
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

const G = (sku: string, flavour: string, img: string): CatalogueItem => ({
  sku, line: 'gummies', name: 'Safari Snaxx Premium Gummies', flavour, size: '50 g · 10 × 20 mg', format: 'bag', image: img,
})
const V = (sku: string, strain: string, size: string, image?: string): CatalogueItem => ({
  sku, line: 'vapes', name: 'Eco-Star Live Rosin Disposable', strain, size, format: 'disposable', image,
})

/** Known SKUs. Gummy SKUs are placeholders until the ecosystem issues them. Vape SKUs are the ecosystem's. */
export const FALLBACK: CatalogueItem[] = [
  G('SS-GUM-CHERRY', 'Cherry', '/img/gummy-cherry.webp'),
  G('SS-GUM-PINKLEM', 'Pink Lemonade', '/img/gummy-pink-lemonade.webp'),
  G('SS-GUM-WATERM', 'Watermelon', '/img/gummy-watermelon.webp'),
  G('SS-GUM-TANG', 'Tangerine', '/img/gummy-tangerine.webp'),
  G('SS-GUM-BLUEB', 'Blueberry', '/img/gummy-blueberry.webp'),
  G('SS-GUM-VARIETY', 'Variety Pack', '/img/gummy-variety.webp'),
  V('ES-SOURDIES-0.5ML-CART', 'Sour Diesel', '0.5 ml', '/img/card-rhino.webp'),
  V('ES-SOURDIES-1ML-CART', 'Sour Diesel', '1 ml', '/img/card-rhino.webp'),
  V('ES-PERM-0.5ML-CART', 'Permanent Marker', '0.5 ml', '/img/card-monkey.webp'),
  V('ES-PERM-1ML-CART', 'Permanent Marker', '1 ml', '/img/card-monkey.webp'),
  V('ES-BASH-0.5ML-CART', 'Banana Shack', '0.5 ml', '/img/card-ape.webp'),
  V('ES-BANSHA-1ML-CART', 'Banana Shack', '1 ml', '/img/card-ape.webp'),
]

/** Strains with a ranger of their own. Everything else uses the generic Eco-Star card. */
export const HERO_STRAINS: Record<string, string> = {
  'Sour Diesel': '/img/card-rhino.webp',
  'Permanent Marker': '/img/card-monkey.webp',
  'Banana Shack': '/img/card-ape.webp',
}
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
