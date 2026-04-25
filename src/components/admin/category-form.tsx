'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createCategory, updateCategory } from '@/lib/actions/categories'
import { CategorySchema } from '@/lib/validations/category'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

type FormData = z.infer<typeof CategorySchema>

type Props = {
  category?: Category
}

export function CategoryForm({ category }: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: category
      ? { name: category.name, slug: category.slug, description: category.description ?? '' }
      : {},
  })

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    register('name').onChange(e)
    if (!category) {
      setValue(
        'slug',
        name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      )
    }
  }

  async function onSubmit(data: FormData) {
    const result = category ? await updateCategory(category.id, data) : await createCategory(data)

    if ('error' in result) {
      toast.error(result.error)
      return
    }
    toast.success(category ? 'Категория обновлена' : 'Категория создана')
    router.push('/admin/categories')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Название</Label>
        <Input id="name" {...register('name', { onChange: handleNameChange })} />
        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register('slug')} />
        {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" rows={3} {...register('description')} />
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение…' : 'Сохранить'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/categories')}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
