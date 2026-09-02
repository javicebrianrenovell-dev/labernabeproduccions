import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { fetchVideoBySlug, fetchVideosRelacionados } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'
import { categoriasDe, compartirUrls, embedDe, fechaLarga, miniaturaYoutube } from '../lib/contenido'
import CategoriaChip from '../components/CategoriaChip'
import { ContenidoGrid } from '../components/ContenidoCard'

const ShareIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M8 5v14l11-7z"/></svg>

function posterGrande(video) {
  if (video?.poster) {
    try {
      return urlFor(video.poster).width(1280).height(720).fit('crop').auto('format').url()
    } catch { /* fall through */ }
  }
  return miniaturaYoutube(video?.urlVideo) || '/images/hero.png'
}

export default function Video() {
  const { slug } = useParams()
  // `cargado.slug !== slug` means we are still loading the current one; `video`
  // null means the slug does not exist.
  const [cargado, setCargado] = useState({ slug: null, video: undefined, relacionados: [] })
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchVideoBySlug(slug)
      .then(async (v) => {
        if (cancelled) return
        let relacionados = []
        if (v) {
          try {
            relacionados = (await fetchVideosRelacionados(v, { limit: 6 })) || []
          } catch (err) {
            console.error('[video] relacionados error:', err)
          }
        }
        if (!cancelled) setCargado({ slug, video: v || null, relacionados })
      })
      .catch((err) => {
        console.error('[video] error cargando el vídeo:', err)
        if (!cancelled) setCargado({ slug, video: null, relacionados: [] })
      })
    return () => { cancelled = true }
  }, [slug])

  const video = cargado.slug === slug ? cargado.video : undefined
  const relacionados = cargado.slug === slug ? cargado.relacionados : []

  useEffect(() => {
    const base = 'LA BERNABÉ PRODUCCIONS'
    document.title = video?.titulo ? `${video.titulo} — ${base}` : base
    return () => { document.title = `${base} — València en Marcha` }
  }, [video])

  if (video === undefined) {
    return <div className="video-page"><div className="video-page__estado">Cargando…</div></div>
  }
  if (video === null) {
    return (
      <div className="video-page">
        <div className="video-page__estado">
          <h1>Este vídeo no existe</h1>
          <p>Puede que se haya cambiado la dirección o que aún no esté publicado.</p>
          <Link to="/reproductor" className="btn-play">Ver todos los vídeos</Link>
        </div>
      </div>
    )
  }

  const embed = embedDe(video.urlVideo)
  const categorias = categoriasDe(video)
  const urlActual = typeof window !== 'undefined' ? window.location.href : ''
  const compartir = compartirUrls(urlActual, video.titulo)

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(urlActual)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('[video] no se pudo copiar:', err)
    }
  }

  return (
    <div className="video-page">
      <div className={`video-embed${embed?.vertical ? ' video-embed--vertical' : ''}`}>
        {embed ? (
          <iframe
            src={embed.src}
            title={video.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="video-embed__pendiente">
            <img src={posterGrande(video)} alt={video.poster?.alt || video.titulo} />
            <div className="video-embed__pendiente-msg">
              <PlayIcon />
              <p>Muy pronto disponible</p>
            </div>
          </div>
        )}
      </div>

      <div className="player-content">
        <div className="player-content__main">
          <motion.div className="video-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
            {categorias.length > 0 && (
              <div className="chips-row chips-row--lg">
                {categorias.map((c) => <CategoriaChip key={c._id} categoria={c} size="md" />)}
              </div>
            )}
            <h1 className="video-info__title">{video.titulo}</h1>
            <p className="video-info__date">
              {fechaLarga(video.fechaPublicacion)}
              {video.duracion && <> · {video.duracion}</>}
            </p>
            {video.descripcion && <p className="video-info__desc">{video.descripcion}</p>}
          </motion.div>

          <motion.div className="share-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <a className="share-btn" href={compartir.whatsapp} target="_blank" rel="noreferrer"><ShareIcon /> WhatsApp</a>
            <a className="share-btn" href={compartir.telegram} target="_blank" rel="noreferrer"><ShareIcon /> Telegram</a>
            <a className="share-btn" href={compartir.x} target="_blank" rel="noreferrer"><ShareIcon /> X</a>
            <button type="button" className="share-btn" onClick={copiarEnlace}>
              <ShareIcon /> {copiado ? '¡Enlace copiado!' : 'Copiar enlace'}
            </button>
            {embed?.tipo === 'youtube' && (
              <a className="share-btn" href={video.urlVideo} target="_blank" rel="noreferrer">Ver en YouTube</a>
            )}
          </motion.div>

          <section className="related-section">
            <div className="section-header">
              <h2>{video.categoriaRef?.nombre ? `Más de ${video.categoriaRef.nombre}` : 'Más vídeos'}</h2>
              {video.categoriaRef?.slug && <Link to={`/categoria/${video.categoriaRef.slug}`}>Ver todo →</Link>}
            </div>
            <ContenidoGrid items={relacionados} vacio="Todavía no hay más vídeos en esta categoría." />
          </section>
        </div>
      </div>
    </div>
  )
}
