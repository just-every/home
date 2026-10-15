'use client';

import { useRef, useState, type MouseEvent } from 'react';

import ui from '@/components/landing/label.module.css';
import { track, X_EVENTS } from '@/lib/x-pixel';

import { Features } from './Features';
import { notes } from './font';
import styles from './hero-e.module.css';
import { NoteArrow, Rays, TransferArrow } from './icons';
import { RentCard } from './RentCard';
import { SwitchCard } from './SwitchCard';
import type { RentedTool } from './tools';

/**
 * Hero variant E (12ui design E): "Stop renting your software. Make the
 * switch." over two tables, the tools a visitor rents and the seeds that
 * replace them. Picking a rented tool highlights its seed, and the button
 * under the tables becomes "Switch to <Seed> →", a link to that seed's panel
 * (#vol-<slug>, which the collection opens). Takes no props, so the A/B
 * integration can register it as variant "e".
 */
export default function HeroE() {
  const [picked, setPicked] = useState<RentedTool | null>(null);
  const firstRef = useRef<HTMLButtonElement>(null);

  const pick = (tool: RentedTool) => {
    setPicked(tool);
    track(X_EVENTS.contentView, {
      content_name: tool.volume.name,
      content_type: 'hero-pick',
    });
  };

  // Before a pick, the button takes the visitor to the list to pick from.
  const toList = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const first = firstRef.current;
    if (!first) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches;
    first.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block: 'center',
    });
    first.focus({ preventScroll: true });
  };

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-e-heading"
      data-hero="e"
    >
      <div className={`${ui.wrap} ${styles.rule}`} aria-hidden="true" />
      <div className={styles.canvas}>
        <div className={styles.intro}>
          <h1 id="hero-e-heading">
            Stop renting your software. <span>Make the switch.</span>
          </h1>
          <p>
            <span>
              Free, open-source alternatives to the tools your team already
              uses.
            </span>{' '}
            <span>Run them yourself and own the code.</span>
          </p>
        </div>

        <div className={styles.comparison}>
          <aside
            className={`${styles.note} ${styles.leftNote} ${notes.className}`}
          >
            <p>
              <span>Tired of</span> <span>paying</span> <span>per seat?</span>
            </p>
            <NoteArrow className={styles.noteArrow} side="left" />
          </aside>
          <RentCard picked={picked} onPick={pick} firstRef={firstRef} />
          <TransferArrow
            className={`${styles.transfer} ${picked ? styles.go : ''}`}
          />
          <aside
            className={`${styles.note} ${styles.rightNote} ${notes.className}`}
          >
            <p>
              <span>Same jobs.</span> <span>Open source</span>{' '}
              <span>versions you own.</span>
            </p>
            <NoteArrow className={styles.noteArrow} side="right" />
          </aside>
          <SwitchCard picked={picked} />
          <Rays className={styles.rays} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.plant}
            src="/hero-variants/e/plant.webp"
            alt=""
            aria-hidden="true"
            width={250}
            height={315}
            decoding="async"
          />
        </div>

        <a
          className={styles.cta}
          href={picked ? picked.volume.href : '#hero-e-rent'}
          onClick={picked ? undefined : toList}
        >
          <span>
            {picked
              ? `Switch to ${picked.volume.name}`
              : 'Pick a tool to replace'}
          </span>
          <span aria-hidden="true">→</span>
        </a>
        <p className={styles.srOnly} aria-live="polite">
          {picked ? `${picked.volume.name} replaces ${picked.name}.` : ''}
        </p>

        <Features />
      </div>
    </section>
  );
}
