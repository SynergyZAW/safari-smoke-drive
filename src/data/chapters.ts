/**
 * The scroll journey. Progress p runs 0..1 across the pinned film (chapters 1–6).
 * Chapters 7 (camp) and 8 (afterglow) are normal flow sections after the film.
 * Every number here is a creative decision, not plumbing — change with intent.
 */
export type Strain = 'banana-shack' | 'permanent-marker' | 'sour-diesel'
export type WildKind = 'sheep' | 'panda' | 'baboon' | 'leopard' | 'warthog' | 'lemur' | 'tourists'

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
  // Progress is four 25 s takes over equal quarters: t1 0-0.25, t2 0.25-0.5, t3 0.5-0.75, t4 0.75-1.
  // A second of footage is 0.01 of progress. Timings below are read off the rendered takes, not the script.
  {
    n: 1,
    id: 'cough',
    title: 'Cough',
    from: 0,
    to: 0.1,
    intent: 'Morning, sun up. Back row, right-hand drive. The engine will not catch. First raise of the hand, the LED comes on, the engine catches and knocks it down.',
    still: 0.02,
    copy: [
      { id: 'c1a', text: 'Same couch. Same night. Same nothing.', from: 0.0, to: 0.055, size: 'lead' },
      { id: 'c1b', text: 'Hold on.', from: 0.075, to: 0.11, size: 'lead' },
    ],
  },
  {
    n: 2,
    id: 'bad-start',
    title: 'Bad start',
    from: 0.1,
    to: 0.25,
    intent: 'Lunge, stall, lunge. Second raise, then the swerve off the track into scrub. Nobody reacts.',
    still: 0.16,
    copy: [{ id: 'c2a', text: "He said he's driven before.", from: 0.12, to: 0.195, size: 'lead' }],
  },
  {
    n: 3,
    id: 'first-hit',
    title: 'First real hit',
    from: 0.25,
    to: 0.5,
    intent: 'The gate post, two switchbacks, washboard into the riverbed, the drop. The jerry can is gone. Two more raises, two more hits.',
    still: 0.42,
    copy: [
      { id: 'c3a', text: 'Gate. He found it.', from: 0.335, to: 0.385, size: 'beat' },
      { id: 'c3b', text: "Riverbed. He didn't slow down.", from: 0.4, to: 0.47, size: 'lead' },
    ],
  },
  {
    n: 4,
    id: 'passengers',
    title: 'The passengers',
    from: 0.5,
    to: 0.75,
    intent: 'The ranger stares. The clinger hangs upside down off the roll bar. The driver swerves for a warthog into the mud. Product in every hand. No names.',
    still: 0.56,
    copy: [
      { id: 'c4a', text: "Hasn't blinked since the gate.", from: 0.5, to: 0.545, size: 'beat', strain: 'sour-diesel' },
      { id: 'c4b', text: "Feet haven't touched the floor.", from: 0.55, to: 0.6, size: 'beat', strain: 'permanent-marker' },
      { id: 'c4c', text: "Hasn't looked at the road once.", from: 0.605, to: 0.645, size: 'beat', strain: 'banana-shack' },
    ],
  },
  {
    n: 5,
    id: 'airborne',
    title: 'Airborne',
    from: 0.75,
    to: 0.86,
    intent: 'Golden hour, sun dead ahead. He sees the rise. The truck leaves the ground and hangs. The hat comes off.',
    still: 0.84,
    copy: [{ id: 'c5a', text: 'He saw the rise.', from: 0.77, to: 0.82, size: 'lead' }],
  },
  {
    n: 6,
    id: 'reveal',
    title: 'The reveal',
    from: 0.86,
    to: 1.0,
    intent: 'Landing. The dust settles in the low sun. The truck stops. The monkey turns. The mirror finds you. Hold. Then the question.',
    still: 0.99,
    copy: [{ id: 'c6a', text: 'Ja. Which one are you?', from: 0.95, to: 1.01, size: 'lead' }],
  },
]

export const SIGHTINGS: { strain: Strain; from: number; to: number }[] = [
  { strain: 'sour-diesel', from: 0.5, to: 0.55 },
  { strain: 'permanent-marker', from: 0.55, to: 0.6 },
  { strain: 'banana-shack', from: 0.6, to: 0.65 },
]

/**
 * THE WILD. The rest of the range lives out there. Glimpses only, half-hidden, blink-and-miss,
 * never captioned. Each is a locked plate generated once. At camp they are ticked on the board.
 * `at` is the progress the glimpse lands; it approaches from the horizon over the previous 0.03.
 */
export interface WildSighting {
  id: string
  name: string
  species: string
  kind: WildKind
  formats: string
  at: number
  side: -1 | 1
  where: string
}

export const WILD: WildSighting[] = [
  { id: 'the-church', name: 'The Church', species: 'Sheep', kind: 'sheep', formats: '1ml', at: 0.31, side: -1, where: 'On a rock at the gate, robed, serene, dawn behind it.' },
  { id: 'gmo', name: 'GMO', species: 'Panda', kind: 'panda', formats: '0.5ml · 1ml', at: 0.46, side: 1, where: 'Standing in the riverbed as you cross it at speed. Does not move.' },
  { id: 'monkey-business', name: 'Monkey Business', species: 'Baboon', kind: 'baboon', formats: '0.5ml', at: 0.365, side: 1, where: 'On the termite mound the truck clips. In a suit. Checking a watch.' },
  { id: 'sapphire-og', name: 'Sapphire OG', species: 'Leopard', kind: 'leopard', formats: '0.5ml', at: 0.53, side: -1, where: 'In the acacia the truck goes around. Bucket hat. Unbothered.' },
  { id: 'grape-garcia', name: 'Grape Garcia', species: 'Warthog', kind: 'warthog', formats: '0.5ml', at: 0.615, side: -1, where: 'Crossing at the mud, tail up, tie-dye. The reason for the mud.' },
  { id: 'nerdz', name: 'Nerdz', species: 'Lemur', kind: 'lemur', formats: '0.5ml · 1ml', at: 0.82, side: 1, where: 'On the crest of the rise, tracksuit, watching the truck leave the ground.' },
]

/** The one human beat. A rival game viewer of khaki tourists, every long lens on the back row. On you. */
export const TOURISTS = { at: 0.665, side: -1 as const }

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
    note: 'Aboard since the gate. Feet have not touched the floor since the riverbed.',
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
