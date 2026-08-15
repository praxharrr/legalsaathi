const HANDLES = [
  { name: 'Right to Information Act, 2005', handle: '123456789/2065' },
  { name: 'Transfer of Property Act, 1882', handle: '123456789/2338' },
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