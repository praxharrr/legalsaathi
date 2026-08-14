import fs from 'node:fs/promises'

const html = await fs.readFile('scripts/peek.html', 'utf8')
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .filter((s) => s.trim().length > 0)

console.log(scripts[3])