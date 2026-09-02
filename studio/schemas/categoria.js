import React from 'react'

// Curated palette. The team picks by name instead of typing a HEX code; the
// stored value is still the HEX string so existing documents keep working.
// The first seven are the colours already in production (seed of 19-may-2026).
export const PALETA = [
  {title: 'Rojo Bernabé', value: '#E30613'},
  {title: 'Naranja', value: '#F57C00'},
  {title: 'Amarillo', value: '#F9A825'},
  {title: 'Verde', value: '#2E7D32'},
  {title: 'Turquesa', value: '#00897B'},
  {title: 'Azul cielo', value: '#0288D1'},
  {title: 'Azul', value: '#0066CC'},
  {title: 'Violeta', value: '#8E24AA'},
  {title: 'Rosa', value: '#D81B60'},
  {title: 'Marrón', value: '#6D4C41'},
  {title: 'Gris', value: '#616161'},
  {title: 'Negro', value: '#222222'},
]

export const TIPOS_CATEGORIA = [
  {title: 'Barrio o zona (Benicalap, Nazaret, Ciutat Vella…)', value: 'barrio'},
  {title: 'Tema (Movilidad, Vivienda, Cultura…)', value: 'tema'},
  {title: 'Formato (Documentales, Entrevistas…)', value: 'formato'},
]

// Coloured dot shown next to each category in the Studio lists, so the team
// sees the colour without opening the document.
function Muestra({color}) {
  return React.createElement('span', {
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: color || '#3a3a3a',
      border: color ? 'none' : '2px dashed #888',
      boxSizing: 'border-box',
    },
  })
}

export default {
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  description:
    'Una categoría es como un hashtag: agrupa vídeos y episodios de podcast bajo un mismo ' +
    'barrio, tema o formato. En la web cada categoría tiene su propia página y aparece ' +
    'como un chip de color en cada contenido.',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Benicalap, Movilidad, Documentales. Corto: es lo que se lee en el chip.',
      validation: (Rule) => Rule.required().max(40),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description:
        'Se rellena solo con "Generate". Es la dirección de la página de la categoría: ' +
        'pilarbernabe.es/categoria/benicalap.',
      options: {source: 'nombre', maxLength: 50},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tipo',
      title: 'Tipo de categoría',
      type: 'string',
      description:
        'Sirve para que el buscador de la web agrupe las categorías en "Barrios", "Temas" y ' +
        '"Formatos". Si no marcas nada, se trata como Tema.',
      options: {list: TIPOS_CATEGORIA, layout: 'radio'},
      initialValue: 'tema',
    },
    {
      name: 'color',
      title: 'Color del chip',
      type: 'string',
      description:
        'Es el color con el que se ve la categoría en la web: en el chip de cada vídeo, en la ' +
        'cabecera de su página y en el buscador. Si no eliges ninguno, el chip sale en gris.',
      options: {list: PALETA, layout: 'dropdown'},
    },
    {
      name: 'descripcion',
      title: 'Descripción (opcional)',
      type: 'text',
      rows: 2,
      description:
        'Una o dos frases que se muestran en la cabecera de la página de la categoría. ' +
        'Ej: "Todo lo que Pilar ha hecho y propone para Benicalap".',
      validation: (Rule) => Rule.max(200),
    },
  ],
  orderings: [
    {
      title: 'Por tipo y nombre',
      name: 'tipoNombre',
      by: [
        {field: 'tipo', direction: 'asc'},
        {field: 'nombre', direction: 'asc'},
      ],
    },
    {title: 'Por nombre', name: 'nombre', by: [{field: 'nombre', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'nombre', color: 'color', tipo: 'tipo'},
    prepare({title, color, tipo}) {
      const nombreColor = (PALETA.find((p) => p.value === color) || {}).title
      const nombreTipo = (TIPOS_CATEGORIA.find((t) => t.value === tipo) || {}).title
      const tipoCorto = nombreTipo ? nombreTipo.split(' ')[0] : 'Tema'
      return {
        title,
        subtitle: [tipoCorto, nombreColor || 'sin color'].join(' · '),
        media: React.createElement(Muestra, {color}),
      }
    },
  },
}
