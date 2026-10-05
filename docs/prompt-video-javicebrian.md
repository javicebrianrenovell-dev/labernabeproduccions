# Prompt — Vídeo de lanzamiento de JaviCebrian.es

> Adaptación del prompt "Apple-keynote launch film" para la web personal/profesional **JaviCebrian.es**.
> Cambio estratégico clave: el arco original vendía un *producto físico* (foto → lámina enmarcada → pedido → pared).
> Aquí el arco vende un *servicio de alto valor*: **marca personal → web → caso de éxito → reunión agendada → proyecto en marcha → resultado visible en el mundo real**.
> El vídeo no enseña "una web bonita": enseña el embudo de conversión funcionando.

---

```xml
<context>
El vídeo es la pieza de lanzamiento de JaviCebrian.es, la web profesional de Javi Cebrián
(comunicación estratégica y desarrollo de negocio). Objetivo de negocio: que un directivo o
institución entienda en 27 segundos qué hace Javi, vea pruebas y pulse "Agenda una reunión".
Destino: LinkedIn (feed cuadrado), Instagram, cabecera de la propia web y presentaciones comerciales.
Todo el texto en pantalla, en español.
</context>

<inputs>
Pídeme:
1. Una palabra para el wordmark (mejor un verbo en imperativo). Propuestas: "Conecta.", "Impulsa.", "Cuenta.", "Mueve.".
   Alternativa: "Cebrián." si priorizamos recuerdo de marca personal sobre mensaje.
2. Capturas a 2x de JaviCebrian.es: home (hero), servicios, un caso de éxito y la página de contacto/agenda.
   Más el logo en SVG y la paleta/tipografías de la web si difieren de las de abajo.
3. De 9 a 12 fotos en alta resolución: retratos de Javi (al menos uno de día y el MISMO encuadre en hora dorada),
   Javi en acción (ponencia, reunión, rodaje, sala de prensa) e imágenes de proyectos/clientes con permiso de uso.
4. 3 a 5 casos de éxito con UNA cifra cada uno (p. ej. "+38 % leads", "3 instituciones", "1,2 M impactos"). Solo cifras verificables.
5. Los 3–4 servicios tal como se nombran en la web (p. ej. Estrategia de comunicación · Desarrollo de negocio · Marca personal · Producción audiovisual).
6. Pista musical libre de derechos ~120 BPM con drop y breakdown tranquilo (Mixkit, uso comercial gratuito).
7. Clip de stock gratuito de una pared lisa con sombras de plantas en movimiento (Pexels).
</inputs>

<direction>
Película de lanzamiento estilo keynote de Apple, solo 2D, en un único plano secuencia. Cada escena nace de la anterior:
sin fundidos, desenfoques ni cortes. Los objetos se transforman. El texto sube desde una línea de máscara, los iconos
brotan desde escala cero con muelle, las barras se dibujan cruzando la pantalla, las páginas empujan hacia delante y una
forma negra llena el encuadre antes de encogerse en la siguiente escena.
Lienzo blanco roto cálido, UI negra y liquid glass de iOS 26 sobre las fotos. Archivo (wdth 125, peso 800) para el wordmark,
Geist para la UI. Si la web usa otra tipografía/acento de color, el acento aparece SOLO en el botón de conversión.
Un cursor dispara cada cambio con clics, arrastres y pulsaciones largas reales. Cámara con zoom estilo Screen Studio
para que cada momento llene el cuadrado, escalando el cursor con ella.
Prohibido: fundidos encadenados, entradas con desenfoque, "revelado" por brillo, giros 3D, partículas, brillos/glows,
pausas de más de 1 s y cualquier cosa que huela a plantilla. Prohibido también: stock de "apretón de manos", gráficas
genéricas que suben sin dato real y claims sin cifra.
</direction>

<structure>
120 BPM, 54 tiempos, algo ocurre en cada tiempo.

Apertura — "Quién": el wordmark se comprime en su propio punto como un acordeón. El punto se expande en una píldora negra y
dentro sube la etiqueta "javicebrian.es". Clic: seis láminas de iris se cierran sobre la etiqueta y se abren de golpe sobre
el retrato principal de Javi. El círculo pasa a cuadrado y se encoge. Detrás se despliega una cuadrícula como un mapa de
papel (centro, cruz, esquinas) con fotos de Javi en acción y proyectos; se reordena en un bento con 4 tiles etiquetados
con los servicios. Un clic hace zoom en un tile y aterriza justo en el drop.

Cristal — "Cómo": la palabra "Estrategia" aparece en cristal letra a letra y se funde en una gota que se estira hasta formar
una barra de herramientas de cristal. El icono de ajustes la convierte en un slider. Al arrastrarlo, el retrato pasa de luz
de día a hora dorada (dos tomas alineadas): metáfora de "misma persona, mejor contada". El tirador sostenido se vuelve una
lente de cristal, sube y se convierte en un orbe; dentro se abre en círculo la foto de un caso de éxito, y el orbe crece
hasta una pantalla de bloqueo con dígitos de reloj de cristal, la fecha y una notificación de cristal:
"Nuevo lead · javicebrian.es". La barra de inicio se estira en un reproductor de cristal (la pista del vídeo).

Escenario — "Dónde": la pantalla de bloqueo se aleja y revela un teléfono, con el bisel creciendo desde el borde.
La Dynamic Island se estira como líquido, se estrangula, vuela y se expande en una ventana de Mac que se enrolla como una persiana.
Pulsación larga sobre el fondo de pantalla y arrastre a una pestaña de Safari "javicebrian.es". La página empuja hacia dentro;
al soltar la imagen, se convierte en el hero real de la home (usar la captura). Scroll: el hero se transforma en la tarjeta
de un caso de éxito; la cifra clave se dibuja como barra que cruza la tarjeta ("+38 %"). Se elige el servicio en un selector
segmentado (el color pinta de lado a lado) y la duración (Sprint 4 semanas / Acompañamiento anual); después el botón de la
navegación vuela hacia abajo y se convierte en "Agenda una reunión".

Conversión — una sola forma negra que cambia sin parar:
Solicitud enviada ✓ → Diagnóstico % → Reunión confirmada (un calendario con el día marcándose) → Proyecto en marcha ✓.

Mundo real — "Resultado": el círculo de "Proyecto en marcha" se expande hasta llenar de negro el encuadre, aguanta un tiempo y
se encoge hasta convertirse en un cartel enmarcado de una campaña/caso colgado en la pared real del metraje. El mismo iris se
abre sobre el cartel y vuelve a cerrarse. El marco llena la pantalla, se contrae en la píldora → el punto → las letras
vuelven a saltar con el tiempo de retorno. Último fotograma = primer fotograma (loop perfecto para redes).
</structure>

<build>
1. Un único HTML, cuadrado 1440x1440. Cada estilo se calcula a partir del tiempo dentro de un async seek(t): nada de
   transiciones CSS, temporizadores ni estado arrastrado entre fotogramas.
2. Muelles con respuestas al escalón en forma cerrada. Si un valor tiene varios objetivos, un muelle por cambio, para que
   siga siendo función pura del tiempo.
3. Liquid glass: cada elemento de cristal mantiene su propio clon de la escena que tiene detrás. Filtra ese clon con un
   feImage SVG como mapa de desplazamiento (campo de distancia de rectángulo redondeado) a través de tres feDisplacementMap
   con escalas ligeramente distintas para bordes cromáticos, y añade luz de borde. Para letras de cristal, un campo de
   distancia en canvas por glifo genera mapa, máscara y brillos.
4. Goo: blur + umbral alfa, y compón la fuente encima para que el cristal siga nítido por dentro.
5. Iris: 6 láminas alrededor de una apertura hexagonal. Cada lámina usa sus dos vértices, las dos prolongaciones de arista
   y el arco CORTO entre ellas.
6. Compresión del wordmark: mueve cada letra hacia el punto por el mismo factor y ajusta su ancho dibujado para que coincida
   (estrecha el eje wdth, escala el resto), manteniendo las letras en contacto.
7. Metraje: recodifica todo intra (ffmpeg -g 1), cárgalo como blob URL y espera "seeked" antes de dibujar cada fotograma.
8. Sonido: un SFX descargado para cada evento (Mixkit), nunca sintetizado, colocado según su pico medido. La canción arranca
   en un tiempo fuerte: el zoom aterriza en el drop, la pared cae en el breakdown y el wordmark vuelve con el beat.
   Loudnorm a -14 LUFS.
9. Render con Playwright: mezcla 4 subframes por fotograma con ffmpeg tmix a 60 fps. Revisa un fotograma por tiempo y busca
   saltos de un solo fotograma (picos de diferencia entre fotogramas 3x mayores que sus vecinos).
10. Entregables: master 1440x1440 (LinkedIn/IG feed), versión 1080x1920 re-encuadrada con la cámara (Reels/Stories, sin
    recomponer escenas) y un poster frame (primer fotograma) para la web.
</build>

<gotchas>
backdrop-filter: url() interpreta mal los mapas de desplazamiento en Chromium, así que clona la escena. Una inundación
debe extenderse más allá de las esquinas y durar ~0,3 s; si no, media pantalla cambia en un solo fotograma. Un hijo con
visibility: visible puede asomar a través de un padre oculto: usa inherit. El texto que cambia dentro de una forma que
muta necesita su propia máscara. python http.server no permite seek por rangos en vídeo: usa blob URL.
Las capturas de la web deben ser a 2x y sin barras de cookies. Ninguna cifra de caso de éxito sin fuente interna.
</gotchas>

<start>
Pídeme los inputs y luego enséñame el mapa de tiempos (beat map) y 4 fotogramas fijos (apertura, cristal, escenario, pared)
antes de escribir la película completa.
</start>
```
