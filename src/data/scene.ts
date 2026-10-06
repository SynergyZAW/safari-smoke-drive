// World coordinates are fractions of the master image (x to the right, y down).
// Stations anchor at the character's bottom-centre. Widths are fractions of the master width.

export type Layout = 'portrait' | 'landscape'

export type Cam = { p: number; x: number; y: number; z: number }

export type Station = {
  id: string
  src?: string // keyed cut-out; absent = pending artwork
  x: number
  y: number
  w: number
  /** scroll window [start, end] during which the ranger note is up */
  note: [number, number]
  kicker: string
  title: string
  body: string
  swatch?: string
}

export const MASTER: Record<Layout, { src: string; w: number; h: number; pool: { x: number; y: number } }> = {
  portrait: { src: '/img/river-portrait.webp', w: 1152, h: 2048, pool: { x: 0.55, y: 0.9 } },
  landscape: { src: '/img/river-landscape.webp', w: 2048, h: 1152, pool: { x: 0.47, y: 0.82 } },
}

// Camera path is derived from the stations: the camera dwells on each one at the centre of its note window.
// `look` is where the camera centres relative to the station anchor (fractions of the master), so the
// character sits clear of the ranger note.
export const CAMERA: Record<Layout, Cam[]> = { portrait: [], landscape: [] }

const copy = {
  hare: {
    kicker: 'Ranger note 01',
    title: 'Safari Snaxx',
    body: 'Premium gummies made with fast-acting, full-spectrum rosin. Ten gummies to a 50 g bag, 20 mg each.',
    swatch: '/img/gummy-cherry.webp',
  },
  gorilla: {
    kicker: 'Ranger note 02',
    title: 'Six flavours',
    body: 'Cherry, Pink Lemonade, Watermelon, Tangerine, Blueberry, and a Variety Pack with all five.',
    swatch: '/img/gummy-tangerine.webp',
  },
  tiger: {
    kicker: 'Ranger note 03',
    title: 'One is a dose',
    body: 'Each gummy is 20 mg. Start with one and give it time before you reach for another.',
    swatch: '/img/gummy-blueberry.webp',
  },
  vape: {
    kicker: 'Ranger note 04',
    title: 'Live rosin vapes',
    body: 'The Eco-Star, in 0.5 ml and 1 ml. Live rosin, ready when you are.',
  },
}

export const STATIONS: Record<Layout, Station[]> = {
  portrait: [
    { id: 'hare', src: '/img/station-hare.webp', x: 0.64, y: 0.285, w: 0.2, note: [0.1, 0.26], ...copy.hare },
    { id: 'gorilla', src: '/img/station-gorilla.webp', x: 0.22, y: 0.46, w: 0.2, note: [0.3, 0.46], ...copy.gorilla },
    { id: 'tiger', src: '/img/station-tiger.webp', x: 0.74, y: 0.62, w: 0.19, note: [0.5, 0.66], ...copy.tiger },
    { id: 'vape', x: 0.22, y: 0.76, w: 0.18, note: [0.7, 0.85], ...copy.vape },
  ],
  landscape: [
    { id: 'hare', src: '/img/station-hare.webp', x: 0.455, y: 0.4, w: 0.085, note: [0.1, 0.26], ...copy.hare },
    { id: 'gorilla', src: '/img/station-gorilla.webp', x: 0.73, y: 0.56, w: 0.09, note: [0.3, 0.46], ...copy.gorilla },
    { id: 'tiger', src: '/img/station-tiger.webp', x: 0.25, y: 0.68, w: 0.085, note: [0.5, 0.66], ...copy.tiger },
    { id: 'vape', x: 0.8, y: 0.75, w: 0.07, note: [0.7, 0.85], ...copy.vape },
  ],
}

const ZOOM: Record<Layout, number> = { portrait: 1.7, landscape: 2.3 }
const LOOK: Record<Layout, (s: Station) => { x: number; y: number }> = {
  // phone: character in the upper half, note card at the bottom
  portrait: (s) => ({ x: s.x, y: s.y + 0.02 }),
  // desktop: character left of centre, note card at the right
  landscape: (s) => ({ x: s.x + 0.05, y: s.y - 0.04 }),
}
for (const layout of ['portrait', 'landscape'] as Layout[]) {
  const st = STATIONS[layout]
  const z = ZOOM[layout]
  const path: Cam[] = [{ p: 0, x: 0.5, y: 0.08, z: layout === 'portrait' ? z * 0.85 : z }]
  for (const s of st) {
    const look = LOOK[layout](s)
    const mid = (s.note[0] + s.note[1]) / 2
    path.push({ p: s.note[0] + 0.02, x: look.x, y: look.y, z })
    path.push({ p: mid, x: look.x, y: look.y, z })
    path.push({ p: s.note[1] - 0.02, x: look.x, y: look.y, z })
  }
  const pool = MASTER[layout].pool
  path.push({ p: 1, x: pool.x, y: pool.y - 0.06, z: z * 0.8 })
  CAMERA[layout] = path
}

export const PRODUCTS = [
  { id: 'cherry', name: 'Cherry', img: '/img/gummy-cherry.webp', blurb: 'Deep red, sugar-crusted, straight to the point.' },
  { id: 'pink-lemonade', name: 'Pink Lemonade', img: '/img/gummy-pink-lemonade.webp', blurb: 'Sweet, sharp and sunny.' },
  { id: 'watermelon', name: 'Watermelon', img: '/img/gummy-watermelon.webp', blurb: 'Juicy red centre, green rind edge.' },
  { id: 'tangerine', name: 'Tangerine', img: '/img/gummy-tangerine.webp', blurb: 'Bright citrus with a soft finish.' },
  { id: 'blueberry', name: 'Blueberry', img: '/img/gummy-blueberry.webp', blurb: 'Dark, rich and slow to fade.' },
  { id: 'variety', name: 'Variety Pack', img: '/img/gummy-variety.webp', blurb: 'All five flavours in one bag.' },
]

export const VAPES = [
  { id: 'ecostar-05', name: 'Eco-Star 0.5 ml', blurb: 'Live rosin. Pocket size.' },
  { id: 'ecostar-1', name: 'Eco-Star 1 ml', blurb: 'Live rosin. The long walk.' },
]

/** Store links are placeholders until the platform (AFP vs Ecwid) is chosen. */
export const STORE_URL = '#store'
