import { ExhibitCard } from '@/components/public/exhibit-card'
import { FadeIn } from '@/components/motion/fade-in'
import { HeroLine, HeroReveal } from '@/components/motion/hero-reveal'
import { StaggerGrid } from '@/components/motion/stagger-grid'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import type { Route } from 'next'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [recentExhibits, categories] = await Promise.all([
    db.exhibit.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true, slug: true } } },
    }),
    db.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-12">
        <HeroReveal className="mx-auto max-w-3xl text-center">
          <HeroLine>
            <p className="text-muted-foreground mb-6 text-xs tracking-[0.3em] uppercase">
              Est. 2026 · Постоянная экспозиция
            </p>
          </HeroLine>
          <HeroLine>
            <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-7xl">
              История электричества
              <span className="text-primary block italic"> — в одном месте</span>
            </h1>
          </HeroLine>
          <HeroLine>
            <div className="bg-border mx-auto my-8 h-px w-16" />
          </HeroLine>
          <HeroLine>
            <p className="text-foreground/70 mx-auto max-w-xl text-lg leading-relaxed text-balance">
              От первых опытов с янтарём до индустриальной революции. Артефакты, документы и
              устройства, изменившие представление человечества об энергии.
            </p>
          </HeroLine>
          <HeroLine>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button render={<Link href="/exhibits" />} size="lg">
                Смотреть коллекцию
              </Button>
              <Button render={<Link href="/about" />} variant="ghost" size="lg">
                О музее →
              </Button>
            </div>
          </HeroLine>
        </HeroReveal>
      </section>

      {/* Recent exhibits */}
      {recentExhibits.length > 0 && (
        <section>
          <FadeIn>
            <SectionHeader
              number="01"
              title="Последние поступления"
              linkHref="/exhibits"
              linkLabel="Все экспонаты"
            />
          </FadeIn>
          <StaggerGrid className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {recentExhibits.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section>
          <FadeIn>
            <SectionHeader number="02" title="Коллекции" />
          </FadeIn>
          <StaggerGrid
            className="border-border grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/exhibits?category=${cat.slug}`}
                className="group border-border hover:bg-secondary/60 relative block border-b p-8 transition-colors sm:border-r last:sm:border-r-0 [&:nth-child(2)]:lg:border-r [&:nth-child(3)]:lg:border-r"
              >
                <span className="text-muted-foreground absolute top-4 right-4 text-xs tabular-nums">
                  №&nbsp;{String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-xl font-medium tracking-tight">{cat.name}</p>
                {cat.description && (
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                )}
                <span className="text-primary mt-4 inline-block text-sm opacity-0 transition-opacity group-hover:opacity-100">
                  Смотреть →
                </span>
              </Link>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Quote / about teaser */}
      <FadeIn y={32} duration={0.9}>
        <section className="border-border border-y py-20 text-center">
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-display text-2xl leading-relaxed font-light tracking-tight text-balance italic sm:text-3xl">
              «Электричество — это не только наука, но и история человеческого любопытства,
              проходящая через века.»
            </p>
            <footer className="text-muted-foreground mt-6 text-xs tracking-[0.2em] uppercase">
              Из вступительного зала музея
            </footer>
          </blockquote>
        </section>
      </FadeIn>
    </div>
  )
}

function SectionHeader({
  number,
  title,
  linkHref,
  linkLabel,
}: {
  number: string
  title: string
  linkHref?: Route
  linkLabel?: string
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div className="flex items-baseline gap-4">
        <span className="text-muted-foreground font-mono text-xs tabular-nums">
          №&nbsp;{number}
        </span>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="text-muted-foreground hover:text-foreground hidden text-sm tracking-wide transition-colors sm:inline-block"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
