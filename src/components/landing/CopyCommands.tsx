'use client';

import { useState } from 'react';

import { track, X_EVENTS } from '@/lib/x-pixel';

import styles from './panels.module.css';

/** Copies the run-one commands, one per line. */
export function CopyCommands({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    track(X_EVENTS.commandCopied);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy}>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
