'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import WaxSeal from '@/components/WaxSeal'
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
  followups?: string[]
  at?: string
}

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
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: data.text,
          sources: data.sources,
          followups: data.followups,
          at: new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      if (data.conversationId) setConvoId(data.conversationId)
    } catch {
      setError('Could not reach the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const empty = messages.length === 0 && !loading

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-rule">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
          <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
            <Link
              href="/help"
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft hover:text-tape transition-colors"
            >
              Find help
            </Link>
            <Link
              href="/dashboard"
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft hover:text-tape transition-colors"
            >
              Your cases
            </Link>
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute max-w-[180px] truncate">
              {email}
            </span>
            <SignOutButton />
          </div>
        </div>
        <p className="bg-brass/10 border-t border-brass/25 text-[11.5px] text-ink-soft text-center py-1.5 px-6">
          Legal information, not legal advice.{' '}
          <Link href="/disclaimer" className="underline decoration-brass/50 underline-offset-2 hover:text-tape transition-colors">
            Read the limits
          </Link>
          .
        </p>
      </header>

      <main className="flex-1 w-full max-w-[760px] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-40">
        {empty && (
          <div className="mt-6 sm:mt-10 grid lg:grid-cols-[1fr_280px] gap-8 items-start">
            <div>
              <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
                § Ask Saathi
              </p>
              <h1 className="font-serif text-4xl leading-[1.06] tracking-tight mb-3">
                What happened?
              </h1>
              <p className="text-ink-soft mb-8 max-w-[440px]">
                Describe it in your own words. No legal vocabulary needed — just tell
                it the way you&apos;d tell a friend.
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

            <div className="hidden lg:block h-[300px]">
              <WaxSeal />
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
              <Answer
                key={i}
                text={m.content}
                sources={m.sources}
                followups={m.followups}
                at={m.at}
                onAsk={send}
                n={messages.slice(0, i + 1).filter((x) => x.role === 'assistant').length}
              />
            )
          )}

          {loading && <Working />}

          {error && (
            <p className="text-[13px] text-tape border-l-2 border-tape pl-3 py-1">
              {error}
            </p>
          )}
        </div>
        <div ref={bottomRef} />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-paper via-paper to-transparent pt-10 pb-5 sm:pb-6 px-4 sm:px-6">
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

const STAGES = [
  'Reading your question',
  'Routing to the relevant acts',
  'Searching 1,565 sections',
  'Reading the statutory text',
  'Drafting your answer',
]

function Working() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setI((n) => Math.min(n + 1, STAGES.length - 1)),
      1400
    )
    return () => clearInterval(t)
  }, [])

  return (
    <div className="border-l-2 border-tape/40 pl-4 py-1">
      <p className="font-mono text-[10px] tracking-[0.11em] uppercase text-tape mb-2">
        Working
      </p>
      <div className="flex flex-col gap-1">
        {STAGES.slice(0, i + 1).map((s, k) => (
          <p
            key={s}
            className={`text-[13.5px] transition-colors ${
              k === i ? 'text-ink' : 'text-ink-mute'
            }`}
          >
            {k < i ? '· ' : '› '}
            {s}
          </p>
        ))}
      </div>
    </div>
  )
}

function Answer({
  text,
  sources = [],
  followups = [],
  at,
  onAsk,
  n = 1,
}: {
  text: string
  sources?: Source[]
  followups?: string[]
  at?: string
  onAsk?: (q: string) => void
  n?: number
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const lines = text.split('\n')
  const forumLine = lines.find((l) => l.startsWith('FORUM|'))
  const body = lines.filter((l) => !l.startsWith('FORUM|'))

  const topScore = sources.length ? Math.max(...sources.map((s) => s.similarity)) : 0
  const weak = sources.length > 0 && topScore < 60
  const actCount = new Set(sources.map((s) => s.section.split(' s.')[0])).size

  async function copy() {
    const plain = body
      .map((l) => l.trim().replace(/\*\*/g, ''))
      .filter(Boolean)
      .join('\n')

    const forum = forumLine
      ? `\nWhere to go: ${forumLine.split('|')[1]?.trim()}`
      : ''

    const cited = sources.length
      ? `\n\nSections cited: ${sources.map((s) => s.section).join(', ')}`
      : ''

    try {
      await navigator.clipboard.writeText(
        `${plain}${forum}${cited}\n\nvia LegalSaathi — legal information, not legal advice.`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked; nothing useful to do
    }
  }

  return (
    <div className="max-w-full relative sm:pl-10">
      <span className="hidden sm:block absolute left-0 top-1 font-mono text-[10px] tracking-[0.08em] text-tape/50 select-none">
        § {String(n).padStart(2, '0')}
      </span>

      {weak && (
        <div className="mb-4 border-l-2 border-brass bg-brass/[0.07] pl-3.5 py-2.5">
          <p className="font-mono text-[9.5px] tracking-[0.11em] uppercase text-brass mb-1">
            Weak match
          </p>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            Nothing in the corpus matched this closely. The answer below is the best
            available — more detail about your situation would help.
          </p>
        </div>
      )}

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

      {followups.length > 0 && onAsk && (
        <div className="mt-5">
          <p className="font-mono text-[9.5px] tracking-[0.11em] uppercase text-ink-mute mb-2.5">
            Ask next
          </p>
          <div className="flex flex-wrap gap-2">
            {followups.map((f) => (
              <button
                key={f}
                onClick={() => onAsk(f)}
                className="text-[13px] text-ink-soft border border-rule rounded-full px-3.5 py-1.5 hover:text-tape hover:border-tape hover:bg-tape/[0.05] transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center gap-4 flex-wrap">
        {sources.length > 0 && (
          <button
            onClick={() => setOpen(!open)}
            className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-mute hover:text-tape transition-colors flex items-center gap-2"
          >
            <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>›</span>
            {open ? 'Hide' : 'Show'} the {sources.length} sections this drew on
          </button>
        )}

        <button
          onClick={copy}
          className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-mute hover:text-tape transition-colors"
        >
          {copied ? 'Copied' : 'Copy answer'}
        </button>

        {at && (
          <span className="font-mono text-[10px] tracking-[0.09em] text-ink-mute/70 ml-auto">
            {at}
          </span>
        )}
      </div>

      {open && sources.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-mute">
              {sources.length} sections · {actCount} act{actCount === 1 ? '' : 's'} · searched 1,565
            </span>
            <span className="flex-1 h-px bg-rule" />
          </div>

          <div className="flex flex-col gap-2">
            {sources.map((s, i) => (
              <details
                key={i}
                className="group border-l-2 border-rule hover:border-tape transition-colors pl-4 py-1"
              >
                <summary className="cursor-pointer list-none flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-mono text-[11px] text-tape">{s.section}</span>
                    <span className="text-[13.5px] text-ink-soft ml-2">{s.title}</span>
                  </span>
                  <span className="font-mono text-[10px] text-ink-mute shrink-0">
                    {s.similarity}%
                  </span>
                </summary>
                <p className="mt-2.5 text-[13px] leading-[1.7] text-ink-soft whitespace-pre-wrap bg-raised border border-rule rounded-[2px] px-3.5 py-3">
                  {s.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}