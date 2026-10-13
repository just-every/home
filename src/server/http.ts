import type { ApiErrorBody, ApiErrorCode } from '@/lib/interactive-api';

const STATUS: Record<ApiErrorCode, number> = {
  invalid_request: 400,
  rejected: 400,
  rate_limited: 429,
  not_configured: 503,
  unavailable: 502,
};

/** A failure the endpoints report to the visitor as `{ error: { code, message } }`. */
export class ApiError extends Error {
  constructor(
    readonly code: ApiErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const NO_STORE = { 'cache-control': 'no-store' };

export function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: NO_STORE });
}

export function errorResponse(error: unknown): Response {
  if (error instanceof ApiError) {
    const body: ApiErrorBody = {
      error: { code: error.code, message: error.message },
    };
    return json(body, STATUS[error.code]);
  }
  console.error('Unhandled API error', error);
  const body: ApiErrorBody = {
    error: {
      code: 'unavailable',
      message: 'Something went wrong on our side.',
    },
  };
  return json(body, 500);
}

/** Bodies are a few hundred bytes; anything far larger is not the form. */
const MAX_BODY_BYTES = 8 * 1024;

const tooLarge = () =>
  new ApiError('invalid_request', 'That request is too large.');

/**
 * The body as text, refused once it passes MAX_BODY_BYTES: by its declared
 * length before reading, else while reading, so an oversized body is never
 * buffered whole.
 */
async function readCappedText(request: Request): Promise<string> {
  const declared = Number(request.headers.get('content-length'));
  if (declared > MAX_BODY_BYTES) throw tooLarge();
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw tooLarge();
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

/** The request's JSON object body, or an `invalid_request` error. */
export async function readJsonObject(
  request: Request
): Promise<Record<string, unknown>> {
  const text = await readCappedText(request);
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new ApiError('invalid_request', 'Send a JSON body.');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ApiError('invalid_request', 'Send a JSON object.');
  }
  return value as Record<string, unknown>;
}

/**
 * Who is asking, for rate limiting only. Cloudflare always sets
 * cf-connecting-ip in production; local dev servers set x-forwarded-for or
 * nothing.
 */
export function clientAddress(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'local'
  );
}
