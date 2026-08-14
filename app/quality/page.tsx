import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ClipboardCheck,
  Layers3,
  PackageCheck,
  Wrench,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CTASection } from '@/components/cta-section'
import { Reveal } from '@/components/reveal'
import { qualityAreas } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Quality & Standards',
  description:
    'How Lumora DeMoore Properties approaches quality control, surface preparation, material quality, workmanship, safety and project documentation.',
}

const icons = [ClipboardCheck, Layers3, PackageCheck, Wrench, ShieldCheck, FileText]

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Standards"
        title="Quality is the result of disciplined detail"
        intro="Our commitment to quality runs through preparation, materials, workmanship, safety and documentation on every project we undertake."
        image="/images/quality.png"
      />

      {/* Intro statement */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Our Commitment"
                title="Standards that protect the outcome"
                intro="Finishing systems only perform when the fundamentals are right. We treat preparation, material handling and workmanship as central to a durable, lasting result — not as afterthoughts."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="relative aspect-video overflow-hidden border border-border">
                <Image
                  src="/images/proj-fairface.png"
                  alt="Refined fairface concrete surface demonstrating finishing quality"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality areas */}
      <section className="border-y border-border bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {qualityAreas.map((area, i) => {
              const Icon = icons[i % icons.length]
              return (
                <Reveal key={area.title} delay={i * 60}>
                  <div className="group h-full border border-border bg-background p-8 transition-colors hover:border-gold/40">
                    <div className="flex size-12 items-center justify-center border border-gold/30 text-gold">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {area.text}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection heading="Expecting a high standard?" text="Let's discuss how we can deliver the quality your project requires." />
    </>
  )
}
