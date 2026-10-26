'use client';

import { useState } from 'react';

import { track, X_EVENTS } from '@/lib/x-pixel';

import styles from './panels.module.css';
import { runCommand } from './runCommand';

/** Copies the run command. */
export function CopyCommands({ target }: { target: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    track(X_EVENTS.commandCopied);
    try {
      await navigator.clipboard.writeText(runCommand(target));
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
