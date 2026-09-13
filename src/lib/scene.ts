/**
 * Pure scene maths. Progress in, a fully-described frame out.
 * This is the "one physics" the impact library promises: every hit in the film
 * is one of these envelopes, so every hit feels like the same truck.
 */
export type ImpactType =
  | 'cough'
  | 'lurch'
  | 'jolt'
  | 'lean'
  | 'washboard'
  | 'dust'
  | 'landing'
  | 'brush'
  | 'mud'
  | 'rise'
  | 'hang'

export interface Impact {
  at: number
  dur: number
  type: ImpactType
  dir?: 1 | -1
  label: string
}

export const IMPACTS: Impact[] = [
  { at: 0.02, dur: 0.02, type: 'cough', label: 'Engine cough 1' },
  { at: 0.05, dur: 0.02, type: 'cough', label: 'Engine cough 2' },
  { at: 0.085, dur: 0.02, type: 'cough', label: 'Engine cough 3' },
  { at: 0.12, dur: 0.03, type: 'lurch', label: 'Engine catches, truck lurches' },
  { at: 0.155, dur: 0.025, type: 'jolt', dir: -1, label: 'Gate post clipped' },
  { at: 0.2, dur: 0.05, type: 'lean', dir: -1, label: 'Switchback left' },
  { at: 0.245, dur: 0.04, type: 'lean', dir: 1, label: 'Switchback right' },
  { at: 0.29, dur: 0.06, type: 'washboard', label: 'Riverbed corrugations' },
  { at: 0.34, dur: 0.06, type: 'dust', label: 'Dust swallows the frame' },
  { at: 0.395, dur: 0.03, type: 'landing', label: 'Monkey lands in the back row' },
  { at: 0.46, dur: 0.02, type: 'jolt', dir: 1, label: 'Termite mound clipped' },
  { at: 0.53, dur: 0.04, type: 'brush', label: 'Acacia gone around, not avoided' },
  { at: 0.62, dur: 0.05, type: 'mud', label: 'Mud crossing, brown water over lens' },
  { at: 0.7, dur: 0.04, type: 'washboard', label: 'Corrugations before the rise' },
  { at: 0.735, dur: 0.015, type: 'rise', label: 'The rise, hit hard' },
  { at: 0.75, dur: 0.05, type: 'hang', label: 'Airborne hang' },
  { at: 0.8, dur: 0.03, type: 'landing', label: 'Landing compression' },
]

/** Caps. The ride is violent, the page is not. */
export const CAPS = { x: 14, y: 18, rot: 2.5, scaleYMin: 0.95 }

export interface Shake {
  x: number
  y: number
  rot: number
  scaleY: number
}

export interface SceneState {
  p: number
  skyTop: string
  skyHorizon: string
  ground: string
  groundDeep: string
  sunX: number // fraction of width
  sunY: number // fraction of height, measured from horizon (negative = above)
  sunColor: string
  sunGlow: number
  horizon: number // fraction of height (portrait/landscape adjusted by renderer)
  airborne: number
  dust: number
  mud: number
  brush: number
  shake: Shake
  moving: number // 0 stationary, 1 driving
  handPull: number
  handReveal: number
  ledViewer: boolean
  ledRanger: boolean
  ledDriver: boolean
  monkeyIn: number
  jerryCan: number
  awningTear: number
  cough: number
  night: number
  eyesOnYou: number
  hold: boolean
  sighting: 'sour-diesel' | 'permanent-marker' | 'banana-shack' | null
}

/** 0 = not yet, 0..1 = approaching from the horizon, 1 = passing, then gone. */
export function glimpseAt(p: number, at: number): number {
  const t = (p - (at - 0.03)) / 0.045
  return t <= 0 || t >= 1 ? 0 : t
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
export function mixHex(a: string, b: string, t: number) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  const c = A.map((v, i) => Math.round(lerp(v, B[i], clamp(t))))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

/** Time-of-day keys. One drive, one day: pre-dawn to night. */
const SKY: [number, string, string, string, string][] = [
  // p, skyTop, skyHorizon, ground, sun colour
  [0.0, '#0a1630', '#1f2f55', '#2b2418', '#c99a2e'],
  [0.12, '#233b6e', '#c99a2e', '#4a3a22', '#f2b23c'],
  [0.3, '#3a96e5', '#cfe6f8', '#a4783c', '#fff1c4'],
  [0.5, '#5fb0f0', '#eef4f7', '#b98b48', '#ffffff'],
  [0.68, '#2f6cb8', '#f0b040', '#a06c34', '#f7c04a'],
  [0.79, '#c7402e', '#c99a2e', '#7c4a24', '#d8253f'],
  [0.9, '#4a1a2e', '#d8253f', '#3e2418', '#d8253f'],
  [1.0, '#150c1c', '#3a2038', '#1f1610', '#d8253f'],
]

function skyAt(p: number) {
  let i = 0
  while (i < SKY.length - 2 && SKY[i + 1][0] <= p) i++
  const a = SKY[i]
  const b = SKY[i + 1]
  const t = smooth(clamp((p - a[0]) / (b[0] - a[0])))
  return {
    skyTop: mixHex(a[1], b[1], t),
    skyHorizon: mixHex(a[2], b[2], t),
    ground: mixHex(a[3], b[3], t),
    sunColor: mixHex(a[4], b[4], t),
  }
}

function envelope(type: ImpactType, t: number, dir: 1 | -1): Partial<Shake> & { dust?: number; mud?: number; brush?: number; air?: number; cough?: number } {
  const decay = (1 - t) * (1 - t)
  const s = (f: number) => Math.sin(Math.PI * 2 * f * t)
  switch (type) {
    case 'cough':
      return { y: 4 * s(3) * decay, x: 1.5 * s(5) * decay, cough: Math.sin(Math.PI * t) }
    case 'lurch':
      return { x: -12 * Math.sin(Math.PI * t) * decay, y: 5 * s(2) * decay, rot: -0.8 * Math.sin(Math.PI * t) }
    case 'jolt':
      return { x: 14 * dir * s(3) * decay, y: 8 * s(4) * decay, rot: 1.2 * dir * s(2) * decay }
    case 'lean':
      return { rot: 2.5 * dir * Math.sin(Math.PI * t), x: 8 * dir * Math.sin(Math.PI * t), y: 2 * s(6) * decay }
    case 'washboard':
      return { y: 3.5 * s(16) * (1 - t * 0.5), x: 1.2 * s(11), rot: 0.35 * s(9), dust: 0.35 * Math.sin(Math.PI * t) }
    case 'dust':
      return { dust: Math.sin(Math.PI * t), y: 2 * s(8) }
    case 'landing':
      return { y: 18 * s(1.5) * decay, scaleY: 1 - 0.05 * Math.sin(Math.PI * Math.min(1, t * 2)), dust: 0.7 * Math.sin(Math.PI * t) }
    case 'brush':
      return { x: 6 * s(4) * decay, brush: Math.sin(Math.PI * t), y: 2 * s(7) * decay }
    case 'mud':
      return { x: 10 * s(2) * decay, y: 6 * s(3) * decay, mud: t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8 }
    case 'rise':
      return { y: 10 * Math.sin(Math.PI * t), scaleY: 1 - 0.03 * Math.sin(Math.PI * t) }
    case 'hang':
      return { air: Math.sin(Math.PI * t) }
  }
}

export function sceneAt(p: number, velocity = 0): SceneState {
  p = clamp(p)
  const sky = skyAt(p)
  const moving = p < 0.12 ? 0 : p > 0.83 ? clamp(1 - (p - 0.83) / 0.05) : 1

  // Sum the impact envelopes that are live at p.
  let x = 0
  let y = 0
  let rot = 0
  let scaleY = 1
  let dust = 0
  let mud = 0
  let brush = 0
  let air = 0
  let cough = 0
  for (const im of IMPACTS) {
    if (p >= im.at && p < im.at + im.dur) {
      const t = (p - im.at) / im.dur
      const e = envelope(im.type, t, im.dir ?? 1)
      x += e.x ?? 0
      y += e.y ?? 0
      rot += e.rot ?? 0
      scaleY = Math.min(scaleY, e.scaleY ?? 1)
      dust = Math.max(dust, e.dust ?? 0)
      mud = Math.max(mud, e.mud ?? 0)
      brush = Math.max(brush, e.brush ?? 0)
      air = Math.max(air, e.air ?? 0)
      cough = Math.max(cough, e.cough ?? 0)
    }
  }
  // Base rumble while driving, scaled by scroll velocity so a stopped page is still.
  const v = clamp(Math.abs(velocity))
  x += moving * v * 1.6 * Math.sin(p * 900)
  y += moving * v * 1.8 * Math.cos(p * 1130)
  // Airborne: contents float, no rumble.
  x *= 1 - air
  y = y * (1 - air) - air * 10

  const shake: Shake = {
    x: clamp(x, -CAPS.x, CAPS.x),
    y: clamp(y, -CAPS.y, CAPS.y),
    rot: clamp(rot, -CAPS.rot, CAPS.rot),
    scaleY: Math.max(CAPS.scaleYMin, scaleY),
  }
  dust = clamp(dust + moving * 0.18 + (p > 0.27 && p < 0.42 ? 0.2 : 0))

  // Sun path: below horizon at dawn, high at noon, low and gold at 0.72–0.82, gone by 0.92.
  const sunArc = p < 0.12 ? -0.02 + p * 0.3 : Math.sin(Math.PI * clamp((p - 0.1) / 0.8))
  const sunY = -(0.02 + sunArc * 0.55)
  const sunX = lerp(0.82, 0.18, clamp((p - 0.1) / 0.8))
  const goldenHour = p > 0.66 && p < 0.9 ? Math.sin(Math.PI * clamp((p - 0.66) / 0.24)) : 0

  // Viewer's hand: pulls at ch1 and just before the rise. Raised = to the mouth = bottom centre, larger.
  const pull = (a: number, b: number) => (p > a && p < b ? Math.sin(Math.PI * ((p - a) / (b - a))) : 0)
  const handPull = Math.max(pull(0.075, 0.115), pull(0.64, 0.685))
  const ledViewer = handPull > 0.35
  const ledRanger = p > 0.445 && p < 0.485
  const ledDriver = p > 0.61 && p < 0.65

  const monkeyIn = p < 0.385 ? 0 : p < 0.41 ? smooth((p - 0.385) / 0.025) : 1
  const jerryCan = p < 0.3 ? 0 : p < 0.33 ? smooth((p - 0.3) / 0.03) : 1
  const awningTear = p < 0.24 ? 0 : clamp((p - 0.24) / 0.3)

  const handReveal = p < 0.84 ? 0 : smooth(clamp((p - 0.84) / 0.06))
  const eyesOnYou = p < 0.87 ? 0 : smooth(clamp((p - 0.87) / 0.04))
  const hold = p >= 0.9
  const night = p < 0.88 ? 0 : clamp((p - 0.88) / 0.12) * 0.55

  const sighting =
    p >= 0.42 && p < 0.5
      ? 'sour-diesel'
      : p >= 0.5 && p < 0.58
        ? 'permanent-marker'
        : p >= 0.58 && p < 0.68
          ? 'banana-shack'
          : null

  return {
    p,
    ...sky,
    groundDeep: mixHex(sky.ground, '#0b0b0b', 0.45),
    sunX,
    sunY,
    sunGlow: 0.25 + goldenHour * 0.75,
    horizon: 0.5,
    airborne: air,
    dust,
    mud,
    brush,
    shake: hold ? { x: 0, y: 0, rot: 0, scaleY: 1 } : shake,
    moving,
    handPull,
    handReveal,
    ledViewer,
    ledRanger,
    ledDriver,
    monkeyIn,
    jerryCan,
    awningTear,
    cough,
    night,
    eyesOnYou,
    hold,
    sighting,
  }
}
