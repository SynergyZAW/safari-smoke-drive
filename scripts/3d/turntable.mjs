// usage: node scripts/3d/turntable.mjs <glb path relative to project> <out prefix> [w h]
import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
const [glb, out, w = '600', h = '800'] = process.argv.slice(2)
const srv = spawn('python3', ['-m', 'http.server', '4310', '--bind', '127.0.0.1'], { cwd: process.cwd(), stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 800))
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
page.on('pageerror', (e) => console.error('pageerror', e.message))
await page.goto(`http://127.0.0.1:4310/scripts/3d/turntable.html?glb=/${glb}&w=${w}&h=${h}`)
await page.waitForFunction(() => window.ready, null, { timeout: 120000 })
console.log(JSON.stringify(await page.evaluate(() => window.info)))
mkdirSync('test-results/3d', { recursive: true })
for (const a of [0, 45, 90, 180, 270, 315]) {
  await page.evaluate((deg) => window.setAngle(deg), a)
  await page.screenshot({ path: `test-results/3d/${out}-${a}.png` })
}
await browser.close(); srv.kill()
