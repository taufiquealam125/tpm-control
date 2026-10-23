// Service worker - NETWORK-FIRST so app updates show up immediately after a GitHub change.
const C='tpm-ctrl-v3';
self.addEventListener('install', e=>{ self.skipWaiting(); });
self.addEventListener('activate', e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()){ if(k!==C){ await caches.delete(k); } }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e=>{
  const u=new URL(e.request.url);
  if(u.host.includes('api.github.com')) return;        // always live
  e.respondWith((async()=>{
    try{
      const net=await fetch(e.request, {cache:'no-store'});
      const c=await caches.open(C); c.put(e.request, net.clone());
      return net;
    }catch(err){
      const hit=await caches.match(e.request);
      return hit || Response.error();
    }
  })());
});
