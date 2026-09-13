import { useSyncExternalStore } from 'react'

/**
 * What you have spotted on the drive. Feeds the "Spotted today" board at camp,
 * the way a lodge sightings board does. Reset on reload on purpose: it is a game drive, not a save file.
 */
const seen = new Set<string>()
const subs = new Set<() => void>()
let snapshot: string[] = []

export function markSeen(id: string) {
  if (seen.has(id)) return
  seen.add(id)
  snapshot = [...seen]
  subs.forEach((f) => f())
}

export function useSeen(): string[] {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => snapshot,
    () => snapshot,
  )
}
