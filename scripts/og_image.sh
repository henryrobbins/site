#!/usr/bin/env bash
# Render the link preview (og:image) to public/og.jpg.
#
# The card's chrome already carries the name and the URL, so the image is the
# artwork alone, center-cropped to the 1.91:1 frame the platforms expect.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source="$root/src/assets/artwork/weierstrass/sunset_weierstrass_20.jpeg"

node -e "
  const sharp = require('sharp');
  sharp('$source')
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile('$root/public/og.jpg')
    .then((i) => console.log(\`public/og.jpg  \${i.width}x\${i.height}  \${i.size} bytes\`));
"
