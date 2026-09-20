import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = { title: 'Request a Proposal', description: 'Request a construction, specialist finishing or property development proposal from Lumora.' }

export default function ProposalPage() { return <><PageHero eyebrow="Request a Proposal" title="Bring us the brief" intro="Give us the context and we will help shape a clear, considered next step for your project." image="/images/quality.png" /><section className="py-20 md:py-28"><div className="mx-auto max-w-3xl px-5 md:px-8"><div className="border border-border p-6 md:p-10"><ContactForm proposal /></div></div></section></> }
