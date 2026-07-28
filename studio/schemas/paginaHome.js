const FORMATOS = [
  {title: 'Vertical 9:16 (redes sociales)', value: 'vertical'},
  {title: 'Cuadrado 1:1', value: 'cuadrado'},
  {title: 'Horizontal 16:9', value: 'horizontal'},
  {title: 'Panorámico 21:9', value: 'panoramico'},
]

// Un mismo campo para las tres secciones de vídeo. Sin `required`: si fuese
// obligatorio, esta página quedaría marcada en rojo hasta que alguien la editase y
// el equipo lo leería como que ha roto algo.
const campoFormato = (valorInicial, etiquetaPorDefecto) => ({
  name: 'formato',
  title: 'Formato de las miniaturas',
  type: 'string',
  description:
    'Define la forma de las tarjetas de este carrusel. "Vertical 9:16" es el formato ' +
    'de Reels, TikTok y Shorts. Si lo dejas sin marcar se usa ' +
    etiquetaPorDefecto +
    '. Al cambiar a Vertical o Cuadrado, revisa el punto de enfoque de los pósters ' +
    'de los vídeos de esta sección: es lo que la web usa para recortar sin cortar ' +
    'lo importante. El cambio tarda alrededor de un minuto en verse en la web.',
  options: {list: FORMATOS, layout: 'radio'},
  initialValue: valorInicial,
})

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
        campoFormato('vertical', 'Vertical 9:16'),
      ],
    },
    {
      name: 'seccionPodcast',
      title: 'Sección "Podcast"',
      type: 'object',
      description:
        'Esta sección no tiene formato configurable: sus tarjetas son una fila con la ' +
        'carátula al lado del texto, no una miniatura suelta.',
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
        campoFormato('panoramico', 'Panorámico 21:9'),
      ],
    },
    {
      name: 'seccionEdupolitica',
      title: 'Sección "Edu-Política"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título', type: 'string', initialValue: 'Edu-Política'},
        {name: 'verMas', title: 'Texto del enlace "ver más"', type: 'string', initialValue: 'Ver todos →'},
        campoFormato('vertical', 'Vertical 9:16'),
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'Página de Inicio'}
    },
  },
}
