import { footer, githubOrgUrl } from '@/content/landing';

import { GithubIcon } from './GithubIcon';
import p from './page.module.css';
import s from './footer.module.css';

export function Footer() {
  return (
    <footer className={`${p.wrap} ${s.footer}`}>
      <p className={s.motto}>{footer.line}</p>
      <nav className={s.links} aria-label="Footer">
        {footer.links.map(link => (
          <a key={link.href} href={link.href} className={s.link}>
            {link.label}
          </a>
        ))}
        <a
          href={githubOrgUrl}
          className={s.social}
          aria-label="Just Every on GitHub"
        >
          <GithubIcon size={21} />
        </a>
      </nav>
    </footer>
  );
}
