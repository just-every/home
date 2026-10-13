'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { runOne } from '@/content/landing';

import styles from './bottom.module.css';
import shared from './page.module.css';

export function RunOne() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    navigator.clipboard
      ?.writeText(runOne.commands.join('\n'))
      .then(() => setCopied(true))
      .catch(() => {});
  };

  return (
    <article
      id="run"
      className={`${styles.panel} ${styles.run}`}
      aria-labelledby="objects-run-title"
    >
      <h2 id="objects-run-title" className={styles.title}>
        {runOne.heading}
      </h2>
      <p className={styles.line}>{runOne.line}</p>
      <div className={styles.terminal}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button
          type="button"
          className={styles.copy}
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy the commands'}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </button>
        <pre className={styles.code}>
          <code>
            {runOne.commands.map(command => (
              <span key={command} className={styles.command}>
                <span className={styles.prompt} aria-hidden="true">
                  ${' '}
                </span>
                {command}
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <p className={`${shared.note} ${styles.runNote}`} aria-hidden="true">
        {/* Quotes the answer to "Free? What's the catch?" */}
        Take it, run it,
        <br />
        change it.
        <svg viewBox="0 0 80 50" className={styles.runArrow}>
          <path d="M70 4C66 26 46 40 10 40" />
          <path d="M20 31 9 40l12 7" />
        </svg>
      </p>
      <p className={styles.after}>{runOne.afterLine}</p>
      <p className={styles.alt}>
        {runOne.altLine.before} <code>{runOne.altLine.command}</code>{' '}
        {runOne.altLine.after}
      </p>
      <p className={styles.status} role="status">
        {copied ? 'Commands copied' : ''}
      </p>
    </article>
  );
}
