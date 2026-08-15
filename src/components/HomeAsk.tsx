'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CHIPS = [
  'Deposit not returned',
  'UPI scam',
  'Stipend unpaid',
  "Police won't file FIR",
]

export default function HomeAsk() {
  const [value, setValue] = useState('')
  const router = useRouter()

  function go(text: string) {
    const q = text.trim()
    if (!q) return
    router.push(`/ask?q=${encodeURIComponent(q)}`)
  }

  return (
    <div>
      <div className="flex gap-2 items-end bg-raised border border-ink rounded-[3px] pl-4 pr-1.5 py-1.5 w-full max-w-[512px] shadow-[4px_5px_0_rgba(21,24,28,0.08)] focus-within:shadow-[5px_6px_0_var(--color-tape)] focus-within:-translate-x-px focus-within:-translate-y-px transition-all"></div><div className="flex gap-2 items-end bg-raised border border-ink rounded-[3px] pl-4 pr-1.5 py-1.5 w-full max-w-[512px] shadow-[4px_5px_0_rgba(21,24,28,0.08)] focus-within:shadow-[5px_6px_0_var(--color-tape)] focus-within:-translate-x-px focus-within:-translate-y-px transition-all">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              go(value)
            }
          }}
          placeholder="My landlord won't return my deposit…"
          className="flex-1 bg-transparent outline-none resize-none py-3 text-[15px] max-h-[118px]"
        />
        <button
          onClick={() => go(value)}
          className="group relative overflow-hidden bg-ink text-paper rounded-[2px] px-5 py-3 text-[14px] font-medium shrink-0"
        >
          <span className="relative z-10">Ask Saathi</span>
          <span className="absolute inset-0 bg-tape translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3.5 w-full max-w-[512px]">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => go(c)}
            className="text-[12.5px] text-ink-soft border border-rule rounded-full px-3.5 py-1.5 hover:text-tape hover:border-tape hover:bg-tape/[0.06] transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}