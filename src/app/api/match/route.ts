import { workerEnv } from '@/server/env';
import {
  clientAddress,
  errorResponse,
  json,
  readJsonObject,
} from '@/server/http';
import { matchQuery } from '@/server/match/service';

/** POST { query } -> { query, matches: [{ slug, reason }], cached }. */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJsonObject(request);
    const env = await workerEnv();
    return json(await matchQuery(env, body, clientAddress(request)));
  } catch (error) {
    return errorResponse(error);
  }
}
