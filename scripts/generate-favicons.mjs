import sharp from 'sharp';
import { promises as fs } from 'fs';

async function generateFavicons() {
  // Create a base image with the slanted dash
  const svgBuffer = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#00e0ff;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#ff4ecd;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffb500;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="512" height="512" fill="#050505"/>
      <!-- Slanted dash - larger version -->
      <path d="M 64 352 L 112 288 L 400 288 L 448 352 L 400 416 L 112 416 Z" fill="url(#dashGradient)"/>
      <!-- Subtle glow effect -->
      <path d="M 64 352 L 112 288 L 400 288 L 448 352 L 400 416 L 112 416 Z" fill="url(#dashGradient)" opacity="0.3" filter="blur(12px)"/>
    </svg>
  `);

  // Generate different sizes
  const sizes = [16, 32, 192, 512];
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/favicon-${size}x${size}.png`);
    console.log(`✓ Generated favicon-${size}x${size}.png`);
  }

  // Generate the main favicon.ico (using 32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('./public/favicon.png');
  
  console.log('✓ All favicons generated');
}

generateFavicons().catch(console.error);