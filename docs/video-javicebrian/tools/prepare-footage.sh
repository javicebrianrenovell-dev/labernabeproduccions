#!/usr/bin/env bash
# Real wall clip (Pexels) → square 1440, all-intra VP9 so every seek lands on a keyframe.
# (VP9/WebM because Playwright's Chromium may not decode H.264.)
set -euo pipefail
IN=${1:?pexels clip}; OUT=${2:-assets/wall.webm}
ffmpeg -v error -y -i "$IN" -t 6 -an \
  -vf "scale=1440:1440:force_original_aspect_ratio=increase,crop=1440:1440,fps=30" \
  -c:v libvpx-vp9 -g 1 -keyint_min 1 -crf 22 -b:v 0 -row-mt 1 -pix_fmt yuv420p "$OUT"
echo "wrote $OUT"
