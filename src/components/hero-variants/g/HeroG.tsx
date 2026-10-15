'use client';

import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { useRef, useState } from 'react';

import { cardId, volumes } from '@/components/landing/volumes';
import { upcoming } from '@/data/upcoming';
import { X_EVENTS, track } from '@/lib/x-pixel';

import { countWord } from './count';
import { caveat } from './fonts';
import styles from './hero-g.module.css';
import {
  CodeIcon,
  DocIcon,
  FromArrow,
  LeafIcon,
  Rays,
  SixArrow,
  StartArrow,
  SwitchArrow,
  UpArrow,
} from './sketches';

const STACK_ID = 'hero-g-stack';

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Hero G, "a sketched journey" (12ui design G): the headline, the button
 * and the trust row on the left; on the right the stack a team rents
 * today (each seed's `primaryReplace`), a sketched arrow, and the open
 * source it can own instead (the seeds, with their marks and pastels),
 * with handwritten notes and a watercolour landscape along the foot.
 *
 * The rented stack is the picker: picking a tool highlights it and the
 * seed that replaces it, the button turns into "Switch to <Seed> →" for
 * `#vol-<slug>` (the collection opens that product's panel and reel), and
 * the pick is reported to the X pixel as a hero-pick content view. Every
 * seed row also links straight to its panel.
 */
export default function HeroG() {
  const [picked, setPicked] = useState<string | null>(null);
  const pickers = useRef<(HTMLButtonElement | null)[]>([]);
  const stackRef = useRef<HTMLElement | null>(null);

  const pickedVolume = volumes.find(v => v.slug === picked) ?? null;

  const pick = (slug: string) => {
    if (slug === picked) return;
    setPicked(slug);
    const volume = volumes.find(v => v.slug === slug);
    if (volume) {
      track(X_EVENTS.contentView, {
        content_name: volume.name,
        content_type: 'hero-pick',
      });
    }
  };

  /** Up, down, Home and End move between the rented tools. */
  const onPickerKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = volumes.length - 1;
    const next =
      event.key === 'ArrowDown'
        ? Math.min(i + 1, last)
        : event.key === 'ArrowUp'
          ? Math.max(i - 1, 0)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    pickers.current[next]?.focus();
  };

  /** Before a pick, the button brings the rented stack forward to choose from. */
  const onCta = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pickedVolume) return;
    event.preventDefault();
    const smooth = !reducedMotion();
    stackRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block: 'nearest',
    });
    pickers.current[0]?.focus({ preventScroll: true });
    const stack = stackRef.current;
    if (stack && smooth) {
      stack.classList.remove(styles.nudge);
      // Restart the nudge on every press.
      void stack.offsetWidth;
      stack.classList.add(styles.nudge);
    }
  };

  const live = countWord(volumes.length, true);
  const coming = countWord(upcoming.length);

  return (
    <section
      className={styles.top}
      aria-labelledby="hero-g-heading"
      data-picked={picked ?? undefined}
    >
      <div className={styles.canvas}>
        <div className={styles.intro}>
          <h1 id="hero-g-heading">
            Stop renting <span className={styles.turn}>your software.</span>
          </h1>
          <p className={styles.description}>
            Switch to free, open-source alternatives for the tools your team
            already uses. {live} are out now, with {coming} more on the way. MIT
            licensed, forever yours.
          </p>
          <div className={styles.actionRow}>
            <a
              className={styles.cta}
              href={
                pickedVolume ? `#${cardId(pickedVolume.slug)}` : `#${STACK_ID}`
              }
              onClick={onCta}
            >
              {pickedVolume
                ? `Switch to ${pickedVolume.name}`
                : 'Choose what to replace'}{' '}
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
            <StartArrow className={`${styles.lineArt} ${styles.startArrow}`} />
            <p className={`${caveat.className} ${styles.hand} ${styles.start}`}>
              Start your switch here.
            </p>
          </div>
          <ul className={styles.benefits}>
            <li>
              <LeafIcon />
              <span>
                Free
                <br />
                to use
              </span>
            </li>
            <li>
              <CodeIcon />
              <span>
                Open source
                <br />
                on GitHub
              </span>
            </li>
            <li>
              <DocIcon />
              <span>
                MIT licensed
                <br />
                for everyone
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.comparison}>
          <div className={styles.wash} aria-hidden="true" />
          <p className={`${caveat.className} ${styles.hand} ${styles.from}`}>
            From tools you rent…
          </p>
          <FromArrow className={`${styles.lineArt} ${styles.fromArrow}`} />

          <section
            className={`${styles.panel} ${styles.old}`}
            id={STACK_ID}
            ref={stackRef}
            aria-labelledby="hero-g-stack-heading"
            onAnimationEnd={event =>
              event.currentTarget.classList.remove(styles.nudge)
            }
          >
            <h2 id="hero-g-stack-heading">Your current stack</h2>
            <ul>
              {volumes.map((volume, i) => (
                <li
                  key={volume.slug}
                  style={{ '--pastel': volume.colour } as CSSProperties}
                >
                  <button
                    type="button"
                    ref={el => {
                      pickers.current[i] = el;
                    }}
                    aria-pressed={picked === volume.slug}
                    aria-describedby="hero-g-pick-hint"
                    onClick={() => pick(volume.slug)}
                    onKeyDown={event => onPickerKey(event, i)}
                  >
                    <span>{volume.seed.primaryReplace}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p id="hero-g-pick-hint" className={styles.srOnly}>
              Pick the tool you rent to see what replaces it.
            </p>
          </section>

          <SwitchArrow className={styles.switchArrow} />

          <section
            className={`${styles.panel} ${styles.new}`}
            aria-labelledby="hero-g-own-heading"
          >
            <h2 id="hero-g-own-heading">To open source you own.</h2>
            <ul>
              {volumes.map(volume => {
                const on = picked === volume.slug;
                return (
                  <li
                    key={volume.slug}
                    style={
                      {
                        '--pastel': volume.colour,
                        '--seed-ink': volume.ink,
                      } as CSSProperties
                    }
                  >
                    <a
                      href={`#${cardId(volume.slug)}`}
                      aria-current={on ? 'true' : undefined}
                      data-on={on || undefined}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={volume.mark} alt="" width={20} height={20} />
                      <span className={styles.name}>{volume.name}</span>
                      <span className={styles.go} aria-hidden="true">
                        {on ? (
                          <span className={styles.goWord}>Switch </span>
                        ) : null}
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className={`${caveat.className} ${styles.hand} ${styles.six}`}>
            Plus {coming} more coming soon.
          </p>
          <SixArrow className={`${styles.lineArt} ${styles.sixArrow}`} />
          <Rays className={`${styles.lineArt} ${styles.rays}`} />
          <Rays
            className={`${styles.lineArt} ${styles.rays} ${styles.raysBottom}`}
            short
          />
        </div>

        <p className={`${caveat.className} ${styles.hand} ${styles.closing}`}>
          Own your tools. Change any line.
        </p>
        <UpArrow className={`${styles.lineArt} ${styles.upArrow}`} />
        <p className={`${caveat.className} ${styles.hand} ${styles.different}`}>
          Different tools.
          <br />
          Nothing to renew.
        </p>
      </div>

      <picture className={styles.landscape}>
        <source
          media="(max-width: 1023px)"
          srcSet="/hero-variants/g/landscape-1536.webp"
        />
        <img
          src="/hero-variants/g/landscape-3072.webp"
          alt=""
          width={3072}
          height={420}
          decoding="async"
        />
      </picture>

      <p className={styles.srOnly} aria-live="polite">
        {pickedVolume
          ? `${pickedVolume.seed.primaryReplace} is replaced by ${pickedVolume.name}. Switch to ${pickedVolume.name}.`
          : ''}
      </p>
    </section>
  );
}
