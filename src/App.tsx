import { useEffect, useState } from 'react'
import { AgeGate } from './components/AgeGate'
import { Drive } from './components/Drive'
import { Camp } from './components/Camp'
import { Afterglow } from './components/Afterglow'
import { StaticStory } from './components/StaticStory'
import { StickyCta } from './components/StickyCta'
import { Stockists } from './components/Stockists'
import { track, trackOnce } from './lib/analytics'
import { isLowBandwidth, readAge, usePrefersReducedMotion, type AgeState } from './lib/prefs'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export default function App() {
  const [age, setAge] = useState<AgeState>(() => readAge())
  const reduced = usePrefersReducedMotion()
  const [stills] = useState(() => isLowBandwidth())
  const [ctaVisible, setCtaVisible] = useState(false)
  const route = useHashRoute()

  useEffect(() => {
    track('page_view')
  }, [])

  useEffect(() => {
    if (age !== 'ok') return
    if (reduced) trackOnce('reduced_motion_used')
    if (stills) trackOnce('video_fallback_activated')
  }, [age, reduced, stills])

  // Sticky CTA: from chapter 2 onward. Read chapter from the drive section's data attribute.
  useEffect(() => {
    if (age !== 'ok') return
    let raf = 0
    const check = () => {
      const drive = document.getElementById('drive')
      const ch = drive?.dataset.chapter
      const past = drive ? drive.getBoundingClientRect().bottom < window.innerHeight : true
      setCtaVisible(reduced || stills || past || (!!ch && ch !== 'cough'))
      raf = requestAnimationFrame(check)
    }
    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [age, reduced, stills])

  if (age !== 'ok') return <AgeGate state={age} onResolve={setAge} />
  if (route === '#/stockists') return <Stockists />

  const staticMode = reduced || stills

  return (
    <>
      <a href="#camp" className="visually-hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip the drive, go to camp
      </a>
      <main>
        {staticMode ? <StaticStory /> : <Drive />}
        <Camp allSeen={staticMode} />
        <Afterglow />
      </main>
      <StickyCta visible={ctaVisible} />
    </>
  )
}
