const r2PublicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '').replace(
  /\/+$/,
  ''
);

export function assetUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!r2PublicUrl) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${r2PublicUrl}${normalizedPath}`;
}
