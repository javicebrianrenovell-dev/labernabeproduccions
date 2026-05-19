export default {
  name: 'paginaHome',
  title: 'Página: Inicio',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero principal',
      type: 'object',
      fields: [
        {name: 'badge', title: 'Etiqueta (ej: EN DIRECTO)', type: 'string', initialValue: 'EN DIRECTO'},
        {name: 'titulo', title: 'Título grande', type: 'string', initialValue: 'València en Marcha'},
        {name: 'subtitulo', title: 'Subtítulo', type: 'string', initialValue: 'La política como producción cultural y ciudadana'},
        {
          name: 'imagen',
          title: 'Imagen de fondo',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt', type: 'string'}],
        },
        {
          name: 'ctaTexto',
          title: 'Texto del botón principal',
          type: 'string',
          initialValue: 'Ver Ahora',
        },
        {
          name: 'ctaRuta',
          title: 'Ruta del botón',
          type: 'string',
          initialValue: '/reproductor',
        },
        {
          name: 'countdownTexto',
          title: 'Texto del countdown',
          type: 'string',
          description: 'Ej: "Próximo estreno en"',
          initialValue: 'Próximo estreno en',
        },
      ],
    },
    {
      name: 'seccionEstrenos',
      title: 'Sección "Estrenos de Barrio"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'Estrenos de Barrio'},
        {name: 'verMas', title: 'Texto del enlace "ver más"', type: 'string', initialValue: 'Ver todos →'},
      ],
    },
    {
      name: 'seccionPodcast',
      title: 'Sección "Podcast"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'El Podcast de La Bernabé'},
        {name: 'verMas', title: 'Texto del enlace "ver más"', type: 'string', initialValue: 'Todos los episodios →'},
      ],
    },
    {
      name: 'seccionDocumentales',
      title: 'Sección "Documentales"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'Documentales de Gestión'},
        {name: 'verMas', title: 'Texto del enlace "ver más"', type: 'string', initialValue: 'Ver todos →'},
      ],
    },
    {
      name: 'seccionEdupolitica',
      title: 'Sección "Edu-Política"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'Edu-Política'},
        {name: 'verMas', title: 'Texto del enlace "ver más"', type: 'string', initialValue: 'Ver todos →'},
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'Página de Inicio'}
    },
  },
}
