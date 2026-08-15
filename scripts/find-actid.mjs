const HANDLES = [
  { name: 'Bharatiya Nyaya Sanhita, 2023', handle: '123456789/20062' },
]

for (const h of HANDLES) {
  const url = `https://www.indiacode.nic.in/handle/${h.handle}`
  try {
    const res = await fetch(url)
    const html = await res.text()
    const match = html.match(/actid=(AC_[^&"'\s]+)/)

    console.log(`\n${h.name}`)
    console.log(match ? `  actId: ${match[1]}` : '  NOT FOUND on this page')
  } catch (err) {
    console.log(`\n${h.name}\n  fetch failed: ${err.message}`)
  }
  await new Promise((r) => setTimeout(r, 400))
}