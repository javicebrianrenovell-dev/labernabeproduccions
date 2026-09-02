import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// A SPA keeps the scroll position between routes; on a phone that means opening
// a video from the bottom of the home lands you at the bottom of the player.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
