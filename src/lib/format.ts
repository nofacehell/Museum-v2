export function formatYear(year: number | null | undefined): string {
  if (year == null) return '—'
  if (year < 0) return `${Math.abs(year)} до н.э.`
  return `${year} г.`
}
