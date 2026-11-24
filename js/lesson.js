// Lecciones: cada unidad del temario se convierte en 3 clases ("Stunden") de 15–25 min
// con la misma estructura fija (saludo → repaso → nuevo → juego → canción → despedida).
// Aquí están también los distintos tipos de actividad.

import { h, word, wordEl, picEl, shuffle, pick, acc, indef, cap, settings, seen, grade, toast } from './ui.js';
import { say, sayQueue, stop, sfx } from './speech.js';
import { listen, playBlob, canRecord, releaseMic } from './rec.js';

// ---------- rituales comunes ----------
export const HALLO = {
  type: 'lines', kind: 'Begrüßung', title: 'Hallo! Wir fangen an', min: 2,
  tip: 'Siempre igual, cada día: es la señal de que «ahora es alemán». Sentaos en corro (Stuhlkreis) o en la alfombra. Si tenéis un muñeco que «solo habla alemán», sácalo ahora.',
  lines: [
    ['L', 'Guten Morgen, Kinder!', '¡Buenos días, niños!', 'Por la tarde: «Hallo, Kinder!» o «Guten Tag!»'],
    ['K', 'Guten Morgen!', '¡Buenos días!'],
    ['L', 'Wie geht es euch?', '¿Cómo estáis?'],
    ['K', 'Gut, danke!', '¡Bien, gracias!', 'Admite cualquier respuesta: «super», «müde»… y repítela tú en frase: «Ah, du bist müde.»'],
    ['L', 'Schön, dass ihr da seid!', '¡Qué bien que estéis aquí!'],
    ['L', 'Seid ihr bereit?', '¿Estáis listos?'],
    ['K', 'Ja!', '¡Sí!'],
  ],
};
export const TSCHUESS = {
  type: 'lines', kind: 'Abschied', title: 'Tschüss! Bis morgen', min: 2,
  tip: 'Cierra siempre igual. Di qué habéis aprendido con 2–3 palabras de hoy y elogia el esfuerzo, no el acierto («Ihr habt so toll mitgemacht!»).',
  lines: [
    ['L', 'Das habt ihr super gemacht!', '¡Lo habéis hecho genial!'],
    ['L', 'Was haben wir heute gelernt?', '¿Qué hemos aprendido hoy?', 'Deja que digan palabras sueltas. Tú las completas: «Ja, der Apfel!»'],
    ['L', 'Gebt mir fünf!', '¡Chócala!'],
    ['L', 'Tschüss, Kinder! Bis morgen!', '¡Adiós, niños! ¡Hasta mañana!'],
    ['K', 'Tschüss! Bis morgen!', '¡Adiós! ¡Hasta mañana!'],
  ],
};

// ---------- construir las 3 clases de una unidad ----------
export function lessonsOf(u) {
  if (u._lessons) return u._lessons;
  const W = u.words.map(a => word(a, u.id));
  const half = Math.ceil(W.length / 2);
  const A = W.slice(0, half), B = W.slice(half);
  const C = u.chunks.map(c => ({ de: c[0], es: c[1], e: c[2] || '💬', tip: c[3], id: u.id + '/s/' + c[0] }));
  const ch = Math.ceil(C.length / 2);
  const song = (i) => u.songs?.[i % u.songs.length];
  const playable = W.filter(w => w.e && (u.playAll || w.noun));
  const L = [];

  L.push({
    title: 'Kennenlernen', es: 'Conocer las palabras', steps: [
      HALLO,
      { type: 'intro', kind: 'Heute', title: u.title, min: 1, unit: u },
      { type: 'cards', kind: 'Neue Wörter', title: 'Neue Wörter', items: A, min: 5, tip: u.tipWords || TIP_WORDS },
      { type: 'find', kind: 'Spiel', title: 'Wo ist …?', items: A.filter(w => playable.includes(w)).length >= 3 ? A.filter(w => playable.includes(w)) : playable, mode: 'wo', min: 3, unit: u },
      { type: 'chunks', kind: 'Sätze', title: 'Sätze zum Sagen', items: C.slice(0, ch), min: 4, tip: TIP_CHUNKS },
      song(0) && { type: 'song', kind: 'Lied', song: song(0), min: 3 },
      TSCHUESS,
    ].filter(Boolean),
  });

  L.push({
    title: 'Üben', es: 'Practicar y ampliar', steps: [
      HALLO,
      { type: 'was', kind: 'Wiederholung', title: 'Was ist das?', items: shuffle(A.filter(w => playable.includes(w))).slice(0, 6), min: 3, unit: u },
      { type: 'cards', kind: 'Neue Wörter', title: 'Noch mehr Wörter', items: B, min: 5, tip: u.tipWords || TIP_WORDS },
      { type: 'find', kind: 'Spiel', title: 'Zeig mir …!', items: playable, mode: 'zeig', min: 4, unit: u },
      { type: 'chunks', kind: 'Sätze', title: 'Noch mehr Sätze', items: C.slice(ch), min: 4, tip: TIP_CHUNKS },
      u.tpr ? { type: 'tpr', kind: 'Bewegung', title: 'Mach mit!', items: u.tpr.map(t => ({ de: t[0], es: t[1], e: t[2] })), min: 3 }
            : { type: 'fehlt', kind: 'Spiel', title: 'Was fehlt?', items: playable, min: 3, unit: u },
      song(1) && { type: 'song', kind: 'Lied', song: song(1), min: 3 },
      TSCHUESS,
    ].filter(Boolean),
  });

  L.push({
    title: 'Sprechen', es: 'Hablar: juego de rol y preguntas', steps: [
      HALLO,
      { type: 'fehlt', kind: 'Spiel', title: 'Was fehlt?', items: playable, min: 3, unit: u },
      u.dialog && { type: 'dialog', kind: 'Rollenspiel', title: u.dialog.title, dialog: u.dialog, min: 6 },
      u.questions && { type: 'questions', kind: 'Gespräch', title: 'Wir unterhalten uns', items: u.questions, min: 4 },
      u.sound && { type: 'sound', kind: 'Aussprache', title: 'Gut gesprochen: ' + u.sound.focus, sound: u.sound, min: 2 },
      { type: 'was', kind: 'Quiz', title: 'Was ist das?', items: shuffle(playable).slice(0, 8), min: 3, unit: u },
      TSCHUESS,
    ].filter(Boolean),
  });

  // Unidad con clases extra hechas a mano (fiestas, etc.).
  (u.extraLessons || []).forEach(x => L.push(x));
  u._lessons = L;
  return L;
}

const TIP_WORDS = 'Por cada palabra: 1) di la palabra con su artículo, despacio, señalando el dibujo; 2) todos juntos la repiten (coro); 3) luego cada niño; 4) haz un gesto. El color ayuda a recordar el artículo: azul der, rojo die, verde das. Nunca la palabra sin artículo.';
const TIP_CHUNKS = 'Las frases se aprenden enteras, como un bloque («Ich möchte …»), no palabra a palabra. Repetidlas con distintas voces (bajito, de gigante, de ratón): así se repiten 5 veces sin aburrirse. Luego úsalas de verdad en casa hoy mismo.';

// ---------- reproductor ----------
export function stepView(step, ctx) {
  const R = RENDER[step.type];
  return R ? R(step, ctx) : h('div', {}, 'Paso desconocido');
}

function speakBtns(text, { rec = true } = {}) {
  return [
    h('button', { class: 'act', onclick: () => say(text) }, '🔊', h('small', {}, 'Hören')),
    h('button', { class: 'act', onclick: () => say(text, { rate: 0.65 }) }, '🐢', h('small', {}, 'Langsam')),
    rec && settings.mic && canRecord() ? recBtn(text) : null,
  ];
}

// Graba al niño repitiendo y le devuelve su voz seguida del modelo.
function recBtn(text) {
  const b = h('button', { class: 'act rec', title: 'Ahora tú' }, '🎤', h('small', {}, 'Du!'));
  b.onclick = async () => {
    if (b.classList.contains('live')) return;
    stop();
    b.classList.add('live');
    const r = await listen({ onLevel: v => { b.style.transform = `scale(${1 + v * 0.15})`; } });
    b.classList.remove('live'); b.style.transform = '';
    if (!r) { toast('No hay acceso al micrófono'); return; }
    if (!r.spoke) { sfx.soft(); return; }
    await playBlob(r.blob);
    sfx.yes();
    await new Promise(z => setTimeout(z, 300));
    await say(text);
  };
  return b;
}

const counter = (i, n) => h('span', { class: 'counter' }, `${i + 1} / ${n}`);

const RENDER = {
  intro(step) {
    const u = step.unit;
    return h('div', {},
      h('div', { class: 'board' },
        h('div', { class: 't' }, `Heute: ${u.title}`),
        h('div', { class: 'es' }, u.es),
      ),
      h('div', { class: 'tip say' }, h('b', {}, 'Dile: '), `«Heute lernen wir ${u.today || 'etwas Neues'}.» `, h('span', { class: 'es-inline' }, `(Hoy aprendemos ${u.todayEs || 'algo nuevo'}.)`)),
      h('div', { class: 'tip' }, u.goal),
      u.prep ? h('div', { class: 'tip' }, h('b', {}, 'Ten a mano: '), u.prep) : null,
      h('button', { class: 'act', onclick: () => say(`Heute lernen wir ${u.today || 'etwas Neues'}.`) }, '🔊'),
    );
  },

  cards(step) { return cardDeck(step, w => w.full, w => [wordEl(w), w.es && h('div', { class: 'es' }, w.es), w.pron && h('div', { class: 'pron' }, '🗣️ ' + w.pron)], true); },
  chunks(step) { return cardDeck(step, c => c.de, c => [h('div', { class: 'de long' }, c.de), h('div', { class: 'es' }, c.es), c.tip && h('div', { class: 'pron' }, '💡 ' + c.tip)]); },
  tpr(step) {
    const el = cardDeck(step, c => c.de, c => [h('div', { class: 'de long' }, c.de), h('div', { class: 'es' }, c.es)]);
    const sim = h('button', { class: 'btn', onclick: () => { const c = pick(step.items); say(c.de); toast(c.e + ' ' + c.de); } }, '🎲 Kommando!');
    el.prepend(h('div', { class: 'tip' }, 'Di la orden y hacedla TODOS a la vez (tú también). Cuando la sepan: pulsa «Kommando» para una orden al azar, o juega a «Simón dice» (en alemán: solo se hace si dices antes «Simon sagt…»).'));
    el.append(h('div', { class: 'actions' }, sim));
    return el;
  },

  lines(step) { return linesView(step.lines, step.tip); },
  dialog(step) {
    const d = step.dialog;
    return h('div', {},
      h('div', { class: 'tip' }, d.setup),
      d.roles ? h('div', { class: 'chips', style: { marginBottom: '10px' } }, Object.entries(d.roles).map(([k, v]) => h('span', { class: 'chip' }, h('b', {}, k + ': '), v))) : null,
      linesView(d.lines),
      d.after ? h('div', { class: 'tip' }, d.after) : null,
    );
  },
  questions(step) {
    return h('div', {},
      h('div', { class: 'tip' }, 'Conversación libre guiada. Haz la pregunta, cuenta hasta 5 en silencio (¡esperar es clave!) y, si no sale, da dos opciones: «Rot oder blau?». Si responde con una palabra, devuélvesela en frase completa (expansión): «Rot!» → «Ah, du magst Rot. Ich mag auch Rot!». No corrijas: repite bien y sigue.'),
      linesView(step.items.map(q => ['L', q[0], q[1], q[2] ? 'Respuesta modelo: ' + q[2] : null])),
    );
  },
  song(step) {
    const s = step.song;
    return h('div', {},
      h('div', { class: 'board' }, h('div', { class: 't' }, s.t), s.es ? h('div', { class: 'es' }, s.es) : null),
      s.note ? h('div', { class: 'tip' }, s.note) : null,
      s.lines ? linesView(s.lines.map(l => ['A', l[0], l[1]])) : null,
      s.search ? h('div', { class: 'tip' }, '🎵 Melodía: busca en YouTube «', h('b', {}, s.search), '». Escúchala tú antes, sin los niños.') : null,
    );
  },
  sound(step) {
    const s = step.sound;
    return h('div', {},
      h('div', { class: 'tip' }, s.tip),
      h('div', { class: 'lines' }, s.words.map(([de, es]) => h('div', { class: 'line' },
        h('span', { class: 'who N' }, s.focus),
        h('span', {}, h('span', { class: 't' }, de), h('span', { class: 'es-inline' }, es)),
        h('span', { style: { display: 'flex', gap: '8px' } },
          h('button', { class: 'say-btn', onclick: () => say(de) }, '🔊'),
          h('button', { class: 'say-btn', onclick: () => say(de, { rate: 0.6 }) }, '🐢')),
      ))),
    );
  },

  find: findGame,
  was: wasGame,
  fehlt: fehltGame,
  end: () => h('div'),
};

function linesView(lines, tip) {
  let cur = 0;
  const rows = lines.map(([who, de, es, help], i) => {
    const row = h('div', { class: `line ${who}` },
      h('span', { class: `who ${who}` }, WHO[who] || who),
      h('span', {}, h('span', { class: 't' }, de), es ? h('span', { class: 'es-inline' }, es) : null, help ? h('span', { class: 'help' }, '↳ ' + help) : null),
      h('button', { class: 'say-btn', onclick: e => { e.stopPropagation(); setCur(i); say(de); } }, '🔊'),
    );
    row.onclick = () => setCur(i);
    return row;
  });
  function setCur(i) { cur = i; rows.forEach((r, k) => r.classList.toggle('cur', k === i)); }
  setCur(0);
  const all = h('button', { class: 'btn', onclick: () => sayQueue(lines.map(l => l[1]), { gap: 700 }) }, '▶️ Todo seguido');
  return h('div', {},
    tip ? h('div', { class: 'tip' }, tip) : null,
    h('div', { class: 'lines' }, rows),
    h('div', { class: 'actions' }, all),
  );
}
const WHO = { L: 'Tú', K: 'Niños', A: 'Todos', N: '' };

// Mazo de tarjetas grandes con flechas.
function cardDeck(step, textOf, bodyOf, isWord = false) {
  let i = 0;
  const wrap = h('div', {});
  const draw = () => {
    const it = step.items[i];
    if (isWord) seen(it.id);
    const prev = h('button', { class: 'act', onclick: () => { if (i > 0) { i--; draw(); } } }, '◀');
    const next = h('button', { class: 'act', onclick: () => { if (i < step.items.length - 1) { i++; draw(); say(textOf(step.items[i])); } } }, '▶');
    const extra = isWord && it.plFull ? h('button', { class: 'act', onclick: () => say(it.plFull) }, '👥', h('small', {}, 'Plural')) : null;
    wrap.replaceChildren(
      step.tip && i === 0 ? h('div', { class: 'tip' }, step.tip) : null,
      h('div', { class: 'stage pop' },
        picEl(it),
        h('div', {}, bodyOf(it), h('div', { class: 'actions' }, speakBtns(textOf(it)), extra),
          h('div', { class: 'actions' }, prev, next, counter(i, step.items.length),
            h('button', { class: 'pill', onclick: () => overview() }, '▦ Todas'))),
      ),
    );
  };
  const overview = () => {
    wrap.replaceChildren(h('div', { class: 'choices' }, step.items.map((it, k) => {
      const b = h('button', { class: 'choice', onclick: () => { i = k; draw(); say(textOf(it)); } }, picEl(it, 'x'), h('span', { class: `lbl ${it.cls || ''}` }, textOf(it)));
      b.querySelector('.x').style.cssText = 'font-size:80px;display:grid;place-items:center;width:100%;height:100%';
      return b;
    })));
  };
  draw();
  setTimeout(() => say(textOf(step.items[0])), 250);
  return wrap;
}

// ---------- juegos ----------
// "Wo ist der Apfel?" / "Zeig mir den Apfel!": los niños tocan el dibujo.
function findGame(step) {
  const pool = step.items;
  if (!pool.length) return h('div', {}, '—');
  const n = Math.min(pool.length <= 6 ? pool.length : 6, 6);
  let order = shuffle(pool), round = 0, hits = 0;
  const wrap = h('div', {});
  const q = w => {
    if (step.unit?.findQ) return step.unit.findQ(w, step.mode);
    if (!w.noun) return `Zeig mir: ${w.de}!`;
    if (w.art === 'pl') return `Wo sind ${w.full}?`;
    return step.mode === 'zeig' ? `Zeig mir ${acc(w)}!` : `Wo ist ${w.full}?`;
  };
  const draw = () => {
    if (round >= order.length) { done(); return; }
    const target = order[round];
    const others = shuffle(pool.filter(w => w !== target)).slice(0, n - 1);
    const opts = shuffle([target, ...others]);
    const text = q(target);
    let tried = false;
    wrap.replaceChildren(
      h('div', { class: 'tip' }, round === 0 ? 'Pulsa 🔊 o lee tú la pregunta. Si fallan, la app dice lo que han tocado: también es aprender. Variante sin tablet: pon objetos reales en la mesa.' : null),
      h('div', { class: 'prompt' }, text, h('div', { class: 'es' }, target.es)),
      h('div', { class: 'choices row', style: { '--n': opts.length } }, opts.map(w => {
        const b = h('button', { class: 'choice' }, picEl(w, 'x'));
        b.querySelector('.x').style.cssText = 'font-size:96px;display:grid;place-items:center;width:100%;height:100%';
        b.onclick = async () => {
          if (w === target) {
            b.classList.add('right'); sfx.yes(); if (!tried) hits++;
            await say(pick(['Super!', 'Richtig!', 'Genau!', 'Toll!']) + ' ' + (w.noun ? `Das ist ${w.full}.` : cap(w.de) + '!'));
            round++; draw();
          } else {
            tried = true; b.classList.add('wrong'); sfx.soft();
            await say(w.noun ? `Das ist ${w.full}.` : cap(w.de) + '.');
          }
        };
        return b;
      })),
      h('div', { class: 'actions' }, h('button', { class: 'act', onclick: () => say(text) }, '🔊'), counter(round, order.length)),
    );
    setTimeout(() => say(text), 300);
  };
  const done = () => {
    sfx.done();
    wrap.replaceChildren(h('div', { class: 'board' }, h('div', { class: 't' }, 'Super gemacht! 🌟'), h('div', { class: 'es' }, `${hits} de ${order.length} a la primera`)),
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => { order = shuffle(pool); round = 0; hits = 0; draw(); } }, '🔁 Otra vez')));
    say('Super gemacht!');
  };
  draw();
  return wrap;
}

// "Was ist das?": el niño responde, tú compruebas y marcas (alimenta el repaso).
function wasGame(step) {
  let i = 0;
  const items = step.items;
  const wrap = h('div', {});
  const answer = w => w.ans || step.unit?.wasA?.(w) || (w.noun ? (w.art === 'pl' ? `Das sind ${w.de}.` : `Das ist ${indef(w)}.`) : cap(w.de) + '.');
  const ask = w => w.ask || (step.unit?.wasQ?.(w)) || 'Was ist das?';
  const draw = () => {
    if (i >= items.length) { sfx.done(); wrap.replaceChildren(h('div', { class: 'board' }, h('div', { class: 't' }, 'Fertig! Prima! 🎉'))); say('Fertig! Prima!'); return; }
    const w = items[i];
    const rev = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      i === 0 ? h('div', { class: 'tip' }, 'Pregunta y espera. Si dicen solo «Apfel», devuélvelo en frase: «Ja! Das ist ein Apfel.» Luego marca: 👍 lo dijo (aunque sea con ayuda pequeña) o 🔁 todavía no. Así el repaso sabe qué palabras volver a sacar.') : null,
      h('div', { class: 'stage' }, picEl(w),
        h('div', {},
          h('div', { class: 'de long' }, ask(w)),
          h('div', { class: 'actions' }, h('button', { class: 'act', onclick: () => say(ask(w)) }, '🔊'),
            h('button', { class: 'btn primary', onclick: () => {
              rev.replaceChildren(h('div', { class: `de ${w.cls}` }, answer(w)), h('div', { class: 'es' }, w.es),
                h('div', { class: 'mark' },
                  h('button', { class: 'btn ok', onclick: () => { grade(w.id, true); sfx.yes(); i++; draw(); } }, '👍 Lo dijo'),
                  h('button', { class: 'btn', onclick: () => { grade(w.id, false); i++; draw(); } }, '🔁 Todavía no')));
              say(answer(w));
            } }, 'Ver respuesta'), counter(i, items.length)),
          rev)),
    );
    setTimeout(() => say(ask(w)), 300);
  };
  draw();
  return wrap;
}

// "Was fehlt?": se tapan los ojos, desaparece un dibujo, ¿cuál falta?
function fehltGame(step) {
  const wrap = h('div', {});
  const round = () => {
    const set = shuffle(step.items).slice(0, Math.min(5, step.items.length));
    const gone = pick(set);
    const grid = h('div', { class: 'choices row', style: { '--n': set.length } }, set.map(w => {
      const b = h('button', { class: 'choice' }, picEl(w, 'x'), h('span', { class: `lbl ${w.cls}` }, w.full));
      b.querySelector('.x').style.cssText = 'font-size:90px;display:grid;place-items:center;width:100%;height:100%';
      b.dataset.id = w.id;
      return b;
    }));
    const btn = h('button', { class: 'btn primary' }, '🙈 Augen zu!');
    const out = h('div', { class: 'reveal' });
    btn.onclick = async () => {
      btn.disabled = true;
      await say('Augen zu!');
      grid.style.visibility = 'hidden';
      await new Promise(r => setTimeout(r, 1800));
      grid.querySelector(`[data-id="${CSS.escape(gone.id)}"]`).classList.add('gone');
      grid.style.visibility = '';
      await say('Augen auf! Was fehlt?');
      btn.replaceWith(h('button', { class: 'btn', onclick: () => {
        grid.querySelector(`[data-id="${CSS.escape(gone.id)}"]`).classList.remove('gone');
        const t = gone.art === 'pl' ? `${cap(gone.full)} fehlen!` : `${cap(gone.noun ? gone.full : gone.de)} fehlt!`;
        out.replaceChildren(h('div', { class: `de ${gone.cls}` }, t), h('button', { class: 'btn', style: { marginTop: '12px' }, onclick: round }, '🔁 Nochmal'));
        sfx.yes(); say(t);
      } }, '👀 Ver cuál falta'));
    };
    wrap.replaceChildren(
      h('div', { class: 'tip' }, 'Decid juntos todas las palabras en voz alta. Luego «Augen zu!» (ojos cerrados, manos en la cara), desaparece una y «Augen auf! Was fehlt?». Quien lo sepa lo dice con artículo: «Der Apfel!». Con objetos reales y un trapo funciona igual de bien.'),
      grid, h('div', { class: 'actions' }, btn), out,
    );
  };
  round();
  return wrap;
}

export { releaseMic };
