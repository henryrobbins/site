// Renders the link preview images (og:image) into public/.
//
// Astro's image service refuses to enlarge, so a thumbnail smaller than the
// 1200x630 card comes back uncropped rather than filled. Sharp is driven
// directly here to guarantee every card is the same size and full bleed.

import { readdir, readFile, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artworkDir = join(root, "src/content/artwork");
const outDir = join(root, "public/og");

const CARD = { width: 1200, height: 630 };
const DEFAULT_SOURCE = "src/assets/artwork/weierstrass/sunset_weierstrass_20.jpeg";

const field = (frontmatter, name) =>
  frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim().replace(/^["']|["']$/g, "");

const card = (source, out) =>
  sharp(source)
    .resize(CARD.width, CARD.height, { fit: "cover", position: "center" })
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(out);

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await card(join(root, DEFAULT_SOURCE), join(root, "public/og.jpg"));

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
