/**
 * Reads copy sources at the released listing's tag (HEAD for coming-soon
 * seeds). Designed marks and brand declarations continue to follow HEAD.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  headCommit,
  rawFile,
  tagCommit,
  Unreadable,
  versionTags,
} from '../lib/net.mjs';
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
export async function readFiles(repo, slug, commit, { copyOnly = false } = {}) {
  const paths = copyOnly
    ? {}
    : { mark: markPath(slug), branding: BRANDING, theme: THEME };
  for (const file of COPY_FILES) paths[file] = file;
  const entries = await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [
      key,
      await rawFile(repo, commit, path),
    ])
  );
  return { paths, files: Object.fromEntries(entries) };
}

export async function readRepo(seed, { copyOnly = false } = {}) {
  const [head, tags] = await Promise.all([
    headCommit(seed.repo),
    versionTags(seed.repo),
  ]);
  const released = seed.kind === 'released';
  if (released && !seed.version)
    throw new Unreadable(`release of ${seed.repo}`, 'listing has no version');
  // The displayed version is the publication boundary. A newer tag is a
  // finding for review, not permission to read unreleased/default-branch copy.
  const sourceRef = released ? seed.version : 'HEAD';
  const copyCommit = released ? await tagCommit(seed.repo, sourceRef) : head;
  const sourceReason = released
    ? 'released listing version'
    : tags.length
      ? 'coming-soon seed'
      : 'coming-soon seed; no release tag';
  const { paths, files } = await readFiles(seed.repo, seed.slug, copyCommit, {
    copyOnly: true,
  });
  if (released && !files['CONTRACT.md'])
    throw new Unreadable(
      `CONTRACT.md of ${seed.repo}@${sourceRef}`,
      'absent at release tag'
    );
  // Brand art still tracks HEAD; only the copy files follow the release.
  if (!copyOnly) {
    Object.assign(paths, {
      mark: markPath(seed.slug),
      branding: BRANDING,
      theme: THEME,
    });
    await Promise.all(
      ['mark', 'branding', 'theme'].map(async key => {
        files[key] = await rawFile(seed.repo, head, paths[key]);
      })
    );
  }
  return {
    head,
    tags,
    latestTag: tags[0] ?? null,
    sourceRef,
    sourceReason,
    copyCommit,
    paths,
    files,
  };
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
