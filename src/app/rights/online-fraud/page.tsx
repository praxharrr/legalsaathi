import Link from 'next/link'

export const metadata = {
  title: 'Money stolen online — what to do first | LegalSaathi',
  description:
    'UPI scams, fake job offers, sextortion. What to do in the first hour, how to report, and what the law says.',
}

const ASK = (q: string) => `/ask?q=${encodeURIComponent(q)}`

export default function OnlineFraudGuide() {
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
              IT Act 2000
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              5 min read
            </span>
            <span className="w-1 h-1 rounded-full bg-rule" />
            <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
              Verified 15 Aug 2026
            </span>
          </div>

          <h1 className="font-serif text-[clamp(32px,5vw,46px)] leading-[1.05] tracking-[-0.02em] mb-4">
            When the money is<br />
            <em className="italic text-tape">already gone.</em>
          </h1>
          <p className="text-[16.5px] leading-[1.7] text-ink-soft">
            Fraudulent transfers can sometimes be frozen before the money moves on
            through the chain of accounts. That window is short. Almost everything
            people instinctively do first — messaging the scammer, waiting to see if
            it reverses, posting about it — spends the window instead of using it.
          </p>
        </div>

        {/* the urgent box */}
        <div className="border-2 border-tape rounded-[3px] overflow-hidden mb-12">
          <div className="bg-tape px-5 sm:px-7 py-2.5">
            <p className="font-mono text-[10px] tracking-[0.13em] uppercase text-paper">
              If it happened in the last few hours
            </p>
          </div>
          <div className="px-5 sm:px-7 py-6">
            <a href="tel:1930" className="inline-block mb-3 hover:opacity-70 transition-opacity">
              <span className="font-serif text-[52px] leading-none text-tape">1930</span>
            </a>
            <p className="text-[15px] leading-[1.7] text-ink-soft mb-4">
              The national cyber financial fraud helpline. Call it before you do
              anything else. Have ready: the amount, the time, the UPI ID or account
              it went to, and your own transaction reference.
            </p>
            <p className="text-[15px] leading-[1.7] text-ink-soft">
              Then file the written complaint at{' '}
              <span className="font-mono text-[14px] text-tape">cybercrime.gov.in</span>{' '}
              and keep the acknowledgement number. Your bank will ask for it, and so
              will the police.
            </p>
          </div>
        </div>

        {/* steps */}
        <Section n="01" title="Do these, in this order">
          <Ordered
            items={[
              {
                h: 'Call 1930',
                p: 'Before the bank, before the police, before telling anyone. This is the line that can trigger a freeze on the receiving account.',
              },
              {
                h: 'Screenshot everything, then stop replying',
                p: 'The chat, the payment confirmation, the profile, the number, the UPI ID. Scammers delete accounts fast. Once captured, stop engaging — continuing to talk gives them information and gives you nothing.',
              },
              {
                h: 'Tell your bank in writing',
                p: 'Not just a phone call. Email or a written complaint at the branch creates a dated record, which matters for any later liability claim.',
              },
              {
                h: 'File at cybercrime.gov.in',
                p: 'The formal complaint. It generates an acknowledgement number that everything downstream depends on.',
              },
              {
                h: 'Follow up at the cyber cell',
                p: 'An online complaint alone can sit. Visiting the local cyber police station with your acknowledgement number moves it.',
              },
            ]}
          />
        </Section>

        <Section n="02" title="What this counts as, legally">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            Online fraud usually engages two bodies of law at once: the Information
            Technology Act for the electronic element, and criminal law for the
            cheating itself. Which specific provisions apply depends on what actually
            happened — impersonation, unauthorised access, and straightforward
            deception are treated differently.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Rather than list section numbers here, ask Saathi and it will pull the
            actual statutory text for your situation, so you can read the provision
            yourself instead of taking anyone&apos;s word for it.
          </p>

          <AskRow
            items={[
              'Someone impersonated a company and took money from me on UPI',
              'A scammer got into my account and transferred money out',
              'I paid a deposit for a job offer that turned out to be fake',
            ]}
          />
        </Section>

        <Section n="03" title="If it's sextortion">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            A specific and increasingly common version: someone obtains intimate
            images or video, then threatens to send them to your contacts unless you
            pay. It targets students and young professionals heavily.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-4">
            Three things worth knowing. Paying almost never ends it — it establishes
            that you will pay. Reporting is not an admission of anything, and the
            police handle these routinely. And the platforms have takedown processes
            that work faster if you report early.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Call <span className="font-mono text-tape">1930</span>, file at
            cybercrime.gov.in, and do not delete the conversation — it is your
            evidence.
          </p>

          <AskRow
            items={[
              'Someone is threatening to leak my private photos unless I pay',
              'What happens after I report sextortion to the police?',
            ]}
          />
        </Section>

        <Section n="04" title="What actually helps recovery">
          <div className="flex flex-col gap-px bg-rule border-y border-rule">
            <Fact
              k="Speed"
              v="The single biggest factor. Money moves through mule accounts quickly; a freeze only works if it arrives first."
            />
            <Fact
              k="The acknowledgement number"
              v="Every follow-up — bank, police, ombudsman — runs on it. Losing it costs you weeks."
            />
            <Fact
              k="A written trail"
              v="Phone calls leave no record. Email your bank, keep the complaint PDF, note dates and names."
            />
            <Fact
              k="Honest expectations"
              v="Recovery happens, but it is not the norm. Reporting still matters — it builds the case against the account, which is how these networks get shut down."
            />
          </div>
        </Section>

        {/* footer CTA */}
        <div className="mt-14 bg-ink text-paper rounded-[3px] px-7 sm:px-9 py-8">
          <h3 className="font-serif text-[25px] leading-[1.18] mb-2.5">
            Tell Saathi what happened to you.
          </h3>
          <p className="text-[15px] leading-[1.7] text-paper/[0.66] mb-6 max-w-[520px]">
            It will find the provisions that apply to your specific situation, show
            you the statutory text they came from, and tell you where to take it next.
          </p>
          <Link
            href={ASK('I sent money on UPI to someone who turned out to be a scammer')}
            className="inline-block bg-paper text-ink rounded-[2px] px-6 py-3 text-[14.5px] font-medium hover:bg-brass transition-colors"
          >
            Start with my situation
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/help" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            All helplines →
          </Link>
          <Link href="/rights/police-fir" className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors">
            If the police won&apos;t file it →
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