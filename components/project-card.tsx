import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Project } from '@/lib/site-data'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden border border-border bg-charcoal transition-colors duration-500 hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`${project.name} — ${project.category}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <span className="absolute left-4 top-4 border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">{project.name}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-gold/60" />
          {project.location}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{project.scope}</p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {project.year}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            View Project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
