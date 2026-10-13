#!/usr/bin/env node
/**
 * update-reels.mjs - refresh the landing page's demo reels from the Sizzle project.
 *
 *   node scripts/update-reels.mjs                 refresh every seed that has a reel(...) line
 *   node scripts/update-reels.mjs --dry-run       show what it would pick and do, change nothing
 *   node scripts/update-reels.mjs --seed uptime   only these seeds (comma separated)
 *   node scripts/update-reels.mjs --force         re-encode even when the source is unchanged
 *   node scripts/update-reels.mjs --no-remote     do not look on m1-runner
 *   node scripts/update-reels.mjs --poster-at uptime=12.5   poster frame (seconds) for a seed
 *
 * Which seeds: the ones with a `reel('<slug>', <seconds>)` line in src/data/seeds.ts.
 * A seed without that line is never touched; to add a reel, add the line (any
 * duration) and run this.
 *
 * Which file is the newest finished reel for a seed (see SEED-SIZZLE-PROCESS.md in
 * the runeditrun repo): a complete H.264 render named <slug>-sizzle*.mp4 (previews,
 * work-in-progress and contact sheets are skipped) in
 *   - tools/sizzle/out/<slug>/ of the RER checkout or any sizzle-* worktree (its
 *     .json sidecar must say quality final),
 *   - a final/ folder under .artifacts/sizzle-<slug>-*,
 *   - the same out/ folders on m1-runner, when it answers (pulled with rsync).
 * The newest by modification time wins; a higher-resolution copy of the same cut
 * (same duration, written within 15 minutes) is preferred, so a 4K render beats its
 * 1080p share copy. A file still being written, or without a readable duration of
 * at least 20 s at 1080p or more, is not finished and is skipped.
 *
 * What it writes, and only this: public/video/<slug>-1080.mp4 (1920x1080, 60 fps
 * when that stays under ~30 MB, else 30 fps), <slug>-720.mp4 (1280x720, 30 fps, at
 * most ~12 MB), <slug>-poster.webp, and the duration in that seed's reel(...) line.
 * The 1080 file carries the chosen source's name, size and mtime in its comment tag,
 * which is how a second run knows there is nothing to update.
 *
 * Needs /opt/homebrew/bin/ffmpeg (the /usr/local one is x86-only) and, for the
 * poster, sharp (installed with next).
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const videoDir = join(repo, 'public', 'video');
const seedsFile = join(repo, 'src', 'data', 'seeds.ts');

const FFMPEG = process.env.FFMPEG || '/opt/homebrew/bin/ffmpeg';
const FFPROBE = process.env.FFPROBE || '/opt/homebrew/bin/ffprobe';
const RER_ROOT = process.env.RER_ROOT || join(homedir(), 'www', 'runeditrun');
const REMOTE_HOST = process.env.SIZZLE_REMOTE_HOST || 'm1-runner';

const MAX_1080_BYTES = 30 * 1024 * 1024;
const MAX_720_BYTES = 12 * 1024 * 1024;
const MIN_SECONDS = 20;
const SETTLE_MS = 120_000; // a file touched this recently may still be written
const SAME_CUT_MS = 15 * 60_000;
const CRF_1080 = [19, 21, 23, 25, 27];
const CRF_720 = [23, 25, 27, 29, 31];

const args = process.argv.slice(2);
const flag = name => args.includes(`--${name}`);
const option = name => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('dry-run');
const force = flag('force');
const useRemote = !flag('no-remote');
const only = option('seed')?.split(',').map(s => s.trim()).filter(Boolean);
const posterAt = Object.fromEntries(
  args.flatMap((a, i) => (args[i - 1] === '--poster-at' ? [a.split('=')] : [])).map(([k, v]) => [k, Number(v)]),
);

const log = (...m) => console.log(...m);
const mb = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const stamp = ms => new Date(ms).toLocaleString('sv-SE', { hour12: false }).replace(' ', 'T');

function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
  if (r.error) throw r.error;
  return r;
}

function probe(file) {
  const r = run(FFPROBE, ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', file]);
  if (r.status !== 0) return null;
  try {
    const j = JSON.parse(r.stdout);
    const v = j.streams.find(s => s.codec_type === 'video');
    const a = j.streams.find(s => s.codec_type === 'audio');
    const duration = Number(j.format?.duration);
    if (!v || !(duration > 0)) return null;
    return {
      width: v.width,
      height: v.height,
      fps: v.r_frame_rate,
      codec: v.codec_name,
      hasAudio: Boolean(a),
      duration,
      comment: j.format?.tags?.comment ?? '',
    };
  } catch {
    return null;
  }
}

// ---------- seeds with a reel ----------

function reelSeeds() {
  const text = readFileSync(seedsFile, 'utf8');
  return [...text.matchAll(/^\s*reel:\s*reel\('([a-z0-9-]+)',\s*([\d.]+)\)/gm)].map(m => ({
    slug: m[1],
    seconds: Number(m[2]),
  }));
}

function writeSeedDuration(slug, seconds) {
  const text = readFileSync(seedsFile, 'utf8');
  const re = new RegExp(`^(\\s*reel:\\s*reel\\('${slug}',\\s*)[\\d.]+(\\))`, 'm');
  if (!re.test(text)) throw new Error(`no reel('${slug}', ...) line in src/data/seeds.ts`);
  writeFileSync(seedsFile, text.replace(re, `$1${seconds}$2`));
}

// ---------- finding the newest final ----------

const SKIP_NAME = /preview|wip|contact|draft|segment|sheet/i;

function isCandidateName(slug, name) {
  return name.startsWith(`${slug}-sizzle`) && name.endsWith('.mp4') && !SKIP_NAME.test(name);
}

function dirs(parent, accept) {
  if (!existsSync(parent)) return [];
  return readdirSync(parent, { withFileTypes: true })
    .filter(e => e.isDirectory() && accept(e.name))
    .map(e => join(parent, e.name));
}

function localCandidates(slug) {
  const found = [];
  const outDirs = [
    join(RER_ROOT, 'tools', 'sizzle', 'out', slug),
    ...dirs(join(RER_ROOT, '.claude', 'worktrees'), n => n.startsWith('sizzle-')).map(d =>
      join(d, 'tools', 'sizzle', 'out', slug),
    ),
  ];
  for (const dir of outDirs) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!isCandidateName(slug, name)) continue;
      let quality = null;
      try {
        quality = JSON.parse(readFileSync(join(dir, name.replace(/\.mp4$/, '.json')), 'utf8')).quality;
      } catch {}
      if (quality === 'final') found.push(join(dir, name));
    }
  }
  for (const folder of dirs(join(RER_ROOT, '.artifacts'), n => n.startsWith(`sizzle-${slug}-`))) {
    const stack = [[folder, 0]];
    while (stack.length) {
      const [dir, depth] = stack.pop();
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory() && depth < 2) stack.push([p, depth + 1]);
        else if (e.isFile() && basename(dir) === 'final' && isCandidateName(slug, e.name)) found.push(p);
      }
    }
  }
  return found.map(path => {
    const st = statSync(path);
    return { where: 'local', path, mtimeMs: Math.round(st.mtimeMs), size: st.size };
  });
}

function remoteCandidates(slug) {
  const script =
    'for d in "$HOME"/rer-sizzle*; do [ -d "$d/tools/sizzle/out/' + slug + '" ] && ' +
    `find "$d/tools/sizzle/out/${slug}" -name '${slug}-sizzle*.mp4' -exec stat -f '%m|%z|%N' {} + 2>/dev/null; done; true\n`;
  const r = run('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=6', REMOTE_HOST, 'bash', '-s'], { input: script });
  if (r.status !== 0) {
    log(`  ${REMOTE_HOST}: not reachable, skipped`);
    return [];
  }
  return r.stdout
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [m, size, path] = line.split('|');
      return { where: 'remote', path, mtimeMs: Number(m) * 1000, size: Number(size) };
    })
    .filter(c => isCandidateName(slug, basename(c.path)) && !c.path.includes('/.cache/'));
}

function pull(slug, cand) {
  const dir = join(videoDir, `.pull-${slug}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, basename(cand.path));
  log(`  pulling ${REMOTE_HOST}:${cand.path} (${mb(cand.size)})`);
  const r = run('rsync', ['-t', '-e', 'ssh -o BatchMode=yes', `${REMOTE_HOST}:${cand.path}`, dest], {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  return r.status === 0 ? { ...cand, localPath: dest } : null;
}

function finished(info) {
  return info && info.duration >= MIN_SECONDS && info.height >= 1080 && info.codec === 'h264' && info.hasAudio;
}

function chooseSource(slug) {
  const pool = localCandidates(slug);
  if (useRemote) pool.push(...remoteCandidates(slug));
  // The same file on both machines counts once, local first.
  const seen = new Set();
  const unique = pool
    .sort((a, b) => b.mtimeMs - a.mtimeMs || (a.where === 'local' ? -1 : 1))
    .filter(c => {
      const key = `${basename(c.path)}|${c.size}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  log(`  ${unique.length} candidate file(s)`);
  const ready = [];
  for (const cand of unique) {
    if (Date.now() - cand.mtimeMs < SETTLE_MS) {
      log(`  skip ${cand.path}: written in the last ${SETTLE_MS / 1000} s, may be unfinished`);
      continue;
    }
    let c = cand;
    if (cand.where === 'remote') {
      if (ready.length) continue; // pulled only when newer than every finished local file
      c = pull(slug, cand);
      if (!c) {
        log(`  skip ${cand.path}: could not pull`);
        continue;
      }
    }
    const info = probe(c.localPath ?? c.path);
    if (!finished(info)) {
      log(`  skip ${c.path}: not a complete final render`);
      continue;
    }
    ready.push({ ...c, ...info });
  }
  if (!ready.length) return null;
  const newest = ready[0];
  const sameCut = ready.filter(
    c => Math.abs(c.duration - newest.duration) < 0.2 && Math.abs(c.mtimeMs - newest.mtimeMs) <= SAME_CUT_MS,
  );
  const best = sameCut.sort((a, b) => b.width * b.height - a.width * a.height || b.mtimeMs - a.mtimeMs)[0];
  best.why =
    `newest of ${ready.length} finished file(s) by modification time` +
    (best !== newest
      ? `; ${basename(newest.path)} is a lower-resolution copy of the same cut, ${best.width}x${best.height} preferred`
      : '');
  return best;
}

// ---------- encoding ----------

const sourceKey = c => JSON.stringify({ name: basename(c.path), size: c.size, mtimeMs: c.mtimeMs });

function ffmpeg(ffArgs) {
  return new Promise((ok, fail) => {
    const p = spawn('nice', ['-n', '10', FFMPEG, '-hide_banner', '-loglevel', 'error', '-nostdin', '-y', ...ffArgs], {
      stdio: ['ignore', 'inherit', 'inherit'],
    });
    p.on('exit', code => (code === 0 ? ok() : fail(new Error(`ffmpeg exited ${code}`))));
    p.on('error', fail);
  });
}

async function encode({ src, out, width, height, fps, crf, audioBitrate, comment }) {
  await ffmpeg([
    '-i', src,
    '-map', '0:v:0', '-map', '0:a:0',
    '-vf', `scale=${width}:${height}:flags=lanczos,format=yuv420p`,
    '-r', String(fps),
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', String(crf),
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-c:a', 'aac', '-b:a', audioBitrate, '-ar', '48000',
    '-metadata', `comment=${comment}`,
    '-movflags', '+faststart',
    out,
  ]);
  return statSync(out).size;
}

async function encodeUnder({ label, src, out, width, height, fpsLadder, crfs, maxBytes, audioBitrate, comment }) {
  for (const fps of fpsLadder) {
    for (const crf of crfs) {
      const size = await encode({ src, out, width, height, fps, crf, audioBitrate, comment });
      log(`  ${label}: ${width}x${height} ${fps} fps crf ${crf} -> ${mb(size)}`);
      if (size <= maxBytes) return { fps, crf };
    }
  }
  throw new Error(`${label} stays above ${mb(maxBytes)} at the highest crf tried`);
}

// ---------- poster ----------

async function pickPoster(slug, src, duration) {
  const { default: sharp } = await import('sharp');
  const tmp = join(videoDir, `.poster-${slug}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  try {
    // Candidate frames every ~2 s from the first scene change to before the end card.
    // A good poster is sharp (lots of edges), not too dark or blown out, and settled:
    // the frame 0.4 s later barely differs, so no half-faded type or mid-wipe.
    const start = Math.max(2, duration * 0.06);
    const last = duration - 6;
    const count = Math.max(8, Math.floor((last - start) / 2));
    const times =
      posterAt[slug] != null
        ? [posterAt[slug]]
        : Array.from({ length: count }, (_, i) => start + (i * (last - start)) / (count - 1));
    const small = async png => (await sharp(png).resize(480, 270).greyscale().raw().toBuffer());
    const scored = [];
    for (const [i, t] of times.entries()) {
      const png = join(tmp, `f${i}.png`);
      const next = join(tmp, `n${i}.png`);
      await ffmpeg(['-ss', t.toFixed(3), '-i', src, '-frames:v', '1', '-vf', 'scale=1920:1080:flags=lanczos', png]);
      await ffmpeg(['-ss', (t + 0.4).toFixed(3), '-i', src, '-frames:v', '1', '-vf', 'scale=1920:1080:flags=lanczos', next]);
      const edges = await sharp(png)
        .greyscale()
        .convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] })
        .stats();
      const mean = (await sharp(png).greyscale().stats()).channels[0].mean;
      const [a, b] = [await small(png), await small(next)];
      let diff = 0;
      for (let k = 0; k < a.length; k++) diff += Math.abs(a[k] - b[k]);
      diff /= a.length;
      const settled = 1 - Math.min(1, diff / 6);
      scored.push({ t, png, score: mean > 30 && mean < 225 ? edges.channels[0].stdev * settled : 0 });
    }
    const best = scored.sort((a, b) => b.score - a.score)[0];
    const out = join(videoDir, `.${slug}-poster.tmp.webp`);
    await sharp(best.png).webp({ quality: 82, effort: 5 }).toFile(out);
    return { tmp: out, at: best.t };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ---------- per seed ----------

async function updateSeed({ slug, seconds }) {
  log(`\n${slug}`);
  const src = chooseSource(slug);
  if (!src) {
    log('  no finished reel found; leaving it as is');
    return false;
  }
  const file = src.localPath ?? src.path;
  log(`  source   ${src.where === 'remote' ? `${REMOTE_HOST}:` : ''}${src.path}`);
  log(`           ${stamp(src.mtimeMs)}  ${src.duration.toFixed(3)} s  ${src.width}x${src.height} ${src.fps}  ${mb(src.size)}`);
  log(`           why: ${src.why}`);

  const o1080 = join(videoDir, `${slug}-1080.mp4`);
  const o720 = join(videoDir, `${slug}-720.mp4`);
  const oPoster = join(videoDir, `${slug}-poster.webp`);
  const key = sourceKey(src);
  const have = existsSync(o1080) ? probe(o1080) : null;
  const upToDate =
    have && have.comment === key && existsSync(o720) && existsSync(oPoster) && Number(have.duration.toFixed(1)) === seconds;
  if (upToDate && !force) {
    log(`  up to date: ${slug} already carries this source, nothing to update`);
    rmSync(join(videoDir, `.pull-${slug}`), { recursive: true, force: true });
    return false;
  }
  if (dryRun) {
    log(`  would re-encode ${slug}-1080.mp4, ${slug}-720.mp4, ${slug}-poster.webp and set the duration in seeds.ts`);
    rmSync(join(videoDir, `.pull-${slug}`), { recursive: true, force: true });
    return true;
  }

  const t1080 = join(videoDir, `.${slug}-1080.tmp.mp4`);
  const t720 = join(videoDir, `.${slug}-720.tmp.mp4`);
  try {
    const a = await encodeUnder({
      label: '1080', src: file, out: t1080, width: 1920, height: 1080,
      fpsLadder: [60, 30], crfs: CRF_1080, maxBytes: MAX_1080_BYTES, audioBitrate: '128k', comment: key,
    });
    const b = await encodeUnder({
      label: '720', src: file, out: t720, width: 1280, height: 720,
      fpsLadder: [30], crfs: CRF_720, maxBytes: MAX_720_BYTES, audioBitrate: '96k', comment: key,
    });
    const poster = await pickPoster(slug, file, src.duration);
    const duration = Number(probe(t1080).duration.toFixed(1));

    const was = {
      seconds,
      size1080: existsSync(o1080) ? statSync(o1080).size : 0,
      size720: existsSync(o720) ? statSync(o720).size : 0,
    };
    renameSync(t1080, o1080);
    renameSync(t720, o720);
    renameSync(poster.tmp, oPoster);
    writeSeedDuration(slug, duration);

    log(`  wrote    ${slug}-1080.mp4 ${mb(statSync(o1080).size)} (was ${mb(was.size1080)}), ${a.fps} fps crf ${a.crf}`);
    log(`           ${slug}-720.mp4 ${mb(statSync(o720).size)} (was ${mb(was.size720)}), ${b.fps} fps crf ${b.crf}`);
    log(`           ${slug}-poster.webp ${mb(statSync(oPoster).size)}, frame at ${poster.at.toFixed(1)} s`);
    log(`           seeds.ts reel('${slug}'): ${was.seconds} s -> ${duration} s`);
    return true;
  } finally {
    for (const p of [t1080, t720, join(videoDir, `.${slug}-poster.tmp.webp`), join(videoDir, `.pull-${slug}`)]) {
      rmSync(p, { recursive: true, force: true });
    }
  }
}

async function main() {
  for (const bin of [FFMPEG, FFPROBE]) {
    if (!existsSync(bin)) throw new Error(`${bin} not found (set FFMPEG / FFPROBE)`);
  }
  if (!existsSync(RER_ROOT)) throw new Error(`RER checkout ${RER_ROOT} not found (set RER_ROOT)`);
  let seeds = reelSeeds();
  if (only) seeds = seeds.filter(s => only.includes(s.slug));
  if (!seeds.length) throw new Error('no seeds with a reel(...) line selected');
  mkdirSync(videoDir, { recursive: true });
  let changed = 0;
  for (const seed of seeds) {
    if (await updateSeed(seed)) changed += 1;
  }
  log(changed ? `\n${changed} reel(s) ${dryRun ? 'would change' : 'updated'}.` : '\nNothing to update.');
}

main().catch(err => {
  console.error(`\nupdate-reels: ${err.message}`);
  process.exit(1);
});
