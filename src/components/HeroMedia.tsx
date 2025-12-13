'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { assetUrl } from '@/lib/asset-url';

const INTRO_WEBM = assetUrl('/video/hero-intro.webm');
const INTRO_MP4 = assetUrl('/video/hero-intro.mp4');
const LOOP_WEBM = assetUrl('/video/hero-loop.webm');
const LOOP_MP4 = assetUrl('/video/hero-loop.mp4');
const POSTER = '/img/hero-bg.jpeg';

export function HeroMedia() {
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);

  const [introReady, setIntroReady] = useState(false);
  const [showLoop, setShowLoop] = useState(false);

  const introStartedRef = useRef(false);
  const introEndedRef = useRef(false);
  const introFrozenRef = useRef(false);
  const loopReadyRef = useRef(false);
  const loopStartedRef = useRef(false);

  const requestFirstLoopFrame = useCallback((video: HTMLVideoElement) => {
    if ('requestVideoFrameCallback' in video) {
      (
        video as HTMLVideoElement & {
          requestVideoFrameCallback: (
            callback: (now: number) => void
          ) => number;
        }
      ).requestVideoFrameCallback(() => {
        setShowLoop(true);
      });
      return;
    }

    setShowLoop(true);
  }, []);

  const tryStartLoop = useCallback(() => {
    const loopVideo = loopRef.current;
    if (!loopVideo) return;
    if (!introEndedRef.current || !loopReadyRef.current) return;
    if (loopStartedRef.current) return;

    loopStartedRef.current = true;
    loopVideo.currentTime = 0;

    const playResult = loopVideo.play();
    if (playResult && typeof playResult.then === 'function') {
      playResult
        .then(() => {
          requestFirstLoopFrame(loopVideo);
        })
        .catch(() => {
          loopStartedRef.current = false;
        });
      return;
    }

    requestFirstLoopFrame(loopVideo);
  }, [requestFirstLoopFrame]);

  const freezeIntroOnLastFrameIfNeeded = useCallback(() => {
    const intro = introRef.current;
    if (!intro) return;
    if (introEndedRef.current) return;
    if (introFrozenRef.current) return;
    if (loopReadyRef.current) return;

    const duration = intro.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    const remaining = duration - intro.currentTime;
    if (remaining > 0.1) return;

    introFrozenRef.current = true;
    introEndedRef.current = true;

    try {
      intro.pause();
      intro.currentTime = Math.max(0, duration - 0.04);
    } catch {
      // noop
    }

    tryStartLoop();
  }, [tryStartLoop]);

  useEffect(() => {
    const intro = introRef.current;
    const loop = loopRef.current;

    intro?.load();
    loop?.load();

    return () => {
      intro?.pause();
      loop?.pause();
    };
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const doc = document.documentElement;
    const displacement = document.getElementById(
      'hero-warp-displacement'
    ) as SVGFEDisplacementMapElement | null;
    const turbulence = document.getElementById(
      'hero-warp-turbulence'
    ) as SVGFETurbulenceElement | null;

    if (!displacement || !turbulence) return;

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const pulse = (time: number, center: number, width: number) => {
      const x = (time - center) / width;
      return Math.exp(-x * x);
    };

    let rafId = 0;
    let lastWarp = -1;

    const tick = () => {
      const intro = introRef.current;
      const loop = loopRef.current;

      const introActive = !!intro && !introEndedRef.current;
      const activeVideo = introActive ? intro : loop;
      const activeTime = activeVideo?.currentTime ?? 0;

      let warp = 0;
      if (introActive) {
        warp = pulse(activeTime, 2, 0.5);
      } else if (loop) {
        warp = pulse(activeTime, 5, 0.7);
      }

      warp = clamp01(Math.pow(warp, 1.65));

      if (Math.abs(warp - lastWarp) > 0.01) {
        lastWarp = warp;

        doc.style.setProperty('--hero-warp', warp.toFixed(3));

        const scale = 22 * warp;
        displacement.setAttribute('scale', scale.toFixed(2));

        const freqX = 0.002 + 0.004 * warp;
        const freqY = 0.006 + 0.01 * warp;
        turbulence.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
        );
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      doc.style.setProperty('--hero-warp', '0');
      displacement.setAttribute('scale', '0');
      turbulence.setAttribute('baseFrequency', '0.002 0.006');
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <video
        ref={introRef}
        className={
          showLoop
            ? 'absolute inset-0 h-full w-full object-cover opacity-0'
            : `absolute inset-0 h-full w-full object-cover ${
                introReady ? 'opacity-100' : 'opacity-0'
              }`
        }
        muted
        playsInline
        preload="auto"
        poster={POSTER}
        onTimeUpdate={freezeIntroOnLastFrameIfNeeded}
        onCanPlay={() => {
          if (!introReady) setIntroReady(true);
          const intro = introRef.current;
          if (!intro) return;
          if (introStartedRef.current) return;
          introStartedRef.current = true;
          intro.currentTime = 0;
          void intro.play().catch(() => {});
        }}
        onEnded={() => {
          introEndedRef.current = true;
          tryStartLoop();
        }}
      >
        <source src={INTRO_WEBM} type="video/webm" />
        <source src={INTRO_MP4} type="video/mp4" />
      </video>

      <video
        ref={loopRef}
        className={`absolute inset-0 h-full w-full object-cover ${
          showLoop ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        playsInline
        preload="auto"
        loop
        poster={POSTER}
        onCanPlay={() => {
          loopReadyRef.current = true;
          tryStartLoop();
        }}
        onPlaying={() => setShowLoop(true)}
      >
        <source src={LOOP_WEBM} type="video/webm" />
        <source src={LOOP_MP4} type="video/mp4" />
      </video>
    </div>
  );
}
