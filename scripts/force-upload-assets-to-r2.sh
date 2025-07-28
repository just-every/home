#!/bin/bash

# Force upload all assets to R2 - useful for recovery
# This script uploads ALL assets regardless of whether they already exist

set -e

echo "🚀 Force uploading all assets to R2..."

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set"
    echo "Set them with:"
    echo "  export CLOUDFLARE_API_TOKEN='your-token'"
    echo "  export CLOUDFLARE_ACCOUNT_ID='your-account-id'"
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing wrangler..."
    npm install -g wrangler
fi

# Pull LFS files
echo "📥 Pulling Git LFS files..."
git lfs pull || echo "Warning: Git LFS pull failed - continuing anyway"

# Verify video files are actual files, not pointers
echo "🔍 Verifying video files..."
for file in public/video/*.mp4 public/video/*.webm; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -lt 1000 ]; then
            echo "❌ Error: $file appears to be an LFS pointer (size: $size bytes)"
            echo "Please run 'git lfs pull' first"
            exit 1
        else
            echo "✅ $file: $(($size / 1024 / 1024))MB"
        fi
    fi
done

# Upload all video files
echo "📤 Uploading video files..."
VIDEO_COUNT=0
for file in public/video/*.{mp4,webm,vtt,srt,jpg}; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Uploading $filename..."
        if wrangler r2 object put "justevery-assets/video/$filename" --file="$file" --remote; then
            echo "✅ Uploaded $filename"
            VIDEO_COUNT=$((VIDEO_COUNT + 1))
        else
            echo "❌ Failed to upload $filename"
        fi
    fi
done

# Upload images if they exist
IMAGE_COUNT=0
if [ -d "public/images" ]; then
    echo "📤 Uploading image files..."
    for file in public/images/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "Uploading image: $filename..."
            if wrangler r2 object put "justevery-assets/images/$filename" --file="$file" --remote; then
                echo "✅ Uploaded $filename"
                IMAGE_COUNT=$((IMAGE_COUNT + 1))
            else
                echo "❌ Failed to upload $filename"
            fi
        fi
    done
fi

# Verify critical assets
echo "🔍 Verifying critical assets..."
VERIFICATION_FAILED=0

# Check key video files
for video in "promo-854w.mp4" "promo-1280w.mp4" "promo-1920w.mp4"; do
    if wrangler r2 object get "justevery-assets/video/$video" --remote --pipe > /dev/null 2>&1; then
        echo "✅ Verified: $video"
    else
        echo "❌ Failed to verify: $video"
        VERIFICATION_FAILED=1
    fi
done

# Summary
echo ""
echo "📊 Upload Summary:"
echo "- Videos uploaded: $VIDEO_COUNT"
echo "- Images uploaded: $IMAGE_COUNT"

if [ "$VERIFICATION_FAILED" -eq 0 ]; then
    echo "✅ All critical assets verified successfully!"
    echo "🌐 Videos should now be available at https://assets.justevery.com/video/"
else
    echo "⚠️  Some assets failed verification. Check the logs above."
    exit 1
fi

# List uploaded files
echo ""
echo "📋 Listing uploaded video files:"
wrangler r2 object list "justevery-assets" --prefix="video/" || echo "Failed to list objects"