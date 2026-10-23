import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
        <Link href="/admin" className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-foreground">Lumora DeMoore <span className="text-gold">Admin workspace</span></Link>
        <nav aria-label="Admin navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/admin/projects" className="hover:text-gold">Projects</Link>
          <Link href="/admin/clients" className="hover:text-gold">Clients</Link>
          <Link href="/admin/proposals" className="hover:text-gold">Proposals</Link>
          <Link href="/" className="hover:text-gold">View website</Link>
        </nav>
      </div>
    </header>
    <div className="pt-2">{children}</div>
  </div>
}
