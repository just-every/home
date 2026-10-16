'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { recordView } from '@/lib/usage-client';

/** The path last recorded, so a re-run effect does not count it twice. */
let recorded: string | null = null;

/** Records each page view in the usage log: on load and on each new path. */
export function PageViews() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === recorded) return;
    recorded = pathname;
    recordView();
  }, [pathname]);
  return null;
}
