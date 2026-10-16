/**
 * One muted/unmuted preference for every reel on the site. A visitor who mutes
 * or unmutes any player (its own controls included) sets it for every other
 * player on the page and for the next reel they open, and it is kept in this
 * browser between visits. Storage may be blocked; the preference then lasts
 * for the page.
 */

const KEY = 'je-reel-muted';

type Listener = (muted: boolean) => void;

// Muted until a visitor says otherwise, so the first play is silent.
let current: boolean | null = null;
const listeners = new Set<Listener>();

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== '0';
  } catch {
    return true;
  }
}

export function getReelMuted(): boolean {
  if (current === null) current = read();
  return current;
}

function setReelMuted(muted: boolean) {
  if (getReelMuted() === muted) return;
  current = muted;
  try {
    window.localStorage.setItem(KEY, muted ? '1' : '0');
  } catch {
    // Storage is blocked: the preference lasts for this page only.
  }
  listeners.forEach(listener => listener(muted));
}

export interface ReelSound {
  /**
   * Plays the video in the preferred state. If the browser refuses to play
   * with sound it plays muted instead, leaves the saved preference alone, and
   * restores the sound at the visitor's next interaction.
   */
  play(): Promise<void>;
  dispose(): void;
}

/** Puts a video under the shared preference, and reports the visitor's changes to it. */
export function bindReelSound(video: HTMLVideoElement): ReelSound {
  // The muted state this module last gave the video; a volumechange that
  // differs from it is the visitor's own.
  let expected = getReelMuted();
  // Playing muted only because the browser refused sound.
  let refused = false;

  const apply = (muted: boolean) => {
    expected = muted;
    if (video.muted !== muted) video.muted = muted;
  };
  apply(expected);

  const onVolume = () => {
    if (video.muted === expected) return;
    expected = video.muted;
    refused = false;
    setReelMuted(video.muted);
  };
  video.addEventListener('volumechange', onVolume);

  const unsubscribe = (() => {
    const listener: Listener = muted => {
      refused = false;
      apply(muted);
    };
    listeners.add(listener);
    return () => listeners.delete(listener);
  })();

  // The visitor's next interaction (outside the player, whose own controls
  // speak for themselves) lets a refused player have its sound back.
  const onInteract = (event: Event) => {
    if (!refused || event.target instanceof HTMLVideoElement) return;
    refused = false;
    apply(getReelMuted());
  };
  document.addEventListener('pointerdown', onInteract, true);
  document.addEventListener('keydown', onInteract, true);

  return {
    async play() {
      refused = false;
      apply(getReelMuted());
      try {
        await video.play();
      } catch (error) {
        if (
          !(error instanceof DOMException) ||
          error.name !== 'NotAllowedError' ||
          video.muted
        ) {
          throw error;
        }
        refused = true;
        apply(true);
        await video.play();
      }
    },
    dispose() {
      video.removeEventListener('volumechange', onVolume);
      document.removeEventListener('pointerdown', onInteract, true);
      document.removeEventListener('keydown', onInteract, true);
      unsubscribe();
    },
  };
}
