import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { services } from '@/lib/site-data'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  return { title: service?.title ?? 'Service Details', description: service?.description }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()
  return <>
    <PageHero eyebrow={`${service.number} — Service`} title={service.title} intro={service.description} image={service.image} />
    <section className="py-20 md:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div><Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:text-foreground"><ArrowLeft className="size-4" /> All Services</Link><h2 className="mt-12 font-heading text-3xl font-bold md:text-5xl">Built around the requirements of your project.</h2><p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">Our team brings a practical, quality-focused approach to every stage of delivery. We clarify requirements, plan the work and maintain close attention to the finish.</p><div className="mt-10"><LumoraButton href="/proposal">Request a Consultation</LumoraButton></div></div>
      <div className="border border-border bg-charcoal p-7 md:p-9"><h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">What we deliver</h3><ul className="mt-6 space-y-4">{[...service.benefits, ...service.applications].map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-2">{service.environments.map((item) => <span key={item} className="border border-border px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{item}</span>)}</div></div>
    </div></section><CTASection />
  </>
}
