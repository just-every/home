'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import styles from './StandRun.module.css';

/** Copies the run commands; the icon confirms for a moment. */
export function CopyCommands({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.copy}
      onClick={copy}
      aria-label={copied ? 'Copied the commands' : 'Copy the commands'}
    >
      {copied ? (
        <Check className={styles.copyIcon} aria-hidden="true" />
      ) : (
        <Copy className={styles.copyIcon} aria-hidden="true" />
      )}
    </button>
  );
}
