'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import PaperStack from '@/components/PaperStack'
import { signup, type AuthState } from '../actions'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(signup, null)

  return (
    <main className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* form */}
      <div className="relative grid place-items-center px-6 py-14 sm:py-16">
        {/* margin rule, like a ruled page */}
        <span className="hidden sm:block absolute left-[max(2.5rem,calc(50%-15rem))] top-0 bottom-0 w-px bg-tape/20" />

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
          <p className="text-ink-soft text-[15px] mb-8">Free to ask. Always.</p>

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
            <Link
              href="/login"
              className="text-tape border-b border-tape/40 hover:border-tape"
            >
              Sign in
            </Link>
          </p>
        </div>

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
            What you get
          </p>
          <p className="font-serif text-[30px] leading-[1.2] text-paper mb-4">
            Every answer carries<br />
            the <em className="italic text-brass">section</em> it came from.
          </p>
          <p className="text-[14.5px] leading-[1.7] text-paper/[0.6] max-w-[420px]">
            1,565 sections of Indian statute, indexed from India Code. Saathi cites
            what it can read and says so plainly when your question falls outside it.
          </p>
        </div>
      </div>
    </main>
  )
}