import {SINGLETONS, SINGLETON_TYPES} from './schemas'

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
        .title('Categorías')
        .schemaType('categoria')
        .child(S.documentTypeList('categoria').title('Categorías')),
      S.listItem()
        .title('Episodios de podcast')
        .schemaType('podcastEpisode')
        .child(S.documentTypeList('podcastEpisode').title('Episodios de podcast')),
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
