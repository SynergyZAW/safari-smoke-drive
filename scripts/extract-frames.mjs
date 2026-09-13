// Turn beat clips into scrubbable frame sequences + posters, and write public/film/manifest.json.
// Usage: node scripts/extract-frames.mjs clips.json
//   clips.json: [{ "beat": "ch1", "from": 0.00, "to": 0.12, "src": "path/to/clip.mp4" }, ...]
// Frames: 12 fps, 720x1280 WebP q68 (portrait master). Poster: first frame as JPEG.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const FFMPEG = process.env.FFMPEG ?? 'ffmpeg'
const FPS = Number(process.env.FPS ?? 12)
const W = Number(process.env.FRAME_W ?? 720)
const H = Number(process.env.FRAME_H ?? 1280)
const clips = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const outRoot = process.env.OUT ?? 'public/film'
mkdirSync(outRoot, { recursive: true })
const manifest = { fps: FPS, width: W, height: H, beats: [] }
for (const c of clips) {
  const dir = join(outRoot, c.beat)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  // scale+crop to the portrait master, then webp
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', c.src, '-vf', `fps=${FPS},scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, '-c:v', 'libwebp', '-quality', String(process.env.WEBP_Q ?? 68), '-compression_level', '6', join(dir, 'f_%04d.webp')])
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', c.src, '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, '-frames:v', '1', '-q:v', '4', join(dir, 'poster.jpg')])
  const n = readdirSync(dir).filter((f) => f.startsWith('f_')).length
  manifest.beats.push({ beat: c.beat, from: c.from, to: c.to, frames: n, dir: `${outRoot.replace(/^public\//, '')}/${c.beat}` })
  console.log(c.beat, n, 'frames')
}
writeFileSync(join(outRoot, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log('manifest written', manifest.beats.length, 'beats')
