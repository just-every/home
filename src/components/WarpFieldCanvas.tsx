'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  DEFAULT_WARP_CONFIG,
  lerp,
  mergeWarpConfig,
  smoothstep,
} from '@/lib/warp';
import type { WarpFieldConfig } from '@/lib/warp';

type WarpFieldCanvasProps = {
  className?: string;
  density?: number;
  config?: Partial<WarpFieldConfig>;
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

function rotate2d(x: number, y: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c };
}

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
  config,
}: WarpFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const spoolStartRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  const effectiveConfig = useMemo(() => {
    const merged = mergeWarpConfig(DEFAULT_WARP_CONFIG, config);
    return {
      ...merged,
      densityMultiplier: merged.densityMultiplier * density,
    };
  }, [config, density]);

  const baseCount = useMemo(() => {
    if (typeof window === 'undefined') return 800;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? 600 : 1100;
    return Math.floor(count * effectiveConfig.densityMultiplier * dpr);
  }, [effectiveConfig.densityMultiplier]);

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

    const cfg = effectiveConfig;

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
      const highlight = Math.random() < cfg.highlightChance;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: randomZ ? Math.random() * 0.9 + 0.1 : 1,
        size: highlight
          ? cfg.particleSizeMax * (0.7 + Math.random() * 0.7)
          : cfg.particleSizeMin +
            Math.random() * (cfg.particleSizeMax - cfg.particleSizeMin),
        speed:
          cfg.particleSpeedMin +
          Math.random() * (cfg.particleSpeedMax - cfg.particleSpeedMin),
        drift:
          cfg.particleDriftMin +
          Math.random() * (cfg.particleDriftMax - cfg.particleDriftMin),
        highlight,
        highlightIndex: Math.floor(Math.random() * cfg.paletteStops.length),
        glyph: cfg.glyphs[Math.floor(Math.random() * cfg.glyphs.length)] ?? '•',
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

    const drawFrame = (now: number, dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      const spoolStart = spoolStartRef.current;
      const spoolElapsed = spoolStart ? now - spoolStart : 9999;
      const spoolProgress = Math.min(spoolElapsed / cfg.spoolDurationMs, 1);
      const spoolFactor = spoolStart ? 1 - easeOutCubic(spoolProgress) : 0;
      if (spoolStart && spoolElapsed > cfg.spoolDurationMs + 140)
        spoolStartRef.current = null;

      const time = now / 1000;
      const pulse =
        cfg.pulseRateHz > 0 && cfg.pulseDepth > 0
          ? 1 + cfg.pulseDepth * Math.sin(time * Math.PI * 2 * cfg.pulseRateHz)
          : 1;

      const speedBoost =
        cfg.baseSpeed * (1 + spoolFactor * cfg.spoolBoost) * pulse;
      const speedSense = Math.min(1, Math.max(0, cfg.baseSpeed / 3.2));
      const streakFactor = Math.min(1, spoolFactor + speedSense * 0.25);

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const fade = lerp(cfg.trailFade, cfg.trailFadeSpool, spoolFactor);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(0,0,0,${fade.toFixed(3)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

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

        p.x +=
          Math.cos(angle) * drift * dt +
          mouse.x * cfg.mouseStrength * (1 - p.z);
        p.y +=
          Math.sin(angle) * drift * dt +
          mouse.y * cfg.mouseStrength * (1 - p.z);

        if (cfg.swirlStrength !== 0) {
          const swirlAngle = cfg.swirlStrength * dt * (0.2 + (1 - p.z));
          const rotated = rotate2d(p.x, p.y, swirlAngle);
          p.x = rotated.x;
          p.y = rotated.y;
        }

        p.x *= 1 - dt * 0.015;
        p.y *= 1 - dt * 0.015;

        const perspective = 1 / (p.z * 0.9 + 0.08);
        const tunnelScale =
          cfg.tunnelScale + spoolFactor * cfg.tunnelScaleSpoolBoost;
        let sx = cx + p.x * w * tunnelScale * perspective;
        let sy = cy + p.y * h * tunnelScale * perspective;
        const size =
          p.size *
          perspective *
          (0.45 + (1 - p.z)) *
          (1 + spoolFactor * cfg.sizeSpoolBoost);

        let dx = sx - cx;
        let dy = sy - cy;

        if (cfg.lensStrength !== 0) {
          const rNorm = Math.hypot(dx, dy) / Math.max(1, Math.min(w, h));
          const k = 1 + cfg.lensStrength * rNorm * rNorm;
          dx *= k;
          dy *= k;
        }

        if (cfg.cameraRoll !== 0) {
          const roll =
            cfg.cameraRoll *
            (0.35 + streakFactor * 0.8) *
            Math.sin(time * cfg.cameraRollRate + 1.7);
          const rotated = rotate2d(dx, dy, roll);
          dx = rotated.x;
          dy = rotated.y;
        }

        if (cfg.shake > 0) {
          const shakeAmp = cfg.shake * (0.12 + streakFactor * 0.88);
          dx += Math.sin(time * 32.1) * shakeAmp;
          dy += Math.sin(time * 27.7 + 1.3) * shakeAmp;
        }

        sx = cx + dx;
        sy = cy + dy;

        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) continue;

        const alphaBase = p.highlight ? 0.7 : 0.18;
        const alpha =
          alphaBase *
          (0.55 + (1 - p.z)) *
          (1 + spoolFactor * (p.highlight ? 1.2 : 0.4));

        const radiusPx = cfg.centerMaskRadius * Math.min(w, h);
        const softnessPx = Math.max(1, cfg.centerMaskSoftness * Math.min(w, h));
        const distPx = Math.hypot(dx, dy);
        const centerT = smoothstep(radiusPx, radiusPx + softnessPx, distPx);
        const centerMask = 1 - cfg.centerMaskStrength * (1 - centerT);
        const finalAlpha = alpha * centerMask;

        if (p.highlight) {
          const color = cfg.paletteStops[p.highlightIndex] ?? '#00e0ff';
          ctx.fillStyle = color + '';
          ctx.globalAlpha = Math.min(finalAlpha, 1);

          if (cfg.streakMode !== 'none' && streakFactor > 0.02) {
            if (cfg.streakMode === 'all' || p.highlight) {
              const dist = Math.hypot(dx, dy) || 1;
              const nx = dx / dist;
              const ny = dy / dist;
              const lineLen =
                cfg.streakLength *
                (0.45 + (1 - p.z) * 0.75) *
                perspective *
                streakFactor;
              ctx.strokeStyle = color;
              ctx.lineWidth = Math.max(0.75, size * 0.12);
              ctx.beginPath();
              ctx.moveTo(sx - nx * lineLen, sy - ny * lineLen);
              ctx.lineTo(sx, sy);
              ctx.stroke();
            }
          }

          ctx.shadowColor = color;
          ctx.shadowBlur = cfg.glowBase + streakFactor * cfg.glowSpoolBoost;
          ctx.font = `${Math.max(10, size * 9)}px var(--font-jetbrains-mono, monospace)`;
          ctx.fillText(p.glyph, sx, sy);

          if (cfg.chromaOffset > 0.05) {
            const chroma =
              cfg.chromaOffset * (0.6 + streakFactor * 0.9) * (0.7 + (1 - p.z));
            ctx.globalAlpha = Math.min(finalAlpha * 0.35, 0.6);
            ctx.shadowBlur = cfg.glowBase * 0.8;
            ctx.fillStyle = '#00e0ff';
            ctx.fillText(p.glyph, sx - chroma, sy);
            ctx.fillStyle = '#ff4ecd';
            ctx.fillText(p.glyph, sx + chroma, sy);
          }

          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(255,255,255,1)';
          ctx.globalAlpha = finalAlpha;

          if (cfg.streakMode === 'all' && streakFactor > 0.18) {
            const dist = Math.hypot(dx, dy) || 1;
            const nx = dx / dist;
            const ny = dy / dist;
            const lineLen =
              cfg.streakLength * 0.42 * perspective * (streakFactor - 0.1);
            ctx.fillRect(sx - nx * lineLen, sy - ny * lineLen, size, size);
          }

          ctx.fillRect(sx, sy, size, size);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    reduceMotionRef.current = prefersReducedMotion;

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (reduceMotionRef.current) return;

      const last = lastTimeRef.current || now;
      const dt = Math.min((now - last) / 1000, 0.033);
      lastTimeRef.current = now;
      drawFrame(now, dt);
    };

    if (prefersReducedMotion) {
      drawFrame(performance.now(), 0);
      return () => {
        ro.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
      };
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [baseCount, effectiveConfig]);

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
