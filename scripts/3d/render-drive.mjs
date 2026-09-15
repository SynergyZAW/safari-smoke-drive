// usage: node scripts/3d/render-drive.mjs <outdir> <fps> <seconds> <w> <h> [castJson]
import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
const [out = 'test-results/drive', fps = '12', secs = '10', w = '720', h = '1280', castJson = '[]'] = process.argv.slice(2)
mkdirSync(out, { recursive: true })
const srv = spawn('python3', ['-m', 'http.server', '4311', '--bind', '127.0.0.1'], { cwd: process.cwd(), stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 800))
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
page.on('pageerror', (e) => console.error('pageerror', e.message)); page.on('console', (m) => { if (m.type() === 'error') console.error('console', m.text()) })
await page.goto(`http://127.0.0.1:4311/scripts/3d/drive.html?w=${w}&h=${h}&cast=${encodeURIComponent(castJson)}`)
await page.waitForFunction(() => window.ready, null, { timeout: 300000 })
const n = Math.round(+fps * +secs); const t0 = Date.now()
for (let i = 0; i < n; i++) {
  const data = await page.evaluate((t) => window.renderFrame(t), i / +fps)
  writeFileSync(`${out}/f_${String(i + 1).padStart(4, '0')}.png`, Buffer.from(data.split(',')[1], 'base64'))
  if (i % 24 === 0) console.log('frame', i + 1, '/', n, ((Date.now() - t0) / 1000).toFixed(0) + 's')
}
await browser.close(); srv.kill(); console.log('done', n, 'frames')
