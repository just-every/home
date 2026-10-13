import {
  ChevronRight,
  Database,
  HandHeart,
  SquareArrowOutUpRight,
  Terminal,
} from 'lucide-react';

import { githubOrgUrl } from '@/content/landing';

import { CategoryStrip } from './CategoryStrip';
import styles from './hero.module.css';
import m from './manifesto.module.css';
import { ProductIndex } from './ProductIndex';

/*
 * The hero copy is fixed by the brief. The three points under it are true
 * statements taken from the copy deck: "Take it, run it, change it." (question
 * one), "Wherever you run it" (question six) and the footer's small print.
 */
const points = [
  { icon: Terminal, title: 'Open source', text: 'Take it, run it, change it.' },
  {
    icon: Database,
    title: 'Your code, your data',
    text: 'Wherever you run it.',
  },
  {
    icon: HandHeart,
    title: 'Made with care',
    text: 'And a lot of coding agents.',
  },
] as const;

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="manifesto-title">
      <div className={`${m.container} ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="manifesto-title" className={`${m.display} ${styles.title}`}>
            <span>Code got cheap.</span> <span>We made</span>{' '}
            <span>it good.</span>
          </h1>
          <p className={styles.lede}>
            <strong>Just Every publishes polished, open-source</strong>{' '}
            alternatives to just about every SaaS.{' '}
            <span>
              <strong>100%</strong> free and yours to change.
            </span>
          </p>
          <div className={styles.actions}>
            <a href="#all" className={m.buttonPrimary}>
              See the collection
              <ChevronRight size={22} strokeWidth={2.25} aria-hidden="true" />
            </a>
            <a href={githubOrgUrl} className={`${m.textLink} ${styles.github}`}>
              <span>GitHub</span>
              <SquareArrowOutUpRight
                size={19}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>
          <ul className={styles.points}>
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className={styles.pointIcon}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ProductIndex />
      </div>
      <CategoryStrip />
    </section>
  );
}
