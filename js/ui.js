// Utilidades de interfaz: creador de nodos, palabras, imágenes, ajustes y progreso.

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') for (const [p, x] of Object.entries(v)) p.startsWith('--') ? el.style.setProperty(p, x) : (el.style[p] = x);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const pick = a => a[Math.floor(Math.random() * a.length)];
export const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

export function toast(msg) {
  document.querySelector('.toast')?.remove();
  document.body.append(h('div', { class: 'toast' }, msg));
}

// ---------- palabras ----------
// En el temario cada palabra es [artículo, palabra, plural, español, emoji, pronunciación?]
// artículo: 'der' | 'die' | 'das' | 'pl' (solo plural, p. ej. die Eltern) | '' (no es sustantivo)
export function word(a, unit) {
  if (!Array.isArray(a)) return a;
  const [art, de, pl, es, e, pron] = a;
  const noun = ['der', 'die', 'das', 'pl'].includes(art);
  const shown = art === 'pl' ? 'die' : art;
  return {
    art, de, pl, es, e, pron, noun, unit,
    full: noun ? `${shown} ${de}` : de,                 // "der Apfel"
    plFull: pl ? `die ${pl}` : null,                   // "die Äpfel"
    cls: art === 'pl' ? 'pl' : (noun ? art : ''),
    id: (unit ? unit + '/' : '') + slug(de),
  };
}

export const slug = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Artículos según caso, para variar los juegos.
const ACC = { der: 'den', die: 'die', das: 'das', pl: 'die' };
const INDEF = { der: 'ein', die: 'eine', das: 'ein' };
const INDEF_ACC = { der: 'einen', die: 'eine', das: 'ein' };
// Masculinos «débiles»: en acusativo añaden -n/-en (den Hasen, einen Elefanten). Coincide con su plural.
const WEAK = new Set(['Hase', 'Osterhase', 'Löwe', 'Affe', 'Junge', 'Name', 'Drache', 'Postbote', 'Elefant', 'Bär', 'Pirat', 'Polizist', 'Mensch', 'Kunde', 'Bauer']);
const accNoun = w => w.art === 'der' && WEAK.has(w.de) && w.pl ? w.pl : w.de;
export const acc = w => w.noun ? `${ACC[w.art]} ${accNoun(w)}` : w.de;          // Zeig mir den Apfel / den Hasen
// Incontables (sin plural) y cosas únicas van con artículo definido: «Das ist die Milch», «Das ist der Mond».
const DEF = new Set(['Sonne', 'Mond', 'Frühling', 'Sommer', 'Herbst', 'Winter', 'Morgen', 'Mittag', 'Abend', 'Nacht', 'Nikolaus', 'Mama', 'Papa', 'Oma', 'Opa', 'Gras', 'Christkind']);
export const indef = w => !w.noun ? w.de : (!w.pl || DEF.has(w.de) || !INDEF[w.art]) ? w.full : `${INDEF[w.art]} ${w.de}`;  // Das ist ein Apfel
export const indefAcc = w => w.noun && INDEF_ACC[w.art] ? `${INDEF_ACC[w.art]} ${accNoun(w)}` : w.de; // Ich habe einen Apfel
export const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;

// Palabra coloreada por género: der azul, die rojo, das verde.
export function wordEl(w, { plural = true } = {}) {
  const long = w.full.length > 16;
  return h('div', {},
    h('div', { class: `de ${w.cls} ${long ? 'long' : ''}` }, w.full),
    plural && w.plFull ? h('div', { class: 'plural' }, 'Plural: ', h('b', {}, w.plFull)) : null,
  );
}

// ---------- imágenes ----------
// img/index.json lista los dibujos que ya existen (los genera tools/recortar.py).
let imgIndex = new Set();
export async function initImages() {
  try { imgIndex = new Set(await (await fetch('img/index.json')).json()); } catch { imgIndex = new Set(); }
}
export function picEl(w, cls = 'pic') {
  const id = w.img || w.id;
  if (id && imgIndex.has(id)) return h('div', { class: cls }, h('img', { src: `img/${id}.webp`, alt: w.de || '' }));
  return h('div', { class: cls }, w.e || '❓');
}

// ---------- ajustes y progreso (en la tablet) ----------
const KEY = 'klasse-v1';
let store = { settings: { showEs: true, mic: true, slowFirst: false }, done: {}, boxes: {}, last: null };
try { Object.assign(store, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
store.settings = { showEs: true, mic: true, slowFirst: false, ...store.settings };
export const settings = store.settings;
export function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} }

export const isDone = (u, n) => !!store.done[u]?.[n];
export function markDone(u, n) { (store.done[u] ??= {})[n] = Date.now(); store.last = { u, n, t: Date.now() }; save(); }
export const lastLesson = () => store.last;
export const doneCount = u => Object.keys(store.done[u] || {}).length;

// Repaso espaciado (cajas de Leitner): 0 nuevo … 5 dominado.
const DAYS = [0, 1, 2, 4, 8, 16];
export function boxOf(id) { return store.boxes[id] || null; }
export function seen(id) { if (!store.boxes[id]) { store.boxes[id] = { b: 0, due: Date.now() }; save(); } }
export function grade(id, good) {
  const cur = store.boxes[id] || { b: 0 };
  const b = good ? Math.min(5, cur.b + 1) : Math.max(0, cur.b - 2);
  store.boxes[id] = { b, due: Date.now() + DAYS[b] * 864e5 - 36e5 };
  save();
}
export const allBoxes = () => store.boxes;

export function exportData() { return JSON.stringify(store); }
export function resetProgress() { store.done = {}; store.boxes = {}; store.last = null; save(); }
