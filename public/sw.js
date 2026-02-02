const CACHE_NAME = 'submanager-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass-through to network. 
    // Presence of this event listener is required for PWA installability.
});
