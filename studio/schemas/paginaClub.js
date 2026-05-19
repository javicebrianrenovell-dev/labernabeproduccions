export default {
  name: 'paginaClub',
  title: 'Página: Club',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        {name: 'label', title: 'Etiqueta superior', type: 'string', initialValue: 'EL CLUB'},
        {
          name: 'tituloLinea1',
          title: 'Título — línea 1',
          type: 'string',
          initialValue: 'Únete al Equipo de',
        },
        {
          name: 'tituloLinea2Pre',
          title: 'Título — línea 2 (antes del énfasis)',
          type: 'string',
          initialValue: 'Producción de ',
        },
        {
          name: 'tituloLinea2Enfasis',
          title: 'Título — palabra destacada',
          type: 'string',
          initialValue: 'València',
        },
        {
          name: 'subtitulo',
          title: 'Subtítulo',
          type: 'string',
          initialValue: 'No eres espectador. Eres productor de tu ciudad.',
        },
        {name: 'ctaTexto', title: 'Texto del botón', type: 'string', initialValue: 'Hazte Productor/a'},
        {
          name: 'imagen',
          title: 'Imagen de fondo',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt', type: 'string'}],
        },
      ],
    },
    {
      name: 'beneficios',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icono', title: 'Emoji o icono', type: 'string', description: 'Emoji simple. Ej: 🎬 📜 🏆'},
            {name: 'titulo', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'descripcion', title: 'Descripción', type: 'text', rows: 2, validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'titulo', subtitle: 'descripcion'}},
        },
      ],
    },
    {
      name: 'form',
      title: 'Formulario de inscripción',
      type: 'object',
      fields: [
        {name: 'titulo', title: 'Título del form', type: 'string', initialValue: 'Únete al Club'},
        {name: 'subtitulo', title: 'Subtítulo', type: 'string', initialValue: 'Es gratis. Es real. Es tu ciudad.'},
        {name: 'textoBoton', title: 'Texto del botón submit', type: 'string', initialValue: 'Unirme al Club'},
        {
          name: 'pruebaSocial',
          title: 'Texto de prueba social',
          type: 'string',
          description: 'Ej: "Ya somos X productores". El número se actualiza manualmente.',
          initialValue: 'Ya somos 2.847 productores',
        },
        {
          name: 'barrios',
          title: 'Barrios disponibles en el selector',
          type: 'array',
          of: [{type: 'string'}],
          initialValue: [
            'Russafa',
            'Benimaclet',
            'Cabanyal',
            'Patraix',
            'Campanar',
            'Ciutat Vella',
            'Poblats Marítims',
            'Otro',
          ],
        },
        {
          name: 'intereses',
          title: 'Etiquetas de intereses',
          type: 'array',
          of: [{type: 'string'}],
          initialValue: ['Urbanismo', 'Cultura', 'Movilidad', 'Educación', 'Medio Ambiente', 'Vivienda'],
        },
        {
          name: 'tituloExito',
          title: 'Mensaje tras envío — título',
          type: 'string',
          initialValue: '¡Bienvenido/a al equipo!',
        },
        {
          name: 'textoExito',
          title: 'Mensaje tras envío — descripción',
          type: 'text',
          rows: 2,
          initialValue:
            'Revisa tu email para confirmar tu inscripción. El próximo Guion Semanal sale el lunes.',
        },
      ],
    },
    {
      name: 'tituloTestimonios',
      title: 'Título de la sección de testimonios',
      type: 'string',
      initialValue: 'Lo que dicen los Productores',
    },
  ],
  preview: {
    prepare() {
      return {title: 'Página: Club'}
    },
  },
}
