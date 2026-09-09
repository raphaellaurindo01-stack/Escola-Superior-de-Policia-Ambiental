const CACHE='pamb-v2.1.0';
const ASSETS=['./','index.html','styles.css','app.js','reader.js','manifest.webmanifest','data/content.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('pamb-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope))return;e.respondWith(caches.open(CACHE).then(async cache=>{if(e.request.mode==='navigate')return (await cache.match('index.html'))||fetch(e.request);return (await cache.match(e.request,{ignoreSearch:true}))||fetch(e.request)}))});
