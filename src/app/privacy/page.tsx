import Link from 'next/link'

export const metadata = {
  title: 'Privacy — LegalSaathi',
  description: 'What LegalSaathi stores, who can see it, and how to delete it.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full border-[1.5px] border-tape" />
            <span className="font-serif text-xl">
              Legal<em className="italic text-tape">Saathi</em>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-6 py-14 pb-24">
        <p className="font-mono text-[11px] tracking-[0.13em] uppercase text-tape mb-4">
          § Privacy
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight mb-3">
          What we keep, and who can see it.
        </h1>
        <p className="text-ink-soft text-[16px] leading-[1.7] mb-12">
          You tell LegalSaathi about problems you may not have told anyone else.
          This page says plainly what happens to that.
        </p>

        <div className="flex flex-col gap-9">
          <Section n="01" title="What we store">
            Your email address, and every question you ask along with the answer
            you receive. Questions are saved so you can return to a case later.
            We do not ask for your name, phone number, address, or any identity
            document, and you should not include those details in what you write.
          </Section>

          <Section n="02" title="Who can read your cases">
            Only you. Access is enforced by the database itself, not by our
            application code — each row is locked to the account that created it,
            so another user cannot retrieve your conversations even by querying
            directly. Anthropic-style analytics, ad networks, and data brokers get
            nothing, because we do not use them.
          </Section>

          <Section n="03" title="Where your words go">
            To answer you, your question is sent to Google&apos;s Gemini API. It
            leaves our servers to do that. Google states that data sent through
            the paid API tier is not used to train its models; free-tier usage may
            be reviewed. Until we move to a paid tier, treat anything you type as
            potentially readable by a third party, and leave out details you would
            not want seen.
          </Section>

          <Section n="04" title="Who we share with">
            Nobody, other than the infrastructure needed to run the service:
            Supabase hosts the database, and Google processes the questions. We do
            not sell data, and we have no advertising relationships. If we are ever
            legally compelled to hand something over, we will comply with a valid
            order, and we would rather you knew that now.
          </Section>

          <Section n="05" title="Deleting your data">
            Deleting your account removes your conversations with it. Until
            in-app deletion is built, email us and we will do it manually and
            confirm when it is done. There is no waiting period and we will not
            ask you why.
          </Section>

          <Section n="06" title="Security, honestly stated">
            Traffic is encrypted, passwords are hashed by Supabase and never
            visible to us, and access rules are enforced at the database layer.
            But this is a small project built by one person, not a bank. Do not
            store anything here you could not afford to have exposed.
          </Section>

          <Section n="07" title="This is not legal record-keeping">
            LegalSaathi is not a case management system and should not be your
            only copy of anything. Keep your own records of dates, receipts,
            notices, and correspondence somewhere you control.
          </Section>
        </div>

        <div className="mt-14 border border-rule bg-raised rounded-[3px] px-7 py-6">
          <p className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-mute mb-2">
            Contact
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Questions about your data, or a deletion request — write to us and we
            will reply. Add your contact email here before launch.
          </p>
        </div>

        <p className="text-[12.5px] text-ink-mute mt-10">
          Last updated 15 August 2026.
        </p>
      </main>
    </div>
  )
}

function Section({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-5">
      <span className="font-mono text-[11px] text-tape pt-1.5 shrink-0">§ {n}</span>
      <div>
        <h2 className="font-serif text-[23px] leading-tight mb-2">{title}</h2>
        <p className="text-[15px] leading-[1.72] text-ink-soft">{children}</p>
      </div>
    </div>
  )
}