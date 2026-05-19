import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES} from './schemas'
import {deskStructure, singletonDocumentNodeActions} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Pilar Bernabé — Plataforma',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
    // No mostrar "Create new" para singletons en la lista global
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: singletonDocumentNodeActions,
  },
})
