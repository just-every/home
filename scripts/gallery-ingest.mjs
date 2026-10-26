#!/usr/bin/env node
/**
 * Brings each seed's product screenshots into its page's gallery.
 *
 *   node scripts/gallery-ingest.mjs [manifests-dir]
 *
 * Reads <manifests-dir>/<slug>/manifest.json (by default under
 * ~/.orchestrator/evidence/home/gallery), each shaped
 *
 *   { "slug": "chest", "items": [ { "file": "01-files.webp", "alt": "…",
 *     "caption": "…", "width": 1600, "height": 1000,
 *     "source": "demo" | "repo" | "local", "from": "<url, repo path or in-app path>" } ] }
 *
 * with its items in display order, up to five a seed. An item is kept when
 * its file sits beside the manifest, is a WebP of the stated width and height
 * and at most 300 KiB, and it has an alt and a caption. Kept files are copied
 * to public/seeds/<slug>/gallery/, each with a small thumbnail in
 * gallery/thumbs/, and src/data/seed-gallery.ts is written from them. Files
 * and entries of slugs or items no longer in a manifest are removed, so the
 * command is safe to run again whenever manifests change. Prints a summary
 * per seed and exits non-zero only when the manifests directory is missing.
 */
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as prettier from 'prettier';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const seedsDir = join(root, 'public', 'seeds');
const dataFile = join(root, 'src', 'data', 'seed-gallery.ts');
const hidden = new Set(
  JSON.parse(readFileSync(join(root, 'src/data/hidden-seeds.json'), 'utf8'))
);
const manifestsDir = resolve(
  process.argv[2] ?? join(homedir(), '.orchestrator/evidence/home/gallery')
);

const MAX_ITEMS = 5;
const MAX_BYTES = 300 * 1024;
const THUMB_WIDTH = 200;
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const FILE = /^[A-Za-z0-9][A-Za-z0-9._-]*\.webp$/;

/** True when the bytes are a RIFF WebP container. */
const isWebp = bytes =>
  bytes.length >= 12 &&
  bytes.toString('ascii', 0, 4) === 'RIFF' &&
  bytes.toString('ascii', 8, 12) === 'WEBP';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');

/** The address bar's host for a demo item, from its `from` URL. */
function hostOf(from) {
  try {
    const url = new URL(from);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.host
      : null;
  } catch {
    return null;
  }
}

/** One item checked: { ok: true, entry, bytes } or { ok: false, reason }. */
async function checkItem(item, dir) {
  if (!item || typeof item !== 'object') {
    return { ok: false, reason: 'not an object' };
  }
  const { file, alt, caption, width, height, source, from } = item;
  if (typeof file !== 'string' || !FILE.test(file)) {
    return {
      ok: false,
      reason: `file ${JSON.stringify(file)} is not a plain .webp name`,
    };
  }
  const path = join(dir, file);
  if (!existsSync(path) || !statSync(path).isFile()) {
    return { ok: false, reason: `${file}: missing` };
  }
  const bytes = readFileSync(path);
  if (!isWebp(bytes)) return { ok: false, reason: `${file}: not a WebP` };
  if (bytes.length > MAX_BYTES) {
    return {
      ok: false,
      reason: `${file}: ${Math.round(bytes.length / 1024)} KiB, over the ${MAX_BYTES / 1024} KiB limit`,
    };
  }
  let meta;
  try {
    meta = await sharp(bytes).metadata();
  } catch (error) {
    return { ok: false, reason: `${file}: unreadable (${error.message})` };
  }
  if (meta.format !== 'webp') {
    return { ok: false, reason: `${file}: not a WebP` };
  }
  if (meta.width !== width || meta.height !== height) {
    return {
      ok: false,
      reason: `${file}: ${meta.width}x${meta.height}, manifest says ${width}x${height}`,
    };
  }
  if (typeof alt !== 'string' || !alt.trim()) {
    return { ok: false, reason: `${file}: empty alt` };
  }
  if (typeof caption !== 'string' || !caption.trim()) {
    return { ok: false, reason: `${file}: empty caption` };
  }
  if (source !== 'demo' && source !== 'repo' && source !== 'local') {
    return {
      ok: false,
      reason: `${file}: source ${JSON.stringify(source)} is not demo, repo or local`,
    };
  }
  const host = source === 'demo' ? hostOf(from) : null;
  const warning =
    source === 'demo' && !host
      ? `${file}: demo with no URL in "from"; shown with a neutral bar`
      : null;
  return {
    ok: true,
    bytes,
    warning,
    entry: {
      file,
      alt: alt.trim(),
      caption: caption.trim(),
      width,
      height,
      host,
    },
  };
}

/** Writes `bytes` to `path` unless it already holds them. */
function writeIfChanged(path, bytes) {
  if (existsSync(path) && digest(readFileSync(path)) === digest(bytes))
    return false;
  writeFileSync(path, bytes);
  return true;
}

/** Every manifest under the directory, read; unreadable ones are reported. */
function readManifests() {
  const found = [];
  for (const name of readdirSync(manifestsDir).sort()) {
    const dir = join(manifestsDir, name);
    const path = join(dir, 'manifest.json');
    if (!statSync(dir).isDirectory() || !existsSync(path)) continue;
    try {
      found.push({
        dir,
        name,
        manifest: JSON.parse(readFileSync(path, 'utf8')),
      });
    } catch (error) {
      found.push({
        dir,
        name,
        error: `manifest.json unreadable (${error.message})`,
      });
    }
  }
  return found;
}

async function main() {
  if (!existsSync(manifestsDir) || !statSync(manifestsDir).isDirectory()) {
    console.error(
      `No manifests directory at ${manifestsDir}; nothing changed.`
    );
    process.exit(1);
  }

  /** slug -> kept entries, in display order. */
  const gallery = new Map();
  const lines = [];

  for (const { dir, name, manifest, error } of readManifests()) {
    if (error) {
      lines.push(`${name}: skipped, ${error}`);
      continue;
    }
    const slug = manifest?.slug;
    if (hidden.has(slug)) {
      lines.push(`${slug}: skipped, hidden product`);
      continue;
    }
    if (typeof slug !== 'string' || !SLUG.test(slug)) {
      lines.push(
        `${name}: skipped, slug ${JSON.stringify(slug)} is not a seed slug`
      );
      continue;
    }
    if (!existsSync(join(seedsDir, slug))) {
      lines.push(
        `${slug}: skipped, no seed with that slug (public/seeds/${slug})`
      );
      continue;
    }
    if (gallery.has(slug)) {
      lines.push(
        `${slug}: skipped ${name}/manifest.json, a second manifest for it`
      );
      continue;
    }
    const items = Array.isArray(manifest.items) ? manifest.items : [];
    const notes = [];
    if (slug !== name) notes.push(`read from ${name}/`);
    if (items.length > MAX_ITEMS) {
      notes.push(
        `${items.length - MAX_ITEMS} past the first ${MAX_ITEMS} ignored`
      );
    }

    const out = join(seedsDir, slug, 'gallery');
    const thumbs = join(out, 'thumbs');
    const kept = [];
    const seen = new Set();
    for (const item of items.slice(0, MAX_ITEMS)) {
      const result = await checkItem(item, dir);
      if (!result.ok) {
        notes.push(`dropped ${result.reason}`);
        continue;
      }
      const { entry, bytes, warning } = result;
      if (seen.has(entry.file)) {
        notes.push(`dropped ${entry.file}: listed twice`);
        continue;
      }
      seen.add(entry.file);
      if (warning) notes.push(warning);
      mkdirSync(thumbs, { recursive: true });
      writeIfChanged(join(out, entry.file), bytes);
      const thumb = await sharp(bytes)
        .resize({ width: THUMB_WIDTH })
        .webp({ quality: 72 })
        .toBuffer();
      writeIfChanged(join(thumbs, entry.file), thumb);
      kept.push(entry);
    }
    if (kept.length > 0) gallery.set(slug, kept);
    lines.push(
      `${slug}: ${kept.length} of ${items.length} kept${notes.length ? `; ${notes.join('; ')}` : ''}`
    );
  }

  // Remove what no manifest lists any more: whole galleries, then stray files.
  const removed = [];
  for (const slug of readdirSync(seedsDir).sort()) {
    const out = join(seedsDir, slug, 'gallery');
    if (!existsSync(out)) continue;
    const kept = gallery.get(slug);
    if (!kept) {
      rmSync(out, { recursive: true, force: true });
      removed.push(`${slug}/gallery/`);
      continue;
    }
    const files = new Set(kept.map(entry => entry.file));
    for (const [folder, prefix] of [
      [out, ''],
      [join(out, 'thumbs'), 'thumbs/'],
    ]) {
      if (!existsSync(folder)) continue;
      for (const file of readdirSync(folder)) {
        if (file === 'thumbs' && folder === out) continue;
        if (files.has(file)) continue;
        rmSync(join(folder, file), { recursive: true, force: true });
        removed.push(`${slug}/gallery/${prefix}${file}`);
      }
    }
  }

  await writeData(gallery);

  console.log(`Manifests: ${manifestsDir}`);
  for (const line of lines) console.log(`  ${line}`);
  if (lines.length === 0) console.log('  (none)');
  const total = [...gallery.values()].reduce(
    (sum, kept) => sum + kept.length,
    0
  );
  console.log(
    `${gallery.size} seeds, ${total} screenshots in ${basename(dataFile)}.`
  );
  if (removed.length) console.log(`Removed: ${removed.join(', ')}`);
}

/** Writes src/data/seed-gallery.ts from the kept entries, formatted. */
async function writeData(gallery) {
  const record = Object.fromEntries(
    [...gallery.keys()].sort().map(slug => [
      slug,
      gallery.get(slug).map(({ file, alt, caption, width, height, host }) => ({
        src: `/seeds/${slug}/gallery/${file}`,
        thumb: `/seeds/${slug}/gallery/thumbs/${file}`,
        alt,
        caption,
        width,
        height,
        host,
      })),
    ])
  );
  const source = `/**
 * Each seed's product screenshots, in display order, for its page's gallery
 * (src/components/seed/Gallery.tsx). Written by scripts/gallery-ingest.mjs
 * from the screenshot manifests; run it again rather than editing this file.
 */
export interface SeedShot {
  /** A WebP in public/seeds/<slug>/gallery/. */
  src: string;
  /** Its ${THUMB_WIDTH}px-wide thumbnail, in gallery/thumbs/. */
  thumb: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** The host its address bar shows (a demo's), or null for a neutral bar. */
  host: string | null;
}

export const seedGallery: Record<string, SeedShot[]> = ${JSON.stringify(record, null, 2)};
`;
  const options = (await prettier.resolveConfig(dataFile)) ?? {};
  const formatted = await prettier.format(source, {
    ...options,
    filepath: dataFile,
  });
  writeIfChanged(dataFile, Buffer.from(formatted));
}

await main();
