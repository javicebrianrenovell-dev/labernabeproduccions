import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPaginaPodcast, fetchEpisodios, fetchEpisodioDestacado } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'

const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>

const FALLBACK_PAGE = {
  hero: {
    label: 'EL PODCAST DE LA BERNABÉ',
    badgePrefix: 'ÚLTIMO EPISODIO · EP.',
    ctaTextoEscuchar: 'Escuchar Ahora',
    ctaTextoPausar: 'Pausar',
  },
  plataformas: [
    { nombre: 'Spotify', icono: '🎵', url: '#' },
    { nombre: 'Apple Podcasts', icono: '🎧', url: '#' },
    { nombre: 'YouTube', icono: '▶️', url: '#' },
    { nombre: 'iVoox', icono: '📻', url: '#' },
  ],
  tituloLista: 'Todos los Episodios',
  textoEscuchaPlataformas: 'Escúchalo en tu plataforma favorita:',
  cta: {
    titulo: 'No te pierdas ningún episodio',
    descripcion: 'Suscríbete al Guion Semanal y recibe cada nuevo episodio directamente en tu bandeja.',
    placeholderEmail: 'tu@email.com',
    textoBoton: 'Suscribirme',
  },
}

const FALLBACK_EPISODIOS = [
  { _id: 'fe1', numero: 12, titulo: 'Movilidad Sostenible', descripcion: 'Hablamos con el concejal de movilidad sobre el nuevo plan ciclista de la ciudad. Más de 40 km de carril bici antes de 2027.', fecha: '2026-03-28', duracion: '45 min', destacadoHero: true, imagenUrl: '/images/podcast.png' },
  { _id: 'fe2', numero: 11, titulo: 'Vivienda Joven en València', descripcion: 'La crisis de la vivienda no es inevitable. Analizamos las medidas que ya están funcionando y las que necesitan más ambición.', fecha: '2026-03-21', duracion: '38 min', imagenUrl: '/images/podcast2.png' },
  { _id: 'fe3', numero: 10, titulo: 'Cultura de Barrio', descripcion: 'De las fallas a los festivales de cine independiente: cómo la cultura vertebra la identidad de cada barrio.', fecha: '2026-03-14', duracion: '42 min', imagenUrl: '/images/podcast3.png' },
  { _id: 'fe4', numero: 9, titulo: 'Transición Energética', descripcion: 'Paneles solares en edificios municipales, comunidades energéticas y el camino hacia una València neutra en carbono.', fecha: '2026-03-07', duracion: '50 min', imagenUrl: '/images/podcast.png' },
  { _id: 'fe5', numero: 8, titulo: 'Educación Pública', descripcion: 'Inversión récord en escuelas infantiles y el programa de becas comedor que ya llega a 12.000 familias.', fecha: '2026-02-28', duracion: '35 min', imagenUrl: '/images/podcast2.png' },
  { _id: 'fe6', numero: 7, titulo: 'Turismo Sostenible', descripcion: '¿Se puede crecer sin destruir? Un modelo turístico que respeta a vecinos y visitantes por igual.', fecha: '2026-02-21', duracion: '41 min', imagenUrl: '/images/podcast3.png' },
  { _id: 'fe7', numero: 6, titulo: 'Espacios Verdes', descripcion: 'El Jardín del Turia se amplía: nuevas zonas verdes, parques de barrio y la revolución del arbolado urbano.', fecha: '2026-02-14', duracion: '37 min', imagenUrl: '/images/podcast.png' },
  { _id: 'fe8', numero: 5, titulo: 'Presupuestos Participativos', descripcion: 'Tú decides dónde va el dinero público. Así funcionan los presupuestos participativos de 2026.', fecha: '2026-02-07', duracion: '44 min', imagenUrl: '/images/community.png' },
]

function imageUrlFromSanity(img, w = 600, h = 600) {
  if (!img) return null
  try {
    return urlFor(img).width(w).height(h).fit('crop').auto('format').url()
  } catch {
    return null
  }
}

function formatFecha(iso) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`
  } catch {
    return iso
  }
}

export default function Podcast() {
  const [page, setPage] = useState(FALLBACK_PAGE)
  const [episodios, setEpisodios] = useState(FALLBACK_EPISODIOS)
  const [destacado, setDestacado] = useState(FALLBACK_EPISODIOS[0])
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPaginaPodcast()
      .then((data) => {
        if (cancelled || !data) return
        setPage({
          hero: { ...FALLBACK_PAGE.hero, ...(data.hero || {}) },
          plataformas: data.plataformas?.length ? data.plataformas : FALLBACK_PAGE.plataformas,
          tituloLista: data.tituloLista || FALLBACK_PAGE.tituloLista,
          textoEscuchaPlataformas: data.textoEscuchaPlataformas || FALLBACK_PAGE.textoEscuchaPlataformas,
          cta: { ...FALLBACK_PAGE.cta, ...(data.cta || {}) },
        })
      })
      .catch((err) => console.error('[podcast] page error:', err))

    fetchEpisodios({ limit: 30 })
      .then((list) => {
        if (cancelled || !list?.length) return
        const norm = list.map((e) => ({
          ...e,
          imagenUrl: imageUrlFromSanity(e.imagen, 600, 600) || '/images/podcast.png',
        }))
        setEpisodios(norm)
      })
      .catch((err) => console.error('[podcast] lista error:', err))

    fetchEpisodioDestacado()
      .then((e) => {
        if (cancelled || !e) return
        setDestacado({ ...e, imagenUrl: imageUrlFromSanity(e.imagen, 1920, 1080) || '/images/podcast.png' })
      })
      .catch((err) => console.error('[podcast] destacado error:', err))

    return () => { cancelled = true }
  }, [])

  const { hero, plataformas, tituloLista, textoEscuchaPlataformas, cta } = page

  return (
    <div className="podcast-page">
      {/* HERO — Featured Episode */}
      <section className="podcast-hero">
        <div className="podcast-hero__bg">
          <img src={destacado.imagenUrl} alt={destacado.titulo} />
        </div>
        <motion.div className="podcast-hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <span className="podcast-hero__label">{hero.label}</span>
          <div className="podcast-hero__badge">{hero.badgePrefix} {destacado.numero}</div>
          <h1 className="podcast-hero__title">{destacado.titulo}</h1>
          <p className="podcast-hero__desc">{destacado.descripcion}</p>
          <div className="podcast-hero__actions">
            <button className="btn-play" onClick={() => setPlaying(playing === destacado._id ? null : destacado._id)}>
              {playing === destacado._id ? <PauseIcon /> : <PlayIcon />}
              {playing === destacado._id ? hero.ctaTextoPausar : hero.ctaTextoEscuchar}
            </button>
            <span className="podcast-hero__meta">{destacado.duracion} · {formatFecha(destacado.fecha)}</span>
          </div>
        </motion.div>
      </section>

      {/* PLATFORMS */}
      <section className="podcast-platforms">
        <p>{textoEscuchaPlataformas}</p>
        <div className="podcast-platforms__list">
          {plataformas.map((p) => (
            <a key={p.nombre} href={p.url} className="platform-chip" target="_blank" rel="noreferrer">
              <span>{p.icono}</span> {p.nombre}
            </a>
          ))}
        </div>
      </section>

      {/* EPISODE LIST */}
      <section className="podcast-episodes">
        <h2>{tituloLista}</h2>
        <div className="episodes-list">
          {episodios.map((ep, i) => (
            <motion.div
              className={`episode-row ${playing === ep._id ? 'playing' : ''}`}
              key={ep._id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}>
              <div className="episode-row__thumb">
                <img src={ep.imagenUrl} alt={ep.titulo} />
                <button
                  className="episode-row__play"
                  onClick={() => setPlaying(playing === ep._id ? null : ep._id)}>
                  {playing === ep._id ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              <div className="episode-row__number">
                <span className="episode-row__ep">EP. {String(ep.numero).padStart(2, '0')}</span>
              </div>
              <div className="episode-row__info">
                <p className="episode-row__title">{ep.titulo}</p>
                <p className="episode-row__desc">{ep.descripcion}</p>
              </div>
              <div className="episode-row__meta">
                <span className="episode-row__duration">{ep.duracion}</span>
                <span className="episode-row__date">{formatFecha(ep.fecha)}</span>
              </div>
              {playing === ep._id && (
                <div className="episode-row__wave">
                  {[...Array(5)].map((_, j) => <div key={j} className="bar" />)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="podcast-cta">
        <motion.div className="podcast-cta__card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}>
          <h2>{cta.titulo}</h2>
          <p>{cta.descripcion}</p>
          <form className="podcast-cta__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={cta.placeholderEmail} required />
            <button type="submit" className="btn-play">{cta.textoBoton}</button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
