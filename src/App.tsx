import { useEffect, useState } from 'react'
import AgeGate from './components/AgeGate'
import Stage from './components/Stage'
import Store from './components/Store'

export default function App() {
  const [landscape, setLandscape] = useState(() => window.innerWidth > window.innerHeight && window.innerWidth >= 900)
  useEffect(() => {
    const f = () => setLandscape(window.innerWidth > window.innerHeight && window.innerWidth >= 900)
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return (
    <>
      <a id="top" />
      <AgeGate />
      <Stage />
      <Store landscape={landscape} />
    </>
  )
}
