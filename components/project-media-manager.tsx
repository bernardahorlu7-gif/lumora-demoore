'use client'

import { useActionState } from 'react'
import { addProjectMedia, deleteProjectMedia, reorderProjectMedia, toggleProjectMediaPublication, toggleProjectPublication } from '@/lib/project-actions'

type Media = { id: string; media_type: string; stage: string; caption: string | null; description: string | null; sort_order: number; is_published: boolean; service_id: string | null; storage_path: string }
type Service = { id: string; name: string; slug: string | null }
type ActionState = { error?: string; success?: string }

const initialState: ActionState = {}

function SubmitButton({ children }: { children: string }) { return <button className="bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal">{children}</button> }

export function ProjectMediaManager({ projectId, projectIsPublic, media, services }: { projectId: string; projectIsPublic: boolean; media: Media[]; services: Service[] }) {
  const [uploadState, uploadAction, uploadPending] = useActionState(addProjectMedia.bind(null, projectId), initialState)
  const [projectState, projectAction, projectPending] = useActionState(toggleProjectPublication.bind(null, projectId, projectIsPublic), initialState)
  const grouped = ['before', 'progress', 'completed'] as const
  return <section className="border border-border p-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-gold">Public portfolio</p><h2 className="mt-2 font-heading text-2xl font-bold">Project media</h2><p className="mt-2 text-sm text-muted-foreground">Upload genuine project photos and videos, organise the story, then publish when ready.</p></div><form action={projectAction}><SubmitButton>{projectIsPublic ? 'Unpublish project' : 'Publish project'}</SubmitButton></form></div>
    {projectState.error && <p className="mt-4 border border-red-300 bg-red-50 p-3 text-sm text-red-800">{projectState.error}</p>}
    <form action={uploadAction} className="mt-6 grid gap-4 border border-border/70 p-4 md:grid-cols-2">
      <label className="text-xs uppercase tracking-[0.12em] text-muted-foreground md:col-span-2">Files<input required name="files" type="file" multiple accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" className="mt-2 block w-full text-sm" /></label>
      <label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Stage<select name="stage" defaultValue="progress" className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="before">Before</option><option value="progress">Progress</option><option value="completed">Completed</option></select></label>
      <label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Service<select name="service_id" defaultValue="" className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">No service link</option>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></label>
      <label className="text-xs uppercase tracking-[0.12em] text-muted-foreground md:col-span-2">Caption<input name="caption" className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm" /></label>
      {uploadState.error && <p className="text-sm text-red-700 md:col-span-2">{uploadState.error}</p>}{uploadState.success && <p className="text-sm text-green-700 md:col-span-2">{uploadState.success}</p>}
      <div className="md:col-span-2"><SubmitButton>{uploadPending ? 'Uploading…' : 'Upload media'}</SubmitButton></div>
    </form>
    <div className="mt-8 space-y-6">{grouped.map((stage) => <div key={stage}><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stage}</h3><div className="mt-3 space-y-2">{media.filter((item) => item.stage === stage).map((item, index, items) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border border-border/70 p-3"><div><p className="text-sm font-medium">{item.caption || `${item.media_type} upload`}</p><p className="text-xs text-muted-foreground">{item.media_type} · {item.is_published ? 'Published' : 'Draft'}</p></div><div className="flex flex-wrap gap-2"><form action={toggleProjectMediaPublication.bind(null, projectId, item.id, item.is_published)}><button className="border border-border px-3 py-2 text-[11px] uppercase tracking-[0.1em]">{item.is_published ? 'Unpublish' : 'Publish'}</button></form>{index > 0 && <form action={reorderProjectMedia.bind(null, projectId, item.id, items[index - 1].sort_order)}><button className="border border-border px-3 py-2 text-[11px] uppercase tracking-[0.1em]">Move up</button></form>}{index < items.length - 1 && <form action={reorderProjectMedia.bind(null, projectId, item.id, items[index + 1].sort_order)}><button className="border border-border px-3 py-2 text-[11px] uppercase tracking-[0.1em]">Move down</button></form>}<form action={deleteProjectMedia.bind(null, projectId, item.id, item.storage_path)}><button className="border border-red-200 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-red-700">Delete</button></form></div></div>)}</div></div>)}</div>
  </section>
}
