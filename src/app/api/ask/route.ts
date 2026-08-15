import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are LegalSaathi, helping ordinary people in India understand their legal rights.

You will be given RETRIEVED SECTIONS from Indian statutes. These are the ONLY sources you may cite.

ABSOLUTE RULES:
- Cite a section number ONLY if it appears in the retrieved sections below. Never invent one.
- If the retrieved sections do not cover the question, say so plainly: explain what you can in general terms, state clearly that you don't have the specific statute for this, and recommend a lawyer or free legal aid.
- Never present general knowledge as if it came from a cited section.

Structure every answer like this:

**What's going on**
One or two sentences reflecting back what you understood.

**Your rights**
2-4 bullets. When a retrieved section supports a point, cite it inline like [CPA 2019 s.35].

**What to do next**
2-4 ordered steps, cheapest and least confrontational first.

**FORUM**
Final line, exactly: FORUM|<forum name>|<one-line note>

Style:
- Plain language. Explain any legal term immediately.
- Consumer complaints are filed through E-Jagriti (e-jagriti.gov.in), which replaced the e-Daakhil portal in January 2025. Never refer to e-Daakhil.
- Never state helpline numbers, portal names, or fees you are not certain of. Say "check the current portal" instead of guessing.
- Under 250 words excluding the FORUM line.
- Ask for the state if the answer depends on it.
- For criminal matters, domestic violence, or large fraud, say plainly this needs a lawyer, and mention free District Legal Services Authority aid.
- Never write your own disclaimer line; the interface already shows one.
- Never claim to replace a lawyer.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

type Chunk = {
  id: string;
  section_number: string;
  section_title: string;
  chunk_text: string;
  source_name: string;
  similarity: number;
};

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

  // ---- RATE LIMIT: 20 questions per hour ----
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
    // ---- RETRIEVE ----
    const emb = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: latest.content,
      config: { outputDimensionality: 768 },
    });
    const queryVector = emb.embeddings?.[0]?.values ?? [];

    const { data: chunks, error: matchError } = await supabase.rpc(
      "match_legal_chunks",
      {
        query_embedding: queryVector,
        query_text: latest.content,
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\n=== RETRIEVED SECTIONS ===\n\n${context}`,
        maxOutputTokens: 2000,
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    });

    const text = response.text ?? "";

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