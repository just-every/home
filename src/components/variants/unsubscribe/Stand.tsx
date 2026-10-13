import { CircleCheck, FileText, KeyRound } from 'lucide-react';

import { stand } from '@/content/landing';

import s from './stand.module.css';

const looks = [
  { Icon: FileText, tint: s.green },
  { Icon: CircleCheck, tint: s.blue },
  { Icon: KeyRound, tint: s.purple },
] as const;

/** Three translucent sheets with a code mark: the contract, the checks, the source. */
function Sheets() {
  return (
    <svg className={s.sheets} viewBox="0 0 245 230" aria-hidden="true">
      <path
        d="m90 32 111 44q8 3 8 12v92q0 9-8 5L90 142q-7-3-7-10V40q0-11 7-8Z"
        fill="#ddf6ec"
        stroke="#86c8b4"
        strokeWidth="2"
      />
      <path
        d="m52 54 111 44q8 3 8 12v92q0 9-8 5L52 164q-7-3-7-10V62q0-11 7-8Z"
        fill="#e8f0ff"
        stroke="#839fd4"
        strokeWidth="2"
      />
      <path
        d="m16 76 111 44q8 3 8 12v92q0 9-8 5L16 186q-7-3-7-10V84q0-11 7-8Z"
        fill="#f4faff"
        fillOpacity="0.92"
        stroke="#bcd9ea"
        strokeWidth="2"
      />
      <path
        d="m57 134-14 8 14 19m34-14 13 18-13 10m-10-45-12 43"
        fill="none"
        stroke="#356992"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m156 4 2 20m28-16-12 19m29 8-17 5"
        fill="none"
        stroke="#303a39"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Stand() {
  return (
    <section className={s.stand} aria-labelledby="stand-title">
      <h2 id="stand-title" className={s.title}>
        {stand.heading}
      </h2>
      {stand.lines.map(line => (
        <p key={line} className={s.lede}>
          {line}
        </p>
      ))}
      <ul className={s.points}>
        {stand.points.map((point, i) => {
          const { Icon, tint } = looks[i % looks.length];
          return (
            <li key={point.title} className={s.point}>
              <span className={`${s.round} ${tint}`}>
                <Icon aria-hidden="true" size={28} strokeWidth={1.9} />
              </span>
              <div>
                <h3 className={s.pointTitle}>{point.title}</h3>
                <p className={s.pointText}>{point.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <Sheets />
    </section>
  );
}
