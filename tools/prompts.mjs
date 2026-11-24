// Genera img/IMAGENES.md: un prompt de ChatGPT por unidad (hoja en cuadrícula) con el orden exacto.
// Uso: node tools/prompts.mjs
import { writeFileSync } from 'node:fs';
import { UNITS } from '../js/temario.js';

const slug = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const STYLE = 'Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.';

let md = `# Imágenes de Klasse! (para hacer con ChatGPT)

Las imágenes son opcionales: sin ellas la app usa emojis. Con ellas queda más bonita y más clara.

## Cómo se hace (una hoja por unidad)
1. Copia el prompt de la unidad en ChatGPT (pide formato horizontal o cuadrado, el que te deje).
2. Comprueba que los dibujos salen **en el orden de la lista** (de izquierda a derecha, fila a fila) y que no hay texto. Si alguno sale mal, pide que lo rehaga.
3. Guarda la imagen en \`klasse/img/hojas/\` con el nombre indicado (por ejemplo \`tiere.png\`).
4. Dime «ya están las hojas» y las recorto yo (script \`tools/recortar.py\`), o ejecútalo tú: \`python tools/recortar.py tiere\`.

Consejo: haz primero una hoja y, si te gusta el estilo, en las siguientes añade «con el mismo estilo que la imagen anterior».

`;
for (const u of UNITS) {
  const ws = u.words.filter(a => a[4] && (a[0] !== '' || u.id !== 'zahlen'));
  const cols = ws.length <= 9 ? 3 : ws.length <= 16 ? 4 : 5;
  const rows = Math.ceil(ws.length / cols);
  const what = a => a[0] !== '' ? a[3] : u.id === 'farben' ? (a[1] === 'bunt' ? 'una mancha de pintura de muchos colores' : `una mancha de pintura de color ${a[3]}`) : `un niño o una niña: «${a[3]}»`;
  const list = ws.map((a, i) => `${i + 1}. ${what(a)}`).join('\n');
  md += `---\n\n## ${u.e} ${u.title} → guardar como \`img/hojas/${u.id}.png\`\n\n`;
  md += '```\n' + `Hoja de ${ws.length} dibujos en una cuadrícula de ${cols} columnas y ${rows} filas para una app de alemán para niños de 3 a 6 años. ${STYLE}\nEn este orden (izquierda a derecha, fila a fila):\n${list}\n` + '```\n\n';
  md += '<details><summary>Nombres de archivo que saldrán</summary>\n\n' + ws.map((a, i) => `${i + 1}. \`${u.id}/${slug(a[1])}.webp\` — ${a[0] && a[0] !== 'pl' ? a[0] + ' ' : a[0] === 'pl' ? 'die ' : ''}${a[1]}`).join('\n') + '\n\n</details>\n\n';
}
writeFileSync(new URL('../img/IMAGENES.md', import.meta.url), md);
// Orden para el recortador.
const order = Object.fromEntries(UNITS.map(u => {
  const ws = u.words.filter(a => a[4] && (a[0] !== '' || u.id !== 'zahlen'));
  const cols = ws.length <= 9 ? 3 : ws.length <= 16 ? 4 : 5;
  return [u.id, { cols, rows: Math.ceil(ws.length / cols), names: ws.map(a => slug(a[1])) }];
}));
writeFileSync(new URL('../img/hojas/orden.json', import.meta.url), JSON.stringify(order, null, 1));
console.log('ok', UNITS.length);
