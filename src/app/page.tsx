import Link from 'next/link'
import PaperStack from '@/components/PaperStack'
import HomeAsk from '@/components/HomeAsk'

const STEPS = [
  {
    k: '01 — SAY IT HOWEVER',
    h: 'No legal vocabulary',
    p: 'No forms, no jargon, no need to know which act applies. Type it the way you\u2019d text a friend who happens to be a lawyer.',
  },
  {
    k: '02 — GET THE RECEIPT',
    h: 'See the actual section',
    p: 'Saathi pulls real statutory text and shows it beside the answer. If it can\u2019t find a source, it says so instead of guessing.',
  },
  {
    k: '03 — MOVE FIRST',
    h: 'Know exactly where to go',
    p: 'The right forum, the cheapest opening move, and what to send. Ordered from least confrontational upward.',
  },
]

const AREAS = [
  { tag: 'CPA 2019', h: 'Consumer', p: 'Refunds refused, warranty dodged, delivery fraud.' },
  { tag: 'BNSS 2023', h: 'FIR refused', p: 'Zero-FIR rights, arrest rights, how to escalate.' },
  { tag: 'CPA 2019', h: 'Product liability', p: 'Defective goods that caused you loss or harm.' },
  { tag: 'BNSS 2023', h: 'Police process', p: 'Summons, searches, bail, and your rights in custody.' },
]

export default function Home() {
  return (
    <div>
      {/* nav */}
      <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-rule">
        <div className="max-w-[1180px] mx-auto px-8 py-4 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full border-[1.5px] border-tape relative after:absolute after:inset-1 after:rounded-full after:border after:border-tape after:opacity-45" />
            <span className="font-serif text-[23px]">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
          <div className="hidden md:flex gap-8">
            <a href="#how" className="text-[14px] text-ink-soft hover:text-ink transition-colors">How it works</a>
            <a href="#areas" className="text-[14px] text-ink-soft hover:text-ink transition-colors">Coverage</a>
            <Link href="/help" className="text-[14px] text-ink-soft hover:text-ink transition-colors">Find help</Link>
          </div>
          <Link
            href="/login"
            className="bg-ink text-paper rounded-[2px] px-5 py-2.5 text-[14px] font-medium hover:bg-tape transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* hero */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr] gap-10 items-center">
          <div>
            <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-tape" />
              <span className="w-1.5 h-1.5 rounded-full bg-tape animate-pulse" />
              Cites the actual section
            </p>

             <h1 className="font-serif text-[clamp(44px,5.4vw,70px)] leading-[1.02] tracking-[-0.022em] mb-5">
              The law is already<br />
              on your side.<br />
              <em className="italic text-tape">Nobody told you.</em>
            </h1>

            <p className="text-[15.5px] sm:text-[16.5px] text-ink-soft w-full max-w-[452px] leading-[1.7] mb-3">
              Describe what happened in plain words. Get the law that applies, what
              you&apos;re owed, and the exact next move — with the statute it came
              from, so you can check it yourself.
            </p>

            <p className="font-deva text-[15px] text-ink-mute mb-7">
              कानून आपके साथ है। बस कोई बताने वाला चाहिए।
            </p>

            <HomeAsk />
          </div>

          <div className="h-[260px] sm:h-[380px] lg:h-[500px] order-first lg:order-last relative w-full overflow-hidden">
            <PaperStack />
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute opacity-65">
              drag to rotate
            </p>
          </div>
        </div>
      </section>

      {/* how */}
      <section id="how" className="border-t border-rule relative">
        <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-tape opacity-25" />
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14 sm:py-24 relative">
          <div className="flex items-baseline gap-5 mb-13">
            <span className="font-mono text-[12px] text-tape pt-2 shrink-0">§ 01</span>
            <div>
              <h2 className="font-serif text-[clamp(30px,3.6vw,44px)] leading-[1.08] tracking-[-0.018em]">
                Free advice is worth what you pay for it. Unless it&apos;s{' '}
                <em className="italic text-tape">sourced.</em>
              </h2>
              <p className="text-ink-soft max-w-[540px] mt-3">
                Most legal answers online are someone&apos;s half-remembered experience
                from 2019. Saathi retrieves the real statutory text and shows you where
                every claim came from.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-rule mt-13">
            {STEPS.map((s) => (
              <div key={s.k} className="group bg-paper px-7 pt-8 pb-10 relative hover:bg-raised transition-colors">
                <span className="font-mono text-[11px] text-tape tracking-[0.1em] block mb-5">{s.k}</span>
                <h3 className="font-serif text-[24px] leading-tight mb-2.5">{s.h}</h3>
                <p className="text-[14.5px] text-ink-soft leading-[1.68]">{s.p}</p>
                <span className="absolute left-7 right-7 bottom-0 h-0.5 bg-tape scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* coverage */}
      <section id="areas" className="border-t border-rule relative">
        <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-tape opacity-25" />
        <div className="max-w-[1180px] mx-auto px-8 py-24 relative">
          <div className="flex items-baseline gap-5 mb-13">
            <span className="font-mono text-[12px] text-tape pt-2 shrink-0">§ 02</span>
            <div>
              <h2 className="font-serif text-[clamp(30px,3.6vw,44px)] leading-[1.08] tracking-[-0.018em]">
                What Saathi can <em className="italic text-tape">actually cite.</em>
              </h2>
              <p className="text-ink-soft max-w-[540px] mt-3">
                            Seven acts fully ingested, section by section, straight from India Code.
                More coming — and Saathi tells you plainly when a question falls outside
                what it has.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-13">
            {AREAS.map((a) => (
              <div
                key={a.h}
                className="group bg-raised border border-rule rounded-[2px] px-5 pt-5 pb-6 relative hover:border-ink hover:-translate-y-1 hover:shadow-[5px_6px_0_rgba(21,24,28,0.09)] transition-all duration-300"
              >
                <span className="font-mono text-[10px] text-tape tracking-[0.08em] block mb-3.5">{a.tag}</span>
                <h4 className="font-serif text-[19px] leading-tight mb-1.5">{a.h}</h4>
                <p className="text-[12.8px] text-ink-mute leading-[1.58]">{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* trust */}
      <section className="border-t border-rule">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14 sm:py-24">
          <div className="bg-ink text-paper rounded-[3px] px-7 sm:px-12 py-8 sm:py-13 grid md:grid-cols-[1fr_auto] gap-8 md:gap-10 items-center">
            <div>
              <h3 className="font-serif text-[30px] leading-[1.16] mb-3">
                Saathi is a companion,<br />
                not a <em className="italic text-brass">counsel.</em>
              </h3>
              <p className="text-[15px] leading-[1.7] max-w-[540px] text-paper/[0.66]">
                Every answer carries the section it came from, so you never have to take
                its word for it. When the stakes get real, Saathi says so — and points
                you to free legal aid in your district instead of pretending to be enough.
              </p>
            </div>
            <div className="w-[118px] h-[118px] rounded-full border-[1.5px] border-brass/50 grid place-items-center text-center font-mono text-[9.5px] tracking-[0.11em] text-brass leading-[1.9] shrink-0">
              INFORMATION<br />NOT ADVICE
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-rule">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-12 sm:pt-14 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-9 mb-11">
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-6 h-6 rounded-full border-[1.5px] border-tape" />
                <span className="font-serif text-[23px]">
                  Legal<em className="italic text-tape">Saathi</em>
                </span>
              </div>
              <p className="text-[13.5px] text-ink-mute max-w-[265px] leading-[1.62]">
                Plain-language legal answers for India, grounded in the statutes themselves.
              </p>
            </div>
            <div>
              <h5 className="font-mono text-[10.5px] tracking-[0.11em] uppercase text-ink-mute mb-4">Product</h5>
              <Link href="/ask" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Ask Saathi</Link>
              <Link href="/dashboard" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Your cases</Link>
              <Link href="/help" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Find help</Link>
            </div>
            <div>
              <h5 className="font-mono text-[10.5px] tracking-[0.11em] uppercase text-ink-mute mb-4">Account</h5>
              <Link href="/login" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Sign in</Link>
              <Link href="/signup" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Create account</Link>
            </div>
            <div>
              <h5 className="font-mono text-[10.5px] tracking-[0.11em] uppercase text-ink-mute mb-4">Legal</h5>
              <Link href="/disclaimer" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Disclaimer</Link>
              <Link href="/privacy" className="block text-[14px] text-ink-soft mb-2 hover:text-tape transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="border-t border-rule pt-5 flex flex-wrap justify-between gap-5 text-[12.5px] text-ink-mute">
            <span>© 2026 LegalSaathi — not a law firm, not a substitute for a lawyer.</span>
            <span className="font-mono tracking-[0.08em]">BUILT IN INDIA</span>
          </div>
        </div>
      </footer>
    </div>
  )
}