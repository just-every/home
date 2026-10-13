import { ArrowDown } from 'lucide-react';

import { questions, runOne } from '@/content/landing';

import { ObjectImage } from './ObjectImage';
import { QuestionIcon, QuestionIconDefs } from './QuestionIcons';
import type { QuestionIconName } from './QuestionIcons';
import shared from './page.module.css';
import styles from './questions.module.css';

/** An icon per question, in the copy deck's order; null shows Slate's object. */
const icons: (QuestionIconName | null)[] = [
  'target',
  'box',
  'shield',
  'refresh',
  'gear',
  'globe',
  null,
];

export function Questions() {
  return (
    <section
      id={questions.id}
      className={styles.questions}
      aria-labelledby="objects-questions-title"
    >
      <QuestionIconDefs />
      <h2 id="objects-questions-title" className={styles.title}>
        {questions.heading}
      </h2>
      <p className={styles.lead}>{questions.line}</p>
      <p className={`${shared.note} ${styles.note}`} aria-hidden="true">
        {/* Quotes the answer to "Can I really change anything?" */}
        It&rsquo;s all source.
      </p>

      <ul className={styles.grid}>
        {questions.items.map((item, i) => {
          const icon = icons[i];
          return (
            <li key={item.question} className={styles.card}>
              {icon ? (
                <QuestionIcon name={icon} className={styles.icon} />
              ) : (
                <span className={styles.objectIcon}>
                  <ObjectImage slug="slate" />
                </span>
              )}
              <h3 className={styles.question}>{item.question}</h3>
              <p className={styles.answer}>{item.answer}</p>
            </li>
          );
        })}
        <li className={`${styles.card} ${styles.cta}`}>
          <a href="#run" className={styles.ctaLink}>
            <span>{runOne.heading}</span>
            <ArrowDown aria-hidden="true" className={styles.ctaIcon} />
          </a>
        </li>
      </ul>
    </section>
  );
}
