'use server'

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/authz'

async function staffContext() {
  return requireRole(['admin', 'staff'])
}

const proposalStatuses = new Set(['new', 'reviewing', 'contacted', 'qualified', 'proposal', 'quoted', 'won', 'lost', 'declined', 'closed'])
const proposalPriorities = new Set(['low', 'normal', 'high', 'urgent'])

export async function updateProposal(proposalId: string, values: { status?: string; priority?: string; assigned_to?: string | null; internal_notes?: string; follow_up_at?: string | null; quotation_reference?: string | null }) {
  const { supabase, user } = await staffContext()
  const { data: current } = await supabase.from('proposal_requests').select('status, priority, assigned_to, internal_notes, follow_up_at, quotation_reference').eq('id', proposalId).maybeSingle()
  if (!current) throw new Error('Proposal not found')
  if (values.status !== undefined && !proposalStatuses.has(values.status)) throw new Error('Invalid proposal status')
  if (values.priority !== undefined && !proposalPriorities.has(values.priority)) throw new Error('Invalid proposal priority')
  const { error } = await supabase.from('proposal_requests').update(values).eq('id', proposalId)
  if (error) {
    console.error('[v0] Proposal workflow update failed', { proposalId, fields: Object.keys(values), code: error.code })
    throw new Error('Unable to update proposal')
  }
  const activities = []
  if (values.status && values.status !== current.status) activities.push({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'status_changed', old_value: current.status, new_value: values.status })
  if (values.priority && values.priority !== current.priority) activities.push({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'priority_changed', old_value: current.priority, new_value: values.priority })
  if (values.assigned_to !== undefined && values.assigned_to !== current.assigned_to) activities.push({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'assigned', old_value: current.assigned_to, new_value: values.assigned_to })
  if (values.internal_notes !== undefined && values.internal_notes !== current.internal_notes) activities.push({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'note_added', note: values.internal_notes })
  if (values.follow_up_at !== undefined && values.follow_up_at !== current.follow_up_at) activities.push({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'follow_up_changed', old_value: current.follow_up_at, new_value: values.follow_up_at })
  if (activities.length) await supabase.from('proposal_activities').insert(activities)
  revalidatePath('/admin')
  revalidatePath('/admin/proposals')
  revalidatePath(`/admin/proposals/${proposalId}`)
}

export async function convertProposalToClient(proposalId: string) {
  const { supabase, user } = await staffContext()
  const { data: proposal } = await supabase.from('proposal_requests').select('id, name, email, phone, company_name, project_location, converted_client_id').eq('id', proposalId).maybeSingle()
  if (!proposal) throw new Error('Proposal not found')
  if (proposal.converted_client_id) return proposal.converted_client_id
  const { data: existing } = await supabase.from('clients').select('id').or(`email.eq.${proposal.email},company_name.eq.${proposal.company_name ?? ''}`).limit(1).maybeSingle()
  let clientId = existing?.id
  if (!clientId) {
    const { data: created, error } = await supabase.from('clients').insert({ contact_name: proposal.name, email: proposal.email, phone: proposal.phone, company_name: proposal.company_name, address: proposal.project_location }).select('id').single()
    if (error) throw new Error('Unable to create client')
    clientId = created.id
  }
  await supabase.from('proposal_requests').update({ converted_client_id: clientId, converted_at: new Date().toISOString(), status: 'won' }).eq('id', proposalId)
  await supabase.from('proposal_activities').insert({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'converted_client', new_value: clientId })
  revalidatePath(`/admin/proposals/${proposalId}`)
  revalidatePath('/admin/proposals')
  return clientId
}

export async function createProjectFromProposal(proposalId: string) {
  const { supabase, user } = await staffContext()
  const { data: proposal } = await supabase.from('proposal_requests').select('id, project_name, project_type, project_location, message, completion_timeframe, converted_client_id, converted_project_id, service_slug').eq('id', proposalId).maybeSingle()
  if (!proposal?.converted_client_id) throw new Error('Convert the proposal to a client first')
  if (proposal.converted_project_id) return proposal.converted_project_id
  const slug = `${(proposal.project_name || 'lumora-project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${proposal.id.slice(0, 8)}`
  const { data: project, error } = await supabase.from('projects').insert({ client_id: proposal.converted_client_id, name: proposal.project_name || 'New Lumora Project', slug, project_type: proposal.project_type, location: proposal.project_location, description: proposal.message, status: 'planning' }).select('id').single()
  if (error) throw new Error('Unable to create project')
  await supabase.from('proposal_requests').update({ converted_project_id: project.id, converted_at: new Date().toISOString(), status: 'won' }).eq('id', proposalId)
  await supabase.from('proposal_activities').insert({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'converted_project', new_value: project.id })
  revalidatePath(`/admin/proposals/${proposalId}`)
  return project.id
}

export async function addProposalNote(proposalId: string, note: string) {
  if (!note.trim()) return
  const { supabase, user } = await staffContext()
  const { error } = await supabase.from('proposal_activities').insert({ proposal_id: proposalId, actor_user_id: user.id, activity_type: 'note_added', note: note.trim() })
  if (error) throw new Error('Unable to add note')
  revalidatePath(`/admin/proposals/${proposalId}`)
}
