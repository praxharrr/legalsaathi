'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

type Msg = { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  'My landlord won\'t return my ₹40,000 deposit',
  'I got scammed on UPI',
  'My internship stipend is unpaid',
  'Police refused to file my FIR',
]

export default function Chat({
  email,
  initialMessages = [],
  initialConvoId = null,
  initialQuestion = '',
}: {
  email: string
  initialMessages?: Msg[]
  initialConvoId?: string | null
  initialQuestion?: string
}) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [convoId, setConvoId] = useState<string | null>(initialConvoId)
  const bottomRef = useRef<HTMLDivElement>(null)
  const sentInitial = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (initialQuestion && !sentInitial.current) {
      sentInitial.current = true
      send(initialQuestion)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const next: Msg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, conversationId: convoId }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.')
        return
      }
      setMessages([...next, { role: 'assistant', content: data.text }])
      if (data.conversationId) setConvoId(data.conversationId)
    } catch {
      setError('Could not reach the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-rule">
        <div className="max-w-[760px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft hover:text-tape transition-colors"
            >
              Your cases
            </Link>
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute">
              {email}
            </span>
            <SignOutButton />
          </div>
        </div>
        <p className="bg-brass/10 border-t border-brass/25 text-[11.5px] text-ink-soft text-center py-1.5 px-6">
          Legal information, not legal advice. For anything serious, speak to a lawyer.
        </p>
      </header>

      <main className="flex-1 w-full max-w-[760px] mx-auto px-6 pt-10 pb-40">
        {messages.length === 0 && !loading && (
          <div className="mt-10">
            <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
              § Ask Saathi
            </p>
            <h1 className="font-serif text-4xl leading-[1.06] tracking-tight mb-3">
              What happened?
            </h1>
            <p className="text-ink-soft mb-8 max-w-[440px]">
              Describe it in your own words. No legal vocabulary needed — just tell it
              the way you&apos;d tell a friend.
            </p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[13px] text-ink-soft border border-rule rounded-full px-3.5 py-1.5 hover:text-tape hover:border-tape transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-7">
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="self-end max-w-[85%]">
                <div className="bg-ink text-paper rounded-[3px] px-4 py-3 text-[15px] leading-relaxed">
                  {m.content}
                </div>
              </div>
            ) : (
              <Answer key={i} text={m.content} />
            )
          )}

          {loading && (
            <div className="flex gap-1.5 items-center py-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-ink-mute animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}

          {error && (
            <p className="text-[13px] text-tape border-l-2 border-tape pl-3 py-1">
              {error}
            </p>
          )}
        </div>
        <div ref={bottomRef} />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-paper via-paper to-transparent pt-10 pb-6 px-6">
        <div className="max-w-[760px] mx-auto">
          <div className="flex gap-2 items-end bg-raised border border-ink rounded-[3px] pl-4 pr-1.5 py-1.5 shadow-[4px_5px_0_rgba(21,24,28,0.08)] focus-within:shadow-[5px_6px_0_var(--color-tape)] transition-shadow">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Describe your situation…"
              className="flex-1 bg-transparent outline-none resize-none py-2.5 text-[15px] max-h-32"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="bg-ink text-paper rounded-[2px] px-4 py-2.5 text-[14px] font-medium hover:bg-tape transition-colors disabled:opacity-40"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Answer({ text }: { text: string }) {
  const lines = text.split('\n')
  const forumLine = lines.find((l) => l.startsWith('FORUM|'))
  const body = lines.filter((l) => !l.startsWith('FORUM|'))

  return (
    <div className="max-w-full">
      <div className="flex flex-col gap-2">
        {body.map((line, i) => {
          const t = line.trim()
          if (!t) return null

          if (t.startsWith('**') && t.endsWith('**')) {
            return (
              <p key={i} className="font-mono text-[10.5px] tracking-[0.11em] uppercase text-tape mt-3 first:mt-0">
                {t.replace(/\*\*/g, '')}
              </p>
            )
          }
          if (t.startsWith('-') || t.startsWith('*') || /^\d+\./.test(t)) {
            return (
              <p key={i} className="text-[15px] leading-relaxed pl-4 border-l border-rule text-ink-soft">
                {t.replace(/^[-*]\s*/, '').replace(/\*\*/g, '')}
              </p>
            )
          }
          return (
            <p key={i} className="text-[15px] leading-relaxed">
              {t.replace(/\*\*/g, '')}
            </p>
          )
        })}
      </div>

      {forumLine && (
        <div className="mt-5 border border-sage/40 bg-sage/[0.07] rounded-[3px] px-4 py-3.5">
          <p className="font-mono text-[10px] tracking-[0.11em] uppercase text-sage mb-1.5">
            Where to go
          </p>
          <p className="font-serif text-[19px] leading-tight mb-1">
            {forumLine.split('|')[1]?.trim()}
          </p>
          <p className="text-[13.5px] text-ink-soft">
            {forumLine.split('|')[2]?.trim()}
          </p>
        </div>
      )}
    </div>
  )
}