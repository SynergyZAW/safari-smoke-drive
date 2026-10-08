import { useEffect, useMemo, useState } from 'react'
import { fetchCatalogue, groupByStrain, money, HERO_STRAINS, STRAIN_ART, GENERIC_VAPE_IMAGE, type CatalogueItem, type Line } from '../lib/catalogue'

function Buy({ item }: { item?: CatalogueItem }) {
  // Phase 1: no payment on the site. Phase 2 hands off to the ecosystem checkout.
  if (item?.inStock === false) return <span className="btn ghost soon text-sm">Out of stock</span>
  return <span className="btn soon text-sm">Coming soon</span>
}

export default function StorePage() {
  const [items, setItems] = useState<CatalogueItem[]>([])
  const [live, setLive] = useState(false)
  const [line, setLine] = useState<Line>('vapes')
  const [q, setQ] = useState('')

  useEffect(() => {
    fetchCatalogue().then((r) => { setItems(r.items); setLive(r.live) })
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return items.filter((i) => i.line === line && (!needle || `${i.name} ${i.strain ?? ''} ${i.flavour ?? ''}`.toLowerCase().includes(needle)))
  }, [items, line, q])
  const strains = useMemo(() => groupByStrain(filtered.filter((i) => i.line === 'vapes')), [filtered])

  return (
    <main className="store min-h-screen" id="store">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16">
        <div className="flex items-center justify-between">
          <a className="wordmark" href="#top" style={{ position: 'static' }}>Safari Smoke</a>
          <a className="btn ghost text-sm" href="#top">Back to the trading post</a>
        </div>

        <p className="display text-sm tracking-[0.2em] uppercase mt-10" style={{ color: 'var(--lime)' }}>The store</p>
        <h1 className="display text-5xl md:text-7xl leading-none mt-2">The whole range</h1>
        <p className="mt-4 max-w-xl font-bold opacity-90">
          {live ? 'Live prices and stock from the counter.' : 'Prices and stock are on their way. Checkout opens soon.'}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 items-center">
          <button className={`btn ${line === 'vapes' ? '' : 'ghost'}`} onClick={() => setLine('vapes')}>Vapes</button>
          <button className={`btn ${line === 'gummies' ? '' : 'ghost'}`} onClick={() => setLine('gummies')}>Gummies</button>
          <input
            className="ml-auto rounded-full px-4 py-2 font-bold bg-transparent border border-white/30 text-inherit w-full sm:w-64"
            placeholder={line === 'vapes' ? 'Search strains' : 'Search flavours'}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
        </div>

        {line === 'vapes' ? (
          <section className="mt-8">
            <p className="font-bold opacity-80">Eco-Star Live Rosin Disposables. {strains.length} strains, in 0.5 ml, 1 ml or both.</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {strains.map(({ strain, skus }) => (
                <article key={strain} className="card">
                  <img src={HERO_STRAINS[strain] ?? STRAIN_ART[strain] ?? GENERIC_VAPE_IMAGE} alt={`${strain} Eco-Star`} loading="lazy" style={{ aspectRatio: '3 / 4', objectFit: 'cover' }} />
                  <div className="p-4">
                    {HERO_STRAINS[strain] && <p className="text-xs font-bold uppercase tracking-widest opacity-60">Ranger's pick</p>}
                    <h3 className="display text-2xl leading-tight">{strain}</h3>
                    <ul className="mt-3 space-y-2">
                      {skus.map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-2 text-sm font-bold">
                          <span>{s.size}{money(s.retailPriceCents) ? ` · ${money(s.retailPriceCents)}` : ''}</span>
                          <Buy item={s} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            {strains.length === 0 && <p className="mt-6 font-bold opacity-70">No strains match.</p>}
          </section>
        ) : (
          <section className="mt-8">
            <p className="font-bold opacity-80">Safari Snaxx Premium Gummies. Fast-acting, full-spectrum rosin. 50 g bags of ten, 20 mg each.</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((g) => (
                <article key={g.id} className="card">
                  <img src={g.image} alt={`${g.flavour} gummy`} loading="lazy" />
                  <div className="p-4">
                    <h3 className="display text-2xl">{g.flavour}</h3>
                    <p className="text-xs font-bold opacity-60 mt-2">{g.size}{money(g.retailPriceCents) ? ` · ${money(g.retailPriceCents)}` : ''}</p>
                    <div className="mt-4"><Buy item={g} /></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-20 text-xs font-bold opacity-70 leading-relaxed">
          <p>Safari Smoke. 21+ only. Keep out of reach of children and pets. Do not drive or operate machinery after use.</p>
          <p className="mt-2">Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </footer>
      </div>
    </main>
  )
}
