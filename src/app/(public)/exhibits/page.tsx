import { CategoryFilter } from '@/components/public/category-filter'
import { ExhibitCard } from '@/components/public/exhibit-card'
import { db } from '@/lib/db'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Экспонаты',
  description: 'Полный каталог экспонатов музея.',
}

const PAGE_SIZE = 12

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function ExhibitsPage({ searchParams }: Props) {
  const { category, page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const where = category ? { category: { slug: category } } : {}

  const [exhibits, total, categories] = await Promise.all([
    db.exhibit.findMany({
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true, slug: true } } },
    }),
    db.exhibit.count({ where }),
    db.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display mb-4 text-4xl font-semibold tracking-tight">Экспонаты</h1>
        <Suspense>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      {exhibits.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">Экспонаты не найдены.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exhibits.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const params = new URLSearchParams()
                if (category) params.set('category', category)
                if (p > 1) params.set('page', String(p))
                const href = `/exhibits${params.toString() ? `?${params}` : ''}`
                return (
                  <a
                    key={p}
                    href={href}
                    className={`flex h-9 w-9 items-center justify-center rounded border text-sm transition-colors ${
                      p === page
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {p}
                  </a>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
