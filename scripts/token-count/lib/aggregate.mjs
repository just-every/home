// Merges per-file summaries from every machine into one deduplicated ledger
// and totals it per scope. Files are added one at a time and dropped after,
// so memory holds the ledger, not the summaries.
//
// Dedupe rules
//   Claude call     once per message id + requestId across every file, home
//                   and machine (a resumed or forked session, or a copied
//                   home, repeats earlier calls), each field at its largest.
//   Codex response  once per response_id across everything, same merge.
//   Codex thread    a thread that logs only cumulative totals counts once:
//                   the file with the largest growth for that thread id wins
//                   (archived copies, copied homes).
//   Codex file with response records: its records count, plus cumulative
//                   growth logged before its first record (an older CLI
//                   earlier in the same thread); growth after is ignored.
//   Codex thread total (state database) only for a thread id no rollout log
//                   on any machine names, its largest value across homes,
//                   spread evenly from its creation to its last update. Its
//                   tokens have no input/cache/output split ("unsplit").
import { BIN_WIDTH, UNIT_WIDTH } from './summary.mjs';
import { THREAD_WIDTH } from './codex-threads.mjs';

const HOUR = 3600;
const DAY = 86400;
/** Codex CLIs from 0.150 log per-response records; earlier forks inherit their parent's total. */
const RECORDS_CLI_MINOR = 150;
const sum4 = v => v[0] + v[1] + v[2] + v[3];

export const newTotals = () => ({
  input: 0,
  cacheCreation: 0,
  cacheRead: 0,
  output: 0,
  unsplit: 0,
});
export const processed = t =>
  t.input + t.cacheCreation + t.cacheRead + t.output + t.unsplit;
/** Excludes unsplit thread totals too, so it is a floor where they occur. */
export const withoutCacheReads = t => t.input + t.cacheCreation + t.output;

function addTotals(totals, v) {
  totals.input += v[0];
  totals.cacheCreation += v[1];
  totals.cacheRead += v[2];
  totals.output += v[3];
  totals.unsplit += v[4] ?? 0;
}

function into(map, key) {
  let totals = map.get(key);
  if (!totals) map.set(key, (totals = newTotals()));
  return totals;
}

function newScope() {
  return {
    totals: newTotals(),
    last7d: newTotals(),
    byTool: new Map(),
    bySource: new Map(),
    byMachine: new Map(),
    byToolMachine: new Map(),
    byModel: new Map(),
    byCwd: new Map(),
    excludedThreadTotals: 0,
    first: Infinity,
    last: 0,
  };
}

export class Ledger {
  units = new Map(); // id hash -> row
  threads = new Map(); // codex thread id -> best cumulative file
  loggedThreads = new Set(); // codex thread ids seen in any rollout
  threadTotals = new Map(); // codex thread id -> state database row
  files = { claude: 0, codex: 0, 'codex-threads': 0, gone: 0, withoutUsage: 0 };
  diag = {};
  dedupe = {
    claudeRows: 0,
    claudeRowsRepeatedAcrossFiles: 0,
    claudeRowsRepeatedAcrossMachines: 0,
    codexRecords: 0,
    codexRecordsRepeatedAcrossFiles: 0,
    codexRecordFiles: 0,
    codexRecordSum: 0,
    codexCumulativeSumInRecordFiles: 0,
    codexGrowthBeforeFirstRecord: 0,
    codexCumulativeFiles: 0,
    codexCumulativeFilesRepeatingAThread: 0,
    codexDatabaseRows: 0,
  };

  add(machine, header, summary) {
    const s = summary;
    this.files[s.kind]++;
    if (header.gone) this.files.gone++;
    for (const [key, value] of Object.entries(s.diag))
      this.diag[`${s.kind}:${key}`] =
        (this.diag[`${s.kind}:${key}`] ?? 0) + value;
    if (s.kind === 'codex-threads') this.addThreadTotals(machine, s);
    else this.addLog(machine, header, s);
  }

  addThreadTotals(machine, s) {
    const { ids, v } = s.threads;
    for (let i = 0; i < ids.length; i++) {
      this.dedupe.codexDatabaseRows++;
      const base = i * THREAD_WIDTH;
      const row = {
        cwd: s.cwds[v[base]],
        tokens: v[base + 1],
        createdAt: v[base + 2],
        updatedAt: v[base + 3],
        spawned: v[base + 4] === 1,
        cliMinor: v[base + 5],
        machine,
      };
      const best = this.threadTotals.get(ids[i]);
      if (!best || row.tokens > best.tokens) this.threadTotals.set(ids[i], row);
    }
  }

  addLog(machine, header, s) {
    const { dedupe } = this;
    const n = s.units.k.length;
    if (!n && !s.bins.length) this.files.withoutUsage++;
    if (s.kind === 'codex' && s.meta.thread)
      this.loggedThreads.add(s.meta.thread);

    let recordSum = 0;
    for (let i = 0; i < n; i++) {
      const base = i * UNIT_WIDTH;
      const v = s.units.v.slice(base + 2, base + 6);
      const t = s.units.t[i];
      if (s.kind === 'claude') dedupe.claudeRows++;
      else {
        dedupe.codexRecords++;
        recordSum += sum4(v);
      }
      const k = s.units.k[i];
      const row = this.units.get(k);
      if (!row) {
        this.units.set(k, {
          kind: s.kind,
          t,
          cwd: s.cwds[s.units.v[base]],
          model: s.models[s.units.v[base + 1]],
          machine,
          file: header.file,
          v,
        });
        continue;
      }
      if (row.file !== header.file)
        dedupe[
          s.kind === 'claude'
            ? 'claudeRowsRepeatedAcrossFiles'
            : 'codexRecordsRepeatedAcrossFiles'
        ]++;
      if (row.machine !== machine && s.kind === 'claude')
        dedupe.claudeRowsRepeatedAcrossMachines++;
      for (let j = 0; j < 4; j++) row.v[j] = Math.max(row.v[j], v[j]);
      if (t && (!row.t || t < row.t)) row.t = t;
    }

    if (s.kind !== 'codex' || !s.bins.length) return;
    const bins = [];
    let growth = 0;
    for (let i = 0; i < s.bins.length; i += BIN_WIDTH) {
      const v = s.bins.slice(i + 4, i + 8);
      const before = s.bins[i + 3] === 1;
      growth += sum4(v);
      if (n && before) dedupe.codexGrowthBeforeFirstRecord += sum4(v);
      if (!n || before)
        bins.push({
          t: s.bins[i],
          cwd: s.cwds[s.bins[i + 1]],
          model: s.models[s.bins[i + 2]],
          v,
        });
    }
    if (n) {
      dedupe.codexRecordFiles++;
      dedupe.codexRecordSum += recordSum;
      dedupe.codexCumulativeSumInRecordFiles += growth;
    } else dedupe.codexCumulativeFiles++;
    if (!bins.length) return;
    const thread = s.meta.thread ?? `file:${header.file}`;
    const total = bins.reduce((acc, bin) => acc + sum4(bin.v), 0);
    const best = this.threads.get(thread);
    if (best) dedupe.codexCumulativeFilesRepeatingAThread++;
    if (!best || total > best.total)
      this.threads.set(thread, { total, machine, bins });
  }

  /** Totals per scope ('products', 'ambiguous', 'other' and 'all'). */
  totals(classify, now = Date.now() / 1000) {
    const scopes = new Map();
    const scopeOf = name => {
      let scope = scopes.get(name);
      if (!scope) scopes.set(name, (scope = newScope()));
      return scope;
    };
    const classified = new Map();
    const where = (cwd, foundOn) => {
      const memo = `${foundOn}\0${cwd ?? ''}`;
      let found = classified.get(memo);
      if (!found) classified.set(memo, (found = classify(cwd ?? '', foundOn)));
      return found;
    };
    const record = (kind, source, foundOn, cwd, model, t, v) => {
      const at = where(cwd, foundOn);
      for (const scope of [scopeOf(at.scope), scopeOf('all')]) {
        addTotals(scope.totals, v);
        addTotals(into(scope.byTool, kind), v);
        addTotals(into(scope.bySource, source), v);
        addTotals(into(scope.byMachine, at.machine), v);
        addTotals(into(scope.byToolMachine, `${kind} on ${at.machine}`), v);
        addTotals(into(scope.byModel, model || 'unknown'), v);
        addTotals(into(scope.byCwd, cwd ?? ''), v);
        if (t >= now - 7 * DAY) addTotals(scope.last7d, v);
        if (t && sum4(v) + (v[4] ?? 0)) {
          scope.first = Math.min(scope.first, t);
          scope.last = Math.max(scope.last, t);
        }
      }
    };
    const counts = {
      claudeCalls: 0,
      codexResponses: 0,
      codexCumulativeThreads: this.threads.size,
      codexThreadTotalsUsed: 0,
      codexThreadTotalsLeftOut: 0,
    };
    for (const row of this.units.values()) {
      counts[row.kind === 'claude' ? 'claudeCalls' : 'codexResponses']++;
      const source = row.kind === 'claude' ? 'claude logs' : 'codex logs';
      record(row.kind, source, row.machine, row.cwd, row.model, row.t, row.v);
    }
    for (const thread of this.threads.values()) {
      for (const bin of thread.bins)
        record(
          'codex',
          'codex logs',
          thread.machine,
          bin.cwd,
          bin.model,
          bin.t,
          bin.v
        );
    }
    for (const [id, row] of this.threadTotals) {
      if (this.loggedThreads.has(id) || !row.tokens) continue;
      if (row.spawned && row.cliMinor < RECORDS_CLI_MINOR) {
        counts.codexThreadTotalsLeftOut++;
        const scope = where(row.cwd, row.machine).scope;
        scopeOf(scope).excludedThreadTotals += row.tokens;
        scopeOf('all').excludedThreadTotals += row.tokens;
        continue;
      }
      counts.codexThreadTotalsUsed++;
      const start = row.createdAt - (row.createdAt % HOUR);
      const hours = Math.max(
        1,
        Math.ceil((Math.max(row.updatedAt, row.createdAt) - start + 1) / HOUR)
      );
      const share = row.tokens / hours;
      for (let h = 0; h < hours; h++)
        record(
          'codex',
          'codex thread totals',
          row.machine,
          row.cwd,
          null,
          start + h * HOUR,
          [0, 0, 0, 0, share]
        );
    }
    return { scopes, counts };
  }
}
