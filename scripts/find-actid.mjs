const HANDLES = [
  { name: 'CONTROL — RTI 2005 (worked earlier)', handle: '123456789/2065' },
  { name: 'Motor Vehicles Act, 1988', handle: '123456789/1798' },
  { name: 'Bharatiya Sakshya Adhiniyam, 2023', handle: '123456789/20063' },
  { name: 'Protection of Women from DV Act, 2005', handle: '123456789/5560' },
]

const VARIANTS = ['', '?view_type=browse']

for (const h of HANDLES) {
  console.log(`\n${h.name}`)

  for (const v of VARIANTS) {
    const url = `https://www.indiacode.nic.in/handle/${h.handle}${v}`
    try {
      const res = await fetch(url)
      const html = await res.text()
      const match = html.match(/actid=(AC_[^&"'\s]+)/)

      console.log(`  [${v || 'plain'}] status ${res.status}, ${html.length} bytes → ${match ? match[1] : 'no actid'}`)
    } catch (err) {
      console.log(`  [${v || 'plain'}] fetch failed: ${err.message}`)
    }
    await new Promise((r) => setTimeout(r, 800))
  }
}