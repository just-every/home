'use client';

import { useEffect, useState } from 'react';

import { search } from '@/content/landing';
import { QUERY_MAX } from '@/lib/interactive-api';

import ui from '../label.module.css';
import { requestSuggestion } from '../suggest/prefill';
import type { SearchVolume } from './localMatch';
import styles from './search.module.css';
import type { CollectionSearchState } from './useCollectionSearch';

const inputId = 'collection-search';
const statusId = 'collection-search-status';

/** The field, its button and one honest status line. */
export function SearchForm<T extends SearchVolume>({
  state,
}: {
  state: CollectionSearchState<T>;
}) {
  const { query, text, setQuery, clear, submit, mode, status } = state;
  const [narrow, setNarrow] = useState(false);
  const filtering = mode === 'answer' || mode === 'instant';

  // Phones get the shorter placeholder, which fits their field uncut.
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 599px)');
    const update = () => setNarrow(phone.matches);
    update();
    phone.addEventListener('change', update);
    return () => phone.removeEventListener('change', update);
  }, []);

  return (
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
            ref={state.inputRef}
            id={inputId}
            className={styles.input}
            type="search"
            name="q"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Escape' && query) {
                event.preventDefault();
                clear();
              }
            }}
            placeholder={narrow ? search.placeholderShort : search.placeholder}
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
          aria-busy={state.loading}
        >
          {state.loading ? search.busy : search.button}{' '}
          <span className={ui.arrow} aria-hidden="true">
            →
          </span>
        </button>
      </div>
      <div className={styles.statusRow}>
        <p
          id={statusId}
          className={
            state.failed
              ? styles.error
              : mode === 'none'
                ? styles.none
                : styles.status
          }
          role="status"
        >
          {state.failed ? (
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
              state.inputRef.current?.focus();
            }}
          >
            <span>{search.showAll}</span>
          </button>
        ) : null}
      </div>
    </form>
  );
}
