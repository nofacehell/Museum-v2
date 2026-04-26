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
    <aside className="bg-secondary/30 border-border flex w-64 shrink-0 flex-col border-r">
      <div className="border-border border-b px-6 py-6">
        <Link href="/" className="block">
          <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase">Музей</p>
          <p className="font-display mt-0.5 text-xl font-medium tracking-tight">Электричества</p>
        </Link>
        <p className="text-muted-foreground mt-3 text-[10px] tracking-[0.25em] uppercase">
          Администрация
        </p>
      </div>

      <nav className="flex-1 px-3 py-4">
        {links.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm tracking-wide transition-colors ${
                active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`h-px w-4 transition-all ${active ? 'bg-foreground w-6' : 'bg-border'}`}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-border border-t px-3 py-3">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-muted-foreground hover:text-foreground flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm tracking-wide transition-colors"
        >
          <span className="bg-border h-px w-4" />
          Выйти
        </button>
      </div>
    </aside>
  )
}
