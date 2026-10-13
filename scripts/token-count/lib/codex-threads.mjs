// Codex's own per-thread totals: state_5.sqlite `threads.tokens_used`, the
// thread's final cumulative total_tokens (cached input included). It equals
// the rollout measurement exactly for 94% of threads that still have their
// log, and within 1% in sum. The aggregator uses it only for threads whose
// rollout log is gone (pruned or cleaned up), so those tokens are not lost.
//
// One caveat it carries forward: forks made by CLIs before 0.150 start from
// their parent's running total, which the log reveals and the database does
// not, so those threads are left out unless they were started by a person.
import { DatabaseSync } from 'node:sqlite';

import { intern, newSummary, num } from './summary.mjs';

export const THREAD_WIDTH = 6; // [cwd, tokens, createdAt, updatedAt, spawned 0|1, cliMinor]

const COLUMNS = [
  'id',
  'cwd',
  'tokens_used',
  'created_at',
  'updated_at',
  'cli_version',
  'thread_source',
];

/** 0.149.1 -> 149; an unknown version -> 0. */
const cliMinor = version => Number(/^0\.(\d+)/.exec(version ?? '')?.[1] ?? 0);

export function scanCodexThreads(path) {
  const db = new DatabaseSync(path, { readOnly: true });
  try {
    const columns = new Set(
      db
        .prepare("SELECT name FROM pragma_table_info('threads')")
        .all()
        .map(row => row.name)
    );
    const missing = COLUMNS.filter(column => !columns.has(column));
    if (missing.length)
      throw new Error(`threads table lacks ${missing.join(', ')}`);
    const spawned = new Set();
    const hasEdges = db
      .prepare(
        "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'thread_spawn_edges'"
      )
      .get();
    if (hasEdges) {
      for (const row of db
        .prepare('SELECT child_thread_id AS id FROM thread_spawn_edges')
        .all())
        spawned.add(row.id);
    }

    const summary = newSummary('codex-threads');
    const cwdIndex = new Map();
    summary.threads = { ids: [], v: [] };
    for (const row of db
      .prepare(`SELECT ${COLUMNS.join(', ')} FROM threads`)
      .all()) {
      summary.threads.ids.push(row.id);
      summary.threads.v.push(
        intern(summary.cwds, cwdIndex, row.cwd),
        num(row.tokens_used),
        num(row.created_at),
        num(row.updated_at),
        spawned.has(row.id) || row.thread_source === 'subagent' ? 1 : 0,
        cliMinor(row.cli_version)
      );
    }
    return summary;
  } finally {
    db.close();
  }
}
