import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { writeAge, type AgeState } from '../lib/prefs'

/**
 * A real barrier. 21+, matching the pack. Remembered per device (30 days on yes, this session on no).
 * Full keyboard path: focus is trapped, Tab cycles the two buttons, Escape does nothing.
 */
export function AgeGate({ state, onResolve }: { state: AgeState; onResolve: (s: AgeState) => void }) {
  const yesRef = useRef<HTMLButtonElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(state === 'no')

  useEffect(() => {
    yesRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !boxRef.current) return
      const f = boxRef.current.querySelectorAll<HTMLElement>('button, a[href]')
      if (f.length === 0) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => {
      document.removeEventListener('keydown', trap)
      document.body.style.overflow = prevOverflow
    }
  }, [failed])

  const yes = () => {
    writeAge('ok')
    track('age_gate_passed')
    onResolve('ok')
  }
  const no = () => {
    writeAge('no')
    track('age_gate_failed')
    setFailed(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="age-title" aria-describedby="age-desc">
      <div ref={boxRef} className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}brand/safari-smoke-logo.jpeg`} alt="Safari Smoke" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
          <p className="display text-2xl text-gold">Safari Smoke</p>
        </div>
        {!failed ? (
          <>
            <h1 id="age-title" className="display lettering text-[clamp(44px,14vw,96px)]">
              21 or over?
            </h1>
            <p id="age-desc" className="mt-4 max-w-sm text-base leading-relaxed text-paper/85">
              Safari Smoke is for adults. South African live rosin. We remember your answer on this device.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button ref={yesRef} type="button" onClick={yes} className="display rounded-full bg-gold px-8 py-4 text-2xl text-ink shadow-[4px_4px_0_#0b0b0b] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                Yes. Get in.
              </button>
              <button type="button" onClick={no} className="display rounded-full border-2 border-paper/40 px-8 py-4 text-2xl text-paper">
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 id="age-title" className="display lettering text-[clamp(40px,12vw,84px)]">
              Not yet.
            </h1>
            <p id="age-desc" className="mt-4 max-w-sm text-base leading-relaxed text-paper/85">
              Come back when you are 21. The truck will still be here. Probably in a ditch.
            </p>
            <a href="https://www.google.com" className="mt-8 inline-block rounded-full border-2 border-paper/40 px-6 py-3 text-paper">
              Leave
            </a>
          </>
        )}
      </div>
    </div>
  )
}
