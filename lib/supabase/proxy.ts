import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )
  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname
  const isProtected = pathname === '/portal' || pathname.startsWith('/portal/') || pathname === '/admin' || pathname.startsWith('/admin/') || pathname === '/staff' || pathname.startsWith('/staff/')
  if (isProtected && !user) return NextResponse.redirect(new URL('/auth/login', request.url))
  if (user && (pathname === '/admin' || pathname.startsWith('/admin/') || pathname === '/staff' || pathname.startsWith('/staff/'))) {
    const { data: profile } = await supabase.from('profiles').select('role, is_active, account_status').eq('id', user.id).maybeSingle()
    if (!profile?.is_active || profile.account_status !== 'active' || (pathname.startsWith('/admin') && profile.role !== 'admin') || (pathname.startsWith('/staff') && !['staff', 'admin'].includes(profile.role))) {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }
  return response
}
