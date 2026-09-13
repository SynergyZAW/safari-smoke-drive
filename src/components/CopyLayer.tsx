import { CHAPTERS } from '../data/chapters'

/**
 * Copy is HTML, never baked into frames. 3–12 words a scene. Text-safe zones:
 * portrait = top band, landscape = left third. No labels naming animals during the drive.
 */
export function CopyLayer({ p, portrait }: { p: number; portrait: boolean }) {
  const lines = CHAPTERS.flatMap((c) => c.copy)
  return (
    <div
      className={
        portrait
          ? 'pointer-events-none absolute left-[6%] right-[6%] top-[14%] text-center'
          : 'pointer-events-none absolute left-[6%] top-[20%] w-[42%] text-left'
      }
    >
      {lines.map((l) => {
        const fadeIn = Math.min(1, Math.max(0, (p - l.from) / 0.012))
        const fadeOut = Math.min(1, Math.max(0, (l.to - p) / 0.012))
        const op = Math.min(fadeIn, fadeOut)
        const visible = op > 0
        return (
          <p
            key={l.id}
            className={`stage-copy display lettering absolute left-0 right-0 m-0 ${l.size === 'beat' ? 'text-[clamp(28px,7.5vw,58px)]' : 'text-[clamp(38px,10.5vw,84px)]'}`}
            style={{ opacity: op, transform: `translateY(${(1 - op) * 10}px)` }}
            aria-hidden={!visible}
          >
            {l.text}
          </p>
        )
      })}
    </div>
  )
}
