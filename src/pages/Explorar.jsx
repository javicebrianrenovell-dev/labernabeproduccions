import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchCatalogo, fetchCategorias } from '../sanity/queries'
import { agruparCategorias, coincide, mezclarPorFecha, tieneCategoria } from '../lib/contenido'
import CategoriaChip from '../components/CategoriaChip'
import { ContenidoGrid } from '../components/ContenidoCard'

const SECCIONES = [
  { value: '', titulo: 'Todos' },
  { value: 'estrenos', titulo: 'Estrenos de Barrio' },
  { value: 'documentales', titulo: 'Documentales' },
  { value: 'edupolitica', titulo: 'Edu-Política' },
]

const TIPOS = [
  { value: '', titulo: 'Todo' },
  { value: 'video', titulo: 'Vídeos' },
  { value: 'podcastEpisode', titulo: 'Podcast' },
]

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
)

// One page, two entry points:
//  - modo="videos"  → /reproductor: every video, with section tabs (the menu item "Estrenos").
//  - modo="buscar"  → /buscar: the magnifying glass; videos and podcast episodes together.
// Filters live in the URL (?q=&cat=&seccion=&tipo=) so a search can be shared or
// bookmarked and the back button behaves.
export default function Explorar({ modo = 'buscar' }) {
  const [params, setParams] = useSearchParams()
  const [catalogo, setCatalogo] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  const q = params.get('q') || ''
  const cat = params.get('cat') || ''
  const seccion = params.get('seccion') || ''
  const tipo = modo === 'videos' ? 'video' : params.get('tipo') || ''

  const setParam = (clave, valor) => {
    const next = new URLSearchParams(params)
    if (valor) next.set(clave, valor)
    else next.delete(clave)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    let cancelled = false
    fetchCatalogo()
      .then((data) => { if (!cancelled) setCatalogo(data || { videos: [], episodios: [] }) })
      .catch((err) => { console.error('[explorar] catálogo error:', err); if (!cancelled) setError(true) })
    fetchCategorias()
      .then((lista) => { if (!cancelled) setCategorias(lista || []) })
      .catch((err) => console.error('[explorar] categorías error:', err))
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (modo === 'buscar' && inputRef.current && window.innerWidth > 768) inputRef.current.focus()
  }, [modo])

  const catActiva = useMemo(() => categorias.find((c) => c.slug === cat) || null, [categorias, cat])

  const resultados = useMemo(() => {
    if (!catalogo) return []
    let videos = catalogo.videos || []
    let episodios = tipo === 'video' ? [] : catalogo.episodios || []
    if (tipo === 'podcastEpisode') videos = []
    if (seccion) videos = videos.filter((v) => v.seccionHome === seccion)
    let lista = mezclarPorFecha(videos, episodios)
    if (catActiva) lista = lista.filter((item) => tieneCategoria(item, catActiva._id))
    if (q) lista = lista.filter((item) => coincide(item, q))
    return lista
  }, [catalogo, tipo, seccion, catActiva, q])

  const grupos = useMemo(() => agruparCategorias(categorias.filter((c) => c.total > 0 || c.slug === cat)), [categorias, cat])
  const hayFiltros = !!(q || cat || seccion || (modo === 'buscar' && tipo))

  const titulo = modo === 'videos'
    ? (SECCIONES.find((s) => s.value === seccion)?.titulo === 'Todos' ? 'Todos los vídeos' : SECCIONES.find((s) => s.value === seccion)?.titulo || 'Todos los vídeos')
    : 'Buscar'

  return (
    <div className="explorar-page">
      <header className="explorar__head">
        <h1>{titulo}</h1>
        <p className="explorar__sub">
          {modo === 'videos'
            ? 'Visitas de barrio, documentales y píldoras: todo lo que publica La Bernabé.'
            : 'Escribe un barrio, un tema o una palabra del título. Busca a la vez en vídeos y episodios del podcast.'}
        </p>
        <form className="buscador" role="search" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setParam('q', e.target.value)}
            placeholder={modo === 'videos' ? 'Buscar entre los vídeos…' : 'Ej: Benicalap, vivienda, limpieza…'}
            aria-label="Buscar"
            autoComplete="off"
          />
          {q && <button type="button" className="buscador__limpiar" onClick={() => setParam('q', '')} aria-label="Borrar búsqueda">×</button>}
        </form>
      </header>

      {modo === 'videos' && (
        <div className="filtro-tabs" role="tablist" aria-label="Sección">
          {SECCIONES.map((s) => (
            <button key={s.value} type="button" role="tab" aria-selected={seccion === s.value}
              className={`filter-chip${seccion === s.value ? ' active' : ''}`}
              onClick={() => setParam('seccion', s.value)}>
              {s.titulo}
            </button>
          ))}
        </div>
      )}
      {modo === 'buscar' && (
        <div className="filtro-tabs" role="tablist" aria-label="Tipo de contenido">
          {TIPOS.map((t) => (
            <button key={t.value} type="button" role="tab" aria-selected={tipo === t.value}
              className={`filter-chip${tipo === t.value ? ' active' : ''}`}
              onClick={() => setParam('tipo', t.value)}>
              {t.titulo}
            </button>
          ))}
        </div>
      )}

      {grupos.length > 0 && (
        <section className="explorar__categorias" aria-label="Categorías">
          {grupos.map((g) => (
            <div key={g.value} className="chips-grupo">
              <span className="chips-grupo__titulo">{g.titulo}</span>
              <div className="chips-row chips-row--wrap">
                {g.items.map((c) => (
                  <CategoriaChip key={c._id} categoria={c} size="md" activo={c.slug === cat}
                    onClick={() => setParam('cat', c.slug === cat ? '' : c.slug)} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="explorar__resultados">
        <div className="section-header">
          <h2>
            {catalogo ? `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'}` : 'Cargando…'}
            {catActiva && <> en <span style={catActiva.color ? { color: catActiva.color } : undefined}>{catActiva.nombre}</span></>}
          </h2>
          {hayFiltros && (
            <Link to={modo === 'videos' ? '/reproductor' : '/buscar'} onClick={(e) => { e.preventDefault(); setParams({}, { replace: true }) }}>
              Quitar filtros ×
            </Link>
          )}
        </div>
        {error ? (
          <p className="grid-vacio">No se ha podido cargar el contenido. Prueba a recargar la página.</p>
        ) : catalogo ? (
          <ContenidoGrid
            items={resultados}
            vacio={q ? `Nada con «${q}». Prueba con otra palabra o quita los filtros.` : 'No hay contenido con estos filtros todavía.'}
          />
        ) : null}
        {catActiva?.slug && resultados.length > 0 && (
          <p className="explorar__pie">
            <Link to={`/categoria/${catActiva.slug}`}>Ir a la página de {catActiva.nombre} →</Link>
          </p>
        )}
      </section>
    </div>
  )
}
