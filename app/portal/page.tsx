import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const statusStyles: Record<string, string> = {
  planning: 'text-gold',
  active: 'text-emerald-400',
  on_hold: 'text-orange-300',
  completed: 'text-sky-300',
}

export default async function PortalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: profile }, { data: clients }, { data: notifications }] = await Promise.all([
    supabase.from('profiles').select('full_name, company_name, role').eq('id', user.id).maybeSingle(),
    supabase.from('clients').select('id, company_name, contact_name').eq('profile_id', user.id).limit(1),
    supabase.from('notifications').select('id, title, body, read_at, created_at').order('created_at', { ascending: false }).limit(5),
  ])
  const clientId = clients?.[0]?.id
  const { data: projects } = clientId
    ? await supabase.from('projects').select('id, name, slug, project_type, location, status, target_completion_date').eq('client_id', clientId).order('created_at', { ascending: false })
    : { data: [] }
  const projectIds = projects?.map((project) => project.id) ?? []
  const { data: updates } = projectIds.length
    ? await supabase.from('project_updates').select('id, project_id, title, content, update_type, published_at, created_at').in('project_id', projectIds).eq('is_client_visible', true).order('created_at', { ascending: false }).limit(5)
    : { data: [] }

  return <main className="min-h-[70vh] bg-background px-5 py-16 md:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client portal</p><h1 className="mt-3 font-heading text-4xl font-bold">Welcome, {profile?.full_name || user.email}</h1><p className="mt-3 max-w-xl text-muted-foreground">Your secure view of project progress, documents and communication.</p></div><div className="flex gap-3"><Link href="/proposal" className="inline-flex bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background">Request proposal</Link><Link href="/contact" className="inline-flex border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">Contact team</Link></div></div>
    <div className="mt-10 grid gap-5 md:grid-cols-3"><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Account</p><p className="mt-4 text-lg">{profile?.company_name || 'Individual client'}</p><p className="mt-2 text-sm text-muted-foreground">{user.email}</p></div><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Projects</p><p className="mt-4 text-3xl font-heading font-bold">{projects?.length ?? 0}</p><p className="mt-2 text-sm text-muted-foreground">Projects associated with your account</p></div><div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Notifications</p><p className="mt-4 text-3xl font-heading font-bold">{notifications?.filter((item) => !item.read_at).length ?? 0}</p><p className="mt-2 text-sm text-muted-foreground">Unread updates</p></div></div>
    <section className="mt-14"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Active work</p><h2 className="mt-2 font-heading text-2xl font-bold">Your projects</h2></div><span className="text-sm text-muted-foreground">{profile?.role || 'client'} access</span></div><div className="mt-5 grid gap-4 md:grid-cols-2">{projects?.length ? projects.map((project) => <article key={project.id} className="border border-border bg-card p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{project.project_type || 'Project'}{project.location ? ` · ${project.location}` : ''}</p><h3 className="mt-3 font-heading text-xl font-bold">{project.name}</h3></div><span className={`text-xs font-semibold uppercase tracking-[0.15em] ${statusStyles[project.status] || 'text-muted-foreground'}`}>{project.status.replace('_', ' ')}</span></div>{project.target_completion_date && <p className="mt-5 text-sm text-muted-foreground">Target completion: {new Date(project.target_completion_date).toLocaleDateString()}</p>}<Link href={`/projects/${project.slug}`} className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.15em] text-gold hover:text-foreground">View project <span aria-hidden="true" className="ml-2">→</span></Link></article>) : <div className="border border-dashed border-border p-8 text-sm text-muted-foreground">No projects are linked to this account yet. Contact the Lumora team if you expected to see a project here.</div>}</div></section>
    <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]"><section><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Project communication</p><h2 className="mt-2 font-heading text-2xl font-bold">Recent updates</h2><div className="mt-5 divide-y divide-border border-y border-border">{updates?.length ? updates.map((update) => <article key={update.id} className="py-5"><div className="flex items-center justify-between gap-4"><p className="font-medium">{update.title}</p><span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{update.update_type}</span></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{update.content}</p></article>) : <p className="py-6 text-sm text-muted-foreground">Project updates will appear here once your team publishes them.</p>}</div></section><section><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Notifications</p><h2 className="mt-2 font-heading text-2xl font-bold">Latest activity</h2><div className="mt-5 divide-y divide-border border-y border-border">{notifications?.length ? notifications.map((item) => <article key={item.id} className="py-5"><p className="font-medium">{item.title}</p><p className="mt-1 text-sm text-muted-foreground">{item.body}</p></article>) : <p className="py-6 text-sm text-muted-foreground">You are all caught up.</p>}</div></section></div>
  </div></main>
}
