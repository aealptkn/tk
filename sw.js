const CACHE_NAME = 'tutanak-pro-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './all.min.css',
  './bos-tutanak.pdf',
  './fabric.min.js',
  './FileSaver.min.js',
  './pdf-lib.min.js',
  './tesseract.min.js',
  './worker.min.js',
  './tesseract-core.wasm.js',
  './tur.traineddata.gz',
  './webfonts/fa-brands-400.woff2',
  './webfonts/fa-regular-400.woff2',
  './webfonts/fa-solid-900.woff2',
  './webfonts/fa-solid-900.ttf',
  './webfonts/fa-v4compatibility.woff2',
  './logo192.png',
  './logo512.png'


  // Eğer font-awesome'un webfonts klasörünü de indirdiysen buraya eklemelisin:
  // './webfonts/fa-solid-900.woff2',vs.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Dosyalar önbelleğe alınıyor...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});