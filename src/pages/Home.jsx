import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fetchPaginaHome, fetchVideosBySeccion, fetchEpisodios } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'
import { categoriasDe, rutaDe } from '../lib/contenido'
import { ChipsDe } from '../components/CategoriaChip'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
)

// ─── Fallbacks (se usan si Sanity está vacío o falla) ──────────────────────

const FALLBACK_HERO = {
  badge: 'EN DIRECTO',
  titulo: 'València en Marcha',
  subtitulo: 'La política como producción cultural y ciudadana',
  ctaTexto: 'Ver Ahora',
  ctaRuta: '/reproductor',
  countdownTexto: 'Próximo estreno en',
  proximoEstreno: null,
  imagenUrl: '/images/hero.png',
  imagenAlt: 'València',
}

const FALLBACK_SECCIONES = {
  seccionEstrenos: { titulo: 'Estrenos de Barrio', verMas: 'Ver todos →' },
  seccionPodcast: { titulo: 'El Podcast de La Bernabé', verMas: 'Todos los episodios →' },
  seccionDocumentales: { titulo: 'Documentales de Gestión', verMas: 'Ver todos →' },
  seccionEdupolitica: { titulo: 'Edu-Política', verMas: 'Ver todos →' },
}

const FALLBACK_ESTRENOS = [
  { _id: 'e1', title: 'Russafa se Transforma', duration: '3:45', badge: 'NUEVO', img: '/images/barrio.png' },
  { _id: 'e2', title: 'El Nuevo Parque de Benimaclet', duration: '4:12', badge: 'NUEVO', img: '/images/pilar.png' },
  { _id: 'e3', title: 'Mercado Central: 100 Años', duration: '5:30', img: '/images/hero.png' },
  { _id: 'e4', title: 'Cabanyal Renace', duration: '3:58', badge: 'NUEVO', img: '/images/barrio.png' },
  { _id: 'e5', title: 'La Marina: Puerto Ciudadano', duration: '6:15', img: '/images/hero.png' },
]

const FALLBACK_PODCASTS = [
  { _id: 'p1', ep: 'Ep. 12', title: 'Movilidad Sostenible', duration: '45 min', active: true, img: '/images/podcast.png' },
  { _id: 'p2', ep: 'Ep. 11', title: 'Vivienda Joven en València', duration: '38 min', img: '/images/podcast2.png' },
  { _id: 'p3', ep: 'Ep. 10', title: 'Cultura de Barrio', duration: '42 min', img: '/images/podcast3.png' },
  { _id: 'p4', ep: 'Ep. 09', title: 'Transición Energética', duration: '50 min', img: '/images/podcast.png' },
]

const FALLBACK_DOCUMENTALES = [
  { _id: 'd1', title: 'València Resiliente: Después de la DANA', desc: 'Cómo la ciudad se recuperó y construyó nuevas infraestructuras de prevención.', duration: '60 min', img: '/images/hero.png' },
  { _id: 'd2', title: 'El Plan Verde de la Huerta', desc: 'Un documental sobre la protección de la huerta valenciana y la agricultura sostenible.', duration: '45 min', img: '/images/pilar.png' },
  { _id: 'd3', title: 'Presupuestos Participativos 2026', desc: 'Descubre cómo se decide dónde se invierte el dinero público en tu barrio.', duration: '52 min', img: '/images/community.png' },
]

const FALLBACK_EDUPOLITICA = [
  { _id: 'ed1', title: '¿Cómo funciona el Pleno?', duration: '8 min', img: '/images/podcast.png' },
  { _id: 'ed2', title: '¿Qué es un presupuesto municipal?', duration: '6 min', img: '/images/community.png' },
  { _id: 'ed3', title: 'Tu voto, explicado', duration: '5 min', img: '/images/pilar.png' },
  { _id: 'ed4', title: '¿Quién decide las calles?', duration: '7 min', img: '/images/bike.png' },
  { _id: 'ed5', title: 'Servicios Municipales 101', duration: '9 min', img: '/images/podcast3.png' },
]

// ─── Formatos de carrusel ──────────────────────────────────────────────────

// Recorte que se le pide a Sanity para cada formato. Debe coincidir con la
// proporción que el CSS le da a la miniatura (--card-ar en App.css): si no
// coinciden, el object-fit del navegador vuelve a recortar encima y la imagen
// sale ampliada. Los tamaños cubren pantallas de alta densidad sobre el ancho
// de tarjeta de cada formato.
const FORMATOS = {
  vertical:   { crop: { w:  540, h:  960 } }, // 9:16
  cuadrado:   { crop: { w:  640, h:  640 } }, // 1:1
  horizontal: { crop: { w:  800, h:  450 } }, // 16:9
  panoramico: { crop: { w: 1000, h:  429 } }, // 21:9
}

// Formato de cada carrusel mientras el equipo no elija uno en el Studio.
// Vive aquí y no como initialValue del schema porque el documento "Página: Inicio"
// ya existe en producción, y en Sanity el initialValue solo se aplica al crear un
// documento nuevo: los campos añadidos después llegan vacíos.
const FORMATO_POR_DEFECTO = {
  seccionEstrenos: 'vertical',
  seccionDocumentales: 'panoramico',
  seccionEdupolitica: 'vertical',
}

// El valor que viene del CMS nunca entra en el CSS: solo sirve para elegir un nombre
// de clase de esta lista. Un valor inesperado cae al formato por defecto de su
// sección en lugar de producir un aspect-ratio inválido que rompería la maqueta.
function formatoDe(secciones, key) {
  if (import.meta.env.DEV) {
    // Atajo de desarrollo para revisar los cuatro formatos sin tocar Sanity:
    // localhost:5173/?formato=vertical. Vite lo elimina del build de producción.
    const forzado = new URLSearchParams(window.location.search).get('formato')
    if (FORMATOS[forzado]) return forzado
  }
  const elegido = secciones?.[key]?.formato
  return FORMATOS[elegido] ? elegido : FORMATO_POR_DEFECTO[key]
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function normalizeVideo(v) {
  if (!v) return null
  const isFromSanity = !!v.titulo
  if (!isFromSanity) return v
  return {
    _id: v._id,
    _type: v._type,
    slug: v.slug,
    title: v.titulo,
    duration: v.duracion,
    badge: v.badgeHome,
    desc: v.descripcion,
    categorias: categoriasDe(v),
    // Se guarda la imagen sin procesar: la URL con su recorte se calcula al
    // pintar, cuando ya se conoce el formato de la sección. El formato llega de
    // fetchPaginaHome(), que es una petición independiente de la de los vídeos y
    // puede resolverse después.
    poster: v.poster,
  }
}

function posterUrl(item, formato) {
  if (item.img) return item.img // fallbacks locales, ya traen ruta estática
  if (!item.poster) return '/images/hero.png'
  const { w, h } = (FORMATOS[formato] || FORMATOS.horizontal).crop
  try {
    return urlFor(item.poster).width(w).height(h).fit('crop').auto('format').url()
  } catch {
    return '/images/hero.png'
  }
}

function normalizeEpisodio(e, i) {
  if (!e) return null
  const isFromSanity = e.numero !== undefined
  if (!isFromSanity) return e
  let img = '/images/podcast.png'
  if (e.imagen) {
    try {
      img = urlFor(e.imagen).width(400).height(400).fit('crop').auto('format').url()
    } catch { /* ignore */ }
  }
  return {
    _id: e._id,
    _type: e._type,
    slug: e.slug,
    ep: `Ep. ${e.numero}`,
    title: e.titulo,
    duration: e.duracion,
    active: i === 0,
    img,
  }
}

// ─── Cards ─────────────────────────────────────────────────────────────────

// Una sola tarjeta para los tres carruseles de vídeo. La geometría (proporción y
// ancho) la decide el CSS a partir del formato del carrusel; aquí solo se elige qué
// campos se pintan.
function MediaCard({ item, index, variant, formato, sectionLabel }) {
  const esEstreno = variant === 'estreno'
  const esDocumental = variant === 'documental'
  const esEdu = variant === 'edu'
  const categorias = item.categorias || []
  // Los fallbacks locales no tienen slug: llevan al catálogo.
  const destino = item.slug ? rutaDe(item) : '/reproductor'

  const entrada = esEdu
    ? { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }

  const cuerpo = (
    <>
      <div className="card__thumb">
        <img src={posterUrl(item, formato)} alt={item.title} loading="lazy" />
        <div className="card__play-overlay"><PlayIcon /></div>
        {esEstreno && item.badge && <span className="card__badge">{item.badge}</span>}
        {!esEdu && <span className="card__duration">{item.duration}</span>}
      </div>
      <div className="card__info">
        <p className="card__title">{item.title}</p>
        {esDocumental && <p className="card__desc">{item.desc}</p>}
        {categorias.length > 0
          ? <ChipsDe categorias={categorias} max={2} />
          : esEstreno && <p className="card__meta">{sectionLabel}</p>}
        {esEdu && <p className="card__meta">{item.duration}</p>}
      </div>
    </>
  )

  return (
    <motion.div
      className={`card${esDocumental ? ' card--documental' : ''}${esEdu ? ' card--edu' : ''}`}
      {...entrada}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
      <Link to={destino}>{cuerpo}</Link>
    </motion.div>
  )
}

function PodcastCard({ item, index }) {
  const destino = item.slug ? rutaDe(item) : '/podcast'
  return (
    <motion.div className={`podcast-card ${item.active ? 'active' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
      <Link to={destino} className="podcast-card__link">
      <div className="podcast-card__thumb">
        <img src={item.img} alt={item.title} />
        <div className="podcast-card__play-btn">
          {item.active ? (
            <div className="podcast-card__wave-mini">
              {[...Array(4)].map((_, i) => <div key={i} className="bar" />)}
            </div>
          ) : (
            <PlayIcon />
          )}
        </div>
      </div>
      <div className="podcast-card__info">
        <span className="podcast-card__ep">{item.ep}</span>
        <p className="podcast-card__title">{item.title}</p>
        <span className="podcast-card__duration">{item.duration}</span>
      </div>
      </Link>
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

// Seconds left until `iso`; null when there is no date or it already passed.
function restanteHasta(iso, ahora = Date.now()) {
  if (!iso) return null
  const diff = Math.floor((new Date(iso).getTime() - ahora) / 1000)
  return Number.isFinite(diff) && diff > 0 ? diff : null
}

function formatearRestante(seg) {
  const d = Math.floor(seg / 86400)
  const h = Math.floor((seg % 86400) / 3600)
  const m = Math.floor((seg % 3600) / 60)
  const s = seg % 60
  const pad = (n) => String(n).padStart(2, '0')
  return d > 0 ? `${d}d ${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function Home() {
  const [hero, setHero] = useState(FALLBACK_HERO)
  const [ahora, setAhora] = useState(() => Date.now())
  const [secciones, setSecciones] = useState(FALLBACK_SECCIONES)
  const [estrenos, setEstrenos] = useState(FALLBACK_ESTRENOS)
  const [podcasts, setPodcasts] = useState(FALLBACK_PODCASTS)
  const [documentales, setDocumentales] = useState(FALLBACK_DOCUMENTALES)
  const [edupolitica, setEdupolitica] = useState(FALLBACK_EDUPOLITICA)

  // La cuenta atrás solo existe si el equipo ha puesto una fecha futura en
  // "Página: Inicio" → Hero → Fecha y hora del próximo estreno.
  useEffect(() => {
    if (!restanteHasta(hero.proximoEstreno)) return undefined
    const interval = setInterval(() => setAhora(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [hero.proximoEstreno])
  const restante = restanteHasta(hero.proximoEstreno, ahora)

  useEffect(() => {
    let cancelled = false
    fetchPaginaHome()
      .then((page) => {
        if (cancelled || !page) return
        if (page.hero) {
          let imagenUrl = FALLBACK_HERO.imagenUrl
          if (page.hero.imagen) {
            try {
              imagenUrl = urlFor(page.hero.imagen).width(1920).height(1080).fit('crop').auto('format').url()
            } catch { /* ignore */ }
          }
          setHero({
            ...FALLBACK_HERO,
            ...page.hero,
            imagenUrl,
            imagenAlt: page.hero.imagen?.alt || FALLBACK_HERO.imagenAlt,
          })
        }
        setSecciones({
          seccionEstrenos: page.seccionEstrenos || FALLBACK_SECCIONES.seccionEstrenos,
          seccionPodcast: page.seccionPodcast || FALLBACK_SECCIONES.seccionPodcast,
          seccionDocumentales: page.seccionDocumentales || FALLBACK_SECCIONES.seccionDocumentales,
          seccionEdupolitica: page.seccionEdupolitica || FALLBACK_SECCIONES.seccionEdupolitica,
        })
      })
      .catch((err) => console.error('[home] sanity page error:', err))

    fetchVideosBySeccion('estrenos', { limit: 10 })
      .then((list) => {
        if (cancelled || !list?.length) return
        setEstrenos(list.map(normalizeVideo))
      })
      .catch((err) => console.error('[home] estrenos error:', err))

    fetchVideosBySeccion('documentales', { limit: 10 })
      .then((list) => {
        if (cancelled || !list?.length) return
        setDocumentales(list.map(normalizeVideo))
      })
      .catch((err) => console.error('[home] documentales error:', err))

    fetchVideosBySeccion('edupolitica', { limit: 10 })
      .then((list) => {
        if (cancelled || !list?.length) return
        setEdupolitica(list.map(normalizeVideo))
      })
      .catch((err) => console.error('[home] edupolitica error:', err))

    fetchEpisodios({ limit: 4 })
      .then((list) => {
        if (cancelled || !list?.length) return
        setPodcasts(list.map(normalizeEpisodio))
      })
      .catch((err) => console.error('[home] episodios error:', err))

    return () => { cancelled = true }
  }, [])

  const fmtEstrenos = formatoDe(secciones, 'seccionEstrenos')
  const fmtDocumentales = formatoDe(secciones, 'seccionDocumentales')
  const fmtEdupolitica = formatoDe(secciones, 'seccionEdupolitica')

  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero__bg"><img src={hero.imagenUrl} alt={hero.imagenAlt} /></div>
        <motion.div className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
          <div className="hero__badge"><span className="dot" /> {hero.badge}</div>
          <h1 className="hero__title">{hero.titulo}</h1>
          <p className="hero__subtitle">{hero.subtitulo}</p>
          <div className="hero__actions">
            <Link to={hero.ctaRuta || '/reproductor'}>
              <button className="btn-play"><PlayIcon /> {hero.ctaTexto}</button>
            </Link>
            {restante !== null && (
              <div className="hero__countdown">
                {hero.countdownTexto} <span>{formatearRestante(restante)}</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <section className="content-section" id="estrenos">
        <div className="section-header">
          <h2>{secciones.seccionEstrenos.titulo}</h2>
          <Link to="/reproductor?seccion=estrenos">{secciones.seccionEstrenos.verMas}</Link>
        </div>
        <div className={`carousel carousel--${fmtEstrenos}`}>
          {estrenos.map((item, i) => (
            <MediaCard key={item._id} item={item} index={i} variant="estreno" formato={fmtEstrenos} sectionLabel="Estrenos de Barrio" />
          ))}
        </div>
      </section>

      <section className="content-section" id="podcast">
        <div className="section-header">
          <h2>{secciones.seccionPodcast.titulo}</h2>
          <Link to="/podcast">{secciones.seccionPodcast.verMas}</Link>
        </div>
        <div className="carousel">
          {podcasts.map((item, i) => <PodcastCard key={item._id} item={item} index={i} />)}
        </div>
      </section>

      <section className="content-section" id="documentales">
        <div className="section-header">
          <h2>{secciones.seccionDocumentales.titulo}</h2>
          <Link to="/reproductor?seccion=documentales">{secciones.seccionDocumentales.verMas}</Link>
        </div>
        <div className={`carousel carousel--${fmtDocumentales}`}>
          {documentales.map((item, i) => <MediaCard key={item._id} item={item} index={i} variant="documental" formato={fmtDocumentales} />)}
        </div>
      </section>

      <section className="content-section" id="educacion">
        <div className="section-header">
          <h2>{secciones.seccionEdupolitica.titulo}</h2>
          <Link to="/reproductor?seccion=edupolitica">{secciones.seccionEdupolitica.verMas}</Link>
        </div>
        <div className={`carousel carousel--${fmtEdupolitica}`}>
          {edupolitica.map((item, i) => <MediaCard key={item._id} item={item} index={i} variant="edu" formato={fmtEdupolitica} />)}
        </div>
      </section>
    </>
  )
}
