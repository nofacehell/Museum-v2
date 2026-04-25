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
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Редактировать экспонат</h1>
      <ExhibitForm exhibit={exhibit} categories={categories} />
    </div>
  )
}
