import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const [exhibitCount, categoryCount] = await Promise.all([db.exhibit.count(), db.category.count()])

  return (
    <div>
      <PageHeader eyebrow="Обзор" title="Дашборд" />

      <div className="border-border grid grid-cols-1 border-t sm:grid-cols-2">
        <StatCard label="Экспонатов" value={exhibitCount} />
        <StatCard label="Категорий" value={categoryCount} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-border border-b p-8 sm:[&:nth-child(odd)]:border-r">
      <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase">{label}</p>
      <p className="font-display mt-3 text-5xl font-medium tracking-tight tabular-nums">{value}</p>
    </div>
  )
}

function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-10">
      <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">{eyebrow}</p>
      <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
        {title}
      </h1>
    </header>
  )
}
