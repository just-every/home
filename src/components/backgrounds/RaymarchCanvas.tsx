'use client';

import { useEffect, useRef } from 'react';
import type { RaymarchConfig } from '@/lib/backgrounds';

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function paletteId(p: RaymarchConfig['palette']) {
  if (p === 'infra') return 2;
  if (p === 'prismatic') return 1;
  return 0;
}

export function RaymarchCanvas({ config }: { config: RaymarchConfig }) {
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

    const gl = (canvas.getContext('webgl2', { alpha: true }) ||
      canvas.getContext('webgl', {
        alpha: true,
      })) as WebGL2RenderingContext | null;
    if (!gl) return;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr());
      const h = Math.floor(window.innerHeight * dpr());
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      gl.viewport(0, 0, w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const vert = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){
  v_uv = a_pos*0.5+0.5;
  gl_Position = vec4(a_pos,0.0,1.0);
}`;

    const frag = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_t;
uniform float u_intensity;
uniform float u_speed;
uniform float u_palette;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

vec3 pal(float t, float mode){
  // 0: cyan, 1: prismatic, 2: infra
  if(mode < 0.5){
    return vec3(0.1,0.8,1.0) * (0.55 + 0.45*sin(6.2831*(t+vec3(0.0,0.08,0.16))));
  }
  if(mode < 1.5){
    return 0.55 + 0.45*sin(6.2831*(t+vec3(0.0,0.33,0.67)));
  }
  return vec3(1.0,0.22,0.08) * (0.6 + 0.4*sin(6.2831*(t+vec3(0.0,0.2,0.35))));
}

// Signed distance to a twisting tunnel
float map(vec3 p){
  float t = u_t * u_speed;
  float a = 0.6*sin(t*0.9 + p.z*0.8);
  float c = cos(a);
  float s = sin(a);
  p.xy = mat2(c,-s,s,c)*p.xy;
  float r = length(p.xy);
  float tunnel = r - (0.35 + 0.08*sin(p.z*2.0 + t));
  float detail = 0.06*sin(p.z*8.0 + p.x*6.0 + t*1.7);
  return tunnel + detail;
}

vec3 shade(vec3 ro, vec3 rd){
  float t = u_t * u_speed;
  float dist = 0.0;
  float glow = 0.0;

  for(int i=0;i<64;i++){
    vec3 p = ro + rd*dist;
    float d = map(p);
    glow += exp(-abs(d)*18.0) * 0.02;
    dist += d;
    if(dist > 10.0) break;
  }

  float v = glow * (0.9 + 0.8*u_intensity);
  vec3 col = pal(v*0.35 + 0.15*sin(t*0.2), u_palette);
  col *= v;
  // Grain
  float g = noise(v_uv*u_res*0.006 + t*0.15);
  col *= 0.92 + 0.18*g;
  return col;
}

void main(){
  vec2 uv = (v_uv*2.0-1.0);
  uv.x *= u_res.x/u_res.y;
  float t = u_t*u_speed;
  vec3 ro = vec3(0.0, 0.0, t*1.6);
  vec3 rd = normalize(vec3(uv, 1.0));
  vec3 col = shade(ro, rd);

  // center legibility (darken)
  float r = length(uv);
  float mask = smoothstep(0.0, 0.52, r);
  col *= mix(0.42, 1.0, mask);

  gl_FragColor = vec4(col, 1.0);
}`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error('shader');
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(s) || 'compile failed';
        gl.deleteShader(s);
        throw new Error(info);
      }
      return s;
    };

    let program: WebGLProgram;
    try {
      const vs = compile(gl.VERTEX_SHADER, vert);
      const fs = compile(gl.FRAGMENT_SHADER, frag);
      const p = gl.createProgram();
      if (!p) throw new Error('program');
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || 'link failed');
      }
      program = p;
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    } catch {
      return () => ro.disconnect();
    }

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uT = gl.getUniformLocation(program, 'u_t');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uPalette = gl.getUniformLocation(program, 'u_palette');

    const intensity = clamp01(config.intensity);
    const speed = Math.max(0.25, config.speed);
    const palMode = paletteId(config.palette);

    const render = (t: number) => {
      resize();
      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform1f(uIntensity, intensity);
      gl.uniform1f(uSpeed, speed);
      gl.uniform1f(uPalette, palMode);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    if (reduceMotionRef.current) {
      render(performance.now() / 1000);
      return () => {
        ro.disconnect();
        gl.deleteProgram(program);
        if (buf) gl.deleteBuffer(buf);
      };
    }

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      render(now / 1000);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(program);
      if (buf) gl.deleteBuffer(buf);
    };
  }, [config.intensity, config.palette, config.speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  );
}
