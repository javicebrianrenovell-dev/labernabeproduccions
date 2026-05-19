import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn(
    '[sanity] VITE_SANITY_PROJECT_ID no está configurado. La web no podrá cargar contenido del CMS.',
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-05-19',
  useCdn: true,
})
