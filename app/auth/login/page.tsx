'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError('')
    const form = new FormData(event.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email: String(form.get('email')), password: String(form.get('password')) })
    setPending(false)
    if (error) { setError(error.message.toLowerCase().includes('confirm') ? 'Please confirm your email before signing in.' : 'Invalid email or password.'); return }
    const { data: profile } = await supabase.from('profiles').select('role, is_active, account_status').eq('id', (await supabase.auth.getUser()).data.user?.id ?? '').maybeSingle()
    if (!profile?.is_active || profile.account_status !== 'active') {
      await supabase.auth.signOut()
      setError('Your account is inactive or suspended. Please contact Lumora support.')
      return
    }
    router.push(profile.role === 'admin' ? '/admin' : profile.role === 'staff' ? '/staff' : '/portal'); router.refresh()
  }
  return <main className="min-h-[70vh] px-5 py-20 md:px-8"><div className="mx-auto max-w-md border border-border p-7 md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client access</p><h1 className="mt-4 font-heading text-3xl font-bold">Sign in to Lumora</h1><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Email<input required type="email" name="email" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" /></label><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Password<input required type="password" name="password" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<button disabled={pending} className="w-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background disabled:opacity-50">{pending ? 'Signing in…' : 'Sign in'}</button></form><p className="mt-6 text-sm text-muted-foreground">Need an account? <Link href="/auth/sign-up" className="text-gold hover:underline">Create one</Link></p></div></main>
}
