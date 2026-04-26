import { ExhibitCard } from '@/components/public/exhibit-card'
import type { Category, Exhibit } from '@prisma/client'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

function makeExhibit(overrides: Partial<Exhibit> = {}): Exhibit & {
  category: Pick<Category, 'name' | 'slug'>
} {
  return {
    id: 'cl1',
    slug: 'jug',
    title: 'Кувшин керамический',
    description: 'Описание',
    year: 1890,
    origin: 'Россия',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1/jug.jpg',
    imagePublicId: null,
    categoryId: 'cat1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
    category: { name: 'Прикладное искусство', slug: 'applied' },
  }
}

describe('ExhibitCard', () => {
  it('renders title, category and year', () => {
    render(<ExhibitCard exhibit={makeExhibit()} />)
    expect(screen.getByText('Кувшин керамический')).toBeInTheDocument()
    expect(screen.getByText('Прикладное искусство')).toBeInTheDocument()
    expect(screen.getByText('1890 г.')).toBeInTheDocument()
  })

  it('formats BCE years', () => {
    render(<ExhibitCard exhibit={makeExhibit({ year: -500 })} />)
    expect(screen.getByText('500 до н.э.')).toBeInTheDocument()
  })

  it('hides year block when year is null', () => {
    render(<ExhibitCard exhibit={makeExhibit({ year: null })} />)
    expect(screen.queryByText(/г\.|до н\.э\./)).not.toBeInTheDocument()
  })

  it('links to the exhibit detail page', () => {
    render(<ExhibitCard exhibit={makeExhibit()} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/exhibits/jug')
  })

  it('renders the image with title as alt text', () => {
    render(<ExhibitCard exhibit={makeExhibit()} />)
    const img = screen.getByAltText('Кувшин керамический')
    expect(img).toHaveAttribute('src', expect.stringContaining('jug.jpg'))
  })
})
