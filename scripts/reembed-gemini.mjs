import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { GoogleGenAI } from '@google/genai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const { data: chunks, error } = await supabase
  .from('legal_chunks')
  .select('id, chunk_text')
  .is('embedding', null)
  .limit(1000)

if (error) {
  console.error('Could not read chunks:', error.message)
  process.exit(1)
}

console.log(`${chunks.length} chunks to embed\n`)

let done = 0
let failed = 0

for (const c of chunks) {
  try {
    const res = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: c.chunk_text,
      config: { outputDimensionality: 768 },
    })

    const vector = res.embeddings?.[0]?.values
    if (!vector) throw new Error('no vector returned')

    const { error: upErr } = await supabase
      .from('legal_chunks')
      .update({ embedding: vector })
      .eq('id', c.id)

    if (upErr) {
      failed++
      console.error(`  update failed:`, upErr.message)
    } else {
      done++
      if (done % 100 === 0) console.log(`  ${done}/${chunks.length}…`)
    }
  } catch (err) {
    failed++
    console.error(`  embed failed:`, err.message)
    if (String(err.message).includes('429')) {
      console.error('\nDaily quota hit. Run again tomorrow to finish.')
      break
    }
  }

  await sleep(150)
}

console.log(`\nDone. ${done} embedded, ${failed} failed.`)