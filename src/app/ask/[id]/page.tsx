import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Chat from '@/components/Chat'

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: conversation } = await supabase
    .from('conversations')
    .select('id')
    .eq('id', id)
    .single()

  if (!conversation) notFound()

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  return (
    <Chat
      email={user.email ?? ''}
      initialMessages={(messages ?? []) as { role: 'user' | 'assistant'; content: string }[]}
      initialConvoId={id}
    />
  )
}