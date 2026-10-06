import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CAMERA, MASTER, STATIONS, type Layout } from '../data/scene'
import { clamp01, sampleCamera, window01 } from '../lib/camera'

gsap.registerPlugin(ScrollTrigger)

const SCROLL_LENGTH = 520 // vh of scroll for the river journey
const DROP_FRAMES = 60 // keyed frames of the Seedance tumble, /img/drop/f00..f59
const DROP_TURNS = 3 // full tumbles over the journey

function useLayout(): Layout {
  const get = () => (window.innerWidth > window.innerHeight && window.innerWidth >= 900 ? 'landscape' : 'portrait')
  const [layout, setLayout] = useState<Layout>(get)
  useEffect(() => {
    const onResize = () => setLayout(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return layout
}

export default function Stage() {
  const layout = useLayout()
  const master = MASTER[layout]
  const stations = STATIONS[layout]
  const debug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug')

  const journey = useRef<HTMLDivElement>(null)
  const world = useRef<HTMLDivElement>(null)
  const drop = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const frames = useRef<HTMLImageElement[]>([])
  const lastFrame = useRef(-1)
  const splash = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  const notes = useRef<(HTMLDivElement | null)[]>([])
  const progress = useRef(0)

  useEffect(() => {
    frames.current = Array.from({ length: DROP_FRAMES }, (_, i) => {
      const im = new Image()
      im.src = `/img/drop/f${String(i).padStart(2, '0')}.webp`
      return im
    })
    lastFrame.current = -1
  }, [])

  useLayoutEffect(() => {
    const el = world.current!
    const path = CAMERA[layout]
    const aspect = master.w / master.h

    // World size: the master covers the viewport at zoom 1.
    let W = 0, H = 0
    const size = () => {
      const vw = window.innerWidth, vh = window.innerHeight
      W = Math.max(vw, vh * aspect)
      H = W / aspect
      el.style.width = `${W}px`
      el.style.height = `${H}px`
    }
    size()

    const render = () => {
      const p = progress.current
      const vw = window.innerWidth, vh = window.innerHeight
      const c = sampleCamera(path, p)
      // keep the camera inside the image
      const halfW = vw / (2 * c.z * W), halfH = vh / (2 * c.z * H)
      const cx = Math.min(1 - halfW, Math.max(halfW, c.x))
      const cy = Math.min(1 - halfH, Math.max(halfH, c.y))
      const tx = vw / 2 - cx * W * c.z
      const ty = vh / 2 - cy * H * c.z
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${c.z})`

      // The Drop: tumbles down the screen for most of the journey, then drops into the jar on the kiosk.
      const d = drop.current!
      const jar = master.jar
      const jarX = tx + jar.x * W * c.z, jarY = ty + jar.y * H * c.z
      const jarW = (layout === 'portrait' ? 0.085 : 0.045) * W * c.z // jar mouth width on screen
      const fall = clamp01((p - 0.04) / 0.8)
      const sway = Math.sin(p * Math.PI * 5) * vw * 0.16 * (1 - clamp01((p - 0.78) / 0.1))
      const sizePx = Math.min(vw, vh) * (layout === 'portrait' ? 0.24 : 0.14)
      const scale = sizePx / 120
      let x = vw * 0.5 + sway, y = vh * (0.2 + 0.45 * fall)
      let s = scale, o = 1
      if (p > 0.86) {
        // glide to a point above the jar, then fall straight in
        const t = clamp01((p - 0.86) / 0.07)
        const e = t * t * (3 - 2 * t)
        const hoverY = jarY - vh * (layout === 'portrait' ? 0.3 : 0.36)
        x = x + (jarX - x) * e
        y = y + (hoverY - y) * e
        const endScale = (jarW * 0.9) / 120
        s = scale + (endScale - scale) * e
        if (p > 0.95) {
          // fall through the mouth and settle at the bottom of the jar, seen through the glass
          const f = clamp01((p - 0.95) / 0.04)
          const restY = jarY + jarW * (layout === 'portrait' ? 1.15 : 0.95)
          x = jarX + jarW * 0.12 * f
          y = hoverY + (restY - hoverY) * f * f
          s = endScale * (1 - 0.15 * f)
          o = 1 - 0.3 * clamp01((y - jarY) / (restY - jarY))
        }
      }
      d.style.opacity = String(p < 0.03 ? p / 0.03 : o)
      d.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
      const fi = Math.floor(p * DROP_FRAMES * DROP_TURNS) % DROP_FRAMES
      if (fi !== lastFrame.current) {
        const im = frames.current[fi]
        const cv = canvas.current
        if (im && cv && im.complete && im.naturalWidth) {
          const ctx = cv.getContext('2d')!
          ctx.clearRect(0, 0, cv.width, cv.height)
          ctx.drawImage(im, 0, 0, cv.width, cv.height)
          lastFrame.current = fi
        }
      }
      // plink: a ring at the jar mouth as it lands
      const sp = splash.current!
      const st = clamp01((p - 0.972) / 0.02)
      sp.style.opacity = String(st > 0 ? (1 - st) * 0.9 : 0)
      sp.style.transform = `translate3d(${jarX}px, ${jarY}px, 0) scale(${(0.3 + 0.9 * st) * (jarW / 160)})`

      // HUD
      const tf = 1 - clamp01(p / 0.09)
      title.current!.style.opacity = String(tf)
      title.current!.style.transform = `translateY(${(1 - tf) * -40}px)`
      cue.current!.style.opacity = String(1 - clamp01(p / 0.05))
      stations.forEach((s, i) => {
        const n = notes.current[i]
        if (!n) return
        const v = window01(p, s.note[0], s.note[1], 0.22)
        n.style.opacity = String(v)
        n.style.transform = `translateY(${(1 - v) * 28}px)`
        n.style.pointerEvents = v > 0.5 ? 'auto' : 'none'
      })
    }

    const st = ScrollTrigger.create({
      trigger: journey.current!,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        progress.current = self.progress
        render()
      },
      onRefresh: () => { size(); render() },
    })
    render()
    return () => st.kill()
  }, [layout, master, stations])

  return (
    <div className="journey" ref={journey} style={{ height: `${SCROLL_LENGTH}vh` }}>
      <div className="stage" style={{ position: 'sticky', top: 0 }}>
        <div className="world" ref={world}>
          <img className="master" src={master.src} width={master.w} height={master.h} alt="" draggable={false} />
          {stations.map((s) =>
            s.src ? (
              <div key={s.id} className="station" style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: `${s.w * 100}%` }}>
                <img src={s.src} alt="" draggable={false} />
              </div>
            ) : debug ? (
              <div key={s.id} className="station vape-pending display" style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: `${s.w * 100}%` }}>
                vape crew
              </div>
            ) : null,
          )}
          {debug && stations.map((s) => <div key={`d-${s.id}`} className="debug-dot" style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }} />)}
          {debug && <div className="debug-dot" style={{ left: `${master.jar.x * 100}%`, top: `${master.jar.y * 100}%`, background: '#1be0ff' }} />}
        </div>

        <div className="splash" ref={splash} />
        <div className="drop" ref={drop}>
          <canvas ref={canvas} width={320} height={320} />
        </div>

        <div className="hud">
          <div className="brand">
            <a className="wordmark" href="#top">Safari Smoke</a>
            <a className="pill" href="#store">Shop</a>
          </div>
          <div className="title" ref={title}>
            <h1>
              Safari <span>Snaxx</span>
            </h1>
            <p>Follow the river down to the watering hole.</p>
          </div>
          <div className="scroll-cue" ref={cue}>scroll</div>
          {stations.map((s, i) => (
            <div key={s.id} className="note" ref={(n) => { notes.current[i] = n }}>
              {s.swatch && (
                <div className="swatch">
                  <img src={s.swatch} alt="" />
                </div>
              )}
              <p className="kicker">{s.kicker}</p>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
