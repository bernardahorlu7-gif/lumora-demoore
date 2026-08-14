import Image from 'next/image'
import { LumoraButton } from '@/components/lumora-button'
import { Reveal } from '@/components/reveal'

type Props = {
  heading?: string
  text?: string
}

export function CTASection({
  heading = 'Have a project in mind?',
  text = "Let's discuss your requirements and determine the right solution for your project.",
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/cta-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="blueprint-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-balance font-heading text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LumoraButton href="/proposal" size="lg">
              Request a Proposal
            </LumoraButton>
            <LumoraButton href="/contact" variant="outline" size="lg">
              Contact Us
            </LumoraButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
