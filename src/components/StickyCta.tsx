import { track } from '../lib/analytics'

export const STOCKIST_ROUTE = '#/stockists' // PLACEHOLDER. Real stockist finder route TBD.

export function StickyCta({ visible }: { visible: boolean }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
      style={{ bottom: 'max(16px, env(safe-area-inset-bottom))', opacity: visible ? 1 : 0, transition: 'opacity 250ms', transform: `translateY(${visible ? 0 : 12}px)` }}
      aria-hidden={!visible}
    >
      <a
        href={STOCKIST_ROUTE}
        tabIndex={visible ? 0 : -1}
        onClick={() => track('cta_click', { location: 'sticky' })}
        className="pointer-events-auto display rounded-full bg-gold px-6 py-3 text-xl text-ink shadow-[4px_4px_0_#0b0b0b] transition-transform hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        Find a stockist
      </a>
    </div>
  )
}
