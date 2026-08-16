import Link from 'next/link'

export const metadata = {
  title: 'Seller won\u2019t refund you — what the law says | LegalSaathi',
  description:
    'Refunds refused, defective goods, warranty dodged. Your rights under the Consumer Protection Act 2019 and how to enforce them cheaply.',
}

const ASK = (q: string) => `/ask?q=${encodeURIComponent(q)}`

export default function ConsumerGuide() {
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
              CPA 2019
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
            When a seller<br />
            <em className="italic text-tape">won&apos;t make it right.</em>
          </h1>
          <p className="text-[16.5px] leading-[1.7] text-ink-soft">
            Most people give up on a refund somewhere around the fourth ignored
            email, on the assumption that the alternative is a lawyer and a year of
            court. It isn&apos;t. The consumer route in India is deliberately cheap,
            deliberately lawyer-optional, and most disputes end long before a
            commission sees them.
          </p>
        </div>

        <div className="border-2 border-ink rounded-[3px] px-6 sm:px-7 py-6 mb-12 bg-raised">
          <p className="font-mono text-[10px] tracking-[0.13em] uppercase text-tape mb-3">
            The leverage you actually have
          </p>
          <p className="font-serif text-[24px] sm:text-[27px] leading-[1.25] mb-3">
            Almost nobody escalates. That&apos;s <em className="italic text-tape">why</em>{' '}
            they ignore you.
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            A support agent declining a refund is playing the odds. A written notice
            that names the Act and states a deadline changes the calculation, because
            defending a consumer complaint costs the company far more than your
            refund does.
          </p>
        </div>

        <Section n="01" title="What the Act gives you">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            The Consumer Protection Act, 2019 covers goods and services, including
            anything bought online. Three provisions do most of the work:
          </p>

          <div className="flex flex-col gap-px bg-rule border-y border-rule mb-6">
            <Fact
              k="s.2"
              v="Defines unfair trade practice — which includes refusing to take back defective goods and refund the money within the stated period, or within thirty days where no period is stated."
            />
            <Fact
              k="s.35"
              v="Who can file a complaint with the District Commission — including the consumer directly, in their own name, and electronically."
            />
            <Fact
              k="s.39"
              v="What the Commission can order: refund, replacement, removal of the defect, and compensation for loss."
            />
            <Fact
              k="s.83"
              v="Product liability — a separate action against the manufacturer, seller, or service provider where a defective product caused you harm or loss."
            />
          </div>

          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Ask Saathi any of these and it will show you the actual statutory text
            rather than this summary of it.
          </p>

          <AskRow
            items={[
              'What can a consumer commission order the seller to do?',
              'Do I need a lawyer to file a consumer complaint?',
              'What counts as an unfair trade practice?',
            ]}
          />
        </Section>

        <Section n="02" title="Do these, in this order">
          <Ordered
            items={[
              {
                h: 'Get it in writing, from them',
                p: 'Move the conversation to email or in-app chat you can export. A recorded refusal is worth more than five phone calls. If they only refuse verbally, email them summarising what was said and ask them to confirm.',
              },
              {
                h: 'Send a notice with a deadline',
                p: 'Not a complaint — a notice. State what you bought, when, what is wrong, what you want, and by when. Fourteen days is reasonable. Mention the Consumer Protection Act, 2019. Send it by email and by registered post.',
              },
              {
                h: 'Call the National Consumer Helpline on 1915',
                p: 'Free, many languages, 8am to 8pm. The counsellor takes it up with the company directly, and a large share of disputes end here without going any further.',
              },
              {
                h: 'File online through E-Jagriti',
                p: 'The consumer commission\u2019s filing portal, which replaced e-Daakhil in January 2025. You can file yourself. Fees are low and scale with the value of the claim.',
              },
            ]}
          />
        </Section>

        <Section n="03" title="Which commission, and what it costs">
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Which forum hears your complaint depends on the value of the goods or
            services paid for. District first, then State, then National, with
            thresholds set by the Act and revised from time to time.
          </p>
          <p className="text-[15px] leading-[1.74] text-ink-soft mb-5">
            Rather than print numbers that go stale, ask Saathi — it reads the current
            text and will tell you which commission your claim falls into, and what a
            claim of your size costs to file.
          </p>

          <AskRow
            items={[
              'Which consumer commission should I file in for a claim of my size?',
              'How much does it cost to file a consumer complaint?',
              'How long do I have to file a consumer complaint?',
            ]}
          />

          <div className="mt-6 border-l-2 border-brass bg-brass/[0.07] pl-4 py-3">
            <p className="text-[14.5px] leading-[1.7] text-ink-soft">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-brass block mb-1">
                Worth knowing
              </span>
              Consumer complaints have a limitation period. Miss it and the claim is
              gone regardless of how strong it was. If your purchase is more than a
              year old, check the deadline before anything else.
            </p>
          </div>
        </Section>

        <Section n="04" title="What makes a complaint work">
          <div className="flex flex-col gap-px bg-rule border-y border-rule">
            <Fact
              k="The invoice"
              v="Bill, order confirmation, payment reference. Without proof of purchase everything else is harder."
            />
            <Fact
              k="Proof of the defect"
              v="Photos, video, a service centre report. Something dated that shows the problem is real."
            />
            <Fact
              k="The refusal"
              v="Their email, chat log, or ticket saying no. This is the piece most people fail to capture, and it is the one that matters most."
            />
            <Fact
              k="A clean timeline"
              v="Bought on this date, reported on that date, refused on this date, notice sent on that one. Commissions read timelines quickly."
            />
          </div>
        </Section>

        <div className="mt-14 bg-ink text-paper rounded-[3px] px-7 sm:px-9 py-8">
          <h3 className="font-serif text-[25px] leading-[1.18] mb-2.5">
            Tell Saathi what you bought and what went wrong.
          </h3>
          <p className="text-[15px] leading-[1.7] text-paper/[0.66] mb-6 max-w-[520px]">
            It will find the provisions that apply to your purchase, show you the
            statutory text, and tell you which commission it belongs in.
          </p>
          <Link
            href={ASK('A seller is refusing to refund a defective product I bought')}
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
            If it was a scam, not a seller →
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