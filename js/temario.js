// Índice del temario: bloques en orden de curso + fiestas según la fecha.
import t1 from './t1.js';
import t2 from './t2.js';
import t3 from './t3.js';
import t4 from './t4.js';

export const BLOCKS = [
  { id: 'start', t: '1 · Primeros pasos' },
  { id: 'ich', t: '2 · Yo y los míos' },
  { id: 'alltag', t: '3 · El día a día' },
  { id: 'welt', t: '4 · El mundo' },
  { id: 'feste', t: '5 · Fiestas del año' },
];

export const UNITS = [...t1, ...t2, ...t3, ...t4];

// Fiestas cuya temporada incluye la fecha (también las que cruzan de año, como Navidad).
export function seasonalUnits(d) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  return UNITS.filter(u => {
    if (!u.season) return false;
    const [m1, d1, m2, d2] = u.season, a = m1 * 100 + d1, b = m2 * 100 + d2;
    return a <= b ? md >= a && md <= b : md >= a || md <= b;
  });
}
