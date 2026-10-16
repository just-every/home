#!/usr/bin/env node
// Prints how the site is used, from the usage log (migration 0005): page
// views by device, path and utm_source, the share of views with any event,
// each event's count and share of views, and the most common details
// (products, repositories, hero picks). Bots are left out throughout.
//
//   npm run usage                       local D1 (.wrangler/state)
//   npm run usage -- --remote           the production D1
//   npm run usage -- --days 7           a shorter window (default 30)

import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const target = args.includes('--remote') ? '--remote' : '--local';
const daysAt = args.indexOf('--days');
const days = daysAt >= 0 ? Number(args[daysAt + 1]) : 30;
if (!Number.isInteger(days) || days < 1) {
  console.error('--days takes a whole number');
  process.exit(1);
}

/**
 * Runs the statements in one wrangler call; one result list per statement.
 * wrangler splits statements itself and drops one with CASE ... END, so the
 * queries use IIF instead.
 */
function query(statements) {
  const run = spawnSync(
    'npx',
    [
      'wrangler',
      'd1',
      'execute',
      'justevery',
      target,
      '--json',
      '--command',
      statements.join(';\n'),
    ],
    { encoding: 'utf8' }
  );
  if (run.status !== 0) {
    console.error(run.stderr || run.stdout);
    process.exit(run.status ?? 1);
  }
  const results = JSON.parse(run.stdout).map(result => result.results);
  if (results.length !== statements.length) {
    console.error(
      `wrangler returned ${results.length} results for ${statements.length} statements`
    );
    process.exit(1);
  }
  return results;
}

const since = `strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${days} days')`;
const VIEWS = `(SELECT * FROM page_views WHERE device != 'bot' AND created_at >= ${since})`;
// Events of a non-bot view in the window, and events whose view was never
// recorded (its view beacon was lost); bots' views leave theirs out.
const EVENTS = `(SELECT * FROM events WHERE created_at >= ${since}
  AND view_id NOT IN (SELECT view_id FROM page_views WHERE device = 'bot'))`;

const [totals, devices, paths, sources, engaged, events, details] = query([
  `SELECT COUNT(*) AS views,
          (SELECT COUNT(*) FROM page_views WHERE device = 'bot' AND created_at >= ${since}) AS bots
     FROM ${VIEWS}`,
  `SELECT device AS label, COUNT(*) AS views FROM ${VIEWS}
     GROUP BY device ORDER BY views DESC`,
  `SELECT path AS label, COUNT(*) AS views FROM ${VIEWS}
     GROUP BY path ORDER BY views DESC LIMIT 10`,
  `SELECT COALESCE(LOWER(utm_source), '(none)') AS label, COUNT(*) AS views,
          SUM(view_id IN (SELECT view_id FROM events)) AS engaged
     FROM ${VIEWS} GROUP BY label ORDER BY views DESC LIMIT 10`,
  `SELECT COUNT(DISTINCT v.view_id) AS views FROM ${VIEWS} v
     JOIN events e ON e.view_id = v.view_id`,
  `SELECT name, COUNT(*) AS count,
          COUNT(DISTINCT IIF(view_id IN (SELECT view_id FROM ${VIEWS}), view_id, NULL)) AS views
     FROM ${EVENTS} GROUP BY name ORDER BY count DESC`,
  `SELECT name, detail, COUNT(*) AS count FROM ${EVENTS}
     WHERE detail IS NOT NULL GROUP BY name, detail ORDER BY name, count DESC`,
]);

const { views, bots } = totals[0];
const pct = (part, whole) =>
  whole ? `${((100 * part) / whole).toFixed(1)}%` : '-';
const table = (rows, columns) => {
  const widths = columns.map(([title, get]) =>
    Math.max(title.length, ...rows.map(row => String(get(row)).length))
  );
  const line = cells =>
    cells
      .map((cell, i) =>
        i === 0
          ? String(cell).padEnd(widths[i])
          : String(cell).padStart(widths[i])
      )
      .join('  ');
  console.log(`  ${line(columns.map(([title]) => title))}`);
  for (const row of rows)
    console.log(`  ${line(columns.map(([, get]) => get(row)))}`);
};

console.log(
  `Usage over the last ${days} days (${target === '--remote' ? 'production' : 'local'} D1)\n`
);
console.log(`Page views: ${views} (bots left out: ${bots})`);
console.log(
  `Views with any event: ${engaged[0].views} (${pct(engaged[0].views, views)})\n`
);
if (!views && !events.length) process.exit(0);

console.log('By device');
table(devices, [
  ['device', r => r.label],
  ['views', r => r.views],
  ['share', r => pct(r.views, views)],
]);
console.log('\nBy path (top 10)');
table(paths, [
  ['path', r => r.label],
  ['views', r => r.views],
]);
console.log('\nBy utm_source (top 10)');
table(sources, [
  ['source', r => r.label],
  ['views', r => r.views],
  ['with an event', r => pct(r.engaged, r.views)],
]);
console.log('\nEvents');
table(events, [
  ['event', r => r.name],
  ['count', r => r.count],
  ['views', r => r.views],
  ['of all views', r => pct(r.views, views)],
]);

console.log('\nTop details (5 per event)');
const byName = Map.groupBy(details, row => row.name);
for (const [name, rows] of byName) {
  const top = rows
    .slice(0, 5)
    .map(row => `${row.detail} ${row.count}`)
    .join(', ');
  console.log(`  ${name}: ${top}`);
}
