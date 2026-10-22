import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; mediaId: string }> }) {
  const { slug, mediaId } = await params
  const supabase = await createClient()
  const { data: media, error } = await supabase
    .from('project_media')
    .select('storage_path,projects!inner(slug,is_public,status)')
    .eq('id', mediaId)
    .eq('is_published', true)
    .eq('projects.slug', slug)
    .eq('projects.is_public', true)
    .in('projects.status', ['active', 'completed'])
    .maybeSingle()

  if (error || !media) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })

  const { data: signed, error: signedError } = await supabase.storage.from('project-media').createSignedUrl(media.storage_path, 300)
  if (signedError || !signed?.signedUrl) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })
  return NextResponse.redirect(signed.signedUrl, { status: 307, headers: { 'Cache-Control': 'private, no-store' } })
}
