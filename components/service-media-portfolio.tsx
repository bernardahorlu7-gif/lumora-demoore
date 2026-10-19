'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play, X } from 'lucide-react'
import type { Service } from '@/lib/site-data'

const stages = [
  { key: 'before', label: 'Before works', note: 'Site conditions and surfaces requiring assessment.' },
  { key: 'progress', label: 'Work in progress', note: 'Preparation, installation and inspection activities.' },
  { key: 'completed', label: 'Completed works', note: 'Finished surfaces and project outcomes.' },
] as const

export function ServiceMediaPortfolio({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="border-y border-border bg-charcoal py-20 md:py-28" aria-labelledby="visual-portfolio-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Visual project portfolio</p>
            <h2 id="visual-portfolio-title" className="mt-4 font-heading text-3xl font-bold md:text-5xl">See the process in focus.</h2>
          </div>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">A visual reference for the conditions, methods and outcomes associated with {service.title.toLowerCase()}. Real Lumora project evidence will be added here as authorised media becomes available.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage.key} className="min-h-44 border border-border p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{stage.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stage.note}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">No verified project media published</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <button type="button" onClick={() => setIsOpen(true)} className="group relative min-h-[24rem] overflow-hidden border border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label={`Open illustrative visual for ${service.title}`}>
            <Image src={service.image} alt={`Illustrative visual reference for ${service.title}`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-gold">Illustrative visual — not an actual Lumora project</span>
              <span className="mt-2 block font-heading text-xl font-bold text-white">{service.title} reference image</span>
            </span>
          </button>
          <div className="border border-border p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Procedure videos</p>
            <div className="mt-8 flex size-14 items-center justify-center border border-border text-gold"><Play className="size-5" aria-hidden="true" /></div>
            <h3 className="mt-6 font-heading text-2xl font-bold">How the work is executed</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Procedure videos, captions and approved project films will appear here when available. Videos will never autoplay and unpublished media will remain private.</p>
            <p className="mt-8 border-t border-border pt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">No procedure videos published</p>
          </div>
        </div>
      </div>
      {isOpen ? <div role="dialog" aria-modal="true" aria-label={`${service.title} illustrative visual`} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" onClick={() => setIsOpen(false)}><div className="relative h-[min(80vh,720px)] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}><Image src={service.image} alt={`Illustrative visual reference for ${service.title}`} fill sizes="100vw" className="object-contain" /><button type="button" onClick={() => setIsOpen(false)} className="absolute right-3 top-3 border border-white/30 bg-black/60 p-3 text-white hover:border-gold" aria-label="Close image viewer"><X className="size-5" /></button></div></div> : null}
    </section>
  )
}
