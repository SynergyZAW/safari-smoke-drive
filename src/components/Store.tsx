import { PRODUCTS, VAPES } from '../data/scene'

export default function Store() {
  return (
    <section className="store" id="store">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 relative">
        <p className="display text-sm tracking-[0.2em] uppercase" style={{ color: 'var(--lime)' }}>The trading post</p>
        <h2 className="display text-5xl md:text-7xl leading-none mt-2">Everything on the counter.</h2>
        <p className="mt-4 max-w-xl font-bold opacity-90">
          Safari Snaxx premium gummies. Fast-acting, full-spectrum rosin. 50 g bags of ten, 20 mg full spectrum each.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="card">
              <img src={p.img} alt={`${p.name} gummy`} loading="lazy" />
              <div className="p-4">
                <h3 className="display text-2xl">{p.name}</h3>
                <p className="text-sm font-bold opacity-80 mt-1">{p.blurb}</p>
                <p className="text-xs font-bold opacity-60 mt-2">10 × 20 mg full spectrum · 50 g</p>
                <span className="btn soon mt-4" data-product={p.id}>Coming soon</span>
              </div>
            </article>
          ))}
        </div>

        <h2 className="display text-4xl md:text-5xl mt-16">Live rosin vapes</h2>
        <p className="mt-3 max-w-xl font-bold opacity-90">The Eco-Star, in 0.5 ml and 1 ml. Three rangers up front, the whole range in the store.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {VAPES.map((v) => (
            <article key={v.id} className="card p-5 flex items-center gap-4">
              <img src={v.img} alt={`${v.mascot} with the Eco-Star`} loading="lazy" className="shrink-0 rounded-xl" style={{ width: '6rem', height: '8rem', aspectRatio: 'auto', objectFit: 'cover' }} />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">{v.mascot}</p>
                <h3 className="display text-2xl leading-tight">{v.name}</h3>
                <p className="text-sm font-bold opacity-80 mt-1">{v.blurb}</p>
                <span className="btn ghost soon mt-3 text-sm" data-product={v.id}>Coming soon</span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8"><a className="btn" href="#/store">See the full range</a></p>

        <footer className="mt-20 text-xs font-bold opacity-70 leading-relaxed">
          <p>Safari Smoke. 21+ only. Keep out of reach of children and pets. Do not drive or operate machinery after use.</p>
          <p className="mt-2">Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </footer>
      </div>
    </section>
  )
}
