import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
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
  // Exclude large video files from static file copying in production
  // Videos are served from R2 CDN
  outputFileTracingExcludes: {
    '*': ['public/video/*.mp4', 'public/video/*.webm'],
  },
};

export default nextConfig;
