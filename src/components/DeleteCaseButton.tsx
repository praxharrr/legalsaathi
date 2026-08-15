'use client'

import { useState } from 'react'
import { deleteConversation } from '@/app/dashboard/actions'

export default function DeleteCaseButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          setConfirming(true)
        }}
        className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-ink-mute hover:text-tape transition-colors"
      >
        Delete
      </button>
    )
  }

  return (
    <span className="flex items-center gap-3">
      <form action={deleteConversation}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-tape hover:opacity-70 transition-opacity"
        >
          Confirm
        </button>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault()
          setConfirming(false)
        }}
        className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-ink-mute hover:text-ink transition-colors"
      >
        Cancel
      </button>
    </span>
  )
}