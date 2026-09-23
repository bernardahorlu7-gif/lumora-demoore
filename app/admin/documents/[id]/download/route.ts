import { NextResponse } from 'next/server'
import { createDocumentDownloadUrl } from '@/lib/document-actions'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try { const { id } = await params; const result = await createDocumentDownloadUrl(id); return NextResponse.redirect(result.url) } catch { return NextResponse.json({ error: 'Document unavailable' }, { status: 404 }) }
}
