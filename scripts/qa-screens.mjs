// QA: screenshot the drive at the widths in the brief and at key scroll points.
// Usage: node scripts/qa-screens.mjs http://localhost:4173/  (after `vite preview`)
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const base = process.argv[2] ?? 'http://localhost:4173/'
const out = process.argv[3] ?? 'test-results/screens'
mkdirSync(out, { recursive: true })

const sizes = [
  [320, 568],
  [375, 812],
  [768, 1024],
  [1024, 768],
  [1440, 900],
]
const points = [0, 0.09, 0.21, 0.36, 0.46, 0.55, 0.63, 0.77, 0.95, 1.05, 1.3]

// PLAYWRIGHT_CHROMIUM lets a pre-installed browser be used instead of downloading one.
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {})
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 800, hasTouch: w < 800 })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${out}/${w}x${h}-gate.png` })
  await page.getByRole('button', { name: /yes/i }).click()
  await page.waitForTimeout(300)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  console.log(`${w}x${h} horizontal overflow px:`, overflow)
  const trackH = await page.evaluate(() => document.getElementById('drive').getBoundingClientRect().height - window.innerHeight)
  for (const p of points) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(trackH * p))
    await page.waitForTimeout(450)
    await page.screenshot({ path: `${out}/${w}x${h}-p${String(p).replace('.', '_')}.png` })
  }
  const events = await page.evaluate(() => (window.__ss_events ?? []).map((e) => e.name + (e.props?.strain ? ':' + e.props.strain : '')))
  console.log(`${w}x${h} events:`, [...new Set(events)].join(', '))
  await ctx.close()
}
await browser.close()
