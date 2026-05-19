export default {
  name: 'paginaPitch',
  title: 'Página: Pitch',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        {name: 'tituloLinea1', title: 'Título — línea 1', type: 'string', initialValue: 'Tu Idea Puede'},
        {name: 'tituloLinea2Pre', title: 'Título — línea 2 (antes del énfasis)', type: 'string', initialValue: 'Cambiar '},
        {name: 'tituloLinea2Enfasis', title: 'Título — palabra destacada', type: 'string', initialValue: 'València'},
        {
          name: 'subtitulo',
          title: 'Subtítulo',
          type: 'string',
          initialValue: 'Sube tu propuesta. La comunidad vota. Las mejores ideas se llevan a producción.',
        },
        {name: 'ctaTexto', title: 'Texto del botón', type: 'string', initialValue: 'Sube Tu Idea'},
      ],
    },
    {
      name: 'categorias',
      title: 'Categorías de ideas (filtros)',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['Todas', 'Urbanismo', 'Cultura', 'Movilidad', 'Medio Ambiente', 'Educación'],
    },
    {
      name: 'form',
      title: 'Formulario "Tu Pitch"',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título del modal', type: 'string', initialValue: 'Tu Pitch'},
        {name: 'placeholderTitulo', title: 'Placeholder título idea', type: 'string', initialValue: 'Resume tu idea en una frase'},
        {name: 'placeholderDesc', title: 'Placeholder descripción', type: 'string', initialValue: 'Describe tu propuesta con detalle…'},
        {name: 'textoBoton', title: 'Texto del botón submit', type: 'string', initialValue: 'Enviar Mi Pitch'},
      ],
    },
    {
      name: 'tituloLeaderboard',
      title: 'Título del leaderboard',
      type: 'string',
      initialValue: '🏆 Ideas Más Aplaudidas',
    },
  ],
  preview: {
    prepare() {
      return {title: 'Página: Pitch'}
    },
  },
}
