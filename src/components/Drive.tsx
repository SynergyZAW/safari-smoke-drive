import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAPTERS, FILM_SCROLL_VH, SIGHTINGS, WILD } from '../data/chapters'
import { markSeen } from '../lib/sightings'
import { sceneAt, type SceneState } from '../lib/scene'
import { trackOnce } from '../lib/analytics'
import { Scene } from './Scene'
import { CopyLayer } from './CopyLayer'

gsap.registerPlugin(ScrollTrigger)

/**
 * The pinned film. Scroll position is the vehicle's position on the trail.
 * Pinning is CSS sticky (robust on iOS); ScrollTrigger owns progress + refresh.
 * Only the contents of the stage shake. The page never moves.
 */
export function Drive() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 390, h: 844 })
  const [s, setS] = useState<SceneState>(() => sceneAt(0))
  const target = useRef(0)
  const shown = useRef(0)

  useEffect(() => {
    const el = stageRef.current!
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      if (width && height) setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    trackOnce('hero_viewed')
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target.current = self.progress
      },
    })
    let raf = 0
    let last = performance.now()
    let idle = 0
    const loop = (now: number) => {
      const dt = Math.min(60, now - last)
      last = now
      const prev = shown.current
      const diff = target.current - shown.current
      // Inertia: the frame settles 90ms behind the finger, so a hit lands rather than snaps.
      shown.current += diff * Math.min(1, dt / 90)
      const vel = Math.min(1, (Math.abs(shown.current - prev) / (dt / 1000)) * 3)
      if (Math.abs(diff) > 0.00005 || vel > 0.01) {
        idle = 0
        setS(sceneAt(shown.current, vel))
      } else if (idle < 2) {
        idle++
        setS(sceneAt(shown.current, 0))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      st.kill()
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (s.p >= 0.5) trackOnce('story_50_percent')
    if (s.sighting) {
      trackOnce('sighting_viewed', s.sighting, { strain: s.sighting })
      markSeen(s.sighting)
    }
    for (const g of WILD) {
      if (s.p >= g.at) {
        trackOnce('sighting_viewed', g.id, { strain: g.id, wild: true })
        markSeen(g.id)
      }
    }
    void SIGHTINGS
  }, [s.p, s.sighting])

  const { x, y, rot, scaleY } = s.shake
  const chapter = CHAPTERS.find((c) => s.p >= c.from && s.p < c.to) ?? CHAPTERS[CHAPTERS.length - 1]

  return (
    <section
      ref={sectionRef}
      id="drive"
      aria-label="The drive"
      style={{ height: `${FILM_SCROLL_VH}vh` }}
      className="relative"
      data-chapter={chapter.id}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-ink">
        {/* Shake wrapper: transforms + opacity only. Contents move, never the page. */}
        <div
          ref={stageRef}
          className="absolute inset-0"
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scaleY(${scaleY})`,
            transformOrigin: '50% 100%',
            willChange: 'transform',
          }}
        >
          <Scene s={s} w={size.w} h={size.h} uid="film" />
        </div>
        <CopyLayer p={s.p} portrait={size.h > size.w * 1.1} />
        {/* trail progress: a thin gold line, the only chrome on the film */}
        <div className="pointer-events-none absolute left-0 top-0 h-[3px] bg-gold" style={{ width: `${s.p * 100}%`, opacity: 0.9 }} aria-hidden="true" />
        <p
          className="pointer-events-none absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-0 right-0 text-center text-sm tracking-wide text-paper/90"
          style={{ opacity: s.p < 0.015 ? 1 : 0, transition: 'opacity 300ms' }}
          aria-hidden={s.p >= 0.015}
        >
          Scroll to drive ↓
        </p>
      </div>
    </section>
  )
}
