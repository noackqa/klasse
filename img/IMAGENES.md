# Imágenes de Klasse! (para hacer con ChatGPT)

Las imágenes son opcionales: sin ellas la app usa emojis. Con ellas queda más bonita y más clara.

## Cómo se hace (una hoja por unidad)
1. Copia el prompt de la unidad en ChatGPT (pide formato horizontal o cuadrado, el que te deje).
2. Comprueba que los dibujos salen **en el orden de la lista** (de izquierda a derecha, fila a fila) y que no hay texto. Si alguno sale mal, pide que lo rehaga.
3. Guarda la imagen en `klasse/img/hojas/` con el nombre indicado (por ejemplo `tiere.png`).
4. Dime «ya están las hojas» y las recorto yo (script `tools/recortar.py`), o ejecútalo tú: `python tools/recortar.py tiere`.

Consejo: haz primero una hoja y, si te gusta el estilo, en las siguientes añade «con el mismo estilo que la imagen anterior».

---

## 👋 Hallo! Wer bist du? → guardar como `img/hojas/hallo.png`

```
Hoja de 18 dibujos en una cuadrícula de 5 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. un niño o una niña: «hola»
2. un niño o una niña: «buenos días»
3. un niño o una niña: «buenas (durante el día)»
4. un niño o una niña: «buenas noches (al dormir)»
5. un niño o una niña: «adiós»
6. un niño o una niña: «adiós (formal)»
7. un niño o una niña: «por favor»
8. un niño o una niña: «gracias»
9. un niño o una niña: «sí»
10. un niño o una niña: «no»
11. el niño / la niña
12. el chico, el niño
13. la niña
14. el nombre
15. el amigo
16. la amiga
17. la maestra
18. el maestro
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `hallo/hallo.webp` — Hallo
2. `hallo/guten-morgen.webp` — Guten Morgen
3. `hallo/guten-tag.webp` — Guten Tag
4. `hallo/gute-nacht.webp` — Gute Nacht
5. `hallo/tschuess.webp` — Tschüss
6. `hallo/auf-wiedersehen.webp` — Auf Wiedersehen
7. `hallo/bitte.webp` — bitte
8. `hallo/danke.webp` — danke
9. `hallo/ja.webp` — ja
10. `hallo/nein.webp` — nein
11. `hallo/kind.webp` — das Kind
12. `hallo/junge.webp` — der Junge
13. `hallo/maedchen.webp` — das Mädchen
14. `hallo/name.webp` — der Name
15. `hallo/freund.webp` — der Freund
16. `hallo/freundin.webp` — die Freundin
17. `hallo/lehrerin.webp` — die Lehrerin
18. `hallo/lehrer.webp` — der Lehrer

</details>

---

## 🏫 In der Klasse → guardar como `img/hojas/klasse.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la silla
2. la mesa
3. el lápiz
4. el lápiz de color
5. las tijeras
6. el pegamento
7. el papel
8. el libro
9. la pizarra
10. la mochila
11. la fiambrera
12. la botella de agua
13. el cuaderno
14. el pincel
15. el baño, el váter
16. el recreo
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `klasse/stuhl.webp` — der Stuhl
2. `klasse/tisch.webp` — der Tisch
3. `klasse/stift.webp` — der Stift
4. `klasse/buntstift.webp` — der Buntstift
5. `klasse/schere.webp` — die Schere
6. `klasse/kleber.webp` — der Kleber
7. `klasse/papier.webp` — das Papier
8. `klasse/buch.webp` — das Buch
9. `klasse/tafel.webp` — die Tafel
10. `klasse/rucksack.webp` — der Rucksack
11. `klasse/brotdose.webp` — die Brotdose
12. `klasse/trinkflasche.webp` — die Trinkflasche
13. `klasse/heft.webp` — das Heft
14. `klasse/pinsel.webp` — der Pinsel
15. `klasse/toilette.webp` — die Toilette
16. `klasse/pause.webp` — die Pause

</details>

---

## 🎨 Farben → guardar como `img/hojas/farben.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. una mancha de pintura de color rojo
2. una mancha de pintura de color amarillo
3. una mancha de pintura de color azul
4. una mancha de pintura de color verde
5. una mancha de pintura de color naranja
6. una mancha de pintura de color morado, lila
7. una mancha de pintura de color rosa
8. una mancha de pintura de color marrón
9. una mancha de pintura de color negro
10. una mancha de pintura de color blanco
11. una mancha de pintura de color gris
12. una mancha de pintura de muchos colores
13. el color / la pintura
14. el arcoíris
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `farben/rot.webp` — rot
2. `farben/gelb.webp` — gelb
3. `farben/blau.webp` — blau
4. `farben/gruen.webp` — grün
5. `farben/orange.webp` — orange
6. `farben/lila.webp` — lila
7. `farben/rosa.webp` — rosa
8. `farben/braun.webp` — braun
9. `farben/schwarz.webp` — schwarz
10. `farben/weiss.webp` — weiß
11. `farben/grau.webp` — grau
12. `farben/bunt.webp` — bunt
13. `farben/farbe.webp` — die Farbe
14. `farben/regenbogen.webp` — der Regenbogen

</details>

---

## 🔢 Zahlen 1–10 → guardar como `img/hojas/zahlen.png`

```
Hoja de 3 dibujos en una cuadrícula de 3 columnas y 1 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el número
2. el dado
3. el dedo
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `zahlen/zahl.webp` — die Zahl
2. `zahlen/wuerfel.webp` — der Würfel
3. `zahlen/finger.webp` — der Finger

</details>

---

## 👨‍👩‍👧‍👦 Meine Familie → guardar como `img/hojas/familie.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la mamá
2. el papá
3. la abuela
4. el abuelo
5. el hermano
6. la hermana
7. el bebé
8. la familia
9. la madre
10. el padre
11. el tío
12. la tía
13. el primo
14. la prima
15. los padres
16. los hermanos
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `familie/mama.webp` — die Mama
2. `familie/papa.webp` — der Papa
3. `familie/oma.webp` — die Oma
4. `familie/opa.webp` — der Opa
5. `familie/bruder.webp` — der Bruder
6. `familie/schwester.webp` — die Schwester
7. `familie/baby.webp` — das Baby
8. `familie/familie.webp` — die Familie
9. `familie/mutter.webp` — die Mutter
10. `familie/vater.webp` — der Vater
11. `familie/onkel.webp` — der Onkel
12. `familie/tante.webp` — die Tante
13. `familie/cousin.webp` — der Cousin
14. `familie/cousine.webp` — die Cousine
15. `familie/eltern.webp` — die Eltern
16. `familie/geschwister.webp` — die Geschwister

</details>

---

## 🧍 Mein Körper → guardar como `img/hojas/koerper.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la cabeza
2. el pelo
3. la cara
4. el ojo
5. la oreja
6. la nariz
7. la boca
8. el diente
9. el brazo
10. la mano
11. el dedo
12. la tripa
13. la espalda
14. la pierna
15. la rodilla
16. el pie
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `koerper/kopf.webp` — der Kopf
2. `koerper/haare.webp` — die Haare
3. `koerper/gesicht.webp` — das Gesicht
4. `koerper/auge.webp` — das Auge
5. `koerper/ohr.webp` — das Ohr
6. `koerper/nase.webp` — die Nase
7. `koerper/mund.webp` — der Mund
8. `koerper/zahn.webp` — der Zahn
9. `koerper/arm.webp` — der Arm
10. `koerper/hand.webp` — die Hand
11. `koerper/finger.webp` — der Finger
12. `koerper/bauch.webp` — der Bauch
13. `koerper/ruecken.webp` — der Rücken
14. `koerper/bein.webp` — das Bein
15. `koerper/knie.webp` — das Knie
16. `koerper/fuss.webp` — der Fuß

</details>

---

## 😊 Wie fühlst du dich? → guardar como `img/hojas/gefuehle.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. un niño o una niña: «contento»
2. un niño o una niña: «feliz»
3. un niño o una niña: «triste»
4. un niño o una niña: «enfadado»
5. un niño o una niña: «cansado»
6. un niño o una niña: «con miedo»
7. un niño o una niña: «sorprendido»
8. un niño o una niña: «malito, enfermo»
9. un niño o una niña: «gracioso, divertido»
10. un niño o una niña: «orgulloso»
11. un niño o una niña: «tranquilo»
12. el abrazo
13. el beso
14. el pañuelo
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `gefuehle/froh.webp` — froh
2. `gefuehle/gluecklich.webp` — glücklich
3. `gefuehle/traurig.webp` — traurig
4. `gefuehle/wuetend.webp` — wütend
5. `gefuehle/muede.webp` — müde
6. `gefuehle/aengstlich.webp` — ängstlich
7. `gefuehle/ueberrascht.webp` — überrascht
8. `gefuehle/krank.webp` — krank
9. `gefuehle/lustig.webp` — lustig
10. `gefuehle/stolz.webp` — stolz
11. `gefuehle/ruhig.webp` — ruhig
12. `gefuehle/umarmung.webp` — die Umarmung
13. `gefuehle/kuss.webp` — der Kuss
14. `gefuehle/taschentuch.webp` — das Taschentuch

</details>

---

## 👕 Anziehen → guardar como `img/hojas/kleidung.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el pantalón
2. la camiseta
3. el jersey
4. la chaqueta, el abrigo
5. el gorro
6. la bufanda
7. los guantes
8. los calcetines
9. los zapatos
10. las botas
11. el vestido
12. la falda
13. el pijama
14. las bragas / calzoncillos
15. el sombrero
16. la cremallera
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `kleidung/hose.webp` — die Hose
2. `kleidung/t-shirt.webp` — das T-Shirt
3. `kleidung/pullover.webp` — der Pullover
4. `kleidung/jacke.webp` — die Jacke
5. `kleidung/muetze.webp` — die Mütze
6. `kleidung/schal.webp` — der Schal
7. `kleidung/handschuhe.webp` — die Handschuhe
8. `kleidung/socken.webp` — die Socken
9. `kleidung/schuhe.webp` — die Schuhe
10. `kleidung/stiefel.webp` — die Stiefel
11. `kleidung/kleid.webp` — das Kleid
12. `kleidung/rock.webp` — der Rock
13. `kleidung/schlafanzug.webp` — der Schlafanzug
14. `kleidung/unterhose.webp` — die Unterhose
15. `kleidung/hut.webp` — der Hut
16. `kleidung/reissverschluss.webp` — der Reißverschluss

</details>

---

## 🥐 Frühstück → guardar como `img/hojas/fruehstueck.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el pan
2. el panecillo
3. la mantequilla
4. el queso
5. la mermelada
6. el huevo
7. los cereales
8. la leche
9. el zumo
10. el agua
11. el plato
12. el vaso, la taza
13. la cuchara
14. el tenedor
15. el cuchillo
16. la servilleta
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `fruehstueck/brot.webp` — das Brot
2. `fruehstueck/broetchen.webp` — das Brötchen
3. `fruehstueck/butter.webp` — die Butter
4. `fruehstueck/kaese.webp` — der Käse
5. `fruehstueck/marmelade.webp` — die Marmelade
6. `fruehstueck/ei.webp` — das Ei
7. `fruehstueck/muesli.webp` — das Müsli
8. `fruehstueck/milch.webp` — die Milch
9. `fruehstueck/saft.webp` — der Saft
10. `fruehstueck/wasser.webp` — das Wasser
11. `fruehstueck/teller.webp` — der Teller
12. `fruehstueck/becher.webp` — der Becher
13. `fruehstueck/loeffel.webp` — der Löffel
14. `fruehstueck/gabel.webp` — die Gabel
15. `fruehstueck/messer.webp` — das Messer
16. `fruehstueck/serviette.webp` — die Serviette

</details>

---

## 🍎 Obst, Gemüse und Mittagessen → guardar como `img/hojas/obst.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la manzana
2. el plátano
3. la pera
4. la fresa
5. la naranja
6. las uvas
7. la cereza
8. el tomate
9. la zanahoria
10. el pepino
11. la patata
12. la pasta
13. el arroz
14. la sopa
15. la pizza
16. el helado
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `obst/apfel.webp` — der Apfel
2. `obst/banane.webp` — die Banane
3. `obst/birne.webp` — die Birne
4. `obst/erdbeere.webp` — die Erdbeere
5. `obst/orange.webp` — die Orange
6. `obst/weintrauben.webp` — die Weintrauben
7. `obst/kirsche.webp` — die Kirsche
8. `obst/tomate.webp` — die Tomate
9. `obst/karotte.webp` — die Karotte
10. `obst/gurke.webp` — die Gurke
11. `obst/kartoffel.webp` — die Kartoffel
12. `obst/nudeln.webp` — die Nudeln
13. `obst/reis.webp` — der Reis
14. `obst/suppe.webp` — die Suppe
15. `obst/pizza.webp` — die Pizza
16. `obst/eis.webp` — das Eis

</details>

---

## ⏰ Mein Tag → guardar como `img/hojas/tag.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. un niño o una niña: «levantarse»
2. un niño o una niña: «lavarse los dientes»
3. un niño o una niña: «lavarse»
4. un niño o una niña: «vestirse»
5. un niño o una niña: «desayunar»
6. un niño o una niña: «jugar»
7. un niño o una niña: «comer (al mediodía)»
8. un niño o una niña: «bañarse»
9. un niño o una niña: «leer»
10. un niño o una niña: «dormir»
11. la mañana
12. el mediodía
13. la tarde-noche
14. la noche
15. el reloj / la hora
16. el cepillo de dientes
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `tag/aufstehen.webp` — aufstehen
2. `tag/zaehne-putzen.webp` — Zähne putzen
3. `tag/sich-waschen.webp` — sich waschen
4. `tag/sich-anziehen.webp` — sich anziehen
5. `tag/fruehstuecken.webp` — frühstücken
6. `tag/spielen.webp` — spielen
7. `tag/mittag-essen.webp` — Mittag essen
8. `tag/baden.webp` — baden
9. `tag/lesen.webp` — lesen
10. `tag/schlafen.webp` — schlafen
11. `tag/morgen.webp` — der Morgen
12. `tag/mittag.webp` — der Mittag
13. `tag/abend.webp` — der Abend
14. `tag/nacht.webp` — die Nacht
15. `tag/uhr.webp` — die Uhr
16. `tag/zahnbuerste.webp` — die Zahnbürste

</details>

---

## 🏠 Zu Hause → guardar como `img/hojas/haus.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la casa
2. el piso
3. la cocina
4. el baño
5. el cuarto de los niños
6. el salón
7. el dormitorio
8. la puerta
9. la ventana
10. la cama
11. el armario
12. el sofá
13. la lámpara
14. la alfombra
15. la escalera
16. la caja
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `haus/haus.webp` — das Haus
2. `haus/wohnung.webp` — die Wohnung
3. `haus/kueche.webp` — die Küche
4. `haus/bad.webp` — das Bad
5. `haus/kinderzimmer.webp` — das Kinderzimmer
6. `haus/wohnzimmer.webp` — das Wohnzimmer
7. `haus/schlafzimmer.webp` — das Schlafzimmer
8. `haus/tuer.webp` — die Tür
9. `haus/fenster.webp` — das Fenster
10. `haus/bett.webp` — das Bett
11. `haus/schrank.webp` — der Schrank
12. `haus/sofa.webp` — das Sofa
13. `haus/lampe.webp` — die Lampe
14. `haus/teppich.webp` — der Teppich
15. `haus/treppe.webp` — die Treppe
16. `haus/kiste.webp` — die Kiste

</details>

---

## 🧸 Wir spielen! → guardar como `img/hojas/spielen.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. la pelota
2. la muñeca
3. el coche
4. el osito
5. los bloques de construcción
6. el puzle
7. el juego
8. el tobogán
9. el columpio
10. el arenero
11. la bici
12. el patinete
13. la torre
14. la tiza
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `spielen/ball.webp` — der Ball
2. `spielen/puppe.webp` — die Puppe
3. `spielen/auto.webp` — das Auto
4. `spielen/teddy.webp` — der Teddy
5. `spielen/bausteine.webp` — die Bausteine
6. `spielen/puzzle.webp` — das Puzzle
7. `spielen/spiel.webp` — das Spiel
8. `spielen/rutsche.webp` — die Rutsche
9. `spielen/schaukel.webp` — die Schaukel
10. `spielen/sandkasten.webp` — der Sandkasten
11. `spielen/fahrrad.webp` — das Fahrrad
12. `spielen/roller.webp` — der Roller
13. `spielen/turm.webp` — der Turm
14. `spielen/kreide.webp` — die Kreide

</details>

---

## 🐮 Tiere → guardar como `img/hojas/tiere.png`

```
Hoja de 18 dibujos en una cuadrícula de 5 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el perro
2. el gato
3. el ratón
4. el conejo
5. el pájaro
6. el pez
7. la vaca
8. el cerdo
9. el caballo
10. la oveja
11. la gallina
12. el pato
13. el león
14. el elefante
15. la jirafa
16. el mono
17. el oso
18. el cocodrilo
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `tiere/hund.webp` — der Hund
2. `tiere/katze.webp` — die Katze
3. `tiere/maus.webp` — die Maus
4. `tiere/hase.webp` — der Hase
5. `tiere/vogel.webp` — der Vogel
6. `tiere/fisch.webp` — der Fisch
7. `tiere/kuh.webp` — die Kuh
8. `tiere/schwein.webp` — das Schwein
9. `tiere/pferd.webp` — das Pferd
10. `tiere/schaf.webp` — das Schaf
11. `tiere/huhn.webp` — das Huhn
12. `tiere/ente.webp` — die Ente
13. `tiere/loewe.webp` — der Löwe
14. `tiere/elefant.webp` — der Elefant
15. `tiere/giraffe.webp` — die Giraffe
16. `tiere/affe.webp` — der Affe
17. `tiere/baer.webp` — der Bär
18. `tiere/krokodil.webp` — das Krokodil

</details>

---

## 🌦️ Wetter und Jahreszeiten → guardar como `img/hojas/wetter.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el sol
2. la lluvia
3. la nieve
4. el viento
5. la nube
6. la tormenta
7. el arcoíris
8. el paraguas
9. las botas de agua
10. el charco
11. el muñeco de nieve
12. la luna
13. la primavera
14. el verano
15. el otoño
16. el invierno
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `wetter/sonne.webp` — die Sonne
2. `wetter/regen.webp` — der Regen
3. `wetter/schnee.webp` — der Schnee
4. `wetter/wind.webp` — der Wind
5. `wetter/wolke.webp` — die Wolke
6. `wetter/gewitter.webp` — das Gewitter
7. `wetter/regenbogen.webp` — der Regenbogen
8. `wetter/regenschirm.webp` — der Regenschirm
9. `wetter/gummistiefel.webp` — die Gummistiefel
10. `wetter/pfuetze.webp` — die Pfütze
11. `wetter/schneemann.webp` — der Schneemann
12. `wetter/mond.webp` — der Mond
13. `wetter/fruehling.webp` — der Frühling
14. `wetter/sommer.webp` — der Sommer
15. `wetter/herbst.webp` — der Herbst
16. `wetter/winter.webp` — der Winter

</details>

---

## 🚌 Unterwegs → guardar como `img/hojas/verkehr.png`

```
Hoja de 16 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el coche
2. el autobús
3. el tren
4. la bicicleta
5. el avión
6. el barco
7. el camión
8. la moto
9. el tractor
10. los bomberos
11. la ambulancia
12. el coche de policía
13. el semáforo
14. la calle
15. el paso de cebra
16. el helicóptero
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `verkehr/auto.webp` — das Auto
2. `verkehr/bus.webp` — der Bus
3. `verkehr/zug.webp` — der Zug
4. `verkehr/fahrrad.webp` — das Fahrrad
5. `verkehr/flugzeug.webp` — das Flugzeug
6. `verkehr/schiff.webp` — das Schiff
7. `verkehr/lastwagen.webp` — der Lastwagen
8. `verkehr/motorrad.webp` — das Motorrad
9. `verkehr/traktor.webp` — der Traktor
10. `verkehr/feuerwehr.webp` — die Feuerwehr
11. `verkehr/krankenwagen.webp` — der Krankenwagen
12. `verkehr/polizeiauto.webp` — das Polizeiauto
13. `verkehr/ampel.webp` — die Ampel
14. `verkehr/strasse.webp` — die Straße
15. `verkehr/zebrastreifen.webp` — der Zebrastreifen
16. `verkehr/hubschrauber.webp` — der Hubschrauber

</details>

---

## 🛒 Einkaufen → guardar como `img/hojas/einkaufen.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el supermercado
2. la panadería
3. el mercado
4. la caja
5. el carro de la compra
6. la cesta
7. la bolsa, el bolso
8. el dinero
9. la moneda
10. el monedero
11. la lista de la compra
12. la botella
13. la bolsa (de plástico/papel)
14. el dependiente
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `einkaufen/supermarkt.webp` — der Supermarkt
2. `einkaufen/baeckerei.webp` — die Bäckerei
3. `einkaufen/markt.webp` — der Markt
4. `einkaufen/kasse.webp` — die Kasse
5. `einkaufen/einkaufswagen.webp` — der Einkaufswagen
6. `einkaufen/korb.webp` — der Korb
7. `einkaufen/tasche.webp` — die Tasche
8. `einkaufen/geld.webp` — das Geld
9. `einkaufen/muenze.webp` — die Münze
10. `einkaufen/geldbeutel.webp` — der Geldbeutel
11. `einkaufen/einkaufsliste.webp` — die Einkaufsliste
12. `einkaufen/flasche.webp` — die Flasche
13. `einkaufen/tuete.webp` — die Tüte
14. `einkaufen/verkaeufer.webp` — der Verkäufer

</details>

---

## 🩺 Beim Arzt → guardar como `img/hojas/arzt.png`

```
Hoja de 12 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el médico
2. la médica
3. la tirita
4. la medicina
5. la fiebre
6. la tos
7. el resfriado, los mocos
8. el termómetro
9. la inyección
10. el hospital
11. el pañuelo
12. la sala de espera
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `arzt/arzt.webp` — der Arzt
2. `arzt/aerztin.webp` — die Ärztin
3. `arzt/pflaster.webp` — das Pflaster
4. `arzt/medizin.webp` — die Medizin
5. `arzt/fieber.webp` — das Fieber
6. `arzt/husten.webp` — der Husten
7. `arzt/schnupfen.webp` — der Schnupfen
8. `arzt/thermometer.webp` — das Thermometer
9. `arzt/spritze.webp` — die Spritze
10. `arzt/krankenhaus.webp` — das Krankenhaus
11. `arzt/taschentuch.webp` — das Taschentuch
12. `arzt/wartezimmer.webp` — das Wartezimmer

</details>

---

## 👩‍🚒 Berufe → guardar como `img/hojas/berufe.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el bombero
2. la bombera
3. la policía (mujer)
4. el policía
5. el panadero
6. el cocinero
7. la veterinaria
8. el granjero
9. el conductor de autobús
10. la piloto
11. la peluquera
12. la educadora (de la Kita)
13. el cartero
14. el obrero
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `berufe/feuerwehrmann.webp` — der Feuerwehrmann
2. `berufe/feuerwehrfrau.webp` — die Feuerwehrfrau
3. `berufe/polizistin.webp` — die Polizistin
4. `berufe/polizist.webp` — der Polizist
5. `berufe/baecker.webp` — der Bäcker
6. `berufe/koch.webp` — der Koch
7. `berufe/tieraerztin.webp` — die Tierärztin
8. `berufe/bauer.webp` — der Bauer
9. `berufe/busfahrer.webp` — der Busfahrer
10. `berufe/pilotin.webp` — die Pilotin
11. `berufe/friseurin.webp` — die Friseurin
12. `berufe/erzieherin.webp` — die Erzieherin
13. `berufe/postbote.webp` — der Postbote
14. `berufe/bauarbeiter.webp` — der Bauarbeiter

</details>

---

## 🔺 Formen und Größen → guardar como `img/hojas/formen.png`

```
Hoja de 10 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el círculo
2. el triángulo
3. el cuadrado
4. el rectángulo
5. la estrella
6. el corazón
7. la esquina
8. la línea
9. el punto
10. la bola
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `formen/kreis.webp` — der Kreis
2. `formen/dreieck.webp` — das Dreieck
3. `formen/quadrat.webp` — das Quadrat
4. `formen/rechteck.webp` — das Rechteck
5. `formen/stern.webp` — der Stern
6. `formen/herz.webp` — das Herz
7. `formen/ecke.webp` — die Ecke
8. `formen/linie.webp` — die Linie
9. `formen/punkt.webp` — der Punkt
10. `formen/kugel.webp` — die Kugel

</details>

---

## 🏮 Herbst und Sankt Martin → guardar como `img/hojas/martin.png`

```
Hoja de 12 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el farolillo
2. la luz
3. el abrigo, la capa
4. el caballo
5. la hoja
6. la castaña
7. el erizo
8. la seta
9. la cometa
10. el árbol
11. el otoño
12. la calabaza
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `martin/laterne.webp` — die Laterne
2. `martin/licht.webp` — das Licht
3. `martin/mantel.webp` — der Mantel
4. `martin/pferd.webp` — das Pferd
5. `martin/blatt.webp` — das Blatt
6. `martin/kastanie.webp` — die Kastanie
7. `martin/igel.webp` — der Igel
8. `martin/pilz.webp` — der Pilz
9. `martin/drachen.webp` — der Drachen
10. `martin/baum.webp` — der Baum
11. `martin/herbst.webp` — der Herbst
12. `martin/kuerbis.webp` — der Kürbis

</details>

---

## 🎄 Advent und Weihnachten → guardar como `img/hojas/advent.png`

```
Hoja de 14 dibujos en una cuadrícula de 4 columnas y 4 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el calendario de Adviento
2. la corona de Adviento
3. la vela
4. San Nicolás
5. la bota
6. el árbol de Navidad
7. el regalo
8. la estrella
9. las galletas de Navidad
10. la bola (del árbol)
11. la campana
12. el ángel
13. el muñeco de nieve
14. el Niño Jesús (trae regalos)
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `advent/adventskalender.webp` — der Adventskalender
2. `advent/adventskranz.webp` — der Adventskranz
3. `advent/kerze.webp` — die Kerze
4. `advent/nikolaus.webp` — der Nikolaus
5. `advent/stiefel.webp` — der Stiefel
6. `advent/weihnachtsbaum.webp` — der Weihnachtsbaum
7. `advent/geschenk.webp` — das Geschenk
8. `advent/stern.webp` — der Stern
9. `advent/plaetzchen.webp` — die Plätzchen
10. `advent/kugel.webp` — die Kugel
11. `advent/glocke.webp` — die Glocke
12. `advent/engel.webp` — der Engel
13. `advent/schneemann.webp` — der Schneemann
14. `advent/christkind.webp` — das Christkind

</details>

---

## 🎭 Fasching → guardar como `img/hojas/fasching.png`

```
Hoja de 12 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el disfraz
2. la careta
3. el payaso
4. la princesa
5. el pirata
6. la bruja
7. el caballero
8. el fantasma
9. el dragón
10. la corona
11. el confeti
12. la varita mágica
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `fasching/kostuem.webp` — das Kostüm
2. `fasching/maske.webp` — die Maske
3. `fasching/clown.webp` — der Clown
4. `fasching/prinzessin.webp` — die Prinzessin
5. `fasching/pirat.webp` — der Pirat
6. `fasching/hexe.webp` — die Hexe
7. `fasching/ritter.webp` — der Ritter
8. `fasching/gespenst.webp` — das Gespenst
9. `fasching/drache.webp` — der Drache
10. `fasching/krone.webp` — die Krone
11. `fasching/konfetti.webp` — das Konfetti
12. `fasching/zauberstab.webp` — der Zauberstab

</details>

---

## 🐣 Frühling und Ostern → guardar como `img/hojas/ostern.png`

```
Hoja de 12 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el conejo de Pascua
2. el huevo de Pascua
3. el nido
4. la cesta
5. la flor
6. el tulipán
7. el pollito
8. el corderito
9. la mariposa
10. la abeja
11. el chocolate
12. la hierba
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `ostern/osterhase.webp` — der Osterhase
2. `ostern/osterei.webp` — das Osterei
3. `ostern/nest.webp` — das Nest
4. `ostern/korb.webp` — der Korb
5. `ostern/blume.webp` — die Blume
6. `ostern/tulpe.webp` — die Tulpe
7. `ostern/kueken.webp` — das Küken
8. `ostern/lamm.webp` — das Lamm
9. `ostern/schmetterling.webp` — der Schmetterling
10. `ostern/biene.webp` — die Biene
11. `ostern/schokolade.webp` — die Schokolade
12. `ostern/gras.webp` — das Gras

</details>

---

## 🎂 Geburtstag → guardar como `img/hojas/geburtstag.png`

```
Hoja de 10 dibujos en una cuadrícula de 4 columnas y 3 filas para una app de alemán para niños de 3 a 6 años. Estilo: ilustración infantil sencilla y amable, trazo limpio, colores planos y suaves, fondo totalmente blanco, sin texto, sin letras, sin números escritos, sin marcos. Cada dibujo centrado en su celda, mismo tamaño y mismo estilo en todas, con bastante margen blanco entre celdas.
En este orden (izquierda a derecha, fila a fila):
1. el cumpleaños
2. la tarta
3. la vela
4. el regalo
5. la fiesta
6. el globo
7. la invitación
8. el invitado
9. la corona
10. la sorpresa
```

<details><summary>Nombres de archivo que saldrán</summary>

1. `geburtstag/geburtstag.webp` — der Geburtstag
2. `geburtstag/torte.webp` — die Torte
3. `geburtstag/kerze.webp` — die Kerze
4. `geburtstag/geschenk.webp` — das Geschenk
5. `geburtstag/party.webp` — die Party
6. `geburtstag/luftballon.webp` — der Luftballon
7. `geburtstag/einladung.webp` — die Einladung
8. `geburtstag/gast.webp` — der Gast
9. `geburtstag/krone.webp` — die Krone
10. `geburtstag/ueberraschung.webp` — die Überraschung

</details>

