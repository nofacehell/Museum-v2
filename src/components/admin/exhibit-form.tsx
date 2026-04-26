'use client'

import { ImageUpload } from '@/components/admin/image-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { slugify } from '@/lib/slug'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createExhibit, updateExhibit } from '@/lib/actions/exhibits'
import { ExhibitSchema } from '@/lib/validations/exhibit'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category, Exhibit } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

type FormData = z.infer<typeof ExhibitSchema>

type Props = {
  exhibit?: Exhibit
  categories: Pick<Category, 'id' | 'name'>[]
}

export function ExhibitForm({ exhibit, categories }: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ExhibitSchema),
    defaultValues: exhibit
      ? {
          title: exhibit.title,
          slug: exhibit.slug,
          description: exhibit.description,
          year: exhibit.year ?? undefined,
          origin: exhibit.origin ?? '',
          imageUrl: exhibit.imageUrl,
          imagePublicId: exhibit.imagePublicId ?? '',
          categoryId: exhibit.categoryId,
        }
      : {},
  })

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    register('title').onChange(e)
    if (!exhibit) {
      setValue('slug', slugify(title))
    }
  }

  async function onSubmit(data: FormData) {
    const result = exhibit ? await updateExhibit(exhibit.id, data) : await createExhibit(data)

    if ('error' in result) {
      toast.error(result.error)
      return
    }
    toast.success(exhibit ? 'Экспонат обновлён' : 'Экспонат создан')
    router.push('/admin/exhibits')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Название</Label>
        <Input id="title" {...register('title', { onChange: handleTitleChange })} />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register('slug')} />
        {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" rows={4} {...register('description')} />
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="year">Год</Label>
          <Input
            id="year"
            type="number"
            {...register('year', {
              valueAsNumber: true,
              setValueAs: (v) => (v === '' ? undefined : Number(v)),
            })}
            placeholder="напр. -500 или 1890"
          />
          {errors.year && <p className="text-destructive text-sm">{errors.year.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="origin">Происхождение</Label>
          <Input id="origin" {...register('origin')} />
          {errors.origin && <p className="text-destructive text-sm">{errors.origin.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="categoryId">Категория</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? null} onValueChange={field.onChange}>
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-destructive text-sm">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Изображение</Label>
        <ImageUpload
          value={watch('imageUrl') ?? ''}
          onChange={(url, publicId) => {
            setValue('imageUrl', url, { shouldValidate: true })
            setValue('imagePublicId', publicId)
          }}
        />
        {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение…' : 'Сохранить'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/exhibits')}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
