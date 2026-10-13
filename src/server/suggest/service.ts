import {
  SUGGEST_EMAIL_MAX,
  SUGGEST_NOTE_MAX,
  SUGGEST_PRODUCT_MAX,
} from '@/lib/interactive-api';

import { requireDb } from '../env';
import { ApiError } from '../http';
import { takeRateLimit } from '../rate-limit';

/** The form's hidden field. People never see it; form-filling bots do. */
export const HONEYPOT_FIELD = 'website';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optionalText(value: unknown, max: number, label: string) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') {
    throw new ApiError('invalid_request', `${label} must be text.`);
  }
  const text = value.trim();
  if (text.length > max) {
    throw new ApiError(
      'invalid_request',
      `${label} must be ${max} characters or fewer.`
    );
  }
  return text || null;
}

/** The fields as stored, or an `invalid_request` naming what is wrong. */
export function readSuggestion(body: Record<string, unknown>) {
  const product = optionalText(
    body.product,
    SUGGEST_PRODUCT_MAX,
    'The product or task'
  );
  if (!product) {
    throw new ApiError(
      'invalid_request',
      'Tell us the product or task you have in mind.'
    );
  }
  const note = optionalText(body.note, SUGGEST_NOTE_MAX, 'The note');
  const email = optionalText(body.email, SUGGEST_EMAIL_MAX, 'The email');
  if (email && !EMAIL.test(email)) {
    throw new ApiError(
      'invalid_request',
      'That email address does not look right.'
    );
  }
  return { product, note, email };
}

/**
 * POST /api/suggest: validate, refuse filled honeypots, rate limit, store.
 * Rows hold only what the visitor typed and when.
 */
export async function storeSuggestion(
  env: CloudflareEnv,
  body: Record<string, unknown>,
  address: string
): Promise<void> {
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === 'string' && trap.trim()) {
    throw new ApiError('rejected', 'That did not look like a person.');
  }
  const { product, note, email } = readSuggestion(body);
  await takeRateLimit(env, 'suggest', address);
  await requireDb(env)
    .prepare(
      'INSERT INTO suggestions (product, note, email) VALUES (?1, ?2, ?3)'
    )
    .bind(product, note, email)
    .run();
}
