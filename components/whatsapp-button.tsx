import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const whatsappHref = 'https://wa.me/233500887266'

type Props = {
  className?: string
  compact?: boolean
}

export function WhatsAppButton({ className, compact = false }: Props) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lumora on WhatsApp at 050 088 7266"
      className={cn(
        'group inline-flex min-h-11 items-center justify-center gap-2 border border-gold/40 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        compact ? 'h-10 px-4 text-[0.65rem]' : 'h-12',
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      <span>{compact ? 'WhatsApp Us' : 'Chat on WhatsApp'}</span>
    </a>
  )
}

export { whatsappHref }
