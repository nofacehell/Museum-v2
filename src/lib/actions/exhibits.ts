'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { ExhibitSchema } from '@/lib/validations/exhibit'
import { revalidatePath } from 'next/cache'

type ActionResult = { ok: true } | { error: string }

async function requireAdmin(): Promise<void> {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
}

export async function createExhibit(raw: unknown): Promise<ActionResult> {
  try {
    await requireAdmin()
    const data = ExhibitSchema.parse(raw)
    await db.exhibit.create({ data })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}

export async function updateExhibit(id: string, raw: unknown): Promise<ActionResult> {
  try {
    await requireAdmin()
    const data = ExhibitSchema.parse(raw)
    await db.exhibit.update({ where: { id }, data })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}

export async function deleteExhibit(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.exhibit.delete({ where: { id } })
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Неизвестная ошибка' }
  }
}
