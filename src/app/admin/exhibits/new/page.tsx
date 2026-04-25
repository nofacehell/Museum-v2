import { ExhibitForm } from '@/components/admin/exhibit-form'
import { db } from '@/lib/db'

export default async function NewExhibitPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Новый экспонат</h1>
      <ExhibitForm categories={categories} />
    </div>
  )
}
