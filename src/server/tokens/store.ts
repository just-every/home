import type { TokenSnapshot } from '@/lib/tokens';

/** The scope the footer shows: the Just Every products and Run Edit Run. */
export const FOOTER_SCOPE = 'products';

interface SnapshotRow {
  total: number;
  rate_per_second: number;
  measured_at: string;
}

/** The newest measurement for a scope, or null before the first one. */
export async function latestTokenSnapshot(
  db: D1Database,
  scope = FOOTER_SCOPE
): Promise<TokenSnapshot | null> {
  const row = await db
    .prepare(
      `SELECT total, rate_per_second, measured_at FROM token_snapshots
       WHERE scope = ? ORDER BY measured_at DESC, id DESC LIMIT 1`
    )
    .bind(scope)
    .first<SnapshotRow>();
  if (!row) return null;
  return {
    total: row.total,
    ratePerSecond: row.rate_per_second,
    measuredAt: row.measured_at,
  };
}
