export default {
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Barrio, Movilidad, Documentales, Medio Ambiente',
      validation: (Rule) => Rule.required().max(40),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'nombre', maxLength: 50},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color del chip',
      type: 'string',
      description: 'Opcional. Código HEX (#RRGGBB) para diferenciar la categoría visualmente.',
      validation: (Rule) =>
        Rule.regex(/^#([0-9A-Fa-f]{6})$/, {name: 'color hex', invert: false}).warning(
          'Usa formato #RRGGBB',
        ),
    },
  ],
  preview: {
    select: {title: 'nombre', subtitle: 'color'},
  },
}
