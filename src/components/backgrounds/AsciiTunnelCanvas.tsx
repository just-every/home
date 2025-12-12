'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { AsciiTunnelConfig } from '@/lib/backgrounds';

type Glyph = {
  x: number;
  y: number;
  z: number;
  g: string;
  hue: number;
  w: number;
};

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export function AsciiTunnelCanvas({ config }: { config: AsciiTunnelConfig }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const reduceMotionRef = useRef(false);
  const lastTimeRef = useRef<number>(0);

  const glyphSet = useMemo(() => {
    const s = config.glyphs.trim();
    return s.length > 0 ? s : '░▒▓█<>/\\[]{}()';
  }, [config.glyphs]);

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

    const density = Math.max(0.2, config.density);
    const baseCount = Math.floor(420 * density);
    const baseSpeed = Math.max(0.08, config.speed);
    const swirl = Math.max(0, config.swirl);
    const chroma = clamp01(config.chroma);

    const makeGlyph = (randomZ = true): Glyph => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.3;
      const hue = 190 + Math.random() * 120;
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        z: randomZ ? Math.random() * 0.9 + 0.1 : 1,
        g: glyphSet[Math.floor(Math.random() * glyphSet.length)] ?? '·',
        hue,
        w: Math.random() * 1,
      };
    };

    glyphsRef.current = Array.from({ length: baseCount }, () =>
      makeGlyph(true)
    );

    const draw = (_now: number, dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const list = glyphsRef.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.z -= dt * baseSpeed * (0.35 + (1 - p.z) * 1.35);
        if (p.z <= 0.05 || Math.abs(p.x) > 2.4 || Math.abs(p.y) > 2.4) {
          list[i] = makeGlyph(false);
          continue;
        }

        if (swirl > 0) {
          const ang = (0.35 + (1 - p.z) * 1.2) * swirl * dt;
          const c = Math.cos(ang);
          const s = Math.sin(ang);
          const x = p.x * c - p.y * s;
          const y = p.x * s + p.y * c;
          p.x = x;
          p.y = y;
        }

        const persp = 1 / (p.z * 0.9 + 0.08);
        const sx = cx + p.x * w * 0.38 * persp;
        const sy = cy + p.y * h * 0.38 * persp;

        if (sx < -80 || sx > w + 80 || sy < -80 || sy > h + 80) continue;

        const size = Math.max(10, 10 + 28 * persp);
        const a = Math.min(1, (0.08 + (1 - p.z) * 0.22) * (0.75 + p.w * 0.4));
        const hue = p.hue;
        ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsla(${hue}, 90%, 70%, 1)`;
        ctx.fillText(p.g, sx, sy);

        if (chroma > 0.02) {
          const off = chroma * (1.5 + (1 - p.z) * 6);
          ctx.globalAlpha = a * 0.32;
          ctx.fillStyle = `hsla(${(hue + 55) % 360}, 95%, 72%, 1)`;
          ctx.fillText(p.g, sx - off, sy);
          ctx.fillStyle = `hsla(${(hue + 205) % 360}, 95%, 72%, 1)`;
          ctx.fillText(p.g, sx + off, sy);
        }

        if (size > 26) {
          ctx.globalAlpha = a * 0.08;
          ctx.fillStyle = `hsla(${hue}, 90%, 70%, 1)`;
          ctx.beginPath();
          ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Center legibility mask (darken)
      const r = Math.min(w, h) * 0.22;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(0,0,0,0.55)');
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
  }, [config.chroma, config.density, config.speed, config.swirl, glyphSet]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
