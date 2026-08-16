import Link from 'next/link'
import Triage from '@/components/Triage'

export const metadata = {
  title: 'Know your rights — LegalSaathi',
  description:
    'Plain-language guides to Indian law: consumer refunds, FIR refusal, online fraud, and employment bonds.',
}

const AREAS = [
  {
    n: '01',
    slug: 'consumer',
    tag: 'CPA 2019',
    verified: '15 Aug 2026',
    mins: 6,
    title: 'When a seller won\u2019t make it right',
    blurb:
      'Refunds refused, defective goods, warranty dodged, deliveries that never came. What the Consumer Protection Act actually entitles you to, and the cheapest way to enforce it.',
    symptoms: [
      'The seller won\u2019t refund my defective phone',
      'My order never arrived and support ignores me',
      'They\u2019re refusing warranty on a product still under it',
    ],
  },
  {
    n: '02',
    slug: 'police-fir',
    tag: 'BNSS 2023',
    verified: '15 Aug 2026',
    mins: 7,
    title: 'When the police won\u2019t write it down',
    blurb:
      'Refusing to register an FIR for a cognizable offence is not something the police get to decide. What the law requires of them, and what you do when they ignore it.',
    symptoms: [
      'The police refused to register my FIR',
      'They keep sending me to a different police station',
      'What are my rights if I\u2019m arrested?',
    ],
  },
  {
    n: '03',
    slug: 'online-fraud',
    tag: 'IT Act 2000',
    verified: '15 Aug 2026',
    mins: 5,
    title: 'When the money is already gone',
    blurb:
      'UPI scams, fake job offers, sextortion, account takeovers. The first hour matters more than everything after it, and most people spend it on the wrong things.',
    symptoms: [
      'I sent money on UPI to a scammer',
      'Someone is threatening to leak my photos',
      'I paid for a job offer that turned out to be fake',
    ],
  },
  {
    n: '04',
    slug: 'bonds',
    tag: 'Contract Act 1872',
    verified: '15 Aug 2026',
    mins: 6,
    title: 'When a contract is used to trap you',
    blurb:
      'Two-year employment bonds, notice-period penalties, withheld original documents, rental clauses that look official. Plenty of what gets signed in India is not enforceable.',
    symptoms: [
      'My company wants me to sign a two-year bond',
      'My employer is holding my original certificates',
      'They want three months\u2019 salary as notice-period penalty',
    ],
  },
]

export default function RightsIndex() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rule sticky top-0 z-50 bg-paper/85 backdrop-blur">
        <div className="max-w-[940px] mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-3">
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

      <main className="max-w-[940px] mx-auto px-5 sm:px-6 py-14 sm:py-20 pb-24">
        <div className="mb-16 sm:mb-20">
          <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-tape" />
            Rights library
          </p>
          <h1 className="font-serif text-[clamp(36px,5.6vw,56px)] leading-[1.02] tracking-[-0.022em] mb-5">
            The law, without the<br />
            <em className="italic text-tape">law degree.</em>
          </h1>
          <p className="text-ink-soft text-[16.5px] leading-[1.7] max-w-[540px]">
            Four situations that catch people out constantly. Recognise your problem
            below and Saathi will start on it straight away — or read the full guide
            first.
          </p>
        </div>

        {/* coverage — the receipts */}
        <div className="border border-rule bg-raised rounded-[3px] mb-16 sm:mb-20">
          <div className="flex items-center gap-4 px-5 sm:px-7 pt-5 pb-4">
            <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-ink-mute">
              What Saathi is reading from
            </span>
            <span className="flex-1 h-px bg-rule" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-rule border-y border-rule">
            {[
              { n: '7', l: 'Acts indexed' },
              { n: '1,565', l: 'Sections stored' },
              { n: '100%', l: 'Answers cite a source' },
              { n: '0', l: 'Sections written by AI' },
            ].map((s) => (
              <div key={s.l} className="bg-raised px-5 sm:px-6 py-5">
                <p className="font-serif text-[30px] sm:text-[34px] leading-none text-ink mb-1.5">
                  {s.n}
                </p>
                <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute leading-snug">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-7 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[12.5px] text-ink-soft">
              Scraped section by section from India Code, the government&apos;s own
              repository.
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-ink-mute ml-auto">
              Updated 15 Aug 2026
            </span>
          </div>
        </div>

        {/* triage */}
        <div className="mb-16 sm:mb-20">
          <Triage />
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-ink-mute">
            Contents
          </span>
          <span className="flex-1 h-px bg-rule" />
          <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-ink-mute">
            Four entries
          </span>
        </div>

        <div>
          {AREAS.map((a) => (
            <div
              key={a.slug}
              className="group relative border-b border-rule py-9 sm:py-11"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-tape origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.25,1)]" />

              <div className="sm:pl-8 transition-[padding] duration-500 group-hover:sm:pl-12">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-serif text-[34px] sm:text-[44px] leading-none text-rule group-hover:text-tape transition-colors duration-500 shrink-0 select-none">
                    {a.n}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2.5">
                      <span className="inline-block font-mono text-[9.5px] tracking-[0.1em] uppercase text-tape border border-tape/30 bg-tape/[0.06] rounded-[2px] px-2 py-0.5">
                        {a.tag}
                      </span>
                      <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
                        {a.mins} min read
                      </span>
                      <span className="w-1 h-1 rounded-full bg-rule" />
                      <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
                        Verified {a.verified}
                      </span>
                    </div>

                    <h2 className="font-serif text-[27px] sm:text-[33px] leading-[1.12] tracking-[-0.015em] mb-3">
                      <Link
                        href={`/rights/${a.slug}`}
                        className="hover:text-tape transition-colors"
                      >
                        {a.title}
                      </Link>
                    </h2>

                    <p className="text-[15px] leading-[1.74] text-ink-soft max-w-[600px] mb-5">
                      {a.blurb}
                    </p>

                    {/* symptoms — each opens the chat pre-filled */}
                    <div className="flex flex-col gap-px bg-rule/60 border-y border-rule/60 mb-4 max-w-[600px]">
                      {a.symptoms.map((s) => (
                        <Link
                          key={s}
                          href={`/ask?q=${encodeURIComponent(s)}`}
                          className="group/s bg-paper hover:bg-raised transition-colors px-3.5 py-2.5 flex items-center justify-between gap-4"
                        >
                          <span className="text-[14px] text-ink-soft group-hover/s:text-ink transition-colors">
                            &ldquo;{s}&rdquo;
                          </span>
                          <span className="font-mono text-[9.5px] tracking-[0.09em] uppercase text-tape opacity-0 group-hover/s:opacity-100 transition-opacity shrink-0">
                            Ask this →
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/rights/${a.slug}`}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-tape transition-colors"
                    >
                      Read the full guide →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-ink text-paper rounded-[3px] px-7 sm:px-10 py-8 sm:py-9 grid md:grid-cols-[1fr_auto] gap-7 md:gap-10 items-center">
          <div>
            <h3 className="font-serif text-[26px] leading-[1.18] mb-2.5">
              Your situation isn&apos;t on this list?
            </h3>
            <p className="text-[15px] leading-[1.7] text-paper/[0.66] max-w-[500px]">
              These four are the common ones. Saathi searches seven acts of Indian law
              and tells you plainly when your question falls outside what it has.
            </p>
          </div>
          <Link
            href="/ask"
            className="justify-self-start md:justify-self-end shrink-0 bg-paper text-ink rounded-[2px] px-6 py-3 text-[14.5px] font-medium hover:bg-brass transition-colors"
          >
            Describe what happened
          </Link>
        </div>
      </main>
    </div>
  )
}