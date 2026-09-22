'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage('')
    const form = new FormData(event.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email: String(form.get('email')), password: String(form.get('password')), options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`, data: { full_name: String(form.get('name')) } } })
    if (error) { setError(error.message); return }
    setMessage('Check your email to confirm your account, then sign in.')
  }
  return <main className="min-h-[70vh] px-5 py-20 md:px-8"><div className="mx-auto max-w-md border border-border p-7 md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client access</p><h1 className="mt-4 font-heading text-3xl font-bold">Create your account</h1><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Full name<input required name="name" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" /></label><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Email<input required type="email" name="email" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" /></label><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Password<input required minLength={8} type="password" name="password" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}{message && <p role="status" className="text-sm text-gold">{message}</p>}<button className="w-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background">Create account</button></form><p className="mt-6 text-sm text-muted-foreground">Already registered? <Link href="/auth/login" className="text-gold hover:underline">Sign in</Link></p></div></main>
}
