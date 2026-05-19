export default {
  name: 'paginaPodcast',
  title: 'Página: Podcast',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero (último episodio)',
      type: 'object',
      fields: [
        {name: 'label', title: 'Etiqueta superior', type: 'string', initialValue: 'EL PODCAST DE LA BERNABÉ'},
        {name: 'badgePrefix', title: 'Prefijo de la insignia', type: 'string', initialValue: 'ÚLTIMO EPISODIO · EP.'},
        {
          name: 'ctaTextoEscuchar',
          title: 'Texto botón "Escuchar"',
          type: 'string',
          initialValue: 'Escuchar Ahora',
        },
        {
          name: 'ctaTextoPausar',
          title: 'Texto botón "Pausar"',
          type: 'string',
          initialValue: 'Pausar',
        },
      ],
    },
    {
      name: 'plataformas',
      title: 'Plataformas donde escuchar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'nombre', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'icono', title: 'Emoji/icono', type: 'string', description: 'Ej: 🎵 🎧 ▶️ 📻'},
            {name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'nombre', subtitle: 'url'}},
        },
      ],
      initialValue: [
        {nombre: 'Spotify', icono: '🎵', url: 'https://open.spotify.com/'},
        {nombre: 'Apple Podcasts', icono: '🎧', url: 'https://podcasts.apple.com/'},
        {nombre: 'YouTube', icono: '▶️', url: 'https://youtube.com/'},
        {nombre: 'iVoox', icono: '📻', url: 'https://ivoox.com/'},
      ],
    },
    {
      name: 'tituloLista',
      title: 'Título de la sección "Todos los episodios"',
      type: 'string',
      initialValue: 'Todos los Episodios',
    },
    {
      name: 'textoEscuchaPlataformas',
      title: 'Texto "Escúchalo en tu plataforma favorita"',
      type: 'string',
      initialValue: 'Escúchalo en tu plataforma favorita:',
    },
    {
      name: 'cta',
      title: 'CTA Newsletter',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'No te pierdas ningún episodio'},
        {
          name: 'descripcion',
          title: 'Descripción',
          type: 'text',
          rows: 2,
          initialValue: 'Suscríbete al Guion Semanal y recibe cada nuevo episodio directamente en tu bandeja.',
        },
        {name: 'placeholderEmail', title: 'Placeholder del email', type: 'string', initialValue: 'tu@email.com'},
        {name: 'textoBoton', title: 'Texto del botón', type: 'string', initialValue: 'Suscribirme'},
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'Página: Podcast'}
    },
  },
}
