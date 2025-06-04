# Deployment Guide

## Overview

This project is automatically deployed to Cloudflare Workers via GitHub Actions when you push to the `main` branch.

## Architecture

- **Application**: Hosted on Cloudflare Workers at `justevery.com`
- **Static Assets**: Served from Cloudflare R2 at `assets.justevery.com`
- **Videos**: Automatically excluded from Worker deployment (served from R2)

## Automatic Deployment

### Push to Main Branch

When you push to `main`, GitHub Actions will:

1. Check for changed assets in `public/video/`, `public/images/`, or `public/docs/`
2. Upload any changed assets to R2
3. Build the Next.js application
4. Deploy to Cloudflare Workers

### Manual Deployment

You can trigger a deployment manually:

1. Go to the GitHub Actions tab
2. Select "Deploy Production"
3. Click "Run workflow"

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for Cloudflare (local test)
npm run build:cloudflare

# Preview locally
npm run preview
```

## Asset Management

### Videos

- **Local**: Stored in `public/video/` for development
- **Production**: Served from `https://assets.justevery.com/video/`
- **Size Limit**: No limit on R2 (vs 25MB limit on Workers)

### How It Works

The `VideoPlayer` component automatically:

- Uses local files in development
- Uses R2 URLs in production (via `NEXT_PUBLIC_R2_PUBLIC_URL` env var)

## Environment Variables

### Production (set automatically)

```
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.justevery.com
NEXT_PUBLIC_R2_BUCKET_NAME=justevery-assets
```

### GitHub Secrets Required

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_ZONE_ID`: Your Cloudflare zone ID (for cache purging)

## R2 Configuration

### CORS Policy

The R2 bucket uses this CORS configuration:

```json
[
  {
    "AllowedOrigins": ["https://justevery.com", "https://www.justevery.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [
      "Content-Length",
      "Content-Type",
      "Content-Range",
      "Accept-Ranges"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

## Troubleshooting

### Videos not loading?

1. Check CORS configuration in R2 settings
2. Verify `assets.justevery.com` is properly configured
3. Check browser console for errors

### Deployment failed?

1. Check GitHub Actions logs
2. Verify GitHub secrets are set correctly
3. Ensure Cloudflare API token has correct permissions
