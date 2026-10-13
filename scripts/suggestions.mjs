#!/usr/bin/env node
// Prints what visitors ask for: the latest suggestions from the form, and the
// most-searched queries nothing in the collection matched.
//
//   npm run suggestions                  local D1 (.wrangler/state)
//   npm run suggestions -- --remote      the production D1
//   npm run suggestions -- --limit 50    more rows (default 20)

import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const target = args.includes('--remote') ? '--remote' : '--local';
const limitAt = args.indexOf('--limit');
const limit = limitAt >= 0 ? Number(args[limitAt + 1]) : 20;
if (!Number.isInteger(limit) || limit < 1) {
  console.error('--limit takes a whole number');
  process.exit(1);
}

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

function table(title, rows, columns) {
  console.log(`\n${title}`);
  if (rows.length === 0) {
    console.log('  (none yet)');
    return;
  }
  const clip = value => {
    const text = String(value ?? '').replace(/\s+/g, ' ');
    return text.length > 60 ? `${text.slice(0, 59)}…` : text;
  };
  const widths = columns.map(column =>
    Math.max(column.length, ...rows.map(row => clip(row[column]).length))
  );
  const line = cells =>
    `  ${cells.map((cell, i) => cell.padEnd(widths[i])).join('  ')}`.trimEnd();
  console.log(line(columns));
  console.log(line(widths.map(width => '-'.repeat(width))));
  for (const row of rows) console.log(line(columns.map(c => clip(row[c]))));
}

console.log(`D1 "justevery" (${target.slice(2)})`);

table(
  `Latest ${limit} suggestions`,
  query(
    `SELECT created_at, product, note, email FROM suggestions ORDER BY created_at DESC, id DESC LIMIT ${limit}`
  ),
  ['created_at', 'product', 'note', 'email']
);

table(
  `Most-searched queries with no match (top ${limit})`,
  query(
    `SELECT query, COUNT(*) AS searches, MAX(created_at) AS last_searched FROM search_log WHERE slugs = '' GROUP BY query ORDER BY searches DESC, last_searched DESC LIMIT ${limit}`
  ),
  ['query', 'searches', 'last_searched']
);
