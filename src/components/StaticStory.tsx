import { useEffect, useRef, useState } from 'react'
import { CHAPTERS } from '../data/chapters'
import { sceneAt } from '../lib/scene'
import { Scene } from './Scene'

function Still({ p, uid }: { p: number; uid: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 360, h: 640 })
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      if (width && height) setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(ref.current!)
    return () => ro.disconnect()
  }, [])
  const s = sceneAt(p, 0)
  return (
    <div ref={ref} className="aspect-[9/16] w-full overflow-hidden rounded-2xl border-2 border-ink sm:aspect-[16/9]">
      <Scene s={{ ...s, shake: { x: 0, y: 0, rot: 0, scaleY: 1 } }} w={size.w} h={size.h} uid={uid} />
    </div>
  )
}

/**
 * Reduced motion / low bandwidth: one static key frame per chapter, all copy and the CTA kept.
 * Nothing moves. Nothing is lost.
 */
export function StaticStory() {
  return (
    <section aria-label="The drive, as stills" className="bg-ink px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl space-y-14">
        {CHAPTERS.map((c) => (
          <article key={c.id} aria-labelledby={`still-${c.id}`}>
            <p className="text-sm uppercase tracking-[0.2em] text-gold">Chapter {c.n}</p>
            <h2 id={`still-${c.id}`} className="visually-hidden">
              {c.title}
            </h2>
            <div className="mt-3">
              <Still p={c.still} uid={`still-${c.id}`} />
            </div>
            <div className="mt-4 space-y-2">
              {c.copy.map((l) => (
                <p key={l.id} className={`display lettering ${l.size === 'beat' ? 'text-[clamp(26px,7vw,48px)]' : 'text-[clamp(34px,9vw,64px)]'}`}>
                  {l.text}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
