'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site-data'
import { Brand } from '@/components/brand'
import { LumoraButton } from '@/components/lumora-button'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-background/80 to-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Brand />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-xs font-medium uppercase tracking-[0.16em] transition-colors',
                  active ? 'text-gold' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300',
                    active ? 'w-full' : 'w-0',
                  )}
                  aria-hidden
                />
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppButton compact />
          <LumoraButton href="/proposal" size="sm">
            Request a Proposal
          </LumoraButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex size-11 items-center justify-center text-foreground lg:hidden"
        >
          <Menu className="size-6" />
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-background transition-all duration-500 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex h-20 items-center justify-between px-5">
          <Brand onClick={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex size-11 items-center justify-center text-foreground"
          >
            <X className="size-6" />
          </button>
        </div>
        <div className="relative flex flex-1 flex-col justify-center gap-1 px-6">
          {navLinks.map((link, i) => {
            const active =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
                className={cn(
                  'border-b border-border/60 py-4 font-heading text-2xl font-bold uppercase tracking-tight transition-all duration-500',
                  open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
                  active ? 'text-gold' : 'text-foreground',
                )}
              >
                <span className="mr-4 text-xs font-medium text-gold/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </Link>
            )
          })}
        </div>
        <div className="relative flex flex-col gap-3 px-6 pb-10">
          <LumoraButton href="/proposal" className="w-full" onClick={() => setOpen(false)}>
            Request a Proposal
          </LumoraButton>
          <WhatsAppButton className="w-full" />
        </div>
      </div>
    </header>
  )
}
