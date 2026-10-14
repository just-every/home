import type { SuggestResponse } from '@/lib/interactive-api';
import {
  CONTACT_BODY_MAX_BYTES,
  storeContactMessage,
} from '@/server/contact/service';
import { workerEnv } from '@/server/env';
import {
  clientAddress,
  errorResponse,
  json,
  readJsonObject,
} from '@/server/http';

/** POST { topic?, name?, email, message, website (honeypot) } -> 201 { ok: true }. */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJsonObject(request, CONTACT_BODY_MAX_BYTES);
    const env = await workerEnv();
    await storeContactMessage(env, body, clientAddress(request));
    const created: SuggestResponse = { ok: true };
    return json(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
