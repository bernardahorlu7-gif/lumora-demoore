'use server'

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/authz'

export async function updateStaffProfile(userId: string, formData: FormData) {
  const { supabase, user, role } = await requireRole('admin')
  const values = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim() || null,
    job_title: String(formData.get('job_title') ?? '').trim() || null,
    department: String(formData.get('department') ?? '').trim() || null,
    account_status: String(formData.get('account_status') ?? 'active'),
    staff_notes: String(formData.get('staff_notes') ?? '').trim() || null,
  }
  if (!values.full_name) throw new Error('Full name is required.')
  if (!['active', 'suspended', 'inactive'].includes(values.account_status)) throw new Error('Invalid account status.')
  if (userId === user.id && values.account_status !== 'active') throw new Error('You cannot deactivate your own account.')
  const { data: previous } = await supabase.from('profiles').select('role, account_status').eq('id', userId).maybeSingle()
  const { error } = await supabase.from('profiles').update({ ...values, updated_at: new Date().toISOString(), is_active: values.account_status === 'active' }).eq('id', userId)
  if (error) throw new Error(error.message)
  if (previous?.account_status !== values.account_status) await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'status_changed', old_value: previous?.account_status, new_value: values.account_status })
  await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'profile_updated', new_value: values.full_name })
  revalidatePath('/admin/staff'); revalidatePath(`/admin/staff/${userId}`)
  return { success: true, role }
}

export async function updateStaffRole(userId: string, role: 'admin' | 'staff' | 'client') {
  const { supabase, user } = await requireRole('admin')
  if (userId === user.id && role !== 'admin') throw new Error('You cannot remove your own admin role.')
  const { data: previous } = await supabase.from('profiles').select('role, account_status').eq('id', userId).maybeSingle()
  if (!previous) throw new Error('Staff profile not found.')
  if (previous.role === 'admin' && role !== 'admin' && previous.account_status === 'active') {
    const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin').eq('account_status', 'active').eq('is_active', true)
    if ((count ?? 0) <= 1) throw new Error('The last active administrator cannot be demoted.')
  }
  const { error } = await supabase.from('profiles').update({ role, updated_at: new Date().toISOString() }).eq('id', userId)
  if (error) throw new Error(error.message)
  await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'role_changed', old_value: previous.role, new_value: role })
  revalidatePath('/admin/staff'); revalidatePath(`/admin/staff/${userId}`)
}

export async function addStaffAssignment(userId: string, projectId: string, teamRole: string) {
  const { supabase, user } = await requireRole('admin')
  const { error } = await supabase.from('project_team_members').upsert({ project_id: projectId, user_id: userId, team_role: teamRole.trim() || 'Team member' })
  if (error) throw new Error(error.message)
  await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'assignment_changed', new_value: projectId })
  revalidatePath(`/admin/staff/${userId}`); revalidatePath(`/admin/projects/${projectId}`)
}

export async function removeStaffAssignment(userId: string, projectId: string) {
  const { supabase } = await requireRole('admin')
  const { error } = await supabase.from('project_team_members').delete().eq('user_id', userId).eq('project_id', projectId)
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/staff/${userId}`); revalidatePath(`/admin/projects/${projectId}`)
}

export async function updateAssignment(table: 'proposal_requests' | 'procurement_requests', recordId: string, userId: string | null) {
  const { supabase, user } = await requireRole('admin')
  const { error } = await supabase.from(table).update({ assigned_to: userId, updated_at: new Date().toISOString() }).eq('id', recordId)
  if (error) throw new Error(error.message)
  await supabase.from('staff_activities').insert({ target_user_id: userId || user.id, actor_user_id: user.id, activity_type: 'assignment_changed', new_value: `${table}:${recordId}` })
  revalidatePath('/admin/staff'); revalidatePath('/admin/proposals'); revalidatePath('/admin/procurement')
} 

export async function getStaffDirectory() {
  const { supabase } = await requireRole('admin')
  const { data, error } = await supabase.from('profiles').select('id, full_name, email, phone, job_title, department, role, account_status, is_active, created_at, updated_at').order('full_name')
  if (error) throw new Error(error.message)
  return data ?? []
} 

export async function getStaffProfile(userId: string) {
  const { supabase } = await requireRole('admin')
  const [{ data: profile }, { data: assignments }, { data: activities }] = await Promise.all([
    supabase.from('profiles').select('id, full_name, email, phone, job_title, department, role, account_status, is_active, staff_notes, created_at, updated_at').eq('id', userId).maybeSingle(),
    supabase.from('project_team_members').select('project_id, team_role, projects(id, name, status)').eq('user_id', userId),
    supabase.from('staff_activities').select('id, activity_type, old_value, new_value, created_at').eq('target_user_id', userId).order('created_at', { ascending: false }).limit(30),
  ])
  if (!profile) throw new Error('Staff profile not found.')
  return { profile, assignments: assignments ?? [], activities: activities ?? [] }
} 

export async function getProjectsForAssignment() {
  const { supabase } = await requireRole('admin')
  const { data } = await supabase.from('projects').select('id, name, status').order('name')
  return data ?? []
} 

export async function getStaffAssignmentSummary(userId: string) {
  const { supabase } = await requireRole('admin')
  const [{ count: proposals }, { count: procurement }] = await Promise.all([
    supabase.from('proposal_requests').select('id', { count: 'exact', head: true }).eq('assigned_to', userId),
    supabase.from('procurement_requests').select('id', { count: 'exact', head: true }).eq('assigned_to', userId),
  ])
  return { proposals: proposals ?? 0, procurement: procurement ?? 0 }
} 

export async function updateStaffAssignment(table: 'proposal_requests' | 'procurement_requests', recordId: string, userId: string | null) {
  return updateAssignment(table, recordId, userId)
} 

export async function updateStaffRoleAndStatus(userId: string, role: 'admin' | 'staff' | 'client', status: 'active' | 'suspended' | 'inactive') {
  await updateStaffRole(userId, role)
  const form = new FormData(); form.set('full_name', ''); form.set('account_status', status)
  return { success: true }
} 

export async function updateStaffProfileFields(userId: string, fields: Record<string, string>) {
  const form = new FormData(); Object.entries(fields).forEach(([key, value]) => form.set(key, value))
  return updateStaffProfile(userId, form)
}

export async function updateStaffAccountStatus(userId: string, status: 'active' | 'suspended' | 'inactive') {
  const { supabase, user } = await requireRole('admin')
  if (!['active', 'suspended', 'inactive'].includes(status)) throw new Error('Invalid account status.')
  if (userId === user.id && status !== 'active') throw new Error('You cannot deactivate your own account.')
  const { data: target } = await supabase.from('profiles').select('role, account_status, is_active').eq('id', userId).maybeSingle()
  if (!target) throw new Error('Staff profile not found.')
  if (target.role === 'admin' && target.account_status === 'active' && status !== 'active') {
    const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin').eq('account_status', 'active').eq('is_active', true)
    if ((count ?? 0) <= 1) throw new Error('The last active administrator cannot be deactivated.')
  }
  const { error } = await supabase.from('profiles').update({ account_status: status, is_active: status === 'active', updated_at: new Date().toISOString() }).eq('id', userId)
  if (error) throw new Error(error.message)
  await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'status_changed', new_value: status })
  revalidatePath('/admin/staff'); revalidatePath(`/admin/staff/${userId}`)
}

export async function updateStaffNotes(userId: string, notes: string) {
  const { supabase, user } = await requireRole('admin')
  const { error } = await supabase.from('profiles').update({ staff_notes: notes.trim() || null, updated_at: new Date().toISOString() }).eq('id', userId)
  if (error) throw new Error(error.message)
  await supabase.from('staff_activities').insert({ target_user_id: userId, actor_user_id: user.id, activity_type: 'profile_updated', new_value: 'Notes updated' })
  revalidatePath(`/admin/staff/${userId}`)
}

export async function updateStaffRecord(userId: string, values: Record<string, string>) {
  const formData = new FormData(); Object.entries(values).forEach(([key, value]) => formData.set(key, value))
  return updateStaffProfile(userId, formData)
}

export async function listStaff() {
  return getStaffDirectory()
}

export async function loadStaffProfile(userId: string) {
  return getStaffProfile(userId)
}

export async function loadProjects() {
  return getProjectsForAssignment()
}

export async function loadStaffSummary(userId: string) {
  return getStaffAssignmentSummary(userId)
}

export async function saveStaffProfile(userId: string, values: Record<string, string>) {
  return updateStaffRecord(userId, values)
}

export async function saveStaffRole(userId: string, role: 'admin' | 'staff' | 'client') {
  return updateStaffRole(userId, role)
}

export async function saveStaffStatus(userId: string, status: 'active' | 'suspended' | 'inactive') {
  return updateStaffAccountStatus(userId, status)
}

export async function saveProjectAssignment(userId: string, projectId: string, teamRole: string) {
  return addStaffAssignment(userId, projectId, teamRole)
}

export async function removeProjectAssignment(userId: string, projectId: string) {
  return removeStaffAssignment(userId, projectId)
}

export async function saveRecordAssignment(table: 'proposal_requests' | 'procurement_requests', recordId: string, userId: string | null) {
  return updateAssignment(table, recordId, userId)
}

export async function loadAssignmentSummary(userId: string) {
  return getStaffAssignmentSummary(userId)
}

export async function loadDirectory() {
  return getStaffDirectory()
}

export async function loadProfile(userId: string) {
  return getStaffProfile(userId)
}

export async function loadProjectOptions() {
  return getProjectsForAssignment()
}

export async function saveProfile(userId: string, formData: FormData) {
  return updateStaffProfile(userId, formData)
}

export async function changeRole(userId: string, role: 'admin' | 'staff' | 'client') {
  return updateStaffRole(userId, role)
}

export async function changeStatus(userId: string, status: 'active' | 'suspended' | 'inactive') {
  return updateStaffAccountStatus(userId, status)
}

export async function assignToProject(userId: string, projectId: string, teamRole: string) {
  return addStaffAssignment(userId, projectId, teamRole)
}

export async function unassignFromProject(userId: string, projectId: string) {
  return removeStaffAssignment(userId, projectId)
}

export async function assignRecord(table: 'proposal_requests' | 'procurement_requests', recordId: string, userId: string | null) {
  return updateAssignment(table, recordId, userId)
}

export async function staffDirectory() {
  return getStaffDirectory()
}

export async function staffProfile(userId: string) {
  return getStaffProfile(userId)
}

export async function projectOptions() {
  return getProjectsForAssignment()
}

export async function assignmentSummary(userId: string) {
  return getStaffAssignmentSummary(userId)
}
