import { CategoryForm } from '@/components/admin/category-form'

export default function NewCategoryPage() {
  return (
    <div>
      <header className="mb-10">
        <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
          Категории / Создание
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
          Новая категория
        </h1>
      </header>
      <CategoryForm />
    </div>
  )
}
