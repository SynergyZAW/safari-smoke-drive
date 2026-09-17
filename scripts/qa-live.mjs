import { chromium } from '@playwright/test'
const url = process.argv[2] ?? 'https://safari-smoke-drive.vercel.app/'
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM })
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true })
const page = await ctx.newPage()
const errs = []; const fails = []; let frames = 0; let ok = 0
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)) })
page.on('requestfailed', (r) => fails.push((r.failure()?.errorText ?? '?') + ' ' + r.url().slice(-40)))
page.on('request', (r) => { if (r.url().includes('/film/')) frames++ })
page.on('response', (r) => { if (r.url().includes('/film/') && r.status() === 200) ok++ })
await page.goto(url, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /yes/i }).click()
await page.waitForTimeout(2500)
const trackH = await page.evaluate(() => document.getElementById('drive').getBoundingClientRect().height - window.innerHeight)
let i = 0
for (const p of [0.05, 0.5, 0.95]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(trackH * p))
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `test-results/live/live-${i++}.png` })
}
console.log('film requests:', frames, 'ok:', ok)
console.log('errors:', errs.slice(0, 4)); console.log('failed:', fails.slice(0, 6), 'total failed', fails.length)
await browser.close()
