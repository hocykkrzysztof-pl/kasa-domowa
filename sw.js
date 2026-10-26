// Kasa Domowa: działanie offline (pliki aplikacji, biblioteka Firebase i czcionki z pamięci podręcznej).
// Dane budżetu nie przechodzą przez ten plik: Firebase trzyma własną kopię offline.
const CACHE = "kasa-domowa-v4";
const FILES = ["./", "index.html", "firebase-config.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const CACHED_HOSTS = [self.location.origin, "https://www.gstatic.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // logowanie i baza (googleapis, firebaseapp.com) zawsze idą prosto do sieci
  if (!CACHED_HOSTS.includes(url.origin) || url.pathname.startsWith("/__/")) return;
  // sieć najpierw (żeby widzieć nowe wersje), pamięć podręczna gdy offline
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok || res.type === "opaque") {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
