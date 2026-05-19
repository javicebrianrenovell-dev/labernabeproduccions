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
      name: 'urlAudio',
      title: 'URL del audio o página externa',
      type: 'url',
      description:
        'Opcional. Enlace a Spotify, Apple Podcasts o iVoox del episodio para que el botón "Escuchar" funcione.',
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
      media: 'imagen',
    },
    prepare({numero, titulo, duracion, media}) {
      return {
        title: `EP. ${numero} — ${titulo}`,
        subtitle: duracion,
        media,
      }
    },
  },
}
