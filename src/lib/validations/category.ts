import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100),
  slug: z
    .string()
    .min(1, 'Slug обязателен')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Только строчные латинские буквы, цифры и дефис'),
  description: z.string().max(500).optional(),
})

export type CategoryInput = z.infer<typeof CategorySchema>
