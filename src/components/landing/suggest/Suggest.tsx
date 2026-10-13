'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { suggest } from '@/content/landing';
import {
  SUGGEST_EMAIL_MAX,
  SUGGEST_NOTE_MAX,
  SUGGEST_PRODUCT_MAX,
} from '@/lib/interactive-api';
import type { ApiErrorBody } from '@/lib/interactive-api';

import ui from '../label.module.css';
import { onSuggestionRequest } from './prefill';
import styles from './suggest.module.css';

const empty = { product: '', note: '', email: '' };

/**
 * "What should we build next?": stores a suggestion through /api/suggest.
 * The search's no-match state fills the product field from here.
 */
export function Suggest() {
  const [fields, setFields] = useState(empty);
  const [state, setState] = useState<'editing' | 'sending' | 'sent'>('editing');
  const [error, setError] = useState('');
  const productRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  useEffect(
    () =>
      onSuggestionRequest(product => {
        setFields({ ...empty, product: product.slice(0, SUGGEST_PRODUCT_MAX) });
        setError('');
        setState('editing');
        // The link's own jump scrolls the section into view.
        requestAnimationFrame(() =>
          productRef.current?.focus({ preventScroll: true })
        );
      }),
    []
  );

  useEffect(() => {
    if (state === 'sent') thanksRef.current?.focus();
  }, [state]);

  const set =
    (name: keyof typeof empty) => (event: { target: { value: string } }) =>
      setFields(current => ({ ...current, [name]: event.target.value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    if (!event.currentTarget.reportValidity()) return;
    setState('sending');
    setError('');
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          website: trapRef.current?.value ?? '',
        }),
      });
      if (response.ok) {
        setFields(empty);
        setState('sent');
        return;
      }
      const body = (await response
        .json()
        .catch(() => null)) as ApiErrorBody | null;
      setError(body?.error.message ?? suggest.network);
    } catch {
      setError(suggest.network);
    }
    setState('editing');
  }

  return (
    <section
      className={styles.suggest}
      id={suggest.id}
      aria-labelledby="label-suggest-heading"
    >
      <div className={styles.copy}>
        <p className={ui.eyebrow}>{suggest.eyebrow}</p>
        <h2 className={styles.heading} id="label-suggest-heading">
          {suggest.heading}
        </h2>
        <p className={styles.text}>{suggest.line}</p>
      </div>
      {state === 'sent' ? (
        <div className={styles.sent}>
          <p className={styles.thanks} ref={thanksRef} tabIndex={-1}>
            {suggest.success}
          </p>
          <button
            className={`${ui.under} ${styles.again}`}
            type="button"
            onClick={() => {
              setState('editing');
              requestAnimationFrame(() => productRef.current?.focus());
            }}
          >
            <span>{suggest.another}</span>
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="suggest-product">
              {suggest.productLabel}
            </label>
            <input
              ref={productRef}
              id="suggest-product"
              className={styles.input}
              name="product"
              value={fields.product}
              onChange={set('product')}
              placeholder={suggest.productPlaceholder}
              maxLength={SUGGEST_PRODUCT_MAX}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="suggest-note">
              {suggest.noteLabel}{' '}
              <span className={styles.optional}>{suggest.optional}</span>
            </label>
            <textarea
              id="suggest-note"
              className={`${styles.input} ${styles.note}`}
              name="note"
              value={fields.note}
              onChange={set('note')}
              maxLength={SUGGEST_NOTE_MAX}
              rows={3}
            />
          </div>
          <div className={styles.last}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="suggest-email">
                {suggest.emailLabel}
              </label>
              <input
                id="suggest-email"
                className={styles.input}
                type="email"
                name="email"
                value={fields.email}
                onChange={set('email')}
                maxLength={SUGGEST_EMAIL_MAX}
                autoComplete="email"
                aria-describedby="suggest-email-hint"
              />
              <p className={styles.hint} id="suggest-email-hint">
                {suggest.emailHint}
              </p>
            </div>
            <button
              className={`${ui.pill} ${styles.submit}`}
              type="submit"
              aria-busy={state === 'sending'}
            >
              {state === 'sending' ? suggest.busy : suggest.button}{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </button>
          </div>
          {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
          <div className={styles.trap} aria-hidden="true">
            <label htmlFor="suggest-website">Website</label>
            <input
              ref={trapRef}
              id="suggest-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <p className={styles.error} role="alert">
            {error}
          </p>
        </form>
      )}
    </section>
  );
}
