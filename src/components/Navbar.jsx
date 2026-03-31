import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const isActive = (path) => location.pathname === path
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        <img src="/images/logo.png" alt="LAPILI" />
        <span>LAPILI <span className="accent">PRODUCCIONS</span></span>
      </Link>
      <ul className="navbar__links">
        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Inicio</Link></li>
        <li><Link to="/reproductor" className={isActive('/reproductor') ? 'active' : ''}>Estrenos</Link></li>
        <li><Link to="/podcast" className={location.pathname.startsWith('/podcast') ? 'active' : ''}>Podcast</Link></li>
        <li><Link to="/pitch" className={isActive('/pitch') ? 'active' : ''}>El Pitch</Link></li>
        <li><Link to="/club" className={isActive('/club') ? 'active' : ''}>Club de Productores</Link></li>
      </ul>
      <Link to="/club"><button className="navbar__cta">Suscríbete</button></Link>
    </nav>
  )
}
