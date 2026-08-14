import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
  as = 'h2',
}: Props) {
  const Tag = as
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <div
          className={cn(
            'mb-4 flex items-center gap-3',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-gold/60" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </span>
        </div>
      )}
      <Tag className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {intro && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </div>
  )
}
