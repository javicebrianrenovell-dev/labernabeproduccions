export default {
  name: 'podcastEpisode',
  title: 'Episodio de podcast',
  type: 'document',
  fields: [
    {
      name: 'numero',
      title: 'Número de episodio',
      type: 'number',
      description: 'Ej: 12',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'titulo', maxLength: 80},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    },
    {
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      description: 'Texto libre: "45 min" o "1h 12 min".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imagen',
      title: 'Imagen del episodio',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Texto alternativo', type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'etiquetas',
      title: 'Categorías',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categoria'}]}],
      description:
        'Las mismas categorías que usan los vídeos (barrios, temas…). El episodio aparecerá en ' +
        'la página de cada una y en el buscador junto a los vídeos. Ej: "Benicalap" y "Vivienda".',
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'urlAudio',
      title: 'Enlace del episodio (YouTube, Spotify, iVoox…)',
      type: 'url',
      description:
        'Si es un enlace de YouTube, el episodio se reproduce dentro de la web al pulsar ' +
        '"Escuchar". Si es de Spotify, Apple Podcasts o iVoox, se abre en esa plataforma. ' +
        'Si lo dejas vacío, el botón no hace nada.',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    },
    {
      name: 'destacadoHero',
      title: 'Mostrar en el hero (último episodio)',
      type: 'boolean',
      description: 'Solo uno debe estar marcado. Si hay varios, se usa el más reciente.',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'numeroDesc',
      by: [{field: 'numero', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      numero: 'numero',
      titulo: 'titulo',
      duracion: 'duracion',
      etiquetas: 'etiquetas',
      urlAudio: 'urlAudio',
      media: 'imagen',
    },
    prepare({numero, titulo, duracion, etiquetas, urlAudio, media}) {
      const n = Array.isArray(etiquetas) ? etiquetas.length : 0
      return {
        title: `EP. ${numero} — ${titulo}`,
        subtitle: [duracion, n ? `${n} categoría${n > 1 ? 's' : ''}` : 'sin categorías', urlAudio ? null : 'SIN ENLACE']
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
}
