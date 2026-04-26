import { ExhibitForm } from '@/components/admin/exhibit-form'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ id: string }> }

export default async function EditExhibitPage({ params }: Props) {
  const { id } = await params
  const [exhibit, categories] = await Promise.all([
    db.exhibit.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!exhibit) notFound()

  return (
    <div>
      <header className="mb-10">
        <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
          Экспонаты / Редактирование
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
          {exhibit.title}
        </h1>
      </header>
      <ExhibitForm exhibit={exhibit} categories={categories} />
    </div>
  )
}
