/**
 * `widths`/`width` props for an `<Image>`, clamped to the source resolution.
 *
 * Astro warns when a requested width exceeds the original, and several source
 * images here are narrower than the layout slots they fill. The explicit
 * `width` also keeps the non-srcset fallback `src` from being emitted at full
 * resolution.
 *
 * Spread into `<Image>`: `{...responsiveWidths(src, [256, 512])}`
 */
export function responsiveWidths(
  src: ImageMetadata,
  widths: number[]
): { widths: number[]; width: number } {
  const clamped = [...new Set(widths.map((w) => Math.min(w, src.width)))];
  return { widths: clamped, width: Math.max(...clamped) };
}

/**
 * `widths`/`width`/`sizes` for an image filling a square box with
 * `object-cover`, at `box` CSS pixels per side.
 *
 * Cover scales the source until both axes fill the box, so a landscape image
 * is drawn wider than the box and is clipped. Sizing it to the box width alone
 * under-serves it — a 1.84:1 source in a 256px box draws 471px wide, and looks
 * soft on a retina display fed the 512px candidate it asked for.
 */
export function coverWidths(
  src: ImageMetadata,
  box: number
): { widths: number[]; width: number; sizes: string } {
  const drawn = Math.round(box * Math.max(1, src.width / src.height));
  return {
    ...responsiveWidths(src, [drawn, drawn * 2]),
    sizes: `${drawn}px`,
  };
}
