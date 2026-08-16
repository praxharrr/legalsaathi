import Link from 'next/link'

export const metadata = {
  title: 'Police won\u2019t file your FIR — what to do | LegalSaathi',
  description:
    'FIR refusal, zero-FIR, and your rights if arrested. What the law requires of the police, and how to escalate.',
}

const ASK = (q: string) => `/ask?q=${encodeURIComponent(q)}`

export default function PoliceFirGuide() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rule sticky top-0 z-50 bg-paper/85 backdrop-blur">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
          <Link
            href="/ask"
            className="bg-ink text-paper rounded-[2px] px-4 py-2 text-[14px] font-medium hover:bg-tape transition-colors"
          >
            Ask Saathi
          </Link>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-5 sm:px-6 py-10 sm:py-14 pb-24">
        <Link
          href="/rights"
          className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-mute hover:text-tape transition-colors"
        >
          ← Rights library
        </Link>

        <div className="mt-7 mb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4">
            <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-tape border border-tape/30 bg-tape/[0.06] rounded-[2px] px-2 py-0.5">
              BNSS 2023
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              7 min read
            </span>
            <span className="w-1 h-1 rounded-full bg-rule" />
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              Verified 15 Aug 2026
            </span>
          </div>

          <h1 className="font-serif text-[clamp(32px,5vw,46px)] leading-[1.05] tracking-[-0.02em] mb-4">
            When the police<br />
            <em className="italic text-tape">won&apos;t write it down.</em>
          </h1>
          <p className="text-[16.5px] leading-[1.7] text-ink-soft">
            Registering an FIR for a cognizable offence is not a favour the police
            grant. It is something the law requires of them. Most people who get
            turned away at the desk assume that was the end of it — it isn&apos;t,
            and the routes around it are simpler than they look.
          </p>
        </div>

        {/* the one-line box */}
        <div className="border-2 border-ink rounded-[3px] px-6 sm:px-7 py-6 mb-12 bg-raised">
          <p className="font-mono text-[10px] tracking-[0.13em] uppercase text-tape mb-3">
            The thing most people don&apos;t know
          </p>
          <p className="font-serif text-[24px] sm:text-[27px] leading-[1.25] mb-3">
            A zero-FIR can be filed at <em className="italic text-tape">any</em> police
            station.
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            It does not matter where the offence happened. A station cannot turn you
            away for being outside its jurisdiction — it registers the complaint and
            transfers it to the right one. If you are being sent from station to
            station, this is the sentence that ends it.
          </p>
        </div>

        <Section n="01" title="At the station, in the moment">
          <Ordered
            items={[
              {
                h: 'Write your complaint before you go',
                p: 'Two copies, plain language, dated. What happened, when, where, who. A written complaint is much harder to wave away than a spoken one, and you keep a copy.',
              },
              {
                h: 'Ask for the receiving stamp',
                p: 'When you hand it over, ask them to stamp and sign your second copy. That acknowledgement is proof you were there and when.',
              },
              {
                h: 'If they refuse, ask for the refusal in writing',
                p: 'Very few officers will write down that they refused to register a cognizable offence. Asking often changes the outcome on the spot.',
              },
              {
                h: 'Note the details',
                p: 'The officer\u2019s name, rank, the time, the station. Not to threaten anyone — because every escalation route asks for exactly this.',
              },
            ]}
          />
        </Section>

        <Section n="02" title="If they still won't register it">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            There is a ladder, and each rung is cheap. You do not need a lawyer to
            start climbing it.
          </p>
          <Ordered
            items={[
              {
                h: 'Send it to the Superintendent of Police',
                p: 'By registered post, with your original complaint attached. Keep the postal receipt. This creates a dated record outside the station that turned you away.',
              },
              {
                h: 'Approach a Magistrate',
                p: 'A Magistrate can direct the police to investigate. This is the route the law provides precisely for when the station refuses, and it is the strongest of the three.',
              },
              {
                h: 'Use free legal aid to do it properly',
                p: 'The District Legal Services Authority will help you draft and file at no cost. Call 15100. Most people qualify, and nobody checks whether you could have afforded a lawyer.',
              },
            ]}
          />

          <div className="mt-6">
            <AskRow
              items={[
                'The police refused to register my FIR for a theft',
                'How do I approach a Magistrate when the police won\u2019t investigate?',
                'What is a zero-FIR and how do I ask for one?',
              ]}
            />
          </div>
        </Section>

        <Section n="03" title="If you are the one being arrested">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Different situation, and the rights that matter are the ones you can
            exercise in the first hour.
          </p>

          <div className="flex flex-col gap-px bg-rule border-y border-rule mb-6">
            <Fact
              k="To know why"
              v="You are entitled to be told the grounds of arrest. Not a vague reason — the actual grounds."
            />
            <Fact
              k="To inform someone"
              v="A relative or friend must be able to be told where you are. This is not a courtesy; it is a safeguard against people disappearing into custody."
            />
            <Fact
              k="To a lawyer"
              v="Including a free one. If you cannot arrange a lawyer, legal aid is supposed to be arranged for you."
            />
            <Fact
              k="To be produced before a Magistrate"
              v="Within a fixed time. Being held beyond it without production is unlawful."
            />
            <Fact
              k="To medical examination"
              v="A protection against custodial mistreatment, and worth exercising if anything happens."
            />
          </div>

          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            The exact provisions and timelines are in the Bharatiya Nagarik Suraksha
            Sanhita, which replaced the CrPC in 2024 — most guidance online still
            cites the old sections. Ask Saathi and it will show you the current text.
          </p>

          <AskRow
            items={[
              'What are my rights if the police arrest me?',
              'How long can the police hold me before producing me in court?',
            ]}
          />
        </Section>

        <Section n="04" title="Things worth being realistic about">
          <div className="flex flex-col gap-px bg-rule border-y border-rule">
            <Fact
              k="Written beats spoken"
              v="Every rung of the ladder runs on paper. A complaint you can produce with a date on it is worth more than the most convincing account of a conversation."
            />
            <Fact
              k="Politeness is tactical"
              v="Not a moral point. An officer who feels accused becomes an obstacle; one who is asked calmly for a stamped copy usually gives it."
            />
            <Fact
              k="Legal aid is underused"
              v="The DLSA exists in every district and is chronically underused because people assume it is not for them. It is."
            />
            <Fact
              k="Some matters need a lawyer now"
              v="Anything involving violence, a child, or a threat to your safety should not be worked through a website. Call 112, then 15100."
            />
          </div>
        </Section>

        <div className="mt-14 bg-ink text-paper rounded-[3px] px-7 sm:px-9 py-8">
          <h3 className="font-serif text-[25px] leading-[1.18] mb-2.5">
            Tell Saathi what the station said.
          </h3>
          <p className="text-[15px] leading-[1.7] text-paper/[0.66] mb-6 max-w-[520px]">
            It will find the provisions that apply, show you the statutory text they
            came from, and tell you which rung of the ladder to start on.
          </p>
          <Link
            href={ASK('The police are refusing to register my FIR')}
            className="inline-block bg-paper text-ink rounded-[2px] px-6 py-3 text-[14.5px] font-medium hover:bg-brass transition-colors"
          >
            Start with my situation
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/help" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            All helplines →
          </Link>
          <Link href="/rights/online-fraud" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            If it was online fraud →
          </Link>
          <Link href="/rights" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            Rights library →
          </Link>
        </div>
      </main>
    </div>
  )
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-[11px] text-tape shrink-0">§ {n}</span>
        <h2 className="font-serif text-[27px] leading-tight tracking-[-0.015em]">{title}</h2>
      </div>
      <div className="sm:pl-[3.1rem]">{children}</div>
    </section>
  )
}

function Ordered({ items }: { items: { h: string; p: string }[] }) {
  return (
    <ol className="flex flex-col gap-5">
      {items.map((it, i) => (
        <li key={it.h} className="flex gap-4">
          <span className="font-mono text-[11px] text-tape pt-1 shrink-0 w-5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-serif text-[19px] leading-snug mb-1">{it.h}</p>
            <p className="text-[14.5px] leading-[1.72] text-ink-soft">{it.p}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function AskRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-px bg-rule border-y border-rule">
      {items.map((q) => (
        <Link
          key={q}
          href={ASK(q)}
          className="group bg-paper hover:bg-raised transition-colors px-3.5 py-2.5 flex items-center justify-between gap-4"
        >
          <span className="text-[14px] text-ink-soft group-hover:text-ink transition-colors">
            &ldquo;{q}&rdquo;
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-tape opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            Ask this →
          </span>
        </Link>
      ))}
    </div>
  )
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-paper px-4 py-3.5 grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-5">
      <span className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-tape sm:pt-1">
        {k}
      </span>
      <span className="text-[14.5px] leading-[1.7] text-ink-soft">{v}</span>
    </div>
  )
}