import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Brand wordmark. Uses an infinity mark echoing the Lumora DeMoore logo
 * plus a crisp typographic lockup so it stays sharp at any size.
 */
export function Brand({
  className,
  onClick,
  compact = false,
}: {
  className?: string
  onClick?: () => void
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Lumora DeMoore Properties — home"
      className={cn('group flex items-center gap-3', className)}
    >
      <svg
        viewBox="0 0 64 32"
        className="h-7 w-14 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 16c0 6.6-3.6 11-9 11S2 22.6 2 16 5.6 5 11 5s9 4.4 15 11c6 6.6 9.6 11 15 11s9-4.4 9-11-3.6-11-9-11-9 4.4-15 11"
          stroke="url(#g)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="g" x1="2" y1="5" x2="62" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4E4A6" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#9A7B34" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-extrabold uppercase tracking-[0.16em] text-foreground">
          Lumora <span className="text-gold-gradient">DeMoore</span>
        </span>
        {!compact && (
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Properties
          </span>
        )}
      </span>
    </Link>
  )
}
