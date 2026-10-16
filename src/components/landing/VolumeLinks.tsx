import { seedPages } from '../seed/model';

/**
 * Old `/#vol-<slug>` links (the collection once opened a product in a box on
 * the home page) now land on the seed's own page, `/<slug>`; a slug that
 * names no seed, and the old `/#all` anchor, land on /products. Runs before
 * first paint.
 */
export function VolumeLinks() {
  const slugs = JSON.stringify(seedPages.map(page => page.slug));
  const code = `(function(){var h=location.hash;if(h==='#all'){location.replace('/products');return}if(h.indexOf('#vol-')!==0)return;var s=decodeURIComponent(h.slice(5));location.replace(${slugs}.indexOf(s)<0?'/products':'/'+s)})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
