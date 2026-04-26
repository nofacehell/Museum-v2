import { CategorySchema } from '@/lib/validations/category'
import { describe, expect, it } from 'vitest'

const valid = { name: 'Живопись', slug: 'painting' }

describe('CategorySchema', () => {
  it('accepts a minimal valid category', () => {
    expect(CategorySchema.safeParse(valid).success).toBe(true)
  })

  it('accepts optional description', () => {
    expect(CategorySchema.safeParse({ ...valid, description: 'Картины' }).success).toBe(true)
  })

  it('rejects empty name', () => {
    expect(CategorySchema.safeParse({ ...valid, name: '' }).success).toBe(false)
  })

  it('rejects invalid slug', () => {
    expect(CategorySchema.safeParse({ ...valid, slug: 'Painting' }).success).toBe(false)
    expect(CategorySchema.safeParse({ ...valid, slug: 'живопись' }).success).toBe(false)
  })

  it('rejects description over 500 chars', () => {
    expect(CategorySchema.safeParse({ ...valid, description: 'x'.repeat(501) }).success).toBe(false)
  })

  it('rejects name over 100 chars', () => {
    expect(CategorySchema.safeParse({ ...valid, name: 'x'.repeat(101) }).success).toBe(false)
  })
})
