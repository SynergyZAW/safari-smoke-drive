// World coordinates are fractions of the master image (x to the right, y down).
// Stations anchor at the character's bottom-centre. Widths are fractions of the master width.

export type Layout = 'portrait' | 'landscape'

export type Cam = { p: number; x: number; y: number; z: number }

export type Layer = { src: string; dx: number; dy: number; w: number }

export type Station = {
  id: string
  src?: string // keyed cut-out; absent = pending artwork
  layers?: Layer[] // a group of cut-outs placed around the anchor (offsets in master fractions)
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

// The world is the pool version of each master: the river from the top down to the kiosk and the jar.
// `jar` is the mouth of the jar on the kiosk counter, where The Drop lands.
export const MASTER: Record<Layout, { src: string; w: number; h: number; jar: { x: number; y: number }; endZoom: number }> = {
  portrait: { src: '/img/world-portrait.webp', w: 1152, h: 2048, jar: { x: 0.515, y: 0.957 }, endZoom: 2.2 },
  landscape: { src: '/img/world-landscape.webp', w: 2048, h: 1152, jar: { x: 0.463, y: 0.789 }, endZoom: 2.6 },
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
    title: 'The vape crew',
    body: 'Live rosin in the Eco-Star, 0.5 ml or 1 ml. Sour Diesel, Permanent Marker and Banana Shack.',
  },
}

export const STATIONS: Record<Layout, Station[]> = {
  portrait: [
    { id: 'hare', src: '/img/station-hare.webp', x: 0.66, y: 0.3, w: 0.2, note: [0.1, 0.25], ...copy.hare },
    { id: 'gorilla', src: '/img/station-gorilla.webp', x: 0.22, y: 0.47, w: 0.2, note: [0.29, 0.44], ...copy.gorilla },
    { id: 'tiger', src: '/img/station-tiger.webp', x: 0.76, y: 0.63, w: 0.19, note: [0.48, 0.63], ...copy.tiger },
    { id: 'vape', x: 0.3, y: 0.79, w: 0.16, note: [0.67, 0.8], ...copy.vape, layers: [
      { src: '/img/station-rhino.webp', dx: -0.17, dy: 0.0, w: 0.15 },
      { src: '/img/station-monkey.webp', dx: 0.0, dy: 0.015, w: 0.16 },
      { src: '/img/station-ape.webp', dx: 0.17, dy: -0.01, w: 0.14 },
    ] },
  ],
  landscape: [
    { id: 'hare', src: '/img/station-hare.webp', x: 0.46, y: 0.41, w: 0.085, note: [0.1, 0.25], ...copy.hare },
    { id: 'gorilla', src: '/img/station-gorilla.webp', x: 0.73, y: 0.52, w: 0.09, note: [0.29, 0.44], ...copy.gorilla },
    { id: 'tiger', src: '/img/station-tiger.webp', x: 0.24, y: 0.64, w: 0.085, note: [0.48, 0.63], ...copy.tiger },
    { id: 'vape', x: 0.8, y: 0.76, w: 0.07, note: [0.67, 0.8], ...copy.vape, layers: [
      { src: '/img/station-rhino.webp', dx: -0.085, dy: 0.0, w: 0.065 },
      { src: '/img/station-monkey.webp', dx: 0.0, dy: 0.01, w: 0.07 },
      { src: '/img/station-ape.webp', dx: 0.085, dy: -0.005, w: 0.06 },
    ] },
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
  const { jar, endZoom } = MASTER[layout]
  // arrive at the kiosk and hold while the gummy drops into the jar
  path.push({ p: 0.9, x: jar.x, y: jar.y - (layout === 'portrait' ? 0.04 : 0.03), z: endZoom })
  path.push({ p: 1, x: jar.x, y: jar.y - (layout === 'portrait' ? 0.04 : 0.03), z: endZoom })
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
  { id: 'sour-diesel', name: 'Sour Diesel', mascot: 'Rhino', img: '/img/card-rhino.webp', blurb: 'Live rosin Eco-Star. 0.5 ml or 1 ml.' },
  { id: 'permanent-marker', name: 'Permanent Marker', mascot: 'Monkey', img: '/img/card-monkey.webp', blurb: 'Live rosin Eco-Star. 0.5 ml or 1 ml.' },
  { id: 'banana-shack', name: 'Banana Shack', mascot: 'Ape', img: '/img/card-ape.webp', blurb: 'Live rosin Eco-Star. 0.5 ml or 1 ml.' },
]

/** Store links are placeholders until the platform (AFP vs Ecwid) is chosen. */
export const STORE_URL = '#store'
