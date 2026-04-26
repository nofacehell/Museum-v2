import { db } from '@/lib/db'
import { formatYear } from '@/lib/format'
import type { Metadata } from 'next'
import type { Route } from 'next'
import Image from 'next/image'
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
        <div className="bg-secondary/40 relative aspect-square overflow-hidden lg:sticky lg:top-28 lg:self-start">
          <Image
            src={exhibit.imageUrl}
            alt={exhibit.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Museum label */}
        <div>
          <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
            {exhibit.category.name}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
            {exhibit.title}
          </h1>

          <div className="bg-foreground/15 my-8 h-px w-12" />

          <dl className="space-y-0 text-sm">
            {exhibit.year != null && <LabelRow term="Датировка" value={formatYear(exhibit.year)} />}
            {exhibit.origin && <LabelRow term="Происхождение" value={exhibit.origin} />}
            <LabelRow term="Раздел" value={exhibit.category.name} />
            <LabelRow term="Инвентарный №" value={exhibit.id.slice(-8).toUpperCase()} />
          </dl>

          <div className="mt-12">
            <h2 className="text-muted-foreground mb-4 text-xs tracking-[0.2em] uppercase">
              Описание
            </h2>
            <p className="text-foreground/90 text-base leading-[1.8] whitespace-pre-line">
              {exhibit.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-border mt-24 border-t pt-8">
        <Link
          href="/exhibits"
          className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors"
        >
          ← Вернуться к коллекции
        </Link>
      </div>
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
