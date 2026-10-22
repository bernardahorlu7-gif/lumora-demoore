import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPublishedProject } from '@/lib/public-projects'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = { title: 'Project', description: 'Published Lumora project details and approved media.' }

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getPublishedProject(slug)
  if (!project) notFound()
  const media = [...(project.project_media ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  return <>
    <main className="bg-background"><header className="border-b border-border py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Published project</p><h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold md:text-6xl">{project.name}</h1><p className="mt-5 text-muted-foreground">{project.project_type || 'Project'} · {project.location || 'Location on request'}</p></div></header><section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Project brief</p><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.description || 'Project details will be added as approved documentation becomes available.'}</p></div><div className="grid gap-4 sm:grid-cols-2">{media.length ? media.map((item) => <figure key={item.id} className="overflow-hidden border border-border bg-card"><div className="relative aspect-[4/3] bg-muted">{item.media_type === 'image' ? <Image src={`/api/projects/${project.slug}/media/${item.id}`} alt={item.caption || `${project.name} project media`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /> : <video controls preload="metadata" className="size-full object-cover"><source src={`/api/projects/${project.slug}/media/${item.id}`} type="video/mp4" /></video>}</div>{item.caption ? <figcaption className="p-4 text-sm text-muted-foreground">{item.caption}</figcaption> : null}</figure>) : <div className="border border-border p-8 text-sm text-muted-foreground">Approved project media will appear here.</div>}</div></div></section></main><CTASection /></>
}
