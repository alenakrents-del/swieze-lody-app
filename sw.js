const CACHE_PREFIX = 'swieze-lody-';
const CACHE = `${CACHE_PREFIX}v20`;
const CORE = [
  './',
  'index.html',
  'styles.css?v=comic-dialogue1',
  'app.js?v=comic3',
  'auth.js',
  'comic-story-data.js?v=1',
  'comic.js?v=8',
  'cart.js',
  'order-status.js',
  'reviews.js',
  'config.js',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];
// Cache viewed artwork without delaying a JS update on large image downloads.
const COMIC_ART = new Set([
  'assets/comic/season-1/episode-01-panel-01-v1.png',
  'assets/comic/season-1/episode-01-panel-02-v1.png',
  'assets/comic/season-1/episode-01-panel-03-v1.png'
].map(path => new URL(path, self.location.href).href));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET' && COMIC_ART.has(event.request.url)) {
    event.respondWith(
      (async () => {
        let cache;
        try {
          cache = await caches.open(CACHE);
          const cached = await cache.match(event.request);
          if (cached) return cached;
        } catch (_) { /* private browsing may deny persistent storage */ }
        const response = await fetch(event.request);
        if (response.ok && cache) {
          // A full/off-limits cache must not prevent online reading.
          try { await cache.put(event.request, response.clone()); } catch (_) { /* optional offline copy */ }
        }
        return response;
      })()
    );
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
