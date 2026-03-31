import { useState } from 'react'
import { motion } from 'framer-motion'

const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>

const EPISODES = [
  { id: 1, ep: 12, title: 'Movilidad Sostenible', desc: 'Hablamos con el concejal de movilidad sobre el nuevo plan ciclista de la ciudad. Más de 40 km de carril bici antes de 2027.', date: '28 Mar 2026', duration: '45 min', img: '/images/podcast.png', featured: true },
  { id: 2, ep: 11, title: 'Vivienda Joven en València', desc: 'La crisis de la vivienda no es inevitable. Analizamos las medidas que ya están funcionando y las que necesitan más ambición.', date: '21 Mar 2026', duration: '38 min', img: '/images/podcast2.png' },
  { id: 3, ep: 10, title: 'Cultura de Barrio', desc: 'De las fallas a los festivales de cine independiente: cómo la cultura vertebra la identidad de cada barrio.', date: '14 Mar 2026', duration: '42 min', img: '/images/podcast3.png' },
  { id: 4, ep: 9, title: 'Transición Energética', desc: 'Paneles solares en edificios municipales, comunidades energéticas y el camino hacia una València neutra en carbono.', date: '7 Mar 2026', duration: '50 min', img: '/images/podcast.png' },
  { id: 5, ep: 8, title: 'Educación Pública', desc: 'Inversión récord en escuelas infantiles y el programa de becas comedor que ya llega a 12.000 familias.', date: '28 Feb 2026', duration: '35 min', img: '/images/podcast2.png' },
  { id: 6, ep: 7, title: 'Turismo Sostenible', desc: '¿Se puede crecer sin destruir? Un modelo turístico que respeta a vecinos y visitantes por igual.', date: '21 Feb 2026', duration: '41 min', img: '/images/podcast3.png' },
  { id: 7, ep: 6, title: 'Espacios Verdes', desc: 'El Jardín del Turia se amplía: nuevas zonas verdes, parques de barrio y la revolución del arbolado urbano.', date: '14 Feb 2026', duration: '37 min', img: '/images/podcast.png' },
  { id: 8, ep: 5, title: 'Presupuestos Participativos', desc: 'Tú decides dónde va el dinero público. Así funcionan los presupuestos participativos de 2026.', date: '7 Feb 2026', duration: '44 min', img: '/images/community.png' },
]

const PLATFORMS = [
  { name: 'Spotify', icon: '🎵' },
  { name: 'Apple Podcasts', icon: '🎧' },
  { name: 'YouTube', icon: '▶️' },
  { name: 'iVoox', icon: '📻' },
]

export default function Podcast() {
  const [playing, setPlaying] = useState(null)
  const featured = EPISODES[0]

  return (
    <div className="podcast-page">
      {/* HERO — Featured Episode */}
      <section className="podcast-hero">
        <div className="podcast-hero__bg">
          <img src={featured.img} alt={featured.title} />
        </div>
        <motion.div className="podcast-hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <span className="podcast-hero__label">EL PODCAST DE LA PILI</span>
          <div className="podcast-hero__badge">ÚLTIMO EPISODIO · EP. {featured.ep}</div>
          <h1 className="podcast-hero__title">{featured.title}</h1>
          <p className="podcast-hero__desc">{featured.desc}</p>
          <div className="podcast-hero__actions">
            <button className="btn-play" onClick={() => setPlaying(playing === featured.id ? null : featured.id)}>
              {playing === featured.id ? <PauseIcon /> : <PlayIcon />}
              {playing === featured.id ? 'Pausar' : 'Escuchar Ahora'}
            </button>
            <span className="podcast-hero__meta">{featured.duration} · {featured.date}</span>
          </div>
        </motion.div>
      </section>

      {/* PLATFORMS */}
      <section className="podcast-platforms">
        <p>Escúchalo en tu plataforma favorita:</p>
        <div className="podcast-platforms__list">
          {PLATFORMS.map(p => (
            <a key={p.name} href="#" className="platform-chip">
              <span>{p.icon}</span> {p.name}
            </a>
          ))}
        </div>
      </section>

      {/* EPISODE LIST */}
      <section className="podcast-episodes">
        <h2>Todos los Episodios</h2>
        <div className="episodes-list">
          {EPISODES.map((ep, i) => (
            <motion.div
              className={`episode-row ${playing === ep.id ? 'playing' : ''}`}
              key={ep.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}>
              <div className="episode-row__thumb">
                <img src={ep.img} alt={ep.title} />
                <button
                  className="episode-row__play"
                  onClick={() => setPlaying(playing === ep.id ? null : ep.id)}>
                  {playing === ep.id ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              <div className="episode-row__number">
                <span className="episode-row__ep">EP. {String(ep.ep).padStart(2, '0')}</span>
              </div>
              <div className="episode-row__info">
                <p className="episode-row__title">{ep.title}</p>
                <p className="episode-row__desc">{ep.desc}</p>
              </div>
              <div className="episode-row__meta">
                <span className="episode-row__duration">{ep.duration}</span>
                <span className="episode-row__date">{ep.date}</span>
              </div>
              {playing === ep.id && (
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
          <h2>No te pierdas ningún episodio</h2>
          <p>Suscríbete al Guion Semanal y recibe cada nuevo episodio directamente en tu bandeja.</p>
          <form className="podcast-cta__form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="tu@email.com" required />
            <button type="submit" className="btn-play">Suscribirme</button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
