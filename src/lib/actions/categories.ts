'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { CategorySchema } from '@/lib/validations/category'
import { revalidatePath } from 'next/cache'

type ActionResult = { ok: true } | { error: string }

async function requireAdmin(): Promise<void> {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
}

export async function createCategory(raw: unknown): Promise<ActionResult> {
  try {
    await requireAdmin()
    const data = CategorySchema.parse(raw)
    await db.category.create({ data })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}

export async function updateCategory(id: string, raw: unknown): Promise<ActionResult> {
  try {
    await requireAdmin()
    const data = CategorySchema.parse(raw)
    await db.category.update({ where: { id }, data })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.category.delete({ where: { id } })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}
