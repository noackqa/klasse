"""Recorta las hojas de ChatGPT (img/hojas/<unidad>.png) en dibujos sueltos img/<unidad>/<palabra>.webp
y actualiza img/index.json para que la app los use.

Uso:  python tools/recortar.py            (todas las hojas que haya)
      python tools/recortar.py tiere farben
Busca los huecos blancos entre filas y columnas; si no los encuentra, reparte la hoja a partes iguales.
"""
import json, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / 'img'
ORDER = json.loads((IMG / 'hojas' / 'orden.json').read_text(encoding='utf-8'))
SIZE = 512


def white_runs(profile, thresh):
    """Tramos de líneas casi blancas -> lista de (inicio, fin)."""
    runs, start = [], None
    for i, v in enumerate(profile):
        if v >= thresh and start is None:
            start = i
        elif v < thresh and start is not None:
            runs.append((start, i)); start = None
    if start is not None:
        runs.append((start, len(profile)))
    return runs


def cuts(gray, axis, n):
    """n tramos de contenido a lo largo de un eje, usando los huecos blancos; None si no cuadra."""
    w, h = gray.size
    px = gray.load()
    length, other = (h, w) if axis == 'y' else (w, h)
    prof = []
    for i in range(length):
        white = 0
        for j in range(0, other, 3):
            v = px[j, i] if axis == 'y' else px[i, j]
            white += v > 235
        prof.append(white / len(range(0, other, 3)))
    gaps = [r for r in white_runs(prof, 0.985) if r[1] - r[0] >= max(4, length // 200)]
    # tramos de contenido entre huecos
    content, prev = [], 0
    for a, b in gaps:
        if a > prev:
            content.append((prev, a))
        prev = b
    if prev < length:
        content.append((prev, length))
    content = [c for c in content if c[1] - c[0] > length * 0.04]
    if len(content) == n:
        return content
    step = length / n
    return [(round(k * step), round((k + 1) * step)) for k in range(n)]


def trim_square(cell):
    g = cell.convert('L').point(lambda v: 255 if v > 240 else 0)
    box = Image.eval(g, lambda v: 255 - v).getbbox()
    if box:
        cell = cell.crop(box)
    side = int(max(cell.size) * 1.08)
    sq = Image.new('RGB', (side, side), 'white')
    sq.paste(cell, ((side - cell.width) // 2, (side - cell.height) // 2))
    return sq.resize((SIZE, SIZE), Image.LANCZOS)


def do(unit):
    sheet = next((p for p in (IMG / 'hojas').glob(unit + '.*') if p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp')), None)
    if not sheet:
        return 0
    info = ORDER[unit]
    im = Image.open(sheet).convert('RGB')
    gray = im.convert('L')
    rows = cuts(gray, 'y', info['rows'])
    out = IMG / unit
    out.mkdir(exist_ok=True)
    done = 0
    for r, (y0, y1) in enumerate(rows):
        band = gray.crop((0, y0, im.width, y1))
        cols = cuts(band, 'x', info['cols'])
        for c, (x0, x1) in enumerate(cols):
            k = r * info['cols'] + c
            if k >= len(info['names']):
                break
            trim_square(im.crop((x0, y0, x1, y1))).save(out / f"{info['names'][k]}.webp", 'WEBP', quality=86)
            done += 1
    print(f'{unit}: {done} dibujos')
    return done


units = sys.argv[1:] or [p.stem for p in (IMG / 'hojas').iterdir() if p.stem in ORDER]
for u in units:
    do(u)
index = sorted(f'{p.parent.name}/{p.stem}' for p in IMG.glob('*/*.webp') if p.parent.name != 'hojas')
(IMG / 'index.json').write_text(json.dumps(index), encoding='utf-8')
print('index.json:', len(index), 'dibujos')
