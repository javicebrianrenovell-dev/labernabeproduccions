import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ComingSoon, { useComingSoonGate } from './components/ComingSoon'
import Home from './pages/Home'
import Player from './pages/Player'
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
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/reproductor" element={<Layout noFooter><Player /></Layout>} />
        <Route path="/podcast" element={<Layout><Podcast /></Layout>} />
        <Route path="/club" element={<Layout><Club /></Layout>} />
        <Route path="/pitch" element={<Layout><Pitch /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
