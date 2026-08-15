'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function deleteConversation(formData: FormData) {
  const id = String(formData.get('id'))
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('conversations').delete().eq('id', id)

  revalidatePath('/dashboard')
}