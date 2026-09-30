/* Suivi Wagons FRET — TMN
   Service Worker V25.1
*/

const CACHE_NAME = "suivi-wagons-fret-tmn-v25-1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).catch(() => {})
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put("./index.html", copy);
          });

          return response;
        })
        .catch(() => caches.match("./index.html"))
    );

    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(() => caches.match(request))
  );
});
