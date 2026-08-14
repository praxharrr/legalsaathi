import fs from 'node:fs/promises'

const html = await fs.readFile('scripts/peek.html', 'utf8')

// pull out every <script> block
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .filter((s) => s.trim().length > 0)

console.log(`Found ${scripts.length} inline scripts\n`)

const KEYWORDS = ['secp', '23840', 'ajax', '.load(', 'getSection', 'fetch(', '.get(', '.post(', 'url:']

scripts.forEach((s, i) => {
  const hits = s.split('\n').filter((line) =>
    KEYWORDS.some((k) => line.toLowerCase().includes(k.toLowerCase()))
  )
  if (hits.length) {
    console.log(`--- script #${i} ---`)
    hits.forEach((h) => console.log(h.trim()))
    console.log()
  }
})

// also list external scripts, in case the logic lives in a .js file
const srcs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1])
console.log('External scripts:')
srcs.forEach((s) => console.log(' ', s))