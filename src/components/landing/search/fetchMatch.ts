import { search } from '@/content/landing';
import type { ApiErrorBody, MatchResponse } from '@/lib/interactive-api';

export type MatchOutcome =
  | { ok: true; answer: MatchResponse }
  | { ok: false; message: string };

/**
 * POST /api/match. A failure carries a short visitor-facing message for its
 * code (rate limited; not configured or unavailable), the server's own for a
 * bad request, or the network message when the request never got an answer.
 * Never a made-up result.
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
    const { code, message } = body.error;
    if (code === 'rate_limited')
      return { ok: false, message: search.rateLimited };
    if (code === 'invalid_request') return { ok: false, message };
    return { ok: false, message: search.unavailable };
  }
  if (response.status >= 500) return { ok: false, message: search.unavailable };
  return { ok: false, message: search.network };
}
