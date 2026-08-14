import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, title, created_at, updated_at')
    .order('updated_at', { ascending: false })

  const cases = conversations ?? []

  return (
    <div className="min-h-screen">
      <header className="border-b border-rule">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
          <Link
            href="/ask"
            className="bg-ink text-paper rounded-[2px] px-4 py-2 text-[14px] font-medium hover:bg-tape transition-colors"
          >
            New case
          </Link>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-14">
        <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
          § Your cases
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight mb-2">
          Everything you&apos;ve asked.
        </h1>
        <p className="text-ink-soft mb-12">
          {cases.length === 0
            ? 'Nothing filed yet.'
            : `${cases.length} case${cases.length === 1 ? '' : 's'} on record.`}
        </p>

        {cases.length === 0 ? (
          <div className="border border-dashed border-rule rounded-[3px] p-12 text-center">
            <p className="text-ink-mute mb-5 text-[15px]">
              Your conversations will be filed here.
            </p>
            <Link
              href="/ask"
              className="inline-block bg-ink text-paper rounded-[2px] px-5 py-2.5 text-[14px] font-medium hover:bg-tape transition-colors"
            >
              Ask your first question
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/ask/${c.id}`}
                className="group relative bg-raised border border-rule rounded-[3px] pl-7 pr-5 py-5 hover:border-ink hover:shadow-[5px_6px_0_rgba(21,24,28,0.09)] hover:-translate-y-1 transition-all"
              >
                {/* the tape binding the file */}
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-tape/70 group-hover:bg-tape transition-colors" />

                <p className="font-mono text-[10px] tracking-[0.09em] uppercase text-ink-mute mb-3">
                  Filed{' '}
                  {new Date(c.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="font-serif text-[19px] leading-snug mb-3 line-clamp-2">
                  {c.title}
                </p>
                <p className="font-mono text-[10px] tracking-[0.09em] uppercase text-tape opacity-0 group-hover:opacity-100 transition-opacity">
                  Open file →
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}