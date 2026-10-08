import { useEffect, useState } from 'react'
import AgeGate from './components/AgeGate'
import FilmStage from './components/FilmStage'
import Store from './components/Store'
import StorePage from './pages/StorePage'

const route = () => (window.location.hash.startsWith('#/store') ? 'store' : 'home')

export default function App() {
  const [page, setPage] = useState(route)
  useEffect(() => {
    const f = () => setPage(route())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return (
    <>
      <a id="top" />
      <AgeGate />
      {page === 'store' ? (
        <StorePage />
      ) : (
        <>
          <FilmStage />
          <Store />
        </>
      )}
    </>
  )
}
