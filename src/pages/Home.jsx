import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fetchPaginaHome, fetchVideosBySeccion, fetchEpisodios } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'

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

// ─── Helpers ───────────────────────────────────────────────────────────────

function normalizeVideo(v) {
  if (!v) return null
  const isFromSanity = !!v.titulo
  if (!isFromSanity) return v
  let img = '/images/hero.png'
  if (v.poster) {
    try {
      img = urlFor(v.poster).width(800).height(450).fit('crop').auto('format').url()
    } catch (e) { /* ignore */ }
  }
  return {
    _id: v._id,
    title: v.titulo,
    duration: v.duracion,
    badge: v.badgeHome,
    desc: v.descripcion,
    img,
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
    } catch (err) { /* ignore */ }
  }
  return {
    _id: e._id,
    ep: `Ep. ${e.numero}`,
    title: e.titulo,
    duration: e.duracion,
    active: i === 0,
    img,
  }
}

// ─── Cards ─────────────────────────────────────────────────────────────────

function VideoCard({ item, index, sectionLabel }) {
  return (
    <motion.div className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
      <Link to="/reproductor">
        <div className="card__thumb">
          <img src={item.img} alt={item.title} />
          <div className="card__play-overlay"><PlayIcon /></div>
          {item.badge && <span className="card__badge">{item.badge}</span>}
          <span className="card__duration">{item.duration}</span>
        </div>
        <div className="card__info">
          <p className="card__title">{item.title}</p>
          <p className="card__meta">{sectionLabel}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function PodcastCard({ item, index }) {
  return (
    <motion.div className={`podcast-card ${item.active ? 'active' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
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
    </motion.div>
  )
}

function WideCard({ item, index }) {
  return (
    <motion.div className="wide-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
      <div className="wide-card__thumb">
        <img src={item.img} alt={item.title} />
        <span className="wide-card__duration">{item.duration}</span>
      </div>
      <div className="wide-card__info">
        <p className="wide-card__title">{item.title}</p>
        <p className="wide-card__desc">{item.desc}</p>
      </div>
    </motion.div>
  )
}

function SquareCard({ item, index }) {
  return (
    <motion.div className="square-card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}>
      <div className="square-card__thumb">
        <img src={item.img} alt={item.title} />
      </div>
      <div className="square-card__info">
        <p className="square-card__title">{item.title}</p>
        <p className="square-card__meta">{item.duration}</p>
      </div>
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [time, setTime] = useState({ h: 2, m: 15, s: 0 })
  const [hero, setHero] = useState(FALLBACK_HERO)
  const [secciones, setSecciones] = useState(FALLBACK_SECCIONES)
  const [estrenos, setEstrenos] = useState(FALLBACK_ESTRENOS)
  const [podcasts, setPodcasts] = useState(FALLBACK_PODCASTS)
  const [documentales, setDocumentales] = useState(FALLBACK_DOCUMENTALES)
  const [edupolitica, setEdupolitica] = useState(FALLBACK_EDUPOLITICA)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        if (s > 0) s--
        else if (m > 0) { m--; s = 59 }
        else if (h > 0) { h--; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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
            } catch (e) { /* ignore */ }
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

  const pad = (n) => String(n).padStart(2, '0')

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
            <div className="hero__countdown">
              {hero.countdownTexto} <span>{pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="content-section" id="estrenos">
        <div className="section-header">
          <h2>{secciones.seccionEstrenos.titulo}</h2>
          <Link to="/reproductor">{secciones.seccionEstrenos.verMas}</Link>
        </div>
        <div className="carousel">
          {estrenos.map((item, i) => (
            <VideoCard key={item._id} item={item} index={i} sectionLabel="Estrenos de Barrio" />
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
          <a href="#">{secciones.seccionDocumentales.verMas}</a>
        </div>
        <div className="carousel">
          {documentales.map((item, i) => <WideCard key={item._id} item={item} index={i} />)}
        </div>
      </section>

      <section className="content-section" id="educacion">
        <div className="section-header">
          <h2>{secciones.seccionEdupolitica.titulo}</h2>
          <a href="#">{secciones.seccionEdupolitica.verMas}</a>
        </div>
        <div className="carousel">
          {edupolitica.map((item, i) => <SquareCard key={item._id} item={item} index={i} />)}
        </div>
      </section>
    </>
  )
}
