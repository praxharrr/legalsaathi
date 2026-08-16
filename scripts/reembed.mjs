import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { pipeline } from '@huggingface/transformers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

console.log('Loading model (first run downloads ~90MB)…')
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
console.log('Model ready.\n')

// pull every chunk that needs an embedding
const { data: chunks, error } = await supabase
  .from('legal_chunks')
  .select('id, chunk_text')
  .is('embedding', null)

if (error) {
  console.error('Could not read chunks:', error.message)
  process.exit(1)
}

console.log(`${chunks.length} chunks to embed\n`)

let done = 0
let failed = 0

for (const c of chunks) {
  try {
    const out = await extractor(c.chunk_text, { pooling: 'mean', normalize: true })
    const vector = Array.from(out.data)

    const { error: upErr } = await supabase
      .from('legal_chunks')
      .update({ embedding: vector })
      .eq('id', c.id)

    if (upErr) {
      failed++
      console.error(`  update failed (${c.id}):`, upErr.message)
    } else {
      done++
      if (done % 100 === 0) console.log(`  ${done}/${chunks.length}…`)
    }
  } catch (err) {
    failed++
    console.error(`  embed failed (${c.id}):`, err.message)
  }
}

console.log(`\nDone. ${done} embedded, ${failed} failed.`)