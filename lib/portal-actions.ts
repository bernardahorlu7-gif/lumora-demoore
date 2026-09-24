'use server'

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/authz'

export async function createClientRequest(formData: FormData) {
  const { supabase, user } = await requireRole('client')
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const category = String(formData.get('category') ?? 'General Request')
  const projectId = String(formData.get('project_id') ?? '') || null
  if (!subject || !message) return { error: 'Subject and message are required.' }
  const { data: client } = await supabase.from('clients').select('id').eq('profile_id', user.id).maybeSingle()
  if (!client) return { error: 'No client profile is linked to this account.' }
  const { error } = await supabase.from('client_requests').insert({ requester_id: user.id, client_id: client.id, project_id: projectId, category, subject, message })
  if (error) return { error: error.message }
  revalidatePath('/portal'); revalidatePath('/portal/requests')
  return { success: true }
}

export async function updateClientProfile(formData: FormData) {
  const { supabase, user } = await requireRole('client')
  const payload = { full_name: String(formData.get('full_name') ?? '').trim() || null, phone: String(formData.get('phone') ?? '').trim() || null, job_title: String(formData.get('job_title') ?? '').trim() || null }
  const { error } = await supabase.from('profiles').update(payload).eq('id', user.id)
  if (error) return { error: error.message }
  revalidatePath('/portal'); revalidatePath('/portal/profile')
  return { success: true }
}
