'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play, X } from 'lucide-react'
import type { Service } from '@/lib/site-data'

const stageDetails = [
  { key: 'before', label: 'Before works', note: 'Existing conditions requiring assessment and preparation.' },
  { key: 'progress', label: 'Work in progress', note: 'Preparation, installation and inspection activities.' },
  { key: 'completed', label: 'Completed works', note: 'Finished surfaces and project outcomes.' },
] as const

const stageImages: Record<string, [string, string, string]> = {
  'construction-solutions': ['/images/intro.png', '/images/proj-construction.png', '/images/proj-commercial.png'],
  'epoxy-flooring': ['/images/service-epoxy-before.png', '/images/service-epoxy-progress.png', '/images/service-epoxy-completed.png'],
  'protective-coatings': ['/images/proj-institutional.png', '/images/proj-coatings.png', '/images/proj-coatings.png'],
  'fairface-concrete-finishing': ['/images/intro.png', '/images/proj-fairface.png', '/images/proj-fairface.png'],
  'concrete-rectification': ['/images/intro.png', '/images/quality.png', '/images/proj-fairface.png'],
  'waterproofing': ['/images/proj-residential.png', '/images/proj-waterproofing.png', '/images/proj-waterproofing.png'],
  'surface-preparation-finishing': ['/images/quality.png', '/images/proj-epoxy.png', '/images/proj-coatings.png'],
  'procurement-supply-solutions': ['/images/proj-commercial.png', '/images/proj-institutional.png', '/images/proj-construction.png'],
  'property-development': ['/images/properties.png', '/images/proj-construction.png', '/images/proj-residential.png'],
  'lift-installation-building-systems': ['/images/proj-institutional.png', '/images/proj-commercial.png', '/images/proj-institutional.png'],
}

function getStageImages(service: Service) {
  return stageImages[service.slug] ?? [service.image, '/images/quality.png', '/images/proj-commercial.png']
}

export function ServiceMediaPortfolio({ service }: { service: Service }) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null)
  const images = getStageImages(service)

  return (
    <section className="border-y border-border bg-charcoal py-20 md:py-28" aria-labelledby="visual-portfolio-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Visual project portfolio</p>
            <h2 id="visual-portfolio-title" className="mt-4 font-heading text-3xl font-bold md:text-5xl">See the process in focus.</h2>
          </div>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">Illustrative service references for {service.title.toLowerCase()}. These visuals explain typical conditions and methods; they are not actual Lumora project records.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {stageDetails.map((stage, index) => {
            const src = images[index]
            const alt = `${stage.label} illustrative visual for ${service.title}`
            return <button key={stage.key} type="button" onClick={() => setActiveImage({ src, alt })} className="group relative min-h-72 overflow-hidden border border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{stage.label}</p><p className="mt-2 text-sm leading-relaxed text-white/80">{stage.note}</p><p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/60">Illustrative visual — not an actual Lumora project</p></div>
            </button>
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-border p-7 md:p-9"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Reference sequence</p><h3 className="mt-4 font-heading text-2xl font-bold">Assessment, execution, handover.</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">The sequence shown above is a visual aid only. Actual methods, materials, sequencing and acceptance criteria are confirmed for each site and scope.</p><p className="mt-8 border-t border-border pt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">Illustrative reference set · no project claims</p></div>
          <div className="border border-border p-7 md:p-9"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Procedure videos</p><div className="mt-8 flex size-14 items-center justify-center border border-border text-gold"><Play className="size-5" aria-hidden="true" /></div><h3 className="mt-6 font-heading text-2xl font-bold">How the work is executed</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Approved procedure videos, captions and project films will appear here when available. Videos will never autoplay and unpublished media will remain private.</p><p className="mt-8 border-t border-border pt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">No procedure videos published</p></div>
        </div>
      </div>
      {activeImage ? <div role="dialog" aria-modal="true" aria-label={activeImage.alt} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" onClick={() => setActiveImage(null)}><div className="relative h-[min(80vh,720px)] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}><Image src={activeImage.src} alt={activeImage.alt} fill sizes="100vw" className="object-contain" /><button type="button" onClick={() => setActiveImage(null)} className="absolute right-3 top-3 border border-white/30 bg-black/60 p-3 text-white hover:border-gold" aria-label="Close image viewer"><X className="size-5" /></button></div></div> : null}
    </section>
  )
}
