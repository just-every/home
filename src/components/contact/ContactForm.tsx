'use client';

import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { FormEvent, Ref } from 'react';

import ui from '@/components/landing/label.module.css';
import { form as copy } from '@/content/contact';
import {
  CONTACT_MESSAGE_MAX,
  CONTACT_NAME_MAX,
  SUGGEST_EMAIL_MAX,
} from '@/lib/interactive-api';
import type { ApiErrorBody } from '@/lib/interactive-api';
import { conversionId, track, X_EVENTS } from '@/lib/x-pixel';

import styles from './contact.module.css';
import type { Topic } from './types';

export interface ContactFormHandle {
  /** Bring the visitor to the form: the message for a maker, else the name. */
  focus(topic: Topic): void;
}

const empty = { name: '', email: '', message: '' };

type FieldErrors = { email?: string; message?: string };

/**
 * The contact form: stores a message through /api/contact. The page's route
 * cards set the topic and focus the form through its handle.
 */
export function ContactForm({
  ref,
  topic,
  onTopic,
}: {
  ref: Ref<ContactFormHandle>;
  topic: Topic;
  onTopic: (topic: Topic) => void;
}) {
  const [fields, setFields] = useState(empty);
  const [state, setState] = useState<'editing' | 'sending' | 'sent'>('editing');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<FieldErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  useImperativeHandle(ref, () => ({
    focus(next) {
      setState(current => (current === 'sending' ? current : 'editing'));
      requestAnimationFrame(() =>
        (next === 'maker' ? messageRef : nameRef).current?.focus()
      );
    },
  }));

  useEffect(() => {
    if (state === 'sent') thanksRef.current?.focus();
  }, [state]);

  const set =
    (name: keyof typeof empty) => (event: { target: { value: string } }) => {
      setFields(current => ({ ...current, [name]: event.target.value }));
      if (name !== 'name')
        setInvalid(current => ({ ...current, [name]: undefined }));
    };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const found: FieldErrors = {};
    if (!fields.email.trim()) found.email = copy.emailMissing;
    else if (emailRef.current && !emailRef.current.validity.valid)
      found.email = copy.emailInvalid;
    if (!fields.message.trim()) found.message = copy.messageMissing;
    setInvalid(found);
    if (found.email || found.message) {
      (found.email ? emailRef : messageRef).current?.focus();
      return;
    }
    setState('sending');
    setError('');
    const id = conversionId();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          topic,
          conversion_id: id,
          website: trapRef.current?.value ?? '',
        }),
      });
      if (response.ok) {
        track(X_EVENTS.contactSent, { conversion_id: id });
        setFields(empty);
        onTopic('general');
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
          failure || response.status >= 500 ? copy.unavailable : copy.network
        );
      }
    } catch {
      setError(copy.network);
    }
    setState('editing');
  }

  return (
    <section
      className={`${ui.card} ${styles.formCard}`}
      id={copy.id}
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading">{copy.heading}</h2>
      {state === 'sent' ? (
        <div className={styles.sent}>
          <p className={styles.thanks} ref={thanksRef} tabIndex={-1}>
            {copy.success}
          </p>
          <button
            className={`${ui.under} ${styles.again}`}
            type="button"
            onClick={() => {
              setState('editing');
              requestAnimationFrame(() => nameRef.current?.focus());
            }}
          >
            <span>{copy.another}</span>
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-name">
              {copy.nameLabel}{' '}
              <span className={styles.optional}>{copy.optional}</span>
            </label>
            <input
              ref={nameRef}
              id="contact-name"
              className={styles.input}
              name="name"
              value={fields.name}
              onChange={set('name')}
              placeholder={copy.namePlaceholder}
              maxLength={CONTACT_NAME_MAX}
              autoComplete="name"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-email">
              {copy.emailLabel}
            </label>
            <input
              ref={emailRef}
              id="contact-email"
              className={styles.input}
              type="email"
              name="email"
              value={fields.email}
              onChange={set('email')}
              placeholder={copy.emailPlaceholder}
              maxLength={SUGGEST_EMAIL_MAX}
              autoComplete="email"
              required
              aria-invalid={invalid.email ? true : undefined}
              aria-describedby="contact-email-hint"
            />
            <p
              className={invalid.email ? styles.fieldError : styles.hint}
              id="contact-email-hint"
            >
              {invalid.email ?? copy.emailHint}
            </p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-message">
              {copy.messageLabel}
            </label>
            {topic === 'maker' ? (
              <p className={styles.chipRow}>
                <span className={styles.chip}>
                  {copy.topicChip}
                  <button
                    className={styles.chipRemove}
                    type="button"
                    aria-label={copy.topicRemove}
                    onClick={() => {
                      onTopic('general');
                      messageRef.current?.focus();
                    }}
                  >
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="m2.5 2.5 7 7m0-7-7 7" />
                    </svg>
                  </button>
                </span>
              </p>
            ) : null}
            <textarea
              ref={messageRef}
              id="contact-message"
              className={`${styles.input} ${styles.message}`}
              name="message"
              value={fields.message}
              onChange={set('message')}
              placeholder={copy.placeholder[topic]}
              maxLength={CONTACT_MESSAGE_MAX}
              rows={5}
              required
              aria-invalid={invalid.message ? true : undefined}
              aria-describedby={
                invalid.message ? 'contact-message-error' : undefined
              }
            />
            {invalid.message ? (
              <p className={styles.fieldError} id="contact-message-error">
                {invalid.message}
              </p>
            ) : null}
          </div>
          <div className={styles.actions}>
            <button
              className={`${ui.pill} ${ui.pillSmall} ${styles.submit}`}
              type="submit"
              aria-busy={state === 'sending'}
            >
              {state === 'sending' ? copy.busy : copy.button}{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </button>
          </div>
          {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
          <div className={styles.trap} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              ref={trapRef}
              id="contact-website"
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
          <p className={styles.smallPrint}>{copy.smallPrint}</p>
        </form>
      )}
    </section>
  );
}
