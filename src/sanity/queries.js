import {sanityClient} from './client'

const VIDEO_FIELDS = `
  _id,
  titulo,
  "slug": slug.current,
  duracion,
  destacado,
  fechaPublicacion,
  "categoria": categoria->nombre,
  "categoriaSlug": categoria->slug.current,
  "categoriaColor": categoria->color,
  poster,
  descripcion,
  urlVideo
`

export async function fetchVideos({limit = 20} = {}) {
  const query = `*[_type == "video"] | order(destacado desc, fechaPublicacion desc)[0...$limit]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {limit})
}

export async function fetchVideoBySlug(slug) {
  const query = `*[_type == "video" && slug.current == $slug][0]{${VIDEO_FIELDS}}`
  return sanityClient.fetch(query, {slug})
}

export async function fetchCategorias() {
  const query = `*[_type == "categoria"] | order(nombre asc){_id, nombre, "slug": slug.current, color}`
  return sanityClient.fetch(query)
}
