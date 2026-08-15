import Link from 'next/link'

export const metadata = {
  title: 'Find real help — LegalSaathi',
  description: 'Verified helplines, free legal aid, and where to file in India.',
}

const LINK = 'text-tape border-b border-tape/40 hover:border-tape'
const PARA = 'text-[15px] leading-[1.72] text-ink-soft mt-3'

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rule">
        <div className="max-w-[760px] mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-6 py-14 pb-24">
        <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
          § Find help
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight mb-3">
          When Saathi isn&apos;t enough.
        </h1>
        <p className="text-ink-soft text-[16px] leading-[1.7] mb-12 max-w-[560px]">
          Some situations need a person, not an answer. Everything below is free,
          run by the government, and available across India.
        </p>

        <div className="border-2 border-tape rounded-[3px] px-7 py-6 mb-14">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-tape mb-4">
            If you are in danger right now
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Num n="112" label="Police, fire, ambulance" note="One number for every emergency, all of India" />
            <Num n="1930" label="Money stolen online" note="Call before anything else. Speed decides recovery." />
            <Num n="181" label="Women&apos;s helpline" note="Violence, harassment, threats" />
            <Num n="1098" label="Childline" note="Any child in danger or distress" />
          </div>
        </div>

        <div className="flex flex-col gap-12">

          <Block n="01" title="Free legal aid, and you probably qualify">
            <p className="text-[15px] leading-[1.72] text-ink-soft mb-5">
              Most people in India are entitled to a free lawyer and do not know it.
              This is not charity. It is a statutory right.
            </p>
            <Big n="15100" label="NALSA national legal aid helpline" />
            <p className={PARA}>
              Calling 15100 routes you to the legal services authority for your own
              district, in one of ten languages. They can assign you a lawyer at no
              cost, help you draft and file, and represent you in court.
            </p>
            <p className={PARA}>
              Women and children qualify regardless of income. So do several other
              categories, and income-based eligibility covers a large share of people
              besides. If you are unsure, call and ask. Asking costs nothing.
            </p>
            <p className={PARA}>
              You can also walk into the District Legal Services Authority office at
              your local court complex. Take any documents you have: agreements,
              receipts, messages, notices.
            </p>
          </Block>

          <Block n="02" title="Money stolen online">
            <p className="text-[15px] leading-[1.72] text-ink-soft mb-5">
              Fraudulent transfers can sometimes be frozen before the money moves on,
              but the window is short and it closes fast.
            </p>
            <Big n="1930" label="Cyber financial fraud helpline" />
            <p className={PARA}>
              Call before you do anything else. Before messaging the scammer, before
              posting about it, before waiting to see if it reverses. Every minute
              lowers the chance of getting it back.
            </p>
            <p className={PARA}>
              Then file the written complaint at{' '}
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className={LINK}>
                cybercrime.gov.in
              </a>
              . Keep the acknowledgement number. Your bank will ask for it, and so
              will the police.
            </p>
            <p className={PARA}>
              This covers UPI fraud, fake job offers, phishing, account takeovers,
              sextortion, and online harassment.
            </p>
          </Block>

          <Block n="03" title="A seller or company that will not fix it">
            <p className="text-[15px] leading-[1.72] text-ink-soft mb-5">
              Start with the helpline, not the court. It is free, it usually works,
              and it builds the record you would need if it does not.
            </p>
            <Big n="1915" label="National Consumer Helpline" />
            <p className={PARA}>
              Free, available in many languages, 8am to 8pm. The counsellor logs your
              complaint and takes it up with the company. A large share of cases end
              here.
            </p>
            <p className={PARA}>
              You can also file in writing at{' '}
              <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className={LINK}>
                consumerhelpline.gov.in
              </a>
              .
            </p>
            <p className={PARA}>
              If the company still will not move, the formal route is the consumer
              commission, filed online through{' '}
              <a href="https://e-jagriti.gov.in" target="_blank" rel="noopener noreferrer" className={LINK}>
                E-Jagriti
              </a>
              , which replaced the older e-Daakhil portal in January 2025. Most guides
              online still name e-Daakhil.
            </p>
          </Block>

          <Block n="04" title="Police will not register your complaint">
            <p className="text-[15px] leading-[1.72] text-ink-soft mb-5">
              Refusing to register an FIR for a cognizable offence is not something
              the police are entitled to do.
            </p>
            <p className="text-[15px] leading-[1.72] text-ink-soft">
              Ask for the refusal in writing. If they still refuse, send your
              complaint by registered post to the Superintendent of Police for the
              district. That written record matters later.
            </p>
            <p className={PARA}>
              You can also approach a Magistrate directly. For anything urgent, call
              112. And a zero-FIR can be registered at any police station regardless
              of where the offence took place, then transferred, which is useful when
              you are being sent from station to station.
            </p>
            <p className={PARA}>
              Ask Saathi about this and it can cite the specific provisions from the
              Bharatiya Nagarik Suraksha Sanhita.
            </p>
          </Block>

        </div>

        <div className="mt-14 bg-ink text-paper rounded-[3px] px-8 py-7">
          <p className="font-serif text-[21px] leading-snug mb-2">
            Cost is not a reason to go without a lawyer.
          </p>
          <p className="text-[15px] leading-[1.7] text-paper/70">
            Free legal aid exists precisely so that people who cannot pay still get
            represented. If money is what is stopping you, call 15100.
          </p>
        </div>

        <p className="text-[12.5px] text-ink-mute mt-10">
          Numbers verified 15 August 2026 against government sources. If one has
          changed, please tell us.
        </p>
      </main>
    </div>
  )
}

function Num({ n, label, note }: { n: string; label: string; note: string }) {
  return (
    <div>
      <a href={`tel:${n}`} className="font-serif text-[30px] text-tape leading-none hover:opacity-70 transition-opacity">
        {n}
      </a>
      <p className="text-[14px] mt-1">{label}</p>
      <p className="text-[12.5px] text-ink-mute leading-snug">{note}</p>
    </div>
  )
}

function Big({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 bg-raised border border-rule rounded-[2px] px-5 py-4">
      <a href={`tel:${n}`} className="font-serif text-[32px] text-tape leading-none hover:opacity-70 transition-opacity">
        {n}
      </a>
      <span className="font-mono text-[10.5px] tracking-[0.09em] uppercase text-ink-mute">
        {label}
      </span>
    </div>
  )
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <span className="font-mono text-[11px] text-tape pt-1.5 shrink-0">§ {n}</span>
      <div>
        <h2 className="font-serif text-[25px] leading-tight mb-2">{title}</h2>
        {children}
      </div>
    </div>
  )
}