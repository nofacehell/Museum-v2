'use client'

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

  function itemClass(active: boolean) {
    return active
      ? 'text-foreground border-foreground border-b-2 pb-1'
      : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent pb-1 transition-colors'
  }

  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm tracking-wide">
      <Link href={buildHref(null)} className={itemClass(current === null)}>
        Все
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildHref(cat.slug)}
          className={itemClass(current === cat.slug)}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}
