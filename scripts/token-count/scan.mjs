#!/usr/bin/env node
// Scans every Claude and Codex home under one user's home directory and
// writes per-file usage summaries (counts only). measure.mjs runs it on this
// Mac and, over ssh, on m1-runner; it needs nothing beyond Node 22.15+, so it
// can be copied to any machine as-is.
//
//   node scan.mjs [--machine NAME] [--max-load 36] [--out FILE|-] [--home DIR]...
//
// Output is JSON lines: a header {machine, scannedAt, homes, stats}, then one
// `<file header>\t<summary>` line per transcript, and per Codex home one for
// its thread database (see lib/cache.mjs).
// Results are cached in ~/.cache/justevery-token-count/scan-cache.jsonl.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

import { loadCache, saveCache, writeLines } from './lib/cache.mjs';
import { scanClaudeFile } from './lib/claude.mjs';
import { scanCodexFile } from './lib/codex.mjs';
import { scanCodexThreads } from './lib/codex-threads.mjs';
import { createPace } from './lib/pace.mjs';

const { values: args } = parseArgs({
  options: {
    machine: { type: 'string', default: os.hostname().split('.')[0] },
    'max-load': { type: 'string', default: '36' },
    out: { type: 'string', default: '-' },
    home: { type: 'string', multiple: true },
    'cache-dir': {
      type: 'string',
      default: path.join(os.homedir(), '.cache', 'justevery-token-count'),
    },
    concurrency: { type: 'string', default: '2' },
  },
});

const log = message =>
  process.stderr.write(`[scan ${args.machine}] ${message}\n`);
const pace = createPace(Number(args['max-load']), log);
const HOME_NAME = /^\.(claude|codex|code)([._-].*)?$/;

function discoverHomes() {
  if (args.home?.length) return args.home.map(home => path.resolve(home));
  return fs
    .readdirSync(os.homedir(), { withFileTypes: true })
    .filter(
      entry =>
        HOME_NAME.test(entry.name) &&
        (entry.isDirectory() || entry.isSymbolicLink())
    )
    .map(entry => path.join(os.homedir(), entry.name))
    .filter(home => fs.statSync(home).isDirectory());
}

const kindOf = home =>
  path.basename(home).startsWith('.claude') ? 'claude' : 'codex';

function* walk(dir, accept) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full, accept);
    else if (entry.isFile() && accept(entry.name)) yield full;
  }
}

/** Every file to read in a home, with the scanner for it. */
function sourcesOf(home) {
  if (kindOf(home) === 'claude') {
    return [
      ...walk(path.join(home, 'projects'), name => name.endsWith('.jsonl')),
    ].map(file => ({ file, kind: 'claude' }));
  }
  const rollout = name =>
    name.startsWith('rollout-') &&
    (name.endsWith('.jsonl') || name.endsWith('.jsonl.zst'));
  const sources = [
    ...walk(path.join(home, 'sessions'), rollout),
    ...walk(path.join(home, 'archived_sessions'), rollout),
  ].map(file => ({ file, kind: 'codex' }));
  // The thread database: the newest state_<n>.sqlite schema present.
  const [database] = fs
    .readdirSync(home)
    .filter(name => /^state_\d+\.sqlite$/.test(name))
    .sort((a, b) => Number(b.match(/\d+/)[0]) - Number(a.match(/\d+/)[0]));
  if (database)
    sources.push({ file: path.join(home, database), kind: 'codex-threads' });
  return sources;
}

const SCANNERS = {
  claude: scanClaudeFile,
  codex: scanCodexFile,
  'codex-threads': scanCodexThreads,
};

/** Size and mtime that change whenever the content may have; a SQLite file's write-ahead log counts too. */
function signature(job) {
  const stat = fs.statSync(job.file);
  if (job.kind !== 'codex-threads')
    return { size: stat.size, mtimeMs: stat.mtimeMs };
  let wal = { size: 0, mtimeMs: 0 };
  try {
    wal = fs.statSync(`${job.file}-wal`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return {
    size: stat.size + wal.size,
    mtimeMs: Math.max(stat.mtimeMs, wal.mtimeMs),
  };
}

async function main() {
  const started = Date.now();
  const cacheFile = path.join(args['cache-dir'], 'scan-cache.jsonl');
  const cache = await loadCache(cacheFile);
  const seenReal = new Set();
  const homes = [];
  const jobs = [];
  for (const home of discoverHomes()) {
    const real = fs.realpathSync(home);
    if (seenReal.has(real)) {
      log(`${home} is the same directory as an earlier home; skipped`);
      continue;
    }
    seenReal.add(real);
    const sources = sourcesOf(home);
    homes.push({ home, kind: kindOf(home), files: sources.length });
    for (const source of sources) jobs.push({ ...source, home });
  }
  log(`${homes.length} homes, ${jobs.length} files`);

  const stats = {
    files: jobs.length,
    cached: 0,
    scanned: 0,
    bytesRead: 0,
    gone: 0,
    failed: 0,
  };
  const present = new Set();
  let next = 0;
  let lastReport = Date.now();

  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++];
      present.add(job.file);
      let stat;
      try {
        stat = signature(job);
      } catch (error) {
        if (error.code === 'ENOENT') continue; // deleted between listing and reading
        throw error;
      }
      const hit = cache.get(job.file);
      if (hit && hit.size === stat.size && hit.mtimeMs === stat.mtimeMs) {
        hit.gone = false;
        stats.cached++;
        continue;
      }
      await pace();
      try {
        const summary = await SCANNERS[job.kind](job.file, pace);
        cache.set(job.file, {
          home: job.home,
          size: stat.size,
          mtimeMs: stat.mtimeMs,
          gone: false,
          summaryText: JSON.stringify(summary),
        });
        stats.scanned++;
        stats.bytesRead += stat.size;
      } catch (error) {
        stats.failed++;
        log(`could not read ${job.file}: ${error.message}`);
      }
      if (Date.now() - lastReport > 30000) {
        lastReport = Date.now();
        log(
          `${next}/${jobs.length} files, ${(stats.bytesRead / 1e9).toFixed(1)} GB read, load ${os.loadavg()[0].toFixed(1)}`
        );
      }
    }
  }
  await Promise.all(Array.from({ length: Number(args.concurrency) }, worker));

  for (const [file, entry] of cache) {
    if (!present.has(file)) {
      entry.gone = true;
      stats.gone++;
    }
  }
  await saveCache(cacheFile, cache);
  stats.seconds = Math.round((Date.now() - started) / 1000);
  stats.pausedSeconds = Math.round(pace.waitedMs() / 1000);
  log(
    `done: ${stats.scanned} read (${(stats.bytesRead / 1e9).toFixed(1)} GB), ${stats.cached} from cache, ${stats.gone} kept from deleted files, ${stats.failed} failed, ${stats.seconds}s`
  );
  const header = {
    machine: args.machine,
    scannedAt: new Date().toISOString(),
    homes,
    stats,
  };
  await writeLines(args.out, [JSON.stringify(header)], cache);
}

main().catch(error => {
  log(error.stack ?? String(error));
  process.exit(1);
});
