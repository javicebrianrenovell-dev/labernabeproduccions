import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link to="/" className="navbar__logo">
            <img src="/images/logo.svg" alt="La Bernabé" style={{ height: 32, width: 32 }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>LA BERNAB<span style={{ color: '#E30613' }}>É</span> PRODUCCIONS</span>
          </Link>
          <p>La política como producción cultural y ciudadana. Una plataforma audiovisual de proximidad para València.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="TikTok">♪</a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Contenido</h4>
          <Link to="/reproductor">Estrenos de Barrio</Link>
          <Link to="/podcast">Podcast</Link>
          <a href="#">Documentales</a>
          <a href="#">Edu-Política</a>
        </div>
        <div className="footer__col">
          <h4>Comunidad</h4>
          <Link to="/club">El Club de Productores</Link>
          <Link to="/pitch">El Pitch de València</Link>
          <a href="#">Guion Semanal</a>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <a href="#">Aviso Legal</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Cookies</a>
          <a href="#">Contacto</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 LA BERNABÉ PRODUCCIONS. Todos los derechos reservados.</p>
        <a href="#">Pilar Bernabé — Candidata por València</a>
      </div>
    </footer>
  )
}
