import { promises as fs } from 'node:fs';
import sharp from 'sharp';
import {
  vectorize,
  ColorMode,
  Hierarchical,
  PathSimplifyMode,
} from '@neplex/vectorizer';

/**
 * Convert any raster logo to SVG.
 * @param {string} inFile  Path to the PNG/JPG/etc.
 * @param {string} outFile Path where the .svg will be written.
 * @param {object} [opts]  Optional tweaks for Vectorizer.
 */
export async function rasterLogoToSvg(inFile, outFile, opts = {}) {
  // 1) Pre-process: trim, flatten onto white, upscale if tiny
  const prepped = await sharp(inFile)
    .trim()                        // remove excess whitespace
    .flatten({ background: '#fff' }) // kill alpha: makes thresholding easier
    .resize({ width: 1400, withoutEnlargement: true }) // smooth curves
    .toBuffer();

  // 2) Vectorise
  const svg = await vectorize(prepped, {
    // Good defaults; override via opts
    colorMode: ColorMode.Color,
    colorPrecision: 8,            // 2^8 = 256 colours max
    hierarchical: Hierarchical.Stacked,
    mode: PathSimplifyMode.Spline,
    filterSpeckle: 4,
    spliceThreshold: 45,
    cornerThreshold: 60,
    lengthThreshold: 4,
    ...opts,
  });

  await fs.writeFile(outFile, svg, 'utf8');
  return outFile;
}

/* -------- CLI convenience -------- */
if (process.argv.length >= 4 && import.meta.url === `file://${process.argv[1]}`) {
  rasterLogoToSvg(process.argv[2], process.argv[3])
    .then(() => console.log(`✓ Saved ${process.argv[3]}`))
    .catch(err => { console.error(err); process.exit(1); });
}