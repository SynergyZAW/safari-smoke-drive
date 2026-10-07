#!/usr/bin/env python3
"""Join segment clips into one frame sequence for scroll scrubbing.
usage: film-frames.py <out_dir> <fps> <width> <seg1.mp4> <seg2.mp4> ...
Each segment ends on the keyframe the next one starts on, so the first frame of every
segment after the first is dropped. Writes f00000.webp... and manifest.json."""
import sys, os, glob, json, subprocess, shutil, tempfile
from PIL import Image
import imageio_ffmpeg

out, fps, width, clips = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
ff = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs(out, exist_ok=True)
for f in glob.glob(os.path.join(out, 'f*.webp')): os.remove(f)
idx = 0; segs = []
with tempfile.TemporaryDirectory() as tmp:
    for si, clip in enumerate(clips):
        d = os.path.join(tmp, f's{si}'); os.makedirs(d)
        subprocess.check_call([ff, '-v', 'error', '-y', '-i', clip, '-vf', f'fps={fps},scale={width}:-2', os.path.join(d, 'f%05d.png')])
        frames = sorted(glob.glob(os.path.join(d, 'f*.png')))
        if si > 0: frames = frames[1:]
        start = idx
        for f in frames:
            im = Image.open(f).convert('RGB')
            im.save(os.path.join(out, f'f{idx:05d}.webp'), quality=80, method=4)
            idx += 1
        segs.append({'clip': os.path.basename(clip), 'start': start, 'end': idx})
        print(clip, len(frames), 'frames')
w, h = Image.open(os.path.join(out, 'f00000.webp')).size
json.dump({'fps': fps, 'count': idx, 'w': w, 'h': h, 'segments': segs}, open(os.path.join(out, 'manifest.json'), 'w'))
total = sum(os.path.getsize(f) for f in glob.glob(os.path.join(out, 'f*.webp')))
print('frames', idx, f'{w}x{h}', total // 1024, 'KB')
