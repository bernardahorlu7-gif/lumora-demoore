import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { services } from '@/lib/site-data'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'
import { Reveal } from '@/components/reveal'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  return {
    title: service ? `${service.title} | Lumora DeMoore Properties` : 'Service Details',
    description: service?.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()

  const related = service.relatedServices
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof services)[number] => Boolean(item))

  return (
    <>
      <PageHero eyebrow={`${service.number} — Service`} title={service.title} intro={service.description} image={service.image} />

      <main>
        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <Reveal>
              <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:text-foreground"><ArrowLeft className="size-4" /> All Services</Link>
              <p className="mt-12 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Service overview</p>
              <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold md:text-5xl">{service.overview}</h2>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">{service.whatItIs}</p>
              <div className="mt-9"><LumoraButton href="/proposal">Request a Proposal</LumoraButton></div>
            </Reveal>
            <Reveal delay={120} className="border border-border bg-charcoal p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why it matters</p>
              <p className="mt-5 text-lg leading-relaxed text-foreground">{service.whyItMatters}</p>
              <div className="mt-8 flex flex-wrap gap-2">{service.environments.map((environment) => <span key={environment} className="border border-border px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{environment}</span>)}</div>
            </Reveal>
          </div>
        </section>

        <section className="bg-charcoal py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">01 — Where it is used</p><h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold md:text-5xl">Applications shaped by the project conditions.</h2></Reveal>
            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {service.applications.map((application, index) => <Reveal key={application} delay={index * 60} className="bg-charcoal p-6 md:p-8"><span className="font-heading text-2xl font-bold text-gold">0{index + 1}</span><p className="mt-8 text-sm leading-relaxed text-foreground">{application}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">02 — How we execute</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">A clear process from assessment to handover.</h2><p className="mt-6 max-w-md leading-relaxed text-muted-foreground">The sequence below is adapted to the service, the substrate and the agreed project scope. It is not a substitute for a site assessment or a project-specific specification.</p></Reveal>
              <div className="space-y-0 border-t border-border">{service.process.map((item) => <Reveal key={item.step} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[80px_1fr] sm:gap-8"><span className="font-heading text-3xl font-bold text-gold">{String(item.step).padStart(2, '0')}</span><div><h3 className="font-heading text-xl font-bold">{item.title}</h3><p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{item.description}</p></div></Reveal>)}</div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-charcoal py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">03 — Materials & systems</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Selection follows the condition, use and specification.</h2><ul className="mt-8 space-y-4">{service.materialsOrSystems.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}</ul></Reveal>
            <Reveal delay={120}><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">04 — Quality considerations</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">The details that influence the result.</h2><ul className="mt-8 space-y-4">{service.qualityConsiderations.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}</ul></Reveal>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">05 — After completion</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Practical maintenance considerations.</h2><ul className="mt-8 space-y-4">{service.maintenanceConsiderations.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}</ul></Reveal>
            <Reveal delay={120}><div className="border border-border"><div className="border-b border-border p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">06 — Frequently asked</p><h2 className="mt-3 font-heading text-3xl font-bold">Questions from clients.</h2></div>{service.faqs.map((faq) => <details key={faq.question} className="group border-b border-border p-6 last:border-b-0 md:p-8"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-bold marker:hidden"><span>{faq.question}</span><ChevronDown className="size-5 shrink-0 text-gold transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{faq.answer}</p></details>)}</div></Reveal>
          </div>
        </section>

        <section className="border-t border-border bg-charcoal py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-8"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">07 — Continue exploring</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Related services.</h2></Reveal><div className="mt-10 grid gap-4 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group border border-border p-6 transition-colors hover:border-gold"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.number}</span><h3 className="mt-8 font-heading text-xl font-bold group-hover:text-gold">{item.title}</h3><span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">View service <ArrowUpRight className="size-4" /></span></Link>)}</div></div></section>
      </main>
      <CTASection />
    </>
  )
}
