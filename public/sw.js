const CACHE_NAME = "sadguru-v1";

// Files to cache for offline use
const STATIC_ASSETS = [
  "/",
  "/menu/",
  "/about/",
  "/contact/",
  "/images/logo.png",
  "/images/hero-bg.jpg",
  "/images/poha.jpg",
  "/images/maggi.jpg",
  "/images/bhurji-pav.jpg",
  "/images/misal-pav.jpg",
  "/images/chai.jpg",
  "/images/coffee.jpg",
  "/images/cigarettes.jpg",
];

// Install — cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache first, fall back to network
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache successful responses for pages and images
        if (response && response.status === 200) {
          const url = new URL(event.request.url);
          if (
            url.pathname.startsWith("/images/") ||
            url.pathname === "/" ||
            url.pathname.startsWith("/menu") ||
            url.pathname.startsWith("/about") ||
            url.pathname.startsWith("/contact")
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
        }
        return response;
      });
    })
  );
});
