"use server"

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/authz'

const statuses = ['draft','requested','sourcing','quotation_received','under_review','approved','ordered','partially_delivered','delivered','completed','cancelled'] as const

function text(formData: FormData, key: string) { return String(formData.get(key) ?? '').trim() }
function nullable(value: string) { return value || null }

export async function createProcurement(formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const projectId = text(formData, 'project_id'); const title = text(formData, 'title')
  if (!projectId || !title) return { error: 'Project and title are required.' }
  const { data: project } = await supabase.from('projects').select('id, client_id').eq('id', projectId).maybeSingle()
  if (!project) return { error: 'Choose an existing project.' }
  const number = `PR-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  const { data, error } = await supabase.from('procurement_requests').insert({ request_number: number, project_id: projectId, client_id: project.client_id, title, description: nullable(text(formData, 'description')), procurement_type: text(formData, 'procurement_type') || 'Project Procurement', category: nullable(text(formData, 'category')), priority: text(formData, 'priority') || 'normal', status: 'draft', requested_by: user.id, assigned_to: nullable(text(formData, 'assigned_to')), required_date: nullable(text(formData, 'required_date')), delivery_location: nullable(text(formData, 'delivery_location')), estimated_value: Number(formData.get('estimated_value') || 0) }) .select('id').single()
  if (error) return { error: error.message }
  await supabase.from('procurement_activities').insert({ procurement_request_id: data.id, actor_user_id: user.id, activity_type: 'created', new_value: number })
  revalidatePath('/admin/procurement'); revalidatePath(`/admin/projects/${projectId}`)
  return { success: true, id: data.id }
}

export async function updateProcurement(id: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const { data: before } = await supabase.from('procurement_requests').select('status, priority, assigned_to, supplier_name, delivery_status').eq('id', id).maybeSingle()
  if (!before) return { error: 'Procurement request not found.' }
  const status = text(formData, 'status') || before.status
  if (!statuses.includes(status as typeof statuses[number])) return { error: 'Invalid status.' }
  const payload = { title: text(formData, 'title'), description: nullable(text(formData, 'description')), status, priority: text(formData, 'priority') || before.priority, assigned_to: nullable(text(formData, 'assigned_to')), supplier_name: nullable(text(formData, 'supplier_name')), supplier_contact: nullable(text(formData, 'supplier_contact')), quotation_reference: nullable(text(formData, 'quotation_reference')), quotation_date: nullable(text(formData, 'quotation_date')), quoted_value: formData.get('quoted_value') ? Number(formData.get('quoted_value')) : null, approved_value: formData.get('approved_value') ? Number(formData.get('approved_value')) : null, delivery_status: text(formData, 'delivery_status') || 'not_scheduled', expected_delivery_date: nullable(text(formData, 'expected_delivery_date')), actual_delivery_date: nullable(text(formData, 'actual_delivery_date')), delivery_notes: nullable(text(formData, 'delivery_notes')), internal_notes: nullable(text(formData, 'internal_notes')), updated_at: new Date().toISOString(), approved_by: status === 'approved' ? user.id : null, approved_at: status === 'approved' ? new Date().toISOString() : null }
  const { error } = await supabase.from('procurement_requests').update(payload).eq('id', id)
  if (error) return { error: error.message }
  const events = [{ activity_type: 'status_changed', old_value: before.status, new_value: status }, { activity_type: 'priority_changed', old_value: before.priority, new_value: payload.priority }, { activity_type: 'assigned', old_value: before.assigned_to, new_value: payload.assigned_to }, { activity_type: 'supplier_changed', old_value: before.supplier_name, new_value: payload.supplier_name }, { activity_type: 'delivery_status_changed', old_value: before.delivery_status, new_value: payload.delivery_status }].filter((event) => event.old_value !== event.new_value).map((event) => ({ ...event, procurement_request_id: id, actor_user_id: user.id }))
  if (events.length) await supabase.from('procurement_activities').insert(events)
  revalidatePath(`/admin/procurement/${id}`); revalidatePath('/admin/procurement'); revalidatePath('/admin/projects')
  return { success: true }
}

export async function addProcurementItem(id: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const description = text(formData, 'description'); const quantity = Number(formData.get('quantity')); const unit = text(formData, 'unit')
  if (!description || !unit || !Number.isFinite(quantity) || quantity <= 0) return { error: 'Description, unit, and a positive quantity are required.' }
  const { error } = await supabase.from('procurement_items').insert({ procurement_request_id: id, description, specification: nullable(text(formData, 'specification')), category: nullable(text(formData, 'category')), quantity, unit, estimated_unit_cost: Number(formData.get('estimated_unit_cost') || 0), notes: nullable(text(formData, 'notes')) })
  if (error) return { error: error.message }
  await supabase.from('procurement_activities').insert({ procurement_request_id: id, actor_user_id: user.id, activity_type: 'updated', note: `Added item: ${description}` })
  revalidatePath(`/admin/procurement/${id}`); return { success: true }
}

export async function deleteProcurementItem(id: string, itemId: string) {
  const { supabase } = await requireRole(['admin', 'staff'])
  const { error } = await supabase.from('procurement_items').delete().eq('id', itemId).eq('procurement_request_id', id)
  if (error) return { error: error.message }
  revalidatePath(`/admin/procurement/${id}`); return { success: true }
}
