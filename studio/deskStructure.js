import {SINGLETONS, SINGLETON_TYPES} from './schemas'
import {TIPOS_CATEGORIA} from './schemas/categoria'

// Everything (videos + podcast episodes) tagged with a given category, either as
// principal category or as an extra tag. Mirrors the query the website uses for
// the category page, so what the team sees here is what the public sees there.
const FILTRO_CONTENIDO_CATEGORIA =
  '_type in ["video", "podcastEpisode"] && (categoria._ref == $id || $id in etiquetas[]._ref)'

const contenidoPorCategoria = (S) =>
  S.listItem()
    .title('Contenido por categoría')
    .id('contenido-por-categoria')
    .child(
      S.documentTypeList('categoria')
        .title('Elige una categoría')
        .defaultOrdering([{field: 'tipo', direction: 'asc'}, {field: 'nombre', direction: 'asc'}])
        .child((id) =>
          S.documentList()
            .title('Vídeos y episodios')
            .filter(FILTRO_CONTENIDO_CATEGORIA)
            .params({id})
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
        ),
    )

const listaCategorias = (S) =>
  S.listItem()
    .title('Categorías')
    .schemaType('categoria')
    .child(
      S.list()
        .title('Categorías')
        .items([
          S.listItem()
            .title('Todas')
            .id('todas')
            .child(
              S.documentTypeList('categoria')
                .title('Todas las categorías')
                .defaultOrdering([{field: 'nombre', direction: 'asc'}]),
            ),
          S.divider(),
          ...TIPOS_CATEGORIA.map(({title, value}) =>
            S.listItem()
              .title(title.split(' (')[0] + 's')
              .id(`tipo-${value}`)
              .child(
                S.documentTypeList('categoria')
                  .title(title.split(' (')[0] + 's')
                  .filter('_type == "categoria" && (tipo == $tipo || (!defined(tipo) && $tipo == "tema"))')
                  .params({tipo: value})
                  .defaultOrdering([{field: 'nombre', direction: 'asc'}]),
              ),
          ),
        ]),
    )

export const deskStructure = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // Singletons al principio
      ...SINGLETONS.map(({id, type, title}) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title)),
      ),
      S.divider(),
      // Colecciones
      S.listItem()
        .title('Vídeos')
        .schemaType('video')
        .child(S.documentTypeList('video').title('Vídeos')),
      S.listItem()
        .title('Episodios de podcast')
        .schemaType('podcastEpisode')
        .child(S.documentTypeList('podcastEpisode').title('Episodios de podcast')),
      listaCategorias(S),
      contenidoPorCategoria(S),
      S.listItem()
        .title('Testimonios (Club)')
        .schemaType('testimonio')
        .child(S.documentTypeList('testimonio').title('Testimonios')),
    ])

// Impide crear duplicados de singletons desde la UI ("Create new").
export const singletonDocumentNodeActions = (prev, {schemaType}) => {
  if (SINGLETON_TYPES.has(schemaType)) {
    return prev.filter(({action}) => !['duplicate', 'delete'].includes(action))
  }
  return prev
}
