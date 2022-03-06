if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function() {});
	  });
}
let CACHE_NAME = "IhsanGans";
let urlsToCache = ["/"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    console.log("Opened cache");
    return cache.addAll(urlsToCache)
  }))
});
self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) {
      return response
    }
    return fetch(event.request)
  }))
});
self.addEventListener("activate", (event) => {
  let cacheWhitelist = ["IhsanGans"];
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName)
      }
    }))
  }))
})
