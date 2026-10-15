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
import { conversionId, track, X_EVENTS } from '@/lib/x-pixel';

import ui from '../label.module.css';
import { onSuggestionRequest } from './prefill';
import styles from './suggest.module.css';

const empty = { product: '', note: '', email: '' };

type FieldErrors = { product?: string; email?: string };

/**
 * "What should we build next?": stores a suggestion through /api/suggest.
 * The search's no-match state fills the product field from here.
 */
export function Suggest() {
  const [fields, setFields] = useState(empty);
  const [state, setState] = useState<'editing' | 'sending' | 'sent'>('editing');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<FieldErrors>({});
  const productRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  useEffect(
    () =>
      onSuggestionRequest(product => {
        setFields({ ...empty, product: product.slice(0, SUGGEST_PRODUCT_MAX) });
        setError('');
        setInvalid({});
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
    (name: keyof typeof empty) => (event: { target: { value: string } }) => {
      setFields(current => ({ ...current, [name]: event.target.value }));
      if (name !== 'note')
        setInvalid(current => ({ ...current, [name]: undefined }));
    };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const found: FieldErrors = {};
    if (!fields.product.trim()) found.product = suggest.productMissing;
    if (emailRef.current && !emailRef.current.validity.valid) {
      found.email = suggest.emailInvalid;
    }
    setInvalid(found);
    if (found.product || found.email) {
      (found.product ? productRef : emailRef).current?.focus();
      return;
    }
    setState('sending');
    setError('');
    const id = conversionId();
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          conversion_id: id,
          website: trapRef.current?.value ?? '',
        }),
      });
      if (response.ok) {
        track(X_EVENTS.suggestionSent, { conversion_id: id });
        setFields(empty);
        setState('sent');
        return;
      }
      const body = (await response
        .json()
        .catch(() => null)) as ApiErrorBody | null;
      // The server's words for a bad field or the rate limit; plain copy
      // for anything on our side.
      const failure = body?.error;
      if (
        failure?.code === 'invalid_request' ||
        failure?.code === 'rate_limited'
      ) {
        setError(failure.message);
      } else {
        setError(
          failure || response.status >= 500
            ? suggest.unavailable
            : suggest.network
        );
      }
    } catch {
      setError(suggest.network);
    }
    setState('editing');
  }

  return (
    <section
      className={`${ui.card} ${styles.suggest}`}
      id={suggest.id}
      aria-labelledby="label-suggest-heading"
    >
      <div>
        <p className={ui.eyebrow}>{suggest.eyebrow}</p>
        <h2 className={ui.h3} id="label-suggest-heading">
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
        <form className={styles.form} onSubmit={submit} noValidate>
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
              aria-invalid={invalid.product ? true : undefined}
              aria-describedby={
                invalid.product ? 'suggest-product-error' : undefined
              }
            />
            {invalid.product ? (
              <p className={styles.fieldError} id="suggest-product-error">
                {invalid.product}
              </p>
            ) : null}
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
                ref={emailRef}
                id="suggest-email"
                className={styles.input}
                type="email"
                name="email"
                value={fields.email}
                onChange={set('email')}
                maxLength={SUGGEST_EMAIL_MAX}
                autoComplete="email"
                aria-invalid={invalid.email ? true : undefined}
                aria-describedby="suggest-email-hint"
              />
              <p
                className={invalid.email ? styles.fieldError : styles.hint}
                id="suggest-email-hint"
              >
                {invalid.email ?? suggest.emailHint}
              </p>
            </div>
            <button
              className={`${ui.pill} ${ui.pillSmall} ${styles.submit}`}
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
            {error ? (
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
            {error}
          </p>
        </form>
      )}
    </section>
  );
}
