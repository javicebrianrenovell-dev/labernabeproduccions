import { useEffect, useState } from 'react'
import './ComingSoon.css'

const BYPASS_SECRET = 'pilar2026'
const BYPASS_KEY = 'pilar_preview'

/**
 * Hook que decide si mostrar el cartel coming soon.
 *
 * - Cartel ACTIVADO  → VITE_COMING_SOON === 'true' en el bundle.
 * - Cartel DESACTIVADO → cualquier otro valor (incluido undefined).
 * - Bypass del equipo → entrar con ?preview=pilar2026 una vez setea
 *   sessionStorage y desde ahí esa pestaña ve la web normal.
 */
export function useComingSoonGate() {
  const enabled = import.meta.env.VITE_COMING_SOON === 'true'

  const [bypassed, setBypassed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(BYPASS_KEY) === 'true'
  })

  useEffect(() => {
    if (!enabled) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('preview') === BYPASS_SECRET) {
      window.sessionStorage.setItem(BYPASS_KEY, 'true')
      setBypassed(true)
      // Quitar el query param de la URL sin recargar la página.
      const cleanUrl = window.location.pathname + window.location.hash
      window.history.replaceState({}, '', cleanUrl)
    }
  }, [enabled])

  return { showComingSoon: enabled && !bypassed }
}

export default function ComingSoon() {
  return (
    <div className="coming-soon" role="status" aria-live="polite">
      <div className="coming-soon__glow" aria-hidden="true" />

      <div className="coming-soon__content">
        <div className="coming-soon__logo" aria-hidden="true">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="16" fill="#131313" />
            <g fill="#FFFFFF">
              <rect x="28" y="34" width="10" height="44" />
              <rect x="28" y="34" width="42" height="10" />
              <rect x="28" y="51" width="32" height="9" />
              <rect x="28" y="68" width="42" height="10" />
            </g>
            <polygon points="54,13 70,13 62,26 46,26" fill="#E30613" />
          </svg>
        </div>

        <div className="coming-soon__brand">
          LA BERNAB<span className="accent">É</span> PRODUCCIONS
        </div>

        <h1 className="coming-soon__title">
          PR<span className="accent">Ò</span>XIMAMENT<span className="dots">...</span>
        </h1>

        <p className="coming-soon__claim">
          La política com a producció cultural i ciutadana. Una plataforma
          audiovisual de proximitat per a València.
        </p>

        <div className="coming-soon__signature">
          Pilar Bernabé — Candidata per València
        </div>
      </div>
    </div>
  )
}
