import { ExhibitCard } from '@/components/public/exhibit-card'
import { db } from '@/lib/db'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await db.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  })
  if (!category) return {}
  return {
    title: category.name,
    description: category.description ?? undefined,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await db.category.findUnique({
    where: { slug },
    include: {
      exhibits: {
        orderBy: { createdAt: 'desc' },
        include: { category: { select: { name: true, slug: true } } },
      },
    },
  })

  if (!category) notFound()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-semibold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground mt-2">{category.description}</p>
        )}
      </div>

      {category.exhibits.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">
          В этой коллекции пока нет экспонатов.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.exhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.id} exhibit={exhibit} />
          ))}
        </div>
      )}
    </div>
  )
}
