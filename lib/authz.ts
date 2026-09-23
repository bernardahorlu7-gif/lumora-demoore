import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AppRole = 'client' | 'staff' | 'admin'

export async function getAuthContext() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, profile: null, role: null as AppRole | null }
  const { data: profile } = await supabase.from('profiles').select('id, full_name, email, company_name, role, is_active').eq('id', user.id).maybeSingle()
  const role = profile?.is_active ? (profile.role as AppRole) : null
  return { supabase, user, profile, role }
}

export async function requireAuth() {
  const context = await getAuthContext()
  if (!context.user) redirect('/auth/login')
  return context as typeof context & { user: NonNullable<typeof context.user>; role: AppRole | null }
}

export async function requireRole(roles: AppRole | AppRole[]) {
  const context = await requireAuth()
  const allowed = Array.isArray(roles) ? roles : [roles]
  if (!context.role || !allowed.includes(context.role)) redirect('/forbidden')
  return context as typeof context & { role: AppRole }
}

export function roleHome(role: AppRole | null) {
  if (role === 'admin') return '/admin'
  if (role === 'staff') return '/staff'
  return '/portal'
}
