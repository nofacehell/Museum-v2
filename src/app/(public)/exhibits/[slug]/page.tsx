import { db } from '@/lib/db'
import { formatYear } from '@/lib/format'
import type { Metadata } from 'next'
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
    <div className="mx-auto max-w-4xl">
      <nav className="text-muted-foreground mb-6 text-sm">
        <Link href="/exhibits" className="hover:text-foreground transition-colors">
          Экспонаты
        </Link>
        {' / '}
        <Link
          href={`/exhibits?category=${exhibit.category.slug}`}
          className="hover:text-foreground transition-colors"
        >
          {exhibit.category.name}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={exhibit.imageUrl}
            alt={exhibit.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">{exhibit.category.name}</p>
            <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight">
              {exhibit.title}
            </h1>
          </div>

          <dl className="space-y-2 text-sm">
            {exhibit.year != null && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground w-20 shrink-0">Датировка</dt>
                <dd>{formatYear(exhibit.year)}</dd>
              </div>
            )}
            {exhibit.origin && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground w-20 shrink-0">Происхождение</dt>
                <dd>{exhibit.origin}</dd>
              </div>
            )}
          </dl>

          <p className="leading-relaxed">{exhibit.description}</p>
        </div>
      </div>
    </div>
  )
}
