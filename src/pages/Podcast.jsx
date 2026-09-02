import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { fetchPaginaPodcast, fetchEpisodios, fetchEpisodioDestacado } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'
import { embedDe } from '../lib/contenido'
import { ChipsDe } from '../components/CategoriaChip'

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

// "Escuchar" does three different things depending on the link the team pasted:
// YouTube → plays inside the page; Spotify/iVoox/Apple → opens that platform;
// nothing → the button is disabled with a hint.
function accionDe(ep) {
  if (!ep?.urlAudio) return { tipo: 'ninguna' }
  const embed = embedDe(ep.urlAudio)
  if (embed) return { tipo: 'embed', embed }
  return { tipo: 'externo', url: ep.urlAudio }
}

export default function Podcast() {
  const [page, setPage] = useState(FALLBACK_PAGE)
  const [episodios, setEpisodios] = useState(FALLBACK_EPISODIOS)
  const [destacado, setDestacado] = useState(FALLBACK_EPISODIOS[0])
  const [params] = useSearchParams()
  const epPedido = params.get('ep')
  const filas = useRef({})

  // /podcast?ep=slug (from the search page, a category page or the home) opens
  // that episode. `playing` undefined means "follow the URL"; a click makes it
  // explicit. A new ?ep= resets it (state adjusted during render, as React docs advise).
  const [playing, setPlayingRaw] = useState(undefined)
  const [ultimoEp, setUltimoEp] = useState(epPedido)
  if (ultimoEp !== epPedido) {
    setUltimoEp(epPedido)
    setPlayingRaw(undefined)
  }
  const pedido = epPedido ? episodios.find((e) => e.slug === epPedido || e._id === epPedido) : null
  const playingEfectivo = playing === undefined ? (pedido?._id ?? null) : playing
  const setPlaying = (fn) => setPlayingRaw((actual) => (typeof fn === 'function' ? fn(actual === undefined ? playingEfectivo : actual) : fn))

  useEffect(() => {
    if (!pedido) return
    const nodo = filas.current[pedido._id]
    if (nodo) {
      const t = setTimeout(() => nodo.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
      return () => clearTimeout(t)
    }
    return undefined
  }, [pedido])

  const alternar = (ep) => {
    const accion = accionDe(ep)
    if (accion.tipo === 'externo') {
      window.open(accion.url, '_blank', 'noopener')
      return
    }
    if (accion.tipo === 'ninguna') return
    setPlaying((actual) => (actual === ep._id ? null : ep._id))
  }

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
          <ChipsDe categorias={destacado.etiquetas || []} size="md" max={4} enlace />
          <div className="podcast-hero__actions">
            <button className="btn-play" onClick={() => alternar(destacado)}
              disabled={accionDe(destacado).tipo === 'ninguna'}
              title={accionDe(destacado).tipo === 'ninguna' ? 'Este episodio aún no tiene enlace' : undefined}>
              {playingEfectivo === destacado._id ? <PauseIcon /> : <PlayIcon />}
              {playingEfectivo === destacado._id ? hero.ctaTextoPausar : hero.ctaTextoEscuchar}
            </button>
            <span className="podcast-hero__meta">{destacado.duracion} · {formatFecha(destacado.fecha)}</span>
          </div>
        </motion.div>
      </section>
      {playingEfectivo === destacado._id && accionDe(destacado).tipo === 'embed' && (
        <section className="podcast-embed">
          <div className={`podcast-embed__frame${accionDe(destacado).embed.vertical ? ' podcast-embed__frame--vertical' : ''}`}>
            <iframe src={`${accionDe(destacado).embed.src}&autoplay=1`} title={destacado.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </section>
      )}

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
          {episodios.map((ep, i) => {
            const accion = accionDe(ep)
            const abierto = playingEfectivo === ep._id && accion.tipo === 'embed'
            return (
            <div key={ep._id} ref={(n) => { filas.current[ep._id] = n }} id={`ep-${ep.slug || ep._id}`}>
            <motion.div
              className={`episode-row ${playingEfectivo === ep._id ? 'playing' : ''}${accion.tipo === 'ninguna' ? ' episode-row--sin-enlace' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 8) * 0.05 }}
              onClick={() => alternar(ep)}>
              <div className="episode-row__thumb">
                <img src={ep.imagenUrl} alt={ep.titulo} loading="lazy" />
                <button
                  className="episode-row__play"
                  aria-label={abierto ? 'Cerrar' : 'Escuchar'}
                  disabled={accion.tipo === 'ninguna'}
                  onClick={(e) => { e.stopPropagation(); alternar(ep) }}>
                  {abierto ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              <div className="episode-row__number">
                <span className="episode-row__ep">EP. {String(ep.numero).padStart(2, '0')}</span>
              </div>
              <div className="episode-row__info">
                <p className="episode-row__title">{ep.titulo}</p>
                <p className="episode-row__desc">{ep.descripcion}</p>
                <ChipsDe categorias={ep.etiquetas || []} max={3} enlace />
              </div>
              <div className="episode-row__meta">
                <span className="episode-row__duration">{ep.duracion}</span>
                <span className="episode-row__date">{formatFecha(ep.fecha)}</span>
                {accion.tipo === 'externo' && <span className="episode-row__externo">Se abre fuera ↗</span>}
                {accion.tipo === 'ninguna' && <span className="episode-row__externo">Próximamente</span>}
              </div>
              {abierto && (
                <div className="episode-row__wave">
                  {[...Array(5)].map((_, j) => <div key={j} className="bar" />)}
                </div>
              )}
            </motion.div>
            {abierto && (
              <div className={`podcast-embed__frame podcast-embed__frame--fila${accion.embed.vertical ? ' podcast-embed__frame--vertical' : ''}`}>
                <iframe src={`${accion.embed.src}&autoplay=1`} title={ep.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            )}
            </div>
            )
          })}
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
