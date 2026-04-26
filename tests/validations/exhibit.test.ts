import { ExhibitSchema } from '@/lib/validations/exhibit'
import { describe, expect, it } from 'vitest'

const valid = {
  title: 'Кувшин',
  slug: 'kuvshin',
  description: 'Древний керамический кувшин',
  imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
  categoryId: 'clx0000000000000000000001',
}

describe('ExhibitSchema', () => {
  it('accepts a minimal valid exhibit', () => {
    expect(ExhibitSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts year as negative (BCE) and positive', () => {
    expect(ExhibitSchema.safeParse({ ...valid, year: -500 }).success).toBe(true)
    expect(ExhibitSchema.safeParse({ ...valid, year: 1890 }).success).toBe(true)
  })

  it('rejects year out of range', () => {
    expect(ExhibitSchema.safeParse({ ...valid, year: -10001 }).success).toBe(false)
    expect(ExhibitSchema.safeParse({ ...valid, year: 2101 }).success).toBe(false)
  })

  it('rejects non-integer year', () => {
    expect(ExhibitSchema.safeParse({ ...valid, year: 1890.5 }).success).toBe(false)
  })

  it('rejects empty title', () => {
    expect(ExhibitSchema.safeParse({ ...valid, title: '' }).success).toBe(false)
  })

  it('rejects slug with uppercase or invalid chars', () => {
    expect(ExhibitSchema.safeParse({ ...valid, slug: 'Kuvshin' }).success).toBe(false)
    expect(ExhibitSchema.safeParse({ ...valid, slug: 'кувшин' }).success).toBe(false)
    expect(ExhibitSchema.safeParse({ ...valid, slug: 'kuvshin!' }).success).toBe(false)
    expect(ExhibitSchema.safeParse({ ...valid, slug: 'kuv shin' }).success).toBe(false)
  })

  it('accepts slug with letters, digits, hyphens', () => {
    expect(ExhibitSchema.safeParse({ ...valid, slug: 'jug-1890' }).success).toBe(true)
  })

  it('rejects invalid imageUrl', () => {
    expect(ExhibitSchema.safeParse({ ...valid, imageUrl: 'not-a-url' }).success).toBe(false)
  })

  it('rejects missing categoryId', () => {
    expect(ExhibitSchema.safeParse({ ...valid, categoryId: '' }).success).toBe(false)
  })
})
