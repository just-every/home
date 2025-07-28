'use client';

import { useEffect } from 'react';

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    // Unregister all service workers and clear caches
    if ('serviceWorker' in navigator) {
      // Unregister all service workers
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (const registration of registrations) {
          registration.unregister().then(function (success) {
            if (success) {
              console.log('Service worker unregistered successfully');
            }
          });
        }
      });

      // Clear all caches
      if ('caches' in window) {
        caches.keys().then(function (names) {
          for (const name of names) {
            caches.delete(name).then(function (success) {
              if (success) {
                console.log('Cache deleted:', name);
              }
            });
          }
        });
      }
    }
  }, []);

  return null;
}
