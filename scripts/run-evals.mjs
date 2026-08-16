import fs from 'node:fs/promises'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const BASE = process.env.EVAL_BASE_URL ?? 'http://localhost:3000'
const COOKIE = process.env.EVAL_COOKIE ?? ''

if (!COOKIE) {
  console.error(
    'Set EVAL_COOKIE in .env.local — see instructions. Evals need a logged-in session.'
  )
  process.exit(1)
}

const cases = JSON.parse(await fs.readFile('scripts/evals.json', 'utf8'))

let passed = 0
const failures = []

for (const c of cases) {
  process.stdout.write(`${c.id} … `)

  try {
    const res = await fetch(`${BASE}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: COOKIE },
      body: JSON.stringify({ messages: [{ role: 'user', content: c.question }] }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.log(`ERROR ${res.status}`)
      failures.push({ id: c.id, reason: `HTTP ${res.status}: ${body.slice(0, 120)}` })
      continue
    }

    const data = await res.json()
    const text = data.text ?? ''
    const cited = (data.sources ?? []).map((s) => s.section).join(' | ')

    const problems = []

    // every expected section must appear somewhere in the cited sources
    for (const want of c.expectSections ?? []) {
      if (!cited.includes(want)) problems.push(`missing source: ${want}`)
    }

    // the answer must mention this word (used for honest-limitation cases)
    if (c.expectMustSay && !text.toLowerCase().includes(c.expectMustSay.toLowerCase())) {
      problems.push(`answer never mentions: ${c.expectMustSay}`)
    }

    // forum card should point somewhere sensible
    if (c.expectForum) {
      const forumLine = text.split('\n').find((l) => l.startsWith('FORUM|')) ?? ''
      if (!forumLine.toLowerCase().includes(c.expectForum.toLowerCase())) {
        problems.push(`forum mismatch, wanted "${c.expectForum}", got "${forumLine.slice(0, 60)}"`)
      }
    }

    if (problems.length === 0) {
      passed++
      console.log('PASS')
    } else {
      console.log('FAIL')
      failures.push({ id: c.id, problems, cited })
    }
  } catch (err) {
    console.log('ERROR')
    failures.push({ id: c.id, reason: err.message })
  }

  await new Promise((r) => setTimeout(r, 30000))
}

console.log(`\n${passed}/${cases.length} passed\n`)

for (const f of failures) {
  console.log(`--- ${f.id}`)
  if (f.reason) console.log(`  ${f.reason}`)
  for (const p of f.problems ?? []) console.log(`  ${p}`)
  if (f.cited) console.log(`  cited: ${f.cited}`)
}