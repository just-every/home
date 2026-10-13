import type { MatchResponse } from '@/lib/interactive-api';

import { requireDb } from '../env';
import { ApiError } from '../http';
import { takeRateLimit } from '../rate-limit';
import { catalogueVersion } from './catalogue';
import { askClaude } from './claude';
import { normaliseQuery } from './query';
import { logSearch, readCachedMatch, writeCachedMatch } from './store';

/**
 * POST /api/match: rate limit, then the D1 cache, then Claude. Every answer
 * (cached or not) is logged for demand, without anything about the visitor.
 */
export async function matchQuery(
  env: CloudflareEnv,
  body: Record<string, unknown>,
  address: string
): Promise<MatchResponse> {
  const query = normaliseQuery(body.query);
  await takeRateLimit(env, 'match', address);
  const db = requireDb(env);

  const cached = await readCachedMatch(db, catalogueVersion, query);
  if (cached) {
    await logSearch(db, query, cached, true);
    return { query, matches: cached, cached: true };
  }

  if (!env.ANTHROPIC_API_KEY) {
    throw new ApiError(
      'not_configured',
      'Matching by task is not switched on here yet.'
    );
  }
  const matches = await askClaude(env.ANTHROPIC_API_KEY, query);
  await Promise.all([
    writeCachedMatch(db, catalogueVersion, query, matches),
    logSearch(db, query, matches, false),
  ]);
  return { query, matches, cached: false };
}
