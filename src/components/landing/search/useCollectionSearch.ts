'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { search } from '@/content/landing';
import type { MatchResponse } from '@/lib/interactive-api';
import { track, X_EVENTS } from '@/lib/x-pixel';

import { fetchMatch } from './fetchMatch';
import { indexVolumes, localMatches, queryTokens } from './localMatch';
import type { SearchVolume } from './localMatch';

/** How long typing rests before the query counts as searched. */
const SETTLE_MS = 1500;

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
  const reportedRef = useRef('');
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

  // Only picks the collection has count: an answer of unknown slugs is none.
  const picks: SearchMatch<T>[] = answer
    ? answer.matches.flatMap(match => {
        const volume = bySlug.get(match.slug);
        return volume ? [{ volume, reason: match.reason }] : [];
      })
    : [];

  const mode: SearchMode = answer
    ? picks.length > 0
      ? 'answer'
      : 'none'
    : instant.length > 0
      ? 'instant'
      : 'all';

  const matches: SearchMatch<T>[] =
    mode === 'answer'
      ? picks
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

  // One pixel event per query: when it is submitted, or when typing settles
  // on it, whichever comes first.
  function report(query: string) {
    if (reportedRef.current === query) return;
    reportedRef.current = query;
    track(X_EVENTS.search, { search_string: query });
  }

  useEffect(() => {
    if (queryTokens(text).length === 0) return;
    const timer = window.setTimeout(() => report(text), SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [text]);

  function setQuery(value: string) {
    setQueryState(value);
    setPrompted(false);
  }

  function clear() {
    abortRef.current?.abort();
    setQueryState('');
    setAsked(null);
    setPrompted(false);
    reportedRef.current = '';
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text) {
      setPrompted(true);
      inputRef.current?.focus();
      return;
    }
    report(text);
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
