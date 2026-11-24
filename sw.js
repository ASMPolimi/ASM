const CACHE_NAME = 'asm-pwa-v1';

const STATIC_ASSETS = [
    '/',
    '/halal.html',
    '/event.html',
    '/404.html',
    '/jumuah.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/featured-products.js',
    '/assets/asm_logo.png',
    '/assets/favicon-192x192.png',
    '/assets/icon-512x512.png',
    '/assets/apple-touch-icon.png',
    '/manifest.json'
];

// Install: cache core application shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate: clean up outdated caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Network-first for dynamic APIs, Cache-first / Stale-while-revalidate for static assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Bypass caching for analytics, turnstile, or non-GET requests
    if (event.request.method !== 'GET' ||
        url.hostname.includes('google-analytics.com') ||
        url.hostname.includes('challenges.cloudflare.com')) {
        return;
    }

    // Network-first strategy for live API endpoints (Open Food Facts, custom barcodes, Aladhan prayer API, settings)
    if (url.pathname.startsWith('/api/') ||
        url.hostname.includes('openfoodfacts.org') ||
        url.hostname.includes('aladhan.com')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    // Stale-while-revalidate for static pages, styles, scripts and images
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If network fails and requested page is an HTML document, fallback to cached halal or jumuah
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    if (url.pathname.startsWith('/event/')) {
                        return caches.match('/404.html');
                    }
                    if (url.pathname === '/event.html') {
                        return caches.match('/event.html');
                    }
                    if (url.pathname.includes('jumuah')) {
                        return caches.match('/jumuah.html');
                    }
                    return caches.match('/halal.html');
                }
            });

            return cachedResponse || fetchPromise;
        })
    );
});
