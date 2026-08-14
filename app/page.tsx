import Image from 'next/image'
import { Building2, Layers, SquareStack, Droplets, Hammer, Home as HomeIcon, ArrowRight } from 'lucide-react'
import { HomeHero } from '@/components/home-hero'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { ProjectCard } from '@/components/project-card'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'
import { Reveal } from '@/components/reveal'
import { projects, principles } from '@/lib/site-data'

const servicePreview = [
  {
    icon: Building2,
    title: 'Construction Solutions',
    description: 'Construction and project execution solutions tailored to project requirements.',
    href: '/services/construction-solutions',
  },
  {
    icon: Layers,
    title: 'Epoxy Flooring & Coatings',
    description: 'Industrial, commercial and high-performance epoxy flooring and protective systems.',
    href: '/services/epoxy-flooring',
  },
  {
    icon: SquareStack,
    title: 'Fairface Concrete Finishing',
    description: 'Precision finishing and aesthetic treatment of exposed concrete surfaces.',
    href: '/services/fairface-concrete-finishing',
  },
  {
    icon: Droplets,
    title: 'Waterproofing',
    description: 'Protection of buildings and structures against water penetration and moisture.',
    href: '/services/waterproofing',
  },
  {
    icon: Hammer,
    title: 'Concrete Rectification',
    description: 'Correction, preparation and finishing of concrete surfaces.',
    href: '/services/concrete-rectification',
  },
  {
    icon: HomeIcon,
    title: 'Property Development',
    description: 'Development and property solutions focused on quality, functionality and value.',
    href: '/services/property-development',
  },
]

export default function HomePage() {
  const featured = projects.slice(0, 4)

  return (
    <>
      <HomeHero />

      {/* Company introduction */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <Image
                src="/images/intro.png"
                alt="Detail of refined fairface concrete finishing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden border border-gold/40 bg-charcoal px-8 py-6 md:block">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Built on quality
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Driven by detail
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Who We Are"
              title="Built on quality. Driven by detail."
              intro="Lumora DeMoore Properties combines construction expertise, specialist finishing and property solutions to deliver dependable results across commercial, residential and institutional projects."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We approach every project with a technical mindset and a commitment to precision — from
              structure and surface preparation through to the finishing details that define lasting
              quality.
            </p>
            <div className="mt-10">
              <LumoraButton href="/about" variant="outline">
                Discover Lumora DeMoore
                <ArrowRight className="size-4" />
              </LumoraButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services preview */}
      <section className="relative border-y border-border bg-charcoal py-24 md:py-32">
        <div className="blueprint-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Comprehensive construction & finishing services"
              intro="A focused set of capabilities spanning construction, specialist surface finishing and property solutions."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicePreview.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <LumoraButton href="/services">
              View All Services
              <ArrowRight className="size-4" />
            </LumoraButton>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Selected Works"
                title="A closer look at our approach"
                intro="A selection of work demonstrating our approach to construction, finishing and project delivery."
              />
              <div className="shrink-0">
                <LumoraButton href="/projects" variant="outline">
                  View All Projects
                  <ArrowRight className="size-4" />
                </LumoraButton>
              </div>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lumora DeMoore */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <Image
          src="/images/why-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/90" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Lumora DeMoore"
              title="Principles that guide every project"
              align="center"
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="bg-charcoal">
                <div className="flex h-full flex-col p-8">
                  <span className="font-heading text-4xl font-extrabold text-gold/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
