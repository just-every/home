/**
 * Writes a colourway into one footer SVG: the static art or one of its moving
 * parts (public/landing/footer/motion/). Every `<g class="region">` in the
 * file gets a rule for each pink-over-blue class it draws (`.canopy .c13` is
 * the canopy where light pink overprinted full blue), plus the cream and
 * shade layers, all in the file's <style id="colourway">.
 */
import { mix } from './colour.mjs';
import { colourways } from './colourways.mjs';

const STYLE = /<style id="colourway">[^<]*<\/style>/;

/** The fill of pink level i over blue level j (0 is no ink) in a region. */
function fill(r, i, j) {
  if (j === 0) return r.pink[i - 1];
  if (i === 0) return r.blue[j - 1];
  if (j === 3) return r.over[i - 1];
  // A pink tint over a lighter blue: between that blue and the full-blue overprint.
  return mix(r.blue[j - 1], r.over[i - 1], j === 1 ? 0.35 : 0.6);
}

export const hasColourway = svg => STYLE.test(svg);

/** The colourway named in a coloured file's style, or undefined. */
export const colourwayOf = svg =>
  svg.match(/<style id="colourway">\/\* ([a-z-]+) \*\//)?.[1];

/** svg with colourway `key` written in; throws on a region it has no colours for. */
export function colourSvg(svg, key) {
  const cw = colourways[key];
  if (!cw)
    throw new Error(
      `No colourway ${key}; one of: ${Object.keys(colourways).join(', ')}`
    );
  if (!hasColourway(svg)) throw new Error('no <style id="colourway">');
  const rules = new Set([`.cr{fill:${cw.cream}}`, `.sh{fill:${cw.shade}}`]);
  for (const [, name, body] of svg.matchAll(
    /<g class="([a-z]+)"[^>]*>(.*?)<\/g>/gs
  )) {
    const r = cw.regions[name];
    if (!r)
      throw new Error(`Colourway ${key} has no colours for the ${name} region`);
    for (const [, i, j] of body.matchAll(/class="c(\d)(\d)"/g)) {
      rules.add(`.${name} .c${i}${j}{fill:${fill(r, +i, +j)}}`);
    }
  }
  return svg.replace(
    STYLE,
    `<style id="colourway">/* ${key} */${[...rules].join('')}</style>`
  );
}
