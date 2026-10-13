import { githubOrgUrl, nav, wordmark } from '@/content/landing';

import { GithubIcon } from './GithubIcon';
import p from './page.module.css';
import s from './header.module.css';

const pageLinks = nav.filter(item => item.href.startsWith('#'));

export function Header({ primaryLabel }: { primaryLabel: string }) {
  return (
    <header className={`${p.wrap} ${s.header}`}>
      <a href="#top" className={s.brand}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/logo-black.svg"
          alt={wordmark}
          width={800}
          height={151}
          className={s.logo}
        />
      </a>
      <nav className={s.nav} aria-label="Main">
        {pageLinks.map(item => (
          <a key={item.href} href={item.href} className={s.navLink}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className={s.account}>
        <a href={githubOrgUrl} className={s.github}>
          <GithubIcon size={25} />
          GitHub
        </a>
        <a href="#all" className={`${p.btn} ${s.cta}`}>
          {primaryLabel}
        </a>
      </div>
    </header>
  );
}
