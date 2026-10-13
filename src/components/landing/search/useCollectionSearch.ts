'use client';

import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { search } from '@/content/landing';
import type { MatchResponse } from '@/lib/interactive-api';

import { fetchMatch } from './fetchMatch';
import { indexVolumes, localMatches, queryTokens } from './localMatch';
import type { SearchVolume } from './localMatch';

type Asked =
  | { state: 'loading'; query: string }
  | { state: 'answered'; query: string; answer: MatchResponse }
  | { state: 'failed'; query: string; message: string };

/**
 * `all`: nothing is filtering the collection. `instant`: typing matched
 * volumes on the page. `answer`: the button asked /api/match and Claude
 * picked one to three. `none`: it picked nothing.
 */
export type SearchMode = 'all' | 'instant' | 'answer' | 'none';

export interface SearchMatch<T> {
  volume: T;
  reason: string | null;
}

interface Options {
  /**
   * A submitted search found its best product: `apply` shows the answer and
   * must run in the same update that selects `slug`.
   */
  onAnswer: (slug: string, apply: () => void) => void;
}

/**
 * "What do you use today?": typing filters the volumes with no network; the
 * button asks /api/match, where Claude picks the best one to three with a
 * reason each.
 */
export function useCollectionSearch<T extends SearchVolume>(
  volumes: T[],
  { onAnswer }: Options
) {
  const [query, setQueryState] = useState('');
  const [asked, setAsked] = useState<Asked | null>(null);
  // The button was pressed with nothing typed.
  const [prompted, setPrompted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => indexVolumes(volumes), [volumes]);
  const bySlug = useMemo(
    () => new Map(volumes.map(volume => [volume.slug, volume])),
    [volumes]
  );

  const text = query.trim();
  // An answer belongs to the text that was asked; editing it goes back to typing.
  const current = asked?.query === text ? asked : null;
  const answer = current?.state === 'answered' ? current.answer : null;
  const instant = useMemo(() => localMatches(index, text), [index, text]);

  const mode: SearchMode = answer
    ? answer.matches.length > 0
      ? 'answer'
      : 'none'
    : instant.length > 0
      ? 'instant'
      : 'all';

  const matches: SearchMatch<T>[] =
    mode === 'answer' && answer
      ? answer.matches.flatMap(match => {
          const volume = bySlug.get(match.slug);
          return volume ? [{ volume, reason: match.reason }] : [];
        })
      : mode === 'instant'
        ? instant.map(volume => ({ volume, reason: null }))
        : [];

  let status = '';
  if (current?.state === 'loading') status = search.finding(text);
  else if (current?.state === 'failed') status = current.message;
  else if (mode === 'answer') status = search.results(text);
  else if (mode === 'none') status = search.noMatch;
  else if (mode === 'instant') status = search.instant(instant.length, text);
  else if (queryTokens(text).length > 0) status = search.hint(text);
  else if (prompted && !text) status = search.empty;

  function setQuery(value: string) {
    setQueryState(value);
    setPrompted(false);
  }

  function clear() {
    abortRef.current?.abort();
    setQueryState('');
    setAsked(null);
    setPrompted(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text) {
      setPrompted(true);
      inputRef.current?.focus();
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setAsked({ state: 'loading', query: text });
    try {
      const outcome = await fetchMatch(text, controller.signal);
      if (controller.signal.aborted) return;
      if (!outcome.ok) {
        setAsked({ state: 'failed', query: text, message: outcome.message });
        return;
      }
      const answered: Asked = {
        state: 'answered',
        query: text,
        answer: outcome.answer,
      };
      const best = outcome.answer.matches.find(match => bySlug.has(match.slug));
      if (best) onAnswer(best.slug, () => setAsked(answered));
      else setAsked(answered);
    } catch {
      // Aborted by a newer search or by clearing it.
    }
  }

  return {
    query,
    text,
    setQuery,
    clear,
    submit,
    mode,
    matches,
    status,
    loading: current?.state === 'loading',
    failed: current?.state === 'failed',
    inputRef,
  };
}

export type CollectionSearchState<T extends SearchVolume> = ReturnType<
  typeof useCollectionSearch<T>
>;
