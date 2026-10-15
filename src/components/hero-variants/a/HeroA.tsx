'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

import ui from '@/components/landing/label.module.css';
import { track, X_EVENTS } from '@/lib/x-pixel';

import {
  Arrow,
  ChoiceArrow,
  ClosingArrow,
  Cloud,
  CodeIcon,
  HeartIcon,
  Hills,
  LockIcon,
  Scene,
  Terrain,
} from './art';
import { moreTools, pairs, primaryTools, seedFor, slugForTool } from './data';
import { notes } from './fonts';
import styles from './heroA.module.css';
import { ToolLists } from './ToolLists';

/**
 * Hero A (12ui design A): "Stop renting your software." The visitor picks
 * the tool they rent, from the select or the list of rented tools; its Just
 * Every alternative lights up beside it and the button switches to it,
 * opening that product's panel (`#vol-<slug>`). Every pick is a pixel
 * content view (`hero-pick`). Registered as A/B variant "a".
 */
export default function HeroA() {
  const first = pairs[0];
  const [tool, setTool] = useState(first.primaryReplace);
  const [slug, setSlug] = useState(first.slug);
  // Counts picks, so the picked row and the switch's OWN replay their flash.
  const [pulse, setPulse] = useState(0);
  const seed = seedFor(slug);

  const pick = (nextSlug: string, nextTool: string) => {
    setTool(nextTool);
    setSlug(nextSlug);
    setPulse(count => count + 1);
    track(X_EVENTS.contentView, {
      content_name: seedFor(nextSlug).name,
      content_type: 'hero-pick',
    });
  };

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSlug = slugForTool(event.target.value);
    if (nextSlug) pick(nextSlug, event.target.value);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-a-heading">
      <div className={`${ui.wrap} ${styles.rule}`} aria-hidden="true" />
      <div className={`${ui.wrap} ${styles.frame}`}>
        <div className={styles.canvas}>
          <Terrain />
          <Hills />
          <Cloud />
          <div className={styles.intro}>
            <h1 id="hero-a-heading">Stop renting your software.</h1>
            <p className={styles.description}>
              Free, open-source alternatives to the tools you already use.
              Switch from the SaaS you rent to the software you own.
            </p>
            <div className={styles.choice}>
              <p className={`${styles.choiceNote} ${notes.className}`}>
                Which subscription would you drop first?
              </p>
              <ChoiceArrow />
              <label htmlFor="hero-a-tool">Pick a tool to replace</label>
              <div className={styles.field}>
                <select id="hero-a-tool" value={tool} onChange={onSelect}>
                  {primaryTools.map(option => (
                    <option key={option.tool} value={option.tool}>
                      {option.tool}
                    </option>
                  ))}
                  <optgroup label="More tools">
                    {moreTools.map(option => (
                      <option key={option.tool} value={option.tool}>
                        {option.tool}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <i className={styles.chevron} aria-hidden="true" />
              </div>
            </div>
            <a className={styles.primary} href={`#vol-${seed.slug}`}>
              {`Switch to ${seed.name}`} <Arrow />
            </a>
            <p className={styles.srOnly} aria-live="polite">
              {pulse > 0 ? `${seed.name} replaces ${tool}.` : ''}
            </p>
            <ul className={styles.benefits}>
              <li className={styles.benefit}>
                <span className={styles.icon}>
                  <CodeIcon />
                </span>
                <span>
                  <strong>100% free</strong>
                  <small>No per-seat fees</small>
                </span>
              </li>
              <li className={styles.benefit}>
                <span className={styles.icon}>
                  <LockIcon />
                </span>
                <span>
                  <strong>Open source</strong>
                  <small>MIT licensed</small>
                </span>
              </li>
              <li className={styles.benefit}>
                <span className={styles.icon}>
                  <HeartIcon />
                </span>
                <span>
                  <strong>Yours to change</strong>
                  <small>Your code, your data</small>
                </span>
              </li>
            </ul>
          </div>
          <ToolLists selected={slug} tool={tool} pulse={pulse} onPick={pick} />
          <Scene pulse={pulse} />
          <p className={`${styles.closing} ${notes.className}`}>
            <ClosingArrow />
            <span>
              Same jobs.
              <br />
              Software you own.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
