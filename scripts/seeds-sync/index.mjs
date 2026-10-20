#!/usr/bin/env node
/**
 * Detects (and with --apply, imports) what the seed teams changed since the
 * last sync: marks, brand colours, homepages and their stills, release tags,
 * and the copy sources a page rewrite needs. README.md beside this file has
 * the rules.
 *
 *   npm run seeds:sync                         dry run: report only
 *   npm run seeds:sync -- --apply              import the mechanical updates
 *   npm run seeds:sync -- --only nook,vane     some seeds only
 *   npm run seeds:sync -- --capture-host m1-runner
 *   npm run seeds:sync -- --baseline-date 2026-10-17T13:00:00Z
 *   npm run seeds:sync -- --out <dir>
 */
import { existsSync, readFileSync } from 'node:fs';
import { homedir, loadavg } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { applyPlans, writeState } from './apply/index.mjs';
import { closeRecord, detectSeed } from './detect/index.mjs';
import { tracked } from './detect/colours.mjs';
import { copyHashes } from './detect/copy.mjs';
import { commitAt, mapLimit, Unreadable } from './lib/net.mjs';
import { captureHomepages } from './sources/homepage.mjs';
import { brandTokens, readFiles, readRepo } from './sources/repo.mjs';
import { loadSite } from './sources/site.mjs';
import { shareImageNotes } from './report/share-image.mjs';
import { printReport, writeReport } from './report/write.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
const STATE = join(here, 'state.json');
/** The owner's rule: heavy work (a browser over 51 pages) waits above this load. */
const MAX_LOAD = 36;

const { values: args } = parseArgs({
  options: {
    apply: { type: 'boolean', default: false },
    only: { type: 'string' },
    out: { type: 'string' },
    'capture-host': { type: 'string' },
    'baseline-date': { type: 'string' },
  },
});

const now = new Date();
const stamp = now
  .toISOString()
  .replace(/:/g, '')
  .replace(/\.\d+Z$/, 'Z');
const out = resolve(
  args.out ??
    process.env.SEEDS_SYNC_OUT ??
    join(homedir(), '.orchestrator/evidence/home/seeds-sync', stamp)
);
const host =
  args['capture-host'] ?? process.env.SEEDS_SYNC_CAPTURE_HOST ?? null;
const load = loadavg()[0];
if (load > MAX_LOAD && !host) {
  console.error(
    `Load is ${load.toFixed(1)} (over ${MAX_LOAD}): read the homepages on another machine with --capture-host <ssh host>.`
  );
  process.exit(1);
}

const site = await loadSite(root);
const overrides = JSON.parse(
  readFileSync(join(here, 'overrides.json'), 'utf8')
);
const state = existsSync(STATE)
  ? JSON.parse(readFileSync(STATE, 'utf8'))
  : { seeds: {} };
const only = args.only
  ? new Set(args.only.split(',').map(s => s.trim()))
  : null;
const seeds = site.seeds.filter(seed => !only || only.has(seed.slug));
if (only && seeds.length !== only.size) {
  console.error(
    `Unknown seed in --only: ${[...only].filter(s => !seeds.some(seed => seed.slug === s)).join(', ')}`
  );
  process.exit(2);
}
const texts = {
  released: readFileSync(join(root, 'src/data/seeds.ts'), 'utf8'),
  soon: readFileSync(join(root, 'src/data/upcoming.ts'), 'utf8'),
};

/** A seed the state has never seen starts from its repo at --baseline-date, if given. */
async function baselineFor(seed) {
  if (state.seeds[seed.slug] || !args['baseline-date'])
    return state.seeds[seed.slug] ?? null;
  const commit = await commitAt(seed.repo, args['baseline-date']);
  if (!commit) return null;
  const { files } = await readFiles(seed.repo, seed.slug, commit);
  return {
    commit,
    tag: seed.version || null,
    copy: copyHashes(files),
    brand: tracked(brandTokens(files)),
    home: null,
  };
}

console.log(`Reading ${seeds.length} seed repositories...`);
const repos = await mapLimit(seeds, 8, async seed => {
  try {
    const [repo, previous] = await Promise.all([
      readRepo(seed),
      baselineFor(seed),
    ]);
    return { repo, previous };
  } catch (error) {
    if (!(error instanceof Unreadable)) throw error;
    return {
      repo: { error: error.message },
      previous: state.seeds[seed.slug] ?? null,
    };
  }
});

console.log(`Reading ${seeds.length} homepages${host ? ` on ${host}` : ''}...`);
const homes = await captureHomepages(
  seeds.map(seed => ({
    slug: seed.slug,
    name: seed.name,
    url:
      seed.homepage ??
      overrides[seed.slug]?.homepage ??
      `https://run-${seed.slug}.com`,
  })),
  join(out, 'captures'),
  { host }
);

const results = [];
for (const [index, seed] of seeds.entries()) {
  results.push(
    await detectSeed({
      seed,
      repo: repos[index].repo,
      home: homes.get(seed.slug) ?? null,
      previous: repos[index].previous,
      override: overrides[seed.slug] ?? {},
      site,
      texts,
    })
  );
}

let apply = null;
if (args.apply) {
  apply = await applyPlans(root, results);
  const records = Object.fromEntries(
    results
      .filter(result => result.status === 'ok')
      .map(result => [result.seed.slug, closeRecord(result)])
  );
  writeState(root, STATE, state, records, now.toISOString());
}

const report = await writeReport(out, {
  meta: {
    startedAt: now.toISOString(),
    mode: args.apply ? 'apply' : 'dry-run',
    captureHost: host,
    load,
    statePath: 'scripts/seeds-sync/state.json',
    baselineDate: args['baseline-date'] ?? null,
  },
  results,
  shareImage: shareImageNotes(results, site),
  apply,
});
printReport(report);
console.log(`\nReport: ${join(out, 'report.md')}`);
