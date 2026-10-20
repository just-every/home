/**
 * (a) Marks. The repo's designed mark (sources.json names its path) is drawn
 * beside the site's copy and compared by pixels, so a re-encoded file of the
 * same art is not a change. A changed mark is imported as the site's
 * variants are named (seed-types.ts): mark.svg verbatim, mark-light.svg with
 * its dark-scheme rules removed (where the site keeps one or the new mark
 * adapts to a dark scheme). A seed whose mark is redrawn by hand in its ink
 * (mark-ink.svg, public/landing/marks/) is reported, not imported, until
 * that redraw is done; so is a mark that looks like Base's placeholder.
 */
import { readFileSync } from 'node:fs';

import {
  compareMarks,
  looksLikePlaceholder,
  svgColours,
} from '../lib/image.mjs';

export const adaptsToDark = svg =>
  /prefers-color-scheme\s*:\s*dark/.test(svg.toString());

/** The SVG without its `@media (prefers-color-scheme: dark) { ... }` rules. */
export function lightOnly(svg) {
  let text = svg.toString();
  for (;;) {
    const match = /@media[^{]*prefers-color-scheme\s*:\s*dark[^{]*\{/.exec(
      text
    );
    if (!match) return Buffer.from(text);
    let depth = 1;
    let i = match.index + match[0].length;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    text = text.slice(0, match.index) + text.slice(i);
  }
}

export async function detectMark(seed, repo, site) {
  const path = repo.paths.mark;
  const next = repo.files.mark;
  if (!next) {
    return [
      {
        type: 'mark',
        summary: `no mark at ${path} in the repo`,
        apply: null,
        manual: `find ${seed.name}'s designed mark and set its path in scripts/seeds-sync/sources.json`,
      },
    ];
  }
  const current = readFileSync(site.publicPath(seed.marks.mark));
  let comparison;
  try {
    comparison = await compareMarks(current, next);
  } catch (error) {
    return [
      {
        type: 'mark',
        summary: `the repo's mark at ${path} cannot be drawn (${error.message})`,
        apply: null,
        manual: 'check the file',
      },
    ];
  }
  if (!comparison.changed) return [];

  const images = { before: current, after: next };
  const share = `${(comparison.changedShare * 100).toFixed(1)}% of pixels`;
  if (await looksLikePlaceholder(next)) {
    return [
      {
        type: 'mark',
        summary: `the repo's mark (${path}) looks like Base's placeholder tile; not imported`,
        images,
        apply: null,
        manual: null,
      },
    ];
  }
  const handDrawn = [seed.marks.markInk, seed.marks.landingInk].filter(Boolean);
  if (handDrawn.length) {
    return [
      {
        type: 'mark',
        summary: `mark changed (${share}); its ink copy is drawn by hand, so it waits for that redraw`,
        images,
        apply: null,
        manual: `redraw ${handDrawn.map(p => `public${p}`).join(' and ')} from the new ${path}, then copy the mark to public${seed.marks.mark}`,
        pending: true,
      },
    ];
  }
  const light = Boolean(seed.marks.markLight) || adaptsToDark(next);
  return [
    {
      type: 'mark',
      summary: `mark changed (${share})`,
      images,
      apply: { mark: { svg: next, light: light ? lightOnly(next) : null } },
      manual: null,
    },
  ];
}

/**
 * Whether the pastel was taken from a colour of the old mark (its comment
 * names the colour) that the new mark no longer has.
 */
export function pastelLeftBehind(comment, oldMark, newMark) {
  if (!comment) return null;
  const named =
    comment.match(/#[0-9a-fA-F]{6}\b/g)?.map(c => c.toLowerCase()) ?? [];
  const before = new Set(svgColours(oldMark));
  const after = new Set(svgColours(newMark));
  return named.find(colour => before.has(colour) && !after.has(colour)) ?? null;
}
