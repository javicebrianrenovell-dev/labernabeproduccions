// Helpers shared by the pages that list, search or play content. No React here.
import { urlFor } from '../sanity/imageUrl'

// ─── Texto ─────────────────────────────────────────────────────────────────

// Lowercase without accents, so "benicalap" finds "Benicalap" and "valencia"
// finds "València".
export function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function fechaCorta(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`
}

export function fechaLarga(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Enlaces de vídeo ──────────────────────────────────────────────────────

// Accepts every form YouTube hands out when you press "Share":
// watch?v=ID, youtu.be/ID, shorts/ID, embed/ID, live/ID, with or without extra params.
export function youtubeId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (u.searchParams.get('v')) return u.searchParams.get('v')
      const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([A-Za-z0-9_-]{6,})/)
      if (m) return m[2]
    }
  } catch {
    return null
  }
  return null
}

export function vimeoId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (!/vimeo\.com$/.test(u.hostname)) return null
    const m = u.pathname.match(/(\d{6,})/)
    return m ? m[1] : null
  } catch {
    return null
  }
}

export function esShort(url) {
  return /youtube\.com\/shorts\//i.test(url || '')
}

// Everything the player needs, or null when the URL is empty or unsupported.
export function embedDe(url) {
  const yt = youtubeId(url)
  if (yt) {
    return {
      tipo: 'youtube',
      id: yt,
      src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1&playsinline=1`,
      vertical: esShort(url),
    }
  }
  const vm = vimeoId(url)
  if (vm) {
    return { tipo: 'vimeo', id: vm, src: `https://player.vimeo.com/video/${vm}?dnt=1`, vertical: false }
  }
  return null
}

export function miniaturaYoutube(url) {
  const id = youtubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

// ─── Imágenes ──────────────────────────────────────────────────────────────

// Square crop for the grids (search, category page, related). Square is the
// compromise that survives both 9:16 Shorts posters and 16:9 documentaries when
// the hotspot is set. Falls back to the YouTube thumbnail, then to the hero.
export function imagenCuadrada(item, size = 640) {
  const img = item?.poster || item?.imagen
  if (img) {
    try {
      return urlFor(img).width(size).height(size).fit('crop').auto('format').url()
    } catch {
      /* fall through */
    }
  }
  return miniaturaYoutube(item?.urlVideo) || '/images/hero.png'
}

// ─── Categorías de un contenido ────────────────────────────────────────────

// Principal category first, then the extra tags, without duplicates. Works for
// videos (categoriaRef + etiquetas) and podcast episodes (etiquetas only).
export function categoriasDe(item) {
  const lista = []
  const vistos = new Set()
  const push = (c) => {
    if (!c || !c._id || vistos.has(c._id)) return
    vistos.add(c._id)
    lista.push(c)
  }
  push(item?.categoriaRef)
  for (const c of item?.etiquetas || []) push(c)
  return lista
}

export function tieneCategoria(item, id) {
  return categoriasDe(item).some((c) => c._id === id)
}

// ─── Búsqueda ──────────────────────────────────────────────────────────────

// True when every word of the query appears in the title, description or one
// of the categories. "benicalap movilidad" needs both words somewhere.
export function coincide(item, consulta) {
  const q = normalizar(consulta)
  if (!q) return true
  const pajar = normalizar(
    [item.titulo, item.descripcion, ...categoriasDe(item).map((c) => c.nombre)].filter(Boolean).join(' '),
  )
  return q.split(/\s+/).every((palabra) => pajar.includes(palabra))
}

// ─── Enlaces internos ──────────────────────────────────────────────────────

export function rutaDe(item) {
  if (!item) return '/'
  if (item._type === 'podcastEpisode') return `/podcast?ep=${item.slug || item._id}`
  return item.slug ? `/video/${item.slug}` : '/reproductor'
}

export function fechaDe(item) {
  return item?.fechaPublicacion || item?.fecha || ''
}

// Videos and episodes together, newest first.
export function mezclarPorFecha(videos = [], episodios = []) {
  return [...videos, ...episodios].sort((a, b) => (fechaDe(b) || '').localeCompare(fechaDe(a) || ''))
}

export const TIPOS_CATEGORIA = [
  { value: 'barrio', titulo: 'Barrios' },
  { value: 'tema', titulo: 'Temas' },
  { value: 'formato', titulo: 'Formatos' },
]

export function agruparCategorias(categorias = []) {
  const grupos = TIPOS_CATEGORIA.map((t) => ({ ...t, items: [] }))
  for (const c of categorias) {
    const g = grupos.find((x) => x.value === (c.tipo || 'tema')) || grupos[1]
    g.items.push(c)
  }
  return grupos.filter((g) => g.items.length)
}

export function compartirUrls(url, titulo) {
  const texto = encodeURIComponent(`${titulo} — ${url}`)
  return {
    whatsapp: `https://wa.me/?text=${texto}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(titulo)}`,
  }
}
