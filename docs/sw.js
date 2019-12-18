const CACHE_NAME = 'cache-and-update';
const URL_TO_CACHE = [
    'index.html',
    'build/bundle.css',
    'build/bundle.js',
    'data/quran-uthmani.txt',
    'favicon.ico',
    'manifest.json',
    'fonts/me_quran.woff'
]

// INSTALL
self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(preCache());
});

// ACTIVATE
self.addEventListener('activate', function (event) {
    console.log('The service worker is being activated.');
    event.waitUntil(removeOldCache());
    return self.clients.claim();
});

// FETCH
self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(fromCache(event.request));
    event.waitUntil(updateCache(event.request));
});

function preCache() {
    return caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(URL_TO_CACHE))
        .then(() => self.skipWaiting())
        .catch(error => console.log(error))
}

function removeOldCache(event) {
    self.caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return self.caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.skipWaiting())
        .catch(error => console.log(error));
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || fetch(request);
        });
    });
}

function updateCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}