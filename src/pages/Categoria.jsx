import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCategoriaBySlug, fetchContenidoPorCategoria } from '../sanity/queries'
import { mezclarPorFecha, TIPOS_CATEGORIA } from '../lib/contenido'
import { ContenidoGrid } from '../components/ContenidoCard'

const TIPOS = [
  { value: '', titulo: 'Todo' },
  { value: 'video', titulo: 'Vídeos' },
  { value: 'podcastEpisode', titulo: 'Podcast' },
]

// pilarbernabe.es/categoria/benicalap — the "#benicalap" the team asked for:
// every video and podcast episode tagged with the category, newest first.
export default function Categoria() {
  const { slug } = useParams()
  const VACIO = { videos: [], episodios: [] }
  const [cargado, setCargado] = useState({ slug: null, categoria: undefined, contenido: VACIO })
  const [filtro, setFiltro] = useState({ slug: null, tipo: '' })

  useEffect(() => {
    let cancelled = false
    fetchCategoriaBySlug(slug)
      .then(async (c) => {
        if (cancelled) return
        let contenido = VACIO
        if (c) contenido = (await fetchContenidoPorCategoria(c._id)) || VACIO
        if (!cancelled) setCargado({ slug, categoria: c || null, contenido })
      })
      .catch((err) => {
        console.error('[categoria] error:', err)
        if (!cancelled) setCargado({ slug, categoria: null, contenido: VACIO })
      })
    return () => { cancelled = true }
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const categoria = cargado.slug === slug ? cargado.categoria : undefined
  const contenido = cargado.slug === slug ? cargado.contenido : VACIO
  const tipo = filtro.slug === slug ? filtro.tipo : ''
  const setTipo = (t) => setFiltro({ slug, tipo: t })

  useEffect(() => {
    const base = 'LA BERNABÉ PRODUCCIONS'
    document.title = categoria?.nombre ? `${categoria.nombre} — ${base}` : base
    return () => { document.title = `${base} — València en Marcha` }
  }, [categoria])

  const items = useMemo(() => {
    const v = tipo === 'podcastEpisode' ? [] : contenido.videos || []
    const e = tipo === 'video' ? [] : contenido.episodios || []
    return mezclarPorFecha(v, e)
  }, [contenido, tipo])

  if (categoria === undefined) {
    return <div className="categoria-page"><div className="video-page__estado">Cargando…</div></div>
  }
  if (categoria === null) {
    return (
      <div className="categoria-page">
        <div className="video-page__estado">
          <h1>Esta categoría no existe</h1>
          <p>Puede que se haya renombrado. Prueba desde el buscador.</p>
          <Link to="/buscar" className="btn-play">Ir al buscador</Link>
        </div>
      </div>
    )
  }

  const nVideos = contenido.videos?.length || 0
  const nEpisodios = contenido.episodios?.length || 0
  const tipoLabel = (TIPOS_CATEGORIA.find((t) => t.value === (categoria.tipo || 'tema')) || {}).titulo || 'Temas'
  const estilo = categoria.color ? { '--cat-color': categoria.color } : undefined

  return (
    <div className="categoria-page">
      <header className="cat-hero" style={estilo}>
        <div className="cat-hero__band" />
        <div className="cat-hero__content">
          <Link to="/buscar" className="cat-hero__volver">← Todas las categorías</Link>
          <span className="cat-hero__tipo">{tipoLabel.replace(/s$/, '')}</span>
          <h1 className="cat-hero__title"><span className="cat-hero__hash">#</span>{categoria.nombre}</h1>
          {categoria.descripcion && <p className="cat-hero__desc">{categoria.descripcion}</p>}
          <p className="cat-hero__meta">
            {nVideos} {nVideos === 1 ? 'vídeo' : 'vídeos'}
            {nEpisodios > 0 && <> · {nEpisodios} {nEpisodios === 1 ? 'episodio' : 'episodios'} de podcast</>}
          </p>
        </div>
      </header>

      <section className="content-section">
        {nVideos > 0 && nEpisodios > 0 && (
          <div className="filtro-tabs" role="tablist" aria-label="Tipo de contenido">
            {TIPOS.map((t) => (
              <button key={t.value} type="button" role="tab" aria-selected={tipo === t.value}
                className={`filter-chip${tipo === t.value ? ' active' : ''}`}
                onClick={() => setTipo(t.value)}>
                {t.titulo}
              </button>
            ))}
          </div>
        )}
        <ContenidoGrid items={items} vacio="Todavía no hay contenido en esta categoría." />
      </section>
    </div>
  )
}
