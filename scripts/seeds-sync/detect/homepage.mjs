/**
 * (c) and (d) Homepages. A seed's homepage is read in a browser
 * (sources/capture-page.mjs) and compared with what the site holds: its
 * headline (the h1, or the heading after an h1 that is only the wordmark),
 * the products its "alternative to" line names, and how it looks. The look
 * is compared with the stored still (public/seeds/<slug>/home.webp) where
 * the site keeps one, else with the fingerprint the last sync recorded.
 */
import { readFileSync } from 'node:fs';

import {
  compareSignatures,
  compareStills,
  stillSignature,
} from '../lib/image.mjs';

export const normaliseText = value =>
  value
    ?.normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim() ?? null;

/** The products an "alternative to" line names, in its order. */
export function parseAlternatives(line) {
  const match = /alternatives?\s+to\s+(.+)$/i.exec(normaliseText(line) ?? '');
  if (!match) return null;
  const list = match[1].split(/\.\s/)[0].replace(/[.!]+$/, '');
  const names = list
    .split(/\s*,\s*(?:and\s+|or\s+)?|\s+(?:and|or|&)\s+/)
    .map(name => name.trim())
    .filter(Boolean);
  return names.length ? names : null;
}

/** The card's list and its lead, with the owner's overrides applied. */
export function replacesFor(names, override = {}) {
  const replaces = override.replaces ?? names;
  const primary = override.primaryReplace ?? replaces[0];
  return {
    replaces: [primary, ...replaces.filter(name => name !== primary)],
    primaryReplace: primary,
  };
}

const sameList = (a, b) =>
  a.length === b.length && a.every((name, i) => name === b[i]);

/**
 * Returns { unreadable } when a live homepage could not be read, else
 * { findings, record } where `record` is what the state keeps for next time.
 */
export async function detectHomepage(seed, home, previous, override, site) {
  const url =
    seed.homepage ?? override.homepage ?? `https://run-${seed.slug}.com`;
  if (!home?.ok) {
    if (!seed.homepage) return { findings: [], record: null };
    const gone = /ERR_NAME_NOT_RESOLVED|HTTP 40[34]|HTTP 410/.test(
      home?.error ?? ''
    );
    return {
      unreadable: `homepage ${url} ${gone ? 'looks gone' : 'could not be read'} (${home?.error ?? 'not captured'})`,
    };
  }

  const findings = [];
  const image = readFileSync(home.png);
  const signature = await stillSignature(image);
  const headline = normaliseText(home.headline);
  const record = {
    headline,
    signature: seed.homepageShot ? undefined : signature,
  };

  if (!seed.homepage) {
    findings.push({
      type: 'homepage',
      summary: `homepage now live at ${url}`,
      images: { after: image },
      apply: { homepage: { url, shot: seed.hasReel ? null : image } },
      copy: 'a new homepage: check category and line against its headline and subhead',
    });
  }

  const before = normaliseText(seed.headline) ?? previous?.headline ?? null;
  if (before && headline && before !== headline) {
    findings.push({
      type: 'homepage',
      summary: `headline changed: "${before}" -> "${headline}"`,
      apply: seed.headline ? { headline } : null,
      copy: `headline is now "${headline}": check category and line`,
    });
  }

  const names = parseAlternatives(home.alternativeTo);
  if (!names) {
    findings.push({
      type: 'homepage',
      summary: 'no "alternative to" line found on the homepage',
      apply: null,
      manual: `check ${url} for the products it names; replaces left as is`,
    });
  } else {
    const wanted = replacesFor(names, override);
    if (
      !sameList(wanted.replaces, seed.replaces) ||
      wanted.primaryReplace !== seed.primaryReplace
    ) {
      findings.push({
        type: 'homepage',
        summary: `"alternative to" now names ${names.join(', ')} (was ${seed.replaces.join(', ')})`,
        details: {
          line: home.alternativeTo,
          override: override.primaryReplace ?? null,
        },
        apply: { replaces: wanted },
        copy:
          wanted.primaryReplace !== seed.primaryReplace
            ? `primary incumbent is now ${wanted.primaryReplace} (was ${seed.primaryReplace}): seoTitle, seoDescription and moveIn may name the old one`
            : null,
      });
    }
  }

  if (seed.homepageShot) {
    const stored = readFileSync(site.publicPath(seed.homepageShot));
    const comparison = await compareStills(stored, image);
    if (comparison.changed) {
      findings.push({
        type: 'homepage',
        summary: `homepage looks different (${(comparison.changedShare * 100).toFixed(1)}% of the still changed)`,
        images: { before: stored, after: image },
        apply: { shot: image },
        copy: 'homepage changed visibly: check category and line against its headline and subhead',
      });
    }
  } else if (seed.homepage) {
    const comparison = compareSignatures(
      previous?.signature ?? null,
      signature
    );
    if (comparison?.changed) {
      findings.push({
        type: 'homepage',
        summary: `homepage looks different (${(comparison.changedShare * 100).toFixed(0)}% of its fingerprint)${seed.hasReel ? '; its reel may be out of date' : ''}`,
        images: { after: image },
        apply: null,
        copy: 'homepage changed visibly: check category and line against its headline and subhead',
      });
    }
  }
  return { findings, record };
}
