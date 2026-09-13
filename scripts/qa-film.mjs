import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM })
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /yes/i }).click()
await page.waitForTimeout(1500)
const trackH = await page.evaluate(() => document.getElementById('drive').getBoundingClientRect().height - window.innerHeight)
let i = 0
for (const p of [0.05, 0.3, 0.46, 0.55, 0.75, 0.95]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(trackH * p))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `test-results/film/film-${i++}.png` })
}
console.log(await page.evaluate(() => (window.__ss_events ?? []).map((e) => e.name).filter((n, i, a) => a.indexOf(n) === i).join(',')))
await browser.close()
