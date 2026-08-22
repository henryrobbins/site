// Renders the link preview images (og:image) into public/.
//
// Astro's image service refuses to enlarge, so a thumbnail smaller than the
// 1200x630 card comes back uncropped rather than filled. Sharp is driven
// directly here to guarantee every card is the same size and full bleed.

import { readFileSync } from "node:fs";
import { readdir, readFile, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artworkDir = join(root, "src/content/artwork");
const outDir = join(root, "public/og");

const CARD = { width: 1200, height: 630 };
const DEFAULT_SOURCE = "src/assets/artwork/weierstrass/sunset_weierstrass_20.jpeg";

// The caption bar under the home card, matching the plate design on the site.
const BAR = {
  height: 92,
  padding: 40,
  name: { text: "HENRY ROBBINS", size: 28, tracking: 0.05, color: "#111111" },
  role: { text: "PhD student, Stanford", size: 24, tracking: 0, color: "#6b6b68" },
};

const font = (file) => opentype.parse(readFileSync(join(root, "scripts/fonts", file)).buffer);

const fonts = {
  medium: font("IBMPlexMono-Medium.ttf"),
  regular: font("IBMPlexMono-Regular.ttf"),
};

const field = (frontmatter, name) =>
  frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim().replace(/^["']|["']$/g, "");

// opentype's own toSVG writes NaN control points once several glyphs share a
// path, so the commands are serialized here instead.
const round = (n) => Number(n.toFixed(2));
const pathData = (commands) =>
  commands
    .map(({ type, x, y, x1, y1, x2, y2 }) =>
      ({
        M: () => `M${round(x)} ${round(y)}`,
        L: () => `L${round(x)} ${round(y)}`,
        Q: () => `Q${round(x1)} ${round(y1)} ${round(x)} ${round(y)}`,
        C: () => `C${round(x1)} ${round(y1)} ${round(x2)} ${round(y2)} ${round(x)} ${round(y)}`,
        Z: () => "Z",
      })[type]())
    .join("");

// Text is drawn as outlines rather than <text>: the SVG renderer inside sharp
// resolves font families against installed system fonts, and the build machine
// has none of these.
const outline = (font, { text, size, tracking, color }, x, y) => {
  const step = size * tracking;
  const commands = [];
  let pen = x;
  for (const char of text) {
    commands.push(...font.getPath(char, pen, y, size).commands);
    pen += font.getAdvanceWidth(char, size) + step;
  }
  return {
    svg: `<path fill="${color}" d="${pathData(commands)}"/>`,
    width: pen - step - x,
  };
};

const measure = (font, spec) => outline(font, spec, 0, 0).width;

// Both labels sit on their own baseline so that each one's capitals are
// centred in the bar, rather than sharing a baseline at two type sizes.
const baseline = (font, { size }) =>
  (BAR.height + (font.tables.os2.sCapHeight / font.unitsPerEm) * size) / 2;

const captionBar = () => {
  const roleWidth = measure(fonts.regular, BAR.role);
  const name = outline(fonts.medium, BAR.name, BAR.padding, baseline(fonts.medium, BAR.name));
  const role = outline(
    fonts.regular,
    BAR.role,
    CARD.width - BAR.padding - roleWidth,
    baseline(fonts.regular, BAR.role),
  );
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${BAR.height}">
       <rect width="${CARD.width}" height="${BAR.height}" fill="#ffffff"/>
       <rect width="${CARD.width}" height="1" fill="#111111"/>
       ${name.svg}${role.svg}
     </svg>`,
  );
};

const card = (source, out) =>
  sharp(source)
    .resize(CARD.width, CARD.height, { fit: "cover", position: "center" })
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(out);

// The home card is the artwork cropped to the space left above the bar.
const plate = async (source, out) => {
  const artwork = await sharp(source)
    .resize(CARD.width, CARD.height - BAR.height, { fit: "cover", position: "center" })
    .toBuffer();
  return sharp({
    create: { ...CARD, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: artwork, top: 0, left: 0 },
      { input: captionBar(), top: CARD.height - BAR.height, left: 0 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(out);
};

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await plate(join(root, DEFAULT_SOURCE), join(root, "public/og.jpg"));

const entries = (await readdir(artworkDir)).filter((name) => name.endsWith(".md"));
let count = 0;

for (const entry of entries) {
  const path = join(artworkDir, entry);
  const frontmatter = (await readFile(path, "utf8")).split("---")[1] ?? "";
  const id = field(frontmatter, "id");
  const thumbnail = field(frontmatter, "thumbnail");
  if (!id || !thumbnail) continue;

  await card(resolve(dirname(path), thumbnail), join(outDir, `${id}.jpg`));
  count += 1;
}

console.log(`og: public/og.jpg + ${count} artwork card(s)`);
