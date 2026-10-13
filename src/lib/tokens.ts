/**
 * The footer's "Made with N tokens": the contract of GET /api/tokens and the
 * live count the page derives from it. Shared by the route and the footer.
 */

/** GET /api/tokens 200: the newest measured snapshot. */
export interface TokenSnapshot {
  /** Tokens processed when measured (input + cache writes + cache reads + output). */
  total: number;
  /** The 7-day average before the measurement, in tokens per second. */
  ratePerSecond: number;
  /** ISO 8601 time the session logs were read. */
  measuredAt: string;
}

/** What the footer says while the count is live. */
export const TOKENS_EXPLAINED =
  'Claude and Codex tokens spent building these products, measured from our own session logs and updated every few days.';

/**
 * The count keeps rising at the measured rate for at most this long after a
 * measurement; past it the page holds the number rather than guess further.
 * Measurements land every three days.
 */
export const MAX_ESTIMATE_MS = 7 * 24 * 60 * 60 * 1000;

/** The response body as a snapshot, or null when it is not one. */
export function readTokenSnapshot(value: unknown): TokenSnapshot | null {
  if (!value || typeof value !== 'object') return null;
  const { total, ratePerSecond, measuredAt } = value as Record<string, unknown>;
  if (typeof total !== 'number' || !Number.isFinite(total) || total < 0)
    return null;
  if (
    typeof ratePerSecond !== 'number' ||
    !Number.isFinite(ratePerSecond) ||
    ratePerSecond < 0
  )
    return null;
  if (typeof measuredAt !== 'string' || Number.isNaN(Date.parse(measuredAt)))
    return null;
  return { total, ratePerSecond, measuredAt };
}

/** The measured total plus the tokens the rate predicts since, at `now` (ms). */
export function tokensAt(snapshot: TokenSnapshot, now: number): number {
  const elapsed = Math.min(
    Math.max(0, now - Date.parse(snapshot.measuredAt)),
    MAX_ESTIMATE_MS
  );
  return Math.floor(snapshot.total + (snapshot.ratePerSecond * elapsed) / 1000);
}
