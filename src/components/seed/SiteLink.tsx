'use client';

import type { ReactNode } from 'react';

import { track, X_EVENTS } from '@/lib/x-pixel';

/** A seed's own site link; a click is reported to the X pixel. */
export function SiteLink({
  href,
  name,
  className,
  children,
}: {
  href: string;
  name: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => track(X_EVENTS.runSiteClick, { content_name: name })}
    >
      {children}
    </a>
  );
}
