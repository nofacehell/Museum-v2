import { FadeIn } from '@/components/motion/fade-in'
import { StaggerGrid } from '@/components/motion/stagger-grid'
import { CategoryFilter } from '@/components/public/category-filter'
import { ExhibitCard } from '@/components/public/exhibit-card'
import { SearchInput } from '@/components/public/search-input'
import { db } from '@/lib/db'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Коллекция',
  description: 'Полный каталог экспонатов музея.',
}

const PAGE_SIZE = 12

type Props = {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>
}

export default async function ExhibitsPage({ searchParams }: Props) {
  const { category, page: pageParam, q } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const where = {
    ...(category ? { category: { slug: category } } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' as const } },
            { description: { contains: q, mode: 'insensitive' as const } },
            { origin: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

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
    <div>
      {/* Page header */}
      <FadeIn y={20} duration={0.6}>
        <header className="border-border mb-12 border-b pb-10">
          <p className="text-muted-foreground mb-3 text-xs tracking-[0.3em] uppercase">
            Постоянная экспозиция
          </p>
          <div className="flex items-end justify-between gap-6">
            <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
              Коллекция
            </h1>
            <p className="text-muted-foreground hidden font-mono text-sm tabular-nums sm:block">
              {total}&nbsp;
              {total === 1 ? 'экспонат' : total >= 2 && total <= 4 ? 'экспоната' : 'экспонатов'}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Suspense>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>
            <div className="sm:w-64">
              <Suspense>
                <SearchInput />
              </Suspense>
            </div>
          </div>
        </header>
      </FadeIn>

      {exhibits.length === 0 ? (
        <FadeIn>
          <p className="text-muted-foreground py-24 text-center text-lg">
            {q
              ? `По запросу «${q}» ничего не найдено.`
              : 'В этом разделе пока нет экспонатов.'}
          </p>
        </FadeIn>
      ) : (
        <>
          <StaggerGrid
            className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            stagger={0.06}
          >
            {exhibits.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </StaggerGrid>

          {totalPages > 1 && (
            <FadeIn>
              <nav className="border-border mt-20 flex justify-center gap-1 border-t pt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const params = new URLSearchParams()
                  if (category) params.set('category', category)
                  if (q) params.set('q', q)
                  if (p > 1) params.set('page', String(p))
                  const href = `/exhibits${params.toString() ? `?${params}` : ''}`
                  const isActive = p === page
                  return (
                    <a
                      key={p}
                      href={href}
                      className={`flex h-10 w-10 items-center justify-center font-mono text-sm tabular-nums transition-colors ${
                        isActive
                          ? 'text-primary border-primary border-b-2'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {p}
                    </a>
                  )
                })}
              </nav>
            </FadeIn>
          )}
        </>
      )}
    </div>
  )
}
