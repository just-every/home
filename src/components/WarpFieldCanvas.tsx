'use client';

import { useEffect, useMemo, useRef } from 'react';

type WarpFieldCanvasProps = {
  className?: string;
  density?: number;
};

type Particle = {
  x: number;
  y: number;
  z: number; // 0 (near) -> 1 (far)
  size: number;
  speed: number;
  drift: number;
  highlight: boolean;
  highlightIndex: number;
  glyph: string;
};

const GRADIENT_STOPS = ['#00e0ff', '#7c5cff', '#ff4ecd', '#ff8a00'] as const;
const GLYPHS = ['▢', '▣', '▪', '▫', '·', '•'] as const;

function pseudoNoise(x: number, y: number, z: number, t: number) {
  const a = Math.sin(x * 1.3 + y * 1.7 + z * 0.35 + t * 0.6);
  const b = Math.sin(x * 0.7 - y * 1.1 + z * 0.9 - t * 0.4);
  const c = Math.sin((x + y) * 0.5 - z * 0.6 + t * 0.2);
  return (a + b + c) / 3;
}

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export function WarpFieldCanvas({
  className,
  density = 1,
}: WarpFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const spoolStartRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  const baseCount = useMemo(() => {
    if (typeof window === 'undefined') return 800;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? 600 : 1100;
    return Math.floor(count * density * dpr);
  }, [density]);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onSpool = () => {
      spoolStartRef.current = performance.now();
    };
    window.addEventListener('warpfield:spool', onSpool);
    return () => window.removeEventListener('warpfield:spool', onSpool);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const initParticles = () => {
      const list: Particle[] = [];
      for (let i = 0; i < baseCount; i++) {
        list.push(makeParticle(true));
      }
      particlesRef.current = list;
    };

    const makeParticle = (randomZ = false): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.2;
      const highlight = Math.random() < 0.06;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: randomZ ? Math.random() * 0.9 + 0.1 : 1,
        size: highlight ? 1.8 + Math.random() * 1.8 : 0.8 + Math.random() * 1.4,
        speed: 0.12 + Math.random() * 0.28,
        drift: 0.02 + Math.random() * 0.05,
        highlight,
        highlightIndex: Math.floor(Math.random() * GRADIENT_STOPS.length),
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      };
    };

    initParticles();

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.tx = nx;
      mouseRef.current.ty = ny;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (reduceMotionRef.current) return;

      const last = lastTimeRef.current || now;
      const dt = Math.min((now - last) / 1000, 0.033);
      lastTimeRef.current = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      const spoolStart = spoolStartRef.current;
      const spoolElapsed = spoolStart ? now - spoolStart : 9999;
      const spoolProgress = Math.min(spoolElapsed / 400, 1);
      const spoolFactor = spoolStart ? 1 - easeOutCubic(spoolProgress) : 0;
      if (spoolStart && spoolElapsed > 420) spoolStartRef.current = null;

      const baseSpeed = 0.42;
      const speedBoost = baseSpeed * (1 + spoolFactor * 1.4);

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const time = now / 1000;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.z -= p.speed * speedBoost * dt;

        if (p.z <= 0.04 || Math.abs(p.x) > 2.2 || Math.abs(p.y) > 2.2) {
          particles[i] = makeParticle(false);
          continue;
        }

        const n = pseudoNoise(p.x * 1.8, p.y * 1.8, p.z * 1.2, time);
        const angle = n * Math.PI * 2;
        const drift = p.drift * (0.6 + (1 - p.z));

        p.x += Math.cos(angle) * drift * dt + mouse.x * 0.002 * (1 - p.z);
        p.y += Math.sin(angle) * drift * dt + mouse.y * 0.002 * (1 - p.z);

        p.x *= 1 - dt * 0.015;
        p.y *= 1 - dt * 0.015;

        const perspective = 1 / (p.z * 0.9 + 0.08);
        const sx = cx + p.x * w * 0.38 * perspective;
        const sy = cy + p.y * h * 0.38 * perspective;
        const size = p.size * perspective * (0.45 + (1 - p.z));

        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) continue;

        const alphaBase = p.highlight ? 0.7 : 0.18;
        const alpha =
          alphaBase *
          (0.55 + (1 - p.z)) *
          (1 + spoolFactor * (p.highlight ? 1.2 : 0.4));

        if (p.highlight) {
          ctx.fillStyle = GRADIENT_STOPS[p.highlightIndex] + '';
          ctx.globalAlpha = Math.min(alpha, 1);
          ctx.shadowColor = GRADIENT_STOPS[p.highlightIndex];
          ctx.shadowBlur = 8 + spoolFactor * 18;
          ctx.font = `${Math.max(10, size * 9)}px var(--font-jetbrains-mono, monospace)`;
          ctx.fillText(p.glyph, sx, sy);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(255,255,255,1)';
          ctx.globalAlpha = alpha;
          ctx.fillRect(sx, sy, size, size);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [baseCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        className ??
        'pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black'
      }
    />
  );
}
