import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSiteSettings } from '../sanity/queries'

const FALLBACK = {
  marca: {
    nombre: 'LA BERNABÉ PRODUCCIONS',
    acentoLetra: 'É',
    colorAcento: '#E30613',
    claim:
      'La política como producción cultural y ciudadana. Una plataforma audiovisual de proximidad para València.',
  },
  redes: [
    { plataforma: 'twitter', url: '#', visible: true },
    { plataforma: 'instagram', url: '#', visible: true },
    { plataforma: 'youtube', url: '#', visible: true },
    { plataforma: 'tiktok', url: '#', visible: true },
  ],
  footer: {
    columnas: [
      {
        titulo: 'Contenido',
        enlaces: [
          { texto: 'Estrenos de Barrio', url: '/reproductor' },
          { texto: 'Podcast', url: '/podcast' },
          { texto: 'Documentales', url: '#' },
          { texto: 'Edu-Política', url: '#' },
        ],
      },
      {
        titulo: 'Comunidad',
        enlaces: [
          { texto: 'El Club de Productores', url: '/club' },
          { texto: 'El Pitch de València', url: '/pitch' },
          { texto: 'Guion Semanal', url: '#' },
        ],
      },
      {
        titulo: 'Legal',
        enlaces: [
          { texto: 'Aviso Legal', url: '#' },
          { texto: 'Política de Privacidad', url: '#' },
          { texto: 'Cookies', url: '#' },
          { texto: 'Contacto', url: '#' },
        ],
      },
    ],
    copyright: '© 2026 LA BERNABÉ PRODUCCIONS. Todos los derechos reservados.',
    lineaInferior: { texto: 'Pilar Bernabé — Candidata por València', url: '#' },
  },
}

const RED_ICON = {
  twitter: '𝕏',
  instagram: '📷',
  youtube: '▶',
  tiktok: '♪',
  linkedin: 'in',
  facebook: 'f',
}

function isExternal(url) {
  return /^https?:\/\//i.test(url)
}

function FooterLink({ texto, url }) {
  if (!url) return null
  if (isExternal(url)) return <a href={url} target="_blank" rel="noreferrer">{texto}</a>
  return <Link to={url}>{texto}</Link>
}

export default function Footer() {
  const [data, setData] = useState(FALLBACK)

  useEffect(() => {
    let cancelled = false
    fetchSiteSettings()
      .then((s) => {
        if (cancelled || !s) return
        setData({
          marca: { ...FALLBACK.marca, ...(s.marca || {}) },
          redes: s.redes?.length ? s.redes : FALLBACK.redes,
          footer: {
            columnas: s.footer?.columnas?.length ? s.footer.columnas : FALLBACK.footer.columnas,
            copyright: s.footer?.copyright || FALLBACK.footer.copyright,
            lineaInferior: s.footer?.lineaInferior || FALLBACK.footer.lineaInferior,
          },
        })
      })
      .catch((err) => console.error('[footer] sanity error:', err))
    return () => { cancelled = true }
  }, [])

  const { marca, redes, footer } = data
  const idxAcento = marca.nombre.indexOf(marca.acentoLetra)

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link to="/" className="navbar__logo">
            <img src="/images/logo.svg" alt={marca.nombre} style={{ height: 32, width: 32 }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              {idxAcento === -1 ? (
                marca.nombre
              ) : (
                <>
                  {marca.nombre.slice(0, idxAcento)}
                  <span style={{ color: marca.colorAcento }}>{marca.acentoLetra}</span>
                  {marca.nombre.slice(idxAcento + 1)}
                </>
              )}
            </span>
          </Link>
          <p>{marca.claim}</p>
          <div className="footer__socials">
            {redes
              .filter((r) => r.visible !== false)
              .map((r) => (
                <a key={r.plataforma} href={r.url} aria-label={r.plataforma}>
                  {RED_ICON[r.plataforma] || '•'}
                </a>
              ))}
          </div>
        </div>
        {footer.columnas.map((col) => (
          <div key={col.titulo} className="footer__col">
            <h4>{col.titulo}</h4>
            {col.enlaces?.map((e) => (
              <FooterLink key={e.url + e.texto} texto={e.texto} url={e.url} />
            ))}
          </div>
        ))}
      </div>
      <div className="footer__bottom">
        <p>{footer.copyright}</p>
        {footer.lineaInferior?.texto && (
          <a href={footer.lineaInferior.url || '#'}>{footer.lineaInferior.texto}</a>
        )}
      </div>
    </footer>
  )
}
