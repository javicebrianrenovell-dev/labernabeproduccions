export default {
  name: 'testimonio',
  title: 'Testimonio (Club)',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'barrio',
      title: 'Barrio',
      type: 'string',
      description: 'Ej: Russafa, Benimaclet, Cabanyal…',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cita',
      title: 'Cita',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    },
    {
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Más bajo = aparece antes.',
      initialValue: 0,
    },
    {
      name: 'activo',
      title: 'Mostrar en la web',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'ordenAsc',
      by: [{field: 'orden', direction: 'asc'}],
    },
  ],
  preview: {
    select: {nombre: 'nombre', barrio: 'barrio'},
    prepare({nombre, barrio}) {
      return {title: nombre, subtitle: barrio}
    },
  },
}
