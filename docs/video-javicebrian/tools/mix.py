#!/usr/bin/env python3
"""Mix the soundtrack for film.mp4 from audio/sfx-cues.json.
   - Song starts on a downbeat: --song-start = song time (s) that lands on film t=0 (drop must fall on t=8.0).
   - Each SFX is positioned by its MEASURED PEAK (argmax |x|), not its file start.
   - Loudness normalised to -14 LUFS (ffmpeg loudnorm, two-pass), then muxed with the video.
   usage: python3 tools/mix.py --song audio/song.mp3 --song-start 12.0 --video out/film.mp4 --out out/film-audio.mp4"""
import argparse, json, subprocess, glob, os, numpy as np
SR, DUR = 48000, 27.0
def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
ap = argparse.ArgumentParser(); ap.add_argument('--song'); ap.add_argument('--song-start', type=float, default=0)
ap.add_argument('--song-db', type=float, default=-3); ap.add_argument('--video'); ap.add_argument('--out')
ap.add_argument('--cues', default='audio/sfx-cues.json'); ap.add_argument('--sfx-dir', default='audio/sfx'); a = ap.parse_args()
C = json.load(open(a.cues)); N = int(SR * DUR); mix = np.zeros((N, 2), np.float32)
if a.song:
    s = load(a.song)[int(a.song_start * SR):][:N]; mix[:len(s)] += s * 10 ** (a.song_db / 20)
    fade = int(.02 * SR); mix[N - fade:] *= np.linspace(1, 0, fade)[:, None]  # click-free loop point
missing, cache = set(), {}
for c in C['cues']:
    name = c['sfx']
    if name not in cache:
        f = (glob.glob(f"{a.sfx_dir}/{name}.*") or [None])[0]
        if not f: missing.add(name); cache[name] = None; continue
        x = load(f); cache[name] = (x, int(np.argmax(np.abs(x).max(axis=1))))
    if cache[name] is None: continue
    x, pk = cache[name]; g = 10 ** (C['library'][name]['gain_db'] / 20)
    start = int(round(c['at'] * SR)) - pk
    s0, s1 = max(0, start), min(N, start + len(x))
    if s1 > s0: mix[s0:s1] += x[s0 - start:s1 - start] * g
if missing: print('SFX missing (skipped):', ', '.join(sorted(missing)))
os.makedirs('out', exist_ok=True); raw = 'out/mix-raw.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', raw], input=np.clip(mix, -1, 1).tobytes(), check=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw, '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', ln, '-ar', str(SR), 'out/mix.wav'], check=True)
print('measured input LUFS', j['input_i'], '→ -14')
if a.video and a.out:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-i', 'out/mix.wav', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-shortest', a.out], check=True)
    print('wrote', a.out)
