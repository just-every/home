const CACHE_NAME = 'justevery-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/img/logo.svg',
  '/img/favicon-192x192.png',
  '/img/favicon-512x512.png',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip caching for video files and R2 CDN
  const url = new URL(event.request.url);
  const isVideo = url.pathname.includes('.mp4') || url.pathname.includes('.webm');
  const isR2CDN = url.hostname.includes('r2.dev') || url.hostname.includes('cloudflare');
  
  if (isVideo || isR2CDN || event.request.headers.get('range')) {
    // For videos and range requests, always fetch from network
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      // Return offline page for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});