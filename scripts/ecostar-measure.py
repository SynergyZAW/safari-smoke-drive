import sys, numpy as np
from PIL import Image
def body_mask(path, mode):
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(int)
    if mode == 'black':   # photo on black
        m = a.max(axis=2) > 40
    elif mode == 'white': # product render on white
        m = a.min(axis=2) < 215
    else:                 # render on chroma green
        R,G,B = a[...,0],a[...,1],a[...,2]
        m = ~((G > 150) & (G > R + 60) & (G > B + 60))
    # keep the largest connected blob roughly: use column/row profiles with a threshold
    cols = np.where(m.sum(axis=0) > m.shape[0]*0.02)[0]; rows = np.where(m.sum(axis=1) > m.shape[1]*0.01)[0]
    return m, cols.min(), cols.max(), rows.min(), rows.max()
def window(path, mode, x0,x1,y0,y1):
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(int)
    sub = a[y0:y1, x0:x1]
    # dark/grey or golden window: look for the circular recess area: strongest deviation from body cream in upper third
    body = np.median(sub.reshape(-1,3), axis=0)
    dev = np.abs(sub - body).sum(axis=2)
    top = dev[: (y1-y0)//2]
    ys, xs = np.where(top > 90)
    if len(ys) == 0: return None
    return (np.median(xs)/(x1-x0), np.median(ys)/(y1-y0))
args=sys.argv[1:]
for spec in args:
    path, mode = spec.rsplit(':',1)
    m,x0,x1,y0,y1 = body_mask(path, mode)
    w,h = x1-x0, y1-y0
    # width at 3 heights
    def width_at(f):
        r = m[int(y0+h*f)]; xs = np.where(r)[0]; return (xs.max()-xs.min())/h if len(xs) else 0
    win = window(path, mode, x0,x1,y0,y1)
    print(f"{path.split('/')[-1]:14s} body w/h={w/h:.3f}  width@20%={width_at(0.2):.3f} @50%={width_at(0.5):.3f} @80%={width_at(0.8):.3f}  window centre (x,y as fraction of body)={tuple(round(v,2) for v in win) if win else None}")
