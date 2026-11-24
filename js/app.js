// Klasse! — clase de alemán guiada para hacer en casa con niños de 3 a 6 años.
// Rutas: #/  ·  #/u/<unidad>  ·  #/l/<unidad>/<clase>/<paso>  ·  #/mk/<paso>  ·  #/r  ·  #/r/<modo>
//        #/w (repaso)  ·  #/lieder  ·  #/guia  ·  #/ajustes

import { h, settings, save, isDone, markDone, doneCount, lastLesson, initImages, toast, resetProgress, exportData } from './ui.js';
import { initVoice, unlock, stop, say, hasGermanVoice } from './speech.js';
import { lessonsOf, stepView, releaseMic } from './lesson.js';
import { morgenkreisSteps, RECHNEN, rechnenView, reviewItems } from './extras.js';
import { UNITS, BLOCKS, seasonalUnits } from './temario.js';
import { GUIA } from './guia.js';

const app = document.getElementById('app');
const U = Object.fromEntries(UNITS.map(u => [u.id, u]));

function top(title, sub, { back = '#/', right = [] } = {}) {
  return h('div', { class: 'top' },
    back ? h('button', { class: 'icon-btn', onclick: () => { stop(); location.hash = back; } }, '←') : null,
    h('h1', {}, title, sub ? h('small', {}, sub) : null),
    ...right,
    h('button', { class: `icon-btn ${settings.showEs ? 'on' : ''}`, title: 'Mostrar español', onclick: e => {
      settings.showEs = !settings.showEs; save(); applyEs(); e.currentTarget.classList.toggle('on', settings.showEs);
    } }, '🇪🇸'),
  );
}
const applyEs = () => document.body.classList.toggle('hide-es', !settings.showEs);

// ---------- siguiente clase recomendada ----------
function nextLesson() {
  for (const u of UNITS) {
    const L = lessonsOf(u);
    for (let n = 0; n < L.length; n++) if (!isDone(u.id, n)) return { u, n, title: `${u.title} · ${L[n].title}`, es: `${u.es} — ${L[n].es}` };
  }
  return null;
}

// ---------- inicio ----------
function home() {
  const nx = nextLesson();
  const rv = reviewItems(UNITS);
  const seas = seasonalUnits(new Date());
  app.replaceChildren(
    top('Klasse!', 'Deutsch für kleine Leute', { back: null, right: [h('button', { class: 'icon-btn', onclick: () => location.hash = '#/ajustes' }, '⚙️')] }),
    h('main', {},
      h('div', { class: 'hero' },
        tile('#C2410C', '☀️', 'Morgenkreis', 'El ritual de cada día · 5–8 min', '#/mk/0'),
        nx ? tile('#2F5D8A', '▶️', 'Weiter geht’s', nx.title, `#/l/${nx.u.id}/${nx.n}/0`) : null,
        tile('#2E7D5B', '🔁', 'Wiederholen', rv.total ? `${rv.due} palabras toca repasar hoy` : 'Se llena al hacer clases', '#/w'),
        tile('#7C3AED', '➕', 'Rechnen', 'Contar, sumar y restar en alemán', '#/r'),
      ),
      seas.length ? [h('div', { class: 'section-title' }, '🎉 Ahora toca (fiestas cercanas)'), h('div', { class: 'grid' }, seas.map(unitTile))] : null,
      BLOCKS.map(b => [
        h('div', { class: 'section-title' }, b.t),
        h('div', { class: 'grid' }, UNITS.filter(u => u.block === b.id).map(unitTile)),
      ]),
      h('div', { class: 'section-title' }, 'Para ti'),
      h('div', { class: 'grid' },
        smallTile('📘', 'Guía para el adulto', 'Cómo dar la clase, cómo hablar, errores típicos', '#/guia'),
        smallTile('🎵', 'Canciones y rimas', 'Todas las de las unidades, tradicionales', '#/lieder'),
      ),
      !hasGermanVoice() ? h('div', { class: 'tip' }, 'Esta tablet no tiene voz alemana instalada. En Android: Ajustes → Idioma → Salida de texto a voz → Google → instalar «Alemán (Alemania)».') : null,
    ),
  );
}
function tile(c, e, b, s, href) {
  return h('button', { class: 'big-tile', style: { background: c }, onclick: () => location.hash = href },
    h('span', { class: 'e' }, e), h('div', {}, h('b', {}, b), h('br'), h('span', {}, s)));
}
function smallTile(e, b, s, href) {
  return h('button', { class: 'unit', onclick: () => location.hash = href }, h('span', { class: 'e' }, e), h('b', {}, b), h('span', {}, s));
}
function unitTile(u) {
  const L = lessonsOf(u);
  return h('button', { class: 'unit', style: { '--c': u.color }, onclick: () => location.hash = `#/u/${u.id}` },
    h('span', { class: 'n' }, u.n ? `#${u.n}` : ''),
    h('span', { class: 'e' }, u.e), h('b', {}, u.title), h('span', { class: 'es-inline' }, u.es),
    h('div', { class: 'prog' }, L.map((_, k) => h('i', { class: isDone(u.id, k) ? 'done' : '' }))),
  );
}

// ---------- unidad ----------
function unitPage(id) {
  const u = U[id];
  if (!u) return home();
  const L = lessonsOf(u);
  app.replaceChildren(
    top(u.title, u.es),
    h('main', {},
      h('div', { class: 'unit-head', style: { '--c': u.color } }, h('span', { class: 'e' }, u.e),
        h('div', {}, h('h2', { style: { margin: 0 } }, u.title), h('p', {}, u.goal))),
      h('div', { class: 'lessons' }, L.map((l, n) => h('button', { class: `lesson ${isDone(u.id, n) ? 'done' : ''}`, onclick: () => location.hash = `#/l/${u.id}/${n}/0` },
        h('div', { class: 'meta' }, h('span', {}, `Stunde ${n + 1}`), h('span', {}, `≈ ${l.steps.reduce((s, x) => s + (x.min || 2), 0)} min`)),
        h('h3', {}, l.title), h('div', { class: 'es-inline', style: { color: 'var(--muted)', fontWeight: 600 } }, l.es),
        h('ol', {}, l.steps.filter(s => !['Begrüßung', 'Abschied'].includes(s.kind)).map(s => h('li', {}, s.title || s.kind))),
      ))),
      u.daily ? h('div', { class: 'panel' }, h('h3', {}, '🏠 Para usar en el día a día (lo más importante)'),
        h('ul', {}, u.daily.map(d => h('li', {}, d)))) : null,
      h('div', { class: 'panel' }, h('h3', {}, '📚 Vocabulario de la unidad'),
        h('div', { class: 'chips' }, u.words.map(([a, w, , es]) => h('span', { class: `chip ${a === 'pl' ? 'pl' : a}` }, (a && a !== 'pl' ? a + ' ' : a === 'pl' ? 'die ' : '') + w, h('span', { class: 'es-inline', style: { display: 'inline', marginLeft: '6px', color: 'var(--muted)', fontWeight: 600 } }, es))))),
      u.grammar ? h('div', { class: 'panel' }, h('h3', {}, '🧩 Gramática escondida (para ti, no para explicársela)'), h('p', {}, u.grammar)) : null,
      u.extra ? h('div', { class: 'panel' }, h('h3', {}, '✂️ Fuera de la pantalla'), h('ul', {}, u.extra.map(d => h('li', {}, d)))) : null,
    ),
  );
}

// ---------- reproductor de pasos ----------
function player({ title, sub, steps, n, base, back, onFinish }) {
  const step = steps[n];
  if (!step) {
    onFinish?.();
    return finish({ title, back, base });
  }
  const view = step.type === 'custom' ? step.view() : stepView(step);
  const last = n === steps.length - 1;
  app.replaceChildren(
    top(title, sub, { back, right: [h('div', { class: 'dots' }, steps.map((_, k) => h('i', { class: k < n ? 'done' : k === n ? 'now' : '' })))] }),
    h('main', {},
      h('div', { class: 'step-head' }, h('span', { class: 'kind' }, step.kind), h('h2', {}, step.title || step.song?.t || ''), step.min ? h('span', { class: 'min' }, `≈ ${step.min} min`) : null),
      view,
      h('div', { class: 'nav' },
        h('button', { class: 'btn ghost', onclick: () => { stop(); location.hash = n > 0 ? `${base}/${n - 1}` : back; } }, '← Atrás'),
        h('button', { class: 'btn primary', onclick: () => { stop(); location.hash = `${base}/${n + 1}`; } }, last ? '✓ Terminar' : 'Weiter →'),
      ),
    ),
  );
  window.scrollTo(0, 0);
}
function finish({ title, back, extra }) {
  say('Super! Das war toll!');
  app.replaceChildren(top(title, '', { back }), h('main', {},
    h('div', { class: 'board', style: { textAlign: 'center' } }, h('div', { style: { fontSize: '90px' } }, '🌟🏆🌟'), h('div', { class: 't' }, 'Geschafft! Das war toll!'), h('div', { class: 'es' }, '¡Clase terminada!')),
    extra || null,
    h('div', { class: 'actions', style: { justifyContent: 'center' } }, h('button', { class: 'btn primary', onclick: () => location.hash = back }, 'Volver'), h('button', { class: 'btn', onclick: () => location.hash = '#/' }, 'Inicio')),
  ));
}

function lessonRoute(uid, ln, n) {
  const u = U[uid]; if (!u) return home();
  const L = lessonsOf(u)[ln]; if (!L) return unitPage(uid);
  player({ title: `${u.e} ${u.title}`, sub: `Stunde ${ln + 1} · ${L.title}`, steps: L.steps, n, base: `#/l/${uid}/${ln}`, back: `#/u/${uid}`,
    onFinish: () => markDone(uid, ln) });
  if (n >= L.steps.length && u.daily) {
    document.querySelector('main .board').after(h('div', { class: 'panel' }, h('h3', {}, '🏠 Hoy, durante el día, usa esto:'), h('ul', {}, u.daily.slice(0, 3).map(d => h('li', {}, d)))));
  }
}

// ---------- rechnen ----------
let rMax = 10;
function rechnenHome() {
  app.replaceChildren(top('Rechnen', 'Matemáticas en alemán'), h('main', {},
    h('div', { class: 'tip' }, 'Orden recomendado: Zahlen → Zählen → Wie viele? → Davor/danach → Mehr/weniger → Plus → Minus → Geschichten. Con 3–4 años, hasta 5 o 10; con 5–6, hasta 20. Usad también objetos reales (pinzas, legos, garbanzos): la tablet es el guion, no el juguete.'),
    h('div', { class: 'actions' }, [5, 10, 20].map(m => h('button', { class: `pill ${rMax === m ? 'on' : ''}`, onclick: () => { rMax = m; rechnenHome(); } }, `bis ${m}`))),
    h('div', { class: 'grid', style: { marginTop: '14px' } }, RECHNEN.map(r => h('button', { class: 'unit', style: { '--c': '#7C3AED' }, onclick: () => location.hash = `#/r/${r.id}` },
      h('span', { class: 'e' }, r.e), h('b', {}, r.t), h('span', { class: 'es-inline' }, r.es)))),
  ));
}
function rechnenPage(id) {
  const r = RECHNEN.find(x => x.id === id); if (!r) return rechnenHome();
  app.replaceChildren(top(`${r.e} ${r.t}`, `bis ${rMax}`, { back: '#/r' }), h('main', {}, rechnenView(id, rMax)));
}

// ---------- repaso ----------
function reviewPage() {
  const rv = reviewItems(UNITS, 10);
  if (!rv.items.length) {
    app.replaceChildren(top('Wiederholen', 'Repaso'), h('main', {}, h('div', { class: 'tip' }, 'Aún no hay palabras para repasar. Se añaden al ver las tarjetas de las clases. Lo ideal: 5 minutos de repaso cada día, aunque no toque clase.')));
    return;
  }
  player({ title: 'Wiederholen', sub: `${rv.due} pendientes de ${rv.total}`, back: '#/', base: '#/w',
    steps: [{ type: 'was', kind: 'Wiederholung', title: 'Was ist das?', items: rv.items, min: 5 }], n: 0 });
}

// ---------- canciones ----------
function liederPage() {
  const all = [];
  UNITS.forEach(u => (u.songs || []).forEach(s => all.push({ u, s })));
  app.replaceChildren(top('Lieder und Reime', 'Canciones y rimas'), h('main', {},
    h('div', { class: 'tip' }, 'Todas son tradicionales (dominio público) o rimas hechas para esta app. Las canciones fijan la pronunciación y la gramática mejor que nada: cantad la misma muchos días seguidos.'),
    h('div', { class: 'lines' }, all.map(({ u, s }) => h('button', { class: 'line', onclick: () => { liederOne(u, s); } },
      h('span', { class: 'who A' }, u.e), h('span', {}, h('span', { class: 't' }, s.t), h('span', { class: 'es-inline' }, `${u.title} · ${s.es || ''}`)), h('span', {}, '▶')))),
  ));
}
function liederOne(u, s) {
  app.replaceChildren(top(s.t, u.title, { back: '#/lieder' }), h('main', {}, stepView({ type: 'song', song: s })));
}

// ---------- guía y ajustes ----------
function guiaPage() {
  app.replaceChildren(top('Guía para el adulto', 'Cómo dar la clase'), h('main', {}, h('div', { class: 'guide', html: GUIA })));
}
function ajustesPage() {
  const row = (label, key) => h('button', { class: `pill ${settings[key] ? 'on' : ''}`, onclick: () => { settings[key] = !settings[key]; save(); ajustesPage(); } }, (settings[key] ? '✓ ' : '') + label);
  app.replaceChildren(top('Ajustes', ''), h('main', {},
    h('div', { class: 'panel' }, h('h3', {}, 'Opciones'), h('div', { class: 'chips' }, row('Mostrar español', 'showEs'), row('Botón de micrófono (el niño se oye)', 'mic'))),
    h('div', { class: 'panel' }, h('h3', {}, 'Voz'), h('p', {}, hasGermanVoice() ? '✓ La tablet tiene voz alemana.' : '✗ No hay voz alemana instalada (ver Ajustes de Android → Texto a voz).'),
      h('button', { class: 'btn', onclick: () => say('Hallo! Ich bin die Stimme von Klasse. Wie geht es dir?') }, '🔊 Probar voz')),
    h('div', { class: 'panel' }, h('h3', {}, 'Progreso'),
      h('div', { class: 'chips' },
        h('button', { class: 'btn', onclick: () => { navigator.clipboard?.writeText(exportData()); toast('Copiado al portapapeles'); } }, '📋 Copiar copia de seguridad'),
        h('button', { class: 'btn', onclick: () => { if (confirm('¿Borrar todo el progreso?')) { resetProgress(); toast('Progreso borrado'); } } }, '🗑️ Empezar de cero'))),
  ));
}

// ---------- router ----------
function route() {
  releaseMic();
  const p = location.hash.replace(/^#\/?/, '').split('/');
  applyEs();
  switch (p[0]) {
    case 'u': return unitPage(p[1]);
    case 'l': return lessonRoute(p[1], +p[2] || 0, +p[3] || 0);
    case 'mk': {
      const nx = nextLesson();
      return player({ title: '☀️ Morgenkreis', sub: 'Ritual diario', steps: morgenkreisSteps(nx), n: +p[1] || 0, base: '#/mk', back: '#/' });
    }
    case 'r': return p[1] ? rechnenPage(p[1]) : rechnenHome();
    case 'w': return reviewPage();
    case 'lieder': return liederPage();
    case 'guia': return guiaPage();
    case 'ajustes': return ajustesPage();
    default: return home();
  }
}

addEventListener('hashchange', route);
addEventListener('pointerdown', unlock, { once: true });
Promise.all([initVoice(), initImages()]).then(route);
if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') navigator.serviceWorker.register('sw.js');
