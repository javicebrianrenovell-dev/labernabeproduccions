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
      description:
        'Súbela con la misma proporción que tenga configurada su sección en ' +
        '"Página: Inicio" → Formato de las miniaturas. Vertical 9:16: mín. 1080×1920 px. ' +
        'Cuadrado: mín. 1080×1080 px. Horizontal 16:9 o Panorámico: mín. 1280×720 px. ' +
        'Máx. 4 MB. Sea cual sea el formato, pulsa sobre la imagen y coloca el punto de ' +
        'enfoque sobre la cara o el elemento principal: es lo que la web usa para ' +
        'recortar sin cortar lo importante.',
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
      title: 'Categoría principal',
      type: 'reference',
      to: [{type: 'categoria'}],
      description:
        'La que se muestra en el chip de la miniatura. Si no existe, créala primero en "Categorías".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'etiquetas',
      title: 'Otras categorías',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categoria'}]}],
      description:
        'Añade aquí todas las demás categorías que le correspondan al vídeo (barrio + tema, ' +
        'por ejemplo: "Benicalap" y "Movilidad"). El vídeo aparecerá en la página de cada una ' +
        'de ellas y en el buscador.',
      validation: (Rule) => Rule.unique(),
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
      title: 'Enlace del vídeo en YouTube (o Vimeo)',
      type: 'url',
      description:
        'Pega el enlace tal cual lo copias de YouTube: sirve el normal (youtube.com/watch?v=…), ' +
        'el corto (youtu.be/…) y el de Shorts (youtube.com/shorts/…). La web lo reproduce en su ' +
        'propia página. Si lo dejas vacío, el vídeo se lista pero no se puede reproducir.',
      validation: (Rule) =>
        Rule.uri({scheme: ['http', 'https']}).custom((url) => {
          if (!url) return true
          const ok = /(youtube\.com|youtu\.be|youtube-nocookie\.com|vimeo\.com)\//i.test(url)
          return ok || 'Tiene que ser un enlace de YouTube o Vimeo.'
        }),
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
        'Determina en qué carrusel de la home aparece. "Estrenos de Barrio", "Documentales" o "Edu-Política". ' +
        'El formato de las miniaturas (vertical, cuadrado, horizontal…) no se elige aquí ' +
        'sino en "Página: Inicio", y se aplica a todo el carrusel de esa sección.',
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
      etiquetas: 'etiquetas',
      duracion: 'duracion',
      urlVideo: 'urlVideo',
      media: 'poster',
    },
    prepare({title, categoria, etiquetas, duracion, urlVideo, media}) {
      const extra = Array.isArray(etiquetas) && etiquetas.length ? `+${etiquetas.length}` : null
      const sinVideo = urlVideo ? null : 'SIN ENLACE DE VÍDEO'
      return {
        title,
        subtitle: [categoria, extra, duracion, sinVideo].filter(Boolean).join(' · '),
        media,
      }
    },
  },
}
