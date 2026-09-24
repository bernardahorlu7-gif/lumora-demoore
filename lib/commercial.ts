export type MoneyLike = string | number | null | undefined

export function money(value: MoneyLike, currency = 'GHS') {
  if (value === null || value === undefined || value === '') return 'Not yet recorded'
  const amount = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(amount)) return 'Not yet recorded'
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
}

export function numberValue(value: MoneyLike) {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function sumMoney(values: MoneyLike[]) {
  let cents = 0n
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue
    const text = String(value)
    const [whole = '0', fraction = ''] = text.split('.')
    const sign = whole.startsWith('-') ? -1n : 1n
    const normalizedWhole = whole.replace('-', '') || '0'
    cents += sign * (BigInt(normalizedWhole) * 100n + BigInt((fraction + '00').slice(0, 2)))
  }
  return Number(cents) / 100
}

export function margin(value: MoneyLike, cost: MoneyLike) {
  const revenue = numberValue(value)
  const actual = numberValue(cost)
  if (revenue === null || actual === null) return null
  return revenue - actual
}

export function marginPercent(value: MoneyLike, cost: MoneyLike) {
  const revenue = numberValue(value)
  const gross = margin(value, cost)
  if (revenue === null || gross === null || revenue === 0) return null
  return (gross / revenue) * 100
}

export function displayPercent(value: number | null) {
  return value === null ? 'Not yet recorded' : `${value.toFixed(2)}%`
}

export const COST_CATEGORIES = ['Materials','Labour','Equipment','Plant','Transport','Logistics','Subcontractors','Procurement','Specialist Finishes','MEP','Professional Services','Site Operations','Taxes','Contingency','Other']
export const VARIATION_STATUSES = ['Draft','Submitted','Under Review','Approved','Rejected','Cancelled']
export const PAYMENT_METHODS = ['Bank Transfer','Cheque','Cash','Mobile Money','Other']
