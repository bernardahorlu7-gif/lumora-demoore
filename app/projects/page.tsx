import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { CTASection } from '@/components/cta-section'
import { Reveal } from '@/components/reveal'
import { projects } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Selected Projects',
  description: 'Selected Lumora construction, finishing and property development projects.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Work that stands behind the name" intro="A selection of construction, specialist finishing and development work. Project details are added as each commission is completed and documented." image="/images/proj-commercial.png" />
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal><div className="grid gap-6 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Reveal>
        </div>
      </section>
      <CTASection />
    </>
  )
}
