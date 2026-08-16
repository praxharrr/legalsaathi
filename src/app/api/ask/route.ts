import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Gemini stays for embeddings only, until those move local
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are LegalSaathi, helping ordinary people in India understand their legal rights.

You will be given RETRIEVED SECTIONS from Indian statutes. These are the ONLY sources you may cite.

ABSOLUTE RULES:
- Cite a section number ONLY if it appears in the retrieved sections. Never invent one.
- If the retrieved sections do not cover the question, say so plainly in "situation" and "rights", and set "forum" to the best real-world body anyway.
- Never present general knowledge as if it came from a cited section.

Respond with ONLY a JSON object, no markdown fences, in exactly this shape:

{
  "situation": "One or two sentences reflecting back what you understood.",
  "rights": ["2-4 bullets on what the law says. Cite inline like [CPA 2019 s.35] when a retrieved section supports the point."],
  "steps": ["2-4 ordered actions, cheapest and least confrontational first."],
  "forum": "The specific body they approach next",
  "forumNote": "One line on what to do there."
}

Guidance:
- Plain language. Explain any legal term immediately.
- "forum" must name the actual body in full — "District Consumer Disputes Redressal Commission" not "consumer forum"; "Superintendent of Police" not "the police". Match it to THIS problem: tenancy to a Rent Authority, employment to a Labour Court, RTI to the Public Information Officer, cyber fraud to the Cyber Crime Cell.
- Ask for the person's state inside "situation" or "rights" when the answer depends on it.
- For criminal matters, domestic violence, or large fraud, say plainly in "steps" that this needs a lawyer, and mention free District Legal Services Authority aid.
- Consumer complaints are filed through E-Jagriti (e-jagriti.gov.in), which replaced e-Daakhil in January 2025. Never refer to e-Daakhil.
- Never state helpline numbers, portal names, or fees you are not certain of.
- Do not write your own disclaimer; the interface shows one.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

type Chunk = {
  id: string;
  section_number: string;
  section_title: string;
  chunk_text: string;
  source_name: string;
  domain: string;
  similarity: number;
};

const DOMAINS = [
  "consumer",
  "criminal",
  "police",
  "cyber",
  "contract",
  "rti",
  "property",
] as const;

const ROUTER_PROMPT = `You route Indian legal questions to the right bodies of law.

Available domains:
- consumer — defective goods, refunds, services, e-commerce, product liability
- criminal — offences: cheating, fraud, theft, assault, harassment, criminal breach of trust
- police — FIR, arrest, investigation, bail, summons, court procedure, getting records from police
- cyber — online fraud, UPI scams, hacking, data theft, electronic records, digital evidence
- contract — agreements, bonds, breach, employment terms, rental agreements as contracts
- rti — right to information, getting records from any government body, PIO, public authority
- property — sale, lease, mortgage, transfer of immovable property, landlord-tenant under central law

Return ONLY a JSON array of 1-3 domain strings, most relevant first. No prose, no markdown.

Examples:
"shop won't refund my broken phone" -> ["consumer"]
"how do I get a copy of my FIR through RTI" -> ["rti","police"]
"someone scammed me on UPI" -> ["cyber","criminal"]
"my employer's 2-year bond, is it valid" -> ["contract"]
"landlord kept my deposit" -> ["property","contract"]`;

async function routeQuestion(question: string): Promise<string[] | null> {
  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 100,
      messages: [
        { role: "system", content: ROUTER_PROMPT },
        { role: "user", content: question },
      ],
    });

    const raw = (res.choices[0]?.message?.content ?? "")
      .replace(/```json|```/g, "")
      .trim();
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return null;

    const valid = parsed.filter((d: string) =>
      (DOMAINS as readonly string[]).includes(d),
    );

    return valid.length > 0 ? valid : null;
  } catch (err) {
    console.error("Router failed, falling back to all domains:", err);
    return null;
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Please sign in to ask." },
      { status: 401 },
    );
  }

  // ---- RATE LIMIT: 20 questions per hour (skipped for eval runs) ----
  const isEval = request.headers.get("x-eval-run") === "1";

  if (!isEval) {
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("role", "user")
      .gte("created_at", hourAgo);

    if ((count ?? 0) >= 20) {
      return NextResponse.json(
        {
          error:
            "You have reached the hourly limit. Please try again in a little while.",
        },
        { status: 429 },
      );
    }
  }

  const { messages, conversationId } = (await request.json()) as {
    messages: ChatMessage[];
    conversationId?: string;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "No question provided." },
      { status: 400 },
    );
  }

  const latest = messages[messages.length - 1];

  try {
    // ---- ROUTE + RETRIEVE ----
    const [emb, domains] = await Promise.all([
      ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: latest.content,
        config: { outputDimensionality: 768 },
      }),
      routeQuestion(latest.content),
    ]);

    console.log("Routed to:", domains ?? "all domains");

    const queryVector = emb.embeddings?.[0]?.values ?? [];

    const { data: chunks, error: matchError } = await supabase.rpc(
      "match_legal_chunks_routed",
      {
        query_embedding: queryVector,
        query_text: latest.content,
        domains,
        match_count: 6,
      },
    );

    if (matchError) console.error("Retrieval failed:", matchError);

    const retrieved = (chunks ?? []) as Chunk[];

    const context = retrieved.length
      ? retrieved
          .slice(0, 4)
          .map(
            (c) =>
              `[${c.source_name} s.${c.section_number}] ${c.section_title}\n${c.chunk_text.slice(0, 1800)}`,
          )
          .join("\n\n---\n\n")
      : "(No matching sections found in the available statutes.)";

    const sources = retrieved.map((c) => ({
      section: `${c.source_name} s.${c.section_number}`,
      title: c.section_title,
      text: c.chunk_text.slice(0, 1200),
      similarity: Math.round(c.similarity * 100),
    }));

    // ---- SAVE + ANSWER ----
    let convoId = conversationId;

    if (!convoId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ user_id: user.id, title: latest.content.slice(0, 60) })
        .select("id")
        .single();
      if (!error) convoId = data.id;
    }

    if (convoId) {
      await supabase.from("messages").insert({
        conversation_id: convoId,
        role: "user",
        content: latest.content,
      });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\n=== RETRIEVED SECTIONS ===\n\n${context}`,
        },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";

    // Convert the structured answer into the text format the UI parses
    let text = "";
    try {
      const a = JSON.parse(raw) as {
        situation?: string;
        rights?: string[];
        steps?: string[];
        forum?: string;
        forumNote?: string;
      };

      const parts: string[] = [];
      if (a.situation) parts.push(`**What's going on**`, a.situation);
      if (a.rights?.length)
        parts.push(`**Your rights**`, ...a.rights.map((r) => `- ${r}`));
      if (a.steps?.length)
        parts.push(
          `**What to do next**`,
          ...a.steps.map((s, i) => `${i + 1}. ${s}`),
        );
      if (a.forum) parts.push(`FORUM|${a.forum}|${a.forumNote ?? ""}`);

      text = parts.join("\n");
    } catch {
      console.error("Could not parse model JSON:", raw.slice(0, 200));
      text = raw;
    }

    if (convoId) {
      await supabase.from("messages").insert({
        conversation_id: convoId,
        role: "assistant",
        content: text,
        sources,
      });
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", convoId);
    }

    return NextResponse.json({
      text,
      conversationId: convoId,
      sources,
    });
  } catch (err) {
    console.error("Ask error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}