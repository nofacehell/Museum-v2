'use client'

import { signOut } from 'next-auth/react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links: { href: Route; label: string; exact: boolean }[] = [
  { href: '/admin', label: 'Дашборд', exact: true },
  { href: '/admin/exhibits', label: 'Экспонаты', exact: false },
  { href: '/admin/categories', label: 'Категории', exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-muted/40 flex w-56 shrink-0 flex-col border-r">
      <div className="border-b p-4">
        <Link href="/" className="font-display text-lg font-semibold">
          Музей
        </Link>
        <p className="text-muted-foreground text-xs">Админ-панель</p>
      </div>

      <nav className="flex-1 p-2">
        {links.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-background font-medium shadow-sm'
                  : 'text-muted-foreground hover:bg-background/60 hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-2">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-muted-foreground hover:bg-background/60 hover:text-foreground w-full rounded-md px-3 py-2 text-left text-sm transition-colors"
        >
          Выйти
        </button>
      </div>
    </aside>
  )
}
