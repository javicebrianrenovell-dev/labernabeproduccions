import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['Todas', 'Urbanismo', 'Cultura', 'Movilidad', 'Medio Ambiente', 'Educación']

const IDEAS = [
  { id: 1, author: 'María García', barrio: 'Russafa', date: 'Hace 2 días', title: 'Jardín vertical en la fachada del Mercado', desc: 'Propongo instalar un jardín vertical en la fachada sur del Mercado de Russafa. Reduciría la temperatura interior y daría un aspecto espectacular al barrio.', category: 'Medio Ambiente', claps: 342, inProduction: true },
  { id: 2, author: 'Carlos López', barrio: 'Benimaclet', date: 'Hace 3 días', title: 'Zona 30 en las calles escolares', desc: 'Limitar la velocidad a 30 km/h en un radio de 200m alrededor de los colegios del barrio. Seguridad infantil es lo primero.', category: 'Movilidad', claps: 289 },
  { id: 3, author: 'Ana Martínez', barrio: 'Cabanyal', date: 'Hace 4 días', title: 'Paseo marítimo accesible y sin barreras', desc: 'Rediseñar el paseo marítimo para que sea 100% accesible: rampas, texturas guía y bancos con sombra cada 50 metros.', category: 'Urbanismo', claps: 456, inProduction: true },
  { id: 4, author: 'Jordi Ferrer', barrio: 'Patraix', date: 'Hace 5 días', title: 'Festival de cortometrajes de barrio', desc: 'Un festival anual donde cada barrio presenta un cortometraje documental sobre su historia y su gente.', category: 'Cultura', claps: 198 },
  { id: 5, author: 'Lucía Navarro', barrio: 'Campanar', date: 'Hace 1 semana', title: 'Huertos urbanos en solares abandonados', desc: 'Convertir los solares vacíos en huertos comunitarios gestionados por vecinos. Ya hay experiencias exitosas en otras ciudades.', category: 'Medio Ambiente', claps: 267 },
  { id: 6, author: 'Pablo Ruiz', barrio: 'Ciutat Vella', date: 'Hace 1 semana', title: 'WiFi público en todas las plazas', desc: 'Instalar WiFi gratuito en las plazas principales del centro para reducir la brecha digital y atraer teletrabajadores.', category: 'Educación', claps: 145 },
]

const LEADERBOARD = [
  { pos: 1, title: 'Paseo marítimo accesible', claps: 456 },
  { pos: 2, title: 'Jardín vertical Mercado', claps: 342 },
  { pos: 3, title: 'Zona 30 escuelas', claps: 289 },
  { pos: 4, title: 'Huertos urbanos', claps: 267 },
  { pos: 5, title: 'Festival cortometrajes', claps: 198 },
]

export default function Pitch() {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [clapped, setClapped] = useState({})
  const [showForm, setShowForm] = useState(false)

  const filteredIdeas = activeCategory === 'Todas'
    ? IDEAS
    : IDEAS.filter(i => i.category === activeCategory)

  const handleClap = (id) => {
    setClapped(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const medalColor = (pos) => {
    if (pos === 1) return '#FFD700'
    if (pos === 2) return '#C0C0C0'
    if (pos === 3) return '#CD7F32'
    return 'var(--on-surface-muted)'
  }

  return (
    <div className="pitch-page">
      {/* HERO */}
      <section className="pitch-hero">
        <div className="pitch-hero__pattern" />
        <motion.div className="pitch-hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className="pitch-hero__title">
            Tu Idea Puede<br />Cambiar <span>València</span>
          </h1>
          <p className="pitch-hero__subtitle">
            Sube tu propuesta. La comunidad vota. Las mejores ideas se llevan a producción.
          </p>
          <button className="btn-play" onClick={() => setShowForm(true)}>Sube Tu Idea</button>
        </motion.div>
      </section>

      {/* SUBMISSION FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="pitch-form-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="pitch-form"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}>
              <button className="pitch-form__close" onClick={() => setShowForm(false)}>✕</button>
              <h2>Tu Pitch</h2>
              <form onSubmit={e => { e.preventDefault(); setShowForm(false) }}>
                <div className="club-form__field">
                  <label>Título de tu idea</label>
                  <input type="text" placeholder="Resume tu idea en una frase" required />
                </div>
                <div className="club-form__field">
                  <label>Descripción</label>
                  <textarea placeholder="Describe tu propuesta con detalle…" rows={4} required />
                </div>
                <div className="club-form__field">
                  <label>Categoría</label>
                  <select required>
                    <option value="">Selecciona una categoría</option>
                    {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button type="submit" className="btn-play club-form__submit">Enviar Mi Pitch</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATEGORY FILTER */}
      <div className="pitch-filters">
        {CATEGORIES.map(cat => (
          <button key={cat}
            className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="pitch-layout">
        {/* IDEAS FEED */}
        <div className="pitch-feed">
          {filteredIdeas.map((idea, i) => (
            <motion.div className="idea-card" key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              {idea.inProduction && (
                <div className="idea-card__production-badge">🎬 En Producción</div>
              )}
              <div className="idea-card__header">
                <div className="idea-card__avatar">{idea.author[0]}</div>
                <div>
                  <p className="idea-card__author">{idea.author}</p>
                  <p className="idea-card__meta">{idea.barrio} · {idea.date}</p>
                </div>
              </div>
              <h3 className="idea-card__title">{idea.title}</h3>
              <p className="idea-card__desc">{idea.desc}</p>
              <div className="idea-card__footer">
                <span className="idea-card__category">{idea.category}</span>
                <button
                  className={`idea-card__clap ${clapped[idea.id] ? 'clapped' : ''}`}
                  onClick={() => handleClap(idea.id)}>
                  👏 <span>{idea.claps + (clapped[idea.id] ? 1 : 0)} aplausos</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LEADERBOARD */}
        <aside className="pitch-leaderboard">
          <h3>🏆 Ideas Más Aplaudidas</h3>
          <div className="leaderboard-list">
            {LEADERBOARD.map(item => (
              <div className="leaderboard-item" key={item.pos}>
                <span className="leaderboard-item__pos" style={{ color: medalColor(item.pos) }}>
                  #{item.pos}
                </span>
                <span className="leaderboard-item__title">{item.title}</span>
                <span className="leaderboard-item__claps">👏 {item.claps}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
