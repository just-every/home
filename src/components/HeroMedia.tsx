'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { assetUrl } from '@/lib/asset-url';

const INTRO_WEBM = assetUrl('/video/hero-intro.webm');
const INTRO_MP4 = assetUrl('/video/hero-intro.mp4');
const LOOP_WEBM = assetUrl('/video/hero-loop.webm');
const LOOP_MP4 = assetUrl('/video/hero-loop.mp4');
const POSTER = '/img/hero-bg.jpeg';

type HeroSwapVideo = {
  id: string;
  webm: string;
  mp4?: string;
};

const SWAP_VIDEOS: readonly HeroSwapVideo[] = [
  {
    id: 'hero-alien',
    webm: assetUrl('/video/hero-alien.webm'),
    mp4: assetUrl('/video/hero-alien.mp4'),
  },
  {
    id: 'hero-planet',
    webm: assetUrl('/video/hero-planet.webm'),
    mp4: assetUrl('/video/hero-planet.mp4'),
  },
  {
    id: 'hero-every',
    webm: assetUrl('/video/hero-every.webm'),
    mp4: assetUrl('/video/hero-every.mp4'),
  },
  {
    id: 'hero-computer',
    webm: assetUrl('/video/hero-computer.webm'),
    mp4: assetUrl('/video/hero-computer.mp4'),
  },
];

const SWAP_VIDEO_BY_ID: Readonly<Record<string, HeroSwapVideo>> =
  Object.fromEntries(SWAP_VIDEOS.map((video) => [video.id, video]));

const SKIP_SWAP_CHANCE_AFTER_FIRST = 0.28;
const LOOPS_BETWEEN_SWAP_CYCLES = 10;

const INTRO_WARP_TIMING = {
  start: 1.0,
  max: 4.0,
  end: 6.0,
} as const;

const LOOP_WARP_TIMING = {
  start: 2.0,
  max: 5.0,
  end: 10.0,
} as const;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep01(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function timedWarp(
  time: number,
  timing: { start: number; max: number; end: number }
) {
  if (!Number.isFinite(time)) return 0;
  if (time < timing.start || time > timing.end) return 0;

  if (time <= timing.max) {
    const span = timing.max - timing.start;
    if (span <= 0) return 1;
    return smoothstep01((time - timing.start) / span);
  }

  const span = timing.end - timing.max;
  if (span <= 0) return 0;
  return smoothstep01(1 - (time - timing.max) / span);
}

function randomInt(maxExclusive: number) {
  if (!Number.isFinite(maxExclusive) || maxExclusive <= 1) return 0;

  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0] % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
}

function shuffled<T>(values: readonly T[]) {
  const next = [...values];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function HeroMedia() {
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const swapRef = useRef<HTMLVideoElement>(null);

  const showSwapRef = useRef(false);

  const [introReady, setIntroReady] = useState(false);
  const [showLoop, setShowLoop] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [swapVideo, setSwapVideo] = useState<HeroSwapVideo | null>(null);

  const introStartedRef = useRef(false);
  const introEndedRef = useRef(false);
  const introFrozenRef = useRef(false);
  const loopReadyRef = useRef(false);
  const loopStartedRef = useRef(false);
  const swapReadyRef = useRef(false);

  const swapOrderRef = useRef<string[]>([]);
  const swapIndexRef = useRef(0);
  const pendingSwapVideoRef = useRef<HeroSwapVideo | null>(null);
  const hasPlayedSwapOnceRef = useRef(false);
  const cooldownLoopsRemainingRef = useRef(0);

  const requestFirstFrame = useCallback(
    (video: HTMLVideoElement, onFrame: () => void) => {
      if ('requestVideoFrameCallback' in video) {
        (
          video as HTMLVideoElement & {
            requestVideoFrameCallback: (
              callback: (now: number) => void
            ) => number;
          }
        ).requestVideoFrameCallback(() => {
          onFrame();
        });
        return;
      }

      onFrame();
    },
    []
  );

  const reshuffleSwapOrder = useCallback(() => {
    if (SWAP_VIDEOS.length === 0) return;

    swapOrderRef.current = shuffled(SWAP_VIDEOS.map((video) => video.id));
    swapIndexRef.current = 0;
  }, []);

  const peekNextSwapVideo = useCallback((): HeroSwapVideo | null => {
    if (SWAP_VIDEOS.length === 0) return null;
    if (cooldownLoopsRemainingRef.current > 0) return null;

    if (
      swapOrderRef.current.length === 0 ||
      swapIndexRef.current >= swapOrderRef.current.length
    ) {
      reshuffleSwapOrder();
    }

    const nextId = swapOrderRef.current[swapIndexRef.current];
    return SWAP_VIDEO_BY_ID[nextId] ?? SWAP_VIDEOS[0];
  }, [reshuffleSwapOrder]);

  const advanceSwapVideo = useCallback(() => {
    if (SWAP_VIDEOS.length === 0) return;

    swapIndexRef.current += 1;
    if (swapIndexRef.current < swapOrderRef.current.length) return;

    cooldownLoopsRemainingRef.current = LOOPS_BETWEEN_SWAP_CYCLES;
    swapOrderRef.current = [];
    swapIndexRef.current = 0;
  }, []);

  const ensureSwapPreloading = useCallback(() => {
    if (SWAP_VIDEOS.length === 0) return;
    if (showSwap) return;
    if (cooldownLoopsRemainingRef.current > 0) return;

    const nextSwap = peekNextSwapVideo();
    if (!nextSwap) return;
    if (swapVideo?.id === nextSwap.id) return;

    setSwapVideo(nextSwap);
  }, [peekNextSwapVideo, showSwap, swapVideo?.id]);

  const startLoopCycle = useCallback(
    ({ afterFirstFrame }: { afterFirstFrame?: () => void } = {}) => {
      const loopVideo = loopRef.current;
      if (!loopVideo) return;

      try {
        loopVideo.currentTime = 0;
      } catch {
        // noop
      }

      const playResult = loopVideo.play();
      const onStarted = () => {
        requestFirstFrame(loopVideo, () => {
          setShowLoop(true);
          afterFirstFrame?.();
        });
      };

      if (playResult && typeof playResult.then === 'function') {
        playResult
          .then(() => onStarted())
          .catch(() => {
            // noop
          });
        return;
      }

      onStarted();
    },
    [requestFirstFrame]
  );

  const tryStartLoop = useCallback(() => {
    const loopVideo = loopRef.current;
    if (!loopVideo) return;
    if (!introEndedRef.current || !loopReadyRef.current) return;
    if (loopStartedRef.current) return;

    loopStartedRef.current = true;
    startLoopCycle();
    ensureSwapPreloading();
  }, [ensureSwapPreloading, startLoopCycle]);

  const isSwapLoaded = useCallback(() => {
    const swap = swapRef.current;
    if (!swap) return false;
    if (!swapReadyRef.current) return false;
    return swap.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  }, []);

  const tryPlaySwapBetweenLoops = useCallback(() => {
    if (SWAP_VIDEOS.length === 0) return false;
    if (!swapVideo) return false;
    if (cooldownLoopsRemainingRef.current > 0) return false;

    const swap = swapRef.current;
    if (!swap) return false;
    if (!isSwapLoaded()) return false;

    try {
      swap.currentTime = 0;
    } catch {
      // noop
    }

    const playResult = swap.play();
    const onPlaying = () => {
      requestFirstFrame(swap, () => setShowSwap(true));
    };

    if (playResult && typeof playResult.then === 'function') {
      playResult
        .then(() => {
          onPlaying();
          hasPlayedSwapOnceRef.current = true;
          advanceSwapVideo();
          pendingSwapVideoRef.current = peekNextSwapVideo();
        })
        .catch(() => {
          pendingSwapVideoRef.current = null;
          setShowSwap(false);
          startLoopCycle();
        });
      return true;
    }

    onPlaying();
    hasPlayedSwapOnceRef.current = true;
    advanceSwapVideo();
    pendingSwapVideoRef.current = peekNextSwapVideo();
    return true;
  }, [
    advanceSwapVideo,
    isSwapLoaded,
    peekNextSwapVideo,
    requestFirstFrame,
    startLoopCycle,
    swapVideo,
  ]);

  const handleLoopEnded = useCallback(() => {
    if (cooldownLoopsRemainingRef.current > 0) {
      cooldownLoopsRemainingRef.current = Math.max(
        0,
        cooldownLoopsRemainingRef.current - 1
      );

      if (cooldownLoopsRemainingRef.current === 0 && SWAP_VIDEOS.length > 0) {
        reshuffleSwapOrder();
        setSwapVideo(peekNextSwapVideo());
      }

      startLoopCycle();
      return;
    }

    ensureSwapPreloading();

    const shouldSkipSwap =
      hasPlayedSwapOnceRef.current &&
      Math.random() < SKIP_SWAP_CHANCE_AFTER_FIRST;

    if (!shouldSkipSwap && tryPlaySwapBetweenLoops()) {
      return;
    }

    startLoopCycle();
  }, [
    ensureSwapPreloading,
    peekNextSwapVideo,
    reshuffleSwapOrder,
    startLoopCycle,
    tryPlaySwapBetweenLoops,
  ]);

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
    const swap = swapRef.current;

    intro?.load();
    loop?.load();
    swap?.load();

    return () => {
      intro?.pause();
      loop?.pause();
      swap?.pause();
    };
  }, []);

  useEffect(() => {
    showSwapRef.current = showSwap;
  }, [showSwap]);

  useEffect(() => {
    if (SWAP_VIDEOS.length === 0) return;

    reshuffleSwapOrder();
    setSwapVideo(peekNextSwapVideo());
  }, [peekNextSwapVideo, reshuffleSwapOrder]);

  useEffect(() => {
    const swap = swapRef.current;
    if (!swap) return;
    if (!swapVideo) return;

    swapReadyRef.current = false;
    swap.pause();

    try {
      swap.currentTime = 0;
    } catch {
      // noop
    }

    swap.load();
  }, [swapVideo]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const doc = document.documentElement;
    const displacementDown = document.getElementById(
      'hero-spag-displacement-down'
    ) as SVGFEDisplacementMapElement | null;
    const displacementUp = document.getElementById(
      'hero-spag-displacement-up'
    ) as SVGFEDisplacementMapElement | null;

    let rafId = 0;
    let lastWarp = -1;

    const tick = () => {
      const intro = introRef.current;
      const loop = loopRef.current;
      const swap = swapRef.current;

      const introActive = !!intro && !introEndedRef.current;
      const activeVideo = introActive
        ? intro
        : showSwapRef.current
          ? swap
          : loop;
      const activeTime = activeVideo?.currentTime ?? 0;

      let warp = 0;
      if (introActive) {
        warp = timedWarp(activeTime, INTRO_WARP_TIMING);
      } else if (activeVideo && !showSwapRef.current) {
        warp = timedWarp(activeTime, LOOP_WARP_TIMING);
      }

      warp = clamp01(Math.pow(warp, 1.25));

      if (Math.abs(warp - lastWarp) > 0.01) {
        lastWarp = warp;

        doc.style.setProperty('--hero-warp', warp.toFixed(3));

        const scale = (warp * 170).toFixed(2);
        displacementDown?.setAttribute('scale', scale);
        displacementUp?.setAttribute('scale', scale);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      doc.style.setProperty('--hero-warp', '0');
      displacementDown?.setAttribute('scale', '0');
      displacementUp?.setAttribute('scale', '0');
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
        poster={POSTER}
        onCanPlay={() => {
          loopReadyRef.current = true;
          tryStartLoop();
        }}
        onPlaying={() => setShowLoop(true)}
        onEnded={handleLoopEnded}
      >
        <source src={LOOP_WEBM} type="video/webm" />
        <source src={LOOP_MP4} type="video/mp4" />
      </video>

      {swapVideo ? (
        <video
          ref={swapRef}
          className={`absolute inset-0 h-full w-full object-cover ${
            showSwap ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          preload="auto"
          poster={POSTER}
          onCanPlay={() => {
            swapReadyRef.current = true;
          }}
          onCanPlayThrough={() => {
            swapReadyRef.current = true;
          }}
          onEnded={() => {
            const pending = pendingSwapVideoRef.current;
            pendingSwapVideoRef.current = null;

            startLoopCycle({
              afterFirstFrame: () => {
                setShowSwap(false);
                setSwapVideo(pending ?? peekNextSwapVideo());
              },
            });
          }}
        >
          <source src={swapVideo.webm} type="video/webm" />
          {swapVideo.mp4 ? (
            <source src={swapVideo.mp4} type="video/mp4" />
          ) : null}
        </video>
      ) : null}
    </div>
  );
}
