import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Brand } from '@/components/brand'
import { company } from '@/lib/site-data'

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Quality', href: '/quality' },
  { label: 'Properties', href: '/properties' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-charcoal">
      <div className="blueprint-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Brand />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {company.name} delivers construction, property development and specialist finishing
              solutions with a commitment to quality, precision and lasting value.
            </p>
            <div className="mt-6 flex gap-4">
              {company.socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-gold"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Company</h3>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-gold/70" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-foreground">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-gold/70" />
                <a href={`mailto:${company.email}`} className="hover:text-foreground">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-gold/70" />
                {company.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 {company.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
