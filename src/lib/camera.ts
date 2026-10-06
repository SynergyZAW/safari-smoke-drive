import type { Cam } from '../data/scene'

const ease = (t: number) => t * t * (3 - 2 * t)

export function sampleCamera(path: Cam[], p: number): { x: number; y: number; z: number } {
  if (p <= path[0].p) return path[0]
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i]
    if (p <= b.p) {
      const t = ease((p - a.p) / (b.p - a.p))
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t }
    }
  }
  return path[path.length - 1]
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** 0 outside [a,b], ramps up over `f` of the window at each end, 1 in the middle. */
export function window01(p: number, a: number, b: number, f = 0.2): number {
  if (p <= a || p >= b) return 0
  const r = (b - a) * f
  if (p < a + r) return ease((p - a) / r)
  if (p > b - r) return ease((b - p) / r)
  return 1
}
