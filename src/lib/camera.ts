export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** 0 outside [a,b], ramps up over `f` of the window at each end, 1 in the middle. */
export function window01(p: number, a: number, b: number, f = 0.2): number {
  if (p <= a || p >= b) return 0
  const r = (b - a) * f
  if (p < a + r) return ease((p - a) / r)
  if (p > b - r) return ease((b - p) / r)
  return 1
}
