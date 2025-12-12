'use client';

import { useCallback } from 'react';

type PrimaryCTAProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function PrimaryCTA({ href, className, children }: PrimaryCTAProps) {
  const triggerSpool = useCallback(() => {
    window.dispatchEvent(new CustomEvent('warpfield:spool'));
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={triggerSpool}
      onFocus={triggerSpool}
      className={className}
    >
      {children}
    </a>
  );
}
