# Meta Ads · Conecta Mayores · Prueba Gandia

Primera campaña de pago de Grupimedes en Meta. Objetivo de negocio: llegar a la reunión con el Ayuntamiento de Gandia (y a las empresas de distribución y servicios de la zona) con **demanda vecinal demostrada**, no con una promesa.

- Cuenta publicitaria: **Imedes** (ID 238030711179556) · Portfolio: **Grupimedes**
- Presupuesto de prueba: **14 €/día × 14 días ≈ 196 € + 3 % de cargo por ubicación (España) ≈ 202 €**
- Resultado esperado: una lista de vecinos de Gandia interesados en el programa, por perfil (persona mayor o familiar) y por tema (fraude, banca, WhatsApp…)

> Los campos marcados **[CONFIRMAR]** hay que validarlos antes de publicar.

---

## 0. Estado de la configuración (auditoría del 27/09/2026)

| Elemento | Estado | Qué hacer |
|---|---|---|
| Cuenta publicitaria *Imedes* en el portfolio *Grupimedes* | Existe (según los avisos de Meta). **No verificado**: estado, método de pago ni límite de gasto | Revisarlo en Business Suite → Configuración → Cuentas publicitarias |
| Personas con acceso a las páginas | Meta las añadirá al portfolio el **13/10/2026** | Revisar la lista antes de esa fecha y quitar a quien no deba estar |
| **Página de Facebook de Conecta Mayores** | **No existe** (la web enlaza Instagram y LinkedIn, pero no Facebook) | **Bloqueante.** Los formularios instantáneos se publican desde una página de Facebook. Crearla dentro de *Grupimedes* y vincularle el Instagram @conectapersonasmayores |
| Política de privacidad para leads de Meta | **No cubre** este uso. La actual (conectamayores.es/privacidad) habla solo de «responder a tu solicitud y preparar la propuesta» para empresas e instituciones | **Bloqueante.** Añadir la sección del Anexo A y usar esa URL en el formulario |
| Formulario web para particulares | No existe: la web solo tiene perfiles *empresa* e *institución* | No hace falta para esta prueba, porque el formulario instantáneo se rellena dentro de Facebook |
| Píxel de Meta / API de Conversiones | **No instalados** en conectamayores.es ni en la landing de EGM. Tampoco hay banner de cookies, y la privacidad dice expresamente que no hay rastreadores | No hace falta para esta prueba. Sí será necesario para la fase 2 (ver sección 6) |
| Recepción de los leads | Sin integrar | Descargar a diario desde el Centro de clientes potenciales de Meta, o conectar a n8n → CRM |
| Webhook de la web | Apunta a `n8ntest.javicebrian.es` | Confirmar que es el entorno de producción |

**Resumen:** hay **dos bloqueos** (la página de Facebook y el texto de privacidad). Se resuelven en una mañana. Lo demás puede esperar a la fase 2.

---

## 1. Estructura de la campaña

**Campaña**
- Nombre: `CM · Leads · Gandia · Prueba oct-26`
- Objetivo: **Clientes potenciales**
- Categoría especial: ninguna. Si Meta la marca como «tema social», se presenta como formación y servicio (ver sección 7)
- Presupuesto: a nivel de conjunto de anuncios (no Advantage+ campaign budget), para controlar el reparto entre los dos públicos

**Conjunto A · Personas mayores**
- Nombre: `A · 60-75 · Gandia +10km`
- Ubicación: Gandia + 10 km, con la opción «personas que viven en esta ubicación»
- Edad: 60–75 · Idiomas: sin filtro
- Público: opciones de público originales, sin intereses (el filtro geográfico ya segmenta)
- Ubicaciones: Advantage+ (Facebook tendrá más peso con este público)
- Presupuesto: 8 €/día

**Conjunto B · Familiares**
- Nombre: `B · 40-59 · Gandia +10km`
- Misma ubicación · Edad: 40–59
- Presupuesto: 6 €/día

**Anuncios por conjunto:** dos, uno en castellano y otro en valenciano, con la misma pieza visual. No crear más anuncios: con este presupuesto repartirían el aprendizaje del algoritmo.

**Calendario:** 14 días seguidos. No tocar nada los primeros 5 días.

---

## 2. Textos de los anuncios

**Reglas de Meta que condicionan la redacción:**
- No se puede afirmar ni preguntar por atributos personales de quien lee: nada de «¿Tienes más de 65 años?» o «¿Eres mayor?».
- Se habla del problema (el fraude), no de la edad.
- El tono es el de la marca: en tú, cálido, y con la idea de que *el villano es el fraude, nunca la edad*.

### Conjunto A (personas mayores) · Castellano

**Texto principal**
> «Su banco le informa: su cuenta ha sido bloqueada».
> Ese SMS no es de tu banco. Es de alguien que quiere tu dinero.
>
> En Conecta Mayores aprendemos a reconocerlo en persona, en grupos pequeños y con un educador al lado. También WhatsApp, videollamadas, la cita del médico y la banca desde el móvil. Sin prisas y sin tecnicismos.
>
> Vamos a abrir grupos en Gandia. Déjanos tu nombre y te llamamos para contarte cuándo y dónde.

**Titular:** Aprende a detectar las estafas del móvil
**Descripción:** Talleres presenciales en Gandia [CONFIRMAR: gratuitos]
**Botón:** Registrarte

### Conjunto A · Valenciano

**Text principal**
> «El seu banc l'informa: el seu compte ha sigut bloquejat».
> Eixe SMS no és del teu banc. És d'algú que vol els teus diners.
>
> A Conecta Mayores aprenem a reconéixer-lo en persona, en grups menuts i amb un educador al costat. També WhatsApp, videotrucades, la cita del metge i la banca des del mòbil. Sense presses i sense tecnicismes.
>
> Anem a obrir grups a Gandia. Deixa'ns el teu nom i et cridem per a contar-te quan i on.

**Titular:** Aprén a detectar les estafes del mòbil
**Descripció:** Tallers presencials a Gandia [CONFIRMAR: gratuïts]
**Botó:** Registrar-te

### Conjunto B (familiares) · Castellano

**Texto principal**
> Tu madre te llama porque «le ha llegado un mensaje del banco».
> Esta vez te ha llamado a ti. La próxima, quizá no.
>
> Conecta Mayores son talleres presenciales en grupos pequeños, con educadores de la Fundación Gesmed. Tus padres aprenden a reconocer SMS y llamadas falsas, a hacer videollamadas y a pedir cita médica desde el móvil, a su ritmo.
>
> Vamos a abrir grupos en Gandia. Apúntalos (o apúntate tú para acompañarlos) y os llamamos.

**Titular:** Que el fraude no les pille solos
**Descripción:** Talleres presenciales en Gandia [CONFIRMAR: gratuitos]
**Botón:** Registrarte

### Conjunto B · Valenciano

**Text principal**
> La teua mare et crida perquè «li ha arribat un missatge del banc».
> Esta vegada t'ha cridat a tu. La pròxima, potser no.
>
> Conecta Mayores són tallers presencials en grups menuts, amb educadors de la Fundació Gesmed. Els teus pares aprenen a reconéixer SMS i telefonades falses, a fer videotrucades i a demanar cita mèdica des del mòbil, al seu ritme.
>
> Anem a obrir grups a Gandia. Apunta'ls (o apunta't tu per a acompanyar-los) i vos cridem.

**Titular:** Que el frau no els pille a soles
**Descripció:** Tallers presencials a Gandia [CONFIRMAR: gratuïts]
**Botó:** Registrar-te

---

## 3. Formulario instantáneo

**Configuración**
- Tipo de formulario: **Mayor intención**. Añade un paso de revisión antes de enviar. Hay algo menos de volumen, pero son personas que de verdad quieren que las llamen, y eso importa porque cada lead se llama por teléfono.
- Nombre interno: `CM · Gandia · Preinscripción · ES` (y otro igual para VA)

**Pantalla de introducción**
- Titular: *Te avisamos cuando abramos grupo en Gandia*
- Texto: *Talleres presenciales, grupos pequeños y un educador al lado. Déjanos tus datos y te llamamos para contarte horarios y lugar. No es una compra ni te compromete a nada.*

**Preguntas** (en este orden, pocas y de opción cerrada, pensando en usuarios mayores)
1. **¿Para quién es la plaza?** (opción múltiple)
   - Para mí
   - Para mi padre o mi madre
   - Para otro familiar o vecino
2. **¿Qué te preocupa más?** (opción múltiple)
   - SMS y llamadas falsas
   - Usar el banco desde el móvil
   - WhatsApp y videollamadas
   - Pedir cita médica y hacer trámites
   - Un poco de todo
3. **¿Cuándo te viene mejor?** (opción múltiple): Por la mañana · Por la tarde · Me da igual
4. **Barrio o zona de Gandia** (respuesta corta, opcional)
5. **Nombre y apellidos** (autocompletado)
6. **Teléfono** (autocompletado). Es el dato clave.
7. **Correo electrónico** (autocompletado, opcional si Meta lo permite; si no, se deja)

**Privacidad**
- Enlace: la URL de la sección nueva del Anexo A, por ejemplo `https://conectamayores.es/privacidad#talleres`
- Aviso personalizado, con casilla **obligatoria**:
  > Acepto que Instituto IMEDES, S.L. trate mis datos para llamarme e informarme sobre los talleres de Conecta Mayores en mi municipio. Si apunto a un familiar, confirmo que cuento con su permiso.

**Pantalla de agradecimiento**
- Titular: *¡Apuntado! Te llamaremos en los próximos días*
- Texto: *Mientras tanto, aquí tienes una guía para reconocer un SMS falso del banco.*
- Botón: *Ver la guía* → `https://conectamayores.es/aula/sms-banco-falso-como-reconocerlo?utm_source=meta&utm_medium=paid_social&utm_campaign=cm-gandia-prueba&utm_content=gracias`
- Añadir también un botón de llamada: 610 218 870

---

## 4. Guion del vídeo (vertical 9:16, 25–30 s, con subtítulos)

**Recomendación:** grabarlo con personas reales, a ser posible en un taller de Mobile Money o de la Fundación Gesmed. Las imágenes de la web están generadas con IA. Con este público, y en un anuncio que habla precisamente de engaños, **lo auténtico convence más**. Que salga un educador real, con cara y nombre.

Casi todo el mundo lo verá **sin sonido**: todo lo importante debe estar también en el texto en pantalla.

| Tiempo | Imagen | Texto en pantalla | Voz / audio |
|---|---|---|---|
| 0–3 s | Primer plano de un móvil vibrando en una mesa de cocina. Se ve el SMS: «Su cuenta ha sido bloqueada. Pulse aquí» | **¿Pulsarías?** | Vibración del móvil |
| 3–7 s | Mano de una mujer de unos 70 años que duda, con el dedo encima del enlace | **Así empiezan la mayoría de estafas** | — |
| 7–13 s | Corte a un taller: grupo de 6–8 personas, un educador señala una pantalla y alguien se ríe | **En grupo se aprende sin miedo** | Educador: «Mirad el remitente. ¿Os suena este número?» |
| 13–19 s | Participante enseñando su móvil a otra y marcando algo como spam | **Reconocer SMS y llamadas falsas · WhatsApp · Cita médica · Banca** | Participante: «Ahora ya no pico» (una frase real, sin guion) |
| 19–25 s | Plano del grupo con el diploma o el cartel de Conecta Mayores | **Talleres presenciales en Gandia** | — |
| 25–30 s | Logo de Conecta Mayores + Fundación Gesmed | **Apúntate · Te llamamos** | — |

**Versión B, solo con fotos** (si no da tiempo a grabar): carrusel de 3 imágenes.
1. Captura de un SMS falso con el texto «¿Pulsarías?»
2. Foto real de un taller con «En grupo se aprende sin miedo»
3. Lista de los temas con «Talleres en Gandia · Te llamamos»

**Especificaciones**
- Vídeo: 1080×1920 y una versión 4:5 (1080×1350) para el feed
- Letra grande (mínimo 60 px en 1080), alto contraste
- Logo pequeño, que no tape la escena

---

## 5. Seguimiento y medición

**Todos los días (5 minutos)**
- Descargar los leads nuevos en Meta Business Suite → Centro de clientes potenciales, o por la integración con n8n.
- **Llamar en menos de 24 horas.** Registrar el resultado: contactado / interesado / no contesta / error.

**Indicadores**

| Indicador | Dónde se ve | Referencia de prueba [CONFIRMAR con datos propios] |
|---|---|---|
| CPM (coste por mil impresiones) | Ads Manager | Solo como contexto |
| CTR del enlace | Ads Manager | Si es menor del 0,8 % tras 3 días, el problema es la creatividad |
| Coste por lead | Ads Manager | Objetivo orientativo: por debajo de 4 € |
| **% de leads contactados** | Tu hoja o el CRM | Más del 60 % |
| **% interesados reales** | Tu hoja o el CRM | Es el dato que se lleva al ayuntamiento |

**Día 15, informe de una página:** gasto, leads, contactados, interesados, reparto por tema y por perfil. Ese informe es el anexo de la propuesta a Gandia: *«N vecinos de Gandia han pedido el programa; el 60 % por fraude y banca»*.

**Nombres de UTM** para todo lo que enlace a la web (mismo esquema que #GestiónQueSeVe):
`utm_source=meta · utm_medium=paid_social · utm_campaign=cm-gandia-prueba · utm_content=<anuncio>`

---

## 6. Fase 2 (cuando la prueba funcione): configuración técnica pendiente

1. **Banner de cookies con consentimiento previo** en conectamayores.es, y actualizar la política de privacidad, que hoy dice que no hay rastreadores.
2. **Píxel de Meta**, que solo se cargue tras el consentimiento, y **API de Conversiones** desde el webhook de n8n (el evento `Lead` al enviar el formulario).
3. **sitio.js:** capturar también `utm_content`, `utm_term` y `fbclid`. Hoy solo guarda `source`, `medium` y `campaign`.
4. **Verificar el dominio** conectamayores.es en Business Suite (meta `facebook-domain-verification`).
5. **Landing EGM (egm-imedes.vercel.app)**, antes de hacer anuncios:
   - enlazar una política de privacidad y añadir una casilla de consentimiento (hoy solo hay una línea bajo el botón);
   - dejar de fijar las UTM en el código, porque las de Meta se pierden;
   - unificar el código postal (46010 frente a 46015);
   - moverla a un dominio propio: un *.vercel.app no se puede verificar en Meta.
6. Pasar el webhook de `n8ntest` a un host de producción, si no lo es ya.

---

## 7. Riesgos y cómo evitarlos

- **Clasificación como «tema social».** En la UE Meta no publica anuncios sobre temas sociales, electorales o políticos. Para reducir el riesgo:
  - no mencionar ayuntamientos, partidos ni fondos públicos en el anuncio;
  - presentarlo como formación práctica.
  - Si lo rechazan, se pide una revisión explicando que es un servicio formativo.
- **Promesa sin fecha.** Mientras no haya un grupo financiado en Gandia, el mensaje debe ser de **preinscripción** («te avisamos cuando abramos grupo»). No se ofrecen plazas cerradas.
- **Datos de terceros.** Quien apunta a un familiar confirma que tiene su permiso (está en la casilla del formulario). En la llamada, se confirma con la persona mayor.
- **Público pequeño.** Si en 3 días el gasto no llega al presupuesto, se amplía el radio a la comarca de la Safor.

---

## Anexo A · Sección nueva para la política de privacidad

Añadir a `conectamayores.es/privacidad` con el ancla `#talleres` [CONFIRMAR con el DPD: info@businessadapter.es]:

> **Preinscripciones a talleres desde redes sociales**
>
> Si te apuntas a los talleres de Conecta Mayores desde un formulario de Facebook o Instagram, Instituto IMEDES, S.L. (NIF B98255482) tratará tu nombre, teléfono, correo electrónico (si lo facilitas), municipio y las respuestas del formulario con una sola finalidad: llamarte para informarte de los talleres en tu municipio e inscribirte si lo deseas.
>
> **Base jurídica:** tu consentimiento, que puedes retirar en cualquier momento.
>
> **Destinatarios:** la Fundación Gesmed, que imparte los talleres, como encargada del tratamiento [CONFIRMAR el contrato de encargo]. No cederemos tus datos a terceros con fines comerciales. Meta Platforms Ireland Ltd. recoge el formulario en su plataforma y actúa conforme a su propia política de privacidad.
>
> **Conservación:** 12 meses desde tu inscripción o hasta que retires tu consentimiento.
>
> **Si apuntas a otra persona**, confirmas que cuentas con su permiso.
>
> **Derechos:** puedes ejercerlos en admin@grupimedes.com y reclamar ante la AEPD.
