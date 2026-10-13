import { ArrowRight, CodeXml, SlidersHorizontal, Users } from 'lucide-react';

import { githubOrgUrl } from '@/content/landing';

import { heroCopy } from './heroCopy';
import p from './page.module.css';
import { RenewalStacks } from './RenewalStacks';
import s from './hero.module.css';

const benefits = [
  { Icon: CodeXml, title: 'Open source', detail: 'MIT licensed' },
  {
    Icon: SlidersHorizontal,
    title: 'Your code, your data',
    detail: 'Change anything you like',
  },
  { Icon: Users, title: 'Run it yourself', detail: 'On your terms' },
] as const;

export function Hero() {
  return (
    <section className={`${p.wrap} ${s.hero}`} aria-labelledby="hero-title">
      <div className={s.copy}>
        <h1 id="hero-title" className={s.title}>
          {heroCopy.headline}
        </h1>
        <p className={s.subhead}>{heroCopy.subhead}</p>
        <div className={s.actions}>
          <a href="#all" className={`${p.btn} ${s.primary}`}>
            {heroCopy.primary}
          </a>
          <a href={githubOrgUrl} className={`${p.textLink} ${s.secondary}`}>
            {heroCopy.secondary}
            <ArrowRight aria-hidden="true" size={22} strokeWidth={1.8} />
          </a>
        </div>
        <ul className={s.benefits}>
          {benefits.map(({ Icon, title, detail }) => (
            <li key={title} className={s.benefit}>
              <Icon
                aria-hidden="true"
                className={s.benefitIcon}
                strokeWidth={1.6}
              />
              <span>
                {title}
                <small>{detail}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <RenewalStacks />
    </section>
  );
}
