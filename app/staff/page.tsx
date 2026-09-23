import Link from 'next/link'
import { requireRole } from '@/lib/authz'

export default async function StaffPage() {
  const { supabase, profile } = await requireRole(['staff', 'admin'])
  const [{ count: proposals }, { count: projects }, { count: procurement }] = await Promise.all([
    supabase.from('proposal_requests').select('id', { count: 'exact', head: true }).in('status', ['new', 'reviewing']),
    supabase.from('projects').select('id', { count: 'exact', head: true }).in('status', ['planning', 'active', 'on_hold']),
    supabase.from('procurement_requests').select('id', { count: 'exact', head: true }).in('status', ['new', 'sourcing', 'quoted']),
  ])
  return <main className="min-h-[70vh] bg-background px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl"><div className="border-b border-border pb-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Staff workspace</p><h1 className="mt-3 font-heading text-4xl font-bold">Operations overview</h1><p className="mt-3 text-muted-foreground">Welcome, {profile?.full_name || 'Lumora team'}. This workspace is limited to operational workflows.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3"><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Open proposals</p><p className="mt-4 font-heading text-4xl font-bold">{proposals ?? 0}</p></div><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Active projects</p><p className="mt-4 font-heading text-4xl font-bold">{projects ?? 0}</p></div><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Procurement queue</p><p className="mt-4 font-heading text-4xl font-bold">{procurement ?? 0}</p></div></div><div className="mt-10 flex flex-wrap gap-4"><Link href="/proposal" className="border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em]">Public request form</Link>{profile?.role === 'admin' && <Link href="/admin" className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background">Admin workspace</Link>}</div></div></main>
}
