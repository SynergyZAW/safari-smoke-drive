import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduced
}

/** True on Save-Data or 2G-class connections: serve the stills story instead of the film. */
export function isLowBandwidth(): boolean {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  const c = nav.connection
  if (!c) return false
  if (c.saveData) return true
  return c.effectiveType === 'slow-2g' || c.effectiveType === '2g'
}

const AGE_KEY = 'ss.age'

export type AgeState = 'unknown' | 'ok' | 'no'

export function readAge(): AgeState {
  try {
    const v = localStorage.getItem(AGE_KEY)
    if (v && v.startsWith('ok:')) {
      const ts = Number(v.slice(3))
      // Remembered per device for 30 days.
      if (Date.now() - ts < 30 * 24 * 3600 * 1000) return 'ok'
    }
    if (sessionStorage.getItem(AGE_KEY) === 'no') return 'no'
  } catch {
    /* storage blocked: fall through, the gate shows */
  }
  return 'unknown'
}

export function writeAge(v: 'ok' | 'no') {
  try {
    if (v === 'ok') localStorage.setItem(AGE_KEY, `ok:${Date.now()}`)
    else sessionStorage.setItem(AGE_KEY, 'no')
  } catch {
    /* ignore */
  }
}
