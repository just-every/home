'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
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

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
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

function getViewportCenterVector(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;

  return {
    dx: viewportCenterX - elementCenterX,
    dy: viewportCenterY - elementCenterY,
  };
}

function renderWormholeChars(children: React.ReactNode): React.ReactNode {
  let keyIndex = 0;

  const renderNode = (node: React.ReactNode): React.ReactNode => {
    if (node === null || node === undefined || typeof node === 'boolean')
      return null;

    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node);
      const chars: React.ReactNode[] = [];

      for (const char of text) {
        if (char === '\n') {
          chars.push(<br key={`br-${keyIndex++}`} />);
          continue;
        }

        const displayChar = char === ' ' ? '\u00A0' : char;
        chars.push(
          <span key={`ch-${keyIndex++}`} className="wormhole-char" data-wh-char>
            {displayChar}
          </span>
        );
      }

      return chars;
    }

    if (!isValidElement(node)) return node;
    if (node.type === 'br') return node;

    const element = node as ReactElement<{ children?: React.ReactNode }>;
    const nextChildren = Children.toArray(element.props.children).map(child =>
      renderNode(child)
    );
    return cloneElement(element, { ...element.props }, nextChildren);
  };

  return Children.toArray(children).map(child => renderNode(child));
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
  const deactivateTimeoutRef = useRef<number | null>(null);

  const applyOriginAndOffsets = useCallback(() => {
    const element = spanRef.current;
    if (!element) return;
    if (state.prefersReducedMotion) return;

    const origin = getViewportCenterOrigin(element);
    element.style.setProperty('--wh-ox', `${origin.x.toFixed(2)}px`);
    element.style.setProperty('--wh-oy', `${origin.y.toFixed(2)}px`);

    const vector = getViewportCenterVector(element);
    const maxDistance = 300;
    const pullStrength = 0.28;
    const tx = clampNumber(vector.dx, -maxDistance, maxDistance) * pullStrength;
    const ty = clampNumber(vector.dy, -maxDistance, maxDistance) * pullStrength;
    element.style.setProperty('--wh-tx', `${tx.toFixed(2)}px`);
    element.style.setProperty('--wh-ty', `${ty.toFixed(2)}px`);

    const chars = Array.from(
      element.querySelectorAll<HTMLElement>('[data-wh-char]')
    );
    if (chars.length === 0) return;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const maxDist = Math.max(
      280,
      Math.min(window.innerWidth, window.innerHeight) * 0.55
    );

    const variantIndex = clampInt(state.variant, 0, WORMHOLE_VARIANT_COUNT - 1);
    const variantParams = [
      {
        pull: 0.34,
        pow: 1.35,
        ortho: 0.06,
        jitter: 0.0,
        scale: 0.08,
        axis: 'both' as const,
      },
      {
        pull: 0.42,
        pow: 1.2,
        ortho: 0.08,
        jitter: 0.0,
        scale: 0.11,
        axis: 'both' as const,
      },
      {
        pull: 0.38,
        pow: 1.55,
        ortho: 0.0,
        jitter: 0.0,
        scale: 0.08,
        axis: 'x' as const,
      },
      {
        pull: 0.38,
        pow: 1.55,
        ortho: 0.0,
        jitter: 0.0,
        scale: 0.08,
        axis: 'y' as const,
      },
      {
        pull: 0.3,
        pow: 1.05,
        ortho: 0.12,
        jitter: 0.0,
        scale: 0.1,
        axis: 'both' as const,
      },
      {
        pull: 0.28,
        pow: 1.1,
        ortho: 0.05,
        jitter: 0.08,
        scale: 0.07,
        axis: 'both' as const,
      },
      {
        pull: 0.52,
        pow: 1.3,
        ortho: 0.03,
        jitter: 0.0,
        scale: 0.13,
        axis: 'both' as const,
      },
      {
        pull: 0.36,
        pow: 1.25,
        ortho: -0.1,
        jitter: 0.0,
        scale: 0.09,
        axis: 'both' as const,
      },
      {
        pull: 0.33,
        pow: 1.75,
        ortho: 0.07,
        jitter: 0.0,
        scale: 0.07,
        axis: 'both' as const,
      },
      {
        pull: 0.44,
        pow: 2.1,
        ortho: 0.05,
        jitter: 0.0,
        scale: 0.08,
        axis: 'both' as const,
      },
    ][variantIndex];

    const rand = mulberry32((state.runId + 1) * 10007 + variantIndex * 97);

    chars.forEach((charElement, index) => {
      const rect = charElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = viewportCenterX - cx;
      const dy = viewportCenterY - cy;
      const dist = Math.hypot(dx, dy) || 1;

      const nx = dx / dist;
      const ny = dy / dist;
      const strengthRaw = clampNumber(dist / maxDist, 0, 1);
      const strength = Math.pow(strengthRaw, variantParams.pow);

      const baseShift = rect.height * variantParams.pull;
      let txChar = nx * baseShift * strength;
      let tyChar = ny * baseShift * strength;

      if (variantParams.axis === 'x') {
        tyChar = 0;
      } else if (variantParams.axis === 'y') {
        txChar = 0;
      }

      const orthX = -ny;
      const orthY = nx;
      const tearSign = index % 2 === 0 ? 1 : -1;
      txChar += orthX * baseShift * strength * variantParams.ortho * tearSign;
      tyChar += orthY * baseShift * strength * variantParams.ortho * tearSign;

      if (variantParams.jitter > 0) {
        const jx =
          (rand() * 2 - 1) * baseShift * strength * variantParams.jitter;
        const jy =
          (rand() * 2 - 1) * baseShift * strength * variantParams.jitter;
        txChar += jx;
        tyChar += jy;
      }

      const shrink = variantParams.scale * strength;
      charElement.style.setProperty('--wh-cx', `${txChar.toFixed(2)}px`);
      charElement.style.setProperty('--wh-cy', `${tyChar.toFixed(2)}px`);
      charElement.style.setProperty('--wh-cs', `${shrink.toFixed(3)}`);
    });
  }, [state.prefersReducedMotion, state.runId, state.variant]);

  useEffect(() => {
    if (state.prefersReducedMotion) return;

    applyOriginAndOffsets();
    setActive(false);

    const rafId = window.requestAnimationFrame(() => {
      setActive(true);
    });

    if (deactivateTimeoutRef.current) {
      window.clearTimeout(deactivateTimeoutRef.current);
    }
    deactivateTimeoutRef.current = window.setTimeout(() => {
      setActive(false);
    }, 5000);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (deactivateTimeoutRef.current) {
        window.clearTimeout(deactivateTimeoutRef.current);
        deactivateTimeoutRef.current = null;
      }
    };
  }, [applyOriginAndOffsets, state.prefersReducedMotion, state.runId]);

  useEffect(() => {
    if (state.prefersReducedMotion) return;

    const handleResize = () => applyOriginAndOffsets();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyOriginAndOffsets, state.prefersReducedMotion]);

  const heroWarpClass =
    direction === 'up' ? 'hero-warp--up' : 'hero-warp--down';
  const variant = clampInt(state.variant, 0, WORMHOLE_VARIANT_COUNT - 1);

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
      {renderWormholeChars(children)}
    </span>
  );
}
