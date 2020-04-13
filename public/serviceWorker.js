

const DATA_CACHE_NAME = 'data-cache-v2';

const CACHE_NAME = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/js/install.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
  "/images/refresh.svg",
  "/images/install.svg"
]

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME)  {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.url.includes('/getcoffee')) {
  console.log('[Service Worker] Fetch (JSON data): ', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              console.log('[ServiceWorker] Fetch - found on network, adding to cache: ',evt.request.url);
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              //console.log('[Service Worker]response ='+response.json());
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              console.log('[ServiceWorker] Fetch - failed on network, trying cache: ',evt.request.url);
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            console.log('[Service Worker] Fetch (static): ', evt.request.url);
            return response || fetch(evt.request);
          });
    })
);
  
}); 

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Install, pre-caching assets',JSON.stringify(assets));
      cache.addAll(assets)
    })
  )
})