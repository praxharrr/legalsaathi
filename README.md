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
   ├──► router (Llama 3.1 8B) ──► picks 1-3 legal domains
   │
   ├──► embedding (Gemini) ─────► 768-dim query vector
   │
   ▼
hybrid search over pgvector
   • 75% cosine similarity + 25% Postgres full-text rank
   • filtered to the routed domains
   • top-3 per domain, so a smaller act isn't drowned out
   │
   ▼
answer (Llama 3.3 70B, JSON mode)
   • retrieved sections are the ONLY citable source
   • structured output, so the format can't drift
   │
   ▼
UI renders the answer + every section it drew on, expandable
```
│
├──► embedding (Gemini) ─────► 768-dim query vector
│
▼
hybrid search over pgvector
• 75% cosine similarity + 25% Postgres full-text rank
• filtered to the routed domains
• top-3 per domain, so a smaller act isn't drowned out
│
▼
answer (Llama 3.3 70B, JSON mode)
• retrieved sections are the ONLY citable source
• structured output, so the format can't drift
│
▼
UI renders the answer + every section it drew on, expandable

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

- The router failing silently after a model swap — every question fell back to
  searching all domains for two days without anything looking wrong.
- Llama 3.3 dropping the machine-readable forum line roughly 30% of the time.
  Two attempts to fix it by rewording the prompt made it worse; constraining the
  output with JSON mode fixed it structurally. Scores across those attempts:
  5/6 → 3/6 → 4/6 → 3/6 → 6/6.
- RTI sections being crowded out of retrieval by BNSS, which has 16x more
  chunks and much closer wording to "police complaint". Fixed by ranking within
  each domain rather than globally.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (Postgres +
pgvector + auth, RLS on every table) · Groq (Llama 3.1 8B routing, Llama 3.3
70B answers) · Gemini embeddings · Vercel

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`GROQ_API_KEY`, `GEMINI_API_KEY`. Scripts also need
`SUPABASE_SERVICE_ROLE_KEY`.

## Known limits

- **Tenancy is state law.** Deposits, eviction, and rent control live in state
  acts; only central statutes are indexed. Saathi says so rather than guessing.
- **Procedure isn't grounded.** Portal names, helplines, and fees come from the
  model, not the corpus. Handled by pinning known-current facts in the prompt —
  e.g. E-Jagriti replaced e-Daakhil in Jan 2025, which most guides online still
  get wrong.
- **Free-tier embedding limits** cap the corpus refresh at 1,000 sections/day.

## Not a lawyer

Legal information, not legal advice. Every answer shows its sources so you can
check them. Where the stakes are real, the app says so and points to free legal
aid.
