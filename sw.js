// Minimal service worker - just enough to make the app installable (PWA).
const C='tpm-ctrl-v1';
self.addEventListener('install', e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest']))); });
self.addEventListener('activate', e=>{ self.clients.claim(); });
self.addEventListener('fetch', e=>{
  const u=new URL(e.request.url);
  // never cache GitHub API calls - always live
  if(u.host.includes('api.github.com')) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
