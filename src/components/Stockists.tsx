import { useEffect } from 'react'
import { track } from '../lib/analytics'

/** PLACEHOLDER ROUTE. The real stockist finder does not exist yet. Nothing here is measured. */
export function Stockists() {
  useEffect(() => {
    track('page_view', { route: 'stockists-placeholder' })
  }, [])
  return (
    <main className="min-h-[100dvh] bg-ink px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Placeholder</p>
        <h1 className="display lettering mt-2 text-[clamp(40px,12vw,84px)]">Find a stockist</h1>
        <p className="mt-4 text-base leading-relaxed text-paper/85">
          This is where the stockist finder will live. Nothing is wired yet. The form below fires the analytics stubs only.
        </p>
        <form
          className="mt-8 space-y-4"
          onFocus={() => track('form_start')}
          onSubmit={(e) => {
            e.preventDefault()
            track('form_submit')
            alert('Placeholder. No stockist lookup yet.')
          }}
        >
          <label className="block text-sm text-paper/80" htmlFor="area">
            Your area
            <input id="area" name="area" type="text" autoComplete="postal-code" className="mt-1 w-full rounded-lg border-2 border-paper/30 bg-transparent px-3 py-3 text-base text-paper" placeholder="Suburb or postcode" />
          </label>
          <button type="submit" className="display rounded-full bg-gold px-8 py-4 text-2xl text-ink shadow-[4px_4px_0_#0b0b0b]">
            Search
          </button>
        </form>
        <a href="#/" className="mt-10 inline-block text-paper/70 underline">
          Back to the truck
        </a>
      </div>
    </main>
  )
}
