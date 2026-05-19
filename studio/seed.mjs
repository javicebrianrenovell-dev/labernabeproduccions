// Script de seed manual. Más fiable que `sanity dataset import` cuando éste se cuelga sin output.
// Uso:
//   SANITY_AUTH_TOKEN=skXXXX... node seed.mjs
//
// El token se genera en https://www.sanity.io/manage/project/6hy8kz7f/api > Tokens > Add API token
// Permisos: Editor (o superior). Copia el token UNA sola vez al crearlo.

import {readFileSync} from 'node:fs'
import {createClient} from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('❌ Falta SANITY_AUTH_TOKEN. Genéralo en sanity.io/manage > API > Tokens.')
  process.exit(1)
}

const client = createClient({
  projectId: '6hy8kz7f',
  dataset: 'production',
  apiVersion: '2024-05-19',
  token,
  useCdn: false,
})

const ndjson = readFileSync(new URL('./seed.ndjson', import.meta.url), 'utf8')
const docs = ndjson
  .split('\n')
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line))

console.log(`📦 Importando ${docs.length} documentos al dataset "production" del proyecto 6hy8kz7f...\n`)

let ok = 0
let fail = 0
for (const doc of docs) {
  const label = `${doc._type.padEnd(20)} ${doc._id}`
  try {
    await client.createOrReplace(doc)
    ok++
    console.log(`✓ ${label}`)
  } catch (err) {
    fail++
    console.error(`✗ ${label}  → ${err.message}`)
  }
}

console.log(`\n${ok} OK · ${fail} fallos · ${docs.length} totales`)
process.exit(fail > 0 ? 1 : 0)
