/**
 * Reads what the sync compares from a seed's repository at one commit: its
 * designed mark, its brand declarations (src/branding.json and the
 * public/rer-theme.css every seed serves) and the copy sources a page
 * rewrite starts from (CONTRACT.md, README.md, seed.json), plus its tags.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { headCommit, rawFile, versionTags } from '../lib/net.mjs';
import { normaliseHex } from '../lib/pastel.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const sources = JSON.parse(
  readFileSync(join(here, '..', 'sources.json'), 'utf8')
);

export const BRANDING = 'src/branding.json';
export const THEME = 'public/rer-theme.css';
export const COPY_FILES = ['CONTRACT.md', 'README.md', 'seed.json'];

/** Where a seed keeps its designed mark (sources.json, else the Base path). */
export const markPath = slug => sources.marks[slug] ?? sources.defaultMark;

/** The files the sync reads, at `commit`; a missing file is null. */
export async function readFiles(repo, slug, commit) {
  const paths = { mark: markPath(slug), branding: BRANDING, theme: THEME };
  for (const file of COPY_FILES) paths[file] = file;
  const entries = await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [
      key,
      await rawFile(repo, commit, path),
    ])
  );
  return { paths, files: Object.fromEntries(entries) };
}

export async function readRepo(seed) {
  const [head, tags] = await Promise.all([
    headCommit(seed.repo),
    versionTags(seed.repo),
  ]);
  const { paths, files } = await readFiles(seed.repo, seed.slug, head);
  return { head, tags, latestTag: tags[0] ?? null, paths, files };
}

/**
 * The brand colours a repository declares, as { 'branding.primaryColor':
 * '#14204a', 'theme.page': '#f7f6fb', ... }: every hex value in
 * src/branding.json and every --rer-* colour on public/rer-theme.css's :root.
 */
export function brandTokens(files) {
  const tokens = {};
  if (files.branding) {
    let json = null;
    try {
      json = JSON.parse(files.branding.toString('utf8'));
    } catch {
      tokens['branding.unparsable'] = 'unparsable';
    }
    const walk = (value, path) => {
      if (typeof value === 'string') {
        const hex = normaliseHex(value);
        if (hex) tokens[`branding.${path}`] = hex;
      } else if (value && typeof value === 'object') {
        for (const [key, inner] of Object.entries(value))
          walk(inner, path ? `${path}.${key}` : key);
      }
    };
    walk(json, '');
  }
  if (files.theme) {
    const css = files.theme.toString('utf8');
    for (const block of css.match(/:root\s*\{[^}]*\}/g) ?? []) {
      for (const [, name, value] of block.matchAll(
        /--rer-([\w-]+)\s*:\s*([^;]+);/g
      )) {
        const hex = normaliseHex(value);
        if (hex) tokens[`theme.${name}`] = hex;
      }
    }
  }
  return tokens;
}

/** The live homepage's colours (capture-page.mjs) as tokens. */
export function liveTokens(home) {
  const tokens = {};
  for (const [key, value] of Object.entries(home?.theme ?? {})) {
    if (value) tokens[`live.${key}`] = value;
  }
  return tokens;
}
