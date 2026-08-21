'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'

type Source = {
  section: string
  title: string
  text: string
  similarity: number
}

type Msg = {
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
}

const s = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 52,
    fontSize: 10,
    lineHeight: 1.55,
    color: '#15181C',
    fontFamily: 'Helvetica',
  },
  head: {
    borderBottomWidth: 1,
    borderBottomColor: '#15181C',
    paddingBottom: 8,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brand: { fontSize: 15, fontFamily: 'Times-Roman' },
  brandMark: { fontSize: 15, fontFamily: 'Times-Italic', color: '#A8342A' },
  meta: { fontSize: 7.5, color: '#6E7379', letterSpacing: 0.6 },
  title: { fontSize: 19, fontFamily: 'Times-Roman', marginBottom: 4 },
  filed: { fontSize: 8, color: '#6E7379', marginBottom: 26, letterSpacing: 0.5 },
  qLabel: {
    fontSize: 7.5,
    color: '#A8342A',
    letterSpacing: 1,
    marginBottom: 5,
  },
  q: {
    fontSize: 11,
    marginBottom: 14,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#15181C',
  },
  h: {
    fontSize: 7.5,
    color: '#A8342A',
    letterSpacing: 1,
    marginTop: 12,
    marginBottom: 5,
  },
  p: { marginBottom: 4 },
  bullet: {
    marginBottom: 4,
    paddingLeft: 10,
    borderLeftWidth: 0.5,
    borderLeftColor: '#D2D3C8',
    color: '#3A4048',
  },
  forumBox: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#6E7D66',
    backgroundColor: '#F3F6F2',
    padding: 10,
  },
  forumName: { fontSize: 12, fontFamily: 'Times-Roman', marginBottom: 2 },
  srcHead: {
    marginTop: 22,
    marginBottom: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#D2D3C8',
    paddingTop: 8,
    fontSize: 7.5,
    color: '#6E7379',
    letterSpacing: 1,
  },
  src: { marginBottom: 12 },
  srcRef: { fontSize: 9, color: '#A8342A', marginBottom: 2 },
  srcTitle: { fontSize: 9, marginBottom: 4 },
  srcText: { fontSize: 8, color: '#3A4048', lineHeight: 1.5 },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#D2D3C8',
    marginVertical: 20,
  },
  foot: {
    position: 'absolute',
    bottom: 28,
    left: 52,
    right: 52,
    borderTopWidth: 0.5,
    borderTopColor: '#D2D3C8',
    paddingTop: 7,
    fontSize: 7,
    color: '#6E7379',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

function CaseDoc({
  title,
  messages,
  filedAt,
}: {
  title: string
  messages: Msg[]
  filedAt: string
}) {
  return (
    <Document title={title} author="LegalSaathi">
      <Page size="A4" style={s.page}>
        <View style={s.head} fixed>
          <Text style={s.brand}>
            Legal<Text style={s.brandMark}>Saathi</Text>
          </Text>
          <Text style={s.meta}>CASE SUMMARY</Text>
        </View>

        <Text style={s.title}>{title}</Text>
        <Text style={s.filed}>FILED {filedAt.toUpperCase()}</Text>

        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <View key={i} wrap={false}>
                <Text style={s.qLabel}>QUESTION</Text>
                <Text style={s.q}>{m.content}</Text>
              </View>
            )
          }

          const lines = m.content.split('\n')
          const forumLine = lines.find((l) => l.startsWith('FORUM|'))
          const body = lines.filter((l) => !l.startsWith('FORUM|'))

          return (
            <View key={i}>
              {body.map((line, k) => {
                const t = line.trim()
                if (!t) return null

                if (t.startsWith('**') && t.endsWith('**')) {
                  return (
                    <Text key={k} style={s.h}>
                      {t.replace(/\*\*/g, '').toUpperCase()}
                    </Text>
                  )
                }
                if (t.startsWith('-') || /^\d+\./.test(t)) {
                  return (
                    <Text key={k} style={s.bullet}>
                      {t.replace(/^[-*]\s*/, '').replace(/\*\*/g, '')}
                    </Text>
                  )
                }
                return (
                  <Text key={k} style={s.p}>
                    {t.replace(/\*\*/g, '')}
                  </Text>
                )
              })}

              {forumLine && (
                <View style={s.forumBox} wrap={false}>
                  <Text style={s.qLabel}>WHERE TO GO</Text>
                  <Text style={s.forumName}>
                    {forumLine.split('|')[1]?.trim()}
                  </Text>
                  <Text>{forumLine.split('|')[2]?.trim()}</Text>
                </View>
              )}

              {m.sources && m.sources.length > 0 && (
                <View>
                  <Text style={s.srcHead}>
                    SECTIONS RELIED ON — {m.sources.length} FROM INDIA CODE
                  </Text>
                  {m.sources.map((src, k) => (
                    <View key={k} style={s.src} wrap={false}>
                      <Text style={s.srcRef}>{src.section}</Text>
                      <Text style={s.srcTitle}>{src.title}</Text>
                      <Text style={s.srcText}>{src.text}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={s.divider} />
            </View>
          )
        })}

        <View style={s.foot} fixed>
          <Text>
            Legal information, not legal advice. Not a substitute for a lawyer.
          </Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}

export async function downloadCasePdf(
  title: string,
  messages: Msg[],
  filedAt: string
) {
  const blob = await pdf(
    <CaseDoc title={title} messages={messages} filedAt={filedAt} />
  ).toBlob()

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}