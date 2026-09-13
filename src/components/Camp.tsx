import { CAST, DEVICE_FACTS, WILD } from '../data/chapters'
import { useSeen } from '../lib/sightings'
import { track } from '../lib/analytics'
import { STOCKIST_ROUTE } from './StickyCta'



/**
 * Chapter 7. Camp. The only calm frame, so the CTA lands here.
 * The cast is named for the first and only time. Proof pins up here. Real photos only.
 */
export function Camp({ allSeen = false }: { allSeen?: boolean }) {
  const seenList = useSeen()
  const seen = (id: string) => allSeen || seenList.includes(id)
  return (
    <section id="camp" aria-labelledby="camp-title" className="relative bg-[linear-gradient(180deg,#3a2038_0%,#150c1c_45%,#0b0b0b_100%)] px-4 pb-24 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative -mx-4 overflow-hidden sm:mx-0 sm:rounded-3xl sm:border-2 sm:border-ink">
          <img src={`${import.meta.env.BASE_URL}art/camp.jpg`} alt="Camp at dusk. Four chairs by the fire, three of them taken. The fourth has a natural Eco-Star on the arm." width={1080} height={1920} className="h-auto w-full sm:max-h-[85vh] sm:object-cover sm:object-bottom" loading="lazy" />
          <div className="absolute inset-x-0 top-0 p-5 sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gold">Chapter 7</p>
            <h2 id="camp-title" className="display lettering mt-1 text-[clamp(48px,14vw,120px)]">
              Camp.
            </h2>
            <p className="display lettering mt-1 text-[clamp(22px,5vw,36px)]">Everyone off. Pick a seat.</p>
          </div>
        </div>

        {/* THE RANGE, NAMED. Horizontal snap on phones, grid on desktop. */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="The range">
          {CAST.map((c) => (
            <li key={c.strain} className="rounded-2xl border-2 border-ink bg-[#1b1420] p-4">
              <div className="flex items-center gap-3">
                <span className={`inline-block h-10 w-3 rounded-full border border-ink ${c.device === 'black' ? 'bg-[#141414]' : 'bg-[#ede4d0]'}`} aria-hidden="true" />
                <h3 className="display lettering lettering-gold text-[clamp(26px,6vw,34px)] leading-[0.95]">{c.name}</h3>
              </div>
              <p className="mt-3 text-sm text-paper/80">
                {c.who}. {c.species}. <span className="text-paper">{c.format}</span>, {c.device}.
              </p>
              <p className="mt-1 text-sm text-paper/60">{c.note}</p>
            </li>
          ))}
          <li className="rounded-2xl border-2 border-dashed border-gold/60 bg-[#1b1420] p-4">
            <div className="flex items-center gap-3">
              <span className="inline-block h-10 w-3 rounded-full border border-ink bg-[#ede4d0]" aria-hidden="true" />
              <h3 className="display text-[clamp(26px,6vw,34px)] leading-[0.95] text-paper/40">The empty one</h3>
            </div>
            <p className="mt-3 text-sm text-paper/80">Natural, 0.5ml, still warm.</p>
          </li>
        </ul>

        {/* SPOTTED TODAY. The lodge sightings board. The whole range, named once, calmly. */}
        <div className="mt-14 rounded-2xl border-2 border-ink bg-[#f2e6c8] p-5 text-ink shadow-[6px_6px_0_#0b0b0b] sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="display text-[clamp(30px,8vw,52px)] leading-[0.95]">Spotted today</h3>
            <p className="text-sm uppercase tracking-[0.18em] text-ink/60">Ranger&rsquo;s board · tick what you passed</p>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2" aria-label="Sightings board">
            {[...CAST.map((c) => ({ id: c.strain, name: c.name, species: c.species, formats: c.format.replace(' Eco-Star', ''), where: 'In the truck.' })), ...WILD].map((r) => (
              <li key={r.id} className="flex items-start gap-3 border-b border-ink/15 py-2">
                <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-ink ${seen(r.id) ? 'bg-crimson text-paper' : 'bg-transparent'}`} aria-hidden="true">
                  {seen(r.id) ? '✓' : ''}
                </span>
                <span className="flex-1">
                  <span className="display text-[clamp(20px,5vw,26px)] leading-none">{r.name}</span>
                  <span className="ml-2 text-sm text-ink/70">{r.species} · {r.formats}</span>
                  <span className="block text-sm text-ink/60">{r.where}</span>
                </span>
                <span className="visually-hidden">{seen(r.id) ? 'spotted' : 'not spotted'}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* THE CTA. The conversion goal is visit_store: a stockist finder. Route is a placeholder. */}
        <div className="mt-12 rounded-3xl border-2 border-ink bg-gold p-6 text-ink shadow-[6px_6px_0_#0b0b0b] sm:p-10">
          <p className="display text-[clamp(30px,8vw,56px)] leading-[0.95]">Same time tomorrow?</p>
          <p className="mt-3 max-w-lg text-base leading-relaxed">Find the shop near you that has the range in the fridge. Both formats, every strain.</p>
          <a href={STOCKIST_ROUTE} onClick={() => track('cta_click', { location: 'camp' })} className="display mt-6 inline-block rounded-full bg-ink px-8 py-4 text-2xl text-gold shadow-[4px_4px_0_#fffdf7] transition-transform hover:-translate-y-0.5">
            Find a stockist
          </a>
        </div>

        {/* THE DEVICE. Engineering facts in plain type. No effects claims. */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="display text-[clamp(28px,6vw,44px)] text-gold">The device</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-paper/60">Eco-Star. Earth-conscious all-in-one vaporizer.</p>
            <ul className="mt-4 space-y-2 text-base text-paper/90">
              {DEVICE_FACTS.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* PROOF. Nothing invented. Slots wait for real photographs. */}
          <div>
            <h3 className="display text-[clamp(28px,6vw,44px)] text-gold">Where it comes from</h3>
            <p className="mt-2 text-sm text-paper/70">Real place, real people, real press. Slots for real photographs if they exist. Nothing here is generated.</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {['The facility', 'The growers', 'The rosin press', 'The flag seal'].map((t) => (
                <li key={t} className="flex aspect-[4/3] items-end rounded-lg border-2 border-dashed border-paper/25 p-3 text-sm text-paper/60">
                  {t} · photo to come
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
