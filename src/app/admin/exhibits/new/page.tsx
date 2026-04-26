import { ExhibitForm } from '@/components/admin/exhibit-form'
import { db } from '@/lib/db'

export default async function NewExhibitPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })

  return (
    <div>
      <header className="mb-10">
        <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
          Экспонаты / Создание
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
          Новый экспонат
        </h1>
      </header>
      <ExhibitForm categories={categories} />
    </div>
  )
}
