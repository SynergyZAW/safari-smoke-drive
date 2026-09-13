/** Chapter 8. Night. One mascot refuses to get out. Then the footer. */
export function Afterglow() {
  return (
    <section id="afterglow" aria-label="Afterglow" className="relative bg-ink px-4 pb-16 pt-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border-2 border-[#1f1610] bg-[#07060a] sm:max-w-md">
          <img src={`${import.meta.env.BASE_URL}art/afterglow.jpg`} alt="Night. The truck parked under stars. The monkey alone on the back bench, taking a draw." width={1080} height={1920} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
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
