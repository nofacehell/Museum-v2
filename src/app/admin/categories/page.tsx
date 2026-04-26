import { DeleteButton } from '@/components/admin/delete-button'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteCategory } from '@/lib/actions/categories'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { exhibits: true } } },
  })

  return (
    <div>
      <header className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
            Управление
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            Категории
          </h1>
        </div>
        <Button render={<Link href="/admin/categories/new" />}>+ Добавить</Button>
      </header>

      {categories.length === 0 ? (
        <p className="text-muted-foreground border-border border-y py-16 text-center">
          Пока нет ни одной категории.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Экспонатов</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono">{cat.slug}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {cat._count.exhibits}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/categories/${cat.id}`} />}
                    >
                      Изменить
                    </Button>
                    <DeleteButton id={cat.id} action={deleteCategory} label="категорию" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
