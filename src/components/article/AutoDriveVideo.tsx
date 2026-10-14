'use client';

import { useEffect, useRef, useState } from 'react';

import { autoDrive } from './autoDrive';
import styles from './video.module.css';

/**
 * The Auto Drive video, behind a facade: Every Code's own poster for it
 * (docs/images/video-auto-drive-new-play.jpg, with its play button) until a
 * click, then YouTube's privacy-enhanced player, playing. Nothing loads from
 * YouTube before the click.
 */
export function AutoDriveVideo() {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // The button the reader pressed is gone; keep their place on the player.
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  return (
    <div className={styles.video}>
      {playing ? (
        <iframe
          ref={frame}
          src={autoDrive.embedUrl}
          title={autoDrive.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.facade}
          onClick={() => setPlaying(true)}
          aria-label={`Play ${autoDrive.title} (${autoDrive.length})`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/articles/auto-drive-960.webp"
            srcSet="/articles/auto-drive-960.webp 960w, /articles/auto-drive-1600.webp 1600w"
            sizes="(max-width: 899px) 100vw, 860px"
            alt=""
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.label} aria-hidden="true">
            <svg viewBox="0 0 12 12">
              <path d="M3 1.8v8.4L10.2 6z" />
            </svg>
            Play · {autoDrive.length}
          </span>
        </button>
      )}
    </div>
  );
}
