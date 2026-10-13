import type { MatchItem } from '@/lib/interactive-api';

import { catalogueSlugs } from './catalogue';

/** A cached answer for this catalogue version, or null when there is none. */
export async function readCachedMatch(
  db: D1Database,
  catalogue: string,
  query: string
): Promise<MatchItem[] | null> {
  const row = await db
    .prepare(
      'SELECT result FROM match_cache WHERE catalogue = ?1 AND query = ?2'
    )
    .bind(catalogue, query)
    .first<{ result: string }>();
  if (!row) return null;
  const matches = JSON.parse(row.result) as MatchItem[];
  // The version key already pins the catalogue; this guards a hand-edited row.
  return matches.every(match => catalogueSlugs.has(match.slug))
    ? matches
    : null;
}

export async function writeCachedMatch(
  db: D1Database,
  catalogue: string,
  query: string,
  matches: MatchItem[]
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO match_cache (catalogue, query, result) VALUES (?1, ?2, ?3)
       ON CONFLICT (catalogue, query) DO UPDATE SET
         result = excluded.result, created_at = excluded.created_at`
    )
    .bind(catalogue, query, JSON.stringify(matches))
    .run();
}

/** One answered search: the text, what it matched, whether D1 answered. */
export async function logSearch(
  db: D1Database,
  query: string,
  matches: MatchItem[],
  cacheHit: boolean
): Promise<void> {
  await db
    .prepare(
      'INSERT INTO search_log (query, slugs, cache_hit) VALUES (?1, ?2, ?3)'
    )
    .bind(query, matches.map(match => match.slug).join(','), cacheHit ? 1 : 0)
    .run();
}
