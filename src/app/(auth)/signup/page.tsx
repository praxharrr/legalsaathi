'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup, type AuthState } from '../actions'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(signup, null)

  return (
    <main className="min-h-screen grid place-items-center px-6 py-16">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <span className="w-6 h-6 rounded-full border-[1.5px] border-tape" />
          <span className="font-serif text-2xl">
            Legal<em className="italic text-tape">Saathi</em>
          </span>
        </Link>

        <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
          § Create account
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight mb-2">
          Know where you stand.
        </h1>
        <p className="text-ink-soft text-[15px] mb-8">
          Free to ask. Always.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-raised border border-ink rounded-[3px] px-4 py-3 text-[15px] outline-none focus:shadow-[4px_5px_0_var(--color-tape)] transition-shadow"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full bg-raised border border-ink rounded-[3px] px-4 py-3 text-[15px] outline-none focus:shadow-[4px_5px_0_var(--color-tape)] transition-shadow"
            />
            <p className="text-[12px] text-ink-mute mt-2">At least 8 characters.</p>
          </div>

          {state?.error && (
            <p className="text-[13px] text-tape border-l-2 border-tape pl-3 py-1">
              {state.error}
            </p>
          )}

          {state?.message && (
            <p className="text-[13px] text-sage border-l-2 border-sage pl-3 py-1">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-ink text-paper rounded-[2px] px-6 py-3.5 text-[15px] font-medium mt-2 hover:bg-tape transition-colors disabled:opacity-50"
          >
            {pending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-[12.5px] text-ink-mute mt-6 leading-relaxed">
          LegalSaathi gives legal information, not legal advice. It isn&apos;t a
          substitute for a lawyer.
        </p>

        <p className="text-[14px] text-ink-soft mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-tape border-b border-tape/40 hover:border-tape">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}