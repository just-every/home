'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { footer } from '@/content/landing';
import {
  readTokenSnapshot,
  tokensAt,
  TOKENS_EXPLAINED,
  type TokenSnapshot,
} from '@/lib/tokens';

import ui from './label.module.css';
import styles from './footer.module.css';

const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
/** A few updates a second while the count is live. */
const LIVE_MS = 200;
/** With reduced motion the number is redrawn, not animated, twice a minute. */
const STILL_MS = 30_000;

/**
 * The footer's one line: "Made with care and N tokens.", N being the newest
 * measurement from /api/tokens counting on at its measured rate. Until a real
 * measurement arrives, and whenever there is none or the API fails, the line
 * says the same without a number.
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

  if (!snapshot) return <p className={styles.line}>{footer.line}</p>;
  return (
    <p className={styles.line} title={TOKENS_EXPLAINED} aria-live="off">
      {footer.tokensBefore}
      <span ref={count} className={styles.count} />
      {footer.tokensAfter}
      <span className={ui.srOnly}> {TOKENS_EXPLAINED}</span>
    </p>
  );
}
