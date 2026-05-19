import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPaginaClub, fetchTestimonios } from '../sanity/queries'
import { urlFor } from '../sanity/imageUrl'

const FALLBACK_PAGE = {
  hero: {
    label: 'EL CLUB',
    tituloLinea1: 'Únete al Equipo de',
    tituloLinea2Pre: 'Producción de ',
    tituloLinea2Enfasis: 'València',
    subtitulo: 'No eres espectador. Eres productor de tu ciudad.',
    ctaTexto: 'Hazte Productor/a',
    imagenUrl: '/images/community.png',
    imagenAlt: 'Comunidad',
  },
  beneficios: [
    { icono: '🎬', titulo: 'Behind the Scenes', descripcion: 'Accede al making-of exclusivo de cada producción. Contenido que nadie más ve.' },
    { icono: '📜', titulo: 'El Guion Semanal', descripcion: 'Recibe cada lunes el guion de la semana: lo que se ha hecho, lo que viene, lo que importa.' },
    { icono: '🏆', titulo: 'Sorteos Exclusivos', descripcion: 'Participa en sorteos y proyecciones premium reservadas para productores del club.' },
  ],
  form: {
    titulo: 'Únete al Club',
    subtitulo: 'Es gratis. Es real. Es tu ciudad.',
    textoBoton: 'Unirme al Club',
    pruebaSocial: 'Ya somos 2.847 productores',
    barrios: ['Russafa', 'Benimaclet', 'Cabanyal', 'Patraix', 'Campanar', 'Ciutat Vella', 'Poblats Marítims', 'Otro'],
    intereses: ['Urbanismo', 'Cultura', 'Movilidad', 'Educación', 'Medio Ambiente', 'Vivienda'],
    tituloExito: '¡Bienvenido/a al equipo!',
    textoExito: 'Revisa tu email para confirmar tu inscripción. El próximo Guion Semanal sale el lunes.',
  },
  tituloTestimonios: 'Lo que dicen los Productores',
}

const FALLBACK_TESTIMONIOS = [
  { _id: 't1', nombre: 'María García', barrio: 'Russafa', cita: 'Nunca pensé que la política pudiera contarse así. Me enganché al podcast desde el primer episodio.' },
  { _id: 't2', nombre: 'Carlos López', barrio: 'Benimaclet', cita: 'El Guion Semanal me mantiene al día de lo que pasa en mi barrio. Mejor que cualquier periódico.' },
  { _id: 't3', nombre: 'Ana Martínez', barrio: 'Cabanyal', cita: 'Me hice productora porque quería que mi idea del paseo marítimo se escuchara. Y se escuchó.' },
  { _id: 't4', nombre: 'Jordi Ferrer', barrio: 'Patraix', cita: 'La comunidad aquí es real. No es un follow, es una conversación. Merece la pena.' },
]

export default function Club() {
  const [page, setPage] = useState(FALLBACK_PAGE)
  const [testimonios, setTestimonios] = useState(FALLBACK_TESTIMONIOS)
  const [formData, setFormData] = useState({ nombre: '', email: '', barrio: '', intereses: [] })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPaginaClub()
      .then((data) => {
        if (cancelled || !data) return
        let imagenUrl = FALLBACK_PAGE.hero.imagenUrl
        if (data.hero?.imagen) {
          try {
            imagenUrl = urlFor(data.hero.imagen).width(1920).height(1080).fit('crop').auto('format').url()
          } catch (e) { /* ignore */ }
        }
        setPage({
          hero: {
            ...FALLBACK_PAGE.hero,
            ...(data.hero || {}),
            imagenUrl,
            imagenAlt: data.hero?.imagen?.alt || FALLBACK_PAGE.hero.imagenAlt,
          },
          beneficios: data.beneficios?.length ? data.beneficios : FALLBACK_PAGE.beneficios,
          form: { ...FALLBACK_PAGE.form, ...(data.form || {}) },
          tituloTestimonios: data.tituloTestimonios || FALLBACK_PAGE.tituloTestimonios,
        })
      })
      .catch((err) => console.error('[club] page error:', err))

    fetchTestimonios()
      .then((list) => {
        if (cancelled || !list?.length) return
        setTestimonios(list)
      })
      .catch((err) => console.error('[club] testimonios error:', err))

    return () => { cancelled = true }
  }, [])

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      intereses: prev.intereses.includes(interest)
        ? prev.intereses.filter((i) => i !== interest)
        : [...prev.intereses, interest],
    }))
  }

  const { hero, beneficios, form, tituloTestimonios } = page

  return (
    <div className="club-page">
      {/* HERO */}
      <section className="club-hero">
        <div className="club-hero__bg">
          <img src={hero.imagenUrl} alt={hero.imagenAlt} />
        </div>
        <motion.div className="club-hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <span className="club-hero__label">{hero.label}</span>
          <h1 className="club-hero__title">
            {hero.tituloLinea1}<br />{hero.tituloLinea2Pre}<span>{hero.tituloLinea2Enfasis}</span>
          </h1>
          <p className="club-hero__subtitle">{hero.subtitulo}</p>
          <a href="#join" className="btn-play">{hero.ctaTexto}</a>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="club-benefits">
        <div className="club-benefits__grid">
          {beneficios.map((b, i) => (
            <motion.div className="benefit-card" key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}>
              <span className="benefit-card__icon">{b.icono || b.icon}</span>
              <h3 className="benefit-card__title">{b.titulo || b.title}</h3>
              <p className="benefit-card__desc">{b.descripcion || b.desc}</p>
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
              <h2 className="club-form__title">{form.titulo}</h2>
              <p className="club-form__subtitle">{form.subtitulo}</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                <div className="club-form__field">
                  <label>Nombre</label>
                  <input type="text" placeholder="Tu nombre" required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                </div>
                <div className="club-form__field">
                  <label>Email</label>
                  <input type="email" placeholder="tu@email.com" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="club-form__field">
                  <label>Barrio</label>
                  <select required value={formData.barrio}
                    onChange={(e) => setFormData({ ...formData, barrio: e.target.value })}>
                    <option value="">Selecciona tu barrio</option>
                    {form.barrios.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="club-form__field">
                  <label>Intereses</label>
                  <div className="club-form__interests">
                    {form.intereses.map((int) => (
                      <button type="button" key={int}
                        className={`interest-chip ${formData.intereses.includes(int) ? 'active' : ''}`}
                        onClick={() => toggleInterest(int)}>
                        {int}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-play club-form__submit">{form.textoBoton}</button>
              </form>
              <p className="club-form__proof" dangerouslySetInnerHTML={{
                __html: (form.pruebaSocial || '').replace(/(\d[\d.,]*)/, '<strong>$1</strong>'),
              }} />
            </>
          ) : (
            <motion.div className="club-form__success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}>
              <span className="club-form__check">✓</span>
              <h2>{form.tituloExito}</h2>
              <p>{form.textoExito}</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="club-testimonials">
        <h2>{tituloTestimonios}</h2>
        <div className="testimonials-grid">
          {testimonios.map((t, i) => (
            <motion.div className="testimonial-card" key={t._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <p className="testimonial-card__quote">"{t.cita || t.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{(t.nombre || t.name)[0]}</div>
                <div>
                  <p className="testimonial-card__name">{t.nombre || t.name}</p>
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
