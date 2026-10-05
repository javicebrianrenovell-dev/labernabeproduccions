# Vídeo de lanzamiento — JaviCebrian.es («Mueve.»)

Película de 27 s, 1440×1440, 60 fps, en un único plano secuencia. 120 BPM y 54 tiempos.
El último fotograma es igual al primero.

| Archivo | Qué es |
|---|---|
| `../prompt-video-javicebrian.md` | Prompt de producción adaptado al posicionamiento de la web |
| `beat-map.md` | Mapa de los 54 tiempos con la intención de negocio de cada bloque |
| `film.html` | **La película.** Todo se calcula en `seek(t)` como función pura de `t` |
| `stills.html`, `stills/` | Los 4 fotogramas de validación iniciales |
| `out/film.mp4` | Máster de vídeo, sin sonido de momento (ver *Sonido*) |
| `out/contact-sheet.png` | Un fotograma por tiempo, para revisión |
| `audio/sfx-cues.json` | Hoja de 58 efectos: tiempo, nombre, búsqueda en Mixkit y ganancia |
| `tools/` | Render, montaje, control de calidad, mezcla y preparación del metraje |

## Sustituir los materiales provisionales por los reales
No hace falta tocar el código: `film.html` usa un archivo real si existe y, si no, el provisional.

```
assets/portrait-day.jpg     retrato de día
assets/portrait-gold.jpg    MISMO encuadre, en hora dorada
assets/javi-en-accion.jpg   orbe, pantalla de bloqueo, hero y tarjeta
assets/foto-a.jpg … foto-d.jpg   las 4 fotos del bento
assets/wall.webm            pared con sombras de plantas: tools/prepare-footage.sh clip-pexels.mp4
```

## Renderizar
```bash
cd docs/video-javicebrian
python3 -m http.server 8765 --bind 127.0.0.1 &      # el metraje se carga como blob, que no necesita range-seek
export PW=$(npm root -g)/playwright
for w in 0 1 2; do node tools/render.mjs frames /tmp/frames 240 $w 3 & done; wait
tools/assemble.sh /tmp/frames out/film.mp4             # 4 subfotogramas por fotograma (tmix), 60 fps
python3 tools/qa.py out/film.mp4                       # saltos de un fotograma, pausas > 1 s y costura del bucle
node tools/render.mjs beats /tmp/beats && python3 tools/contact.py /tmp/beats out/contact-sheet.png
```

## Sonido
1. Descarga de Mixkit un efecto por cada nombre de `audio/sfx-cues.json` (el campo `mixkit_search` indica qué buscar) y guárdalo como `audio/sfx/<nombre>.wav` o `.mp3`.
2. Descarga una pista de unos 120 BPM con drop y una parte tranquila (breakdown). Guárdala como `audio/song.mp3`.
3. Elige `--song-start`: el segundo de la canción que debe coincidir con t=0. Tiene que caer en un tiempo fuerte, y el drop de la canción tiene que llegar 8,0 s después.
4. Ejecuta `python3 tools/mix.py --song audio/song.mp3 --song-start <s> --video out/film.mp4 --out out/film-audio.mp4`.

El script coloca cada efecto según su **pico medido**, no según el inicio del archivo. Después normaliza a **−14 LUFS** en dos pasadas.

## Notas técnicas
- **Metraje en VP9/WebM:** el Chromium de Playwright no decodifica H.264. Todos los fotogramas son clave (`-g 1`), el vídeo se carga como blob y cada fotograma espera al evento `seeked`.
- **Cristal líquido:** cada elemento de cristal clona la escena que tiene detrás y la deforma con un mapa de desplazamiento (`feImage`, sacado de un campo de distancias de su propia forma). Pasa por 3 `feDisplacementMap` con escalas ligeramente distintas, para que los bordes separen los colores, y lleva una luz de borde. No se usa `backdrop-filter: url()` porque Chromium interpreta mal los mapas de desplazamiento.
- **Fusión líquida (goo):** desenfoque más umbral de transparencia, y después la forma original se pinta encima para que los bordes queden nítidos.
- **Iris:** 6 láminas alrededor de una apertura hexagonal. Cada lámina usa sus dos vértices, la prolongación de sus dos aristas y el arco CORTO entre ellas.
