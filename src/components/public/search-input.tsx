'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const q = searchParams.get('q') ?? ''

  const update = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      params.delete('page')
      startTransition(() => {
        router.replace(`/exhibits?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParams],
  )

  return (
    <div className="relative">
      <Search
        size={14}
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => update(e.target.value)}
        placeholder="Поиск по коллекции…"
        className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-none border-b py-2 pr-8 pl-8 text-sm outline-none transition-colors focus:ring-1"
        aria-label="Поиск по коллекции"
      />
      {q && (
        <button
          onClick={() => update('')}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
          aria-label="Очистить поиск"
        >
          <X size={14} />
        </button>
      )}
      {isPending && (
        <div className="border-primary absolute bottom-0 left-0 h-px w-full animate-pulse border-b" />
      )}
    </div>
  )
}
