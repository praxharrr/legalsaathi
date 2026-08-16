'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Node = {
  q: string
  options: { label: string; next?: string; go?: string; ask?: string }[]
}

const TREE: Record<string, Node> = {
  start: {
    q: 'What happened?',
    options: [
      { label: 'I lost money', next: 'money' },
      { label: 'Someone won\u2019t give me what I paid for', go: '/rights/consumer' },
      { label: 'I\u2019m being pressured to sign something', go: '/rights/bonds' },
      { label: 'I need something on record', next: 'record' },
    ],
  },
  money: {
    q: 'How did the money leave you?',
    options: [
      { label: 'Online — UPI, card, transfer', go: '/rights/online-fraud' },
      { label: 'I paid a seller who didn\u2019t deliver', go: '/rights/consumer' },
      { label: 'An employer is withholding it', ask: 'My employer is withholding money that is owed to me' },
      { label: 'A landlord kept my deposit', ask: 'My landlord kept my security deposit and won\u2019t return it' },
    ],
  },
  record: {
    q: 'On record with whom?',
    options: [
      { label: 'The police won\u2019t take my complaint', go: '/rights/police-fir' },
      { label: 'A government office won\u2019t give me information', ask: 'How do I file an RTI to get information from a government office?' },
      { label: 'I want to send a legal notice', ask: 'How do I send a legal notice, and what should it say?' },
    ],
  },
}

export default function Triage() {
  const [nodeKey, setNodeKey] = useState('start')
  const [trail, setTrail] = useState<string[]>([])
  const router = useRouter()

  const node = TREE[nodeKey]

  function choose(o: Node['options'][number]) {
    if (o.go) return router.push(o.go)
    if (o.ask) return router.push(`/ask?q=${encodeURIComponent(o.ask)}`)
    if (o.next) {
      setTrail([...trail, o.label])
      setNodeKey(o.next)
    }
  }

  function reset() {
    setTrail([])
    setNodeKey('start')
  }

  return (
    <div className="border border-ink rounded-[3px] bg-raised shadow-[5px_6px_0_rgba(21,24,28,0.07)]">
      <div className="flex items-center gap-4 px-5 sm:px-7 py-3.5 border-b border-rule">
        <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-tape">
          Not sure where you fit?
        </span>
        <span className="flex-1 h-px bg-rule" />
        {trail.length > 0 && (
          <button
            onClick={reset}
            className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-ink-mute hover:text-tape transition-colors"
          >
            Start over
          </button>
        )}
      </div>

      <div className="px-5 sm:px-7 py-6">
        {trail.length > 0 && (
          <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute mb-3">
            {trail.join(' → ')}
          </p>
        )}

        <h3 className="font-serif text-[25px] sm:text-[28px] leading-tight mb-5">
          {node.q}
        </h3>

        <div className="flex flex-col gap-px bg-rule border-y border-rule">
          {node.options.map((o) => (
            <button
              key={o.label}
              onClick={() => choose(o)}
              className="group bg-raised hover:bg-paper transition-colors text-left px-4 py-3.5 flex items-center justify-between gap-4"
            >
              <span className="text-[15px] text-ink-soft group-hover:text-ink transition-colors">
                {o.label}
              </span>
              <span className="font-mono text-[10px] text-tape opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all shrink-0">
                →
              </span>
            </button>
          ))}
        </div>

        <p className="text-[12.5px] text-ink-mute mt-4">
          None of these? Just{' '}
          <button
            onClick={() => router.push('/ask')}
            className="text-tape border-b border-tape/40 hover:border-tape"
          >
            describe it in your own words
          </button>
          .
        </p>
      </div>
    </div>
  )
}