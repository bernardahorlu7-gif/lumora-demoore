import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/authz'

export async function getCommandCenterData() {
  const { supabase, user } = await requireRole(['admin', 'staff'])
  const [proposals, clients, projects, procurement, documents, staff, commercial, updates] = await Promise.all([
    supabase.from('proposal_requests').select('id,title,status,follow_up_at,created_at').order('created_at', { ascending: false }),
    supabase.from('clients').select('id,company_name,contact_name,status,created_at'),
    supabase.from('projects').select('id,name,status,created_at,updated_at'),
    supabase.from('procurement_requests').select('id,request_number,title,status,delivery_status,created_at'),
    supabase.from('documents').select('id,document_status,created_at'),
    supabase.from('profiles').select('id,role,account_status,first_name,last_name').in('role', ['admin', 'staff']),
    supabase.from('commercial_records').select('id,contract_value,currency,commercial_status,commercial_cost_items(actual_amount),commercial_payments(amount,status),commercial_variations(approved_value,status)'),
    supabase.from('project_updates').select('id,project_id,title,update_type,created_at,projects(id,name)').order('created_at', { ascending: false }).limit(8),
  ])
  const errors = [proposals, clients, projects, procurement, documents, staff, commercial, updates].filter((result) => result.error).map((result) => result.error?.message ?? 'Unable to load dashboard data')
  const now = Date.now()
  const day = 86400000
  const proposalRows = proposals.data ?? []
  const clientRows = clients.data ?? []
  const projectRows = projects.data ?? []
  const procurementRows = procurement.data ?? []
  const documentRows = documents.data ?? []
  const staffRows = staff.data ?? []
  const commercialRows = commercial.data ?? []
  const updateRows = updates.data ?? []
  const total = (values: unknown[]) => values.reduce((sum, value) => sum + (Number(value) || 0), 0)
  const commercialTotals = commercialRows.reduce((acc, row: any) => {
    const contract = Number(row.contract_value) || 0
    const actual = total((row.commercial_cost_items ?? []).map((item: any) => item.actual_amount))
    const received = total((row.commercial_payments ?? []).filter((item: any) => item.status === 'Recorded').map((item: any) => item.amount))
    const variations = total((row.commercial_variations ?? []).filter((item: any) => ['approved', 'Approved'].includes(item.status)).map((item: any) => item.approved_value))
    acc.contract += contract; acc.actual += actual; acc.received += received; acc.variations += variations; acc.outstanding += contract + variations - received
    return acc
  }, { contract: 0, actual: 0, received: 0, variations: 0, outstanding: 0 })
  return {
    user,
    errors,
    metrics: {
      proposals: { total: proposalRows.length, new: proposalRows.filter((row) => ['new', 'reviewing'].includes(row.status)).length, active: proposalRows.filter((row) => ['contacted', 'qualified', 'proposal', 'quoted'].includes(row.status)).length, due: proposalRows.filter((row) => row.follow_up_at && new Date(row.follow_up_at).getTime() <= now).length },
      clients: { total: clientRows.length, active: clientRows.filter((row) => row.status === 'active').length, recent: clientRows.filter((row) => new Date(row.created_at).getTime() >= now - 30 * day).length },
      projects: { total: projectRows.length, active: projectRows.filter((row) => !['completed', 'cancelled', 'archived'].includes(row.status)).length, attention: projectRows.filter((row) => ['on_hold', 'at_risk', 'delayed'].includes(row.status)).length },
      procurement: { open: procurementRows.filter((row) => !['completed', 'cancelled', 'delivered'].includes(row.status)).length, approval: procurementRows.filter((row) => ['under_review', 'quotation_received'].includes(row.status)).length, delivery: procurementRows.filter((row) => ['ordered', 'partially_delivered'].includes(row.status) || ['scheduled', 'in_transit', 'delivery_issue'].includes(row.delivery_status)).length },
      documents: { total: documentRows.length, recent: documentRows.filter((row) => new Date(row.created_at).getTime() >= now - 30 * day).length },
      staff: { active: staffRows.filter((row) => row.account_status === 'active').length, admins: staffRows.filter((row) => row.role === 'admin' && row.account_status === 'active').length, inactive: staffRows.filter((row) => row.account_status !== 'active').length },
      commercial: commercialTotals,
    },
    attention: {
      proposals: proposalRows.filter((row) => row.follow_up_at && new Date(row.follow_up_at).getTime() <= now).slice(0, 6),
      projects: projectRows.filter((row) => ['on_hold', 'at_risk', 'delayed'].includes(row.status)).slice(0, 6),
      procurement: procurementRows.filter((row) => ['under_review', 'quotation_received', 'ordered', 'partially_delivered'].includes(row.status) || row.delivery_status === 'delivery_issue').slice(0, 6),
      staff: staffRows.filter((row) => row.account_status !== 'active').slice(0, 6),
      updates: updateRows,
    },
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
  const add = (module: string, data: any[] | null, key: string, hrefBase: string) => (data ?? []).forEach((row) => rows.push({ id: `${module}-${row.id}`, module, action: row.activity_type, recordId: row[key], record: row[key], actor: row.actor_user_id ?? 'System', summary: `${row.activity_type.replaceAll('_', ' ')} ${row.new_value ?? ''}`.trim(), oldValue: row.old_value, newValue: row.new_value, createdAt: row.created_at, href: `${hrefBase}/${row[key]}` }))
  add('Proposals', queries[0].data, 'proposal_id', '/admin/proposals'); add('Clients', queries[1].data, 'client_id', '/admin/clients'); add('Projects', queries[2].data, 'project_id', '/admin/projects'); add('Procurement', queries[3].data, 'procurement_request_id', '/admin/procurement'); add('Documents', queries[4].data, 'document_id', '/admin/documents'); add('Staff', queries[5].data, 'target_user_id', '/admin/staff')
  return rows.filter((row) => (!searchParams.module || searchParams.module === 'All' || row.module === searchParams.module) && (!searchParams.actor || row.actor === searchParams.actor) && (!searchParams.q || `${row.module} ${row.action} ${row.summary} ${row.record}`.toLowerCase().includes(searchParams.q.toLowerCase()))).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 300)
}
