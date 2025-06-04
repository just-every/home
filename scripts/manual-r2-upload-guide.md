# Manual R2 Upload Guide

Since the API token seems to be having issues, here's how to manually upload the videos through the Cloudflare dashboard:

## Option 1: Use Cloudflare Dashboard

1. **Login to Cloudflare Dashboard**

   - Go to https://dash.cloudflare.com
   - Navigate to R2 → Overview

2. **Find your R2 bucket**

   - Look for a bucket named `justevery-assets` or similar
   - Click on the bucket name

3. **Upload videos manually**
   - Navigate to the `video/` folder (create it if it doesn't exist)
   - Click "Upload" button
   - Select all video files from `public/video/` folder
   - Upload them

## Option 2: Get a New API Token

Your current token appears truncated. A valid Cloudflare API token should look like:

```
c2547eb745079dac2fa0e1234567890abcdef1234567890abcdef
```

(40+ characters long)

### To get a new token:

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Create a new token with these permissions:
   - **Account** → Cloudflare Workers R2 Storage → Edit
   - **Zone** → Zone → Read
   - **Zone** → Cache Purge → Purge
3. Copy the ENTIRE token (it should be 40+ characters)

## Option 3: Use AWS CLI with R2

If you have AWS CLI installed, you can use R2's S3 compatibility:

1. Get your R2 API credentials from Cloudflare dashboard
2. Configure AWS CLI with R2 endpoint
3. Use `aws s3 sync` to upload files

## Files to Upload

Make sure these files are uploaded to the `video/` folder in your R2 bucket:

- promo-854w.mp4
- promo-854w.webm
- promo-1280w.mp4
- promo-1280w.webm
- promo-1920w.mp4
- promo-1920w.webm
- promo-2560w.mp4
- promo-2560w.webm
- promo-3840w.mp4
- promo-3840w.webm
- promo.vtt
- promo.srt (if exists)

## Verify Upload

After uploading, check if the files are accessible:

- https://assets.justevery.com/video/promo-854w.mp4
- https://assets.justevery.com/video/promo-3840w.webm

The files should download or play, not show LFS pointer text.
