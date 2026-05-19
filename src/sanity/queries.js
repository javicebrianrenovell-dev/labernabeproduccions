import {sanityClient} from './client'

const VIDEO_FIELDS = `
  _id,
  titulo,
  "slug": slug.current,
  duracion,
  destacado,
  fechaPublicacion,
  seccionHome,
  badgeHome,
  "categoria": categoria->nombre,
  "categoriaSlug": categoria->slug.current,
  "categoriaColor": categoria->color,
  poster,
  descripcion,
  urlVideo
`

const EPISODE_FIELDS = `
  _id,
  numero,
  titulo,
  "slug": slug.current,
  descripcion,
  fecha,
  duracion,
  destacadoHero,
  imagen,
  urlAudio
`

// ─── Vídeos ────────────────────────────────────────────────────────────────

export async function fetchVideos({limit = 20} = {}) {
  const query = `*[_type == "video"] | order(destacado desc, fechaPublicacion desc)[0...$limit]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {limit})
}

export async function fetchVideoBySlug(slug) {
  const query = `*[_type == "video" && slug.current == $slug][0]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {slug})
}

export async function fetchVideosBySeccion(seccion, {limit = 10} = {}) {
  const query = `*[_type == "video" && seccionHome == $seccion] | order(fechaPublicacion desc)[0...$limit]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {seccion, limit})
}

// ─── Categorías ────────────────────────────────────────────────────────────

export async function fetchCategorias() {
  const query = `*[_type == "categoria"] | order(nombre asc){_id, nombre, "slug": slug.current, color}`
  return sanityClient.fetch(query)
}

// ─── Episodios de podcast ──────────────────────────────────────────────────

export async function fetchEpisodios({limit = 20} = {}) {
  const query = `*[_type == "podcastEpisode"] | order(numero desc)[0...$limit]{${EPISODE_FIELDS}}`
  return sanityClient.fetch(query, {limit})
}

export async function fetchEpisodioDestacado() {
  // Prefiere el marcado como hero; si no hay, el más reciente.
  const query = `*[_type == "podcastEpisode" && destacadoHero == true] | order(numero desc)[0]{${EPISODE_FIELDS}}`
  const destacado = await sanityClient.fetch(query)
  if (destacado) return destacado
  const fallback = await sanityClient.fetch(
    `*[_type == "podcastEpisode"] | order(numero desc)[0]{${EPISODE_FIELDS}}`,
  )
  return fallback
}

// ─── Testimonios ───────────────────────────────────────────────────────────

export async function fetchTestimonios() {
  const query = `*[_type == "testimonio" && activo == true] | order(orden asc){
    _id, nombre, barrio, cita
  }`
  return sanityClient.fetch(query)
}

// ─── Singletons ────────────────────────────────────────────────────────────

export async function fetchSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`)
}

export async function fetchPaginaHome() {
  return sanityClient.fetch(`*[_type == "paginaHome"][0]`)
}

export async function fetchPaginaClub() {
  return sanityClient.fetch(`*[_type == "paginaClub"][0]{
    ...,
    beneficios[]
  }`)
}

export async function fetchPaginaPitch() {
  return sanityClient.fetch(`*[_type == "paginaPitch"][0]`)
}

export async function fetchPaginaPodcast() {
  return sanityClient.fetch(`*[_type == "paginaPodcast"][0]`)
}
