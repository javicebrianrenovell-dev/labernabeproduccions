import { useState } from 'react'
import { motion } from 'framer-motion'

const BENEFITS = [
  { icon: '🎬', title: 'Behind the Scenes', desc: 'Accede al making-of exclusivo de cada producción. Contenido que nadie más ve.' },
  { icon: '📜', title: 'El Guion Semanal', desc: 'Recibe cada lunes el guion de la semana: lo que se ha hecho, lo que viene, lo que importa.' },
  { icon: '🏆', title: 'Sorteos Exclusivos', desc: 'Participa en sorteos y proyecciones premium reservadas para productores del club.' },
]

const TESTIMONIALS = [
  { name: 'María García', barrio: 'Russafa', quote: 'Nunca pensé que la política pudiera contarse así. Me enganché al podcast desde el primer episodio.' },
  { name: 'Carlos López', barrio: 'Benimaclet', quote: 'El Guion Semanal me mantiene al día de lo que pasa en mi barrio. Mejor que cualquier periódico.' },
  { name: 'Ana Martínez', barrio: 'Cabanyal', quote: 'Me hice productora porque quería que mi idea del paseo marítimo se escuchara. Y se escuchó.' },
  { name: 'Jordi Ferrer', barrio: 'Patraix', quote: 'La comunidad aquí es real. No es un follow, es una conversación. Merece la pena.' },
]

const INTERESTS = ['Urbanismo', 'Cultura', 'Movilidad', 'Educación', 'Medio Ambiente', 'Vivienda']

export default function Club() {
  const [formData, setFormData] = useState({ nombre: '', email: '', barrio: '', intereses: [] })
  const [submitted, setSubmitted] = useState(false)

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interest)
        ? prev.intereses.filter(i => i !== interest)
        : [...prev.intereses, interest]
    }))
  }

  return (
    <div className="club-page">
      {/* HERO */}
      <section className="club-hero">
        <div className="club-hero__bg">
          <img src="/images/community.png" alt="Comunidad" />
        </div>
        <motion.div className="club-hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <span className="club-hero__label">EL CLUB</span>
          <h1 className="club-hero__title">
            Únete al Equipo de<br />Producción de <span>València</span>
          </h1>
          <p className="club-hero__subtitle">
            No eres espectador. Eres productor de tu ciudad.
          </p>
          <a href="#join" className="btn-play">Hazte Productor/a</a>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="club-benefits">
        <div className="club-benefits__grid">
          {BENEFITS.map((b, i) => (
            <motion.div className="benefit-card" key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}>
              <span className="benefit-card__icon">{b.icon}</span>
              <h3 className="benefit-card__title">{b.title}</h3>
              <p className="benefit-card__desc">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="club-form-section" id="join">
        <motion.div className="club-form"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}>
          {!submitted ? (
            <>
              <h2 className="club-form__title">Únete al Club</h2>
              <p className="club-form__subtitle">Es gratis. Es real. Es tu ciudad.</p>
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="club-form__field">
                  <label>Nombre</label>
                  <input type="text" placeholder="Tu nombre" required
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
                </div>
                <div className="club-form__field">
                  <label>Email</label>
                  <input type="email" placeholder="tu@email.com" required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="club-form__field">
                  <label>Barrio</label>
                  <select required value={formData.barrio}
                    onChange={e => setFormData({ ...formData, barrio: e.target.value })}>
                    <option value="">Selecciona tu barrio</option>
                    <option>Russafa</option><option>Benimaclet</option>
                    <option>Cabanyal</option><option>Patraix</option>
                    <option>Campanar</option><option>Ciutat Vella</option>
                    <option>Poblats Marítims</option><option>Otro</option>
                  </select>
                </div>
                <div className="club-form__field">
                  <label>Intereses</label>
                  <div className="club-form__interests">
                    {INTERESTS.map(int => (
                      <button type="button" key={int}
                        className={`interest-chip ${formData.intereses.includes(int) ? 'active' : ''}`}
                        onClick={() => toggleInterest(int)}>
                        {int}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-play club-form__submit">
                  Unirme al Club
                </button>
              </form>
              <p className="club-form__proof">Ya somos <strong>2.847</strong> productores</p>
            </>
          ) : (
            <motion.div className="club-form__success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}>
              <span className="club-form__check">✓</span>
              <h2>¡Bienvenido/a al equipo!</h2>
              <p>Revisa tu email para confirmar tu inscripción. El próximo Guion Semanal sale el lunes.</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="club-testimonials">
        <h2>Lo que dicen los Productores</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div className="testimonial-card" key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.name[0]}</div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__barrio">{t.barrio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
