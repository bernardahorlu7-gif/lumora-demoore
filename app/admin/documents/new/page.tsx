import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/authz'
import { uploadDocument } from '@/lib/document-actions'

export default async function NewDocumentPage() {
  await requireRole('admin')
  async function action(formData: FormData) { 'use server'; const id = await uploadDocument(formData); redirect(`/admin/documents/${id}`) }
  return <main className="min-h-screen bg-background px-5 py-14 md:px-8"><div className="mx-auto max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Document registry</p><h1 className="mt-3 font-heading text-4xl font-bold">Upload document</h1><form action={action} encType="multipart/form-data" className="mt-10 space-y-5 border border-border p-6"><label className="block text-sm font-semibold">File<input required type="file" name="file" className="mt-2 block w-full border border-border p-3 text-sm"/></label><label className="block text-sm font-semibold">Document name<input required name="name" className="mt-2 w-full border border-border bg-transparent p-3 text-sm"/></label><label className="block text-sm font-semibold">Category<input name="category" defaultValue="General" className="mt-2 w-full border border-border bg-transparent p-3 text-sm"/></label><label className="block text-sm font-semibold">Visibility<select name="visibility" className="mt-2 w-full border border-border bg-background p-3 text-sm"><option value="internal">Internal</option><option value="client_visible">Client visible</option></select></label><button className="bg-foreground px-5 py-3 text-sm font-semibold text-background">Upload document</button></form></div></main>
}
