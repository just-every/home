'use client';

import type { MouseEvent, ReactNode } from 'react';

import { switcherId } from './Switcher';

/**
 * "Pick a tool to replace": brings the card into view (at once with reduced
 * motion) and puts keyboard focus on the picked tool, so arrow keys and
 * typing pick from there.
 */
export function PickLink({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = document.getElementById(switcherId);
    const radio = card?.querySelector<HTMLElement>('[aria-checked="true"]');
    if (!card || !radio) return;
    event.preventDefault();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    radio.focus({ preventScroll: true });
    card.scrollIntoView({
      behavior: still ? 'instant' : 'smooth',
      block: 'nearest',
    });
  };
  return (
    <a className={className} href={`#${switcherId}`} onClick={onClick}>
      {children}
    </a>
  );
}
