const CACHE = 'oh-shell-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    const copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); return r;
  }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('index.html'); }); }));
});
