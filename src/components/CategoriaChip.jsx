import { Link, useNavigate } from 'react-router-dom'

// The coloured chip the team was looking for. Colour comes from the category
// document in Sanity; without one it renders in neutral grey. Clicking goes to
// the category page, where videos and podcast episodes sit together.
//
// `enlace={false}` renders a span that navigates on click: needed inside cards,
// which are already an <a> (HTML forbids nesting anchors).
export default function CategoriaChip({ categoria, size = 'md', onClick, activo, enlace = true }) {
  const navigate = useNavigate()
  if (!categoria?.nombre) return null
  const style = categoria.color ? { '--chip-color': categoria.color } : undefined
  const className = `cat-chip cat-chip--${size}${activo ? ' cat-chip--activo' : ''}${categoria.color ? '' : ' cat-chip--neutro'}`
  const ruta = categoria.slug ? `/categoria/${categoria.slug}` : null

  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={() => onClick(categoria)} aria-pressed={!!activo}>
        {categoria.nombre}
      </button>
    )
  }
  if (!ruta) return <span className={className} style={style}>{categoria.nombre}</span>
  if (!enlace) {
    const ir = (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(ruta)
    }
    return (
      <span role="link" tabIndex={0} className={className} style={style} onClick={ir}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') ir(e) }}>
        {categoria.nombre}
      </span>
    )
  }
  return (
    <Link to={ruta} className={className} style={style} onClick={(e) => e.stopPropagation()}>
      {categoria.nombre}
    </Link>
  )
}

export function ChipsDe({ categorias = [], size = 'sm', max = 3, enlace = false }) {
  if (!categorias.length) return null
  const visibles = categorias.slice(0, max)
  const resto = categorias.length - visibles.length
  return (
    <div className="chips-row">
      {visibles.map((c) => <CategoriaChip key={c._id} categoria={c} size={size} enlace={enlace} />)}
      {resto > 0 && <span className={`cat-chip cat-chip--${size} cat-chip--neutro`}>+{resto}</span>}
    </div>
  )
}
