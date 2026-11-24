// Voz alemana (y española para las ayudas).
// 1) Si existe un audio grabado (audio/index.json: { de: { clave: [archivo, inicio, fin] } }) se usa ese.
// 2) Si no, la voz del sistema (en Android: Google TTS alemán, que suena bastante bien).

let ctx = null;
let audioIndex = {};
let voices = [];
let current = null;
let token = 0;
const buffers = {};
const sleep = ms => new Promise(r => setTimeout(r, ms));
const LANG = { de: 'de-DE', es: 'es-ES' };

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export async function initVoice() {
  try { audioIndex = await (await fetch('audio/index.json')).json(); } catch { audioIndex = {}; }
  if ('speechSynthesis' in window) {
    const load = () => { voices = speechSynthesis.getVoices(); };
    load();
    speechSynthesis.onvoiceschanged = load;
  }
}

export function unlock() { try { ac(); } catch {} }

// "Guten Morgen!" -> "guten-morgen"
export function keyOf(text) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const hasRecorded = (text, lang = 'de') => !!audioIndex[lang]?.[keyOf(text)];

export function hasGermanVoice() {
  return voices.some(v => v.lang.replace('_', '-').toLowerCase().startsWith('de'));
}

function pickVoice(lang) {
  const code = LANG[lang];
  const same = voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(code.slice(0, 2)));
  return same.find(v => v.lang.replace('_', '-') === code && /google/i.test(v.name))
      || same.find(v => v.lang.replace('_', '-') === code)
      || same[0] || null;
}

function buffer(file) {
  buffers[file] ??= fetch('audio/' + file).then(r => r.arrayBuffer()).then(b => ac().decodeAudioData(b))
    .catch(e => { delete buffers[file]; throw e; });
  return buffers[file];
}

async function playClip([file, start, end], rate) {
  const buf = await buffer(file);
  start = Math.max(0, start - 0.06);
  end = Math.min(buf.duration, end + 0.12);
  const c = ac();
  const src = c.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = rate;
  src.connect(c.destination);
  src.start(0, start, end - start);
  current = src;
  return (end - start) / rate;
}

export function stop() {
  token++;
  try { current?.stop(); } catch {}
  current = null;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

// Dice una frase. rate 0.7 = despacio (para que el niño la oiga bien).
export async function say(text, { lang = 'de', rate = 1 } = {}) {
  stop();
  const my = token;
  return sayOne(text, lang, rate, my);
}

// Varias frases seguidas, con pausa. Se corta si empieza otra.
export async function sayQueue(texts, { lang = 'de', gap = 350, rate = 1 } = {}) {
  stop();
  const my = token;
  for (const t of texts) {
    if (my !== token) return;
    await sayOne(t, lang, rate, my);
    await sleep(gap);
  }
}

async function sayOne(text, lang, rate, my) {
  if (!text) return;
  const clip = audioIndex[lang]?.[keyOf(text)];
  if (clip && rate >= 0.85) {
    try { const d = await playClip(clip, rate); await sleep(d * 1000); return; } catch {}
  }
  if (my !== token || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANG[lang];
  const v = pickVoice(lang);
  if (v) u.voice = v;
  u.rate = 0.92 * rate;
  await new Promise(res => {
    u.onend = u.onerror = res;
    setTimeout(res, 800 + text.length * 140 / rate);
    speechSynthesis.speak(u);
  });
}

// ---------- Efectos cortos (sin archivos) ----------
function tone(freq, { dur = 0.15, type = 'sine', vol = 0.15, when = 0, slide = 0 } = {}) {
  const c = ac(), t = c.currentTime + when;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}
export const sfx = {
  tap() { tone(660, { dur: 0.07, type: 'triangle', vol: 0.08, slide: 1.3 }); },
  yes() { tone(660, { dur: 0.12, type: 'triangle' }); tone(990, { dur: 0.2, type: 'triangle', when: 0.1 }); },
  soft() { tone(330, { dur: 0.2, type: 'sine', vol: 0.08, slide: 0.8 }); },
  done() { [523, 659, 784, 1047].forEach((f, i) => tone(f, { dur: 0.25, type: 'triangle', vol: 0.12, when: i * 0.1 })); },
};
