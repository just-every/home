import type { SuggestResponse } from '@/lib/interactive-api';
import { workerEnv } from '@/server/env';
import {
  clientAddress,
  errorResponse,
  json,
  readJsonObject,
} from '@/server/http';
import { storeSuggestion } from '@/server/suggest/service';

/** POST { product, note?, email?, website (honeypot) } -> 201 { ok: true }. */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJsonObject(request);
    const env = await workerEnv();
    await storeSuggestion(env, body, clientAddress(request));
    const created: SuggestResponse = { ok: true };
    return json(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
