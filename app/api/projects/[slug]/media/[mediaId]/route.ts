import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; mediaId: string }> }) {
  const { slug, mediaId } = await params
  const supabase = await createClient()
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', slug)
    .eq('is_public', true)
    .in('status', ['active', 'completed'])
    .maybeSingle()

  if (projectError || !project) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })

  const { data: media, error: mediaError } = await supabase
    .from('project_media')
    .select('storage_path')
    .eq('id', mediaId)
    .eq('project_id', project.id)
    .eq('is_published', true)
    .maybeSingle()

  if (mediaError || !media) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })

  const { data: signed, error: signedError } = await supabase.storage.from('project-media').createSignedUrl(media.storage_path, 300)
  if (signedError || !signed?.signedUrl) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })
  return NextResponse.redirect(signed.signedUrl, { status: 307, headers: { 'Cache-Control': 'private, no-store' } })
}
