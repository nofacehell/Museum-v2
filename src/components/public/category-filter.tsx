'use client'

import { Badge } from '@/components/ui/badge'
import type { Category } from '@prisma/client'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  categories: Pick<Category, 'id' | 'slug' | 'name'>[]
}

export function CategoryFilter({ categories }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('category')

  function buildHref(slug: string | null): Route {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    const qs = params.toString()
    return (qs ? `${pathname}?${qs}` : pathname) as Route
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge render={<Link href={buildHref(null)} />} variant={current === null ? 'default' : 'outline'}>
        Все
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.id}
          render={<Link href={buildHref(cat.slug)} />}
          variant={current === cat.slug ? 'default' : 'outline'}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  )
}
