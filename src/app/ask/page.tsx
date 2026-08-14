import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Chat from '@/components/Chat'

export default async function AskPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return <Chat email={user.email ?? ''} />
}