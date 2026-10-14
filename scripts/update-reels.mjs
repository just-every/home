#!/usr/bin/env node
/**
 * update-reels.mjs - refresh the landing page's product reels from the owner-approved launch reels.
 *
 *   node scripts/update-reels.mjs                    every seed in src/data/seeds.ts
 *   node scripts/update-reels.mjs --seed uptime,lamp only these seeds
 *   node scripts/update-reels.mjs --host m1-runner   encode there (any ssh host with ffmpeg); default local
 *   node scripts/update-reels.mjs --jobs 3           seeds encoded at once (default 1)
 *   node scripts/update-reels.mjs --dry-run          show the source picked per seed, change nothing
 *   node scripts/update-reels.mjs --force            re-encode even when the source is unchanged
 *   node scripts/update-reels.mjs --poster-at uptime=12.5   poster frame (seconds) for a seed
 *
 * Which seeds: every `slug: '<slug>'` in src/data/seeds.ts. A seed without a reel
 * gets one: its `reel: null` (or a missing reel line) becomes `reel: reel('<slug>', s)`.
 *
 * Where the renders come from: the launch-reels folders of the RER checkout,
 * <RER_ROOT>/.artifacts/launch-reels-v<N>-<date>/<slug>/ (nothing else is read;
 * the sizzle worktrees and the other .artifacts folders are not sources). The
 * folder with the highest N that has a row for the seed in its APPROVALS.md
 * decides: only a verdict starting "approved" publishes the reel. Any other
 * verdict (changes, in fix rounds) is skipped with a message and the seed's
 * current reel stays as it is.
 *
 * Which file: <slug>-sizzle-2160p60.mp4 (the 4K final master of the approved cut)
 * when it is there and complete, otherwise <slug>-sizzle-1080p60.mp4 (the approved
 * cut). Each has a .json sidecar beside it that must say quality "final" or
 * "review" and carry the file's exact byte count; the file must be settled
 * (untouched for two minutes), probe as H.264 or HEVC with audio at 1080p or
 * more, and run as long as the sidecar's range. A 2160p file whose length is not
 * the 1080p cut's is a master of a different cut and is ignored.
 *
 * What it writes, and only this: public/video/<slug>-720.mp4 (1280x720, 30 fps,
 * H.264 High, AAC, +faststart, a capped bitrate that lands about 5 MB),
 * public/video/<slug>-poster.webp (1280x720, under 60 KB, the sharpest settled
 * frame) and the seed's reel(...) line with the encoded duration. The 720 file's
 * comment tag names its source (file, bytes, render time), which is how a later
 * run knows there is nothing to update.
 *
 * Encodes and frame grabs run on --host when given: the source is copied to a
 * scratch folder in that host's home with scp, ffmpeg runs there (bash or
 * PowerShell, detected), the results come back and the folder is removed.
 * Locally it uses /opt/homebrew/bin/ffmpeg at nice 15 (the /usr/local one is
 * x86-only). Probing and poster scoring (sharp, installed with next) stay local.
 */
import { spawn, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const videoDir = join(repo, 'public', 'video');
const seedsFile = join(repo, 'src', 'data', 'seeds.ts');

const FFMPEG = process.env.FFMPEG || '/opt/homebrew/bin/ffmpeg';
const FFPROBE = process.env.FFPROBE || '/opt/homebrew/bin/ffprobe';
const RER_ROOT = process.env.RER_ROOT || join(homedir(), 'www', 'runeditrun');

const ACCEPT_QUALITY = new Set(['final', 'review']);
const MIN_SECONDS = 20;
const SETTLE_MS = 120_000; // a file touched this recently may still be written
const SAME_CUT_SECONDS = 0.2;
// Capped CRF: quality-led, but never above ~5.2 MB for a 45 s reel.
const VIDEO = { crf: 20, maxrate: '820k', bufsize: '1640k' };
const AUDIO_BITRATE = '96k';
const MAX_720_BYTES = 7 * 1024 * 1024;
const MAX_POSTER_BYTES = 60 * 1024;
const POSTER_QUALITIES = [80, 74, 68, 62, 56];

const args = process.argv.slice(2);
const flag = name => args.includes(`--${name}`);
const option = name => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('dry-run');
const force = flag('force');
const hostName = option('host') ?? 'local';
const jobs = Math.max(1, Number(option('jobs') ?? 1));
const only = option('seed')?.split(',').map(s => s.trim()).filter(Boolean);
const posterAt = Object.fromEntries(
  args.flatMap((a, i) => (args[i - 1] === '--poster-at' ? [a.split('=')] : [])).map(([k, v]) => [k, Number(v)]),
);

const mb = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const kb = bytes => `${Math.round(bytes / 1024)} KB`;
const stamp = ms => new Date(ms).toLocaleString('sv-SE', { hour12: false }).replace(' ', 'T');

function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
  if (r.error) throw r.error;
  return r;
}

function runAsync(cmd, cmdArgs) {
  return new Promise((ok, fail) => {
    const p = spawn(cmd, cmdArgs, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', d => (err += d));
    p.on('exit', code => (code === 0 ? ok() : fail(new Error(`${cmd} exited ${code}: ${err.trim().slice(-600)}`))));
    p.on('error', fail);
  });
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
    const [num, den] = String(v.r_frame_rate).split('/').map(Number);
    return {
      width: v.width,
      height: v.height,
      fps: den ? num / den : num,
      codec: v.codec_name,
      profile: v.profile,
      hasAudio: Boolean(a),
      audioCodec: a?.codec_name,
      duration,
      comment: j.format?.tags?.comment ?? '',
    };
  } catch {
    return null;
  }
}

// ---------- seeds.ts ----------

function seedBlock(text, slug) {
  const at = text.indexOf(`slug: '${slug}'`);
  if (at < 0) throw new Error(`no seed '${slug}' in src/data/seeds.ts`);
  const end = text.indexOf('\n  },', at);
  return { start: at, end };
}

function allSeeds() {
  const text = readFileSync(seedsFile, 'utf8');
  return [...text.matchAll(/^ {4}slug: '([a-z0-9-]+)'/gm)].map(m => {
    const { start, end } = seedBlock(text, m[1]);
    const r = text.slice(start, end).match(/reel: reel\('[a-z0-9-]+',\s*([\d.]+)\)/);
    return { slug: m[1], seconds: r ? Number(r[1]) : null };
  });
}

function writeSeedReel(slug, seconds) {
  const text = readFileSync(seedsFile, 'utf8');
  const { start, end } = seedBlock(text, slug);
  const block = text.slice(start, end);
  const line = `reel: reel('${slug}', ${seconds})`;
  const next = /reel: (null|reel\([^)]*\))/.test(block)
    ? block.replace(/reel: (null|reel\([^)]*\))/, line)
    : `${block}\n    ${line},`;
  writeFileSync(seedsFile, text.slice(0, start) + next + text.slice(end));
}

// ---------- finding the approved render ----------

const REELS_DIR = /^launch-reels-v(\d+)-/;

/** The launch-reels-v<N>-* folders, highest N first. */
function reelFolders() {
  const parent = join(RER_ROOT, '.artifacts');
  if (!existsSync(parent)) return [];
  return readdirSync(parent, { withFileTypes: true })
    .filter(e => e.isDirectory() && REELS_DIR.test(e.name))
    .map(e => ({ dir: join(parent, e.name), n: Number(e.name.match(REELS_DIR)[1]) }))
    .sort((a, b) => b.n - a.n);
}

/** { slug: verdict } from the table rows of a folder's APPROVALS.md. */
function readApprovals(dir) {
  const file = join(dir, 'APPROVALS.md');
  if (!existsSync(file)) return {};
  const verdicts = {};
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const cells = line.split('|').map(c => c.trim());
    if (cells.length < 4 || !/^[a-z0-9-]+$/.test(cells[1])) continue;
    verdicts[cells[1]] = cells[2].toLowerCase();
  }
  return verdicts;
}

function readSidecar(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/** Why a file is not a complete render to use, or null when it is. */
function rejectReason(c) {
  const s = c.sidecar;
  if (!s) return 'no sidecar (not a render, or still being written)';
  if (!ACCEPT_QUALITY.has(s.quality)) return `quality ${s.quality}`;
  if (s.bytes != null && Number(s.bytes) !== c.size) return `partial: ${c.size} of ${s.bytes} bytes`;
  if (Date.now() - c.mtimeMs < SETTLE_MS) return 'written in the last two minutes';
  return null;
}

function complete(info, sidecar) {
  if (!info || !['h264', 'hevc'].includes(info.codec) || !info.hasAudio || info.height < 1080 || info.duration < MIN_SECONDS) {
    return false;
  }
  const range = sidecar.range;
  return !Array.isArray(range) || Math.abs(info.duration - (range[1] - range[0])) < 0.5;
}

/** A render of one resolution in a seed's folder, if it is complete. */
function readRender(dir, slug, res, say) {
  const path = join(dir, `${slug}-sizzle-${res}.mp4`);
  if (!existsSync(path)) return null;
  const st = statSync(path);
  const c = { path, size: st.size, mtimeMs: Math.round(st.mtimeMs), sidecar: readSidecar(path.replace(/\.mp4$/, '.json')) };
  const why = rejectReason(c);
  if (why) {
    say(`  skip ${path}: ${why}`);
    return null;
  }
  const info = probe(path);
  if (!complete(info, c.sidecar)) {
    say(`  skip ${path}: does not probe as a complete 1080p+ H.264/HEVC render with audio`);
    return null;
  }
  return { ...c, ...info, renderedMs: Date.parse(c.sidecar.renderedAt ?? '') || c.mtimeMs };
}

/** The approved render of a seed (2160p when present, else 1080p), or null with the reason said. */
function chooseSource(slug, say) {
  const folders = reelFolders();
  if (!folders.length) {
    say(`  no launch-reels-v<N>-* folder in ${join(RER_ROOT, '.artifacts')}`);
    return null;
  }
  for (const { dir } of folders) {
    const verdict = readApprovals(dir)[slug];
    if (verdict == null) continue;
    if (!verdict.startsWith('approved')) {
      say(`  skip: ${basename(dir)}/APPROVALS.md says "${verdict}", not approved; its current reel stays`);
      return null;
    }
    const seedDir = join(dir, slug);
    const cut = readRender(seedDir, slug, '1080p60', say);
    const master = readRender(seedDir, slug, '2160p60', say);
    const use4k = master && (!cut || Math.abs(master.duration - cut.duration) < SAME_CUT_SECONDS);
    if (master && !use4k) say(`  skip ${master.path}: ${master.duration.toFixed(2)} s is not the approved cut's ${cut.duration.toFixed(2)} s`);
    const best = use4k ? master : cut;
    if (!best) {
      say(`  approved in ${basename(dir)} but no complete render in ${seedDir}`);
      return null;
    }
    best.why = `approved in ${basename(dir)}/APPROVALS.md; ${use4k ? '2160p final master' : '1080p approved cut'}`;
    return best;
  }
  say('  skip: no APPROVALS.md row for this seed; its current reel stays');
  return null;
}

// ---------- where ffmpeg runs ----------

const SSH = ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', '-o', 'LogLevel=ERROR'];

/** Runs ffmpeg on this Mac, in a scratch folder under public/video. */
function localHost() {
  return {
    name: 'local',
    async workdir(slug) {
      const dir = join(videoDir, `.work-${slug}`);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(join(dir, 'frames'), { recursive: true });
      return {
        path: name => join(dir, name),
        put: async file => file,
        ffmpeg: ffArgs => runAsync('nice', ['-n', '15', FFMPEG, '-hide_banner', '-loglevel', 'error', '-nostdin', '-y', ...ffArgs]),
        get: async (name, dest) => {
          rmSync(dest, { recursive: true, force: true });
          renameSync(join(dir, name), dest);
        },
        cleanup: async () => rmSync(dir, { recursive: true, force: true }),
      };
    },
  };
}

/**
 * Runs ffmpeg on an ssh host, in a scratch folder in its home: bash hosts
 * (macOS, Linux) and Windows hosts whose ssh shell is PowerShell.
 */
function remoteHost(name) {
  const r = run('ssh', [...SSH, name, 'uname -s']);
  const windows = r.status !== 0 || !r.stdout.trim();
  const ffmpegBin = process.env.REMOTE_FFMPEG || (windows ? 'ffmpeg' : null);
  let bin = ffmpegBin;
  if (!bin) {
    const w = run('ssh', [...SSH, name, 'test -x /opt/homebrew/bin/ffmpeg && echo /opt/homebrew/bin/ffmpeg || command -v ffmpeg']);
    bin = w.stdout.trim();
  }
  const sq = s => `'${String(s).replace(/'/g, windows ? "''" : "'\\''")}'`;
  const sh = command => runAsync('ssh', [...SSH, name, command]);
  const check = windows
    ? `& ${sq(bin)} -hide_banner -version; exit $LASTEXITCODE`
    : `${sq(bin)} -hide_banner -version`;
  if (!bin || run('ssh', [...SSH, name, check]).status !== 0) throw new Error(`${name}: ffmpeg not found`);
  console.log(`encoding on ${name} (${windows ? 'Windows, PowerShell' : 'bash'}, ${bin})`);
  return {
    name,
    async workdir(slug) {
      const dir = `.update-reels-${slug}-${process.pid}`;
      await sh(
        windows
          ? `New-Item -ItemType Directory -Force -Path ${sq(`${dir}/frames`)} | Out-Null`
          : `mkdir -p ${sq(`${dir}/frames`)}`,
      );
      return {
        path: file => `${dir}/${file}`,
        put: async file => {
          await runAsync('scp', [...SSH, '-q', file, `${name}:${dir}/source.mp4`]);
          return `${dir}/source.mp4`;
        },
        ffmpeg: ffArgs => {
          const line = ['-hide_banner', '-loglevel', 'error', '-nostdin', '-y', ...ffArgs].map(sq).join(' ');
          return sh(windows ? `& ${sq(bin)} ${line}; exit $LASTEXITCODE` : `nice -n 10 ${sq(bin)} ${line}`);
        },
        get: async (file, dest) => {
          rmSync(dest, { recursive: true, force: true });
          await runAsync('scp', [...SSH, '-q', '-r', `${name}:${dir}/${file}`, dest]);
        },
        cleanup: () =>
          sh(windows ? `Remove-Item -Recurse -Force -Path ${sq(dir)}` : `rm -rf ${sq(dir)}`).catch(err =>
            console.log(`  could not remove ${name}:${dir}: ${err.message}`),
          ),
      };
    },
  };
}

// ---------- encode and poster ----------

const sourceKey = c => `source=${basename(c.path)};bytes=${c.size};rendered=${new Date(c.renderedMs).toISOString()}`;

async function encode720(work, src, out, comment) {
  await work.ffmpeg([
    '-i', src,
    '-map', '0:v:0', '-map', '0:a:0',
    '-vf', 'scale=1280:720:flags=lanczos,format=yuv420p',
    '-r', '30',
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow',
    '-crf', String(VIDEO.crf), '-maxrate', VIDEO.maxrate, '-bufsize', VIDEO.bufsize,
    '-g', '60',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-c:a', 'aac', '-b:a', AUDIO_BITRATE, '-ar', '48000', '-ac', '2',
    '-metadata', `comment=${comment}`,
    '-movflags', '+faststart',
    out,
  ]);
}

/**
 * Candidate frames every ~2 s through the middle of the reel, each
 * with the frame 0.4 s later, grabbed in one decode. A good poster is sharp (lots
 * of edges), neither too dark nor blown out, and settled: the later frame barely
 * differs, so no half-faded type or mid-wipe.
 */
async function pickPosterTime(slug, work, src, info, scratch) {
  if (posterAt[slug] != null) return posterAt[slug];
  const { default: sharp } = await import('sharp');
  // The middle of the reel: past the opening, before the end card.
  const start = Math.max(3, info.duration * 0.1);
  const last = info.duration * 0.78;
  const count = Math.max(8, Math.floor((last - start) / 2));
  const times = Array.from({ length: count }, (_, i) => start + (i * (last - start)) / (count - 1));
  const frameOf = t => Math.round(t * info.fps);
  const wanted = times.flatMap(t => [frameOf(t), frameOf(t + 0.4)]);
  await work.ffmpeg([
    '-i', src,
    '-an',
    '-vf', `select=${wanted.map(n => `eq(n\\,${n})`).join('+')},scale=640:360:flags=bicubic`,
    '-fps_mode', 'passthrough',
    '-q:v', '3',
    work.path('frames/c_%03d.jpg'),
  ]);
  const local = join(scratch, 'frames');
  await work.get('frames', local);
  const files = readdirSync(local).filter(f => f.endsWith('.jpg')).sort();
  if (files.length !== wanted.length) throw new Error(`poster: got ${files.length} of ${wanted.length} frames`);
  const small = async f => sharp(f).resize(320, 180).greyscale().raw().toBuffer();
  const scored = [];
  for (const [i, t] of times.entries()) {
    const a = join(local, files[i * 2]);
    const b = join(local, files[i * 2 + 1]);
    const edges = (await sharp(a).greyscale().convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] }).stats())
      .channels[0].stdev;
    const mean = (await sharp(a).greyscale().stats()).channels[0].mean;
    const [pa, pb] = [await small(a), await small(b)];
    let diff = 0;
    for (let k = 0; k < pa.length; k++) diff += Math.abs(pa[k] - pb[k]);
    diff /= pa.length;
    const settled = 1 - Math.min(1, diff / 6);
    // Not a black or white flash (light product UIs sit around 235 to 248).
    scored.push({ t, score: mean > 20 && mean < 252 ? edges * settled : 0 });
  }
  return scored.sort((a, b) => b.score - a.score)[0].t;
}

async function makePoster(slug, work, src, at, scratch) {
  const { default: sharp } = await import('sharp');
  await work.ffmpeg(['-ss', at.toFixed(3), '-i', src, '-an', '-frames:v', '1', '-vf', 'scale=1280:720:flags=lanczos', work.path('poster.png')]);
  const png = join(scratch, 'poster.png');
  await work.get('poster.png', png);
  const out = join(scratch, 'poster.webp');
  for (const quality of POSTER_QUALITIES) {
    await sharp(png).webp({ quality, effort: 6 }).toFile(out);
    if (statSync(out).size <= MAX_POSTER_BYTES) return { file: out, quality };
  }
  throw new Error(`${slug} poster stays above ${kb(MAX_POSTER_BYTES)} at webp quality ${POSTER_QUALITIES.at(-1)}`);
}

// ---------- per seed ----------

async function updateSeed({ slug, seconds }, host) {
  const lines = [`\n${slug}`];
  const say = m => lines.push(m);
  const flush = () => console.log(lines.splice(0).join('\n'));
  const src = chooseSource(slug, say);
  if (!src) {
    say('  not published');
    flush();
    return false;
  }
  say(`  source   ${src.path}`);
  say(
    `           quality ${src.sidecar.quality}, rendered ${stamp(src.renderedMs)}, ${src.duration.toFixed(3)} s, ` +
      `${src.width}x${src.height} ${Math.round(src.fps)} fps, ${mb(src.size)}`,
  );
  say(`           why: ${src.why}`);

  const o720 = join(videoDir, `${slug}-720.mp4`);
  const oPoster = join(videoDir, `${slug}-poster.webp`);
  const key = sourceKey(src);
  const have = existsSync(o720) ? probe(o720) : null;
  const upToDate = have && have.comment === key && existsSync(oPoster) && Number(have.duration.toFixed(1)) === seconds;
    if ((upToDate && !force) || dryRun) {
    say(upToDate && !force ? '  up to date: nothing to update' : `  would encode ${slug}-720.mp4 and ${slug}-poster.webp and write reel('${slug}', ...)`);
    flush();
    return !upToDate;
  }
  flush();

  const scratch = join(videoDir, `.out-${slug}`);
  rmSync(scratch, { recursive: true, force: true });
  mkdirSync(scratch, { recursive: true });
  const work = await host.workdir(slug);
  try {
    const started = Date.now();
    const remoteSrc = await work.put(src.path);
    await encode720(work, remoteSrc, work.path('out-720.mp4'), key);
    const t720 = join(scratch, `${slug}-720.mp4`);
    await work.get('out-720.mp4', t720);
    const got = probe(t720);
    const size = statSync(t720).size;
    if (!got || got.width !== 1280 || got.height !== 720 || got.comment !== key || got.audioCodec !== 'aac') {
      throw new Error(`${slug}: the 720 encode did not come back intact`);
    }
    if (size > MAX_720_BYTES) throw new Error(`${slug}: 720 encode is ${mb(size)}, above ${mb(MAX_720_BYTES)}`);
    const at = await pickPosterTime(slug, work, remoteSrc, src, scratch);
    const poster = await makePoster(slug, work, remoteSrc, at, scratch);
    const duration = Number(got.duration.toFixed(1));

    for (const f of [t720, poster.file]) chmodSync(f, 0o644);
    renameSync(t720, o720);
    renameSync(poster.file, oPoster);
    writeSeedReel(slug, duration);
    console.log(
      `\n${slug} done on ${host.name} in ${Math.round((Date.now() - started) / 1000)} s\n` +
        `  wrote    ${slug}-720.mp4 ${mb(size)}, ${got.profile} ${Math.round(got.fps)} fps, ${duration} s\n` +
        `           ${slug}-poster.webp ${kb(statSync(oPoster).size)} (webp q${poster.quality}), frame at ${at.toFixed(1)} s\n` +
        `           seeds.ts reel('${slug}'): ${seconds ?? 'none'} -> ${duration} s`,
    );
    return true;
  } finally {
    await work.cleanup();
    rmSync(scratch, { recursive: true, force: true });
  }
}

async function main() {
  for (const bin of [FFMPEG, FFPROBE]) {
    if (!existsSync(bin)) throw new Error(`${bin} not found (set FFMPEG / FFPROBE)`);
  }
  if (!existsSync(RER_ROOT)) throw new Error(`RER checkout ${RER_ROOT} not found (set RER_ROOT)`);
  let seeds = allSeeds();
  if (only) seeds = seeds.filter(s => only.includes(s.slug));
  if (!seeds.length) throw new Error('no seeds selected');
  mkdirSync(videoDir, { recursive: true });
  const host = dryRun || hostName === 'local' ? localHost() : remoteHost(hostName);

  // seeds.ts is rewritten after each encode; writes are synchronous, so
  // concurrent seeds never interleave a read and a write.
  const queue = [...seeds];
  let changed = 0;
  const failures = [];
  await Promise.all(
    Array.from({ length: Math.min(jobs, queue.length) }, async () => {
      for (let seed = queue.shift(); seed; seed = queue.shift()) {
        try {
          if (await updateSeed(seed, host)) changed += 1;
        } catch (err) {
          failures.push(seed.slug);
          console.error(`\n${seed.slug} failed: ${err.message}`);
        }
      }
    }),
  );
  console.log(changed ? `\n${changed} reel(s) ${dryRun ? 'would change' : 'updated'}.` : '\nNothing to update.');
  if (failures.length) throw new Error(`failed: ${failures.join(', ')}`);
}

main().catch(err => {
  console.error(`\nupdate-reels: ${err.message}`);
  process.exit(1);
});
