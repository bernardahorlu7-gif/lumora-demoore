import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import { services } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Construction & Specialist Finishing Services',
  description:
    'Construction, epoxy flooring, protective coatings, fairface concrete finishing, concrete rectification, waterproofing, surface finishing and property development services.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Construction & specialist finishing capability"
        intro="A focused range of services spanning construction, specialist surface finishing and property development — each delivered with a commitment to quality and precision."
        image="/images/proj-construction.png"
      />

      <div className="space-y-0">
        {services.map((service, i) => {
          const reversed = i % 2 === 1
          return (
            <section
              key={service.slug}
              className={cn(
                'border-b border-border py-20 md:py-28',
                i % 2 === 1 && 'bg-charcoal',
              )}
            >
              <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(reversed && 'lg:order-2')}>
                  <div className="group relative aspect-[4/3] overflow-hidden border border-border">
                    <Image
                      src={service.image || '/placeholder.svg'}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 font-heading text-5xl font-extrabold text-gold/70 mix-blend-plus-lighter">
                      {service.number}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={100} className={cn(reversed && 'lg:order-1')}>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                    {service.number} — Service
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                        Applications
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {service.applications.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                        Benefits
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.environments.map((env) => (
                      <span
                        key={env}
                        className="border border-border px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {env}
                      </span>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-wrap items-center gap-6">
                    <LumoraButton href="/proposal">Request a Consultation</LumoraButton>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:text-foreground"
                    >
                      Service Details
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <CTASection />
    </>
  )
}
