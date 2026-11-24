// Morgenkreis (ritual diario), Rechnen (matemáticas en alemán) y Wiederholen (repaso espaciado).

import { h, shuffle, pick, rnd, cap, word, picEl, indef, grade, allBoxes, toast } from './ui.js';
import { say, sayQueue, sfx } from './speech.js';
import { deNum, esNum, NUM_TIPS } from './zahlen.js';

// ================= MORGENKREIS =================
const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const TAGE_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const MONATE_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const ORD = { 1: 'erste', 3: 'dritte', 7: 'siebte', 8: 'achte' };
export const ordinal = n => ORD[n] || (n < 20 ? deNum(n) + 'te' : deNum(n) + 'ste');   // der siebzehnte
function season(d) {
  const m = d.getMonth(), day = d.getDate();
  if ((m === 2 && day >= 20) || m === 3 || m === 4 || (m === 5 && day < 21)) return ['der Frühling', 'Es ist Frühling.', 'primavera', '🌷'];
  if ((m === 5 && day >= 21) || m === 6 || m === 7 || (m === 8 && day < 22)) return ['der Sommer', 'Es ist Sommer.', 'verano', '☀️'];
  if ((m === 8 && day >= 22) || m === 9 || m === 10 || (m === 11 && day < 21)) return ['der Herbst', 'Es ist Herbst.', 'otoño', '🍂'];
  return ['der Winter', 'Es ist Winter.', 'invierno', '❄️'];
}

const GEFUEHLE = [
  ['😀', 'Mir geht es gut.', 'Estoy bien.'], ['🤩', 'Mir geht es super!', '¡Estoy genial!'], ['😐', 'Es geht so.', 'Regular.'],
  ['😴', 'Ich bin müde.', 'Estoy cansado.'], ['😢', 'Ich bin traurig.', 'Estoy triste.'], ['😠', 'Ich bin wütend.', 'Estoy enfadado.'],
  ['🤒', 'Ich bin krank.', 'Estoy malito.'], ['🤤', 'Ich habe Hunger.', 'Tengo hambre.'],
];
const WETTER = [
  ['☀️', 'Die Sonne scheint.', 'Hace sol.'], ['⛅', 'Es ist bewölkt.', 'Está nublado.'], ['🌧️', 'Es regnet.', 'Llueve.'],
  ['💨', 'Es ist windig.', 'Hace viento.'], ['🌫️', 'Es ist neblig.', 'Hay niebla.'], ['⛈️', 'Es gewittert.', 'Hay tormenta.'],
  ['❄️', 'Es schneit.', 'Nieva.'], ['🥶', 'Es ist kalt.', 'Hace frío.'], ['🥵', 'Es ist heiß.', 'Hace calor.'], ['🌤️', 'Es ist warm.', 'Hace bueno.'],
];

function options(list, onPick) {
  return h('div', { class: 'mk-grid' }, list.map(([e, de, es]) => {
    const b = h('button', { class: 'mk-opt' }, h('span', { class: 'e' }, e), h('b', {}, de), h('small', { class: 'es-inline' }, es));
    b.onclick = () => { b.parentNode.querySelectorAll('.on').forEach(x => x.classList.remove('on')); b.classList.add('on'); onPick ? onPick(de) : say(de); };
    return b;
  }));
}

export function morgenkreisSteps(nextLesson) {
  const d = new Date(), wd = d.getDay();
  const heute = `Heute ist ${TAGE[wd]}.`, gestern = `Gestern war ${TAGE[(wd + 6) % 7]}.`, morgen = `Morgen ist ${TAGE[(wd + 1) % 7]}.`;
  const datum = `Heute ist der ${ordinal(d.getDate())} ${MONATE[d.getMonth()]}.`;
  const [, seasonSay, seasonEs, seasonE] = season(d);
  return [
    { type: 'custom', kind: 'Morgenkreis', title: 'Guten Morgen!', min: 2, view: () => h('div', {},
      h('div', { class: 'tip' }, 'El Morgenkreis es el ritual de cada día (5–8 min). Siempre en el mismo sitio y con la misma canción. Con el tiempo, que lo dirija uno de los niños: «Heute bist du die Lehrerin!»'),
      lineList([
        ['L', 'Guten Morgen, Kinder!', '¡Buenos días, niños!'], ['K', 'Guten Morgen!', ''],
        ['A', 'Guten Morgen, guten Morgen, wie geht es dir? Wie geht es dir?', 'Canción con la melodía de «Bruder Jakob» (Frère Jacques)'],
        ['A', 'Mir geht es gut, danke! Mir geht es gut, danke! Und wie geht es dir?', ''],
        ['L', 'Wir setzen uns in den Kreis.', 'Nos sentamos en corro.'],
      ])) },
    { type: 'custom', kind: 'Morgenkreis', title: 'Wer ist heute da?', min: 1, view: () => h('div', {},
      h('div', { class: 'tip' }, 'Pasa lista: di cada nombre y que respondan «Ich bin da!» levantando la mano. Luego contad cuántos sois.'),
      lineList([['L', 'Wer ist heute da?', '¿Quién ha venido hoy?'], ['K', 'Ich bin da!', '¡Estoy aquí!'], ['L', 'Wie viele Kinder sind heute da?', '¿Cuántos niños hay hoy?']]),
      h('div', { class: 'numpad' }, [1, 2, 3, 4, 5, 6].map(n => h('button', { onclick: () => say(n === 1 ? 'Heute ist ein Kind da.' : `Heute sind ${deNum(n)} Kinder da.`) }, n))),
    ) },
    { type: 'custom', kind: 'Morgenkreis', title: 'Wie geht es dir?', min: 2, view: () => h('div', {},
      h('div', { class: 'tip' }, 'Pregunta a cada niño. Que toque su cara. Contesta tú también y pregunta de vuelta: así aprenden «Und dir?». Si dice «traurig», pregunta «Warum?» y ayúdale: «Weil …?»'),
      lineList([['L', 'Wie geht es dir?', '¿Cómo estás?'], ['K', 'Mir geht es gut. Und dir?', 'Estoy bien. ¿Y tú?']]),
      options(GEFUEHLE)) },
    { type: 'custom', kind: 'Morgenkreis', title: 'Welcher Tag ist heute?', min: 2, view: () => h('div', {},
      h('div', { class: 'board' }, h('div', { class: 't' }, heute), h('div', { class: 'es' }, `Hoy es ${TAGE_ES[wd]}, ${d.getDate()} de ${MONATE_ES[d.getMonth()]}. ${seasonE} ${seasonEs}`)),
      h('div', { class: 'tip' }, 'Pregunta y deja que intenten decirlo. Recitad juntos los días de la semana (con palmas, una por día). Los días son todos masculinos: «der Montag», «am Montag».'),
      lineList([['L', 'Welcher Tag ist heute?', '¿Qué día es hoy?'], ['K', heute, ''], ['L', gestern, 'Ayer fue…'], ['L', morgen, 'Mañana es…'], ['L', datum, 'La fecha (para los mayores)'], ['L', seasonSay, '']]),
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => sayQueue(TAGE.slice(1).concat(TAGE[0]), { gap: 450 }) }, '📅 Montag … Sonntag'))) },
    { type: 'custom', kind: 'Morgenkreis', title: 'Wie ist das Wetter?', min: 2, view: () => h('div', {},
      h('div', { class: 'tip' }, 'Mirad por la ventana de verdad. Que el niño elija y lo diga. Si dice «Sonne!», expande: «Ja, die Sonne scheint. Es ist warm.»'),
      lineList([['L', 'Wie ist das Wetter heute?', '¿Qué tiempo hace hoy?'], ['L', 'Schaut mal aus dem Fenster!', '¡Mirad por la ventana!']]),
      options(WETTER, de => say('Heute … ' + de))) },
    { type: 'custom', kind: 'Morgenkreis', title: 'Was machen wir heute?', min: 1, view: () => h('div', {},
      h('div', { class: 'board' }, h('div', { class: 't' }, nextLesson ? `Heute: ${nextLesson.title}` : 'Heute spielen wir!'), h('div', { class: 'es' }, nextLesson ? nextLesson.es : '')),
      h('div', { class: 'tip' }, 'Cuenta el plan del día con 2–3 frases. Al terminar el Morgenkreis, vuelve al inicio y abre la clase que toca (aparece arriba en «Weiter geht’s»).'),
      lineList([['L', 'Was machen wir heute?', '¿Qué hacemos hoy?'], ['L', 'Zuerst … dann … und dann spielen wir.', 'Primero… luego… y luego jugamos.'], ['L', 'Los geht’s!', '¡Vamos allá!']])) },
  ];
}

function lineList(lines) {
  return h('div', { class: 'lines' }, lines.map(([who, de, es]) => h('div', { class: `line ${who}` },
    h('span', { class: `who ${who}` }, { L: 'Tú', K: 'Niños', A: 'Todos' }[who]),
    h('span', {}, h('span', { class: 't' }, de), es ? h('span', { class: 'es-inline' }, es) : null),
    h('button', { class: 'say-btn', onclick: () => say(de) }, '🔊'))));
}

// ================= RECHNEN =================
const DINGE = [ // [emoji, singular, plural]
  ['🍎', 'Apfel', 'Äpfel'], ['⭐', 'Stern', 'Sterne'], ['🦆', 'Ente', 'Enten'], ['🚗', 'Auto', 'Autos'],
  ['⚽', 'Ball', 'Bälle'], ['🌸', 'Blume', 'Blumen'], ['🐟', 'Fisch', 'Fische'], ['🐱', 'Katze', 'Katzen'],
  ['🍌', 'Banane', 'Bananen'], ['🎈', 'Luftballon', 'Luftballons'], ['🐞', 'Marienkäfer', 'Marienkäfer'], ['🍪', 'Keks', 'Kekse'],
];
const many = (n, d) => n === 1 ? `ein${['Ente', 'Blume', 'Katze', 'Banane'].includes(d[1]) ? 'e' : ''} ${d[1]}` : `${deNum(n)} ${d[2]}`;

export const RECHNEN = [
  { id: 'karten', e: '🔢', t: 'Zahlen 0–20', es: 'Tarjetas de números con pronunciación' },
  { id: 'zaehlen', e: '👆', t: 'Zählen', es: 'Contar tocando uno a uno' },
  { id: 'wieviele', e: '❓', t: 'Wie viele?', es: '¿Cuántos hay?' },
  { id: 'nachbarn', e: '↔️', t: 'Davor und danach', es: '¿Qué número va antes / después?' },
  { id: 'mehr', e: '⚖️', t: 'Mehr oder weniger?', es: 'Comparar cantidades' },
  { id: 'plus', e: '➕', t: 'Plus', es: 'Sumas hasta 10 (y hasta 20)' },
  { id: 'minus', e: '➖', t: 'Minus', es: 'Restas hasta 10' },
  { id: 'geschichten', e: '📖', t: 'Rechengeschichten', es: 'Problemas contados como cuento' },
  { id: 'uhr', e: '🕒', t: 'Die Uhr', es: 'En punto y y media' },
];

export function rechnenView(id, max = 10) {
  const R = { karten, zaehlen, wieviele, nachbarn, mehr, plus, minus, geschichten, uhr }[id];
  return R(max);
}

function numpad(maxN, right, onRight, onWrong) {
  return h('div', { class: 'numpad' }, Array.from({ length: maxN + 1 }, (_, n) => {
    const b = h('button', {}, n);
    b.onclick = () => { if (n === right) { b.classList.add('right'); sfx.yes(); onRight(); } else { b.classList.add('wrong'); sfx.soft(); onWrong?.(n); } };
    return b;
  }));
}
const tip = t => h('div', { class: 'tip' }, t);
const praise = () => pick(['Richtig!', 'Super!', 'Genau!', 'Klasse!', 'Prima!']);

function karten(max) {
  let n = 0;
  const wrap = h('div', {});
  const draw = () => {
    wrap.replaceChildren(
      n === 0 ? tip('Di el número, que lo repitan y que lo enseñen con los dedos. Con 3–4 años, quedaos en 1–10 varias semanas antes de seguir. Del 13 al 19 son «tres-diez», «cuatro-diez»: el número pequeño va primero, como luego en el 21.') : null,
      h('div', { class: 'stage pop' }, h('div', { class: 'pic', style: { fontSize: '170px', fontWeight: 900, color: 'var(--accent)' } }, n),
        h('div', {}, h('div', { class: 'de' }, cap(deNum(n))), h('div', { class: 'es' }, esNum(n)),
          NUM_TIPS[n] ? h('div', { class: 'pron' }, '🗣️ ' + NUM_TIPS[n]) : null,
          h('div', { style: { fontSize: '34px', marginTop: '12px' } }, '●'.repeat(Math.min(n, 10)), n > 10 ? ' ' + '●'.repeat(n - 10) : ''),
          h('div', { class: 'actions' }, h('button', { class: 'act', onclick: () => say(deNum(n)) }, '🔊'), h('button', { class: 'act', onclick: () => say(deNum(n), { rate: 0.6 }) }, '🐢')))),
      h('div', { class: 'actions' },
        h('button', { class: 'act', onclick: () => { if (n > 0) { n--; draw(); say(deNum(n)); } } }, '◀'),
        h('button', { class: 'act', onclick: () => { if (n < 20) { n++; draw(); say(deNum(n)); } } }, '▶'),
        h('button', { class: 'btn', onclick: () => sayQueue(Array.from({ length: max }, (_, k) => deNum(k + 1)), { gap: 250 }) }, `▶️ 1 bis ${max}`)),
    );
  };
  draw();
  return wrap;
}

function zaehlen(max) {
  const wrap = h('div', {});
  const round = () => {
    const d = pick(DINGE), n = rnd(3, max);
    let c = 0;
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip('Que el niño toque cada dibujo UNA vez mientras contáis en voz alta todos juntos. Lo importante a esta edad: un número por objeto, y que el último número dice cuántos hay.'),
      h('div', { class: 'prompt' }, `Zählt die ${d[2]}!`),
      h('div', { class: 'dots-count' }, Array.from({ length: n }, () => {
        const b = h('button', {}, d[0]);
        b.onclick = async () => {
          if (b.classList.contains('on')) return;
          c++; b.classList.add('on'); b.append(h('span', { class: 'num' }, c)); sfx.tap();
          await say(deNum(c));
          if (c === n) { sfx.done(); const t = `Das sind ${many(n, d)}!`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '🔁 Nochmal')); say(t); }
        };
        return b;
      })), out);
    say(`Zählt die ${d[2]}!`);
  };
  round();
  return wrap;
}

function wieviele(max) {
  const wrap = h('div', {});
  const round = () => {
    const d = pick(DINGE), n = rnd(1, max);
    const q = `Wie viele ${d[2]} siehst du?`;
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip('Pregunta, deja contar (con el dedo en la pantalla) y que conteste con frase: «Ich sehe fünf Enten.» Pueden tocar el número abajo.'),
      h('div', { class: 'prompt' }, q),
      h('div', { class: 'dots-count' }, Array.from({ length: n }, () => h('button', {}, d[0]))),
      numpad(max, n, () => { const t = `${praise()} Das sind ${many(n, d)}.`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '➡️ Weiter')); say(t); },
        () => say('Zähl noch einmal!')), out);
    say(q);
  };
  round();
  return wrap;
}

function nachbarn(max) {
  const wrap = h('div', {});
  const round = () => {
    const after = Math.random() < 0.6, n = after ? rnd(1, max - 1) : rnd(1, max);
    const right = after ? n + 1 : n - 1;
    const q = after ? `Welche Zahl kommt nach ${deNum(n)}?` : `Welche Zahl kommt vor ${deNum(n)}?`;
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip('«nach» = después, «vor» = antes. Si no sale, contad juntos desde 1 hasta el número.'),
      h('div', { class: 'prompt' }, q, h('div', { class: 'es' }, after ? `¿Qué número va después del ${n}?` : `¿Qué número va antes del ${n}?`)),
      h('div', { class: 'sum' }, after ? [n, ' → ', '?'] : ['?', ' → ', n]),
      numpad(max, right, () => { const t = after ? `${praise()} Nach ${deNum(n)} kommt ${deNum(right)}.` : `${praise()} Vor ${deNum(n)} kommt ${deNum(right)}.`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '➡️ Weiter')); say(t); }), out);
    say(q);
  };
  round();
  return wrap;
}

function mehr(max) {
  const wrap = h('div', {});
  const round = () => {
    const d = pick(DINGE);
    let a = rnd(1, max), b = rnd(1, max);
    if (a === b) b = a === max ? a - 1 : a + 1;
    const askMore = Math.random() < 0.6;
    const q = askMore ? `Wo sind mehr ${d[2]}?` : `Wo sind weniger ${d[2]}?`;
    const out = h('div', { class: 'reveal' });
    const group = (n, isRight) => {
      const g = h('button', { class: 'choice', style: { aspectRatio: 'auto', minHeight: '220px', fontSize: '40px', padding: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignContent: 'center', justifyContent: 'center' } }, d[0].repeat(n).match(/./gu).map(x => h('span', {}, x)));
      g.onclick = () => {
        if (isRight) { g.classList.add('right'); sfx.yes(); const big = Math.max(a, b), small = Math.min(a, b); const t = `${praise()} ${cap(deNum(big))} ist mehr als ${deNum(small)}.`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '➡️ Weiter')); say(t); }
        else { g.classList.add('wrong'); sfx.soft(); say('Zählen wir mal!'); }
      };
      return g;
    };
    const rightA = askMore ? a > b : a < b;
    wrap.replaceChildren(
      tip('Primero que miren y adivinen sin contar (¡a ojo!); luego contad para comprobar. Frases: «mehr» (más), «weniger» (menos), «gleich viel» (igual).'),
      h('div', { class: 'prompt' }, q),
      h('div', { class: 'choices', style: { gridTemplateColumns: '1fr 1fr' } }, group(a, rightA), group(b, !rightA)), out);
    say(q);
  };
  round();
  return wrap;
}

function opView(a, b, op, d) {
  const groupA = h('div', { class: 'group' }, Array.from({ length: a }, (_, k) => h('span', { class: op === '-' && k >= a - b ? 'x' : '' }, d[0])));
  return h('div', { class: 'sum' }, groupA, op === '+' ? ['+', h('div', { class: 'group' }, Array.from({ length: b }, () => h('span', {}, d[0])))] : null);
}
function plus(max) { return calc(max, '+'); }
function minus(max) { return calc(max, '-'); }
function calc(max, op) {
  const wrap = h('div', {});
  const round = () => {
    const d = pick(DINGE);
    let a, b;
    if (op === '+') { a = rnd(1, max - 1); b = rnd(1, max - a); } else { a = rnd(2, max); b = rnd(1, a - 1); }
    const r = op === '+' ? a + b : a - b;
    const opDe = op === '+' ? 'plus' : 'minus';
    const q = `Wie viel ist ${deNum(a)} ${opDe} ${deNum(b)}?`;
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip(op === '+' ? 'Lee la cuenta, contad los dibujos (o usad los dedos) y que respondan con la frase entera: «Drei plus zwei ist fünf.» También se dice «drei und zwei sind fünf».' : 'Los tachados son los que «se van». «Fünf minus zwei ist drei.» Cuéntalo como historia: «Fünf Äpfel. Ich esse zwei. Wie viele sind noch da?»'),
      h('div', { class: 'prompt' }, `${a} ${op === '+' ? '+' : '−'} ${b} = ?`, h('div', { class: 'es' }, q)),
      opView(a, b, op, d),
      numpad(max, r, () => { const t = `${praise()} ${cap(deNum(a))} ${opDe} ${deNum(b)} ist ${deNum(r)}.`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '➡️ Weiter')); say(t); },
        () => say('Zählen wir zusammen!')), out);
    say(q);
  };
  round();
  return wrap;
}

function geschichten(max) {
  const STORIES = [
    (a, b) => [`${cap(deNum(a))} Enten schwimmen im See. ${cap(deNum(b))} Enten kommen dazu. Wie viele Enten sind jetzt im See?`, a + b, '🦆', `${cap(deNum(a))} patos nadan. Llegan ${esNum(b)}. ¿Cuántos hay?`, '+'],
    (a, b) => [`Auf dem Tisch liegen ${deNum(a)} Kekse. Papa isst ${deNum(b)}. Wie viele Kekse sind noch da?`, a - b, '🍪', `Hay ${esNum(a)} galletas. Papá se come ${esNum(b)}. ¿Cuántas quedan?`, '-'],
    (a, b) => [`Du hast ${deNum(a)} Luftballons. Du bekommst ${deNum(b)} dazu. Wie viele hast du jetzt?`, a + b, '🎈', `Tienes ${esNum(a)} globos y te dan ${esNum(b)}. ¿Cuántos tienes?`, '+'],
    (a, b) => [`Im Baum sitzen ${deNum(a)} Vögel. ${cap(deNum(b))} fliegen weg. Wie viele sitzen noch im Baum?`, a - b, '🐦', `Hay ${esNum(a)} pájaros. Se van ${esNum(b)}. ¿Cuántos quedan?`, '-'],
    (a, b) => [`Mama kauft ${deNum(a)} Äpfel und ${deNum(b)} Bananen. Wie viel Obst ist das zusammen?`, a + b, '🍎', `Mamá compra ${esNum(a)} manzanas y ${esNum(b)} plátanos. ¿Cuánta fruta en total?`, '+'],
  ];
  const wrap = h('div', {});
  const round = () => {
    const f = pick(STORIES);
    let a, b; const plusOp = f(2, 1)[4] === '+';
    if (plusOp) { a = rnd(1, max - 1); b = rnd(1, Math.min(4, max - a)); } else { a = rnd(3, max); b = rnd(1, Math.min(4, a - 1)); }
    const [text, r, e, es] = f(a, b);
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip('Lee el cuento despacio y representadlo con juguetes o con los dedos. Es la mejor forma de unir lengua y cálculo: tienen que entender la historia para resolverla.'),
      h('div', { class: 'board' }, h('div', { class: 't', style: { fontSize: '32px' } }, text), h('div', { class: 'es' }, es)),
      h('div', { class: 'actions' }, h('button', { class: 'act', onclick: () => say(text) }, '🔊'), h('button', { class: 'act', onclick: () => say(text, { rate: 0.7 }) }, '🐢')),
      h('div', { class: 'sum' }, h('div', { class: 'group' }, e.repeat(a).match(/./gu))),
      numpad(max, r, () => { const t = `${praise()} Es sind ${deNum(r)}.`; out.replaceChildren(h('div', { class: 'de long' }, t), h('button', { class: 'btn', onclick: round }, '➡️ Weiter')); say(t); }), out);
    say(text);
  };
  round();
  return wrap;
}

function clockSvg(hh, mm) {
  const ns = 'http://www.w3.org/2000/svg';
  const s = document.createElementNS(ns, 'svg'); s.setAttribute('viewBox', '0 0 200 200'); s.setAttribute('class', 'clock');
  let inner = '<circle cx="100" cy="100" r="92" fill="#fff" stroke="#2F5D8A" stroke-width="8"/>';
  for (let k = 1; k <= 12; k++) { const a = k * Math.PI / 6; inner += `<text x="${100 + 70 * Math.sin(a)}" y="${100 - 70 * Math.cos(a) + 7}" font-size="20" font-weight="900" text-anchor="middle" fill="#1E2A33" font-family="Nunito">${k}</text>`; }
  const ha = ((hh % 12) + mm / 60) * Math.PI / 6, ma = mm * Math.PI / 30;
  inner += `<line x1="100" y1="100" x2="${100 + 45 * Math.sin(ha)}" y2="${100 - 45 * Math.cos(ha)}" stroke="#D8344A" stroke-width="9" stroke-linecap="round"/>`;
  inner += `<line x1="100" y1="100" x2="${100 + 68 * Math.sin(ma)}" y2="${100 - 68 * Math.cos(ma)}" stroke="#2A6FDB" stroke-width="6" stroke-linecap="round"/><circle cx="100" cy="100" r="7" fill="#1E2A33"/>`;
  s.innerHTML = inner;
  return s;
}
function uhr() {
  const wrap = h('div', {});
  let half = false;
  const round = () => {
    const hh = rnd(1, 12), mm = half && Math.random() < 0.5 ? 30 : 0;
    const t = mm ? `Es ist halb ${deNum(hh === 12 ? 1 : hh + 1).replace(/^eins$/, 'eins')}.` : `Es ist ${hh === 1 ? 'ein' : deNum(hh)} Uhr.`;
    const out = h('div', { class: 'reveal' });
    wrap.replaceChildren(
      tip('La aguja corta (roja) dice la hora. Empezad solo con horas en punto («Es ist drei Uhr»). OJO con la media: en alemán «halb vier» = las TRES y media (media hacia las cuatro). Lo mejor: relacionarlo con su día — «Um acht Uhr frühstücken wir».'),
      h('div', { class: 'prompt' }, 'Wie spät ist es?', h('div', { class: 'es' }, '¿Qué hora es?')),
      clockSvg(hh, mm),
      h('div', { class: 'actions', style: { justifyContent: 'center' } },
        h('button', { class: 'btn primary', onclick: () => { out.replaceChildren(h('div', { class: 'de long' }, t), h('div', { class: 'es' }, mm ? `Son las ${esNum(hh)} y media.` : `Son las ${esNum(hh)}.`)); say(t); } }, 'Ver respuesta'),
        h('button', { class: 'btn', onclick: round }, '➡️ Weiter'),
        h('button', { class: `pill ${half ? 'on' : ''}`, onclick: () => { half = !half; round(); } }, '½ halb')),
      out);
    say('Wie spät ist es?');
  };
  round();
  return wrap;
}

// ================= WIEDERHOLEN =================
// Saca primero las palabras con repaso pendiente (cajas de Leitner), luego las más flojas.
export function reviewItems(units, n = 10) {
  const boxes = allBoxes(), now = Date.now();
  const byId = {};
  units.forEach(u => u.words.forEach(a => { const w = word(a, u.id); byId[w.id] = w; }));
  const known = Object.entries(boxes).filter(([id]) => byId[id]);
  const due = known.filter(([, b]) => b.due <= now).sort((x, y) => x[1].b - y[1].b);
  const rest = known.filter(([, b]) => b.due > now).sort((x, y) => x[1].b - y[1].b);
  return { items: shuffle([...due, ...rest].slice(0, n).map(([id]) => byId[id])), due: due.length, total: known.length };
}
