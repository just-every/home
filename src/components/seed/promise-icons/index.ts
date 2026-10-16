import type { PromiseCategory } from '@/data/seed-pages';

import type { PromiseArt } from './art';
import { bell } from './bell';
import { boxIn } from './box-in';
import { boxOut } from './box-out';
import { calendar } from './calendar';
import { clock } from './clock';
import { coin } from './coin';
import { eraser } from './eraser';
import { key } from './key';
import { padlock } from './padlock';
import { pulse } from './pulse';
import { receipt } from './receipt';
import { seal } from './seal';
import { shield } from './shield';
import { sparkle } from './sparkle';
import { undoArrow } from './undo-arrow';

export type { PromiseArt } from './art';

/** The kinds of promise that have an icon: every kind but `other`. */
export type IconCategory = Exclude<PromiseCategory, 'other'>;

/** Each kind of promise's icon. */
export const promiseArt: Record<IconCategory, PromiseArt> = {
  privacy: padlock,
  access: key,
  history: clock,
  undo: undoArrow,
  export: boxOut,
  import: boxIn,
  alerts: bell,
  evidence: receipt,
  money: coin,
  ai: sparkle,
  erasure: eraser,
  schedule: calendar,
  approval: seal,
  security: shield,
  reliability: pulse,
};
