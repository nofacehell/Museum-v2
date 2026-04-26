import { CategoryForm } from '@/components/admin/category-form'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ id: string }> }

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const category = await db.category.findUnique({ where: { id } })
  if (!category) notFound()

  return (
    <div>
      <header className="mb-10">
        <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
          Категории / Редактирование
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
          {category.name}
        </h1>
      </header>
      <CategoryForm category={category} />
    </div>
  )
}
