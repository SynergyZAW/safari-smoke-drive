/**
 * The film manifest: per-beat frame sequences scrubbed by scroll progress.
 * public/film/manifest.json is written by scripts/extract-frames.mjs. Absent = pre-viz animatic.
 */
export interface Beat {
  beat: string
  from: number
  to: number
  frames: number
  dir: string
}
export interface Manifest {
  fps: number
  width: number
  height: number
  beats: Beat[]
}

export async function loadManifest(wide = false): Promise<Manifest | null> {
  // Landscape viewports get the reframed 16:9 set when it exists, otherwise the portrait master (cover-fit).
  if (wide) {
    const m = await fetchManifest('film-wide')
    if (m) return m
  }
  return fetchManifest('film')
}

async function fetchManifest(dir: string): Promise<Manifest | null> {
  try {
    const r = await fetch(`${import.meta.env.BASE_URL}${dir}/manifest.json`, { cache: 'force-cache' })
    if (!r.ok) return null
    const m = (await r.json()) as Manifest
    return m.beats?.length ? m : null
  } catch {
    return null
  }
}

export function frameFor(m: Manifest, p: number): { beat: Beat; index: number } | null {
  const f = framePos(m, p)
  return f && { beat: f.beat, index: f.index }
}

/** Frame position with the fraction toward the next frame, so the stage can cross-fade between the two. */
export function framePos(m: Manifest, p: number): { beat: Beat; index: number; frac: number } | null {
  const beat = m.beats.find((b) => p >= b.from && p < b.to) ?? (p >= 1 ? m.beats[m.beats.length - 1] : null)
  if (!beat) return null
  const t = Math.min(1, Math.max(0, (p - beat.from) / (beat.to - beat.from)))
  const pos = t * (beat.frames - 1)
  const index = Math.min(beat.frames - 1, Math.floor(pos))
  return { beat, index, frac: index >= beat.frames - 1 ? 0 : pos - index }
}

export function frameUrl(beat: Beat, index: number) {
  return `${import.meta.env.BASE_URL}${beat.dir}/f_${String(index + 1).padStart(4, '0')}.webp`
}
export function posterUrl(beat: Beat) {
  return `${import.meta.env.BASE_URL}${beat.dir}/poster.jpg`
}

/** Lazy per-beat frame cache. The first beat preloads; the rest load when their beat is within reach. */
export class FrameCache {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_m: Manifest) {}
  private imgs = new Map<string, HTMLImageElement>()
  private loading = new Set<string>()
  get(beat: Beat, index: number): HTMLImageElement | null {
    const url = frameUrl(beat, index)
    const im = this.imgs.get(url)
    if (im && im.complete && im.naturalWidth) return im
    if (!im) this.load(url)
    return null
  }
  private load(url: string) {
    if (this.loading.has(url)) return
    this.loading.add(url)
    const im = new Image()
    im.decoding = 'async'
    im.src = url
    this.imgs.set(url, im)
  }
  /** Preload every frame of a beat (called for the current beat and the next). */
  warm(beat: Beat) {
    for (let i = 0; i < beat.frames; i++) this.load(frameUrl(beat, i))
  }
  nearest(beat: Beat, index: number): HTMLImageElement | null {
    // fall back to the closest loaded frame so scrubbing never blanks
    for (let d = 0; d < beat.frames; d++) {
      for (const i of [index - d, index + d]) {
        if (i < 0 || i >= beat.frames) continue
        const im = this.imgs.get(frameUrl(beat, i))
        if (im && im.complete && im.naturalWidth) return im
      }
    }
    return null
  }
}
