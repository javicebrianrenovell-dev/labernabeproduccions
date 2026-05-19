import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES} from './schemas/index.js'
import {deskStructure, singletonDocumentNodeActions} from './deskStructure.js'

/** @type {import('sanity').Config} */
export default {
  name: 'default',
  title: 'Pilar Bernabé — Plataforma',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: singletonDocumentNodeActions,
  },
}
