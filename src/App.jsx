import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ComingSoon, { useComingSoonGate } from './components/ComingSoon'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Video from './pages/Video'
import Explorar from './pages/Explorar'
import Categoria from './pages/Categoria'
import Club from './pages/Club'
import Pitch from './pages/Pitch'
import Podcast from './pages/Podcast'
import './App.css'

function Layout({ children, noFooter }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  )
}

export default function App() {
  const { showComingSoon } = useComingSoonGate()
  if (showComingSoon) return <ComingSoon />

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        {/* /reproductor is the route the CMS menu and the hero button already point to:
            it is now the catalogue of every video. /videos is an alias. */}
        <Route path="/reproductor" element={<Layout><Explorar modo="videos" /></Layout>} />
        <Route path="/videos" element={<Navigate to="/reproductor" replace />} />
        <Route path="/video/:slug" element={<Layout><Video /></Layout>} />
        <Route path="/buscar" element={<Layout><Explorar modo="buscar" /></Layout>} />
        <Route path="/categoria/:slug" element={<Layout><Categoria /></Layout>} />
        <Route path="/podcast" element={<Layout><Podcast /></Layout>} />
        <Route path="/club" element={<Layout><Club /></Layout>} />
        <Route path="/pitch" element={<Layout><Pitch /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
