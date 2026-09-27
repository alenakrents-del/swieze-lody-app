const CACHE_PREFIX = 'swieze-lody-';
const CACHE = `${CACHE_PREFIX}v32`;
const CORE = [
  './',
  'index.html',
  'styles.css?v=comic-benchmark3',
  'customer-v3.css?v=1',
  'app.js?v=comic3',
  'auth.js',
  'comic-story-data.js?v=6',
  'comic-story-canon-v7.js?v=1',
  'comic-longform-episodes-1-3.js?v=1',
  'comic-longform-episodes-4-15.js?v=1',
  'comic-longform-reader.js?v=2',
  'comic-longform.css?v=1',
  'comic.js?v=12',
  'cart.js',
  'order-status.js',
  'reviews.js',
  'customer-v3.js?v=3',
  'staff.html',
  'staff-v4.css?v=2',
  'staff-v4.js?v=2',
  'staff.webmanifest',
  'staff-catalog.js',
  'staff-icecream.js',
  'image-upload.js',
  'config.js',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Cache viewed artwork without delaying a JS update on large image downloads.
const COMIC_ART_VERSIONS = Object.freeze({
  '01': 'v2',
  '02': 'v1',
  '03': 'v1',
  '04': 'v1',
  '05': 'v3'
});

const COMIC_ART = new Set(
  Object.entries(COMIC_ART_VERSIONS).flatMap(([episode, version]) =>
    ['01', '02', '03'].flatMap(panel =>
      [360, 720, 900].map(width =>
        new URL(
          `assets/comic/season-1/episode-${episode}-panel-${panel}-${version}-${width}.webp`,
          self.location.href
        ).href
      )
    )
  )
);

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
        } catch (_) {
          // Persistent storage is optional.
        }

        let response;

        try {
          response = await fetch(event.request);
          if (!response.ok) throw new Error('Comic artwork unavailable');
        } catch (error) {
          const prefix = event.request.url.replace(/-(360|720|900)\.webp$/, '-');

          if (cache) {
            for (const width of [900, 720, 360]) {
              const candidate = `${prefix}${width}.webp`;

              if (COMIC_ART.has(candidate)) {
                const saved = await cache.match(candidate);
                if (saved) return saved;
              }
            }
          }

          throw error;
        }

        if (response.ok && cache) {
          try {
            await cache.put(event.request, response.clone());
          } catch (_) {
            // Offline artwork caching is optional.
          }
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
