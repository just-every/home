#!/usr/bin/env bash
#
# transcode.sh  —  leaner outputs without ugly artefacts
#
# ① Swap CRF values (↓ bit-rate)               ──────────────────────────────────
# ② Cut audio to 96 kb/s                       │
# ③ Optional two-pass VP9 (commented)          │
# ─────────────────────────────────────────────┘
set -euo pipefail

ladder=(3840 2560 1920 1280 854)   # widths
CRF_H264=23                        # was 20    → smaller, still serviceable HD
CRF_VP9=36                         # was 30    → good “YouTube HD” quality
AAC_BITRATE=96k
OPUS_BITRATE=96k
PRESET=x265                         # slower → better compression (or keep 'slow')

[[ $# -eq 1 && -f $1 ]] || { echo "Usage: $0 <source>"; exit 1; }
SRC="$1"; NAME="${SRC%.*}"

for W in "${ladder[@]}"; do
  SCL="scale=${W}:-2"

  ### MP4 / H.264 -----------------------------------------------------------
  ffmpeg -hide_banner -loglevel error -y \
    -i "$SRC" \
    -vf "$SCL" \
    -c:v libx264  -crf "$CRF_H264" -preset slow -profile:v high -pix_fmt yuv420p \
    -c:a aac      -b:a "$AAC_BITRATE" \
    -movflags +faststart \
    "${NAME}-${W}w.mp4"

  ### WebM / VP9  -----------------------------------------------------------
  # — single-pass CRF (fast, ~same quality as 2-pass for VP9)
  ffmpeg -hide_banner -loglevel error -y \
    -i "$SRC" \
    -vf "$SCL" \
    -c:v libvpx-vp9  -crf "$CRF_VP9" -b:v 0 -row-mt 1 \
    -c:a libopus     -b:a "$OPUS_BITRATE" \
    "${NAME}-${W}w.webm"

  # —- uncomment for **two-pass** VP9 (-10 % size, 2× time)
  #: ffmpeg -hide_banner -loglevel error -y \
  #    -i "$SRC" -vf "$SCL" -c:v libvpx-vp9 -b:v 0 -crf "$CRF_VP9" \
  #    -pass 1 -an -f null /dev/null
  #: ffmpeg -hide_banner -loglevel error -y \
  #    -i "$SRC" -vf "$SCL" -c:v libvpx-vp9 -b:v 0 -crf "$CRF_VP9" \
  #    -pass 2 -c:a libopus -b:a "$OPUS_BITRATE" \
  #    "${NAME}-${W}w.webm"
done