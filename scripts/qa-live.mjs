import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM })
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
const errs = []; const fails = []
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)) })
page.on('response', (r) => { if (r.status() >= 400) fails.push(r.status() + ' ' + r.url().slice(-50)) })
await page.goto('https://safari-smoke-drive.vercel.app/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /yes/i }).click()
await page.waitForTimeout(2500)
const trackH = await page.evaluate(() => document.getElementById('drive').getBoundingClientRect().height - window.innerHeight)
let i = 0
for (const p of [0.05, 0.5, 0.95]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(trackH * p))
  await page.waitForTimeout(2000)
  await page.screenshot({ path: `test-results/live/live-${i++}.png` })
}
console.log('errors:', errs.slice(0, 5)); console.log('http fails:', fails.slice(0, 5))
await browser.close()
