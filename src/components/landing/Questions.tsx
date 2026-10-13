import type { CSSProperties } from 'react';

import { questions } from '@/content/landing';

import ui from './label.module.css';
import styles from './questions.module.css';
import { Glyph } from './Glyph';
import type { GlyphShape } from './Glyph';

/** The design's question cards: one tint and shape each, in order. */
const looks: { shape: GlyphShape; ink: string; tint: string; flip?: true }[] = [
  { shape: 'circle', ink: '#4a95ff', tint: '#e8f3ff' },
  { shape: 'triangle', ink: '#3cc697', tint: '#e9f7f0' },
  { shape: 'heptagon', ink: '#ff853e', tint: '#fff0ea' },
  { shape: 'square', ink: '#9364f4', tint: '#f1ebff' },
  { shape: 'triangle', ink: '#ed598b', tint: '#fceef7', flip: true },
  { shape: 'star', ink: '#4796ff', tint: '#e8f3ff' },
  { shape: 'folded', ink: '#efb429', tint: '#fff8e3' },
];

export function Questions() {
  return (
    <section
      className={styles.questions}
      id={questions.id}
      aria-labelledby="label-questions-heading"
    >
      <div className={`${ui.wrap} ${styles.inner}`}>
        <div>
          <p className={ui.eyebrow}>Questions</p>
          <h2 className={ui.h2} id="label-questions-heading">
            {questions.heading}
          </h2>
          <p className={`${ui.lead} ${styles.line}`}>{questions.line}</p>
        </div>
        <ul className={styles.grid}>
          {questions.items.map((item, index) => {
            const look = looks[index % looks.length];
            return (
              <li
                key={item.question}
                className={`${ui.card} ${styles.card}`}
                style={{ '--tint': look.tint } as CSSProperties}
              >
                <Glyph
                  className={`${styles.mark} ${look.flip ? styles.flip : ''}`}
                  shape={look.shape}
                  color={look.ink}
                />
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
