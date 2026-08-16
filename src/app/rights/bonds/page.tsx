import Link from 'next/link'

export const metadata = {
  title: 'Employment bonds and unfair clauses | LegalSaathi',
  description:
    'Two-year bonds, notice-period penalties, withheld certificates. What holds up in India, and what doesn\u2019t.',
}

const ASK = (q: string) => `/ask?q=${encodeURIComponent(q)}`

export default function BondsGuide() {
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
              Contract Act 1872
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              6 min read
            </span>
            <span className="w-1 h-1 rounded-full bg-rule" />
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              Verified 15 Aug 2026
            </span>
          </div>

          <h1 className="font-serif text-[clamp(32px,5vw,46px)] leading-[1.05] tracking-[-0.02em] mb-4">
            When a contract is<br />
            <em className="italic text-tape">used to trap you.</em>
          </h1>
          <p className="text-[16.5px] leading-[1.7] text-ink-soft">
            A signed document is not automatically an enforceable one. Indian
            contract law places real limits on what a party can bind you to, and a
            fair amount of what gets put in front of first-jobbers and tenants sits
            close to those limits — or past them.
          </p>
        </div>

        <div className="border-2 border-ink rounded-[3px] px-6 sm:px-7 py-6 mb-12 bg-raised">
          <p className="font-mono text-[10px] tracking-[0.13em] uppercase text-tape mb-3">
            The distinction that matters
          </p>
          <p className="font-serif text-[24px] sm:text-[27px] leading-[1.25] mb-3">
            Enforceable is not the same as{' '}
            <em className="italic text-tape">enforced.</em>
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Most one-sided clauses are never tested, because the person they&apos;re
            aimed at assumes they hold and complies. The threat does the work. Knowing
            where the actual line sits changes what you agree to — and whether a
            demand letter frightens you.
          </p>
        </div>

        <Section n="01" title="Employment bonds">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            You&apos;ll read online that employment bonds are simply void in India.
            That&apos;s too neat. The real position is that Indian law is hostile to
            agreements that restrain a person from practising their trade, but a bond
            can survive where it compensates a genuine, demonstrable cost the employer
            actually incurred — real training, a paid certification, a relocation they
            funded.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            What tends not to survive is a round-number penalty bearing no relation to
            any cost — a two lakh figure attached to a job with a week of onboarding.
            Courts look at whether the amount is compensation or a deterrent dressed up
            as one.
          </p>

          <div className="flex flex-col gap-px bg-rule border-y border-rule mb-6">
            <Fact
              k="Looks weaker"
              v="A flat penalty with no stated basis. No actual training given. A duration that far outlasts anything the employer spent on you."
            />
            <Fact
              k="Looks stronger"
              v="Documented, costly training the company paid for. An amount that tracks that cost. A period proportionate to it."
            />
            <Fact
              k="Separate question"
              v="Whether they can stop you working elsewhere at all — restraint after employment ends is treated very differently from recovering a cost."
            />
          </div>

          <AskRow
            items={[
              'My company wants me to sign a two-year bond with a penalty',
              'Can my employer stop me from joining a competitor after I resign?',
              'They want me to pay for training I never actually received',
            ]}
          />
        </Section>

        <Section n="02" title="Withheld certificates and documents">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            Holding your original degree certificate, marksheets, or experience letter
            to stop you leaving is common and it is a much weaker position than
            employers act like it is. Your educational documents are your property. A
            company keeping them as leverage is not exercising a contractual right —
            it is holding something that belongs to you.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            A written demand naming the documents and setting a deadline is usually
            enough, because the position is hard to defend once it is put in writing.
          </p>

          <AskRow
            items={[
              'My employer is refusing to return my original certificates',
              'Can a company withhold my experience letter or relieving letter?',
            ]}
          />
        </Section>

        <Section n="03" title="Notice periods and buyouts">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            A notice period is a term like any other, and so is a buyout. The
            questions worth asking are whether the amount reflects an actual loss,
            whether the contract sets it out clearly, and whether the obligation runs
            both ways — a contract that lets the company terminate you immediately
            while binding you for three months is asymmetric, and asymmetry matters.
          </p>

          <AskRow
            items={[
              'My employer wants three months\u2019 salary as notice-period buyout',
              'Can a company hold my final settlement until I serve notice?',
            ]}
          />
        </Section>

        <Section n="04" title="Rental agreements">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            The same logic applies to what landlords put in a lease. A printed clause
            is not self-executing — a term allowing forfeiture of an entire deposit for
            any reason, or entry without notice, or eviction without process, is a term
            that has to survive scrutiny like any other.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            One honest limitation: tenancy in India is largely state law, and Saathi
            currently holds central statutes only. It will tell you plainly when your
            question needs your state&apos;s rent act, rather than guessing.
          </p>

          <AskRow
            items={[
              'My rental agreement says the landlord can keep my whole deposit',
              'Can my landlord lock me out or enter without notice?',
            ]}
          />
        </Section>

        <Section n="05" title="Before you sign anything">
          <div className="flex flex-col gap-px bg-rule border-y border-rule">
            <Fact
              k="Ask for it in advance"
              v="Anyone refusing to share a contract before your start date is telling you something. A day to read it is a normal request."
            />
            <Fact
              k="Find the exit"
              v="Read the termination, penalty, and notice clauses first. That is where the asymmetry lives, not in the salary section."
            />
            <Fact
              k="Question round numbers"
              v="A penalty that is a clean figure with no stated basis is usually a deterrent, not a calculation."
            />
            <Fact
              k="Keep your own copy"
              v="Signed, dated, every page. A surprising number of disputes turn on the employee not having the document at all."
            />
            <Fact
              k="Negotiating is normal"
              v="Asking to strike or soften a clause is ordinary practice, and being told it is non-negotiable is itself information about the employer."
            />
          </div>
        </Section>

        <div className="mt-14 bg-ink text-paper rounded-[3px] px-7 sm:px-9 py-8">
          <h3 className="font-serif text-[25px] leading-[1.18] mb-2.5">
            Read the clause to Saathi.
          </h3>
          <p className="text-[15px] leading-[1.7] text-paper/[0.66] mb-6 max-w-[520px]">
            Describe what the contract actually says and it will find the provisions
            that bear on it, show you the statutory text, and tell you plainly when
            the answer depends on facts only a lawyer can weigh.
          </p>
          <Link
            href={ASK('My company wants me to sign a two-year employment bond. Is it enforceable?')}
            className="inline-block bg-paper text-ink rounded-[2px] px-6 py-3 text-[14.5px] font-medium hover:bg-brass transition-colors"
          >
            Start with my situation
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/help" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            All helplines →
          </Link>
          <Link href="/rights/consumer" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            If it&apos;s a purchase, not a contract →
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