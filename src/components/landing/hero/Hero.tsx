'use client';

import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { benefits, products } from '@/content/landing';
import { heroCopy } from '@/content/meta';
import { volumes } from '@/components/landing/volumes';
import { incumbentPrices } from '@/data/incumbent-prices';
import { upcoming } from '@/data/upcoming';
import { X_EVENTS, track } from '@/lib/x-pixel';

import { caveat } from './fonts';
import styles from './hero.module.css';
import { Leaves } from './Leaves';
import { Lightning } from './Lightning';
import { moreCount, rows } from './order';
import { Rainfall } from './Rainfall';
import { CodeIcon, DocIcon, LeafIcon } from './sketches';
import { SunLayers } from './SunLayers';

/** The page's soft card tints, one per benefit, in order. */
const tints = ['#e9f7f0', '#e8f3ff', '#f1ebff', '#fff8e3'];

const STACK_ID = 'hero-stack';

const CLOUD = '/landing/hero/rain.svg';

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The hero, "a sketched journey" (12ui design G): the headline, the button
 * and the trust row; a curated dozen of the stack a team rents today (each
 * seed's `primaryReplace`, picked in order.ts) under a rain cloud, a
 * sketched arrow, and the open source it can own instead (the seeds, with
 * their marks and pastels, and a quiet "and N more" link to the rest of the
 * collection) in the sun, with handwritten notes and a painted ground along
 * the foot that runs from rain-cooled to sunlit, all under a dusk sky. From
 * 1280px wide the two cards flank the copy as mirror images; narrower
 * screens stack the copy over the two cards. The weather moves, slowly:
 * the cards float, the rain falls (a third of it dollar signs and
 * coins, in the same stream), now and then the wind blows a leaf across,
 * now and then the cloud lights up, the sun's glow breathes and its clouds
 * drift. Only small layers move (Rainfall, Leaves, Lightning, SunLayers), on
 * the compositor, and only while the hero is on screen.
 *
 * The rented stack is the picker: picking a tool highlights it and the
 * seed that replaces it, the button turns into "Switch to <Seed> →" for
 * the seed's own page, `/<slug>`, and the pick is reported as a hero-pick content view. Every seed row also
 * links straight to its page. A click on the switch button or a seed row
 * is the hero's call to action, reported as a hero-switch content view
 * with the seed's slug.
 */
export function Hero() {
  const [picked, setPicked] = useState<string | null>(null);
  const pickers = useRef<(HTMLButtonElement | null)[]>([]);
  const stackRef = useRef<HTMLElement | null>(null);
  const topRef = useRef<HTMLElement | null>(null);

  // The weather only moves while the hero is on screen.
  useEffect(() => {
    const top = topRef.current;
    if (!top || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      top.classList.toggle(styles.paused, !visible);
    });
    observer.observe(top);
    return () => observer.disconnect();
  }, []);

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
    const last = rows.length - 1;
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

  const reportSwitch = (slug: string) =>
    track(X_EVENTS.contentView, {
      content_name: slug,
      content_type: 'hero-switch',
    });

  /** Before a pick, the button brings the rented stack forward to choose from. */
  const onCta = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pickedVolume) {
      reportSwitch(pickedVolume.slug);
      return;
    }
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

  const live = volumes.length;
  const coming = upcoming.length;

  return (
    <section
      ref={topRef}
      className={styles.top}
      aria-labelledby="hero-heading"
      data-picked={picked ?? undefined}
    >
      <div className={styles.canvas}>
        <div className={styles.intro}>
          <h1 id="hero-heading">
            {heroCopy.first}{' '}
            <span className={styles.turn}>{heroCopy.second}</span>
          </h1>
          <p className={styles.description}>{heroCopy.subhead(live, coming)}</p>
          <div className={styles.actionRow}>
            <a
              className={styles.cta}
              href={pickedVolume ? pickedVolume.href : `#${STACK_ID}`}
              onClick={onCta}
            >
              {pickedVolume
                ? `Switch to ${pickedVolume.name}`
                : 'Choose what to replace'}{' '}
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
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
          <div className={styles.side}>
            {/* The cloud is still art; what falls from it is a layer of small
                elements under it (Rainfall.tsx), now and then a leaf blows
                across (Leaves.tsx), and now and then it lights up
                (Lightning.tsx). */}
            <div
              className={`${styles.weather} ${styles.rain}`}
              aria-hidden="true"
            >
              <Rainfall />
              <Leaves />
              <Lightning cloud={CLOUD} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.cloud}
                src={CLOUD}
                alt=""
                width={1120}
                height={540}
                loading="lazy"
                decoding="async"
              />
            </div>

            <section
              className={`${styles.panel} ${styles.old}`}
              id={STACK_ID}
              ref={stackRef}
              aria-labelledby="hero-stack-heading"
              onAnimationEnd={event =>
                event.currentTarget.classList.remove(styles.nudge)
              }
            >
              <h2 id="hero-stack-heading">Your current stack…</h2>
              <ul>
                {rows.map((volume, i) => {
                  const price = incumbentPrices[volume.seed.primaryReplace];
                  return (
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
                        aria-describedby="hero-pick-hint"
                        onClick={() => pick(volume.slug)}
                        onKeyDown={event => onPickerKey(event, i)}
                      >
                        <span className={styles.tool}>
                          {volume.seed.primaryReplace}
                        </span>
                        {price ? (
                          <span className={styles.price}>
                            <span
                              className={
                                price.compact ? styles.full : undefined
                              }
                            >
                              {price.label}
                            </span>
                            {price.compact ? (
                              <span className={styles.compact}>
                                {price.compact}
                              </span>
                            ) : null}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className={styles.priceNote}>List prices per year.</p>
              <p id="hero-pick-hint" className={styles.srOnly}>
                Pick the tool you rent to see what replaces it.
              </p>
            </section>
            <p
              className={`${caveat.className} ${styles.note} ${styles.noteFrom}`}
            >
              From tools you rent…
            </p>
          </div>

          <div className={styles.side}>
            <div
              className={`${styles.weather} ${styles.sun}`}
              aria-hidden="true"
            >
              <SunLayers />
            </div>

            <section
              className={`${styles.panel} ${styles.new}`}
              aria-labelledby="hero-own-heading"
            >
              <h2 id="hero-own-heading">JustEvery Stack</h2>
              <ul>
                {rows.map(volume => {
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
                        href={volume.href}
                        aria-current={on ? 'true' : undefined}
                        data-on={on || undefined}
                        onClick={() => reportSwitch(volume.slug)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={volume.mark}
                          alt=""
                          aria-hidden="true"
                          width={20}
                          height={20}
                        />
                        <span className={styles.name}>{volume.name}</span>
                        <span className={styles.go} aria-hidden="true">
                          {on ? (
                            <span className={styles.goWord}>Switch </span>
                          ) : null}
                          $0
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              {moreCount > 0 ? (
                <a className={styles.more} href={products.path}>
                  and {moreCount} more <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </section>

            <p
              className={`${caveat.className} ${styles.note} ${styles.noteDifferent}`}
            >
              Own and change anything!
            </p>
          </div>
        </div>
      </div>

      {/* The four reasons to switch, above the ground. */}
      <ul className={styles.reasons} aria-label={benefits.label}>
        {benefits.items.map((item, index) => (
          <li
            key={item.lead}
            style={{ '--tint': tints[index % tints.length] } as CSSProperties}
          >
            <p className={styles.lead}>{item.lead}</p>
            <p className={styles.line}>{item.line}</p>
          </li>
        ))}
      </ul>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.ground}
        src="/landing/hero/ground.svg"
        alt=""
        aria-hidden="true"
        width={7680}
        height={600}
        loading="lazy"
        decoding="async"
      />

      <p className={styles.srOnly} aria-live="polite">
        {pickedVolume
          ? `${pickedVolume.seed.primaryReplace} is replaced by ${pickedVolume.name}. Switch to ${pickedVolume.name}.`
          : ''}
      </p>
    </section>
  );
}
