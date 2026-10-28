'use strict';

const CACHE_NAME = 'pixel-terminal-v1';
const PRECACHE_URLS = [
    './',
    './index.html',
    './manifest.json',
    './styles.css',
    './app.js',
    './data/linux-core.js',
    './data/fedora.js',
    './data/ubuntu.js',
    './data/powershell.js',
    './data/cmd.js',
    './img/comentarios-publiacaiones.png',
    './img/dudas.png',
    './img/favicon.png',
    './img/icono1.png',
    './img/pwa-192.png',
    './img/pwa-512.png',
    './img/saludando.png',
    './img/sentado.png',
    './img/soporte.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(PRECACHE_URLS);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(cacheNames
                    .filter(function (cacheName) {
                        return cacheName.startsWith('pixel-terminal-') && cacheName !== CACHE_NAME;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    }));
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', function (event) {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(function () {
                return caches.match(new URL('index.html', self.registration.scope));
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).then(function (response) {
                if (!response.ok) {
                    return response;
                }

                return caches.open(CACHE_NAME).then(function (cache) {
                    return cache.put(request, response.clone()).then(function () {
                        return response;
                    });
                });
            });
        })
    );
});
