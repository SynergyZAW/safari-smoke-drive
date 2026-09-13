/** Chapter 8. Night. One mascot refuses to get out. Then the footer. */
export function Afterglow() {
  return (
    <section id="afterglow" aria-label="Afterglow" className="relative bg-ink px-4 pb-16 pt-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border-2 border-[#1f1610] bg-[#07060a] sm:aspect-[16/9] sm:max-w-3xl">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="ag-rosin" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0" stopColor="#fff2a8" />
                <stop offset="0.6" stopColor="#f6c945" />
                <stop offset="1" stopColor="#d9a520" />
              </radialGradient>
              <filter id="ag-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            <rect width="400" height="400" fill="#07060a" />
            {[[40, 60], [120, 30], [300, 50], [350, 110], [220, 80], [80, 130]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.3" fill="#fffdf7" opacity="0.7" />
            ))}
            {/* the truck, parked, dark */}
            <rect x="0" y="230" width="400" height="14" rx="7" fill="#151015" />
            <rect x="40" y="244" width="320" height="120" rx="14" fill="#100c12" />
            <rect x="60" y="270" width="120" height="70" rx="12" fill="#0b0b0b" />
            <rect x="220" y="270" width="120" height="70" rx="12" fill="#0b0b0b" />
            {/* the one who will not get out */}
            <circle cx="280" cy="262" r="22" fill="#1a1410" />
            <path d="M258 250 l44 0 l0 -8 l-44 0 z" fill="#1f3d27" />
            <path d="M300 280 q30 10 20 50" stroke="#1a1410" strokeWidth="6" fill="none" strokeLinecap="round" />
            <g transform="translate(252 268) rotate(-20)">
              <rect x="-5" y="-20" width="10" height="40" rx="4" fill="#ede4d0" stroke="#0b0b0b" strokeWidth="1.5" />
              <rect x="-5" y="14" width="10" height="6" rx="3" fill="#8d8378" />
              <circle cx="0" cy="-7" r="3.2" fill="url(#ag-rosin)" filter="url(#ag-glow)" />
              <ellipse cx="0" cy="-1" rx="1" ry="1.4" fill="#fff" />
              <ellipse cx="0" cy="-1" rx="4" ry="5" fill="#fff" opacity="0.35" filter="url(#ag-glow)" />
            </g>
          </svg>
          <p className="display lettering absolute left-4 right-4 top-6 text-center text-[clamp(28px,7vw,52px)]">He&rsquo;s not getting out.</p>
        </div>

        <footer className="mt-16 border-t border-paper/15 pt-8 text-sm text-paper/70">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}brand/safari-smoke-logo.jpeg`} alt="Safari Smoke" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="display text-xl text-gold">Safari Smoke</p>
                <p>Made by South Africans for South Africans.</p>
              </div>
            </div>
            <ul className="space-y-1">
              <li>21+ only.</li>
              <li>Not for medical use. No medical claims are made.</li>
              <li>Keep out of reach of children.</li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
