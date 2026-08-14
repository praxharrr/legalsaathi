import fs from 'node:fs/promises'
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

// Long sections get split so no chunk is too big to embed well.
// The section header is repeated on each piece so context survives.
function splitSection(section, maxChars = 3000) {
  const header = `${section.sectionNumber}. ${section.sectionTitle}`
  const full = `Section ${header}\n\n${section.text}`

  if (full.length <= maxChars) return [full]

  const parts = []
  const paras = section.text.split('\n\n')
  let buf = ''

  for (const p of paras) {
    if ((buf + p).length > maxChars && buf) {
      parts.push(`Section ${header} (continued)\n\n${buf.trim()}`)
      buf = ''
    }
    buf += p + '\n\n'
  }
  if (buf.trim()) parts.push(`Section ${header} (continued)\n\n${buf.trim()}`)

  return parts
}

async function embed(text) {
  const res = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: text,
    config: { outputDimensionality: 768 },
  })
  return res.embeddings[0].values
}

const corpus = JSON.parse(await fs.readFile('scripts/corpus.json', 'utf8'))

for (const act of corpus) {
  console.log(`\n=== ${act.name} ===`)

  const { data: source, error: srcErr } = await supabase
    .from('legal_sources')
    .insert({
      name: act.name,
      short_name: act.shortName,
      year: act.year,
      jurisdiction: 'central',
      source_url: `https://www.indiacode.nic.in/handle/123456789/1362`,
    })
    .select('id')
    .single()

  if (srcErr) {
    console.error('Could not create source:', srcErr.message)
    continue
  }

  let done = 0

  for (const section of act.sections) {
    const chunks = splitSection(section)

    for (const chunkText of chunks) {
      try {
        const vector = await embed(chunkText)

        const { error } = await supabase.from('legal_chunks').insert({
          source_id: source.id,
          section_number: section.sectionNumber,
          section_title: section.sectionTitle,
          chunk_text: chunkText,
          embedding: vector,
        })

        if (error) console.error(`  insert failed (s.${section.sectionNumber}):`, error.message)
        else done++
      } catch (err) {
        console.error(`  embed failed (s.${section.sectionNumber}):`, err.message)
      }

      await sleep(120) // stay inside the free-tier rate limit
    }

    if (done % 25 === 0 && done > 0) console.log(`  ${done} chunks…`)
  }

  console.log(`  ${act.shortName}: ${done} chunks stored`)
}

console.log('\nDone.')