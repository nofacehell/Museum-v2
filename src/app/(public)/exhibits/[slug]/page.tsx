import {
  ExhibitImage,
  ExhibitLabel,
  ExhibitLabelItem,
} from '@/components/motion/exhibit-detail-motion'
import { FadeIn } from '@/components/motion/fade-in'
import { StaggerGrid } from '@/components/motion/stagger-grid'
import { ExhibitCard } from '@/components/public/exhibit-card'
import { db } from '@/lib/db'
import { formatYear } from '@/lib/format'
import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exhibit = await db.exhibit.findUnique({
    where: { slug },
    select: { title: true, description: true, imageUrl: true },
  })
  if (!exhibit) return {}
  return {
    title: exhibit.title,
    description: exhibit.description.slice(0, 160),
    openGraph: {
      images: [{ url: exhibit.imageUrl }],
    },
  }
}

export default async function ExhibitPage({ params }: Props) {
  const { slug } = await params
  const exhibit = await db.exhibit.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!exhibit) notFound()

  // Related exhibits and prev/next in same category ordered by year
  const [related, categoryExhibits] = await Promise.all([
    db.exhibit.findMany({
      where: { categoryId: exhibit.categoryId, id: { not: exhibit.id } },
      take: 3,
      orderBy: [{ year: 'asc' }, { createdAt: 'asc' }],
      include: { category: { select: { name: true, slug: true } } },
    }),
    db.exhibit.findMany({
      where: { categoryId: exhibit.categoryId },
      orderBy: [{ year: 'asc' }, { createdAt: 'asc' }],
      select: { id: true, slug: true, title: true },
    }),
  ])

  const currentIndex = categoryExhibits.findIndex((e) => e.id === exhibit.id)
  const prev = currentIndex > 0 ? categoryExhibits[currentIndex - 1] : null
  const next =
    currentIndex < categoryExhibits.length - 1 ? categoryExhibits[currentIndex + 1] : null

  return (
    <article className="mx-auto max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground mb-12 text-xs tracking-[0.18em] uppercase">
        <Link href="/exhibits" className="hover:text-foreground transition-colors">
          Коллекция
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <Link
          href={`/exhibits?category=${exhibit.category.slug}` as Route}
          className="hover:text-foreground transition-colors"
        >
          {exhibit.category.name}
        </Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* Image */}
        <ExhibitImage src={exhibit.imageUrl} alt={exhibit.title} />

        {/* Museum label */}
        <ExhibitLabel>
          <ExhibitLabelItem>
            <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
              {exhibit.category.name}
            </p>
          </ExhibitLabelItem>
          <ExhibitLabelItem>
            <h1 className="font-display mt-3 text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
              {exhibit.title}
            </h1>
          </ExhibitLabelItem>

          <ExhibitLabelItem>
            <div className="bg-foreground/15 my-8 h-px w-12" />
          </ExhibitLabelItem>

          <ExhibitLabelItem>
            <dl className="space-y-0 text-sm">
              {exhibit.year != null && (
                <LabelRow term="Датировка" value={formatYear(exhibit.year)} />
              )}
              {exhibit.origin && <LabelRow term="Происхождение" value={exhibit.origin} />}
              <LabelRow term="Раздел" value={exhibit.category.name} />
              <LabelRow term="Инвентарный №" value={exhibit.id.slice(-8).toUpperCase()} />
            </dl>
          </ExhibitLabelItem>

          <ExhibitLabelItem className="mt-12">
            <h2 className="text-muted-foreground mb-4 text-xs tracking-[0.2em] uppercase">
              Описание
            </h2>
            <p className="text-foreground/90 text-base leading-[1.8] whitespace-pre-line">
              {exhibit.description}
            </p>
          </ExhibitLabelItem>
        </ExhibitLabel>
      </div>

      {/* Prev / Next in category */}
      {(prev || next) && (
        <FadeIn>
          <nav className="border-border mt-20 flex items-center justify-between border-t pt-8">
            {prev ? (
              <Link href={`/exhibits/${prev.slug}`} className="group flex max-w-xs flex-col gap-1">
                <span className="text-muted-foreground group-hover:text-foreground text-[10px] tracking-[0.2em] uppercase transition-colors">
                  ← Предыдущий
                </span>
                <span className="font-display group-hover:text-primary line-clamp-2 text-sm leading-snug font-medium tracking-tight transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/exhibits/${next.slug}`}
                className="group flex max-w-xs flex-col items-end gap-1 text-right"
              >
                <span className="text-muted-foreground group-hover:text-foreground text-[10px] tracking-[0.2em] uppercase transition-colors">
                  Следующий →
                </span>
                <span className="font-display group-hover:text-primary line-clamp-2 text-sm leading-snug font-medium tracking-tight transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </FadeIn>
      )}

      {/* Related exhibits */}
      {related.length > 0 && (
        <section className="mt-24">
          <FadeIn>
            <div className="border-border mb-10 flex items-baseline justify-between border-b pb-4">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Ещё из раздела «{exhibit.category.name}»
              </h2>
              <Link
                href={`/exhibits?category=${exhibit.category.slug}` as Route}
                className="text-muted-foreground hover:text-foreground text-xs tracking-[0.15em] uppercase transition-colors"
              >
                Весь раздел →
              </Link>
            </div>
          </FadeIn>
          <StaggerGrid className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ExhibitCard key={item.id} exhibit={item} />
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Back link */}
      <FadeIn>
        <div className="border-border mt-20 border-t pt-8">
          <Link
            href="/exhibits"
            className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors"
          >
            ← Вернуться к коллекции
          </Link>
        </div>
      </FadeIn>
    </article>
  )
}

function LabelRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="border-border flex items-baseline gap-6 border-b py-3">
      <dt className="text-muted-foreground w-36 shrink-0 text-xs tracking-[0.15em] uppercase">
        {term}
      </dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  )
}
