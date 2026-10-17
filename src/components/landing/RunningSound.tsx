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
 * to its left, in the hero's hand and ink like the footer's FooterNote, with
 * an arrow drawn out of its end, down and round and up into the button
 * (running-sound.module.css). The note is decorative and fades away while the
 * sound is on.
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
        {/* The drawing's units are px from the note's end (x) and its
            baseline (y), so the viewBox reads in the page's own px. */}
        <svg className={styles.arrow} viewBox="0 -22 48 26" focusable="false">
          <path d="M6 -4.6C20 0.5 36 -4 44.5 -15" />
          <path d="M39.2 -13.1L44.5 -15L44.1 -9.9" />
        </svg>
      </span>
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
