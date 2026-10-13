'use client';

import { useEffect, useState } from 'react';

import { Shelf } from '@/components/variants/label/shelf3d/Shelf';
import type { ShelfHandle } from '@/components/variants/label/shelf3d/engine';
import type { ShelfVolume } from '@/components/variants/label/shelf3d/types';

interface ReviewSpec {
  volumes: ShelfVolume[];
  featured: string;
}

/** What review tooling (scripts/render-shelf.mjs, `12ui scene capture`) reads. */
interface ReviewWindow {
  /** Set by tooling before the page loads, to render other volume sets. */
  __shelfReview?: ReviewSpec;
  /** The set on screen. */
  __shelfSpec?: ReviewSpec;
  __shelf?: ShelfHandle & { count: number };
  __scene?: object;
  __ready?: boolean;
}

/**
 * The shelf as the review route shows it. Tooling may inject another set of
 * volumes (scripts/render-shelf.mjs generates the 30 and 60 growth sets), and
 * reaches the live scene through the `shelf3d-ready` event.
 */
export function ReviewShelf(props: ReviewSpec) {
  const [spec, setSpec] = useState<ReviewSpec>(props);

  useEffect(() => {
    const injected = (window as ReviewWindow).__shelfReview;
    if (injected) setSpec(injected);
  }, []);

  useEffect(() => {
    (window as ReviewWindow).__shelfSpec = spec;
  }, [spec]);

  useEffect(() => {
    const view = window as ReviewWindow;
    const onReady = (event: Event) => {
      const handle = (event as CustomEvent<ShelfHandle>).detail;
      const count = (event.target as HTMLElement)
        .closest('[data-shelf]')
        ?.querySelectorAll('a[data-slug]').length;
      view.__shelf = { ...handle, count: count ?? 0 };
      // The `12ui scene capture` contract.
      view.__scene = {
        scene: handle.scene,
        camera: handle.camera,
        renderer: handle.renderer,
        actions: [],
        setOrbit: (azimuth: number, elevation = 0) =>
          handle.setOrbit(azimuth, elevation),
        setAction: () => undefined,
        setVisible: (pattern: string, on = true) => {
          let found = 0;
          handle.scene.traverse(node => {
            if (node.name.includes(pattern)) {
              node.visible = on;
              found += 1;
            }
          });
          handle.render();
          return found;
        },
        names: () => {
          const names: string[] = [];
          handle.scene.traverse(node => {
            if (node.name) names.push(node.name);
          });
          return names;
        },
        reset: () => handle.setOrbit(0, 0),
        render: () => handle.render(),
      };
      view.__ready = true;
    };
    document.addEventListener('shelf3d-ready', onReady);
    return () => document.removeEventListener('shelf3d-ready', onReady);
  }, []);

  return <Shelf volumes={spec.volumes} featured={spec.featured} />;
}
