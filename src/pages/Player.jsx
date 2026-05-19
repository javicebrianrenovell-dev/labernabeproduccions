import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchVideos } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'

const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
const FullscreenIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
const VolumeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
const ShareIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>

// Fallback que se muestra si Sanity todavía no tiene videos cargados (primer despliegue, error de red…).
// Cuando el seed inicial esté en Sanity, este array se puede eliminar.
const FALLBACK_RELATED = [
  { _id: 'f1', titulo: 'El Nuevo Parque de Benimaclet', duracion: '4:12', categoria: 'Barrio', posterUrl: '/images/pilar.png' },
  { _id: 'f2', titulo: 'Mercado Central: 100 Años', duracion: '5:30', categoria: 'Documentales', posterUrl: '/images/hero.png' },
  { _id: 'f3', titulo: 'Cabanyal Renace', duracion: '3:58', categoria: 'Barrio', posterUrl: '/images/barrio.png' },
  { _id: 'f4', titulo: 'Nuevo carril bici Benimaclet', duracion: '2:45', categoria: 'Movilidad', posterUrl: '/images/bike.png' },
  { _id: 'f5', titulo: 'Presupuestos Participativos', duracion: '6:15', categoria: 'Documentales', posterUrl: '/images/community.png' },
  { _id: 'f6', titulo: 'Plan Verde de la Huerta', duracion: '8:20', categoria: 'Medio Ambiente', posterUrl: '/images/hero.png' },
]

const TAGS = ['Russafa', 'Urbanismo', 'Movilidad', 'Barrios']

function getPosterUrl(video) {
  if (video.posterUrl) return video.posterUrl
  if (video.poster) {
    try {
      return urlFor(video.poster).width(640).height(360).fit('crop').auto('format').url()
    } catch {
      return '/images/hero.png'
    }
  }
  return '/images/hero.png'
}

export default function Player() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const [volume, setVolume] = useState(75)
  const [related, setRelated] = useState(FALLBACK_RELATED)

  useEffect(() => {
    let cancelled = false
    fetchVideos({ limit: 12 })
      .then((videos) => {
        if (cancelled) return
        if (Array.isArray(videos) && videos.length > 0) {
          setRelated(videos)
        }
      })
      .catch((err) => {
        console.error('[player] Error cargando videos desde Sanity:', err)
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="player-page">
      {/* VIDEO PLAYER */}
      <div className="player">
        <div className="player__screen">
          <img src="/images/barrio.png" alt="Russafa se Transforma" className="player__poster" />
          <div className="player__overlay" onClick={() => setPlaying(!playing)}>
            <motion.button className="player__big-play"
              whileTap={{ scale: 0.9 }}
              animate={{ scale: playing ? 0 : 1, opacity: playing ? 0 : 1 }}
              transition={{ duration: 0.2 }}>
              <PlayIcon />
            </motion.button>
          </div>
          <div className="player__title-overlay">
            <span className="player__category-chip">Estrenos de Barrio</span>
            <h1 className="player__video-title">Russafa se Transforma</h1>
            <span className="player__video-duration">3:45</span>
          </div>
          <div className="player__controls">
            <button className="player__ctrl-btn" onClick={() => setPlaying(!playing)}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="player__progress-bar">
              <div className="player__progress-track">
                <div className="player__progress-fill" style={{ width: `${progress}%` }} />
                <input type="range" min="0" max="100" value={progress}
                  onChange={e => setProgress(Number(e.target.value))}
                  className="player__progress-input" />
              </div>
              <span className="player__time">1:19 / 3:45</span>
            </div>
            <div className="player__volume">
              <VolumeIcon />
              <input type="range" min="0" max="100" value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="player__volume-input" />
            </div>
            <button className="player__ctrl-btn"><FullscreenIcon /></button>
          </div>
        </div>
      </div>

      {/* CONTENT BELOW */}
      <div className="player-content">
        <div className="player-content__main">
          {/* Share buttons */}
          <motion.div className="share-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <button className="share-btn"><ShareIcon /> Compartir en WhatsApp</button>
            <button className="share-btn"><ShareIcon /> Compartir en Twitter</button>
            <button className="share-btn"><ShareIcon /> Copiar enlace</button>
          </motion.div>

          {/* Video info */}
          <motion.div className="video-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <h2 className="video-info__title">Russafa se Transforma</h2>
            <p className="video-info__date">15 de Marzo, 2026</p>
            <p className="video-info__desc">
              Descubre cómo el barrio de Russafa está siendo reimaginado por sus vecinos y vecinas.
              Nuevas zonas peatonales, jardines verticales y un mercado renovado — todo impulsado por
              los presupuestos participativos de 2025. Un ejemplo real de que la política se construye
              en las calles, no solo en los despachos.
            </p>
            <div className="video-info__tags">
              {TAGS.map(tag => <span key={tag} className="tag-chip">{tag}</span>)}
            </div>
          </motion.div>

          {/* Related content */}
          <section className="related-section">
            <h2>Contenido Relacionado</h2>
            <div className="related-grid">
              {related.map((item, i) => (
                <motion.div className="card" key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}>
                  <div className="card__thumb">
                    <img src={getPosterUrl(item)} alt={item.poster?.alt || item.titulo} />
                    <div className="card__play-overlay"><PlayIcon /></div>
                    <span className="card__duration">{item.duracion}</span>
                  </div>
                  <div className="card__info">
                    <p className="card__title">{item.titulo}</p>
                    <p className="card__meta">{item.categoria}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* STICKY AUDIO BAR */}
      <div className="audio-bar">
        <div className="audio-bar__wave">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="audio-bar__bar"
              style={{ animationDelay: `${i * 0.05}s`, height: `${15 + Math.random() * 20}px` }} />
          ))}
        </div>
        <div className="audio-bar__info">
          <img src="/images/podcast.png" alt="Podcast" className="audio-bar__thumb" />
          <div>
            <p className="audio-bar__title">Ep.12: Movilidad Sostenible</p>
            <p className="audio-bar__subtitle">El Podcast de La Bernabé</p>
          </div>
        </div>
        <div className="audio-bar__controls">
          <button className="audio-bar__btn">⏮</button>
          <button className="audio-bar__btn audio-bar__btn--play" onClick={() => setPlaying(!playing)}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className="audio-bar__btn">⏭</button>
        </div>
        <div className="audio-bar__progress">
          <div className="audio-bar__progress-fill" style={{ width: '42%' }} />
        </div>
        <span className="audio-bar__time">19:15 / 45:00</span>
      </div>
    </div>
  )
}
