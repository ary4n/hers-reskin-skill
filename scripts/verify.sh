#!/usr/bin/env bash
# Usage: verify.sh <page-folder> [variant]
# Screenshots the page at 1440 and 390, reports leftover source-brand text, em dashes and <sup> tags.
set -euo pipefail
ROOT="$HOME/Desktop/Lorikeet/hers-au-pricing"
PAGE="${1:?page folder, e.g. program}"
V="${2:-}"
URL="http://localhost:8765/$PAGE/index.html"; [ -n "$V" ] && URL="$URL?v=$V"
cd "$ROOT/$PAGE"
mkdir -p shots
lsof -i :8765 >/dev/null 2>&1 || (cd "$ROOT" && nohup python3 -m http.server 8765 >/dev/null 2>&1 & sleep 1)
for W in 1440 390; do
  H=900; [ "$W" = 390 ] && H=844
  npx -y playwright screenshot --browser=chromium --viewport-size=$W,$H --full-page --wait-for-timeout=2500 "$URL" "shots/${V:+$V-}$W.png" >/dev/null 2>&1
done
python3 - "$PAGE" <<'EOF'
import re, sys
from PIL import Image
s = open('index.html').read()
body = re.sub(r'<span class="flag">.*?</span>', '', s)
print('leftover Juniper/June (outside flags):', len(re.findall(r'Juniper|June\b', body)))
print('em dashes:', s.count('—'), '| <sup> tags:', s.count('<sup'), '| flags:', s.count('class="flag"'))
import glob
for f in sorted(glob.glob('shots/*.png')):
    if 'vs' in f or 'top' in f: continue
    print(f, Image.open(f).size)
EOF
