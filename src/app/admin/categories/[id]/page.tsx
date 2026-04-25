import { CategoryForm } from '@/components/admin/category-form'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ id: string }> }

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const category = await db.category.findUnique({ where: { id } })
  if (!category) notFound()

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Редактировать категорию</h1>
      <CategoryForm category={category} />
    </div>
  )
}
