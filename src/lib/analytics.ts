/**
 * Analytics — STUBS for this phase.
 * Every event the brief names is wired here and fired from the right place.
 * Swap `send` for the real vendor call (GA4 / Plausible / PostHog) later; nothing else changes.
 */
export type EventName =
  | 'page_view'
  | 'age_gate_passed'
  | 'age_gate_failed'
  | 'hero_viewed'
  | 'story_50_percent'
  | 'sighting_viewed'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'video_fallback_activated'
  | 'reduced_motion_used'

type Props = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[]
    __ss_events?: { name: EventName; props?: Props; t: number }[]
  }
}

const firedOnce = new Set<string>()

function send(name: EventName, props?: Props) {
  const rec = { name, props, t: Date.now() }
  // In-page ring buffer so QA can inspect what fired: window.__ss_events
  ;(window.__ss_events ??= []).push(rec)
  if (window.__ss_events.length > 200) window.__ss_events.shift()
  // GTM-compatible push. Harmless if no dataLayer exists.
  window.dataLayer?.push({ event: name, ...props })
  if (import.meta.env.DEV) console.debug('[analytics]', name, props ?? '')
}

/** Fire an event every time. */
export function track(name: EventName, props?: Props) {
  send(name, props)
}

/** Fire an event once per page load, keyed on name + a discriminator (e.g. strain). */
export function trackOnce(name: EventName, key = '', props?: Props) {
  const k = `${name}:${key}`
  if (firedOnce.has(k)) return
  firedOnce.add(k)
  send(name, props)
}
