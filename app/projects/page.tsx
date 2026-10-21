import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'

export const metadata: Metadata = {
  title: 'Selected Projects',
  description: 'Selected Lumora construction, finishing and property development projects.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Work that stands behind the name" intro="Project examples are published only when the work is complete, documented and approved for public presentation." image="/images/proj-commercial.png" />
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Portfolio in progress</p>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Real project examples will appear here.</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">We are preparing authorised project records with approved photographs, scope information and handover details. Until then, this page intentionally avoids presenting illustrative concepts or placeholder records as completed Lumora work.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><LumoraButton href="/proposal">Request a proposal</LumoraButton><Link href="/services" className="inline-flex items-center border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground hover:border-gold hover:text-gold">Explore services</Link></div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
