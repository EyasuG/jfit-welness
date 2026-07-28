const STATIC_CACHE = 'jfit-v7-static';
const RUNTIME_CACHE = 'jfit-v7-runtime';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://api.fontshare.com/v2/css?f[]=apfel-grotezk@400,500,600,700&display=swap'
];
const CDN_ORIGINS = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net',
  'https://api.fontshare.com'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const staticCache = await caches.open(STATIC_CACHE);
    await staticCache.addAll(STATIC_ASSETS);

    const runtimeCache = await caches.open(RUNTIME_CACHE);
    await Promise.allSettled(CDN_ASSETS.map(async url => {
      const response = await fetch(new Request(url, { mode: 'no-cors' }));
      await runtimeCache.put(url, response);
    }));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isCdnAsset = CDN_ORIGINS.some(origin => url.origin === origin);

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(event.request);
        const cache = await caches.open(STATIC_CACHE);
        await cache.put('./index.html', fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(event.request))
          || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  if (isCdnAsset) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(event.request) || await cache.match(event.request.url);
      const networkFetch = fetch(event.request).then(async response => {
        await cache.put(event.request.url, response.clone());
        return response;
      }).catch(() => cached);
      return cached || networkFetch;
    })());
    return;
  }

  if (isSameOrigin) {
    event.respondWith((async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(RUNTIME_CACHE);
          await cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        return await caches.match('./index.html');
      }
    })());
  }
});
