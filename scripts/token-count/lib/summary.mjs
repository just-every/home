// The per-file summary every scanner returns and the cache stores. It holds
// counts only: hashed call ids, timestamps, working directories, model names
// and token numbers. No prompt, response or tool text ever enters it.
//
//   units   one row per deduplicable API call (a Claude message, a Codex
//           response): k = 52-bit hash of its id, t = epoch seconds,
//           v = [cwd, model, input, cacheCreation, cacheRead, output] flat
//   bins    hourly growth of a Codex thread's cumulative totals:
//           [hourEpochSeconds, cwd, model, beforeFirstRecord 0|1,
//            input, cc, cr, output] flat
//
// cwd and model are indexes into the summary's own string tables.
import { createHash } from 'node:crypto';

export const UNIT_WIDTH = 6;
export const BIN_WIDTH = 8;

/** 52 bits of SHA-1: exact in a double, collision-free in practice for millions of ids. */
export function hashId(id) {
  return parseInt(createHash('sha1').update(id).digest('hex').slice(0, 13), 16);
}

export function newSummary(kind) {
  return {
    kind,
    cwds: [],
    models: [],
    units: { k: [], t: [], v: [] },
    bins: [],
    meta: {},
    diag: {},
  };
}

export function intern(table, index, value) {
  const key = value ?? '';
  let i = index.get(key);
  if (i === undefined) {
    i = table.length;
    table.push(key);
    index.set(key, i);
  }
  return i;
}

export function bump(diag, name, by = 1) {
  diag[name] = (diag[name] ?? 0) + by;
}

export const num = value => (Number.isFinite(value) && value > 0 ? value : 0);

export const toEpochSeconds = iso => {
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : 0;
};
