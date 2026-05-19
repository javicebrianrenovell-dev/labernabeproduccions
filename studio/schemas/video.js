export default {
  name: 'video',
  title: 'Vídeo',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Ej: "El Nuevo Parque de Benimaclet"',
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
      name: 'poster',
      title: 'Imagen poster (miniatura)',
      type: 'image',
      description: 'Imagen 16:9 recomendada (mín. 1280×720 px, máx. 4 MB).',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para accesibilidad y SEO.',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      description: 'Formato libre tipo "4:12" o "1:23:45".',
      validation: (Rule) => Rule.required().max(10),
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'categoria'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Texto que se muestra debajo del vídeo en la página de detalle.',
    },
    {
      name: 'urlVideo',
      title: 'URL del vídeo (YouTube / Vimeo)',
      type: 'url',
      description:
        'Opcional. Cuando se conecte el reproductor real (fase 3), aquí se pega el enlace público del vídeo. De momento puede quedar vacío.',
    },
    {
      name: 'destacado',
      title: 'Destacado',
      type: 'boolean',
      description: 'Si está activado, aparece en lugares prominentes (hero, lista de inicio).',
      initialValue: false,
    },
    {
      name: 'seccionHome',
      title: 'Sección en la página de inicio',
      type: 'string',
      description:
        'Determina en qué carrusel de la home aparece. "Estrenos de Barrio", "Documentales" o "Edu-Política".',
      options: {
        list: [
          {title: 'Estrenos de Barrio', value: 'estrenos'},
          {title: 'Documentales', value: 'documentales'},
          {title: 'Edu-Política', value: 'edupolitica'},
          {title: 'No mostrar en Home', value: 'none'},
        ],
        layout: 'radio',
      },
      initialValue: 'estrenos',
    },
    {
      name: 'badgeHome',
      title: 'Etiqueta especial en Home',
      type: 'string',
      description:
        'Opcional. Ej: "NUEVO". Solo se muestra si el vídeo aparece en la sección Estrenos.',
    },
    {
      name: 'fechaPublicacion',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'fechaDesc',
      by: [{field: 'fechaPublicacion', direction: 'desc'}],
    },
    {
      title: 'Destacados primero',
      name: 'destacados',
      by: [
        {field: 'destacado', direction: 'desc'},
        {field: 'fechaPublicacion', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      categoria: 'categoria.nombre',
      duracion: 'duracion',
      media: 'poster',
    },
    prepare({title, categoria, duracion, media}) {
      return {
        title,
        subtitle: [categoria, duracion].filter(Boolean).join(' · '),
        media,
      }
    },
  },
}
