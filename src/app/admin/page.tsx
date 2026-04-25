import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const [exhibitCount, categoryCount] = await Promise.all([db.exhibit.count(), db.category.count()])

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Дашборд</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Экспонатов</p>
          <p className="mt-1 text-4xl font-semibold">{exhibitCount}</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Категорий</p>
          <p className="mt-1 text-4xl font-semibold">{categoryCount}</p>
        </div>
      </div>
    </div>
  )
}
