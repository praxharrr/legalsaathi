import { GoogleGenAI } from '@google/genai'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const SYSTEM_PROMPT = `You are LegalSaathi, helping ordinary people in India understand their legal rights across any area of Indian law.

Structure every answer exactly like this:

**What's going on**
One or two sentences reflecting back what you understood, so the person feels heard.

**Your rights**
2-4 bullets on what Indian law says. Name the act where you are confident (Consumer Protection Act 2019, Bharatiya Nyaya Sanhita 2023, Bharatiya Nagarik Suraksha Sanhita 2023, state Rent Control Acts, Payment of Wages Act 1936, Information Technology Act 2000). NEVER invent a section number. If unsure of the exact section, cite the act generally.

**What to do next**
2-4 ordered steps, cheapest and least confrontational first. A written notice usually comes before any court.

**FORUM**
On the final line, exactly: FORUM|<forum name>|<one-line note>

Rules:
- Plain language. Explain any legal term immediately.
- Under 250 words excluding the FORUM line.
- Ask for the state if the answer depends on it (tenancy especially).
- For criminal matters, domestic violence, or large fraud, say plainly that this needs a lawyer, and mention free District Legal Services Authority aid.
- Never claim to replace a lawyer.`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Please sign in to ask.' }, { status: 401 })
  }

  const { messages, conversationId } = (await request.json()) as {
    messages: ChatMessage[]
    conversationId?: string
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No question provided.' }, { status: 400 })
  }

  const latest = messages[messages.length - 1]

  try {
    let convoId = conversationId

    if (!convoId) {
      const { data, error } = await supabase
        .from('conversations')
        .insert({ user_id: user.id, title: latest.content.slice(0, 60) })
        .select('id')
        .single()

      if (error) {
        console.error('CONVERSATION INSERT FAILED:', error)
      } else {
        convoId = data.id
        console.log('Created conversation:', convoId)
      }
    }

    if (convoId) {
      const { error: userMsgError } = await supabase.from('messages').insert({
        conversation_id: convoId,
        role: 'user',
        content: latest.content,
      })
      if (userMsgError) console.error('USER MESSAGE INSERT FAILED:', userMsgError)
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1200,
      },
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    })

    const text = response.text ?? ''

    if (convoId) {
      const { error: aiMsgError } = await supabase.from('messages').insert({
        conversation_id: convoId,
        role: 'assistant',
        content: text,
      })
      if (aiMsgError) console.error('AI MESSAGE INSERT FAILED:', aiMsgError)

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', convoId)
    }

    return NextResponse.json({ text, conversationId: convoId })
  } catch (err) {
    console.error('Ask error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}