/**
 * The scroll journey. Progress p runs 0..1 across the pinned film (chapters 1–6).
 * Chapters 7 (camp) and 8 (afterglow) are normal flow sections after the film.
 * Every number here is a creative decision, not plumbing — change with intent.
 */
export type Strain = 'banana-shack' | 'permanent-marker' | 'sour-diesel'

export interface CopyLine {
  id: string
  text: string
  /** progress window in which the line is visible */
  from: number
  to: number
  /** 'lead' = big Badaboom; 'beat' = smaller Badaboom */
  size?: 'lead' | 'beat'
  /** which analytics sighting this line belongs to (chapter 4 only) */
  strain?: Strain
}

export interface Chapter {
  n: number
  id: string
  title: string
  from: number
  to: number
  /** one-line intent, used for the reduced-motion story and the docs */
  intent: string
  /** progress to freeze the still on, for reduced motion / stills fallback */
  still: number
  copy: CopyLine[]
}

export const FILM_SCROLL_VH = 1000 // how tall the pinned film's scroll track is

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    id: 'cough',
    title: 'Cough',
    from: 0,
    to: 0.12,
    intent: 'Pre-dawn. Back row, right-hand drive. The engine will not catch. The oil window in your hand is the only warm light.',
    still: 0.09,
    copy: [
      { id: 'c1a', text: 'Same couch. Same night. Same nothing.', from: 0.0, to: 0.07, size: 'lead' },
      { id: 'c1b', text: 'Hold on.', from: 0.085, to: 0.125, size: 'lead' },
    ],
  },
  {
    n: 2,
    id: 'bad-start',
    title: 'Bad start',
    from: 0.12,
    to: 0.27,
    intent: 'Engine catches. Gate post clipped. First switchback taken like a dare. Nobody reacts.',
    still: 0.21,
    copy: [{ id: 'c2a', text: "He said he's driven before.", from: 0.15, to: 0.26, size: 'lead' }],
  },
  {
    n: 3,
    id: 'first-hit',
    title: 'First real hit',
    from: 0.27,
    to: 0.42,
    intent: 'Dry riverbed at speed. Washboard, then dust swallows the frame. Something lands in the back row. It is a monkey.',
    still: 0.36,
    copy: [{ id: 'c3a', text: "Riverbed. He didn't slow down.", from: 0.28, to: 0.37, size: 'lead' }],
  },
  {
    n: 4,
    id: 'passengers',
    title: 'The passengers',
    from: 0.42,
    to: 0.68,
    intent: 'Three sightings. Each passenger handles the chaos their own way. Product in every hand. No names.',
    still: 0.55,
    copy: [
      { id: 'c4a', text: "Hasn't blinked since the gate.", from: 0.43, to: 0.5, size: 'beat', strain: 'sour-diesel' },
      { id: 'c4b', text: "Feet haven't touched the floor.", from: 0.51, to: 0.58, size: 'beat', strain: 'permanent-marker' },
      { id: 'c4c', text: "Hasn't looked at the road once.", from: 0.59, to: 0.67, size: 'beat', strain: 'banana-shack' },
    ],
  },
  {
    n: 5,
    id: 'airborne',
    title: 'Airborne',
    from: 0.68,
    to: 0.82,
    intent: 'Golden hour. He sees the rise. He speeds up. The truck leaves the ground and hangs. Silence.',
    still: 0.77,
    copy: [{ id: 'c5a', text: 'He saw the rise.', from: 0.69, to: 0.74, size: 'lead' }],
  },
  {
    n: 6,
    id: 'reveal',
    title: 'The reveal',
    from: 0.82,
    to: 1.0,
    intent: 'Landing. The low sun rakes across your hand. It is a paw. The others turn and look at you. Hold. Then the question.',
    still: 0.95,
    copy: [{ id: 'c6a', text: 'Ja. Which one are you?', from: 0.9, to: 1.01, size: 'lead' }],
  },
]

export const SIGHTINGS: { strain: Strain; from: number; to: number }[] = [
  { strain: 'sour-diesel', from: 0.42, to: 0.5 },
  { strain: 'permanent-marker', from: 0.5, to: 0.58 },
  { strain: 'banana-shack', from: 0.58, to: 0.68 },
]

/** Camp: the only place anything is named. */
export const CAST = [
  {
    strain: 'banana-shack' as Strain,
    name: 'Banana Shack',
    who: 'The driver',
    species: 'Ape',
    device: 'black' as const,
    format: '1ml Eco-Star',
    note: 'Hands in pockets. One arm out the window. Knees on the wheel.',
  },
  {
    strain: 'permanent-marker' as Strain,
    name: 'Permanent Marker',
    who: 'The clinger',
    species: 'Monkey',
    device: 'natural' as const,
    format: '0.5ml Eco-Star',
    note: 'Vaulted in at the riverbed. Feet have not touched the floor since.',
  },
  {
    strain: 'sour-diesel' as Strain,
    name: 'Sour Diesel',
    who: 'The ranger',
    species: 'Rhino',
    device: 'black' as const,
    format: '1ml Eco-Star',
    note: 'Dressed for the job. Riding shotgun. Has not blinked since the gate.',
  },
]

/** Device facts. Engineering only. No effects claims. */
export const DEVICE_FACTS = [
  'Black is 1ml. Natural is 0.5ml. Same device, same size.',
  'Inhale activated. There is no button.',
  'LED lights on the draw.',
  'Removable, recyclable battery.',
  'Clog-free dual air vents. Isolated airway.',
  'USB-C. 180mAh.',
  'Also: 1ml medical-grade stainless steel cartridges.',
]
