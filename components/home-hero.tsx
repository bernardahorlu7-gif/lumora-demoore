import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { LumoraButton } from '@/components/lumora-button'

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Modern premium building facade at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 md:px-8">
        <div className="max-w-3xl">
          <div className="reveal is-visible mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
              Construction • Development • Specialist Finishing
            </span>
          </div>

          <h1 className="reveal is-visible text-balance font-heading text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Building with precision.{' '}
            <span className="text-gold-gradient">Finishing with purpose.</span>
          </h1>

          <p
            className="reveal is-visible mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: '120ms' }}
          >
            Lumora DeMoore Properties delivers construction, property development and specialist
            finishing solutions with a commitment to quality, precision and lasting value.
          </p>

          <div
            className="reveal is-visible mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '220ms' }}
          >
            <LumoraButton href="/projects" size="lg">
              Explore Our Projects
              <ArrowRight className="size-4" />
            </LumoraButton>
            <LumoraButton href="/services" variant="outline" size="lg">
              Our Services
            </LumoraButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" aria-hidden />
      </div>
    </section>
  )
}
