# Klasse! — Deutsch für kleine Leute

App de tablet (PWA, HTML y JS sin compilar) para dar clase de alemán en casa a niños de 3 a 6 años, bilingües español-alemán. **No es un juego para que el niño la use solo**: es el guion del adulto. La app dice qué decir, da la pronunciación, muestra los dibujos y lleva los juegos.

## Qué tiene
- **25 unidades × 3 clases** (Kennenlernen → Üben → Sprechen), de 15 a 25 minutos cada una.
  1. **Primeros pasos:** Hallo, In der Klasse, Farben, Zahlen.
  2. **Yo y los míos:** Familie, Körper, Gefühle, Anziehen.
  3. **El día a día:** Frühstück, Obst y Mittagessen, Mein Tag, Zu Hause, Spielen.
  4. **El mundo:** Tiere, Wetter, Unterwegs, Einkaufen, Beim Arzt, Berufe, Formen.
  5. **Fiestas:** Sankt Martin, Advent y Weihnachten, Fasching, Ostern, Geburtstag. La app las sugiere según la fecha.
- **Cada clase** tiene los mismos pasos:
  1. Saludo fijo.
  2. Palabras con artículo en su color (azul der, rojo die, verde das, morado plural).
  3. Frases hechas.
  4. Juegos: Wo ist…?, Zeig mir…!, Was ist das?, Was fehlt?
  5. Órdenes de movimiento.
  6. Juego de rol con guion (tú / niños), con ayudas por si se atascan.
  7. Preguntas de conversación con respuesta modelo.
  8. Pronunciación del sonido difícil de la unidad.
  9. Canción tradicional.
  10. Despedida.
- **Morgenkreis:** el ritual de cada día. Saludo, cuántos hay, cómo estamos, día y fecha calculados, tiempo y plan del día.
- **Rechnen:** números 0-20 con pistas de pronunciación, contar, ¿cuántos?, antes y después, más y menos, sumas, restas, problemas en forma de cuento y el reloj.
- **Wiederholen:** repaso espaciado (cajas de Leitner) con lo que marcas en «Was ist das?».
- **Guía para el adulto:** cómo hablar sin corregir, errores típicos de los hispanohablantes y juegos que sirven para cualquier unidad.
- **Micrófono 🎤:** el niño se graba repitiendo y se oye seguido del modelo. La grabación no sale de la tablet.
- El progreso se guarda en la tablet (localStorage).

## Probar
Vista previa: configuración `klasse` en `Nexus/.claude/launch.json` (puerto 5197).

## Voz
- **Ahora:** usa la voz alemana del sistema (en Android, Google TTS «Alemán (Alemania)»; si falta, la app avisa).
- **Más adelante:** audios nativos de ElevenLabs en `audio/*.mp3` + `audio/index.json` (`{ "de": { "clave": [archivo, inicio, fin] } }`), con la misma técnica que Colorines. La clave es `keyOf(texto)` de `js/speech.js`.
- Cuando hay audio grabado se usa ese; si no, la voz del sistema.

## Imágenes
- Opcionales: sin ellas se usan emojis.
- Prompts de ChatGPT por unidad en `img/IMAGENES.md` (una hoja en cuadrícula por unidad).
- Las hojas se guardan en `img/hojas/<unidad>.png` y se recortan con `python tools/recortar.py`, que genera `img/<unidad>/<palabra>.webp` y `img/index.json`.
- Si cambias el temario: `node tools/prompts.mjs`.

## Archivos
- `js/t1.js` … `js/t4.js`: el temario (datos).
- `js/lesson.js`: construcción de las clases y tipos de actividad.
- `js/extras.js`: Morgenkreis, Rechnen y repaso.
- `js/app.js`: pantallas y rutas.
- `INVESTIGACION.md`: fuentes y decisiones del temario.
