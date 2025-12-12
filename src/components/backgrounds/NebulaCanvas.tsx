'use client';

import { useEffect, useRef } from 'react';
import type { NebulaConfig } from '@/lib/backgrounds';

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function palette(mode: NebulaConfig['colorMode']) {
  if (mode === 'sunset') return ['#ff8a00', '#ff4ecd', '#7c5cff', '#00e0ff'];
  if (mode === 'violet') return ['#7c5cff', '#a78bfa', '#ff4ecd', '#ffffff'];
  return ['#00e0ff', '#7fd9ff', '#7c5cff', '#ffffff'];
}

// Cheap-ish value noise
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);

  const u = smoothstep(xf);
  const v = smoothstep(yf);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

function fbm(x: number, y: number) {
  let v = 0;
  let a = 0.55;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * noise(x * f, y * f);
    f *= 2;
    a *= 0.55;
  }
  return v;
}

export function NebulaCanvas({ config }: { config: NebulaConfig }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);
  const lastRenderRef = useRef<number>(0);

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

    const colors = palette(config.colorMode);
    const intensity = clamp01(config.intensity);
    const speed = Math.max(0.01, config.speed);
    const scale = Math.max(0.6, config.scale);

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

    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d', { alpha: true });
    if (!offCtx) return;

    const render = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dw = Math.max(260, Math.floor(w / 3));
      const dh = Math.max(260, Math.floor(h / 3));
      off.width = dw;
      off.height = dh;

      const img = offCtx.createImageData(dw, dh);
      const data = img.data;
      const tt = t * speed;
      const c0 = colors[0] ?? '#00e0ff';
      const c1 = colors[1] ?? '#7c5cff';
      const c2 = colors[2] ?? '#ff4ecd';

      function hexToRgb(hex: string) {
        const h = hex.replace('#', '');
        const n = parseInt(
          h.length === 3
            ? h
                .split('')
                .map(x => x + x)
                .join('')
            : h,
          16
        );
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
      }

      const A = hexToRgb(c0);
      const B = hexToRgb(c1);
      const C = hexToRgb(c2);

      for (let y = 0; y < dh; y++) {
        for (let x = 0; x < dw; x++) {
          const nx = (x / dw) * 2 - 1;
          const ny = (y / dh) * 2 - 1;
          const r = Math.hypot(nx, ny);
          const v = fbm(
            nx * 1.4 * scale + tt * 0.35,
            ny * 1.4 * scale - tt * 0.28
          );
          const v2 = fbm(
            nx * 2.6 * scale - tt * 0.12,
            ny * 2.6 * scale + tt * 0.18
          );
          const cloud = Math.max(0, v * 0.75 + v2 * 0.55 - r * 0.35);
          const a = clamp01(cloud * (0.85 + intensity * 0.85));

          const mix = clamp01(cloud);
          const rr = Math.round(lerp(lerp(A.r, B.r, mix), C.r, v2 * 0.65));
          const gg = Math.round(lerp(lerp(A.g, B.g, mix), C.g, v2 * 0.65));
          const bb = Math.round(lerp(lerp(A.b, B.b, mix), C.b, v2 * 0.65));

          const i = (y * dw + x) * 4;
          data[i] = rr;
          data[i + 1] = gg;
          data[i + 2] = bb;
          data[i + 3] = Math.round(a * 255);
        }
      }

      offCtx.putImageData(img, 0, 0);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.85;
      ctx.drawImage(off, 0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Center mask for legibility
      const cx = w / 2;
      const cy = h / 2;
      const rad = Math.min(w, h) * 0.26;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grad.addColorStop(0, 'rgba(0,0,0,0.66)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    };

    if (reduceMotionRef.current) {
      render(performance.now() / 1000);
      return () => ro.disconnect();
    }

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      // throttle expensive nebula updates
      if (now - lastRenderRef.current < 140) return;
      lastRenderRef.current = now;
      render(now / 1000);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [config.colorMode, config.intensity, config.scale, config.speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
