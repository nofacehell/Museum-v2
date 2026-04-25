import { CategoryForm } from '@/components/admin/category-form'

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Новая категория</h1>
      <CategoryForm />
    </div>
  )
}
