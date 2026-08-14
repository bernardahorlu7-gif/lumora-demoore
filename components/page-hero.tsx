import Image from 'next/image'

type Props = {
  eyebrow: string
  title: string
  intro?: string
  image?: string
}

export function PageHero({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-20">
      {image ? (
        <Image
          src={image || '/placeholder.svg'}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-charcoal" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      <div className="blueprint-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-20">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/60" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </span>
        </div>
        <h1 className="max-w-4xl text-balance font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
