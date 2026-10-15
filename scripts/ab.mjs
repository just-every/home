#!/usr/bin/env node
// Prints the hero A/B test's results: per variant, the visitors exposed, the
// share who engaged at all and with each event, and each variant against
// the control, for all visitors, for utm_source=x, and for everyone else.
//
//   npm run ab                  local D1 (.wrangler/state)
//   npm run ab -- --remote      the production D1
//
// A visitor counts once, in the variant of their randomised exposures. Left
// out: visitors who saw a hero forced by ?hero= (previews), bots, and any
// visitor id seen under two variants. An event counts for a visitor when it
// came on their variant, not forced, at or after their first exposure.

import { spawnSync } from 'node:child_process';

import { AB_EVENTS, CONTROL, HERO_VARIANTS } from '../src/lib/hero-ab.ts';
import { compare } from './ab-stats.mjs';

const args = process.argv.slice(2);
const target = args.includes('--remote') ? '--remote' : '--local';

function query(sql) {
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
      sql,
    ],
    { encoding: 'utf8' }
  );
  if (run.status !== 0) {
    console.error(run.stderr || run.stdout);
    process.exit(run.status ?? 1);
  }
  const [result] = JSON.parse(run.stdout);
  return result.results;
}

// One query, one wrangler call. D1 allows at most five terms in a compound
// SELECT; the last term counts the visitors left out, by reason.
const SQL = `
WITH ranked AS (
  SELECT visitor_id, variant, forced, device, created_at,
         LOWER(COALESCE(utm_source, '')) AS source,
         ROW_NUMBER() OVER (PARTITION BY visitor_id ORDER BY created_at, id) AS n
  FROM ab_exposures
),
visitors AS (
  SELECT visitor_id,
         MAX(CASE WHEN n = 1 THEN variant END) AS variant,
         MAX(CASE WHEN n = 1 THEN source END) AS source,
         MIN(created_at) AS first_at,
         COUNT(DISTINCT variant) AS variants,
         MAX(forced) AS forced,
         MAX(device = 'bot') AS bot
  FROM ranked GROUP BY visitor_id
),
clean AS (
  SELECT visitor_id, variant, first_at,
         CASE WHEN source = 'x' THEN 'x' ELSE 'rest' END AS segment
  FROM visitors WHERE forced = 0 AND bot = 0 AND variants = 1
),
done AS (
  SELECT DISTINCT c.visitor_id, e.name
  FROM clean c JOIN ab_events e
    ON e.visitor_id = c.visitor_id AND e.variant = c.variant
   AND e.forced = 0 AND e.created_at >= c.first_at
)
SELECT variant, segment, 'visitors' AS metric, COUNT(*) AS n
  FROM clean GROUP BY variant, segment
UNION ALL
SELECT c.variant, c.segment, 'engaged', COUNT(DISTINCT d.visitor_id)
  FROM clean c JOIN done d ON d.visitor_id = c.visitor_id
  GROUP BY c.variant, c.segment
UNION ALL
SELECT c.variant, c.segment, d.name, COUNT(*)
  FROM clean c JOIN done d ON d.visitor_id = c.visitor_id
  GROUP BY c.variant, c.segment, d.name
UNION ALL
SELECT '', '',
       CASE WHEN forced = 1 THEN 'forced' WHEN bot = 1 THEN 'bot' ELSE 'mixed' END,
       COUNT(*)
  FROM visitors WHERE forced = 1 OR bot = 1 OR variants > 1
  GROUP BY 3
`;

const rows = query(SQL);
const count = (variant, segments, metric) =>
  rows
    .filter(
      row =>
        row.variant === variant &&
        segments.includes(row.segment) &&
        row.metric === metric
    )
    .reduce((sum, row) => sum + row.n, 0);
const leftOut = reason =>
  rows.find(row => row.variant === '' && row.metric === reason)?.n ?? 0;

// Registered variants first (control leading), then any only the data knows.
const variants = [
  CONTROL,
  ...HERO_VARIANTS.map(variant => variant.id).filter(id => id !== CONTROL),
];
for (const row of rows) {
  if (row.variant && !variants.includes(row.variant))
    variants.push(row.variant);
}
const metrics = ['engaged', ...AB_EVENTS];

function table(rows, columns) {
  const widths = columns.map((column, i) =>
    Math.max(column.length, ...rows.map(row => row[i].length))
  );
  const line = cells =>
    `  ${cells.map((cell, i) => cell.padEnd(widths[i])).join('  ')}`.trimEnd();
  console.log(line(columns));
  console.log(line(widths.map(width => '-'.repeat(width))));
  for (const row of rows) console.log(line(row));
}

const percent = value => `${(value * 100).toFixed(1)}%`;
const points = value =>
  `${value >= 0 ? '+' : '-'}${Math.abs(value * 100).toFixed(1)} pt`;

function segment(title, segments) {
  console.log(`\n${title}`);
  const visitors = Object.fromEntries(
    variants.map(variant => [variant, count(variant, segments, 'visitors')])
  );
  console.log(
    `  visitors exposed: ${variants.map(v => `${v} ${visitors[v]}`).join(', ')}\n`
  );
  table(
    metrics.map(metric => [
      metric,
      ...variants.map(variant => {
        const hits = count(variant, segments, metric);
        const n = visitors[variant];
        return n ? `${percent(hits / n)} (${hits}/${n})` : '-';
      }),
    ]),
    ['metric', ...variants]
  );
  for (const variant of variants.filter(v => v !== CONTROL)) {
    console.log(`\n  ${variant} against ${CONTROL}`);
    table(
      metrics.map(metric => {
        const result = compare(
          {
            hits: count(CONTROL, segments, metric),
            visitors: visitors[CONTROL],
          },
          {
            hits: count(variant, segments, metric),
            visitors: visitors[variant],
          }
        );
        return result
          ? [
              metric,
              points(result.difference),
              `${points(result.low)} to ${points(result.high)}`,
              percent(result.pBetter),
            ]
          : [metric, '-', '-', '-'];
      }),
      ['metric', 'difference', '95% interval', `P(${variant} better)`]
    );
  }
}

console.log(`Hero A/B test, D1 "justevery" (${target.slice(2)})`);
console.log(
  `Left out: ${leftOut('forced')} visitors who saw a forced (?hero=) preview, ` +
    `${leftOut('bot')} bots, ${leftOut('mixed')} seen under two variants.`
);
if (variants.length === 1) {
  console.log('Only the control is registered: nothing to compare yet.');
}
segment('All visitors', ['x', 'rest']);
segment('utm_source=x', ['x']);
segment('Everyone else (utm_source not x)', ['rest']);
