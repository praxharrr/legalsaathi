# LegalSaathi

Plain-language legal answers for India, grounded in the actual statutes.

**Live:** https://legalsaathi-lemon.vercel.app

---

## The problem

Ask any general-purpose AI a legal question about India and it will answer
confidently, cite a section number, and be wrong often enough to matter.
Someone acting on an invented citation walks into a court quoting a provision
that doesn't exist.

LegalSaathi only cites law it can actually read, shows you the statutory text
behind every claim, and says plainly when a question falls outside what it has.

## How it works

```
question
   │
   ├──► router (GPT-OSS 20B, JSON mode) ──► picks 1-3 legal domains
   │
   ├──► embedding (Gemini) ─────────────► 768-dim query vector
   │
   ▼
hybrid search over pgvector
   • 75% cosine similarity + 25% Postgres full-text rank
   • filtered to the routed domains
   • top-3 per domain, so a smaller act isn't drowned out
   │
   ▼
answer (GPT-OSS 120B, JSON mode)
   • retrieved sections are the ONLY citable source
   • structured output: rights, steps, forum, follow-up
     questions, and a case title
   │
   ▼
UI renders the answer, every section it drew on, suggested
follow-ups, and a downloadable case summary
```

## The corpus

1,565 sections scraped from [India Code](https://www.indiacode.nic.in),
the government's own repository. Indian statutes are exempt from copyright.

| Act | Domain |
|---|---|
| Consumer Protection Act, 2019 | consumer |
| Bharatiya Nyaya Sanhita, 2023 | criminal |
| Bharatiya Nagarik Suraksha Sanhita, 2023 | police |
| Information Technology Act, 2000 | cyber |
| Indian Contract Act, 1872 | contract |
| Right to Information Act, 2005 | rti |
| Transfer of Property Act, 1882 | property |

India Code loads section text over AJAX, so the pages are useless to a plain
fetch. `scripts/scrape.mjs` walks each act's section list, pulls the internal
`secId`, and hits the `/SectionPageContent` endpoint the page's own JavaScript
calls. Chunking is by section — legal text has natural units, and splitting on
character count retrieves fragments that mean nothing.

## Evals

`scripts/evals.json` holds cases with the sections and forum each answer should
produce. `node scripts/run-evals.mjs` runs them against a live server.

This caught things reading answers by hand did not:

- **A silently failing router.** After a model swap it threw on every request,
  and the catch returned null, which the system treats as "search everything."
  It fell back for two days. Nothing in the UI looked wrong.
- **Format drift.** The answer model dropped the machine-readable forum line
  roughly 30% of the time. Two attempts to fix it by rewording the prompt made
  it *worse* (5/6 → 3/6 → 4/6 → 3/6). Constraining the output with JSON mode
  fixed it structurally.
- **Retrieval crowding.** RTI sections were being squeezed out by BNSS, which
  has 16x more chunks and much closer wording to "police complaint". Fixed by
  ranking within each domain rather than globally.
- **Prompt anchoring.** Listing example forum names made the model pick from the
  list rather than reason — landlord deposits kept going to a consumer
  commission. Naming the exclusion explicitly worked; listing examples didn't.
- **A provider retiring models overnight.** Groq dropped the Llama models
  mid-project. Because the eval suite existed, migrating to GPT-OSS was a
  twenty-minute change with a measured result rather than a guess.

Currently 5/6.

## Honest failure

Two places the app says it doesn't know rather than guessing:

- **Weak retrieval.** If the best-matching section scores under 60%, the answer
  carries a note saying nothing matched closely and asking for more detail.
  Vague one-line questions produce weak matches, and pretending otherwise is how
  people act on the wrong law.
- **Missing coverage.** Tenancy deposits are the standing example, and the one
  eval case that still fails. The corpus holds central statutes only, so the
  model says so and points to free legal aid rather than inventing a state rent
  act section. It picks a different forum on different runs — that's genuine
  uncertainty, and special-casing it to pass the test would be dishonest.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (Postgres +
pgvector + auth, RLS on every table) · Groq (GPT-OSS 20B routing, GPT-OSS 120B
answers) · Gemini embeddings · Three.js · @react-pdf/renderer · Vercel

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`GROQ_API_KEY`, `GEMINI_API_KEY`. Scripts also need
`SUPABASE_SERVICE_ROLE_KEY`.

## Also here

- **Rights library** at `/rights` — four guides plus a triage widget for people
  who don't know which area their problem falls under
- **Helplines** at `/help` — verified against government sources, including the
  fact that E-Jagriti replaced the e-Daakhil portal in January 2025, which most
  guides online still get wrong
- **Case files** at `/dashboard` — every conversation saved, titled by the model,
  exportable as a PDF with the cited sections attached

## Not a lawyer

Legal information, not legal advice. Every answer shows its sources so you can
check them. Where the stakes are real, the app says so and points to free legal
aid.