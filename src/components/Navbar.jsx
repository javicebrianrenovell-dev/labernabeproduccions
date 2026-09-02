import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fetchSiteSettings } from '../sanity/queries'

const FALLBACK = {
  marca: { nombre: 'LA BERNABÉ PRODUCCIONS', acentoLetra: 'É', colorAcento: '#E30613' },
  nav: {
    items: [
      { texto: 'Inicio', ruta: '/' },
      { texto: 'Estrenos', ruta: '/reproductor' },
      { texto: 'Podcast', ruta: '/podcast' },
      { texto: 'El Pitch', ruta: '/pitch' },
      { texto: 'Club de Productores', ruta: '/club' },
    ],
    cta: { texto: 'Suscríbete', ruta: '/club' },
  },
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
)

function renderNombre(nombre, acento) {
  if (!nombre || !acento) return nombre
  const idx = nombre.indexOf(acento)
  if (idx === -1) return nombre
  return (
    <>
      {nombre.slice(0, idx)}
      <span className="accent">{acento}</span>
      {nombre.slice(idx + 1)}
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [settings, setSettings] = useState(FALLBACK)
  const [abierto, setAbierto] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keep the page from scrolling underneath the open drawer.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [abierto])

  useEffect(() => {
    let cancelled = false
    fetchSiteSettings()
      .then((data) => {
        if (cancelled || !data) return
        setSettings({
          marca: { ...FALLBACK.marca, ...(data.marca || {}) },
          nav: {
            items: data.nav?.items?.length ? data.nav.items : FALLBACK.nav.items,
            cta: { ...FALLBACK.nav.cta, ...(data.nav?.cta || {}) },
          },
        })
      })
      .catch((err) => console.error('[navbar] sanity error:', err))
    return () => { cancelled = true }
  }, [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }
  const buscando = location.pathname === '/buscar'

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="navbar__logo">
          <img src="/images/logo.svg" alt="La Bernabé" />
          <span>{renderNombre(settings.marca.nombre, settings.marca.acentoLetra)}</span>
        </Link>
        <ul className="navbar__links">
          {settings.nav.items.map((item) => (
            <li key={item.ruta}>
              <Link to={item.ruta} className={isActive(item.ruta) ? 'active' : ''}>
                {item.texto}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <button
            type="button"
            className={`navbar__icon-btn${buscando ? ' active' : ''}`}
            aria-label="Buscar vídeos y episodios"
            title="Buscar"
            onClick={() => navigate('/buscar')}>
            <SearchIcon />
          </button>
          <Link to={settings.nav.cta.ruta || '/club'} className="navbar__cta-link">
            <button className="navbar__cta">{settings.nav.cta.texto || 'Suscríbete'}</button>
          </Link>
          <button
            type="button"
            className={`navbar__toggle${abierto ? ' open' : ''}`}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {abierto && (
        <div className="navbar__drawer" role="dialog" aria-label="Menú">
          <ul>
            {settings.nav.items.map((item) => (
              <li key={item.ruta}>
                <Link to={item.ruta} className={isActive(item.ruta) ? 'active' : ''} onClick={() => setAbierto(false)}>{item.texto}</Link>
              </li>
            ))}
            <li>
              <Link to="/buscar" className={buscando ? 'active' : ''} onClick={() => setAbierto(false)}><SearchIcon /> Buscar</Link>
            </li>
          </ul>
          <Link to={settings.nav.cta.ruta || '/club'} onClick={() => setAbierto(false)}>
            <button className="navbar__cta">{settings.nav.cta.texto || 'Suscríbete'}</button>
          </Link>
        </div>
      )}
    </>
  )
}
