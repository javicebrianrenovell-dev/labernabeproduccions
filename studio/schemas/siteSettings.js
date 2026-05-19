export default {
  name: 'siteSettings',
  title: 'Configuración general',
  type: 'document',
  // Singleton: solo debe existir un documento.
  fields: [
    {
      name: 'marca',
      title: 'Marca',
      type: 'object',
      fields: [
        {name: 'nombre', title: 'Nombre de la marca', type: 'string', initialValue: 'LA BERNABÉ PRODUCCIONS'},
        {
          name: 'acentoLetra',
          title: 'Letra con color de acento',
          type: 'string',
          description: 'Letra dentro del nombre que se pinta en rojo. Ej: "É" en BERNABÉ.',
          initialValue: 'É',
        },
        {
          name: 'colorAcento',
          title: 'Color de acento (hex)',
          type: 'string',
          initialValue: '#E30613',
          validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{6})$/).warning('Formato #RRGGBB'),
        },
        {
          name: 'claim',
          title: 'Claim',
          type: 'string',
          description: 'Frase que aparece en footer y a veces en metadata.',
          initialValue: 'La política como producción cultural y ciudadana. Una plataforma audiovisual de proximidad para València.',
        },
      ],
    },
    {
      name: 'redes',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'plataforma',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Facebook', value: 'facebook'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required()},
            {name: 'visible', title: 'Visible', type: 'boolean', initialValue: true},
          ],
          preview: {select: {title: 'plataforma', subtitle: 'url'}},
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'columnas',
          title: 'Columnas de enlaces',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'titulo', title: 'Título de columna', type: 'string', validation: (Rule) => Rule.required()},
                {
                  name: 'enlaces',
                  title: 'Enlaces',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'texto', title: 'Texto', type: 'string', validation: (Rule) => Rule.required()},
                        {name: 'url', title: 'URL o ruta interna (/ej.)', type: 'string', validation: (Rule) => Rule.required()},
                      ],
                      preview: {select: {title: 'texto', subtitle: 'url'}},
                    },
                  ],
                },
              ],
              preview: {select: {title: 'titulo'}},
            },
          ],
        },
        {
          name: 'copyright',
          title: 'Texto de copyright',
          type: 'string',
          initialValue: '© 2026 LA BERNABÉ PRODUCCIONS. Todos los derechos reservados.',
        },
        {
          name: 'lineaInferior',
          title: 'Línea inferior (atribución)',
          type: 'object',
          fields: [
            {name: 'texto', title: 'Texto', type: 'string', initialValue: 'Pilar Bernabé — Candidata por València'},
            {name: 'url', title: 'URL (opcional)', type: 'url'},
          ],
        },
      ],
    },
    {
      name: 'nav',
      title: 'Menú de navegación',
      type: 'object',
      fields: [
        {
          name: 'items',
          title: 'Enlaces del menú',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'texto', title: 'Texto', type: 'string', validation: (Rule) => Rule.required()},
                {
                  name: 'ruta',
                  title: 'Ruta',
                  type: 'string',
                  description: 'Ruta interna (/, /reproductor, /podcast, /pitch, /club).',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {select: {title: 'texto', subtitle: 'ruta'}},
            },
          ],
        },
        {
          name: 'cta',
          title: 'Botón CTA derecha',
          type: 'object',
          fields: [
            {name: 'texto', title: 'Texto', type: 'string', initialValue: 'Suscríbete'},
            {name: 'ruta', title: 'Ruta', type: 'string', initialValue: '/club'},
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'Configuración general del sitio'}
    },
  },
}
