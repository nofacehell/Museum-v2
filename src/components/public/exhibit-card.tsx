import { Card, CardContent } from '@/components/ui/card'
import { formatYear } from '@/lib/format'
import type { Category, Exhibit } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  exhibit: Exhibit & { category: Pick<Category, 'name' | 'slug'> }
}

export function ExhibitCard({ exhibit }: Props) {
  return (
    <Link href={`/exhibits/${exhibit.slug}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={exhibit.imageUrl}
            alt={exhibit.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground mb-1 text-xs">{exhibit.category.name}</p>
          <h3 className="font-semibold leading-tight">{exhibit.title}</h3>
          {exhibit.year != null && (
            <p className="text-muted-foreground mt-1 text-sm">{formatYear(exhibit.year)}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
