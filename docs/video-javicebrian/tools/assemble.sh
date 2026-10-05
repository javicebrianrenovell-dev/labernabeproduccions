#!/usr/bin/env bash
# 240 fps subframes → blend 4 subframes per output frame (tmix) → 60 fps H.264 master.
set -euo pipefail
FRAMES=${1:?frames dir}; OUT=${2:-out/film.mp4}
mkdir -p "$(dirname "$OUT")"
ffmpeg -v error -y -framerate 240 -i "$FRAMES/f%05d.jpg" \
  -vf "tmix=frames=4:weights='1 1 1 1',select='eq(mod(n\,4)\,3)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -preset slow -crf 15 -pix_fmt yuv420p -movflags +faststart "$OUT"
ffprobe -v error -select_streams v -show_entries stream=width,height,r_frame_rate,nb_frames -of csv=p=0 "$OUT"
