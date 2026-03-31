import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
)

const ESTRENOS = [
  { id: 1, title: 'Russafa se Transforma', duration: '3:45', badge: 'NUEVO', img: '/images/barrio.png' },
  { id: 2, title: 'El Nuevo Parque de Benimaclet', duration: '4:12', badge: 'NUEVO', img: '/images/pilar.png' },
  { id: 3, title: 'Mercado Central: 100 Años', duration: '5:30', img: '/images/hero.png' },
  { id: 4, title: 'Cabanyal Renace', duration: '3:58', badge: 'NUEVO', img: '/images/barrio.png' },
  { id: 5, title: 'La Marina: Puerto Ciudadano', duration: '6:15', img: '/images/hero.png' },
]

const PODCASTS = [
  { id: 1, ep: 'Ep. 12', title: 'Movilidad Sostenible', duration: '45 min', active: true, img: '/images/podcast.png' },
  { id: 2, ep: 'Ep. 11', title: 'Vivienda Joven en València', duration: '38 min', img: '/images/podcast2.png' },
  { id: 3, ep: 'Ep. 10', title: 'Cultura de Barrio', duration: '42 min', img: '/images/podcast3.png' },
  { id: 4, ep: 'Ep. 09', title: 'Transición Energética', duration: '50 min', img: '/images/podcast.png' },
]

const DOCUMENTALES = [
  { id: 1, title: 'València Resiliente: Después de la DANA', desc: 'Cómo la ciudad se recuperó y construyó nuevas infraestructuras de prevención.', duration: '60 min', img: '/images/hero.png' },
  { id: 2, title: 'El Plan Verde de la Huerta', desc: 'Un documental sobre la protección de la huerta valenciana y la agricultura sostenible.', duration: '45 min', img: '/images/pilar.png' },
  { id: 3, title: 'Presupuestos Participativos 2026', desc: 'Descubre cómo se decide dónde se invierte el dinero público en tu barrio.', duration: '52 min', img: '/images/community.png' },
]

const EDUPOLITICA = [
  { id: 1, title: '¿Cómo funciona el Pleno?', duration: '8 min', img: '/images/podcast.png' },
  { id: 2, title: '¿Qué es un presupuesto municipal?', duration: '6 min', img: '/images/community.png' },
  { id: 3, title: 'Tu voto, explicado', duration: '5 min', img: '/images/pilar.png' },
  { id: 4, title: '¿Quién decide las calles?', duration: '7 min', img: '/images/bike.png' },
  { id: 5, title: 'Servicios Municipales 101', duration: '9 min', img: '/images/podcast3.png' },
]

function VideoCard({ item, index }) {
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
          <p className="card__meta">Estrenos de Barrio</p>
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

export default function Home() {
  const [time, setTime] = useState({ h: 2, m: 15, s: 0 })
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        if (s > 0) s--
        else if (m > 0) { m--; s = 59 }
        else if (h > 0) { h--; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const pad = n => String(n).padStart(2, '0')
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero__bg"><img src="/images/hero.png" alt="València" /></div>
        <motion.div className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
          <div className="hero__badge"><span className="dot" /> EN DIRECTO</div>
          <h1 className="hero__title">València en Marcha</h1>
          <p className="hero__subtitle">La política como producción cultural y ciudadana</p>
          <div className="hero__actions">
            <Link to="/reproductor"><button className="btn-play"><PlayIcon /> Ver Ahora</button></Link>
            <div className="hero__countdown">
              Próximo estreno en <span>{pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="content-section" id="estrenos">
        <div className="section-header">
          <h2>Estrenos de Barrio</h2>
          <Link to="/reproductor">Ver todos →</Link>
        </div>
        <div className="carousel">
          {ESTRENOS.map((item, i) => <VideoCard key={item.id} item={item} index={i} />)}
        </div>
      </section>

      <section className="content-section" id="podcast">
        <div className="section-header">
          <h2>El Podcast de la Pili</h2>
          <a href="#">Todos los episodios →</a>
        </div>
        <div className="carousel">
          {PODCASTS.map((item, i) => <PodcastCard key={item.id} item={item} index={i} />)}
        </div>
      </section>

      <section className="content-section" id="documentales">
        <div className="section-header">
          <h2>Documentales de Gestión</h2>
          <a href="#">Ver todos →</a>
        </div>
        <div className="carousel">
          {DOCUMENTALES.map((item, i) => <WideCard key={item.id} item={item} index={i} />)}
        </div>
      </section>

      <section className="content-section" id="educacion">
        <div className="section-header">
          <h2>Edu-Política</h2>
          <a href="#">Ver todos →</a>
        </div>
        <div className="carousel">
          {EDUPOLITICA.map((item, i) => <SquareCard key={item.id} item={item} index={i} />)}
        </div>
      </section>
    </>
  )
}
