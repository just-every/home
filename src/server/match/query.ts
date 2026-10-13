import { QUERY_MAX } from '@/lib/interactive-api';

import { ApiError } from '../http';

/**
 * The visitor's text as it is matched, cached and logged: Unicode-normalised,
 * lower case, single-spaced, with no angle brackets (the prompt wraps it in a
 * tag) and no wrapping quotes or trailing punctuation. "  Notion! " and
 * "notion" are one query.
 */
export function normaliseQuery(raw: unknown): string {
  if (typeof raw !== 'string') {
    throw new ApiError('invalid_request', 'Type a product or a task first.');
  }
  const trimmed = raw.trim();
  if (trimmed.length > QUERY_MAX) {
    throw new ApiError(
      'invalid_request',
      `Keep it to ${QUERY_MAX} characters or fewer.`
    );
  }
  const query = trimmed
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^["'‘’“”\s]+|["'‘’“”\s.,;:!?]+$/g, '')
    .trim();
  if (!query) {
    throw new ApiError('invalid_request', 'Type a product or a task first.');
  }
  return query;
}
