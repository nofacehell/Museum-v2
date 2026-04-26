import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase">Музей</p>
            <p className="font-display mt-1 text-xl font-medium tracking-tight">Электричества</p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Постоянная экспозиция, посвящённая истории электричества — от первых открытий до
              индустриальной эпохи.
            </p>
          </div>

          <FooterColumn title="Навигация">
            <FooterLink href="/exhibits">Коллекция</FooterLink>
            <FooterLink href="/about">О музее</FooterLink>
          </FooterColumn>

          <FooterColumn title="Часы работы">
            <p className="text-foreground/80">Вт – Вс</p>
            <p className="text-muted-foreground">10:00 – 19:00</p>
            <p className="text-muted-foreground mt-2">Понедельник — выходной</p>
          </FooterColumn>

          <FooterColumn title="Контакты">
            <p className="text-foreground/80">ул. Эдисона, 1</p>
            <p className="text-muted-foreground">info@museum.local</p>
            <p className="text-muted-foreground">+7 (000) 000-00-00</p>
          </FooterColumn>
        </div>

        <div className="border-border mt-16 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-muted-foreground text-xs tracking-wide">
            © {new Date().getFullYear()} Музей Электричества
          </p>
          <p className="text-muted-foreground text-xs tracking-wide">
            Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-muted-foreground mb-4 text-[10px] tracking-[0.25em] uppercase">
        {title}
      </h3>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: '/exhibits' | '/about'; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-foreground/80 hover:text-primary block transition-colors"
    >
      {children}
    </Link>
  )
}
