'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  readTokenSnapshot,
  tokensAt,
  TOKENS_EXPLAINED,
  type TokenSnapshot,
} from '@/lib/tokens';

import styles from './footer.module.css';

const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
/** A few updates a second while the count is live. */
const LIVE_MS = 200;
/** With reduced motion the number is redrawn, not animated, twice a minute. */
const STILL_MS = 30_000;

/**
 * "Made with N tokens": the newest measurement from /api/tokens, counting on
 * at its measured rate. Nothing shows until a real measurement arrives, and
 * nothing shows if there is none; the line keeps its height either way.
 */
export function TokenCount() {
  const [snapshot, setSnapshot] = useState<TokenSnapshot | null>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const request = new AbortController();
    fetch('/api/tokens', { signal: request.signal })
      .then(response => (response.ok ? response.json() : null))
      .then(body => setSnapshot(readTokenSnapshot(body)))
      .catch(() => {
        if (!request.signal.aborted) setSnapshot(null);
      });
    return () => request.abort();
  }, []);

  // Writes the text node directly: no React render per tick.
  useLayoutEffect(() => {
    const node = count.current;
    if (!snapshot || !node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    const draw = () => {
      node.textContent = digits.format(tokensAt(snapshot, Date.now()));
    };
    const schedule = () => {
      window.clearInterval(timer);
      timer = undefined;
      draw();
      if (!document.hidden) {
        timer = window.setInterval(draw, reduced.matches ? STILL_MS : LIVE_MS);
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, [snapshot]);

  if (!snapshot) return <p className={styles.tokens} aria-hidden="true" />;
  return (
    <p className={styles.tokens} title={TOKENS_EXPLAINED} aria-live="off">
      Made with <span ref={count} /> tokens
      <span className={styles.hidden}>. {TOKENS_EXPLAINED}</span>
    </p>
  );
}
