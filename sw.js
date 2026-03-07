const CACHE_NAME = "master-express-v1";
const urlsToCache = ["./","./index.html","./manifest.json","./logo.png","https://unpkg.com/leaflet/dist/leaflet.css","https://unpkg.com/leaflet/dist/leaflet.js","https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"];

self.addEventListener("install", event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.match(event.request).then(response=>{
      return response || fetch(event.request);
    })
  );
});
