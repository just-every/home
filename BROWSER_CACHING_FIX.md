# Browser Caching Fix - Stale Asset References

## The Real Issue

You were right! The issue is **stale HTML cached by the service worker** referencing JS/CSS files that no longer exist after deployment.

### How it happens:

1. **First deployment**:

   - HTML references: `/static/chunks/page-5bbaf9523b0fa53c.js`
   - Service worker caches this HTML

2. **New deployment**:

   - Next.js generates new hashes: `/static/chunks/page-abc123newHash.js`
   - Old files are deleted from the server

3. **User visits site**:
   - Service worker serves cached HTML (with old asset paths)
   - Browser tries to load non-existent JS/CSS files
   - Result: "Application error: a client-side exception has occurred"

## The Fix

### 1. Updated Service Worker Strategy

**Changed from**: Cache-first for everything
**Changed to**:

- Network-first for HTML pages (always fresh)
- Cache-first for static assets (JS, CSS, images)

### 2. Service Worker Versioning

- Added `CACHE_VERSION = 'v2'`
- Increment this on each deployment to force cache refresh
- Old caches are automatically deleted

### 3. Immediate Updates

- Added `self.skipWaiting()` - new SW takes over immediately
- Added `self.clients.claim()` - controls all tabs instantly
- No more waiting for all tabs to close

## Deployment Steps

1. **Deploy with the fixed service worker**:

   ```bash
   git add .
   git commit -m "fix: service worker caching strategy to prevent stale asset references"
   git push origin main
   ```

2. **For future deployments**, update the cache version:
   ```javascript
   const CACHE_VERSION = 'v3'; // increment this
   ```

## Additional Recommendations

### 1. Add cache busting to service worker URL

In your HTML or app:

```javascript
navigator.serviceWorker.register('/sw.js?v=' + Date.now());
```

### 2. Consider removing service worker entirely

If offline support isn't critical, removing the SW eliminates these caching issues.

### 3. Use Workbox

For production, consider Workbox which handles these scenarios automatically.

## Testing

1. Deploy the fix
2. Clear browser cache and service worker
3. Load the site
4. Deploy again with different content
5. Reload - should work immediately without errors

## Why This Fix Works

- HTML is never cached → always has correct asset references
- JS/CSS files are cached but have unique hashes → no conflicts
- Old caches are cleared on update → no stale files
- Service worker updates immediately → no delayed fixes

This should completely resolve the "works initially then breaks" pattern!
