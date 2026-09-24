import Link from 'next/link'
import { requireRole } from '@/lib/authz'
import { updateClientProfile } from '@/lib/portal-actions'

export default async function PortalProfilePage() {
  const { user, profile } = await requireRole('client')
  return <main className="min-h-[70vh] bg-background px-5 py-16 md:px-8"><div className="mx-auto max-w-2xl"><Link href="/portal" className="text-xs uppercase tracking-[0.15em] text-gold">← Back to portal</Link><p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Account</p><h1 className="mt-3 font-heading text-4xl font-bold">Your profile</h1><form action={updateClientProfile} className="mt-10 border border-border bg-card p-6"><label className="block text-sm">Full name<input name="full_name" defaultValue={profile?.full_name ?? ''} className="mt-2 w-full border border-border bg-background p-3" /></label><label className="mt-5 block text-sm">Email<input value={user.email ?? ''} disabled className="mt-2 w-full border border-border bg-muted p-3 text-muted-foreground" /></label><label className="mt-5 block text-sm">Phone<input name="phone" defaultValue={profile?.phone ?? ''} className="mt-2 w-full border border-border bg-background p-3" /></label><label className="mt-5 block text-sm">Job title<input name="job_title" defaultValue={profile?.job_title ?? ''} className="mt-2 w-full border border-border bg-background p-3" /></label><button className="mt-6 bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background">Save changes</button></form></div></main>
}
