export type Manifest = { fps: number; count: number; w: number; h: number; segments: { clip: string; start: number; end: number }[] }

const pad = (i: number) => String(i).padStart(5, '0')

/** Loads a frame sequence progressively: a coarse pass first so scrubbing works early, then the rest. */
export class FrameSet {
  frames: (HTMLImageElement | null)[] = []
  loaded = new Set<number>()
  dir: string
  m: Manifest
  private onFrame?: (i: number) => void
  constructor(dir: string, m: Manifest, onFrame?: (i: number) => void) {
    this.dir = dir; this.m = m; this.onFrame = onFrame
    this.frames = new Array(m.count).fill(null)
  }
  src(i: number) { return `${this.dir}/f${pad(i)}.webp` }
  load(i: number): Promise<void> {
    if (this.frames[i]) return Promise.resolve()
    return new Promise((res) => {
      const im = new Image()
      im.decoding = 'async'
      im.onload = () => { this.frames[i] = im; this.loaded.add(i); this.onFrame?.(i); res() }
      im.onerror = () => res()
      im.src = this.src(i)
    })
  }
  async loadAll(concurrency = 6) {
    const order: number[] = []
    for (const step of [16, 4, 1]) for (let i = 0; i < this.m.count; i += step) if (!order.includes(i)) order.push(i)
    let next = 0
    const worker = async () => { while (next < order.length) { const i = order[next++]; await this.load(i) } }
    await Promise.all(Array.from({ length: concurrency }, worker))
  }
  /** nearest loaded frame at or before i, else the nearest after */
  nearest(i: number): HTMLImageElement | null {
    for (let k = i; k >= 0; k--) if (this.frames[k]) return this.frames[k]
    for (let k = i + 1; k < this.m.count; k++) if (this.frames[k]) return this.frames[k]
    return null
  }
}

/** Draw an image to cover the canvas (like object-fit: cover). */
export function drawCover(ctx: CanvasRenderingContext2D, im: HTMLImageElement, cw: number, ch: number) {
  const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight)
  const w = im.naturalWidth * s, h = im.naturalHeight * s
  ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h)
}
