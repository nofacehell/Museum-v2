import { slugify } from '@/lib/slug'
import { describe, expect, it } from 'vitest'

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('drops Cyrillic and other non-latin chars', () => {
    expect(slugify('Кувшин')).toBe('')
    expect(slugify('Jug керамический 1890')).toBe('jug-1890')
  })

  it('drops punctuation but keeps digits and hyphens', () => {
    expect(slugify('Item #42 — final!')).toBe('item-42-final')
  })

  it('collapses multiple spaces and hyphens', () => {
    expect(slugify('a   b')).toBe('a-b')
    expect(slugify('a---b')).toBe('a-b')
  })

  it('trims leading/trailing whitespace and hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello')
    expect(slugify('---hello---')).toBe('hello')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })

  it('produces a slug that satisfies the schema regex', () => {
    const out = slugify('My Cool Title 2024')
    expect(out).toMatch(/^[a-z0-9-]+$/)
  })
})
