// Software engine for Steak West PWA
const CACHE_NAME = 'steak-west-v1';
const ASSETS = [
  '/',
  '/manifest.json',
  '/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});