'use client';

import { useEffect, useRef } from 'react';

export function WarpGatesOverlay({
  rateHz,
  thickness,
  glow,
}: {
  rateHz: number;
  thickness: number;
  glow: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

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

    const hz = Math.max(0.05, rateHz);
    const thick = Math.max(0.5, thickness);
    const bloom = Math.max(0, glow);

    const draw = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const base = (t * hz) % 1;
      const ringCount = 4;
      for (let i = 0; i < ringCount; i++) {
        const p = (base + i / ringCount) % 1;
        const ease = 1 - Math.pow(1 - p, 3);
        const r = Math.min(w, h) * (0.18 + ease * 0.8);
        const a = (1 - ease) * (0.22 + bloom * 0.12);

        ctx.globalAlpha = a;
        const col = i % 2 === 0 ? '#00e0ff' : '#7c5cff';
        ctx.strokeStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 18 + bloom * 38;
        ctx.lineWidth = thick + (1 - ease) * (2.6 + bloom * 1.4);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    if (reduceMotionRef.current) {
      draw(performance.now());
      return () => ro.disconnect();
    }

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      draw(now);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [glow, rateHz, thickness]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen"
    />
  );
}
