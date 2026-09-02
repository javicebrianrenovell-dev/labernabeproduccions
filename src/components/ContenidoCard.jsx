import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categoriasDe, fechaCorta, imagenCuadrada, rutaDe, fechaDe } from '../lib/contenido'
import { ChipsDe } from './CategoriaChip'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
)
const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>
)

// One card for the grids where videos and podcast episodes are mixed: search,
// category page, related content. Square thumbnail, title, chips, date.
export default function ContenidoCard({ item, index = 0 }) {
  const esPodcast = item._type === 'podcastEpisode'
  const categorias = categoriasDe(item)
  const fecha = fechaCorta(fechaDe(item))
  const alt = item.poster?.alt || item.imagen?.alt || item.titulo

  return (
    <motion.article
      className={`card card--grid${esPodcast ? ' card--podcast' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 8) * 0.05, duration: 0.35 }}>
      <Link to={rutaDe(item)}>
        <div className="card__thumb">
          <img src={imagenCuadrada(item)} alt={alt} loading="lazy" />
          <div className="card__play-overlay">{esPodcast ? <MicIcon /> : <PlayIcon />}</div>
          <span className="card__kind">{esPodcast ? `Podcast · Ep. ${item.numero}` : 'Vídeo'}</span>
          {item.duracion && <span className="card__duration">{item.duracion}</span>}
        </div>
        <div className="card__info">
          <p className="card__title card__title--wrap">{item.titulo}</p>
          <ChipsDe categorias={categorias} />
          {fecha && <p className="card__meta">{fecha}</p>}
        </div>
      </Link>
    </motion.article>
  )
}

export function ContenidoGrid({ items, vacio = 'No hay contenido todavía.' }) {
  if (!items?.length) return <p className="grid-vacio">{vacio}</p>
  return (
    <div className="contenido-grid">
      {items.map((item, i) => <ContenidoCard key={item._id} item={item} index={i} />)}
    </div>
  )
}
