#!/usr/bin/env node
// Measures the tokens spent building the products and stores the result as
// the footer's newest snapshot ("Made with N tokens").
//
//   node scripts/token-count/publish.mjs             local D1 (npm run preview)
//   node scripts/token-count/publish.mjs --remote    production D1
//     --dry-run         measure and compare only; write nothing
//     --allow-decrease  publish even if the total is below the last snapshot
//
// It prints the last snapshot, what the page was showing for now (the last
// total counted on at its rate), the new measured total, and the drift
// between those two. Remote writes use the local `wrangler login`.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { measure, CACHE_DIR } from './measure.mjs';
import { snapshotOf } from './lib/report.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const DATABASE = 'justevery';
const ACCOUNT_ID = '9d167860043f59195b15ab3e334dbda7';
// Mirrors src/lib/tokens.ts: the page stops counting on a week after a measurement.
const MAX_ESTIMATE_MS = 7 * 24 * 60 * 60 * 1000;

const { values: args } = parseArgs({
  options: {
    remote: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    'allow-decrease': { type: 'boolean', default: false },
  },
});

const sqlText = value => `'${String(value).replaceAll("'", "''")}'`;
const n = value => Math.round(value).toLocaleString('en-US');

function d1(sql) {
  const out = execFileSync(
    path.join(ROOT, 'node_modules', '.bin', 'wrangler'),
    [
      'd1',
      'execute',
      DATABASE,
      args.remote ? '--remote' : '--local',
      '--json',
      '--command',
      sql,
    ],
    {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
      env: {
        ...process.env,
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID ?? ACCOUNT_ID,
      },
    }
  );
  return JSON.parse(out)[0].results;
}

function shownAt(previous, measuredAt) {
  const elapsed = Math.min(
    Math.max(0, Date.parse(measuredAt) - Date.parse(previous.measured_at)),
    MAX_ESTIMATE_MS
  );
  return Math.floor(
    previous.total + (previous.rate_per_second * elapsed) / 1000
  );
}

async function main() {
  const where = args.remote ? 'production D1' : 'local D1';
  const report = await measure();
  const snapshot = snapshotOf(report);
  const [previous] = d1(
    `SELECT total, rate_per_second, measured_at FROM token_snapshots WHERE scope = ${sqlText(snapshot.scope)} ORDER BY measured_at DESC, id DESC LIMIT 1`
  );

  const lines = [
    `Token count for ${where} (scope ${snapshot.scope}; full report in ${path.join(CACHE_DIR, 'report.json')})`,
  ];
  if (previous) {
    const shown = shownAt(previous, snapshot.measuredAt);
    const drift = snapshot.total - shown;
    lines.push(
      `  previous  ${n(previous.total)} measured ${previous.measured_at} at ${n(previous.rate_per_second)}/s`,
      `  predicted ${n(shown)} (what the page showed at ${snapshot.measuredAt})`,
      `  measured  ${n(snapshot.total)} at ${n(snapshot.ratePerSecond)}/s`,
      `  drift     ${drift >= 0 ? '+' : ''}${n(drift)} (${((drift / shown) * 100).toFixed(2)}% of predicted)`
    );
    if (snapshot.total < previous.total && !args['allow-decrease']) {
      process.stdout.write(`${lines.join('\n')}\n`);
      throw new Error(
        'The new total is below the last published one; nothing written. Check the report, then rerun with --allow-decrease if it is right.'
      );
    }
  } else {
    lines.push(
      `  previous  none`,
      `  measured  ${n(snapshot.total)} at ${n(snapshot.ratePerSecond)}/s`
    );
  }

  if (args['dry-run']) {
    lines.push('  dry run: nothing written');
  } else {
    d1(
      `INSERT INTO token_snapshots (scope, measured_at, total, rate_per_second, breakdown) VALUES (${sqlText(snapshot.scope)}, ${sqlText(snapshot.measuredAt)}, ${Math.round(snapshot.total)}, ${snapshot.ratePerSecond}, ${sqlText(JSON.stringify(snapshot.breakdown))})`
    );
    lines.push(`  written to ${where}`);
  }
  process.stdout.write(`${lines.join('\n')}\n`);
}

main().catch(error => {
  process.stderr.write(`${error.message ?? error}\n`);
  process.exit(1);
});
