// Klasse! para imprimir: tarjetas (A6 = postal, 4 por hoja · A7 = mini, 8 por hoja) u hojas A4 de estudio.
// Todo sale del mismo temario que la app. Opciones en la URL (?fmt=cards&types=satz,frage&units=hallo,klasse&size=auto&duplex=0)
// para poder repetir una impresión o generar el PDF sin tocar nada.

import { h, word } from './ui.js';
import { UNITS, BLOCKS } from './temario.js';
import { deNum } from './zahlen.js';

const TYPES = [
  { id: 'situation', t: 'Situaciones', e: '🎭', size: 'a6', es: 'Juego de rol con guion (A6)' },
  { id: 'satz', t: 'Frases', e: '💬', size: 'a7', es: 'Frases para repetir y usar' },
  { id: 'frage', t: 'Preguntas', e: '❓', size: 'a7', es: 'Pregunta + respuesta modelo' },
  { id: 'wort', t: 'Palabras', e: '🖼️', size: 'a7', es: 'Dibujo + palabra con artículo' },
  { id: 'bewegung', t: 'Órdenes', e: '🤸', size: 'a7', es: 'Órdenes para moverse' },
  { id: 'zahl', t: 'Números 0–20', e: '🔢', size: 'a7', es: 'Un juego, no va por unidad' },
];

const q = new URLSearchParams(location.search);
const S = {
  fmt: q.get('fmt') || 'cards',
  types: (q.get('types') || 'situation,satz,frage').split(',').filter(Boolean),
  units: q.get('units') ? q.get('units').split(',') : UNITS.slice(0, 4).map(u => u.id),
  size: q.get('size') || 'auto',
  duplex: q.get('duplex') === '1',
};

let imgIndex = new Set();
const pic = (w, big) => imgIndex.has(w.id)
  ? h('div', { class: 'pic' }, h('img', { src: `img/${w.id}.webp`, alt: '' }))
  : h('div', { class: 'emo' }, w.e || '❓');

// ---------- tarjetas ----------
// Cada tarjeta tiene cara (front), dorso (back) y versión de una sola cara (single).
function cardShell(u, kind, body, cls = '') {
  return h('div', { class: `card ${cls}`, style: { '--c': u?.color || '#2F5D8A' } },
    h('div', { class: 'band' }),
    h('div', { class: 'kind' }, h('span', {}, kind), h('span', {}, u ? `${u.e} ${u.title}` : 'Klasse!')),
    h('div', { class: 'mid' }, body),
  );
}
const isLong = s => s.length > 26;

function situationCard(u) {
  const d = u.dialog;
  const lines = d.lines;
  const head = [h('div', { class: 'emo', style: { fontSize: '34pt' } }, u.e), h('div', { class: 'de long' }, d.title),
    h('div', { class: 'setup' }, d.setup)];
  const script = h('div', { class: 'lines' }, lines.map(([w, de, es]) => h('div', { class: `ln ${w}` },
    h('span', { class: `w ${w}` }, w === 'L' ? 'TÚ' : 'NIÑO'), h('div', {}, h('b', {}, de), es ? h('i', {}, es) : null))));
  return {
    u, size: 'a6',
    single: () => cardShell(u, 'Situation', [h('div', { class: 'de', style: { fontSize: '14pt' } }, `${u.e} ${d.title}`), script], lines.length > 11 ? 'dense' : ''),
    front: () => cardShell(u, 'Situation', head),
    back: () => cardShell(u, 'Situation · Rollenspiel', [script], lines.length > 11 ? 'dense' : ''),
  };
}

function satzCard(u, c) {
  const [de, es, e, note] = c;
  const deEl = () => h('div', { class: `de ${isLong(de) ? 'long' : ''}` }, de);
  return {
    u,
    single: () => cardShell(u, 'Satz', [h('div', { class: 'emo' }, e || '💬'), deEl(), h('div', { class: 'es' }, es), note ? h('div', { class: 'note' }, note) : null]),
    front: () => cardShell(u, 'Satz', [h('div', { class: 'emo' }, e || '💬'), deEl()]),
    back: () => cardShell(u, 'Satz', [h('div', { class: 'es', style: { fontSize: '12pt', color: '#1E2A33' } }, es), note ? h('div', { class: 'note' }, note) : null, h('div', { class: 'back-hint' }, de)]),
  };
}

function frageCard(u, f) {
  const [de, es, ans] = f;
  const ansEl = () => ans ? h('div', { class: 'ans' }, h('small', {}, 'Respuesta modelo'), h('b', {}, ans)) : null;
  return {
    u,
    single: () => cardShell(u, 'Frage', [h('div', { class: `de ${isLong(de) ? 'long' : ''}` }, de), h('div', { class: 'es' }, es), ansEl()]),
    front: () => cardShell(u, 'Frage', [h('div', { class: 'emo' }, '❓'), h('div', { class: `de ${isLong(de) ? 'long' : ''}` }, de)]),
    back: () => cardShell(u, 'Frage', [h('div', { class: 'es', style: { fontSize: '11pt', color: '#1E2A33' } }, es), ansEl()]),
  };
}

function wortCard(u, a) {
  const w = word(a, u.id);
  const label = () => [h('div', { class: `de ${w.cls} ${isLong(w.full) ? 'long' : ''}` }, w.full),
    w.plFull ? h('div', { class: 'plural' }, 'Plural: ', h('b', {}, w.plFull)) : null,
    h('div', { class: 'es' }, w.es)];
  return {
    u,
    single: () => cardShell(u, 'Wort', [pic(w), ...label()]),
    front: () => cardShell(u, 'Wort', [pic(w)], 'picbig'),
    back: () => cardShell(u, 'Wort', [...label(), w.pron ? h('div', { class: 'note' }, w.pron) : null]),
  };
}

function bewegungCard(u, t) {
  const [de, es, e] = t;
  return {
    u,
    single: () => cardShell(u, 'Mach mit!', [h('div', { class: 'emo' }, e), h('div', { class: `de ${isLong(de) ? 'long' : ''}` }, de), h('div', { class: 'es' }, es)]),
    front: () => cardShell(u, 'Mach mit!', [h('div', { class: 'emo' }, e), h('div', { class: `de ${isLong(de) ? 'long' : ''}` }, de)]),
    back: () => cardShell(u, 'Mach mit!', [h('div', { class: 'es', style: { fontSize: '12pt', color: '#1E2A33' } }, es)]),
  };
}

function zahlCard(n) {
  const dots = n ? h('div', { class: 'dots' }, '●'.repeat(Math.min(n, 10)), n > 10 ? h('br') : null, n > 10 ? '●'.repeat(n - 10) : null) : null;
  const word = h('div', { class: 'de' }, deNum(n)[0].toUpperCase() + deNum(n).slice(1));
  return {
    u: null,
    single: () => cardShell(null, 'Zahl', [h('div', { class: 'num' }, n), dots, word]),
    front: () => cardShell(null, 'Zahl', [h('div', { class: 'num' }, n), dots]),
    back: () => cardShell(null, 'Zahl', [word]),
  };
}

function collect(type) {
  const us = UNITS.filter(u => S.units.includes(u.id));
  switch (type) {
    case 'situation': return us.filter(u => u.dialog).map(situationCard);
    case 'satz': return us.flatMap(u => u.chunks.map(c => satzCard(u, c)));
    case 'frage': return us.flatMap(u => (u.questions || []).map(f => frageCard(u, f)));
    case 'wort': return us.flatMap(u => u.words.filter(a => a[0] && a[4]).map(a => wortCard(u, a)));
    case 'bewegung': return us.flatMap(u => (u.tpr || []).map(t => bewegungCard(u, t)));
    case 'zahl': return Array.from({ length: 21 }, (_, n) => zahlCard(n));
  }
  return [];
}

// ---------- paginar ----------
function sizeFor(type) {
  if (type === 'situation') return 'a6';          // no cabe en A7
  return S.size === 'auto' ? TYPES.find(t => t.id === type).size : S.size;
}

function sheets() {
  const out = [];
  for (const type of TYPES.map(t => t.id).filter(t => S.types.includes(t))) {
    const cards = collect(type);
    const size = sizeFor(type);
    const per = size === 'a6' ? 4 : 8, cols = 2;
    for (let i = 0; i < cards.length; i += per) {
      const page = cards.slice(i, i + per);
      const pad = n => Array.from({ length: n }, () => h('div', { class: 'card empty' }));
      const label = `${TYPES.find(t => t.id === type).t} · hoja ${i / per + 1}/${Math.ceil(cards.length / per)}`;
      if (!S.duplex) {
        out.push(h('div', { class: `sheet ${size}` }, page.map(c => c.single()), pad(per - page.length), h('span', { class: 'tag' }, label)));
      } else {
        out.push(h('div', { class: `sheet ${size}` }, page.map(c => c.front()), pad(per - page.length), h('span', { class: 'tag' }, label + ' · cara')));
        // Dorso: cada fila al revés para que coincida al dar la vuelta por el lado largo.
        const backs = [];
        for (let r = 0; r < per / cols; r++) for (let c = cols - 1; c >= 0; c--) {
          const card = page[r * cols + c];
          backs.push(card ? card.back() : h('div', { class: 'card empty' }));
        }
        out.push(h('div', { class: `sheet ${size}` }, backs, h('span', { class: 'tag' }, label + ' · dorso')));
      }
    }
  }
  return out;
}

// ---------- hoja A4 de estudio por unidad ----------
function unitSheet(u) {
  const W = u.words.map(a => word(a, u.id));
  return h('section', { class: 'unitsheet', style: { '--c': u.color } },
    h('header', {}, h('span', { class: 'e' }, u.e), h('div', {}, h('h1', {}, u.title), h('p', {}, u.es))),
    h('p', { class: 'goal' }, u.goal),
    h('h2', {}, 'Wörter · Palabras'),
    h('div', { class: 'wgrid' }, W.map(w => h('div', { class: 'wcell' }, h('span', { class: 'e' }, w.e),
      h('div', {}, h('b', { class: w.cls }, w.full), w.plFull ? h('small', { class: 'p' }, w.plFull) : null, h('small', {}, w.es))))),
    h('div', { class: 'two' },
      h('div', {}, h('h2', {}, 'Sätze · Frases'), h('ul', { class: 'slist' }, u.chunks.map(([de, es]) => h('li', {}, de, h('span', {}, es))))),
      h('div', {},
        u.questions ? [h('h2', {}, 'Fragen · Preguntas'), h('ul', { class: 'slist' }, u.questions.map(([de, es, a]) => h('li', {}, de, h('span', {}, `${es}${a ? ' → ' + a : ''}`))))] : null,
        u.tpr ? [h('h2', {}, 'Mach mit! · Órdenes'), h('ul', { class: 'slist' }, u.tpr.map(([de, es]) => h('li', {}, de, h('span', {}, es))))] : null,
      )),
    u.dialog ? [h('h2', {}, `Rollenspiel · ${u.dialog.title}`), h('div', { class: 'box', style: { marginBottom: '2mm' } }, u.dialog.setup),
      h('div', { class: 'script' }, u.dialog.lines.map(([w, de, es, help]) => h('div', { class: `ln ${w}` },
        h('span', { class: `w ${w}` }, w === 'L' ? 'TÚ' : 'NIÑO'), h('div', {}, h('b', {}, de), es ? h('i', {}, es) : null, help ? h('em', {}, '↳ ' + help) : null))))] : null,
    h('div', { class: 'two' },
      u.daily ? h('div', {}, h('h2', {}, 'Im Alltag · En el día a día'), h('div', { class: 'box' }, h('ul', {}, u.daily.map(d => h('li', {}, d))))) : null,
      h('div', {},
        u.sound ? [h('h2', {}, `Aussprache · ${u.sound.focus}`), h('div', { class: 'box' }, u.sound.tip, h('br'), h('b', {}, u.sound.words.map(x => x[0]).join(' · ')))] : null,
        u.songs?.length ? [h('h2', {}, 'Lieder'), h('ul', { class: 'slist' }, u.songs.map(s => h('li', {}, s.t, h('span', {}, s.es || ''))))] : null,
      )),
    h('div', { class: 'footer-legend' }, h('span', { class: 'der' }, 'der'), ' · ', h('span', { class: 'die' }, 'die'), ' · ', h('span', { class: 'das' }, 'das'), ' · ', h('span', { class: 'pl' }, 'Plural'), '  —  Klasse! Deutsch für kleine Leute'),
  );
}

// ---------- controles ----------
function controls() {
  const set = (k, v) => { S[k] = v; sync(); };
  const radio = (name, val, label) => h('label', {}, h('input', { type: 'radio', name, checked: S[name] === val, onchange: () => set(name, val) }), label);
  const box = (arr, val, label, title) => h('label', { title }, h('input', { type: 'checkbox', checked: S[arr].includes(val),
    onchange: e => set(arr, e.target.checked ? [...S[arr], val] : S[arr].filter(x => x !== val)) }), label);
  const el = document.getElementById('controls');
  el.replaceChildren(
    h('fieldset', {}, h('legend', {}, 'Formato'), radio('fmt', 'cards', '🃏 Tarjetas'), radio('fmt', 'a4', '📄 Hojas A4')),
    S.fmt === 'cards' ? h('fieldset', {}, h('legend', {}, 'Tamaño'), radio('size', 'auto', 'Auto'), radio('size', 'a6', 'Postal A6 (4/hoja)'), radio('size', 'a7', 'Mini A7 (8/hoja)')) : null,
    S.fmt === 'cards' ? h('fieldset', {}, h('legend', {}, 'Tarjetas'), TYPES.map(t => box('types', t.id, `${t.e} ${t.t}`, t.es))) : null,
    S.fmt === 'cards' ? h('fieldset', {}, h('legend', {}, 'Caras'),
      h('label', { title: 'Cara: alemán/dibujo. Dorso: español y respuesta. Imprimir a doble cara, girando por el lado largo.' },
        h('input', { type: 'checkbox', checked: S.duplex, onchange: e => set('duplex', e.target.checked) }), 'A doble cara')) : null,
    h('fieldset', { class: 'units' }, h('legend', {}, 'Unidades'),
      h('label', {}, h('input', { type: 'checkbox', checked: S.units.length === UNITS.length, onchange: e => set('units', e.target.checked ? UNITS.map(u => u.id) : []) }), 'Todas'),
      UNITS.map(u => box('units', u.id, `${u.e} ${u.title}`))),
    h('fieldset', {}, h('legend', {}, 'Imprimir'),
      h('button', { onclick: () => print() }, '🖨️ Imprimir / PDF'),
      h('span', { class: 'info', id: 'info' })),
  );
}

function render() {
  const pages = document.getElementById('pages');
  const rule = document.getElementById('page-rule');
  if (S.fmt === 'a4') {
    rule.textContent = '@page { size: A4; margin: 12mm 13mm; }';
    const us = UNITS.filter(u => S.units.includes(u.id));
    pages.replaceChildren(h('div', { class: 'a4doc' }, us.map(unitSheet)));
    document.getElementById('info').textContent = `${us.length} unidades · 1–2 hojas cada una`;
  } else {
    rule.textContent = '@page { size: A4; margin: 0; }';
    const s = sheets();
    pages.replaceChildren(...s);
    document.getElementById('info').textContent = `${s.length} hojas · imprimir al 100 % («Tamaño real», sin ajustar), luego recortar por las líneas`;
  }
}

function sync() {
  const p = new URLSearchParams({ fmt: S.fmt, types: S.types.join(','), units: S.units.join(','), size: S.size, duplex: S.duplex ? '1' : '0' });
  history.replaceState(null, '', '?' + p);
  controls();
  render();
}

try { imgIndex = new Set(await (await fetch('img/index.json')).json()); } catch {}
await document.fonts.ready;
sync();
document.body.dataset.ready = '1';
