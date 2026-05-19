import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
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
      <Link to={settings.nav.cta.ruta || '/club'}>
        <button className="navbar__cta">{settings.nav.cta.texto || 'Suscríbete'}</button>
      </Link>
    </nav>
  )
}
