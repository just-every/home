# Serverless Deployment Fix - Video Files Causing Worker Crashes

## Root Cause Analysis

The site was failing after some time because:

1. **Video files were being included in the Worker bundle** - The `.open-next/assets` directory contained all video files (350MB+ total)
2. **Cloudflare Workers were trying to serve these large files** - Workers have memory and execution time limits
3. **The Worker would crash after serving a few requests** - Exhausting resources and causing "client-side exception" errors

## The Fix

### 1. Updated `package.json` build script

Changed:

```json
"build:cloudflare": "NODE_ENV=production opennextjs-cloudflare build"
```

To:

```json
"build:cloudflare": "NODE_ENV=production opennextjs-cloudflare build && find .open-next/assets -type f \\( -name '*.mp4' -o -name '*.webm' -o -name '*.mov' -o -name '*.avi' \\) -delete 2>/dev/null || true"
```

This ensures video files are removed from the Worker bundle after build, just like the preview command already does.

### 2. Deployment workflow already had cleanup

The GitHub Actions workflow already includes a cleanup step (lines 146-149) that removes video files before deployment.

## How It Works Now

1. **Videos are served directly from R2** via `https://assets.justevery.com`
2. **Worker only serves the application code** - No large video files
3. **R2 handles all video streaming** - Built for this purpose with no size limits

## Verification

After deployment:

- Worker bundle size should be under 25MB (without videos)
- Videos load from `assets.justevery.com` not `justevery.com`
- No more Worker crashes or resource exhaustion

## Important Notes

- Videos MUST be served from R2, never through the Worker
- The `assets.justevery.com` domain must be configured as a direct R2 custom domain
- Always exclude large media files from the Worker bundle
