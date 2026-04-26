import { formatYear } from '@/lib/format'
import { describe, expect, it } from 'vitest'

describe('formatYear', () => {
  it('formats positive year with "г." suffix', () => {
    expect(formatYear(1890)).toBe('1890 г.')
  })

  it('formats year 0 as "0 г."', () => {
    expect(formatYear(0)).toBe('0 г.')
  })

  it('formats negative year as BCE with absolute value', () => {
    expect(formatYear(-500)).toBe('500 до н.э.')
    expect(formatYear(-1)).toBe('1 до н.э.')
  })

  it('returns dash for null', () => {
    expect(formatYear(null)).toBe('—')
  })

  it('returns dash for undefined', () => {
    expect(formatYear(undefined)).toBe('—')
  })
})
