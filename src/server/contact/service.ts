import {
  CONTACT_MESSAGE_MAX,
  CONTACT_NAME_MAX,
  SUGGEST_EMAIL_MAX,
} from '@/lib/interactive-api';

import { requireDb } from '../env';
import { ApiError } from '../http';
import { takeRateLimit } from '../rate-limit';

/** The form's hidden field. People never see it; form-filling bots do. */
export const HONEYPOT_FIELD = 'website';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactTopic = 'general' | 'maker';

/** Trimmed text, or null when absent or empty; refuses non-text and too long. */
function text(value: unknown, max: number, label: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') {
    throw new ApiError('invalid_request', `${label} must be text.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new ApiError(
      'invalid_request',
      `${label} must be ${max} characters or fewer.`
    );
  }
  return trimmed || null;
}

/** The fields as stored, or an `invalid_request` naming what is wrong. */
export function readContactMessage(body: Record<string, unknown>) {
  const name = text(body.name, CONTACT_NAME_MAX, 'The name');
  const email = text(body.email, SUGGEST_EMAIL_MAX, 'The email');
  if (!email) {
    throw new ApiError('invalid_request', 'Add your email so we can reply.');
  }
  if (!EMAIL.test(email)) {
    throw new ApiError(
      'invalid_request',
      'That email address does not look right.'
    );
  }
  const message = text(body.message, CONTACT_MESSAGE_MAX, 'The message');
  if (!message) {
    throw new ApiError('invalid_request', 'Write a message first.');
  }
  const topic: ContactTopic = body.topic === 'maker' ? 'maker' : 'general';
  return { topic, name, email, message };
}

/**
 * POST /api/contact: refuse filled honeypots, validate, rate limit, store.
 * Rows hold only what the visitor typed and when; no IP, no user agent.
 */
export async function storeContactMessage(
  env: CloudflareEnv,
  body: Record<string, unknown>,
  address: string
): Promise<void> {
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === 'string' && trap.trim()) {
    throw new ApiError('rejected', 'That did not look like a person.');
  }
  const { topic, name, email, message } = readContactMessage(body);
  await takeRateLimit(env, 'contact', address);
  await requireDb(env)
    .prepare(
      'INSERT INTO contact_messages (topic, name, email, message) VALUES (?1, ?2, ?3, ?4)'
    )
    .bind(topic, name, email, message)
    .run();
}
