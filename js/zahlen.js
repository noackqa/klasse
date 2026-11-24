// Números en alemán (0–100) y en español, para las sumas, el conteo y la hora.

const ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun',
  'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

export function deNum(n) {
  if (n < 20) return ONES[n];
  if (n === 100) return 'hundert';
  const t = Math.floor(n / 10), o = n % 10;
  if (!o) return TENS[t];
  return (o === 1 ? 'ein' : ONES[o]) + 'und' + TENS[t];
}

const ES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
export const esNum = n => ES[n] ?? String(n);

// Mayúscula inicial para empezar frase: "drei" -> "Drei"
export const cap = s => s[0].toUpperCase() + s.slice(1);

// Pistas de pronunciación para el adulto (los números que más se tuercen).
export const NUM_TIPS = {
  1: '«ains». Al contar se dice eins; delante de un sustantivo, ein/eine: ein Apfel, eine Katze.',
  2: '«tsvai». La z alemana suena «ts». Por teléfono a veces dicen «zwo».',
  3: '«drai», con r suave de garganta.',
  4: '«fiir». La v suena f.',
  5: '«fünf»: la ü se dice con los labios de «u» y la lengua de «i».',
  6: '«seks». Ojo: la s al principio suena casi como z francesa (sonora): «zeks».',
  7: '«ziiben». La s inicial sonora otra vez.',
  8: '«ajt», con la ch suave de garganta (como una j española muy flojita).',
  9: '«noin».',
  10: '«tseen».',
  11: '«elf».',
  12: '«tsvölf», con ö: labios de «o», lengua de «e».',
  16: 'sechzehn: se pierde la s → «zéjtseen».',
  17: 'siebzehn: se pierde «en» → «ziiptseen».',
  20: '«tsvantsij».',
  21: 'Las decenas van al revés: «uno-y-veinte» = einundzwanzig. A los niños les hace gracia: aprovéchalo.',
};
