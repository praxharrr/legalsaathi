const ACT = 'AC_CEN_9_67_00002_199345_1517807323599'
const SEC = '23840'

const url = `https://www.indiacode.nic.in/SectionPageContent?actid=${ACT}&sectionID=${SEC}`

const res = await fetch(url)
console.log('Status:', res.status)

const text = await res.text()
console.log('Raw response:\n')
console.log(text.slice(0, 1500))