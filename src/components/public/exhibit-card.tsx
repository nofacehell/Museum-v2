import { formatYear } from '@/lib/format'
import type { Category, Exhibit } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  exhibit: Exhibit & { category: Pick<Category, 'name' | 'slug'> }
}

export function ExhibitCard({ exhibit }: Props) {
  return (
    <Link href={`/exhibits/${exhibit.slug}`} className="group block">
      <div className="bg-secondary/40 relative aspect-[4/5] overflow-hidden">
        <Image
          src={exhibit.imageUrl}
          alt={exhibit.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="border-foreground/15 mt-5 border-t pt-4">
        <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
          {exhibit.category.name}
        </p>
        <h3 className="font-display group-hover:text-primary mt-1 text-xl leading-snug font-medium tracking-tight transition-colors">
          {exhibit.title}
        </h3>
        {exhibit.year != null && (
          <p className="text-muted-foreground mt-2 font-mono text-xs tabular-nums">
            {formatYear(exhibit.year)}
          </p>
        )}
      </div>
    </Link>
  )
}
