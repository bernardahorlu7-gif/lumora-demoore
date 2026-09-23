'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/authz'

export async function updateDocumentMetadata(id: string, formData: FormData) {
  const { supabase, user } = await requireRole('admin')
  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim() || null
  const category = String(formData.get('category') || '').trim() || null
  const documentType = String(formData.get('document_type') || '').trim() || null
  const visibility = String(formData.get('visibility') || 'internal')
  const status = String(formData.get('document_status') || 'active')
  if (!name) throw new Error('Document name is required')
  const { data: current } = await supabase.from('documents').select('name, description, category, document_type, visibility, document_status').eq('id', id).single()
  const { error } = await supabase.from('documents').update({ name, description, category, document_type: documentType, visibility, document_status: status, archived_at: status === 'archived' ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error(error.message)
  await supabase.from('document_activities').insert({ document_id: id, actor_user_id: user.id, activity_type: status === 'archived' ? 'archived' : 'updated', old_value: JSON.stringify(current), new_value: JSON.stringify({ name, description, category, documentType, visibility, status }) })
  revalidatePath('/admin/documents')
  revalidatePath(`/admin/documents/${id}`)
}

export async function createDocumentDownloadUrl(id: string) {
  const { supabase } = await requireRole('admin')
  const { data: document, error } = await supabase.from('documents').select('storage_path, name, mime_type').eq('id', id).single()
  if (error || !document?.storage_path) throw new Error('Document file is unavailable')
  const { data, error: signedError } = await supabase.storage.from('documents').createSignedUrl(document.storage_path, 300)
  if (signedError || !data?.signedUrl) throw new Error('Could not create secure document link')
  return { url: data.signedUrl, name: document.name, mimeType: document.mime_type }
}

export async function archiveDocument(id: string, archived: boolean) {
  const { supabase, user } = await requireRole('admin')
  const status = archived ? 'archived' : 'active'
  const { error } = await supabase.from('documents').update({ document_status: status, archived_at: archived ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error(error.message)
  await supabase.from('document_activities').insert({ document_id: id, actor_user_id: user.id, activity_type: archived ? 'archived' : 'updated', new_value: status })
  revalidatePath('/admin/documents')
  revalidatePath(`/admin/documents/${id}`)
}

export async function uploadDocument(formData: FormData) {
  const { supabase, user } = await requireRole('admin')
  const file = formData.get('file') as File | null
  const name = String(formData.get('name') || file?.name || '').trim()
  const projectId = String(formData.get('project_id') || '') || null
  const clientId = String(formData.get('client_id') || '') || null
  if (!file || !name) throw new Error('A file and document name are required')
  const path = `staff/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
  const { error: uploadError } = await supabase.storage.from('documents').upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: false })
  if (uploadError) throw new Error(uploadError.message)
  const { data: document, error } = await supabase.from('documents').insert({ name, original_filename: file.name, mime_type: file.type, size_bytes: file.size, storage_path: path, project_id: projectId, client_id: clientId, uploaded_by: user.id, visibility: String(formData.get('visibility') || 'internal'), category: String(formData.get('category') || 'General') }).select('id').single()
  if (error) { await supabase.storage.from('documents').remove([path]); throw new Error(error.message) }
  await supabase.from('document_activities').insert({ document_id: document.id, actor_user_id: user.id, activity_type: 'uploaded', new_value: file.name })
  revalidatePath('/admin/documents')
  return document.id
}

export async function getDocumentUrl(id: string) { return createDocumentDownloadUrl(id) }

export async function getDocumentClient() { return createClient() }
