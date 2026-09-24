import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/authz'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase, user } = await requireRole('client')
  const { data: client } = await supabase.from('clients').select('id').eq('profile_id', user.id).maybeSingle()
  const { data: document } = await supabase.from('documents').select('storage_path, name, mime_type').eq('id', id).eq('client_id', client?.id ?? '').eq('visibility', 'client').eq('document_status', 'active').maybeSingle()
  if (!document?.storage_path) return new NextResponse('Not found', { status: 404 })
  const { data, error } = await supabase.storage.from('documents').createSignedUrl(document.storage_path, 300)
  if (error || !data?.signedUrl) return new NextResponse('Unavailable', { status: 404 })
  return NextResponse.redirect(data.signedUrl)
}
