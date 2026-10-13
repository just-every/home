import { ArrowRight } from 'lucide-react';

import { collection, githubOrgUrl, nav, wordmark } from '@/content/landing';

import { Shelf } from './Shelf';
import styles from './hero.module.css';
import shared from './page.module.css';

const scene = '/variants/objects';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="objects-title">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${scene}/hero-1536.webp 1536w, ${scene}/hero-2304.webp 2304w, ${scene}/hero-3072.webp 3072w`}
          sizes="(min-width: 1536px) 1536px, 100vw"
        />
        <img
          className={styles.scene}
          src={`${scene}/wall-1100.webp`}
          alt="A sunlit wall above two wooden shelves holding fourteen everyday objects, one for each product"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
      </picture>

      <header className={styles.nav}>
        <a className={styles.brand} href="#top">
          {wordmark}
        </a>
        <nav aria-label="Main" className={styles.navlinks}>
          {nav.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <div className={styles.intro}>
        <h1 id="objects-title" className={styles.title}>
          <span>Just about every SaaS.</span> <span>Yours to keep.</span>
        </h1>
        <p className={styles.sub}>
          Slate, Lamp, Pencil, Mango and ten more: open-source alternatives to
          the software you rent. 100% free.
        </p>
        <div className={styles.actions}>
          <a className={shared.pill} href={`#${collection.id}`}>
            Meet all fourteen
            <ArrowRight aria-hidden="true" className={styles.arrow} />
          </a>
          <a className={shared.textlink} href={githubOrgUrl}>
            GitHub
          </a>
        </div>
      </div>

      <p className={`${shared.note} ${styles.wallNote}`} aria-hidden="true">
        {/* Quotes the stand section's "Yours." point. */}
        Change
        <br />
        anything
        <br />
        you like.
      </p>

      <Shelf />
    </section>
  );
}
