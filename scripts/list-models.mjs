import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const res = await fetch('https://api.groq.com/openai/v1/models', {
  headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
})

const data = await res.json()

if (!data.data) {
  console.error('Unexpected response:', JSON.stringify(data).slice(0, 400))
  process.exit(1)
}

console.log(`${data.data.length} models available:\n`)
for (const m of data.data) {
  console.log(` ${m.id}`)
}