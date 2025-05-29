import { promises as fs } from 'fs';
import sharp from 'sharp';
import potrace from 'potrace';
import { promisify } from 'util';

const trace = promisify(potrace.trace);

async function convertLogoToSvg() {
  try {
    // First, preprocess the image with sharp
    console.log('Preprocessing image...');
    const preprocessed = await sharp('./public/img/logo.png')
      .trim()
      .greyscale() // Convert to grayscale for better tracing
      .resize({ width: 800, withoutEnlargement: true })
      .toFile('./public/img/logo-preprocessed.png');

    // Trace the preprocessed image
    console.log('Converting to SVG...');
    const svg = await trace('./public/img/logo-preprocessed.png', {
      color: '#000000',
      threshold: 128,
      turdSize: 2,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      alphaMax: 1,
      optCurve: true,
      optTolerance: 0.2
    });

    // Save the SVG
    await fs.writeFile('./public/logo.svg', svg, 'utf8');
    console.log('✓ Logo converted to SVG: ./public/logo.svg');

    // Clean up preprocessed file
    await fs.unlink('./public/img/logo-preprocessed.png');
  } catch (error) {
    console.error('Error converting logo:', error);
  }
}

convertLogoToSvg();