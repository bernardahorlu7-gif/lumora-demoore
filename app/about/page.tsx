import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, Compass } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CTASection } from '@/components/cta-section'
import { Reveal } from '@/components/reveal'
import { values, approach } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'About Lumora DeMoore Properties — a growing construction and property development company committed to quality, precision and responsible project execution.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A construction & property company built for the long term"
        intro="Lumora DeMoore Properties brings together construction, specialist finishing and property development under one disciplined, detail-led approach."
        image="/images/about.png"
      />

      {/* Who we are */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Who We Are"
              title="Precision, quality and responsibility on every project"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Lumora DeMoore Properties is a Ghanaian construction, property development and
                specialist finishing company. We work across commercial, residential and
                institutional projects, combining sound construction practice with a strong focus on
                surface finishing and long-term value.
              </p>
              <p>
                Our work is guided by a simple belief: quality is the result of attention to detail.
                From structure and surface preparation to the final finish, we hold ourselves to
                clear standards and communicate openly with our clients throughout.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <Image
                src="/images/quality.png"
                alt="Skilled worker finishing a surface with precision"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-y border-border bg-charcoal py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-8">
          {[
            {
              icon: Compass,
              label: 'Our Vision',
              text: 'To grow into a trusted name in construction and property development in Ghana and beyond — recognised for quality, precision and dependable delivery.',
            },
            {
              icon: Target,
              label: 'Our Mission',
              text: 'To deliver quality construction, specialist finishing and property solutions through professionalism, precision and responsible project execution.',
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="h-full border border-border bg-background p-9">
                <div className="flex size-12 items-center justify-center border border-gold/40 text-gold">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
                  {item.label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Values"
              title="The standards behind our work"
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 50} className="bg-charcoal">
                <div className="flex h-full flex-col p-7">
                  <h3 className="font-heading text-lg font-bold text-gold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach timeline */}
      <section className="border-t border-border bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Approach"
              title="Understand. Plan. Execute. Inspect. Deliver."
              intro="A clear, repeatable process that keeps projects controlled, well-documented and focused on quality."
            />
          </Reveal>
          <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-5">
              {approach.map((a, i) => (
                <Reveal key={a.step} delay={i * 80}>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center border border-gold/40 font-heading text-sm font-bold text-gold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-border md:hidden" aria-hidden />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{a.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Let's build something worthwhile." />
    </>
  )
}
