import Link from 'next/link'

export default function ForbiddenPage() {
  return <main className="min-h-[70vh] px-5 py-20 md:px-8"><div className="mx-auto max-w-xl border border-border bg-card p-8 md:p-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Access restricted</p><h1 className="mt-4 font-heading text-3xl font-bold">You don&apos;t have permission to access this area.</h1><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Sign in with an account that has the appropriate Lumora role, or return to the public site.</p><Link href="/" className="mt-8 inline-flex bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-background">Return home</Link></div></main>
}
