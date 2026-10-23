"use server"

import { revalidatePath } from 'next/cache'
import { requireRole } from '@/lib/authz'

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

export async function createProject(formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const name = String(formData.get('name') ?? '').trim()
  const clientId = String(formData.get('client_id') ?? '').trim() || null
  if (!name) return { error: 'Project name is required.' }
  const slug = `${slugify(name)}-${Date.now().toString(36)}`
  const { data: duplicate } = await supabase.from('projects').select('id, name, location').eq('client_id', clientId).ilike('name', name).limit(1).maybeSingle()
  if (duplicate) return { error: `A similar project already exists: ${duplicate.name}.` }
  const { data, error } = await supabase.from('projects').insert({ name, slug, client_id: clientId, description: String(formData.get('description') ?? '').trim() || null, project_type: String(formData.get('project_type') ?? '').trim() || null, location: String(formData.get('location') ?? '').trim() || null, status: 'planning', phase: String(formData.get('phase') ?? '').trim() || null, progress_percent: 0, start_date: String(formData.get('start_date') ?? '') || null, target_completion_date: String(formData.get('target_completion_date') ?? '') || null }).select('id').single()
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: data.id, actor_user_id: user.id, activity_type: 'created' })
  revalidatePath('/admin/projects'); revalidatePath('/admin');
  return { success: true, id: data.id }
}

export async function updateProject(projectId: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const { data: before } = await supabase.from('projects').select('status, phase, project_lead_id').eq('id', projectId).maybeSingle()
  const payload = { name: String(formData.get('name') ?? '').trim(), description: String(formData.get('description') ?? '').trim() || null, project_type: String(formData.get('project_type') ?? '').trim() || null, location: String(formData.get('location') ?? '').trim() || null, status: String(formData.get('status') ?? 'planning'), phase: String(formData.get('phase') ?? '').trim() || null, project_lead_id: String(formData.get('project_lead_id') ?? '') || null, progress_percent: Math.max(0, Math.min(100, Number(formData.get('progress_percent') ?? 0))), internal_notes: String(formData.get('internal_notes') ?? '').trim() || null, start_date: String(formData.get('start_date') ?? '') || null, target_completion_date: String(formData.get('target_completion_date') ?? '') || null, completion_date: String(formData.get('completion_date') ?? '') || null }
  const { error } = await supabase.from('projects').update(payload).eq('id', projectId)
  if (error) return { error: error.message }
  const events = [{ activity_type: 'status_changed', old_value: before?.status, new_value: payload.status }, { activity_type: 'phase_changed', old_value: before?.phase, new_value: payload.phase }, { activity_type: 'lead_assigned', old_value: before?.project_lead_id, new_value: payload.project_lead_id }].filter((event) => event.old_value !== event.new_value).map((event) => ({ ...event, project_id: projectId, actor_user_id: user.id }))
  if (events.length) await supabase.from('project_activities').insert(events)
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/admin/projects'); revalidatePath('/admin')
  return { success: true }
}

const MEDIA_TYPES = new Map([['image/jpeg', 'image'], ['image/png', 'image'], ['image/webp', 'image'], ['video/mp4', 'video'], ['video/webm', 'video']])

export async function toggleProjectPublication(projectId: string, current: boolean) {
  const { supabase, user } = await requireRole('admin')
  const { error } = await supabase.from('projects').update({ is_public: !current }).eq('id', projectId)
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: projectId, actor_user_id: user.id, activity_type: !current ? 'published' : 'unpublished' })
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/admin/projects'); revalidatePath('/projects')
  return { success: !current ? 'Project published.' : 'Project unpublished.' }
}

export async function addProjectMedia(projectId: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const files = formData.getAll('files').filter((value): value is File => value instanceof File && value.size > 0)
  const stage = String(formData.get('stage') ?? 'progress')
  const serviceId = String(formData.get('service_id') ?? '').trim() || null
  const caption = String(formData.get('caption') ?? '').trim() || null
  if (!files.length) return { error: 'Choose at least one image or video.' }
  if (!['before', 'progress', 'completed'].includes(stage)) return { error: 'Choose a valid project stage.' }
  if (serviceId) { const { data } = await supabase.from('project_services').select('project_id').eq('project_id', projectId).eq('service_id', serviceId).maybeSingle(); if (!data) return { error: 'That service is not linked to this project.' } }
  const { count } = await supabase.from('project_media').select('id', { count: 'exact', head: true }).eq('project_id', projectId)
  const created: string[] = []
  for (const file of files) {
    const mediaType = MEDIA_TYPES.get(file.type)
    const max = mediaType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (!mediaType || file.size > max) return { error: `${file.name} is not a supported file type or exceeds its size limit.` }
    const id = crypto.randomUUID(); const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-'); const storagePath = `projects/${projectId}/${id}/${safeName}`
    const { error: uploadError } = await supabase.storage.from('project-media').upload(storagePath, file, { contentType: file.type, upsert: false })
    if (uploadError) { await Promise.all(created.map((path) => supabase.storage.from('project-media').remove([path]))); return { error: `Upload failed for ${file.name}. Please try again.` } }
    const { error: insertError } = await supabase.from('project_media').insert({ id, project_id: projectId, service_id: serviceId, media_type: mediaType, stage, storage_path: storagePath, mime_type: file.type, file_size_bytes: file.size, caption, uploaded_by: user.id, sort_order: (count ?? 0) + created.length })
    if (insertError) { await supabase.storage.from('project-media').remove([storagePath]); await Promise.all(created.map((path) => supabase.storage.from('project-media').remove([path]))); return { error: `Could not save ${file.name}. Please try again.` }
    }
    created.push(storagePath)
  }
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath(`/projects`)
  return { success: `${created.length} media file${created.length === 1 ? '' : 's'} uploaded.` }
}

export async function toggleProjectMediaPublication(projectId: string, mediaId: string, current: boolean) {
  const { supabase } = await requireRole('admin')
  const { error } = await supabase.from('project_media').update({ is_published: !current, updated_at: new Date().toISOString() }).eq('id', mediaId).eq('project_id', projectId)
  if (error) return { error: error.message }; revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/projects'); return { success: true }
}

export async function reorderProjectMedia(projectId: string, mediaId: string, targetOrder: number) {
  const { supabase } = await requireRole(['admin', 'staff']); const { error } = await supabase.from('project_media').update({ sort_order: targetOrder, updated_at: new Date().toISOString() }).eq('id', mediaId).eq('project_id', projectId)
  if (error) return { error: error.message }; revalidatePath(`/admin/projects/${projectId}`); return { success: true }
}

export async function deleteProjectMedia(projectId: string, mediaId: string, storagePath: string) {
  const { supabase } = await requireRole(['admin', 'staff']); const { data: media } = await supabase.from('project_media').select('is_published, storage_path').eq('id', mediaId).eq('project_id', projectId).maybeSingle()
  if (media?.is_published) return { error: 'Unpublish this media before deleting it.' }
  const { error } = await supabase.from('project_media').delete().eq('id', mediaId).eq('project_id', projectId)
  if (error) return { error: error.message }; await supabase.storage.from('project-media').remove([media?.storage_path || storagePath]); revalidatePath(`/admin/projects/${projectId}`); return { success: true }
}

export async function addTeamMember(projectId: string, formData: FormData) {
  const { supabase, user } = await requireRole('admin')
  const userId = String(formData.get('user_id') ?? '')
  if (!userId) return { error: 'Choose a team member.' }
  const { error } = await supabase.from('project_team_members').upsert({ project_id: projectId, user_id: userId, team_role: String(formData.get('team_role') ?? 'Team member') })
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: projectId, actor_user_id: user.id, activity_type: 'team_member_added', new_value: userId })
  revalidatePath(`/admin/projects/${projectId}`); return { success: true }
}

const UPDATE_TYPES = ['progress', 'milestone', 'decision', 'risk', 'schedule', 'procurement', 'general'] as const

export async function publishProjectUpdate(projectId: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const updateType = String(formData.get('update_type') ?? 'progress')
  const isClientVisible = formData.get('is_client_visible') === 'on'
  if (!title || !content) return { error: 'Title and content are required.' }
  if (!UPDATE_TYPES.includes(updateType as (typeof UPDATE_TYPES)[number])) return { error: 'Choose a valid update type.' }
  const { data: recent } = await supabase.from('project_updates').select('id').eq('project_id', projectId).eq('title', title).eq('content', content).gte('created_at', new Date(Date.now() - 60_000).toISOString()).limit(1)
  if (recent?.length) return { error: 'This update was already submitted.' }
  const { error } = await supabase.from('project_updates').insert({ project_id: projectId, author_id: user.id, title, content, update_type: updateType, is_client_visible: isClientVisible, published_at: new Date().toISOString() })
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: projectId, actor_user_id: user.id, activity_type: 'update_published', new_value: title })
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/admin/updates'); revalidatePath('/portal')
  return { success: true }
}

export async function updateProjectUpdate(updateId: string, projectId: string, formData: FormData) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const updateType = String(formData.get('update_type') ?? 'progress')
  if (!title || !content || !UPDATE_TYPES.includes(updateType as (typeof UPDATE_TYPES)[number])) return { error: 'Provide a title, content, and valid update type.' }
  const { error } = await supabase.from('project_updates').update({ title, content, update_type: updateType, is_client_visible: formData.get('is_client_visible') === 'on' }).eq('id', updateId).eq('project_id', projectId)
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: projectId, actor_user_id: user.id, activity_type: 'update_published', new_value: `Edited: ${title}` })
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/admin/updates'); revalidatePath('/portal')
  return { success: true }
}

export async function archiveProjectUpdate(updateId: string, projectId: string) {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const { error } = await supabase.from('project_updates').update({ is_client_visible: false, published_at: null }).eq('id', updateId).eq('project_id', projectId)
  if (error) return { error: error.message }
  await supabase.from('project_activities').insert({ project_id: projectId, actor_user_id: user.id, activity_type: 'update_published', new_value: `Archived: ${updateId}` })
  revalidatePath(`/admin/projects/${projectId}`); revalidatePath('/admin/updates'); revalidatePath('/portal')
  return { success: true }
}
