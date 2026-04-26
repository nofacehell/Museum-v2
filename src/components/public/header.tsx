import Link from 'next/link'

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase">
            Музей
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">Электричества</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/exhibits"
            className="hover:text-primary text-foreground/80 tracking-wide transition-colors"
          >
            Коллекция
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-foreground/80 tracking-wide transition-colors"
          >
            О музее
          </Link>
        </nav>
      </div>
    </header>
  )
}
