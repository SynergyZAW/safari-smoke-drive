// Copy timed to the film. `at` is scroll progress 0..1 for the window the card is up.
export type Beat = { id: string; at: [number, number]; kicker?: string; title: string; body?: string; align?: 'left' | 'right' | 'center' }

export const BEATS: Beat[] = [
  { id: 'title', at: [0, 0.1], title: 'Safari Snaxx', body: 'Scroll to pull back.', align: 'center' },
  { id: 'gummies', at: [0.2, 0.33], kicker: 'Safari Snaxx gummies', title: 'Fast-acting rosin', body: 'Premium gummies made with full-spectrum rosin. Ten to a 50 g bag, 20 mg each.' },
  { id: 'flavours', at: [0.38, 0.5], kicker: 'Six flavours', title: 'Pick your bend', body: 'Cherry, Pink Lemonade, Watermelon, Tangerine, Blueberry, and a Variety Pack with all five.' },
  { id: 'dose', at: [0.55, 0.66], kicker: 'Ranger note', title: 'One is a dose', body: 'Each gummy is 20 mg. Start with one and give it time.' },
  { id: 'vapes', at: [0.72, 0.84], kicker: 'Live rosin vapes', title: 'The rangers', body: 'The Eco-Star, 0.5 ml or 1 ml. Sour Diesel, Permanent Marker, Banana Shack.' },
  { id: 'shop', at: [0.9, 1], kicker: 'The trading post', title: 'Everything on the counter', body: 'Scroll on to shop.', align: 'center' },
]

export const FILM = {
  landscape: '/film/landscape',
  portrait: '/film/portrait',
}

export const SCROLL_VH = 600
