'use client';

import { useEffect } from 'react';

import { track, X_EVENTS } from '@/lib/x-pixel';

const REPO = /^https?:\/\/github\.com\/just-every\/([^/?#]+)/i;

/**
 * Reports a click on any link to a just-every GitHub repository to the X
 * pixel, wherever on the site the link is.
 */
export function GithubClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      const repo = link
        ? REPO.exec((link as HTMLAnchorElement).href)?.[1]
        : undefined;
      if (repo) track(X_EVENTS.githubClick, { content_name: repo });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
