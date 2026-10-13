import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

// `next dev` gets the Worker's bindings (D1, rate limiter, .dev.vars secrets)
// from wrangler.toml through a local Miniflare.
if (process.env.NODE_ENV === 'development') {
  void initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // `*.dev.tsx` pages are review tooling: served by `next dev`, never built.
  pageExtensions:
    process.env.NODE_ENV === 'development'
      ? ['dev.tsx', 'tsx', 'ts', 'jsx', 'js']
      : ['tsx', 'ts', 'jsx', 'js'],
  // Enable webpack hot module replacement in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
