'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LumoraButton } from '@/components/lumora-button'

export function ContactForm({ proposal = false }: { proposal?: boolean }) {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim().toLowerCase()
    const phone = String(form.get('phone') ?? '').trim()
    const service = String(form.get('service') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    if (name.length < 2 || name.length > 120 || message.length < 10 || message.length > 5000 || email.length > 254) {
      setPending(false)
      setError('Please check the form fields and try again.')
      return
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error: insertError } = await supabase.from('proposal_requests').insert({
      requester_id: user?.id ?? null,
      name,
      email,
      phone: phone || null,
      service_slug: service || null,
      message,
    })
    setPending(false)
    if (insertError) { setError('We could not record your request. Please try again or contact us directly.'); return }
    setSent(true)
  }

  if (sent) return <div className="border border-gold/50 bg-charcoal p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Request received</p><h2 className="mt-3 font-heading text-2xl font-bold">Thank you. We&apos;ll be in touch.</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Your enquiry has been securely recorded for follow-up by the Lumora team.</p></div>
  return <form onSubmit={submit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Name<input required name="name" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold" /></label><label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Email<input required type="email" name="email" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold" /></label></div><label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Phone<input name="phone" className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold" /></label>{proposal && <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Service or project type<select name="service" className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"><option value="construction-solutions">Construction Solutions</option><option value="epoxy-flooring">Epoxy Flooring</option><option value="protective-coatings">Protective Coatings</option><option value="waterproofing">Waterproofing</option><option value="procurement-supply-solutions">Procurement &amp; Supply Solutions</option><option value="property-development">Property Development</option><option value="other">Other</option></select></label>}<label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Message<textarea required name="message" rows={6} className="mt-2 w-full resize-y border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold" /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<LumoraButton type="submit" disabled={pending}>{pending ? 'Submitting…' : proposal ? 'Submit Request' : 'Send Enquiry'}</LumoraButton></form>
}
