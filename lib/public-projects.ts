import { createClient } from '@/lib/supabase/server'

const PUBLIC_PROJECT_SELECT = 'id,name,slug,description,project_type,location,status,cover_image_url,start_date,target_completion_date,completion_date'

export async function getPublishedProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(PUBLIC_PROJECT_SELECT)
    .eq('is_public', true)
    .in('status', ['active', 'completed'])
    .order('completion_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) throw new Error('Unable to load published projects.')
  return data ?? []
}

export async function getPublishedProject(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`${PUBLIC_PROJECT_SELECT},project_media(id,media_type,stage,caption,description,sort_order)`)
    .eq('slug', slug)
    .eq('is_public', true)
    .in('status', ['active', 'completed'])
    .maybeSingle()

  if (error) throw new Error('Unable to load the published project.')
  return data
}
