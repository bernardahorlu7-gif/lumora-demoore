import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

const base =
  'group inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50'

const sizes = {
  default: 'h-12 px-7',
  lg: 'h-14 px-9 text-sm',
  sm: 'h-10 px-5 text-[0.7rem]',
}

const variants = {
  gold: 'bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(212,175,55,0.6)]',
  outline:
    'border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5',
  ghost: 'text-foreground/80 hover:text-gold',
  light:
    'bg-foreground text-background hover:bg-gold hover:text-primary-foreground hover:-translate-y-0.5',
}

type Variant = keyof typeof variants
type Size = keyof typeof sizes

type Props = {
  variant?: Variant
  size?: Size
  className?: string
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>)
  | ({ href?: undefined } & ComponentProps<'button'>)
)

export function LumoraButton({ variant = 'gold', size = 'default', className, ...props }: Props) {
  const classes = cn(base, sizes[size], variants[variant], className)

  if ('href' in props && props.href) {
    const { href, ...rest } = props as { href: string }
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    )
  }

  const { children, ...rest } = props as ComponentProps<'button'>
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
