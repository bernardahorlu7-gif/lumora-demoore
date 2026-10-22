import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'
import { LumoraButton } from '@/components/lumora-button'
import { getPublishedProjects } from '@/lib/public-projects'

export const metadata: Metadata = {
  title: 'Selected Projects',
  description: 'Selected Lumora construction, finishing and property development projects.',
}

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()
  return <>
    <PageHero eyebrow="Projects" title="Work that stands behind the name" intro="Project examples are published only when the work is complete, documented and approved for public presentation." image="/images/proj-commercial.png" />
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {projects.length === 0 ? <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Portfolio in progress</p><h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Real project examples will appear here.</h2><p className="mt-6 text-base leading-relaxed text-muted-foreground">We are preparing authorised project records with approved photographs, scope information and handover details.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><LumoraButton href="/proposal">Request a proposal</LumoraButton><Link href="/services" className="inline-flex items-center border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground hover:border-gold hover:text-gold">Explore services</Link></div></div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <Link key={project.id} href={`/projects/${project.slug}`} className="group border border-border bg-card"><div className="aspect-[4/3] overflow-hidden bg-muted">{project.cover_image_url ? <img src={project.cover_image_url} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex size-full items-center justify-center text-xs uppercase tracking-[0.16em] text-muted-foreground">Approved imagery pending</div>}</div><div className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{project.project_type || 'Project'}</p><h2 className="mt-3 font-heading text-2xl font-bold">{project.name}</h2><p className="mt-2 text-sm text-muted-foreground">{project.location || 'Location on request'}</p></div></Link>)}</div>}
      </div>
    </section>
    <CTASection />
  </>
}
