# Caching and Routing Analysis for JustEvery Assets

## Potential Issues Identified

### 1. Service Worker Caching

- **Issue**: The service worker wasn't excluding `assets.justevery.com` from caching
- **Fixed**: Updated to exclude `assets.justevery.com` from service worker cache
- **Impact**: Browsers might cache failed responses or route assets incorrectly

### 2. Asset Routing Configuration

**Critical Question**: Is `assets.justevery.com` configured as a direct R2 custom domain or is it routing through the Worker?

If `assets.justevery.com` routes through the Worker:

- Initial requests work (Worker is fresh)
- Worker exhausts resources serving large videos
- Subsequent requests fail
- This would explain the delayed failure pattern

### 3. Browser/CDN Caching of Failed Responses

If the Worker fails and returns error responses, these might be cached by:

- Browser cache
- Service worker cache (now fixed)
- Cloudflare's edge cache
- Any intermediate CDN layers

## Diagnostic Steps

1. **Check R2 Custom Domain Configuration**

   - Log into Cloudflare Dashboard
   - Navigate to R2 → Your Bucket → Settings
   - Verify `assets.justevery.com` is configured as a PUBLIC custom domain
   - Ensure it's NOT configured as a Worker route

2. **Test Direct Access**

   ```bash
   # Test if assets are accessible directly
   curl -I https://assets.justevery.com/video/promo-854w.mp4

   # Check response headers for caching directives
   curl -I https://justevery.com/ | grep -i cache
   ```

3. **Check Worker Routes**
   - In Cloudflare Dashboard → Workers & Pages
   - Check if `assets.justevery.com/*` is listed as a route
   - It should NOT be there - assets should bypass Workers entirely

## Solutions

### Option 1: Ensure Direct R2 Access (Recommended)

1. Configure `assets.justevery.com` as R2 public custom domain
2. Remove any Worker routes for `assets.justevery.com`
3. Update DNS to point directly to R2

### Option 2: Add Cache Headers

If assets must go through Worker, add headers to prevent caching of errors:

```javascript
// In Worker response
headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
```

### Option 3: Implement Health Checks

Add a health check endpoint that verifies:

- Worker memory usage
- Asset availability
- Response times

## Immediate Actions

1. **Clear all caches**:

   - Cloudflare cache purge (already in deployment)
   - Increment service worker version to force update
   - Add cache-busting query params to video URLs

2. **Verify routing**:

   - Confirm assets.justevery.com bypasses Worker
   - Check Cloudflare dashboard for proper configuration

3. **Monitor**:
   - Use `wrangler tail` to watch Worker logs
   - Check for memory/CPU limit errors
   - Monitor asset loading in browser DevTools

## The Real Issue

Without access to Cloudflare logs, the most likely scenario is:

1. `assets.justevery.com` is routing through the Worker (not direct to R2)
2. Worker serves videos initially but exhausts resources
3. Failed responses get cached
4. Site appears broken even after Worker recovers

The fix is to ensure `assets.justevery.com` is a direct R2 custom domain, bypassing the Worker entirely.
