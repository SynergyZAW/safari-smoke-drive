import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BEATS, FILM, SCROLL_VH } from '../data/film'
import { FrameSet, drawCover, type Manifest } from '../lib/film'
import { clamp01, window01 } from '../lib/camera'

gsap.registerPlugin(ScrollTrigger)

type Layout = 'portrait' | 'landscape'
const pick = (): Layout => (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')

export default function FilmStage() {
  const [layout, setLayout] = useState<Layout>(pick)
  const [ready, setReady] = useState(false)
  const [missing, setMissing] = useState(false)
  const journey = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const progress = useRef(0)
  const set = useRef<FrameSet | null>(null)
  const drawn = useRef(-1)

  useEffect(() => {
    const f = () => setLayout(pick())
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])

  // load the film for this layout
  useEffect(() => {
    let alive = true
    setReady(false); setMissing(false); drawn.current = -1
    // fall back to the other orientation's film while this one is not rendered yet
    const dirs = layout === 'portrait' ? [FILM.portrait, FILM.landscape] : [FILM.landscape, FILM.portrait]
    const tryDir = async (): Promise<{ dir: string; m: Manifest }> => {
      for (const dir of dirs) {
        try {
          const r = await fetch(`${dir}/manifest.json`, { cache: 'no-cache' })
          if (!r.ok) continue
          const m = await r.json() // an SPA fallback page is not JSON and lands in the catch
          if (m && typeof m.count === 'number') return { dir, m }
        } catch { /* try the next one */ }
      }
      throw new Error('no film')
    }
    tryDir()
      .then(({ dir, m }) => {
        if (!alive) return
        const fs = new FrameSet(dir, m, () => render(true))
        set.current = fs
        fs.load(0).then(() => { if (alive) { setReady(true); render(true) } })
        fs.loadAll()
      })
      .catch(() => { if (alive) setMissing(true) })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout])

  const render = (force = false) => {
    const cv = canvas.current, fs = set.current
    if (!cv || !fs) return
    const p = progress.current
    const i = Math.min(fs.m.count - 1, Math.floor(p * (fs.m.count - 1)))
    if (!force && i === drawn.current) return
    const im = fs.nearest(i)
    if (!im) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = Math.round(window.innerWidth * dpr), ch = Math.round(window.innerHeight * dpr)
    if (cv.width !== cw || cv.height !== ch) { cv.width = cw; cv.height = ch }
    const ctx = cv.getContext('2d')!
    drawCover(ctx, im, cw, ch)
    drawn.current = i
    BEATS.forEach((b, k) => {
      const el = cards.current[k]
      if (!el) return
      const v = window01(p, b.at[0], b.at[1], 0.25)
      el.style.opacity = String(v)
      el.style.transform = `translateY(${(1 - v) * 24}px)`
      el.style.pointerEvents = v > 0.5 ? 'auto' : 'none'
    })
  }

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: journey.current!,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => { progress.current = clamp01(self.progress); render() },
      onRefresh: () => render(true),
    })
    const onResize = () => render(true)
    window.addEventListener('resize', onResize)
    return () => { st.kill(); window.removeEventListener('resize', onResize) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="journey" ref={journey} style={{ height: `${SCROLL_VH}vh` }}>
      <div className="stage" style={{ position: 'sticky', top: 0 }}>
        <canvas ref={canvas} className="film" />
        {!ready && !missing && <div className="loading display">Loading the trading post…</div>}
        {missing && <div className="loading display">Film not rendered yet for this screen shape.</div>}
        <div className="hud">
          <div className="brand">
            <a className="wordmark" href="#top">Safari Smoke</a>
            <a className="pill" href="#store">Store</a>
          </div>
          {BEATS.map((b, k) => (
            <div key={b.id} className={`card-beat ${b.align ?? 'left'}`} ref={(n) => { cards.current[k] = n }}>
              {b.kicker && <p className="kicker">{b.kicker}</p>}
              <h2 className={b.id === 'title' ? 'hero' : ''}>{b.title}</h2>
              {b.body && <p>{b.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
