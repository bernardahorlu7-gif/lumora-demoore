import Link from 'next/link'
import { requireRole } from '@/lib/authz'
import { ProposalList } from '@/components/proposal-list'

const statuses = ['new', 'reviewing', 'contacted', 'qualified', 'proposal', 'quoted', 'won', 'lost', 'declined', 'closed']
const priorities = ['low', 'normal', 'high', 'urgent']

export default async function ProposalsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { supabase, profile } = await requireRole(['admin', 'staff'])
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim() : ''
  const status = typeof params.status === 'string' ? params.status : ''
  const priority = typeof params.priority === 'string' ? params.priority : ''
  const range = typeof params.range === 'string' ? params.range : ''
  let query = supabase.from('proposal_requests').select('id, name, email, phone, company_name, service_slug, project_type, project_name, project_location, status, priority, assigned_to, created_at, updated_at').order('created_at', { ascending: false }).limit(100)
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company_name.ilike.%${q}%,phone.ilike.%${q}%,project_name.ilike.%${q}%,id.eq.${q}`)
  if (status && statuses.includes(status)) query = query.eq('status', status)
  if (priority && priorities.includes(priority)) query = query.eq('priority', priority)
  if (range === 'today') query = query.gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
  if (range === '7') query = query.gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString())
  if (range === '30') query = query.gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString())
  const [{ data: proposals }, { data: services }] = await Promise.all([query, supabase.from('services').select('slug, name').eq('is_active', true).order('name')])
  const filters = new URLSearchParams()
  if (q) filters.set('q', q)
  return <main className="min-h-[70vh] bg-background px-5 py-14 md:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end"><div><Link href="/admin" className="text-xs uppercase tracking-[0.16em] text-gold">← Workspace</Link><p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Lead pipeline</p><h1 className="mt-3 font-heading text-4xl font-bold">Proposals</h1><p className="mt-3 max-w-2xl text-muted-foreground">Review incoming opportunities, keep follow-ups visible, and move qualified work into delivery.</p></div><p className="text-sm text-muted-foreground">Signed in as {profile.full_name || profile.email}</p></div><form className="mt-8 grid gap-3 border border-border bg-card p-4 md:grid-cols-[1fr_180px_160px_150px_auto]"><input name="q" defaultValue={q} placeholder="Search contact, company, project or ID" className="border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-gold" /><select name="status" defaultValue={status} className="border border-border bg-background px-3 py-3 text-sm text-foreground"><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select><select name="priority" defaultValue={priority} className="border border-border bg-background px-3 py-3 text-sm text-foreground"><option value="">All priorities</option>{priorities.map((item) => <option key={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select><select name="range" defaultValue={range} className="border border-border bg-background px-3 py-3 text-sm text-foreground"><option value="">Any date</option><option value="today">Today</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select><button className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">Filter</button></form><div className="mt-8 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{proposals?.length || 0} requests shown</p><p className="text-xs text-muted-foreground">{services?.length || 0} active services</p></div><div className="mt-4"><ProposalList proposals={proposals || []} /></div></div></main>
}
