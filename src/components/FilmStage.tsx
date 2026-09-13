import { useEffect, useRef } from 'react'
import { FrameCache, framePos, posterUrl, type Manifest } from '../lib/film'

/**
 * The real film: a canvas that draws the frame for the current scroll progress.
 * Portrait master frames are drawn cover-fit, so landscape viewports crop the sides
 * (the recompose for 16:9 is a later pass with its own sequences).
 */
export function FilmStage({ m, p, w, h }: { m: Manifest; p: number; w: number; h: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const cache = useRef<FrameCache | null>(null)
  const posters = useRef(new Map<string, HTMLImageElement>())

  useEffect(() => {
    cache.current = new FrameCache(m)
    cache.current.warm(m.beats[0])
    for (const b of m.beats) {
      const im = new Image()
      im.src = posterUrl(b)
      posters.current.set(b.beat, im)
    }
  }, [m])

  useEffect(() => {
    const cv = ref.current
    const c = cache.current
    if (!cv || !c) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
    }
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const f = framePos(m, p)
    if (!f) return
    // warm this beat and the next
    c.warm(f.beat)
    const ni = m.beats.indexOf(f.beat) + 1
    if (ni < m.beats.length) c.warm(m.beats[ni])
    const im = c.get(f.beat, f.index) ?? c.nearest(f.beat, f.index) ?? posters.current.get(f.beat.beat) ?? null
    if (!im || !im.naturalWidth) return
    const cover = (img: HTMLImageElement) => {
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight)
      const dw = img.naturalWidth * s
      const dh = img.naturalHeight * s
      ctx.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh)
    }
    ctx.globalAlpha = 1
    cover(im)
    // Cross-fade toward the next frame by the fractional position, so a slow thumb glides instead of stepping.
    if (f.frac > 0.02) {
      const nx = c.get(f.beat, f.index + 1)
      if (nx) {
        ctx.globalAlpha = f.frac
        cover(nx)
        ctx.globalAlpha = 1
      }
    }
  }, [m, p, w, h])

  return <canvas ref={ref} style={{ width: w, height: h, display: 'block' }} aria-hidden="true" />
}
