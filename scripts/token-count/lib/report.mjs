// Turns the ledger's totals into the measurement report (JSON) and a
// plain-text rendering of it. Numbers only; paths are working directories.
import { processed, withoutCacheReads } from './aggregate.mjs';
import { bucketOf } from './scope.mjs';

const WEEK = 7 * 86400;
const iso = seconds =>
  Number.isFinite(seconds) && seconds > 0
    ? new Date(seconds * 1000).toISOString()
    : null;

const figures = t => ({
  processed: processed(t),
  withoutCacheReads: withoutCacheReads(t),
  output: t.output,
  input: t.input,
  cacheCreation: t.cacheCreation,
  cacheRead: t.cacheRead,
  unsplit: t.unsplit,
});

const ranked = (map, limit, key = name => name) => {
  const merged = new Map();
  for (const [name, totals] of map) {
    const label = key(name);
    merged.set(label, (merged.get(label) ?? 0) + processed(totals));
  }
  return [...merged].sort((a, b) => b[1] - a[1]).slice(0, limit);
};

const breakdown = map =>
  Object.fromEntries(
    [...map]
      .sort((a, b) => processed(b[1]) - processed(a[1]))
      .map(([name, t]) => [name, figures(t)])
  );

function scopeReport(scope) {
  return {
    ...figures(scope.totals),
    first: iso(scope.first),
    last: iso(scope.last),
    last7d: figures(scope.last7d),
    ratePerSecond: processed(scope.last7d) / WEEK,
    byTool: breakdown(scope.byTool),
    bySource: breakdown(scope.bySource),
    byMachine: breakdown(scope.byMachine),
    byToolMachine: breakdown(scope.byToolMachine),
    topModels: ranked(scope.byModel, 8),
    topBuckets: ranked(scope.byCwd, 25, bucketOf),
    topCwds: ranked(scope.byCwd, 15),
    codexThreadTotalsLeftOut: scope.excludedThreadTotals,
  };
}

export function buildReport({ ledger, totals, machines, measuredAt, seconds }) {
  const scopes = {};
  for (const name of ['products', 'ambiguous', 'other', 'all']) {
    const scope = totals.scopes.get(name);
    if (scope) scopes[name] = scopeReport(scope);
  }
  return {
    measuredAt: measuredAt.toISOString(),
    seconds,
    machines: machines.map(({ machine, scannedAt, stats, homes }) => ({
      machine,
      scannedAt,
      stats,
      homes: homes.length,
    })),
    files: ledger.files,
    calls: totals.counts,
    dedupe: ledger.dedupe,
    diagnostics: ledger.diag,
    scopes,
  };
}

/** The small breakdown stored with a published snapshot. */
export function snapshotOf(report, scopeName = 'products') {
  const scope = report.scopes[scopeName];
  const tool = name => scope.byTool[name]?.processed ?? 0;
  const machine = name => scope.byMachine[name]?.processed ?? 0;
  return {
    scope: scopeName,
    measuredAt: report.measuredAt,
    total: scope.processed,
    ratePerSecond: Math.round(scope.ratePerSecond * 1000) / 1000,
    breakdown: {
      claude: tool('claude'),
      codex: tool('codex'),
      codexThreadTotals: scope.bySource['codex thread totals']?.processed ?? 0,
      mac: machine('mac'),
      m1Runner: machine('m1-runner'),
      withoutCacheReads: scope.withoutCacheReads,
      output: scope.output,
      first: scope.first,
      last: scope.last,
      rateWindowDays: 7,
    },
  };
}

const n = value => Math.round(value).toLocaleString('en-US');
const b = value => `${(value / 1e9).toFixed(2)}B`;

export function formatReport(report) {
  const lines = [`Measured ${report.measuredAt} in ${report.seconds}s`];
  for (const m of report.machines) {
    lines.push(
      `  ${m.machine}: ${m.homes} homes, ${m.stats.files} files (${m.stats.scanned} read, ${(m.stats.bytesRead / 1e9).toFixed(1)} GB; ${m.stats.cached} cached; ${m.stats.gone} kept from deleted logs; ${m.stats.failed} failed) in ${m.stats.seconds}s`
    );
  }
  lines.push(
    `  ledger: ${n(report.calls.claudeCalls)} Claude calls, ${n(report.calls.codexResponses)} Codex responses, ${n(report.calls.codexCumulativeThreads)} Codex threads with cumulative totals only`
  );
  const d = report.dedupe;
  lines.push(
    `  dedupe: Claude ${n(d.claudeRows)} file rows -> ${n(report.calls.claudeCalls)} calls (${n(d.claudeRowsRepeatedAcrossFiles)} repeats across files, ${n(d.claudeRowsRepeatedAcrossMachines)} across machines); Codex ${n(d.codexRecords)} records -> ${n(report.calls.codexResponses)} responses (${n(d.codexRecordsRepeatedAcrossFiles)} repeats across files)`
  );
  lines.push(
    `  Codex record files: records ${b(d.codexRecordSum)} vs running totals ${b(d.codexCumulativeSumInRecordFiles)}; growth before first record ${b(d.codexGrowthBeforeFirstRecord)}`
  );
  lines.push(
    `  Codex thread databases: ${n(d.codexDatabaseRows)} rows; ${n(report.calls.codexThreadTotalsUsed)} threads with no rollout log counted from their totals, ${n(report.calls.codexThreadTotalsLeftOut)} left out (pre-0.150 spawned threads)`
  );
  for (const [name, s] of Object.entries(report.scopes)) {
    lines.push(
      '',
      `[${name}] ${n(s.processed)} tokens processed (${b(s.processed)})`
    );
    lines.push(
      `  without cache reads ${n(s.withoutCacheReads)}; output only ${n(s.output)}`
    );
    lines.push(
      `  input ${n(s.input)}, cache writes ${n(s.cacheCreation)}, cache reads ${n(s.cacheRead)}, output ${n(s.output)}, Codex thread totals without a split ${n(s.unsplit)}`
    );
    if (s.codexThreadTotalsLeftOut)
      lines.push(
        `  left out: ${n(s.codexThreadTotalsLeftOut)} in thread totals of pre-0.150 spawned Codex threads with no log`
      );
    lines.push(
      `  ${s.first} -> ${s.last}; last 7 days ${n(s.last7d.processed)} = ${n(s.ratePerSecond)} tokens/s`
    );
    for (const [label, group] of [
      ['tool', s.byTool],
      ['source', s.bySource],
      ['machine', s.byMachine],
      ['tool x machine', s.byToolMachine],
    ]) {
      lines.push(
        `  by ${label}: ${Object.entries(group)
          .map(
            ([k, v]) =>
              `${k} ${b(v.processed)} (no cache reads ${b(v.withoutCacheReads)}, output ${b(v.output)})`
          )
          .join('; ')}`
      );
    }
    lines.push(
      `  models: ${s.topModels.map(([k, v]) => `${k} ${b(v)}`).join(', ')}`
    );
    lines.push('  top buckets:');
    for (const [k, v] of s.topBuckets)
      lines.push(`    ${b(v).padStart(9)}  ${k}`);
  }
  return lines.join('\n');
}
