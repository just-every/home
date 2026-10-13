import {
  MathUtils,
  type PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

import { buildShelf, lights, type Shelf, type ShelfPrint } from './build';
import { CLIP, FRAME } from './camera';
import {
  type Framing,
  frameRow,
  makeCamera,
  poseCamera,
  slotT,
  slotX,
  viewWindow,
  VOLUME,
} from './layout';
import { Lens } from './lens';
import { coverTexture, loadMark, type Mark, spineTexture } from './prints';
import type { ShelfVolume } from './types';

/** Idle drift and pointer parallax, in degrees; together they stay within 6. */
const DRIFT = { yaw: 2.2, pitch: 0.5, yawPeriod: 28, pitchPeriod: 21 };
const PARALLAX = { yaw: 3.4, pitch: 1.1 };
const LIMIT = 6;
const MAX_PIXEL_RATIO = 2;
/** Prints are sized for at least the hero's width (749 CSS px). */
const HERO_WIDTH = 749;

export interface ShelfStats {
  /** ms from engine start to the first rendered frame. */
  firstFrameMs: number | null;
  /** performance.now() of the first rendered frame. */
  firstFrameAt: number | null;
  frames: number;
  /** Mean CPU time of the last 120 draws (ms). */
  drawMs: number;
  /** Mean interval between the last 120 animation frames (ms). */
  frameIntervalMs: number;
  running: boolean;
  animating: boolean;
  pixelRatio: number;
  size: [number, number];
}

/** What the review tooling can reach through the `shelf3d-ready` event. */
export interface ShelfHandle {
  stats(): ShelfStats;
  /** Draw `frames` frames back to back, waiting for the GPU each time. */
  bench(frames: number): number;
  setOrbit(yawDeg: number, pitchDeg?: number): void;
  render(): void;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

const UP = new Vector3(0, 1, 0);
const mean = (values: number[]) =>
  values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;

export class ShelfEngine {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = makeCamera();
  private readonly lens: Lens;
  private readonly framing: Framing;
  private readonly ordered: ShelfVolume[];
  private readonly raycaster = new Raycaster();
  private readonly pointer = new Vector2();
  private readonly startedAt = performance.now();
  private shelf: Shelf | null = null;
  private disposed = false;

  private width = 1;
  private height = 1;
  private pixelRatio = 1;

  private raf = 0;
  private last = 0;
  private dirty = true;
  private onscreen = false;
  private pageVisible = !document.hidden;
  private reduced: boolean;
  private clock = 0;
  private pinned: { yaw: number; pitch: number } | null = null;
  private yaw = 0;
  private pitch = 0;
  private parallaxTarget = new Vector2();
  private parallax = new Vector2();

  private hovered: string | null = null;
  private focused: string | null = null;
  private pressed: { slug: string; x: number; y: number } | null = null;
  private shownTag: HTMLAnchorElement | null = null;

  private frames = 0;
  private firstFrameAt: number | null = null;
  private draws: number[] = [];
  private intervals: number[] = [];
  private animating = false;

  private readonly cleanups: (() => void)[] = [];

  constructor(
    private readonly host: HTMLElement,
    private readonly canvas: HTMLCanvasElement,
    volumes: ShelfVolume[],
    featured: string
  ) {
    const lead = volumes.find(volume => volume.slug === featured) ?? volumes[0];
    this.ordered = lead
      ? [lead, ...volumes.filter(volume => volume !== lead)]
      : [];
    this.framing = frameRow(this.ordered.length);

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);

    this.lens = new Lens({
      focus: 6,
      blur: 10,
      maxBlur: 5,
      fadeFrom: 9.5,
      fadeTo: 22,
      fadeFloor: 0.2,
    });
    this.focusLens();

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = motion.matches;
    this.listen(motion, 'change', () => {
      this.reduced = motion.matches;
      this.invalidate();
    });

    this.resize();
    this.pose();
  }

  /** Load the prints, build the scene and draw the first frame. */
  async start() {
    const family =
      getComputedStyle(this.host).fontFamily || 'system-ui, sans-serif';
    await Promise.all(
      ['400', '650', '300'].map(weight =>
        document.fonts.load(
          `${weight} 32px ${family}`,
          'JustEvery_ 0123456789 HappyToHelp'
        )
      )
    );
    const marks = await Promise.all(
      this.ordered.map(volume =>
        loadMark(volume.mark, volume.ink).catch((error: unknown) => {
          console.error(error);
          return null as Mark;
        })
      )
    );
    if (this.disposed) return;

    this.shelf = buildShelf(this.paint(family, marks));
    this.scene.add(this.shelf.root, ...lights());
    this.wire();
    this.draw();
    this.request();
  }

  /** Paint each volume's prints at the size the camera sees them. */
  private paint(family: string, marks: Mark[]): ShelfPrint[] {
    const anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    const minWidth = HERO_WIDTH * this.pixelRatio;
    const scale = Math.max(1, minWidth / (this.width * this.pixelRatio));
    const tall = (x: number, z: number) => {
      const top = new Vector3(x, VOLUME.h, z).project(this.camera);
      const foot = new Vector3(x, 0, z).project(this.camera);
      return ((top.y - foot.y) / 2) * this.height * this.pixelRatio * scale;
    };
    const faceH = VOLUME.h - VOLUME.bevel * 2;
    return this.ordered.map((volume, slot) => {
      const mark = marks[slot];
      if (slot === 0) {
        const h = MathUtils.clamp(tall(0, 0) * 1.3, 256, 1400);
        const w = (h * (VOLUME.d - VOLUME.bevel * 2)) / faceH;
        return {
          colour: volume.colour,
          spine: null,
          cover: coverTexture(volume, mark, family, w, h, anisotropy),
        };
      }
      const h = MathUtils.clamp(tall(slotX(slot), 0) * 1.3, 160, 1400);
      const w = (h * (slotT(slot) - VOLUME.bevel * 2)) / faceH;
      return {
        colour: volume.colour,
        spine: spineTexture(volume, mark, family, w, h, anisotropy),
        cover: null,
      };
    });
  }

  /** Sharp through the featured box and the first volumes, softer behind. */
  private focusLens() {
    poseCamera(this.camera, this.framing.orbit);
    const depth = (x: number, z: number) =>
      -new Vector3(x, VOLUME.h / 2, z).applyMatrix4(
        this.camera.matrixWorldInverse
      ).z;
    const cover = Math.max(depth(0, 0), depth(0, -VOLUME.d));
    this.lens.set({ focus: cover + 0.35 });
  }

  // ---------------------------------------------------------------- camera

  private pose() {
    const { camera, framing } = this;
    poseCamera(camera, framing.orbit);
    const yaw = MathUtils.clamp(this.yaw, -LIMIT, LIMIT);
    const pitch = MathUtils.clamp(this.pitch, -LIMIT, LIMIT);
    if (yaw || pitch) {
      const turn = new Quaternion().setFromAxisAngle(
        UP,
        MathUtils.degToRad(yaw)
      );
      const right = new Vector3(1, 0, 0).applyQuaternion(
        turn.clone().multiply(camera.quaternion)
      );
      const tilt = new Quaternion().setFromAxisAngle(
        right,
        MathUtils.degToRad(-pitch)
      );
      const rotation = tilt.multiply(turn);
      camera.position
        .sub(framing.pivot)
        .applyQuaternion(rotation)
        .add(framing.pivot);
      camera.quaternion.premultiply(rotation);
    }
    camera.updateMatrixWorld(true);
  }

  private resize() {
    const width = Math.max(1, this.host.clientWidth);
    const height = Math.max(1, this.host.clientHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    this.width = width;
    this.height = height;
    this.pixelRatio = ratio;
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height, false);
    this.lens.setSize(
      Math.round(width * ratio),
      Math.round(height * ratio),
      ratio
    );
    const view = viewWindow(width / height, this.framing.shift);
    this.camera.aspect = FRAME.w / FRAME.h;
    this.camera.near = CLIP.near;
    this.camera.far = CLIP.far;
    this.camera.setViewOffset(FRAME.w, FRAME.h, view.x, view.y, view.w, view.h);
    this.camera.updateProjectionMatrix();
    this.invalidate();
  }

  // ------------------------------------------------------------ the loop

  private get running() {
    return this.onscreen && this.pageVisible && !this.disposed;
  }

  private get motion() {
    return !this.reduced && !this.pinned;
  }

  invalidate() {
    this.dirty = true;
    this.request();
  }

  private request() {
    if (this.raf || !this.running || !this.shelf) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    this.raf = 0;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    if (this.animating)
      this.intervals = [...this.intervals.slice(-119), now - this.last];
    this.last = now;
    this.animating = this.step(dt);
    if (this.dirty || this.animating) this.draw();
    if (this.animating) this.request();
  };

  /** Advance drift, parallax and lifts; true while anything still moves. */
  private step(dt: number) {
    const shelf = this.shelf;
    if (!shelf) return false;
    let moving = false;
    if (this.pinned) {
      this.yaw = this.pinned.yaw;
      this.pitch = this.pinned.pitch;
    } else if (this.motion) {
      this.clock += dt;
      const ease = 1 - Math.exp(-dt * 2.6);
      this.parallax.lerp(this.parallaxTarget, ease);
      const tau = Math.PI * 2;
      this.yaw =
        DRIFT.yaw * Math.sin((tau * this.clock) / DRIFT.yawPeriod) +
        this.parallax.x * PARALLAX.yaw;
      this.pitch =
        DRIFT.pitch * Math.sin((tau * this.clock) / DRIFT.pitchPeriod) +
        this.parallax.y * PARALLAX.pitch;
      moving = true;
    } else {
      this.yaw = 0;
      this.pitch = 0;
    }

    const active = this.focused ?? this.hovered;
    const ease = 1 - Math.exp(-dt * 11);
    for (const node of shelf.nodes) {
      const slug = node.volume >= 0 ? this.ordered[node.volume].slug : null;
      node.liftTarget = this.motion && slug !== null && slug === active ? 1 : 0;
      if (!this.motion) node.lift = node.liftTarget;
      else if (Math.abs(node.liftTarget - node.lift) > 0.002) {
        node.lift += (node.liftTarget - node.lift) * ease;
        moving = true;
      } else node.lift = node.liftTarget;
    }
    shelf.place();
    this.pose();
    this.placeTag();
    return moving;
  }

  private draw() {
    const begin = performance.now();
    this.lens.render(this.renderer, this.scene, this.camera);
    this.draws = [...this.draws.slice(-119), performance.now() - begin];
    this.dirty = false;
    this.frames += 1;
    if (this.firstFrameAt === null) {
      this.firstFrameAt = performance.now();
      this.host.dataset.ready = '';
      this.host.dispatchEvent(
        new CustomEvent<ShelfHandle>('shelf3d-ready', {
          bubbles: true,
          detail: this.handle(),
        })
      );
    }
  }

  // ------------------------------------------------------- interaction

  private listen<T extends EventTarget>(
    target: T,
    type: string,
    handler: (event: Event) => void,
    options?: AddEventListenerOptions
  ) {
    target.addEventListener(type, handler, options);
    this.cleanups.push(() =>
      target.removeEventListener(type, handler, options)
    );
  }

  private links() {
    const shell = this.host.closest('[data-shelf]');
    return shell
      ? Array.from(shell.querySelectorAll<HTMLAnchorElement>('a[data-slug]'))
      : [];
  }

  private link(slug: string | null) {
    return slug
      ? (this.links().find(el => el.dataset.slug === slug) ?? null)
      : null;
  }

  private wire() {
    const visibility = new IntersectionObserver(([entry]) => {
      this.onscreen = entry.isIntersecting;
      if (this.onscreen) this.invalidate();
    });
    visibility.observe(this.host);
    this.cleanups.push(() => visibility.disconnect());

    const size = new ResizeObserver(() => this.resize());
    size.observe(this.host);
    this.cleanups.push(() => size.disconnect());

    this.listen(document, 'visibilitychange', () => {
      this.pageVisible = !document.hidden;
      if (this.pageVisible) this.invalidate();
    });

    this.listen(
      window,
      'pointermove',
      event => {
        const { clientX, clientY, pointerType } = event as PointerEvent;
        if (pointerType !== 'mouse' || !this.running) return;
        const box = this.host.getBoundingClientRect();
        const nx =
          (clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
        const ny =
          (clientY - (box.top + box.height / 2)) / (window.innerHeight / 2);
        this.parallaxTarget.set(
          MathUtils.clamp(nx, -1, 1),
          MathUtils.clamp(ny, -1, 1)
        );
      },
      { passive: true }
    );

    this.listen(this.canvas, 'pointermove', event =>
      this.hover(event as PointerEvent)
    );
    this.listen(this.canvas, 'pointerleave', () => this.setHover(null));
    this.listen(this.canvas, 'pointerdown', event => {
      const { clientX, clientY } = event as PointerEvent;
      const slug = this.pick(clientX, clientY);
      this.pressed = slug ? { slug, x: clientX, y: clientY } : null;
    });
    this.listen(this.canvas, 'pointerup', event => {
      const { clientX, clientY } = event as PointerEvent;
      const pressed = this.pressed;
      this.pressed = null;
      if (!pressed || Math.hypot(clientX - pressed.x, clientY - pressed.y) > 8)
        return;
      if (this.pick(clientX, clientY) !== pressed.slug) return;
      this.open(pressed.slug);
    });

    const shell = this.host.closest('[data-shelf]');
    if (shell) {
      this.listen(shell, 'focusin', event => {
        const slug = (event.target as HTMLElement).dataset?.slug ?? null;
        this.focused = slug;
        this.invalidate();
      });
      this.listen(shell, 'focusout', () => {
        this.focused = null;
        this.invalidate();
      });
    }
  }

  private pick(clientX: number, clientY: number) {
    const shelf = this.shelf;
    if (!shelf) return null;
    const box = this.canvas.getBoundingClientRect();
    this.pointer.set(
      ((clientX - box.left) / box.width) * 2 - 1,
      -((clientY - box.top) / box.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(shelf.pickables, false)[0];
    if (!hit) return null;
    const node = shelf.nodes[hit.object.userData.node as number];
    return node && node.volume >= 0 ? this.ordered[node.volume].slug : null;
  }

  private hover(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    this.setHover(this.pick(event.clientX, event.clientY));
  }

  private setHover(slug: string | null) {
    if (slug === this.hovered) return;
    this.hovered = slug;
    this.canvas.style.cursor = slug ? 'pointer' : '';
    this.invalidate();
  }

  private open(slug: string) {
    const link = this.link(slug);
    if (link) link.click();
    else {
      const volume = this.ordered.find(item => item.slug === slug);
      if (volume) window.location.assign(volume.href);
    }
  }

  /** Show the active volume's link as its name tag, over its spine. */
  private placeTag() {
    const shelf = this.shelf;
    const active = this.focused ?? this.hovered;
    const link = this.link(active);
    if (this.shownTag && this.shownTag !== link) {
      delete this.shownTag.dataset.active;
      this.shownTag = null;
    }
    if (!link || !shelf) return;
    const node = shelf.nodes.find(
      item => item.volume >= 0 && this.ordered[item.volume].slug === active
    );
    if (!node) return;
    const point = shelf.anchor(node).project(this.camera);
    const shell = link.offsetParent as HTMLElement | null;
    const hostBox = this.host.getBoundingClientRect();
    const shellBox = shell?.getBoundingClientRect() ?? hostBox;
    const x =
      hostBox.left - shellBox.left + ((point.x + 1) / 2) * hostBox.width;
    const y = hostBox.top - shellBox.top + ((1 - point.y) / 2) * hostBox.height;
    link.style.setProperty('--tag-x', `${x.toFixed(1)}px`);
    link.style.setProperty('--tag-y', `${y.toFixed(1)}px`);
    link.dataset.active = '';
    this.shownTag = link;
  }

  // ------------------------------------------------------------ tooling

  private handle(): ShelfHandle {
    return {
      stats: () => ({
        firstFrameMs:
          this.firstFrameAt === null
            ? null
            : this.firstFrameAt - this.startedAt,
        firstFrameAt: this.firstFrameAt,
        frames: this.frames,
        drawMs: mean(this.draws),
        frameIntervalMs: mean(this.intervals),
        running: this.running,
        animating: this.animating,
        pixelRatio: this.pixelRatio,
        size: [this.width, this.height],
      }),
      bench: (frames: number) => {
        const gl = this.renderer.getContext();
        gl.finish();
        const begin = performance.now();
        for (let i = 0; i < frames; i += 1) {
          this.clock += 1 / 60;
          this.step(1 / 60);
          this.lens.render(this.renderer, this.scene, this.camera);
          gl.finish();
        }
        return (performance.now() - begin) / frames;
      },
      setOrbit: (yawDeg: number, pitchDeg = 0) => {
        this.pinned = { yaw: yawDeg, pitch: pitchDeg };
        this.step(0);
        this.draw();
      },
      render: () => {
        this.step(0);
        this.draw();
      },
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    };
  }

  dispose() {
    this.disposed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.cleanups.forEach(cleanup => cleanup());
    if (this.shownTag) delete this.shownTag.dataset.active;
    this.shelf?.dispose();
    this.lens.dispose();
    this.renderer.dispose();
  }
}
