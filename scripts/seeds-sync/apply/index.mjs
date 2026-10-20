/**
 * --apply: the mechanical updates the detectors planned. Marks and stills go
 * to public/seeds/<slug>/, facts to the data modules (by text edits that
 * keep their comments), then Prettier, the favicon generator when colours
 * moved, and the state file. Copy (summary, does, promises) is never
 * touched.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { toSiteStill } from '../lib/image.mjs';
import { oklch } from '../lib/pastel.mjs';
import { tokenLabel } from '../detect/colours.mjs';
import {
  readComment,
  setComment,
  setProp,
  str,
  strArray,
} from './data-edit.mjs';

const FILES = {
  released: 'src/data/seeds.ts',
  soon: 'src/data/upcoming.ts',
  pages: 'src/data/seed-pages.ts',
};

const hue = hex => Math.round(oklch(hex).h);

/**
 * Writes the moved colours. The comment above `accent` (which says where the
 * three come from) is rewritten from the tokens they follow now.
 */
function applyColours(text, seed, { updates, sources }) {
  let next = text;
  for (const field of ['accent', 'ink', 'paper']) {
    if (updates[field])
      next = setProp(next, seed.slug, field, str(updates[field].to));
  }
  const moved = ['accent', 'ink', 'paper'].filter(field => updates[field]);
  if (moved.length && readComment(next, seed.slug, 'accent')) {
    const parts = ['accent', 'ink', 'paper']
      .filter(field => sources[field])
      .map(field => `${field} from ${tokenLabel(sources[field])}`);
    const sentence = parts.join(', ');
    next = setComment(
      next,
      seed.slug,
      'accent',
      `${sentence[0].toUpperCase()}${sentence.slice(1)}.`
    );
  }
  if (updates.pastel) {
    const { to, basis } = updates.pastel;
    next = setProp(next, seed.slug, 'pastel', str(to));
    const fromAccent =
      seed.kind === 'released' && basis.startsWith('the accent');
    const had = readComment(next, seed.slug, 'pastel');
    if (!fromAccent || had)
      next = setComment(
        next,
        seed.slug,
        'pastel',
        `Pastel from ${basis} (hue ${hue(to)}).`
      );
  }
  return next;
}

export async function applyPlans(root, results) {
  const texts = Object.fromEntries(
    Object.entries(FILES).map(([key, path]) => [
      key,
      readFileSync(join(root, path), 'utf8'),
    ])
  );
  const written = new Set();
  const applied = [];
  let coloursMoved = false;

  for (const result of results) {
    if (result.status !== 'ok') continue;
    const { seed } = result;
    const file = seed.kind;
    const dir = join(root, 'public', 'seeds', seed.slug);
    for (const finding of result.findings) {
      if (!finding.apply) continue;
      const plan = finding.apply;
      if (plan.mark) {
        writeFileSync(join(dir, 'mark.svg'), plan.mark.svg);
        written.add(`public/seeds/${seed.slug}/mark.svg`);
        if (plan.mark.light) {
          writeFileSync(join(dir, 'mark-light.svg'), plan.mark.light);
          written.add(`public/seeds/${seed.slug}/mark-light.svg`);
          if (file === 'released' && !seed.marks.markLight)
            texts.released = setProp(
              texts.released,
              seed.slug,
              'markLight',
              `\`\${dir('${seed.slug}')}/mark-light.svg\``
            );
          if (file === 'soon' && seed.shownMark.endsWith('/mark.svg'))
            texts.soon = setProp(
              texts.soon,
              seed.slug,
              'mark',
              str(`/seeds/${seed.slug}/mark-light.svg`)
            );
        }
      }
      if (plan.colours) {
        texts[file] = applyColours(texts[file], seed, plan.colours);
        coloursMoved = true;
      }
      if (plan.homepage) {
        const { url, shot } = plan.homepage;
        const conventional = url === `https://run-${seed.slug}.com`;
        texts[file] = setProp(
          texts[file],
          seed.slug,
          'homepage',
          file === 'soon' && conventional
            ? `homepage('${seed.slug}')`
            : str(url)
        );
        if (shot) {
          writeFileSync(join(dir, 'home.webp'), await toSiteStill(shot));
          written.add(`public/seeds/${seed.slug}/home.webp`);
          texts[file] = setProp(
            texts[file],
            seed.slug,
            'homepageShot',
            file === 'soon'
              ? `shot('${seed.slug}')`
              : `\`\${dir('${seed.slug}')}/home.webp\``
          );
        }
      }
      if (plan.shot) {
        writeFileSync(join(dir, 'home.webp'), await toSiteStill(plan.shot));
        written.add(`public/seeds/${seed.slug}/home.webp`);
      }
      if (plan.headline)
        texts[file] = setProp(
          texts[file],
          seed.slug,
          'headline',
          str(plan.headline)
        );
      if (plan.replaces) {
        texts[file] = setProp(
          texts[file],
          seed.slug,
          'replaces',
          strArray(plan.replaces.replaces)
        );
        texts[file] = setProp(
          texts[file],
          seed.slug,
          'primaryReplace',
          str(plan.replaces.primaryReplace)
        );
      }
      if (plan.version)
        texts.pages = setProp(
          texts.pages,
          seed.slug,
          'version',
          str(plan.version)
        );
      finding.applied = true;
      applied.push({ slug: seed.slug, summary: finding.summary });
    }
  }

  for (const [key, path] of Object.entries(FILES)) {
    const before = readFileSync(join(root, path), 'utf8');
    if (texts[key] !== before) {
      writeFileSync(join(root, path), texts[key]);
      written.add(path);
    }
  }
  const sources = [...written].filter(path => path.endsWith('.ts'));
  if (sources.length)
    execFileSync(
      join(root, 'node_modules/.bin/prettier'),
      ['--write', ...sources],
      { cwd: root, stdio: 'ignore' }
    );
  if (coloursMoved)
    execFileSync('npm', ['run', '--silent', 'favicons'], {
      cwd: root,
      stdio: 'inherit',
    });
  return { applied, written: [...written], favicons: coloursMoved };
}

/** Merges this run's records into the state and writes it, Prettier-formatted. */
export function writeState(root, path, state, records, now) {
  const seeds = { ...state.seeds, ...records };
  const sorted = Object.fromEntries(
    Object.entries(seeds).sort(([a], [b]) => a.localeCompare(b))
  );
  writeFileSync(
    path,
    `${JSON.stringify({ syncedAt: now, seeds: sorted }, null, 2)}\n`
  );
  execFileSync(join(root, 'node_modules/.bin/prettier'), ['--write', path], {
    cwd: root,
    stdio: 'ignore',
  });
}
