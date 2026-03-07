const CACHE_NAME = "master-express-v2"; // altere a versão sempre que atualizar
const urlsToCache = [
  "/",
  "/index.html",
  "/logo.png",
  "/manifest.json",
  "https://unpkg.com/leaflet/dist/leaflet.css",
  "https://unpkg.com/leaflet/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // força ativação imediata
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if(name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim(); // assume controle imediato
});

// Intercepta requisições e retorna do cache ou da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
