# Safari Smoke — The Drive

One long-form page. Scroll is the truck. Eight chapters, first-person, back row.

- `docs/` — the creative package for approval: concept, scene list, character bible plan, impact library, generation plan, design system, QA, supply blanks and overrules. **Read `docs/00-start-here.md` first.**
- `src/` — React + TypeScript + Tailwind + Vite. GSAP ScrollTrigger for progress. The film is currently a **pre-viz animatic** drawn in palette silhouettes so the flow can be felt before any cinematic asset is generated.

```
npm i
npm run dev        # local
npm run build      # dist/
npm run preview    # serve dist/ on :4173
node scripts/qa-screens.mjs http://localhost:4173/   # screenshots at 320/375/768/1024/1440
```

Placeholders on purpose this phase: the stockist route (`#/stockists`), analytics (`src/lib/analytics.ts` stubs), the proof photographs, and the film frames.
