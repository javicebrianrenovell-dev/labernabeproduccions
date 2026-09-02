import {sanityClient} from './client'

// Shape shared by every place a category is projected. Keep it in one string so
// chips, category pages and the search page all read the same fields.
const CATEGORIA_FIELDS = `_id, nombre, "slug": slug.current, color, tipo`

const VIDEO_FIELDS = `
  _id,
  _type,
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
  "categoriaRef": categoria->{${CATEGORIA_FIELDS}},
  "etiquetas": etiquetas[]->{${CATEGORIA_FIELDS}},
  poster,
  descripcion,
  urlVideo
`

const EPISODE_FIELDS = `
  _id,
  _type,
  numero,
  titulo,
  "slug": slug.current,
  descripcion,
  fecha,
  duracion,
  destacadoHero,
  "etiquetas": etiquetas[]->{${CATEGORIA_FIELDS}},
  imagen,
  urlAudio
`

// A category "contains" an item when it is its principal category or one of its
// extra tags. Same rule as deskStructure.js ("Contenido por categoría").
const EN_CATEGORIA = `(categoria._ref == $id || $id in etiquetas[]._ref)`

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

// Videos that share the principal category, newest first, excluding the one on
// screen. Falls back to the latest videos so the section is never empty.
export async function fetchVideosRelacionados(video, {limit = 6} = {}) {
  const id = video?.categoriaRef?._id
  if (id) {
    const query = `*[_type == "video" && _id != $self && ${EN_CATEGORIA}] | order(fechaPublicacion desc)[0...$limit]{${VIDEO_FIELDS}}`
    const lista = await sanityClient.fetch(query, {id, self: video._id, limit})
    if (lista?.length) return lista
  }
  const query = `*[_type == "video" && _id != $self] | order(fechaPublicacion desc)[0...$limit]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {self: video?._id || '', limit})
}

// ─── Categorías ────────────────────────────────────────────────────────────

export async function fetchCategorias() {
  const query = `*[_type == "categoria"] | order(tipo asc, nombre asc){
    ${CATEGORIA_FIELDS},
    descripcion,
    "total": count(*[_type in ["video", "podcastEpisode"] && (categoria._ref == ^._id || ^._id in etiquetas[]._ref)])
  }`
  return sanityClient.fetch(query)
}

export async function fetchCategoriaBySlug(slug) {
  const query = `*[_type == "categoria" && slug.current == $slug][0]{${CATEGORIA_FIELDS}, descripcion}`
  return sanityClient.fetch(query, {slug})
}

// Everything tagged with a category, videos and podcast episodes together.
export async function fetchContenidoPorCategoria(id) {
  const query = `{
    "videos": *[_type == "video" && ${EN_CATEGORIA}] | order(fechaPublicacion desc){${VIDEO_FIELDS}},
    "episodios": *[_type == "podcastEpisode" && ${EN_CATEGORIA}] | order(numero desc){${EPISODE_FIELDS}}
  }`
  return sanityClient.fetch(query, {id})
}

// The whole catalogue in one request. The site is small (tens of items), so the
// search page filters in the browser: instant results, accent-insensitive, no
// round trip per keystroke.
export async function fetchCatalogo() {
  const query = `{
    "videos": *[_type == "video"] | order(fechaPublicacion desc)[0...500]{${VIDEO_FIELDS}},
    "episodios": *[_type == "podcastEpisode"] | order(numero desc)[0...500]{${EPISODE_FIELDS}}
  }`
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
