import { promises as fs } from 'fs';
import sharp from 'sharp';
import { vectorize } from '@neplex/vectorizer';

async function convertLogo() {
  try {
    // Read and preprocess the image
    const imageBuffer = await sharp('./public/img/logo.png')
      .trim()
      .flatten({ background: '#fff' })
      .resize({ width: 1400, withoutEnlargement: true })
      .toBuffer();

    // Vectorize with simpler options
    const svg = await vectorize(imageBuffer, {
      colorMode: 'color',
      colorPrecision: 8,
      filterSpeckle: 4,
      cornerThreshold: 60,
      lengthThreshold: 4,
      spliceThreshold: 45
    });

    // Write the SVG file
    await fs.writeFile('./public/logo.svg', svg, 'utf8');
    console.log('✓ Logo converted to SVG: ./public/logo.svg');
  } catch (error) {
    console.error('Error converting logo:', error);
  }
}

convertLogo();