'use client'

import { useActionState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PaperStack from '@/components/PaperStack'
import { login, type AuthState } from '../actions'

function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(login, null)
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')

  return (
    <div className="w-full max-w-[400px]">
      <Link href="/" className="flex items-center gap-3 mb-10">
        <span className="w-6 h-6 rounded-full border-[1.5px] border-tape" />
        <span className="font-serif text-2xl">
          Legal<em className="italic text-tape">Saathi</em>
        </span>
      </Link>

      <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
        § Sign in
      </p>
      <h1 className="font-serif text-4xl leading-[1.05] tracking-tight mb-2">
        Welcome back.
      </h1>
      <p className="text-ink-soft text-[15px] mb-8">
        Your saved cases and drafts are waiting.
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
            autoComplete="current-password"
            className="w-full bg-raised border border-ink rounded-[3px] px-4 py-3 text-[15px] outline-none focus:shadow-[4px_5px_0_var(--color-tape)] transition-shadow"
          />
        </div>

        {urlError && (
          <p className="text-[13px] text-tape border-l-2 border-tape pl-3 py-1">
            {urlError}
          </p>
        )}

        {state?.error && (
          <p className="text-[13px] text-tape border-l-2 border-tape pl-3 py-1">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-ink text-paper rounded-[2px] px-6 py-3.5 text-[15px] font-medium mt-2 hover:bg-tape transition-colors disabled:opacity-50"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-[14px] text-ink-soft mt-8">
        New here?{' '}
        <Link href="/signup" className="text-tape border-b border-tape/40 hover:border-tape">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      <div className="relative grid place-items-center px-6 py-14 sm:py-16">
        {/* margin rule, like a ruled page */}
        <span className="hidden sm:block absolute left-[max(2.5rem,calc(50%-15rem))] top-0 bottom-0 w-px bg-tape/20" />

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-[400px] mx-auto flex items-center gap-4">
            <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-mute">
              Legal information, not advice
            </span>
            <span className="flex-1 h-px bg-rule" />
            <Link
              href="/help"
              className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-mute hover:text-tape transition-colors"
            >
              Helplines →
            </Link>
          </div>
        </div>
      </div>

      {/* 3D panel — desktop only */}
      <div className="hidden lg:flex flex-col justify-center bg-ink relative overflow-hidden">
        <div className="h-[52%] w-full">
          <PaperStack />
        </div>

        <div className="px-14 pb-4">
          <p className="font-mono text-[10px] tracking-[0.13em] uppercase text-brass mb-4">
            Since you were last here
          </p>
          <p className="font-serif text-[30px] leading-[1.2] text-paper mb-4">
            Seven acts.<br />
            <em className="italic text-brass">1,565</em> sections.
          </p>
          <p className="text-[14.5px] leading-[1.7] text-paper/[0.6] max-w-[420px]">
            Consumer, criminal, police procedure, cyber, contract, RTI, and property
            — indexed section by section from India Code.
          </p>
        </div>
      </div>
    </main>
  )
}