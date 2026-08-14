const ACT = 'AC_CEN_9_67_00002_199345_1517807323599'
const url = `https://www.indiacode.nic.in/show-data?actid=${ACT}&orderno=8`

const res = await fetch(url)
const html = await res.text()

console.log('Status:', res.status)
console.log('Length:', html.length)

// dump to a file so we can actually read it
const fs = await import('node:fs/promises')
await fs.writeFile('scripts/peek.html', html)
console.log('Written to scripts/peek.html')