#!/usr/bin/env python3
"""QA for out/film.mp4: frame-difference curve; flags single-frame pops
   (a diff spike ≥3× both neighbours) and holds longer than 1 s."""
import subprocess, sys, numpy as np
src = sys.argv[1] if len(sys.argv) > 1 else 'out/film.mp4'
W = 360
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', f'scale={W}:{W}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True, check=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, W, W).astype(np.float32)
d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))            # d[i] = change from frame i to i+1
d = np.append(d, np.abs(f[0] - f[-1]).mean())               # loop seam: last → first
fps = 60
pops = [i for i in range(1, len(d) - 1) if d[i] > 0.6 and d[i] >= 3 * d[i - 1] and d[i] >= 3 * d[i + 1]]
print(f'frames {len(f)}  mean diff {d.mean():.2f}  max {d.max():.2f} at t={d.argmax()/fps:.3f}s')
print('loop seam diff (last→first):', round(float(d[-1]), 3))
print('single-frame pops:', [(round(i / fps, 3), round(float(d[i]), 2)) for i in pops] or 'none')
still, run, holds = d < 0.05, 0, []
for i, s in enumerate(still):
    run = run + 1 if s else 0
    if run == fps: holds.append(round((i - fps + 1) / fps, 2))
print('holds > 1 s start at:', holds or 'none')
