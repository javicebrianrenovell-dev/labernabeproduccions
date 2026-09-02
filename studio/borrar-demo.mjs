// Borra el contenido de demostración sembrado el 19-may-2026 (seed.ndjson):
// 14 vídeos y 8 episodios de podcast inventados, sin enlace ni miniatura, que
// siguen apareciendo en la web mezclados con el contenido real del equipo.
//
// Uso (desde studio/):
//   SANITY_AUTH_TOKEN=skXXXX... node borrar-demo.mjs           # simulacro: solo lista
//   SANITY_AUTH_TOKEN=skXXXX... node borrar-demo.mjs --borrar  # borra de verdad
//
// El token se genera en https://www.sanity.io/manage/project/6hy8kz7f/api > Tokens
// (permiso Editor). Solo se tocan los documentos cuyo _id está en la lista de
// abajo: nada creado por el equipo desde el Studio (ids aleatorios) puede caer.

import {createClient} from '@sanity/client'

const VIDEOS_DEMO = [
  'video-russafa-se-transforma',
  'video-nuevo-parque-benimaclet',
  'video-mercado-central-100',
  'video-cabanyal-renace',
  'video-carril-bici-benimaclet',
  'video-marina-puerto-ciudadano',
  'video-valencia-resiliente-dana',
  'video-plan-verde-huerta',
  'video-presupuestos-participativos-2026',
  'video-como-funciona-pleno',
  'video-que-es-presupuesto-municipal',
  'video-tu-voto-explicado',
  'video-quien-decide-las-calles',
  'video-servicios-municipales-101',
]
const EPISODIOS_DEMO = ['episode-05', 'episode-06', 'episode-07', 'episode-08', 'episode-09', 'episode-10', 'episode-11', 'episode-12']

const borrar = process.argv.includes('--borrar')
const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('❌ Falta SANITY_AUTH_TOKEN. Genéralo en sanity.io/manage > API > Tokens.')
  process.exit(1)
}

const client = createClient({projectId: '6hy8kz7f', dataset: 'production', apiVersion: '2024-05-19', token, useCdn: false})

const ids = [...VIDEOS_DEMO, ...EPISODIOS_DEMO]
const existentes = await client.fetch('*[_id in $ids]{_id, _type, titulo, urlVideo, urlAudio}', {ids})

if (!existentes.length) {
  console.log('✓ No queda contenido de demostración. Nada que hacer.')
  process.exit(0)
}

console.log(`${borrar ? '🗑  Borrando' : '👀 Simulacro —'} ${existentes.length} documentos de demostración:\n`)
for (const d of existentes) {
  const aviso = d.urlVideo || d.urlAudio ? '   ⚠ tiene enlace: revisa que no sea contenido real' : ''
  console.log(`  ${d._type.padEnd(16)} ${d._id.padEnd(42)} ${d.titulo}${aviso}`)
}

if (!borrar) {
  console.log('\nNo se ha borrado nada. Repite con --borrar para ejecutarlo.')
  process.exit(0)
}

// Drafts share the id with a "drafts." prefix; remove both so nothing resurfaces.
const tx = client.transaction()
for (const d of existentes) {
  tx.delete(d._id)
  tx.delete(`drafts.${d._id}`)
}
await tx.commit()
console.log(`\n✓ Borrados ${existentes.length} documentos. La web deja de mostrarlos en un par de minutos.`)
