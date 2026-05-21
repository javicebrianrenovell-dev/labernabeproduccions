# Manual editorial — Plataforma LA BERNABÉ PRODUCCIONS

Guía para el equipo que va a llevar el día a día de los contenidos de **pilarbernabe.es**.
Pensada para que cualquier persona del equipo, sin conocimientos técnicos, pueda publicar un vídeo, un episodio de podcast o cambiar el texto de la home en 5 minutos.

> Si tienes dudas en mitad de algo, no toques más y avisa a Javi (javi.cebrian.renovell@gmail.com). Es más rápido que deshacer un cambio.

---

## 1. ¿Qué es esto y dónde se entra?

La web **pilarbernabe.es** está conectada a un panel de gestión llamado **Sanity Studio**. Tú escribes en el Studio, la web se actualiza sola.

- **URL del Studio:** https://pilarbernabe-platform.sanity.studio
- **Cómo entras:** con tu cuenta de Google (la del email con el que Javi te ha invitado). Pulsas "Login with Google" y listo. No hay contraseña que recordar.
- **Si no te llega la invitación:** revisa la carpeta de spam y, si no aparece, escribe a Javi para que la reenvíe.

---

## 2. Vista general — qué hay en el menú izquierdo

Cuando entras, el panel se divide en dos columnas:

**Columna izquierda (menú "Contenido")** — agrupado en dos bloques:

1. **Páginas únicas** (singletons) — solo hay una de cada y nunca se borran. Aquí se edita el texto que ya está montado en la web:
   - Configuración general
   - Página: Inicio
   - Página: Club
   - Página: Pitch
   - Página: Podcast
2. **Colecciones** — listas donde añades elementos nuevos cada vez:
   - Vídeos
   - Categorías
   - Episodios de podcast
   - Testimonios (Club)

**Columna central** — la lista de elementos de la sección que has elegido.

**Columna derecha** — el formulario para editar el elemento concreto.

> Regla mental simple: si quieres **cambiar un texto que ya está en la web**, lo más probable es que esté en una **página única**. Si quieres **añadir algo nuevo** (un vídeo, un episodio…), lo encuentras en **colecciones**.

---

## 3. Cómo publicar un vídeo

Es la operación más frecuente. Se hace en menos de 3 minutos cuando tienes el material listo.

### Antes de empezar, ten a mano

- El **título** del vídeo.
- Una **miniatura** en formato 16:9 (recomendado mínimo 1280×720 px, máximo 4 MB). Sirve JPG o PNG.
- La **duración** del vídeo (ej: `4:12`).
- La **categoría** a la que pertenece (si no existe, antes hay que crearla — ver sección 6).
- (Opcional) Una **descripción** corta.
- (Opcional) La **URL pública** del vídeo en YouTube o Vimeo.

### Paso a paso

1. Menú izquierdo → **Vídeos** → botón **"+" (Create)** arriba a la derecha.
2. Rellena los campos:
   - **Título** — máximo 100 caracteres. Ej: *"El Nuevo Parque de Benimaclet"*.
   - **Slug (URL)** — se rellena solo a partir del título. Pulsa **"Generate"** si está vacío. Solo edítalo a mano si necesitas una URL distinta del título; en ese caso usa solo minúsculas, sin acentos ni espacios (guiones en su lugar).
   - **Imagen poster (miniatura)** — arrastra la imagen o pulsa "Upload". Importante: rellena el campo **"Texto alternativo"** con una frase corta que describa la imagen (es lo que leen los lectores de pantalla y Google).
   - **Duración** — texto libre tipo `4:12` o `1:23:45`.
   - **Categoría** — pulsa, busca la categoría existente. Si no aparece, créala primero (sección 6) y vuelve.
   - **Descripción** — opcional. 2-4 líneas.
   - **URL del vídeo** — opcional. De momento puede quedar vacío (todavía no está el reproductor real conectado). Cuando llegue la fase 3, aquí se pegará el enlace de YouTube o Vimeo.
   - **Destacado** — actívalo si quieres que aparezca en lugares prominentes (hero, listas de inicio). Úsalo con criterio: si todo está destacado, nada lo está.
   - **Sección en la página de inicio** — elige en qué carrusel quieres que salga:
     - *Estrenos de Barrio* (default — vídeos recientes).
     - *Documentales*.
     - *Edu-Política*.
     - *No mostrar en Home* (para vídeos que existen pero no quieres listar en la portada).
   - **Etiqueta especial en Home** — opcional. Solo se ve si el vídeo está en *Estrenos*. Ej: `NUEVO`.
   - **Fecha de publicación** — viene rellenada con la fecha de hoy. Cámbiala si publicas un vídeo retroactivamente o lo programas a futuro.
3. Arriba a la derecha, pulsa **"Publish"** (verde).
4. La web se actualiza en pocos minutos. Refresca pilarbernabe.es y compruébalo.

> **Truco:** mientras editas, lo que escribes se guarda automáticamente como **borrador** (draft). Hasta que pulses *Publish*, el cambio no es visible en la web. Eso te permite trabajar tranquila sin miedo a romper nada.

---

## 4. Cómo publicar un episodio de podcast

Casi idéntico al vídeo, pero con sus campos propios.

1. Menú → **Episodios de podcast** → **+**.
2. Campos:
   - **Número de episodio** — entero positivo. Ej: `12`.
   - **Título**, **slug** — igual que en vídeos.
   - **Descripción** — máximo 280 caracteres (estilo redes sociales).
   - **Fecha de publicación** — formato `YYYY-MM-DD`.
   - **Duración** — texto libre. Ej: `45 min` o `1h 12 min`.
   - **Imagen del episodio** — cuadrada idealmente (formato podcast).
   - **URL del audio o página externa** — opcional. Enlace a Spotify, Apple Podcasts o iVoox.
   - **Mostrar en el hero (último episodio)** — actívalo solo en **el episodio más reciente**. Si quedan varios marcados, la web coge automáticamente el más reciente, pero conviene que solo uno tenga la marca.
3. **Publish**.

---

## 5. Cómo añadir un testimonio del Club

Aparecen en la sección *Club* de la web.

1. Menú → **Testimonios (Club)** → **+**.
2. Campos:
   - **Nombre**, **Barrio**, **Cita** (máx. 280 caracteres).
   - **Orden de aparición** — número. Más bajo = aparece antes. Si todos tienen `0`, aparecen por fecha de creación.
   - **Mostrar en la web** — checkbox. Si lo desactivas, el testimonio existe pero no se publica (útil para retirar uno temporalmente sin borrarlo).
3. **Publish**.

---

## 6. Cómo crear o editar una categoría

Las categorías sirven para agrupar vídeos (Barrio, Movilidad, Documentales…) y se muestran como pequeños "chips" coloreados en la web.

1. Menú → **Categorías** → **+** (o pulsa una existente para editarla).
2. Campos:
   - **Nombre** — corto, máx. 40 caracteres.
   - **Slug** — se rellena solo. Solo edítalo si necesitas algo distinto.
   - **Color del chip** — opcional. Código HEX (`#RRGGBB`). Si no lo pones, la web usa el color por defecto.
3. **Publish**.

> Si borras una categoría que algún vídeo está usando, esos vídeos se quedarán huérfanos y la web puede romperse. **Antes de borrar una categoría**, comprueba que ningún vídeo la usa. La forma fácil: filtra los vídeos por esa categoría en la lista.

---

## 7. Editar las páginas (Inicio, Club, Pitch, Podcast)

Cada página de la web tiene un **documento único** en el Studio. Cuando lo editas, cambias el texto y las imágenes que se ven en esa página.

### Página: Inicio

Bloques editables:
- **Hero principal** — la imagen grande de arriba, el título, el subtítulo, el texto de la etiqueta (`EN DIRECTO`), el botón principal y su destino, el texto del contador (`Próximo estreno en`).
- **Sección "Estrenos de Barrio"** — título y texto del enlace "ver más".
- **Sección "Podcast"** — idem.
- **Sección "Documentales"** — idem.
- **Sección "Edu-Política"** — idem.

> El **contenido** de cada sección (los vídeos que aparecen) **no se gestiona desde aquí**. Se gestiona desde *Vídeos* + el campo "Sección en la página de inicio" de cada vídeo (ver sección 3).

### Página: Club, Pitch y Podcast

Cada una tiene su hero, su formulario, sus secciones. Los nombres de los campos son descriptivos (ej: *"Título — línea 1"*, *"Subtítulo"*, *"Texto botón Escuchar"*) y guían lo que se está editando. Cambia el texto, pulsa **Publish** y refresca la web para validar.

> **Importante:** en estas páginas no puedes borrar el documento. El botón de borrar no aparece a propósito. Si lo borraras, la página se quedaría sin contenido. Si necesitas vaciar un bloque, déjalo en blanco — no borres el documento entero.

---

## 8. Configuración general

Es donde se cambian las cosas transversales que aparecen en toda la web:

- **Marca**: nombre, color del acento (`#E30613`), letra acentuada (`É`), claim del footer.
- **Redes sociales**: añade, quita o desactiva enlaces a Twitter/X, Instagram, YouTube, TikTok, LinkedIn, Facebook. El checkbox **"Visible"** te permite ocultar una red sin borrarla.
- **Footer**: columnas de enlaces, copyright, línea inferior de atribución.
- **Menú de navegación**: los enlaces del menú superior y el botón CTA de la derecha (por defecto "Suscríbete" → `/club`).

> Cambios en *Configuración general* afectan a **todas las páginas a la vez**. Revísalos con cuidado antes de pulsar Publish.

---

## 9. Borradores, publicación y deshacer

Sanity Studio funciona con un sistema de **borradores**:

- Mientras editas, los cambios se guardan solos como **draft**. El draft solo lo ves tú (y el resto del equipo). **La web NO los enseña.**
- Cuando pulsas **Publish** (botón verde arriba a la derecha), el draft pasa a ser la versión pública. La web se actualiza en pocos minutos.
- Si te has equivocado, hay un botón **"⋯" (los tres puntos)** junto a Publish con la opción **"Discard changes"** — descarta el borrador y vuelve a la versión publicada.
- Para **deshacer un cambio ya publicado**, abre el documento y vete a la pestaña **"History"** (icono de reloj arriba a la derecha). Verás todas las versiones anteriores, con quién las editó y cuándo. Pulsa una versión antigua → **"Restore"**. Sanity guarda el historial indefinidamente, así que se puede revertir a cualquier estado.

---

## 10. Buenas prácticas para imágenes

- **Formato**: JPG o PNG. WebP también va, pero JPG es más universal.
- **Tamaño**:
  - Miniaturas de vídeo: 16:9, mínimo 1280×720 px, idealmente 1920×1080.
  - Hero de páginas: lo más grande que tengas (mínimo 1920 px de ancho). La web la recorta automáticamente.
  - Imagen de podcast: cuadrada, 1400×1400 px o más.
- **Peso**: por debajo de 4 MB. Si pesa más, comprime con [Squoosh](https://squoosh.app/) o [TinyPNG](https://tinypng.com/) antes de subirla.
- **Hotspot**: cuando subes una imagen, puedes pulsar sobre ella en el formulario para fijar el "punto focal". Si la imagen se recorta en pantallas pequeñas, el hotspot indica qué parte conservar.
- **Texto alternativo (alt)**: rellénalo siempre. Una frase corta que describa lo que se ve. Es lo que leen los lectores de pantalla y lo que indexa Google.

---

## 11. Errores comunes y FAQ

**"No me deja publicar, dice que faltan campos obligatorios"**
Los campos con asterisco (✱) son obligatorios. Sanity te marca en rojo cuáles faltan. Suele ser el slug (pulsa "Generate") o el texto alternativo de la imagen.

**"He publicado pero no se ve el cambio en la web"**
Espera 2-3 minutos. La web cachea contenidos para ir rápida. Si pasados 5 minutos no se ve, refresca con `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac) para ignorar la caché del navegador. Si sigue sin verse, avisa a Javi.

**"He borrado algo sin querer"**
No pánico. Abre la papelera del Studio (en la columna izquierda hay un icono de papelera arriba) — los documentos borrados se conservan 30 días. Pulsa el documento → **"Restore"**.

**"He subido la imagen mal, ¿cómo la cambio?"**
En el formulario, pulsa sobre la imagen → **"⋯"** → **"Replace"**. Subes la nueva, se reemplaza, y todas las páginas que usaban esa imagen muestran la nueva.

**"Aparece el mismo vídeo dos veces en la home"**
Comprueba el campo *"Sección en la página de inicio"* del vídeo. Si lo cambias de carrusel sin guardar el anterior, puede quedar duplicado un momento mientras se actualiza la web. Espera 3 minutos y vuelve a comprobar.

**"¿Puedo programar un vídeo para que se publique a futuro?"**
Sí. En el campo *"Fecha de publicación"* pon la fecha futura. Pulsa Publish. El vídeo aparecerá automáticamente cuando llegue esa fecha (la web filtra por fecha).

**"¿Puedo trabajar con otro miembro del equipo a la vez?"**
Sí. Sanity Studio muestra en tiempo real qué documento está editando cada persona. Si dos personas editan el mismo documento a la vez, las dos veréis lo que escribe la otra. Para evitar pisarse, coordinaos por chat.

---

## 12. Roles y permisos

- **Editor** (la mayoría del equipo): puede crear, editar y publicar todo el contenido. No puede invitar a más miembros ni tocar la configuración técnica.
- **Administrator** (Javi y, opcionalmente, una persona de confianza del equipo): además, gestiona miembros, dominios y configuración técnica.

Si necesitas que alguien más entre, escríbele a Javi con el email de esa persona.

---

## 13. Contacto y soporte

- **Dudas operativas (cómo publicar, qué campo es qué)**: tu primer recurso es este manual.
- **Dudas no resueltas o problemas con la web**: Javi Cebrián — `javi.cebrian.renovell@gmail.com`.
- **Caída de la web o del Studio (cosa rara)**: avisa a Javi por el canal más rápido que tengas.

---

*Última actualización: 2026-05-19. Este manual vive en `docs/MANUAL-EDITORIAL.md` del repositorio del proyecto y se actualiza cuando hay cambios en el Studio.*
