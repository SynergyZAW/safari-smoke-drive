import { useEffect, useState } from 'react'

const KEY = 'ss-21'

export default function AgeGate() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    try { setOpen(localStorage.getItem(KEY) !== '1') } catch { setOpen(true) }
  }, [])
  if (!open) return null
  const yes = () => {
    try { localStorage.setItem(KEY, '1') } catch { /* private mode */ }
    setOpen(false)
  }
  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="box">
        <p className="display text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--orange)' }}>Rangers only</p>
        <h2 id="gate-title" className="display text-4xl mt-2 leading-none">Are you 21 or older?</h2>
        <p className="mt-3 font-bold text-sm opacity-80">This site is for adults. Please confirm your age to follow the river.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button className="btn" onClick={yes}>Yes, I'm 21+</button>
          <a className="btn ghost" style={{ color: 'var(--ink)', borderColor: 'rgba(27,11,46,0.4)' }} href="https://www.google.com">No</a>
        </div>
      </div>
    </div>
  )
}
