import { cn } from '@/lib/utils'
import { describe, expect, it } from 'vitest'

describe('cn', () => {
  it('joins simple classes', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('merges conflicting tailwind classes (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional object syntax', () => {
    expect(cn('a', { b: true, c: false })).toBe('a b')
  })

  it('handles array of classes', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })
})
