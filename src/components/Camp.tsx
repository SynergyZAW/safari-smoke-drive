import { CAST, DEVICE_FACTS } from '../data/chapters'
import { track } from '../lib/analytics'
import { STOCKIST_ROUTE } from './StickyCta'

const INK = '#0b0b0b'
const GOLD = '#c99a2e'
const CRIMSON = '#d8253f'

/** A mascot in a camp chair, device in hand, window glowing. Pre-viz silhouette. */
function Figure({ kind, device }: { kind: 'ape' | 'monkey' | 'rhino' | 'empty'; device: 'black' | 'natural' }) {
  const body = kind === 'ape' ? '#e0842a' : kind === 'monkey' ? CRIMSON : '#8a6b3c'
  const fur = kind === 'rhino' ? '#5a5754' : '#1a1410'
  const devFill = device === 'black' ? '#141414' : '#ede4d0'
  return (
    <svg viewBox="0 0 200 220" className="h-auto w-full" role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`rosin-${kind}`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff2a8" />
          <stop offset="0.55" stopColor="#f6c945" />
          <stop offset="1" stopColor="#d9a520" />
        </radialGradient>
        <filter id={`glow-${kind}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* camp chair */}
      <path d="M40 120 L60 200 M160 120 L140 200 M50 150 L150 150 M60 200 L140 200" stroke={INK} strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="45" y="112" width="110" height="14" rx="7" fill={GOLD} stroke={INK} strokeWidth="4" />
      {kind !== 'empty' ? (
        <>
          <ellipse cx="100" cy="125" rx="46" ry="26" fill={body} stroke={INK} strokeWidth="4" />
          <rect x="70" y="96" width="60" height="40" rx="18" fill={body} stroke={INK} strokeWidth="4" />
          <circle cx="100" cy="72" r={kind === 'ape' ? 30 : 26} fill={fur} />
          {kind === 'ape' && (
            <>
              <rect x="66" y="48" width="68" height="8" rx="4" fill={GOLD} stroke={INK} strokeWidth="3" />
              <path d="M80 48 q20 -26 40 0 z" fill={GOLD} stroke={INK} strokeWidth="3" />
              <rect x="78" y="66" width="18" height="9" rx="3" fill="#222" stroke={INK} strokeWidth="2" />
              <rect x="104" y="66" width="18" height="9" rx="3" fill="#222" stroke={INK} strokeWidth="2" />
            </>
          )}
          {kind === 'monkey' && (
            <>
              <path d="M74 60 l52 0 l0 -10 l-52 0 z" fill="#2f5d3a" stroke={INK} strokeWidth="2" />
              <path d="M140 130 q30 20 10 60" stroke={fur} strokeWidth="7" fill="none" strokeLinecap="round" />
            </>
          )}
          {kind === 'rhino' && (
            <>
              <path d="M112 62 l16 -30 l4 32 z" fill="#3d3a37" stroke={INK} strokeWidth="2" />
              <path d="M62 52 q38 -22 76 0 z" fill="#8a6b3c" stroke={INK} strokeWidth="3" />
              <rect x="58" y="50" width="84" height="7" rx="3" fill="#8a6b3c" stroke={INK} strokeWidth="2" />
              <circle cx="90" cy="72" r="2.5" fill="#fff" />
              <circle cx="108" cy="72" r="2.5" fill="#fff" />
            </>
          )}
          {/* hand + device */}
          <circle cx="146" cy="118" r="12" fill={fur} />
          <g transform="translate(150 106) rotate(-12)">
            <rect x="-6" y="-24" width="12" height="48" rx="5" fill={devFill} stroke={INK} strokeWidth="2" />
            {device === 'natural' && <rect x="-6" y="17" width="12" height="7" rx="3" fill="#8d8378" />}
            <circle cx="0" cy="-8" r="3.6" fill={`url(#rosin-${kind})`} filter={`url(#glow-${kind})`} />
            <circle cx="0" cy="-8" r="3.6" fill="none" stroke="#fff2a8" strokeWidth="0.8" />
          </g>
        </>
      ) : (
        <g transform="translate(150 118) rotate(70)">
          <rect x="-6" y="-24" width="12" height="48" rx="5" fill={devFill} stroke={INK} strokeWidth="2" />
          <rect x="-6" y="17" width="12" height="7" rx="3" fill="#8d8378" />
          <circle cx="0" cy="-8" r="3.6" fill={`url(#rosin-${kind})`} filter={`url(#glow-${kind})`} />
          <circle cx="0" cy="-8" r="3.6" fill="none" stroke="#fff2a8" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  )
}

const KIND: Record<string, 'ape' | 'monkey' | 'rhino'> = { 'banana-shack': 'ape', 'permanent-marker': 'monkey', 'sour-diesel': 'rhino' }

/**
 * Chapter 7. Camp. The only calm frame, so the CTA lands here.
 * The cast is named for the first and only time. Proof pins up here. Real photos only.
 */
export function Camp() {
  return (
    <section id="camp" aria-labelledby="camp-title" className="relative bg-[linear-gradient(180deg,#3a2038_0%,#150c1c_45%,#0b0b0b_100%)] px-4 pb-24 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Chapter 7</p>
        <h2 id="camp-title" className="display lettering mt-2 text-[clamp(48px,14vw,120px)]">
          Camp.
        </h2>
        <p className="display mt-2 text-[clamp(22px,5vw,36px)] text-gold">Everyone off. Pick a seat.</p>

        {/* THE RANGE, NAMED. Horizontal snap on phones, grid on desktop. */}
        <ul className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4" aria-label="The range">
          {CAST.map((c) => (
            <li key={c.strain} className="w-[78%] shrink-0 snap-center rounded-2xl border-2 border-ink bg-[#1b1420] p-4 sm:w-auto">
              <Figure kind={KIND[c.strain]} device={c.device} />
              <h3 className="display lettering lettering-gold mt-2 text-[clamp(26px,6vw,34px)] leading-[0.95]">{c.name}</h3>
              <p className="mt-2 text-sm text-paper/80">
                {c.who}. {c.species}. <span className="text-paper">{c.format}</span>, {c.device}.
              </p>
              <p className="mt-1 text-sm text-paper/60">{c.note}</p>
            </li>
          ))}
          <li className="w-[78%] shrink-0 snap-center rounded-2xl border-2 border-dashed border-gold/60 bg-[#1b1420] p-4 sm:w-auto" aria-label="An empty chair with a natural 0.5ml Eco-Star on the arm">
            <Figure kind="empty" device="natural" />
            <p className="display mt-2 text-[clamp(26px,6vw,34px)] leading-[0.95] text-paper/30" aria-hidden="true">
              &nbsp;
            </p>
            <p className="mt-2 text-sm text-paper/80">The empty one. Natural, 0.5ml, still warm.</p>
          </li>
        </ul>

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
