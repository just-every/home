/**
 * The contract of the landing page's two endpoints, shared by the route
 * handlers (src/server) and the page's client components.
 */

/** Longest visitor text /api/match accepts, after trimming. */
export const QUERY_MAX = 120;
/** Most products one answer may name. */
export const MATCH_MAX = 3;

export const SUGGEST_PRODUCT_MAX = 120;
export const SUGGEST_NOTE_MAX = 500;
export const SUGGEST_EMAIL_MAX = 254;

/** One product picked for the visitor, with Claude's one-sentence reason. */
export interface MatchItem {
  slug: string;
  reason: string;
}

/** POST /api/match 200. `matches` is empty when nothing in the collection fits. */
export interface MatchResponse {
  /** The normalised text that was matched (and cached). */
  query: string;
  matches: MatchItem[];
  /** True when the answer came from the D1 cache, with no model call. */
  cached: boolean;
}

/** POST /api/suggest 201. */
export interface SuggestResponse {
  ok: true;
}

export type ApiErrorCode =
  /** Missing, empty or too long input. 400. */
  | 'invalid_request'
  /** The honeypot was filled. 400. */
  | 'rejected'
  /** Too many requests from this visitor. 429. */
  | 'rate_limited'
  /** A binding or the Anthropic key is missing or wrong. 503. */
  | 'not_configured'
  /** Claude or D1 failed or declined. 502/503. */
  | 'unavailable';

export interface ApiErrorBody {
  error: { code: ApiErrorCode; message: string };
}
