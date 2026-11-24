// Funciona sin internet: guarda la app la primera vez y luego sirve desde caché.
const VERSION = 'klasse-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'css/style.css', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'audio/index.json', 'img/index.json',
  ...['app', 'ui', 'lesson', 'extras', 'speech', 'rec', 'zahlen', 'temario', 't1', 't2', 't3', 't4', 'guia'].map(f => `js/${f}.js`)];
const MEDIA = 'klasse-media';   // dibujos y audios: se guardan según se usan

self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== MEDIA).map(k => caches.delete(k)))).then(() => self.clients.claim())));

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (/\/(img|audio)\/.+\.(webp|png|mp3)$/.test(url.pathname)) {
    // Medios: caché primero.
    e.respondWith(caches.open(MEDIA).then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
  // App: red primero (así se actualiza), caché si no hay conexión.
  e.respondWith(fetch(e.request).then(r => { if (r.ok) caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
