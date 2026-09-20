import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'

export const metadata: Metadata = { title: 'Properties & Development', description: 'Lumora property development and property solutions focused on quality, functionality and long-term value.' }

export default function PropertiesPage() { return <>
  <PageHero eyebrow="Properties" title="Development with lasting value" intro="We approach property opportunities with the same care we bring to construction: considered planning, functional design and attention to the details that make places work." image="/images/properties.png" />
  <section className="py-20 md:py-28"><div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden border border-border"><Image src="/images/properties.png" alt="Modern property development" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div><div><span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">A considered approach</span><h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Quality-led property solutions.</h2><p className="mt-6 text-base leading-relaxed text-muted-foreground">From early opportunity assessment through delivery, Lumora brings together construction understanding and a clear view of long-term value. Our approach is practical, detail-led and grounded in how people will use the finished place.</p><ul className="mt-8 grid gap-4 sm:grid-cols-2"><li className="border-l border-gold pl-4 text-sm text-muted-foreground">Residential developments</li><li className="border-l border-gold pl-4 text-sm text-muted-foreground">Commercial developments</li><li className="border-l border-gold pl-4 text-sm text-muted-foreground">Quality-led delivery</li><li className="border-l border-gold pl-4 text-sm text-muted-foreground">Long-term value</li></ul><div className="mt-10"><LumoraButton href="/contact">Discuss a Property Opportunity</LumoraButton></div></div></div></section><CTASection />
</> }
