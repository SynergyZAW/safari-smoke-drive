#!/usr/bin/env python3
"""Chroma-key a pure-green cut-out layer to a transparent PNG/WebP.
usage: key.py <in.png> <out.webp> [--trim]"""
import sys
import numpy as np
from PIL import Image

def key(src, dst, trim=True):
    im = Image.open(src).convert('RGB')
    a = np.asarray(im).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # key colour: median of the border pixels
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    kr, kg, kb = np.median(border, axis=0)
    # greenness: how far G exceeds the max of R,B, relative to the key
    gk = kg - max(kr, kb)
    gx = g - np.maximum(r, b)
    # distance to key colour
    d = np.sqrt((r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2)
    # alpha: 0 at the key, 1 when clearly not green
    alpha = np.clip((d - 60) / 90, 0, 1)
    alpha = np.minimum(alpha, np.clip(1 - (gx - 0.25 * gk) / (0.45 * gk), 0, 1))
    # despill: clamp G to max(R,B) where it still leans green near the edge
    spill = (gx > 0) & (alpha < 1)
    g2 = np.where(spill, np.minimum(g, np.maximum(r, b) + 8), g)
    out = np.dstack([r, g2, b, alpha * 255]).clip(0, 255).astype(np.uint8)
    img = Image.fromarray(out, 'RGBA')
    if trim:
        bbox = img.getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            pad = 8
            img = img.crop((max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad)))
    img.save(dst, quality=92, method=6) if dst.endswith('.webp') else img.save(dst)
    print(dst, img.size, 'key', (int(kr), int(kg), int(kb)))

if __name__ == '__main__':
    key(sys.argv[1], sys.argv[2], '--notrim' not in sys.argv)
