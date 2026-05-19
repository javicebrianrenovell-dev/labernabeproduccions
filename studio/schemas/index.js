import video from './video'
import categoria from './categoria'
import podcastEpisode from './podcastEpisode'
import testimonio from './testimonio'
import siteSettings from './siteSettings'
import paginaHome from './paginaHome'
import paginaClub from './paginaClub'
import paginaPitch from './paginaPitch'
import paginaPodcast from './paginaPodcast'

export const schemaTypes = [
  // Colecciones
  video,
  categoria,
  podcastEpisode,
  testimonio,

  // Singletons (un único documento)
  siteSettings,
  paginaHome,
  paginaClub,
  paginaPitch,
  paginaPodcast,
]

// IDs y types de los singletons. Usado por deskStructure para impedir duplicados.
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'paginaHome',
  'paginaClub',
  'paginaPitch',
  'paginaPodcast',
])

export const SINGLETONS = [
  {id: 'siteSettings', type: 'siteSettings', title: 'Configuración general'},
  {id: 'paginaHome', type: 'paginaHome', title: 'Página: Inicio'},
  {id: 'paginaClub', type: 'paginaClub', title: 'Página: Club'},
  {id: 'paginaPitch', type: 'paginaPitch', title: 'Página: Pitch'},
  {id: 'paginaPodcast', type: 'paginaPodcast', title: 'Página: Podcast'},
]
