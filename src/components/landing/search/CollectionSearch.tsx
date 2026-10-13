'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { flushSync } from 'react-dom';

import { search } from '@/content/landing';
import { QUERY_MAX } from '@/lib/interactive-api';
import type { MatchResponse } from '@/lib/interactive-api';

import ui from '../label.module.css';
import { requestSuggestion } from '../suggest/prefill';
import { fetchMatch } from './fetchMatch';
import {
  indexVolumes,
  localMatches,
  namedReplace,
  queryTokens,
} from './localMatch';
import type { SearchVolume } from './localMatch';
import { ResultCard } from './ResultCard';
import styles from './search.module.css';

interface CollectionSearchProps {
  volumes: SearchVolume[];
  /** The full collection, shown whenever nothing is filtering it. */
  children: ReactNode;
}

type Asked =
  | { state: 'loading'; query: string }
  | { state: 'answered'; query: string; answer: MatchResponse }
  | { state: 'failed'; query: string; message: string };

const inputId = 'collection-search';
const statusId = 'collection-search-status';

/**
 * "What do you use today?": typing filters the volumes on the page with no
 * network; the button asks /api/match, where Claude picks the best one to
 * three with a reason each.
 */
export function CollectionSearch({ volumes, children }: CollectionSearchProps) {
  const [query, setQuery] = useState('');
  const [asked, setAsked] = useState<Asked | null>(null);
  const [narrow, setNarrow] = useState(false);
  // The button was pressed with nothing typed.
  const [prompted, setPrompted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Phones get the shorter placeholder, which fits their field uncut.
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 599px)');
    const update = () => setNarrow(phone.matches);
    update();
    phone.addEventListener('change', update);
    return () => phone.removeEventListener('change', update);
  }, []);

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

  const mode: 'all' | 'instant' | 'answer' | 'none' = answer
    ? answer.matches.length > 0
      ? 'answer'
      : 'none'
    : instant.length > 0
      ? 'instant'
      : 'all';
  const filtering = mode === 'answer' || mode === 'instant';

  const results =
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
  const failed = current?.state === 'failed';

  function clear() {
    abortRef.current?.abort();
    setQuery('');
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
      setAsked(
        outcome.ok
          ? { state: 'answered', query: text, answer: outcome.answer }
          : { state: 'failed', query: text, message: outcome.message }
      );
    } catch {
      // Aborted by a newer search or by clearing it.
    }
  }

  // A jump to a volume card (the hero's shelf: its links, or its canvas
  // setting the hash) shows the whole collection first, so the card it
  // points at is there to scroll to.
  useEffect(() => {
    if (!filtering) return;
    const showAll = () =>
      flushSync(() => {
        abortRef.current?.abort();
        setQuery('');
        setAsked(null);
      });
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="#vol-"]'
      );
      if (link) showAll();
    };
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith('vol-')) return;
      showAll();
      document.getElementById(id)?.scrollIntoView();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHash);
    };
  }, [filtering]);

  return (
    <>
      <form className={styles.search} role="search" onSubmit={submit}>
        <label className={styles.label} htmlFor={inputId}>
          {search.label}
        </label>
        <div className={styles.bar}>
          <div className={styles.field}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
            <input
              ref={inputRef}
              id={inputId}
              className={styles.input}
              type="search"
              name="q"
              value={query}
              onChange={event => {
                setQuery(event.target.value);
                setPrompted(false);
              }}
              onKeyDown={event => {
                if (event.key === 'Escape' && query) {
                  event.preventDefault();
                  clear();
                }
              }}
              placeholder={
                narrow ? search.placeholderShort : search.placeholder
              }
              maxLength={QUERY_MAX}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-describedby={statusId}
            />
          </div>
          <button
            className={`${ui.pill} ${ui.pillSmall} ${styles.submit}`}
            type="submit"
            aria-busy={current?.state === 'loading'}
          >
            {current?.state === 'loading' ? search.busy : search.button}{' '}
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <div className={styles.statusRow}>
          <p
            id={statusId}
            className={
              failed
                ? styles.error
                : mode === 'none'
                  ? styles.none
                  : styles.status
            }
            role="status"
          >
            {failed ? (
              <svg
                className={styles.alert}
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="10" cy="10" r="8.25" />
                <path d="M10 5.75v5.5M10 14.1v.15" />
              </svg>
            ) : null}
            {status}
          </p>
          {mode === 'none' ? (
            <a
              className={`${ui.under} ${styles.action}`}
              href="#suggest"
              onClick={() => requestSuggestion(text)}
            >
              <span>{search.suggestIt}</span>
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ) : filtering ? (
            <button
              className={`${ui.under} ${styles.action}`}
              type="button"
              onClick={() => {
                clear();
                inputRef.current?.focus();
              }}
            >
              <span>{search.showAll}</span>
            </button>
          ) : null}
        </div>
      </form>
      {filtering ? (
        <>
          <ol className={styles.results}>
            {results.map(({ volume, reason }) => (
              <ResultCard
                key={volume.slug}
                volume={volume}
                replaces={namedReplace(volume, text)}
                reason={reason}
              />
            ))}
          </ol>
          {mode === 'answer' ? (
            <p className={styles.credit}>{search.credit}</p>
          ) : null}
        </>
      ) : null}
      <div hidden={filtering}>{children}</div>
    </>
  );
}
