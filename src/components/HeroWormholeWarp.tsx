'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const WORMHOLE_VARIANT_COUNT = 10;

type WormholeState = {
  variant: number;
  runId: number;
  prefersReducedMotion: boolean;
};

type WormholeContextValue = {
  state: WormholeState;
  triggerNext: () => void;
};

const WormholeContext = createContext<WormholeContextValue | null>(null);

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
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

function getViewportCenterOrigin(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  return {
    x: centerX - rect.left,
    y: centerY - rect.top,
  };
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;

    const update = () => setPrefersReducedMotion(media.matches);
    update();

    if ('addEventListener' in media) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    // Safari < 14
    (
      media as MediaQueryList & { addListener: (cb: () => void) => void }
    ).addListener(update);
    return () =>
      (
        media as MediaQueryList & { removeListener: (cb: () => void) => void }
      ).removeListener(update);
  }, []);

  return prefersReducedMotion;
}

export function HeroWormholeWarpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<WormholeState>(() => ({
    variant: 0,
    runId: 0,
    prefersReducedMotion: false,
  }));

  useEffect(() => {
    setState(prev => ({ ...prev, prefersReducedMotion }));

    if (prefersReducedMotion) return;

    setState(prev => ({
      ...prev,
      variant: randomInt(WORMHOLE_VARIANT_COUNT),
      runId: prev.runId + 1,
    }));
  }, [prefersReducedMotion]);

  const triggerNext = useCallback(() => {
    setState(prev => {
      if (prev.prefersReducedMotion) return prev;

      return {
        ...prev,
        variant: (prev.variant + 1) % WORMHOLE_VARIANT_COUNT,
        runId: prev.runId + 1,
      };
    });
  }, []);

  const value = useMemo<WormholeContextValue>(
    () => ({ state, triggerNext }),
    [state, triggerNext]
  );

  return (
    <WormholeContext.Provider value={value}>
      {children}
    </WormholeContext.Provider>
  );
}

type HeroWormholeWarpTextProps = {
  children: React.ReactNode;
  className?: string;
  direction?: 'down' | 'up';
  interactive?: boolean;
};

export function HeroWormholeWarpText({
  children,
  className,
  direction = 'down',
  interactive = false,
}: HeroWormholeWarpTextProps) {
  const context = useContext(WormholeContext);
  if (!context) {
    throw new Error(
      'HeroWormholeWarpText must be used within HeroWormholeWarpProvider.'
    );
  }

  const { state, triggerNext } = context;
  const spanRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  const applyOrigin = useCallback(() => {
    const element = spanRef.current;
    if (!element) return;
    if (state.prefersReducedMotion) return;

    const origin = getViewportCenterOrigin(element);
    element.style.setProperty('--wh-ox', `${origin.x.toFixed(2)}px`);
    element.style.setProperty('--wh-oy', `${origin.y.toFixed(2)}px`);
  }, [state.prefersReducedMotion]);

  useEffect(() => {
    if (state.prefersReducedMotion) return;

    applyOrigin();
    setActive(false);

    const rafId = window.requestAnimationFrame(() => {
      setActive(true);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [applyOrigin, state.prefersReducedMotion, state.runId]);

  useEffect(() => {
    if (state.prefersReducedMotion) return;

    const handleResize = () => applyOrigin();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyOrigin, state.prefersReducedMotion]);

  const variant = clampInt(state.variant, 0, WORMHOLE_VARIANT_COUNT - 1);
  const heroWarpClass =
    direction === 'up' ? 'hero-warp--up' : 'hero-warp--down';

  return (
    <span
      ref={spanRef}
      className={[
        'hero-warp',
        heroWarpClass,
        'wormhole-warp',
        `wormhole-warp--v${variant}`,
        active ? 'wormhole-warp--active' : '',
        interactive ? 'wormhole-warp--interactive' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? triggerNext : undefined}
      onKeyDown={
        interactive
          ? event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerNext();
              }
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
