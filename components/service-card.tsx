import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden border border-border bg-charcoal p-7 transition-all duration-500 hover:border-gold/50 hover:bg-charcoal-light"
    >
      <span
        className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full"
        aria-hidden
      />
      <div>
        <div className="flex size-12 items-center justify-center border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/10">
          <Icon className="size-5" />
        </div>
        <h3 className="mt-6 font-heading text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        Explore Service
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
