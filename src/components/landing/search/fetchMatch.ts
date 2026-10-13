import { search } from '@/content/landing';
import type { ApiErrorBody, MatchResponse } from '@/lib/interactive-api';

export type MatchOutcome =
  | { ok: true; answer: MatchResponse }
  | { ok: false; message: string };

/**
 * POST /api/match. A failure carries the server's own plain message (rate
 * limited, not configured, unavailable), or the network message when the
 * request never got an answer. Never a made-up result.
 */
export async function fetchMatch(
  query: string,
  signal: AbortSignal
): Promise<MatchOutcome> {
  let response: Response;
  try {
    response = await fetch('/api/match', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query }),
      signal,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    return { ok: false, message: search.network };
  }
  const body = (await response.json().catch(() => null)) as
    | MatchResponse
    | ApiErrorBody
    | null;
  if (response.ok && body && 'matches' in body) {
    return { ok: true, answer: body };
  }
  if (body && 'error' in body) {
    return { ok: false, message: body.error.message };
  }
  return { ok: false, message: search.network };
}
