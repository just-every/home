'use client';

import { useEffect, useRef } from 'react';
import type { WireframeConfig } from '@/lib/backgrounds';

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export function WireframeCorridorCanvas({
  config,
}: {
  config: WireframeConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);
  const lastTimeRef = useRef<number>(0);

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

    const speed = Math.max(0.2, config.speed);
    const gridSize = Math.max(6, Math.floor(config.gridSize));
    const roll = clamp01(config.roll);
    const color = config.color;

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const persp = 1 / (z * 0.88 + 0.08);
      const sx = w / 2 + x * w * 0.45 * persp;
      const sy = h / 2 + y * h * 0.45 * persp;
      return { sx, sy, persp };
    };

    const draw = (now: number, _dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = now / 1000;
      const phase = (t * speed) % 1;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1;

      // subtle roll
      const rollAngle = roll * 0.2 * Math.sin(t * 0.6);
      const c = Math.cos(rollAngle);
      const s = Math.sin(rollAngle);

      const rotate = (x: number, y: number) => ({
        x: x * c - y * s,
        y: x * s + y * c,
      });

      // depth slices
      const slices = 18;
      for (let zi = 0; zi < slices; zi++) {
        const z = (zi / slices + phase) % 1;
        const dz = 1 - z;

        const size = 1.05 - dz * 0.75;
        const alpha = 0.05 + (1 - dz) * 0.18;
        ctx.globalAlpha = alpha;

        const corners = [
          { x: -size, y: -size },
          { x: size, y: -size },
          { x: size, y: size },
          { x: -size, y: size },
        ].map(p => rotate(p.x, p.y));

        const p0 = project(corners[0].x, corners[0].y, dz, w, h);
        const p1 = project(corners[1].x, corners[1].y, dz, w, h);
        const p2 = project(corners[2].x, corners[2].y, dz, w, h);
        const p3 = project(corners[3].x, corners[3].y, dz, w, h);

        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.lineTo(p3.sx, p3.sy);
        ctx.closePath();
        ctx.stroke();
      }

      // floor grid lines
      const gridLines = gridSize;
      for (let i = 0; i <= gridLines; i++) {
        const x = (i / gridLines - 0.5) * 2;
        const a0 = rotate(x, 1.15);
        const a1 = rotate(x, -0.15);
        const pA = project(a0.x, a0.y, 0.15, w, h);
        const pB = project(a1.x, a1.y, 1.0, w, h);

        ctx.globalAlpha = 0.06;
        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(pB.sx, pB.sy);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Center legibility mask
      const cx = w / 2;
      const cy = h / 2;
      const rad = Math.min(w, h) * 0.24;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grad.addColorStop(0, 'rgba(0,0,0,0.62)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
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
  }, [config.color, config.gridSize, config.roll, config.speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
