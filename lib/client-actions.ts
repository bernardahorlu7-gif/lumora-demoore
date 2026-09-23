'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/authz'

export async function updateClient(formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const id = String(formData.get('id'))
  const payload = {
    contact_name: String(formData.get('contact_name') ?? '').trim(),
    company_name: String(formData.get('company_name') ?? '').trim() || null,
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim() || null,
    address: String(formData.get('address') ?? '').trim() || null,
    city: String(formData.get('city') ?? '').trim() || null,
    region: String(formData.get('region') ?? '').trim() || null,
    country: String(formData.get('country') ?? '').trim() || null,
    industry: String(formData.get('industry') ?? '').trim() || null,
    client_type: String(formData.get('client_type') ?? 'individual'),
    status: String(formData.get('status') ?? 'prospect'),
    notes: String(formData.get('notes') ?? '').trim() || null,
  }
  const { data: before } = await supabase.from('clients').select('status, notes').eq('id', id).maybeSingle()
  const { error } = await supabase.from('clients').update(payload).eq('id', id)
  if (error) throw new Error('Unable to update client')
  await supabase.from('client_activities').insert({ client_id: id, actor_user_id: user.id, activity_type: before?.status !== payload.status ? 'status_changed' : 'updated', old_value: before?.status, new_value: payload.status, note: payload.notes })
  revalidatePath('/admin/clients'); revalidatePath(`/admin/clients/${id}`)
}

export async function addClientNote(formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const clientId = String(formData.get('client_id'))
  const note = String(formData.get('note') ?? '').trim()
  if (!note) return
  const { error } = await supabase.from('client_activities').insert({ client_id: clientId, actor_user_id: user.id, activity_type: 'note_added', note })
  if (error) throw new Error('Unable to add note')
  revalidatePath(`/admin/clients/${clientId}`)
}

export async function createClientProject(formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const clientId = String(formData.get('client_id'))
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return
  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`
  const { error } = await supabase.from('projects').insert({ client_id: clientId, name, slug, project_type: String(formData.get('project_type') ?? '').trim() || null, location: String(formData.get('location') ?? '').trim() || null, status: 'planning' })
  if (error) throw new Error('Unable to create project')
  await supabase.from('client_activities').insert({ client_id: clientId, actor_user_id: user.id, activity_type: 'updated', note: `Created project: ${name}` })
  revalidatePath(`/admin/clients/${clientId}`); revalidatePath('/admin')
}
