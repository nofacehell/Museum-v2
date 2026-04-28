import { ExhibitCard } from '@/components/public/exhibit-card'
import { FadeIn } from '@/components/motion/fade-in'
import { HeroLine, HeroReveal } from '@/components/motion/hero-reveal'
import { StaggerGrid } from '@/components/motion/stagger-grid'
import { Button } from '@/components/ui/button'
import { formatYear } from '@/lib/format'
import { db } from '@/lib/db'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [featured, recentExhibits, categories] = await Promise.all([
    db.exhibit.findFirst({
      orderBy: [{ year: 'asc' }, { createdAt: 'asc' }],
      include: { category: { select: { name: true, slug: true } } },
    }),
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

      {/* Featured exhibit */}
      {featured && (
        <FadeIn y={32} duration={0.8}>
          <section>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-muted-foreground font-mono text-xs tabular-nums">Экспонат</span>
              <h2 className="font-display text-lg font-medium tracking-tight text-balance">
                Избранное
              </h2>
            </div>
            <Link href={`/exhibits/${featured.slug}`} className="group block">
              <div className="border-border grid overflow-hidden border sm:grid-cols-[1fr_1.1fr]">
                <div className="bg-secondary/40 relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                    {featured.category.name}
                    {featured.year != null && (
                      <span className="ml-4 font-mono">{formatYear(featured.year)}</span>
                    )}
                  </p>
                  <h3 className="font-display group-hover:text-primary mt-3 text-3xl leading-tight font-medium tracking-tight transition-colors sm:text-4xl">
                    {featured.title}
                  </h3>
                  <div className="bg-foreground/15 my-6 h-px w-8" />
                  <p className="text-foreground/70 line-clamp-4 text-sm leading-relaxed">
                    {featured.description}
                  </p>
                  <p className="text-primary mt-6 text-sm tracking-wide">Читать подробнее →</p>
                </div>
              </div>
            </Link>
          </section>
        </FadeIn>
      )}

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
                className="group border-border hover:bg-secondary/60 relative block border-b p-8 transition-colors sm:border-r last:sm:border-r-0 nth-2:lg:border-r nth-3:lg:border-r"
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

      {/* Quote */}
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
