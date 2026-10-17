import { reels } from '@/content/landing';
import { SOUND_CONTROL } from '@/components/shared/reelSound';

import { caveat } from './hero/fonts';
import styles from './running-sound.module.css';

// The button decides the sound itself, so the visitor's press on it is not
// also taken as the gesture that restores a silenced player (reelSound).
const soundControl = { [SOUND_CONTROL]: '' };

/**
 * The reels' sound button, outside the player at its lower right, naming
 * what it does. While the sound is off a handwritten "(it's worth it!)" sits
 * to its left, level with it, in the hero's hand and ink like the footer's
 * FooterNote, with an arrow drawn out of its end that dips and comes in
 * level to the button's side (running-sound.module.css). The note and its
 * arrow are decorative and fade away while the sound is on.
 */
export function RunningSound({
  muted,
  onToggle,
  className,
}: {
  muted: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div className={`${styles.sound} ${className ?? ''}`}>
      <span
        className={`${caveat.className} ${styles.note}`}
        data-shown={muted}
        aria-hidden="true"
      >
        {reels.soundNote}
      </span>
      {/* The drawing's units are px from the note's end (x) and the
          button's middle (y), so the viewBox reads in the page's own px. */}
      <svg
        className={styles.arrow}
        data-shown={muted}
        viewBox="0 -12 44 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 3C12 15 28 1.5 44 0" />
        <path d="M39.2 -2.5L44 0L40 3.3" />
      </svg>
      <button
        type="button"
        className={styles.button}
        onClick={onToggle}
        {...soundControl}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path className={styles.speaker} d="M11 5 6.2 9H3v6h3.2l4.8 4z" />
          {muted ? (
            <path d="m15.5 9 6 6m0-6-6 6" />
          ) : (
            <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18.4 6.4a8 8 0 0 1 0 11.2" />
          )}
        </svg>
        {muted ? reels.unmute : reels.mute}
      </button>
    </div>
  );
}
