'use client'

import { signOut } from '@/app/(auth)/actions'

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft hover:text-tape transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}