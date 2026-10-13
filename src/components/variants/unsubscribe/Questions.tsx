import {
  Award,
  Ban,
  Box,
  Database,
  RefreshCw,
  SlidersHorizontal,
  Target,
} from 'lucide-react';

import { questions } from '@/content/landing';

import p from './page.module.css';
import s from './questions.module.css';

/** One icon and tint per question, in the copy deck's order. */
const looks = [
  { Icon: Ban, tint: s.pink },
  { Icon: Box, tint: s.green },
  { Icon: Award, tint: s.blue },
  { Icon: RefreshCw, tint: s.orange },
  { Icon: SlidersHorizontal, tint: s.purple },
  { Icon: Database, tint: s.green },
  { Icon: Target, tint: s.blue },
] as const;

export function Questions() {
  return (
    <section
      id={questions.id}
      className={`${p.wrap} ${s.questions}`}
      aria-labelledby={`${questions.id}-title`}
    >
      <h2
        id={`${questions.id}-title`}
        className={`${p.sectionTitle} ${s.title}`}
      >
        {questions.heading}
      </h2>
      <p className={`${p.lede} ${s.lede}`}>{questions.line}</p>
      <ul className={s.grid}>
        {questions.items.map((item, i) => {
          const { Icon, tint } = looks[i % looks.length];
          return (
            <li key={item.question} className={s.card}>
              <span className={`${s.round} ${tint}`}>
                <Icon aria-hidden="true" size={30} strokeWidth={1.9} />
              </span>
              <div>
                <h3 className={s.question}>{item.question}</h3>
                <p className={s.answer}>{item.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
