import {
  BufferGeometry,
  DepthTexture,
  Float32BufferAttribute,
  HalfFloatType,
  Mesh,
  OrthographicCamera,
  type PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  type WebGLRenderer,
  WebGLRenderTarget,
} from 'three';

/**
 * The camera's lens: the scene renders into a multisampled target, then one
 * full-screen pass blurs it by depth (a single-pass gather bokeh) and fades
 * the far end into the page. Sharp near volumes never smear over the blurred
 * ones behind them, and blurred ones never bleed onto sharp ones. Colour stays
 * premultiplied throughout, so the canvas composites over any page background.
 */
export interface LensSettings {
  /** View depth that stays perfectly sharp (scene units). */
  focus: number;
  /** Blur radius at infinite depth, in CSS px (scaled by the pixel ratio). */
  blur: number;
  /** Largest blur radius, CSS px. */
  maxBlur: number;
  /** View depths where the fade into the page starts and ends. */
  fadeFrom: number;
  fadeTo: number;
  /** Opacity left at `fadeTo`. */
  fadeFloor: number;
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const fragmentShader = /* glsl */ `
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uTexel;
uniform float uNear;
uniform float uFar;
uniform float uFocus;
uniform float uBlur;
uniform float uMaxBlur;
uniform vec3 uFade;
varying vec2 vUv;

const float GOLDEN = 2.39996323;
const float STEP = 0.75;

float depthAt(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  return (uNear * uFar) / (uFar - (uFar - uNear) * d);
}
float cocAt(float z) {
  return min(uBlur * max(0.0, 1.0 - uFocus / z), uMaxBlur);
}
float fadeAt(float z) {
  return mix(1.0, uFade.z, smoothstep(uFade.x, uFade.y, z));
}
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  float z = depthAt(vUv);
  float size = cocAt(z);
  vec4 color = texture2D(tColor, vUv) * fadeAt(z);
  if (size > 0.5) {
    float total = 1.0;
    float radius = STEP;
    float angle = 0.0;
    for (int i = 0; i < 64; i++) {
      if (radius >= uMaxBlur) break;
      vec2 uv = vUv + vec2(cos(angle), sin(angle)) * uTexel * radius;
      float sz = depthAt(uv);
      vec4 sampleColor = texture2D(tColor, uv) * fadeAt(sz);
      float sampleSize = cocAt(sz);
      if (sz > z) sampleSize = min(sampleSize, size * 2.0);
      float m = smoothstep(radius - 0.5, radius + 0.5, sampleSize);
      color += mix(color / total, sampleColor, m);
      total += 1.0;
      radius += STEP / radius;
      angle += GOLDEN;
    }
    color /= total;
  }
  float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  float alpha = clamp(color.a + noise / 255.0, 0.0, 1.0);
  vec3 rgb = color.a > 0.0001 ? toSRGB(clamp(color.rgb / color.a, 0.0, 1.0)) : vec3(0.0);
  rgb += noise / 255.0;
  gl_FragColor = vec4(rgb * alpha, alpha);
}`;

export class Lens {
  readonly target: WebGLRenderTarget;
  private readonly material: ShaderMaterial;
  private readonly pass = new Scene();
  private readonly passCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private pixelRatio = 1;

  constructor(private settings: LensSettings) {
    this.target = new WebGLRenderTarget(2, 2, {
      type: HalfFloatType,
      samples: 4,
      depthTexture: new DepthTexture(2, 2),
    });
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tColor: { value: this.target.texture },
        tDepth: { value: this.target.depthTexture },
        uTexel: { value: new Vector2(0.5, 0.5) },
        uNear: { value: 0.5 },
        uFar: { value: 80 },
        uFocus: { value: settings.focus },
        uBlur: { value: settings.blur },
        uMaxBlur: { value: settings.maxBlur },
        uFade: {
          value: new Vector3(
            settings.fadeFrom,
            settings.fadeTo,
            settings.fadeFloor
          ),
        },
      },
    });
    const triangle = new BufferGeometry();
    triangle.setAttribute(
      'position',
      new Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)
    );
    const mesh = new Mesh(triangle, this.material);
    mesh.frustumCulled = false;
    this.pass.add(mesh);
  }

  set(settings: Partial<LensSettings>) {
    this.settings = { ...this.settings, ...settings };
    this.applySettings();
  }

  setSize(width: number, height: number, pixelRatio: number) {
    this.pixelRatio = pixelRatio;
    this.target.setSize(width, height);
    this.material.uniforms.uTexel.value.set(1 / width, 1 / height);
    this.applySettings();
  }

  private applySettings() {
    const { uniforms } = this.material;
    const s = this.settings;
    uniforms.uFocus.value = s.focus;
    uniforms.uBlur.value = s.blur * this.pixelRatio;
    uniforms.uMaxBlur.value = s.maxBlur * this.pixelRatio;
    uniforms.uFade.value.set(s.fadeFrom, s.fadeTo, s.fadeFloor);
  }

  render(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    this.material.uniforms.uNear.value = camera.near;
    this.material.uniforms.uFar.value = camera.far;
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(this.pass, this.passCamera);
  }

  dispose() {
    this.target.depthTexture?.dispose();
    this.target.dispose();
    this.material.dispose();
    this.pass.traverse(node => {
      if (node instanceof Mesh) node.geometry.dispose();
    });
  }
}
