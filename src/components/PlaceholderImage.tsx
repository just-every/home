import Image from 'next/image';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  className?: string;
}

export default function PlaceholderImage({
  width,
  height,
  text = 'Coming Soon',
  className = '',
}: PlaceholderImageProps) {
  const svgString = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00e0ff;stop-opacity:0.2" />
          <stop offset="50%" style="stop-color:#ff4ecd;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#ffb500;stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#0d0d0d"/>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="rgba(255,255,255,0.4)" font-family="system-ui" font-size="16">${text}</text>
    </svg>
  `;

  const base64 = Buffer.from(svgString).toString('base64');
  const dataUri = `data:image/svg+xml;base64,${base64}`;

  return (
    <Image
      src={dataUri}
      alt={text}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
}
