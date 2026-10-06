import { PRODUCTS, STORE_URL, VAPES } from '../data/scene'

export default function Store() {
  return (
    <section className="store" id="store">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 relative">
        <p className="display text-sm tracking-[0.2em] uppercase" style={{ color: 'var(--lime)' }}>The watering hole</p>
        <h2 className="display text-5xl md:text-7xl leading-none mt-2">Drink up.</h2>
        <p className="mt-4 max-w-xl font-bold opacity-90">
          Safari Snaxx premium gummies. Fast-acting, full-spectrum rosin. 50 g bags of ten, 20 mg each.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="card">
              <img src={p.img} alt={`${p.name} gummy`} loading="lazy" />
              <div className="p-4">
                <h3 className="display text-2xl">{p.name}</h3>
                <p className="text-sm font-bold opacity-80 mt-1">{p.blurb}</p>
                <p className="text-xs font-bold opacity-60 mt-2">10 × 20 mg · 50 g</p>
                <a className="btn mt-4" href={STORE_URL} data-product={p.id}>Shop</a>
              </div>
            </article>
          ))}
        </div>

        <h2 className="display text-4xl md:text-5xl mt-16">Live rosin vapes</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {VAPES.map((v) => (
            <article key={v.id} className="card p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="display text-2xl">{v.name}</h3>
                <p className="text-sm font-bold opacity-80 mt-1">{v.blurb}</p>
              </div>
              <a className="btn ghost" href={STORE_URL} data-product={v.id}>Shop</a>
            </article>
          ))}
        </div>

        <footer className="mt-20 text-xs font-bold opacity-70 leading-relaxed">
          <p>Safari Smoke. 21+ only. Keep out of reach of children and pets. Do not drive or operate machinery after use.</p>
          <p className="mt-2">Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </footer>
      </div>
    </section>
  )
}
