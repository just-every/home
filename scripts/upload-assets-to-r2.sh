#!/bin/bash

# Script to manually upload video assets to R2
# This ensures actual video files are uploaded, not LFS pointers

set -e

echo "🚀 Starting manual R2 asset upload..."

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ Error: Please set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables"
    echo "Usage: CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=xxx ./scripts/upload-assets-to-r2.sh"
    exit 1
fi

# Ensure we have the actual LFS files
echo "📥 Pulling Git LFS files..."
git lfs pull

# Verify videos are actual files
echo "🔍 Verifying video files..."
for file in public/video/*.mp4 public/video/*.webm; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$size" -lt 1000 ]; then
            echo "❌ Error: $file appears to be an LFS pointer (size: $size bytes)"
            exit 1
        else
            echo "✅ $file: $(($size / 1024 / 1024))MB"
        fi
    fi
done

# First, let's check what buckets exist
echo "📋 Checking R2 buckets..."
npx wrangler r2 bucket list

# Upload all video files
echo "📤 Uploading video files to R2..."
for file in public/video/*.{mp4,webm,vtt,srt}; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        size_mb=$(($size / 1024 / 1024))
        
        if [ "$size_mb" -gt 300 ]; then
            echo "⚠️  Skipping $filename (${size_mb}MB) - exceeds 300MB wrangler limit"
            echo "    Please upload this file manually through the Cloudflare dashboard"
            continue
        fi
        
        echo "Uploading $filename (${size_mb}MB)..."
        # Upload to remote R2
        npx wrangler r2 object put "justevery-assets/video/$filename" --file="$file" --remote || echo "Failed to upload $filename"
    fi
done

# Upload images if they exist
if [ -d "public/images" ]; then
    echo "📤 Uploading image files to R2..."
    for file in public/images/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "Uploading image: $filename..."
            npx wrangler r2 object put "justevery-assets/images/$filename" --file="$file" --remote
        fi
    done
fi

# Verify upload
echo "🔍 Verifying uploads..."
if npx wrangler r2 object get "justevery-assets/video/promo-854w.mp4" --remote --pipe > /dev/null 2>&1; then
    echo "✅ R2 uploads verified successfully"
    
    # List objects to confirm
    echo "📋 Listing uploaded video files:"
    npx wrangler r2 object list "justevery-assets" --prefix="video/"
else
    echo "❌ Failed to verify R2 uploads"
    echo "📋 Attempting to list R2 buckets and objects..."
    npx wrangler r2 bucket list
    exit 1
fi

echo "✨ Asset upload complete!"
echo "🌐 Videos should now be available at https://assets.justevery.com/video/"