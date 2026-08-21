#!/usr/bin/env bash
# Render the link preview (og:image) from scripts/og_image.html to public/og.jpg.
#
# Headless Chrome is used so the plate is rendered by the same engine that will
# never see it: the crawlers that consume og:image only fetch the flat file.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot="$(mktemp -d)/og.png"

"$chrome" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot="$shot" \
  --virtual-time-budget=10000 \
  "file://$root/scripts/og_image.html" >/dev/null 2>&1

npx --no-install -- node -e "
  const sharp = require('sharp');
  sharp('$shot').jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile('$root/public/og.jpg')
    .then((i) => console.log(\`public/og.jpg  \${i.width}x\${i.height}  \${i.size} bytes\`));
"
