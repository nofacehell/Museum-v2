import { z } from 'zod'

export const ExhibitSchema = z.object({
  title: z.string().min(1, 'Название обязательно').max(200),
  slug: z
    .string()
    .min(1, 'Slug обязателен')
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Только строчные латинские буквы, цифры и дефис'),
  description: z.string().min(1, 'Описание обязательно'),
  year: z.number().int().min(-10000).max(2100).optional(),
  origin: z.string().max(200).optional(),
  imageUrl: z.string().url('Некорректный URL изображения'),
  imagePublicId: z.string().optional(),
  categoryId: z.string().min(1, 'Категория обязательна'),
})

export type ExhibitInput = z.infer<typeof ExhibitSchema>
