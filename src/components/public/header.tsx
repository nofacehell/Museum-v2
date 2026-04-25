import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Музей
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/exhibits" className="text-muted-foreground hover:text-foreground transition-colors">
            Экспонаты
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            О музее
          </Link>
        </nav>
      </div>
    </header>
  )
}
