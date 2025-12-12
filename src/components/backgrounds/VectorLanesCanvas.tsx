'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { VectorLanesConfig } from '@/lib/backgrounds';

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function pickPalette(mode: VectorLanesConfig['colorMode']) {
  if (mode === 'violet') return ['#7c5cff', '#a78bfa', '#ffffff'];
  if (mode === 'prismatic') return ['#00e0ff', '#7c5cff', '#ff4ecd', '#ff8a00'];
  return ['#00e0ff', '#bfefff', '#ffffff'];
}

export function VectorLanesCanvas({ config }: { config: VectorLanesConfig }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);

  const palette = useMemo(
    () => pickPalette(config.colorMode),
    [config.colorMode]
  );

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

    const laneCount = Math.max(6, Math.floor(config.lanes));
    const speed = Math.max(0.2, config.speed);
    const glow = clamp01(config.glow);

    const draw = (now: number, _dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const t = now / 1000;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const horizon = cy - h * 0.12;
      const z = (t * speed) % 1;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < laneCount; i++) {
        const laneX = (i / (laneCount - 1) - 0.5) * 2;
        const spread = 0.8 + Math.sin(t * 0.45) * 0.06;
        const x0 = cx + laneX * w * 0.5;
        const x1 = cx + laneX * w * 0.06 * spread;

        const col = palette[i % palette.length] ?? '#00e0ff';
        ctx.strokeStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 12 + glow * 26;
        ctx.globalAlpha = 0.22 + glow * 0.24;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(x0, h + 40);
        ctx.lineTo(x1, horizon);
        ctx.stroke();
      }

      // Moving gate lines (depth cues)
      const gateCount = 18;
      for (let g = 0; g < gateCount; g++) {
        const p = (g / gateCount + z) % 1;
        const depth = 1 - p;
        const y = horizon + depth * depth * (h - horizon + 40);
        const span = (1 - depth) * (w * 0.9);
        const col = palette[g % palette.length] ?? '#00e0ff';
        ctx.strokeStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 10 + glow * 24;
        ctx.globalAlpha = (0.06 + glow * 0.14) * (1 - depth);
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(cx - span / 2, y);
        ctx.lineTo(cx + span / 2, y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Center legibility mask
      const r = Math.min(w, h) * 0.24;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(0,0,0,0.62)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    };

    if (reduceMotionRef.current) {
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
  }, [config.glow, config.lanes, config.speed, palette]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
