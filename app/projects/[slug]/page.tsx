import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Project unavailable',
  description: 'Project details are published after authorisation and documentation.',
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  notFound()
}
