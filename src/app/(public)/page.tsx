import { ExhibitCard } from '@/components/public/exhibit-card'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [recentExhibits, categories] = await Promise.all([
    db.exhibit.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true, slug: true } } },
    }),
    db.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="font-display mb-4 text-5xl font-semibold tracking-tight">
          Добро пожаловать в музей
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg text-balance">
          Откройте для себя тысячелетия истории через наши экспонаты — от древних артефактов до
          произведений искусства.
        </p>
        <Button render={<Link href="/exhibits" />} size="lg">
          Смотреть коллекцию
        </Button>
      </section>

      {/* Recent exhibits */}
      {recentExhibits.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Последние поступления</h2>
            <Link
              href="/exhibits"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Все экспонаты →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentExhibits.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section>
          <h2 className="font-display mb-6 text-2xl font-semibold">Коллекции</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/exhibits?category=${cat.slug}`}
                className="hover:bg-accent rounded-lg border p-4 text-center transition-colors"
              >
                <p className="font-medium">{cat.name}</p>
                {cat.description && (
                  <p className="text-muted-foreground mt-1 text-xs">{cat.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
