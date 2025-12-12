'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { StarfieldConfig } from '@/lib/backgrounds';

type Star = {
  x: number; // -1..1
  y: number; // -1..1
  z: number; // 0..1
  s: number; // size
  t: number; // twinkle phase
};

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export function StarfieldCanvas({ config }: { config: StarfieldConfig }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const reduceMotionRef = useRef(false);
  const lastTimeRef = useRef<number>(0);

  const starCount = useMemo(() => {
    if (typeof window === 'undefined') return Math.max(200, config.starCount);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const scale = (isMobile ? 0.75 : 1) * dpr;
    return Math.max(200, Math.floor(config.starCount * scale));
  }, [config.starCount]);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
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

    const makeStar = (): Star => ({
      x: (Math.random() * 2 - 1) * 1.2,
      y: (Math.random() * 2 - 1) * 1.2,
      z: Math.random(),
      s: 0.6 + Math.random() * 1.9,
      t: Math.random() * Math.PI * 2,
    });

    starsRef.current = Array.from({ length: starCount }, makeStar);

    const baseSpeed = Math.max(0.02, config.speed);
    const depth = Math.max(0.2, config.depth);
    const twinkle = clamp01(config.twinkle);

    const palette =
      config.colorMode === 'prismatic'
        ? ['#00e0ff', '#7c5cff', '#ff4ecd', '#ffffff']
        : config.colorMode === 'cool'
          ? ['#bfefff', '#7fd9ff', '#ffffff']
          : ['#ffffff'];

    const draw = (now: number, dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';

      const cx = w / 2;
      const cy = h / 2;
      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= dt * baseSpeed * (0.35 + (1 - s.z) * 1.25);

        if (s.z <= 0.02) {
          stars[i] = makeStar();
          stars[i].z = 1;
          continue;
        }

        const p = 1 / (s.z * depth + 0.08);
        const x = cx + s.x * w * 0.36 * p;
        const y = cy + s.y * h * 0.36 * p;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

        const size = s.s * p;
        const tw = twinkle > 0 ? 0.7 + 0.3 * Math.sin(now / 1000 + s.t) : 1;
        const a = Math.min(1, (0.12 + (1 - s.z) * 0.24) * tw);

        const col = palette[i % palette.length] ?? '#fff';
        ctx.fillStyle = col;
        ctx.globalAlpha = a;
        ctx.fillRect(x, y, size, size);

        if (size > 2.2) {
          ctx.globalAlpha = a * 0.18;
          ctx.beginPath();
          ctx.arc(x, y, size * 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const prefersReducedMotion = reduceMotionRef.current;
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      draw(performance.now(), 0);
      return () => ro.disconnect();
    }

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const last = lastTimeRef.current || now;
      const dt = Math.min((now - last) / 1000, 0.033);
      lastTimeRef.current = now;
      draw(now, dt);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [config.colorMode, config.depth, config.speed, config.twinkle, starCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
