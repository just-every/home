'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { track, X_EVENTS } from '@/lib/x-pixel';

import { NoteArrowDown, PixelArrow, PixelBurst, Sparkles } from './art';
import styles from './heroB.module.css';
import {
  defaultSlug,
  matchIncumbent,
  ownedFor,
  picks,
  upcomingCount,
} from './picks';
import type { Pick } from './picks';

export const switcherId = 'hero-b-switch';

const steps = ['Choose', 'Switch', 'Own'];

/** How long typed letters keep adding to one type-ahead search. */
const TYPE_AHEAD_MS = 800;

/**
 * Arrow keys and typing pick as they go (radio buttons do); the pick is
 * reported once the keys come to rest, not for every tool passed on the way.
 */
const KEY_SETTLE_MS = 700;

/**
 * "Pick your switch": the visitor picks the tool they rent (a radio group,
 * with arrow keys across the two columns and type-ahead), the seed that
 * replaces it lights up under "Yours to own", its line shows under the
 * lists, and the button switches to it (`#vol-<slug>` opens that product's
 * panel and reel further down the page). Each pick that changes the
 * selection sends the pixel's content-view event as a hero pick.
 */
export function Switcher() {
  const [slug, setSlug] = useState(defaultSlug);
  const [step, setStep] = useState(0);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);
  const typed = useRef({ text: '', at: 0 });
  const reported = useRef<string | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(settle.current), []);

  const index = Math.max(
    0,
    picks.findIndex(pick => pick.slug === slug)
  );
  const current = picks[index];
  const owned = ownedFor(current);

  const report = (pick: Pick) => {
    clearTimeout(settle.current);
    if (reported.current === pick.slug) return;
    reported.current = pick.slug;
    track(X_EVENTS.contentView, {
      content_name: pick.name,
      content_type: 'hero-pick',
    });
  };

  /** A click or tap picks and reports at once; keys report on settling. */
  const choose = (pick: Pick, fromKeys = false) => {
    setSlug(pick.slug);
    setStep(1);
    if (!fromKeys) {
      report(pick);
      return;
    }
    radios.current[picks.indexOf(pick)]?.focus();
    clearTimeout(settle.current);
    settle.current = setTimeout(() => report(pick), KEY_SETTLE_MS);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = picks.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index + 2,
      ArrowUp: index - 2,
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      const next = Math.min(last, Math.max(0, moves[event.key]));
      choose(picks[next], true);
      return;
    }
    if (
      event.key.length === 1 &&
      event.key !== ' ' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey
    ) {
      const now = Date.now();
      const text =
        (now - typed.current.at < TYPE_AHEAD_MS ? typed.current.text : '') +
        event.key;
      typed.current = { text, at: now };
      const match = matchIncumbent(text);
      if (match) {
        event.preventDefault();
        choose(match, true);
      }
    }
  };

  return (
    <section
      className={styles.switcher}
      id={switcherId}
      aria-labelledby="hero-b-switch-heading"
    >
      <PixelBurst className={styles.topSpark} />
      <p className={`${styles.annotation} ${styles.topNote}`}>
        <span>From renting to owning.</span>
        <NoteArrowDown className={styles.topNoteArrow} />
      </p>
      <div className={styles.switchHeader}>
        <h2 id="hero-b-switch-heading">Pick your switch</h2>
        <ol className={styles.steps}>
          {steps.map((name, at) => (
            <li
              key={name}
              className={at === step ? styles.stepActive : undefined}
              aria-current={at === step ? 'step' : undefined}
            >
              <b>{String(at + 1).padStart(2, '0')}</b> {name}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.choices}>
        <div className={styles.panel}>
          <h3 id="hero-b-rent">The tool you rent</h3>
          <div
            className={styles.rentGrid}
            role="radiogroup"
            aria-labelledby="hero-b-rent"
            onKeyDown={onKeyDown}
          >
            {picks.map((pick, at) => (
              <button
                key={pick.slug}
                ref={node => {
                  radios.current[at] = node;
                }}
                type="button"
                role="radio"
                aria-checked={at === index}
                tabIndex={at === index ? 0 : -1}
                className={`${styles.tool} ${at === index ? styles.selected : ''}`}
                onClick={() => choose(pick)}
              >
                {pick.incumbent}
              </button>
            ))}
          </div>
          <a className={styles.more} href="#soon">
            + {upcomingCount} coming soon
          </a>
        </div>
        <PixelArrow className={styles.pixelArrow} />
        <div className={`${styles.panel} ${styles.own}`}>
          <h3 id="hero-b-own">Yours to own</h3>
          <ul
            key={current.column}
            className={styles.ownList}
            aria-labelledby="hero-b-own"
          >
            {owned.map(pick => (
              <li key={pick.slug}>
                <button
                  type="button"
                  aria-pressed={pick.slug === slug}
                  className={`${styles.tool} ${pick.slug === slug ? styles.selected : ''}`}
                  onClick={() => choose(pick)}
                >
                  <strong>{pick.name}</strong>{' '}
                  <span>(for {pick.incumbent})</span>
                </button>
              </li>
            ))}
          </ul>
          <a className={styles.more} href="#all">
            + {picks.length - owned.length} more
          </a>
        </div>
      </div>
      <div className={styles.switchFooter}>
        <Sparkles className={styles.sparkles} />
        <p aria-live="polite">
          <span className={styles.visuallyHidden}>
            {current.name}, for {current.incumbent}:{' '}
          </span>
          {current.line}
        </p>
        <a
          className={styles.switchLink}
          href={`#vol-${current.slug}`}
          onClick={() => setStep(2)}
        >
          Switch to {current.name}{' '}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
