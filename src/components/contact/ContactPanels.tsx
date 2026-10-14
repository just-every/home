'use client';

import { useRef, useState } from 'react';

import ui from '@/components/landing/label.module.css';
import { routes } from '@/content/contact';

import styles from './contact.module.css';
import { ContactForm } from './ContactForm';
import type { ContactFormHandle } from './ContactForm';
import { GithubIcon, MailIcon, SproutIcon } from './icons';
import type { Topic } from './types';

const arrow = (
  <span className={ui.arrow} aria-hidden="true">
    →
  </span>
);

/**
 * The form and the three routes beside it. Questions and bugs leaves for
 * GitHub; Makers and Everything else bring the visitor to the form, the
 * first with its maker topic set.
 */
export function ContactPanels() {
  const [topic, setTopic] = useState<Topic>('general');
  const form = useRef<ContactFormHandle>(null);

  function writeTo(next: Topic) {
    setTopic(next);
    form.current?.focus(next);
  }

  return (
    <div className={styles.panels}>
      <ContactForm ref={form} topic={topic} onTopic={setTopic} />
      <div className={styles.routes} role="group" aria-label={routes.label}>
        <article className={`${styles.route} ${styles.bugs}`}>
          <span className={styles.routeIcon} aria-hidden="true">
            <GithubIcon />
          </span>
          <div className={styles.routeText}>
            <h2>{routes.bugs.heading}</h2>
            <p>{routes.bugs.line}</p>
          </div>
          <a
            className={`${ui.under} ${styles.routeLink}`}
            href={routes.bugs.href}
          >
            <span>
              {routes.bugs.link} {arrow}
            </span>
          </a>
        </article>
        <article className={`${styles.route} ${styles.makers}`}>
          <span className={styles.routeIcon} aria-hidden="true">
            <SproutIcon />
          </span>
          <div className={styles.routeText}>
            <h2>{routes.makers.heading}</h2>
            <p>{routes.makers.line}</p>
          </div>
          <button
            className={`${ui.under} ${styles.routeLink}`}
            type="button"
            onClick={() => writeTo('maker')}
          >
            <span>
              {routes.makers.link} {arrow}
            </span>
          </button>
        </article>
        <article className={`${styles.route} ${styles.other}`}>
          <span className={styles.routeIcon} aria-hidden="true">
            <MailIcon />
          </span>
          <div className={styles.routeText}>
            <h2>{routes.other.heading}</h2>
            <p>{routes.other.line}</p>
          </div>
          <button
            className={`${ui.under} ${styles.routeLink}`}
            type="button"
            onClick={() => writeTo('general')}
          >
            <span>
              {routes.other.link} {arrow}
            </span>
          </button>
        </article>
      </div>
    </div>
  );
}
