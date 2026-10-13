import Anthropic from '@anthropic-ai/sdk';

import { MATCH_MAX } from '@/lib/interactive-api';
import type { MatchItem } from '@/lib/interactive-api';

import { ApiError } from '../http';
import {
  MATCH_MODEL,
  catalogueSlugs,
  matchSchema,
  systemPrompt,
} from './catalogue';

/**
 * The parsed structured output, checked against the real catalogue. Any
 * slug outside it, or an empty reason, is a model error: the visitor sees an
 * honest failure, never a guessed result.
 */
function validMatches(text: string): MatchItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Claude returned text that is not JSON');
  }
  const list = (parsed as { matches?: unknown })?.matches;
  if (!Array.isArray(list)) throw new Error('Claude returned no matches list');

  const seen = new Set<string>();
  const matches: MatchItem[] = [];
  for (const item of list) {
    const { slug, reason } = (item ?? {}) as Record<string, unknown>;
    if (typeof slug !== 'string' || !catalogueSlugs.has(slug)) {
      throw new Error(`Claude named an unknown product: ${String(slug)}`);
    }
    if (typeof reason !== 'string' || !reason.trim()) {
      throw new Error(`Claude gave no reason for ${slug}`);
    }
    if (seen.has(slug)) continue;
    seen.add(slug);
    matches.push({ slug, reason: reason.trim() });
  }
  return matches.slice(0, MATCH_MAX);
}

/**
 * Asks Claude which products fit the visitor's (normalised) text. The system
 * prompt carries the whole catalogue and is marked for prompt caching.
 */
export async function askClaude(
  apiKey: string,
  query: string
): Promise<MatchItem[]> {
  const client = new Anthropic({ apiKey, maxRetries: 1, timeout: 20_000 });

  let response: Anthropic.Message;
  try {
    response = await client.messages.create({
      model: MATCH_MODEL,
      // Up to three one-sentence reasons in JSON: well under 300 tokens.
      max_tokens: 500,
      // A short classification over a catalogue in the prompt: no thinking.
      thinking: { type: 'disabled' },
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: matchSchema },
      },
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        { role: 'user', content: `<visitor_text>${query}</visitor_text>` },
      ],
    });
  } catch (error) {
    if (
      error instanceof Anthropic.AuthenticationError ||
      error instanceof Anthropic.PermissionDeniedError
    ) {
      console.error('Anthropic rejected the API key', error.status);
      throw new ApiError(
        'not_configured',
        'Matching is not set up correctly here.'
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new ApiError(
        'unavailable',
        'The matcher is busy. Try again in a moment.'
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error', error.status, error.message);
      throw new ApiError(
        'unavailable',
        "The matcher isn't answering right now. Try again in a moment."
      );
    }
    throw error;
  }

  const { usage } = response;
  console.log(
    `match usage: input ${usage.input_tokens}, cache write ${usage.cache_creation_input_tokens ?? 0}, cache read ${usage.cache_read_input_tokens ?? 0}, output ${usage.output_tokens}`
  );

  if (response.stop_reason === 'refusal') {
    throw new ApiError('unavailable', "The matcher couldn't answer that one.");
  }
  if (response.stop_reason !== 'end_turn') {
    console.error('Unexpected match stop reason', response.stop_reason);
    throw new ApiError(
      'unavailable',
      "The matcher isn't answering right now. Try again in a moment."
    );
  }

  const text = response.content
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('');
  try {
    return validMatches(text);
  } catch (error) {
    console.error('Invalid match output', error);
    throw new ApiError(
      'unavailable',
      "The matcher gave an answer we couldn't use. Try again in a moment."
    );
  }
}
