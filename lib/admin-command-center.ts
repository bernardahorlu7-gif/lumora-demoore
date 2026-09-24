import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/authz'

export async function getCommandCenterData() {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const [proposals, clients, projects, procurement, documents, staff, commercial] = await Promise.all([
    supabase.from('proposal_requests').select('id,status,follow_up_at,created_at').order('created_at', { ascending: false }),
    supabase.from('clients').select('id,status,created_at'),
    supabase.from('projects').select('id,status,created_at'),
    supabase.from('procurement_requests').select('id,status,delivery_status,created_at'),
    supabase.from('documents').select('id,document_status,created_at'),
    supabase.from('profiles').select('id,role,account_status,first_name,last_name').in('role', ['admin', 'staff']),
    supabase.from('commercial_records').select('id,contract_value,currency,commercial_status,commercial_cost_items(actual_amount),commercial_payments(amount,status),commercial_variations(approved_value,status)'),
  ])
  const now = Date.now()
  const day = 86400000
  const proposalRows = proposals.data ?? []
  const clientRows = clients.data ?? []
  const projectRows = projects.data ?? []
  const procurementRows = procurement.data ?? []
  const documentRows = documents.data ?? []
  const staffRows = staff.data ?? []
  const commercialRows = commercial.data ?? []
  const total = (values: unknown[]) => values.reduce((sum, value) => sum + (Number(value) || 0), 0)
  const commercialTotals = commercialRows.reduce((acc, row: any) => { const revised = Number(row.contract_value) || 0; const actual = total((row.commercial_cost_items ?? []).map((x: any) => x.actual_amount)); const received = total((row.commercial_payments ?? []).filter((x: any) => x.status === 'Recorded').map((x: any) => x.amount)); acc.contract += revised; acc.actual += actual; acc.received += received; acc.outstanding += revised - received; return acc }, { contract: 0, actual: 0, received: 0, outstanding: 0 })
  return {
    user,
    metrics: {
      proposals: { total: proposalRows.length, new: proposalRows.filter((r) => ['new', 'reviewing'].includes(r.status)).length, active: proposalRows.filter((r) => ['contacted', 'qualified', 'proposal', 'quoted'].includes(r.status)).length, due: proposalRows.filter((r) => r.follow_up_at && new Date(r.follow_up_at).getTime() <= now).length },
      clients: { total: clientRows.length, active: clientRows.filter((r) => r.status === 'active').length, recent: clientRows.filter((r) => new Date(r.created_at).getTime() >= now - 30 * day).length },
      projects: { total: projectRows.length, active: projectRows.filter((r) => !['completed', 'cancelled', 'archived'].includes(r.status)).length, attention: projectRows.filter((r) => ['on_hold', 'at_risk', 'delayed'].includes(r.status)).length },
      procurement: { open: procurementRows.filter((r) => !['completed', 'cancelled', 'delivered'].includes(r.status)).length, approval: procurementRows.filter((r) => ['under_review', 'quotation_received'].includes(r.status)).length, delivery: procurementRows.filter((r) => ['ordered', 'partially_delivered'].includes(r.status) || ['scheduled', 'in_transit', 'delivery_issue'].includes(r.delivery_status)).length },
      documents: { total: documentRows.length, active: documentRows.filter((r) => r.document_status !== 'archived').length, recent: documentRows.filter((r) => new Date(r.created_at).getTime() >= now - 30 * day).length },
      staff: { active: staffRows.filter((r) => r.account_status === 'active').length, admins: staffRows.filter((r) => r.role === 'admin' && r.account_status === 'active').length, inactive: staffRows.filter((r) => r.account_status !== 'active').length },
      commercial: commercialTotals,
    },
    attention: { proposals: proposalRows.filter((r) => r.follow_up_at && new Date(r.follow_up_at).getTime() <= now).slice(0, 8), procurement: procurementRows.filter((r) => ['under_review', 'quotation_received', 'ordered', 'partially_delivered'].includes(r.status)).slice(0, 8), staff: staffRows.filter((r) => r.account_status !== 'active').slice(0, 8) },
  }
}

export type AuditEvent = { id: string; module: string; action: string; recordId: string; record: string; actor: string; summary: string; oldValue?: string | null; newValue?: string | null; createdAt: string; href: string }

export async function getAuditEvents(searchParams: { module?: string; days?: string; actor?: string; q?: string }) {
  await requireRole(['admin', 'staff'])
  const supabase = await createClient()
  const days = Number(searchParams.days ?? 30)
  const since = new Date(Date.now() - (Number.isFinite(days) ? days : 30) * 86400000).toISOString()
  const queries = await Promise.all([
    supabase.from('proposal_activities').select('id,proposal_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
    supabase.from('client_activities').select('id,client_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
    supabase.from('project_activities').select('id,project_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
    supabase.from('procurement_activities').select('id,procurement_request_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
    supabase.from('document_activities').select('id,document_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
    supabase.from('staff_activities').select('id,target_user_id,actor_user_id,activity_type,old_value,new_value,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(150),
  ])
  const rows: AuditEvent[] = []
  const add = (module: string, data: any[] | null, key: string, hrefBase: string) => (data ?? []).forEach((r) => rows.push({ id: `${module}-${r.id}`, module, action: r.activity_type, recordId: r[key], record: r[key], actor: r.actor_user_id ?? 'System', summary: `${r.activity_type.replaceAll('_', ' ')} ${r.new_value ?? ''}`.trim(), oldValue: r.old_value, newValue: r.new_value, createdAt: r.created_at, href: `${hrefBase}/${r[key]}` }))
  add('Proposals', queries[0].data, 'proposal_id', '/admin/proposals'); add('Clients', queries[1].data, 'client_id', '/admin/clients'); add('Projects', queries[2].data, 'project_id', '/admin/projects'); add('Procurement', queries[3].data, 'procurement_request_id', '/admin/procurement'); add('Documents', queries[4].data, 'document_id', '/admin/documents'); add('Staff', queries[5].data, 'target_user_id', '/admin/staff')
  return rows.filter((r) => (!searchParams.module || searchParams.module === 'All' || r.module === searchParams.module) && (!searchParams.actor || r.actor === searchParams.actor) && (!searchParams.q || `${r.module} ${r.action} ${r.summary} ${r.record}`.toLowerCase().includes(searchParams.q.toLowerCase()))).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 300)
}
