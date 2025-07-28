#!/bin/bash

echo "🔍 Diagnosing JustEvery Asset Issues"
echo "===================================="

# Check if we can access the assets directly
echo -e "\n1. Testing direct R2 access:"
echo "Checking https://assets.justevery.com/video/promo-854w.mp4"
curl -I -s "https://assets.justevery.com/video/promo-854w.mp4" | head -10

echo -e "\n2. Checking if assets.justevery.com resolves:"
nslookup assets.justevery.com

echo -e "\n3. Testing if video loads through main domain:"
echo "Checking https://justevery.com/video/promo-854w.mp4"
curl -I -s "https://justevery.com/video/promo-854w.mp4" | head -10

echo -e "\n4. Checking current build output:"
if [ -d ".open-next/assets/video" ]; then
    echo "❌ WARNING: Video files found in build output!"
    ls -lh .open-next/assets/video/ | head -5
else
    echo "✅ No video files in build output"
fi

echo -e "\n5. Checking service worker registration:"
echo "The service worker at /sw.js might be caching incorrectly."
echo "Current check: url.hostname.includes('cloudflare')"
echo "Missing check: url.hostname.includes('assets.justevery.com')"

echo -e "\n6. Potential issues found:"
echo "- Service worker doesn't exclude assets.justevery.com from caching"
echo "- If assets.justevery.com is not a direct R2 domain, requests might route through Worker"
echo "- Browser cache might have stale entries"

echo -e "\n7. Recommended fixes:"
echo "a) Update service worker to exclude assets.justevery.com"
echo "b) Verify assets.justevery.com is configured as R2 custom domain (not Worker route)"
echo "c) Clear browser cache and service worker cache"
echo "d) Check Cloudflare dashboard for R2 custom domain configuration"