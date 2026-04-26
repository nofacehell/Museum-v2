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
import { deleteExhibit } from '@/lib/actions/exhibits'
import { db } from '@/lib/db'
import { formatYear } from '@/lib/format'
import Link from 'next/link'

export default async function ExhibitsAdminPage() {
  const exhibits = await db.exhibit.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: { select: { name: true } } },
  })

  return (
    <div>
      <header className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
            Управление
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            Экспонаты
          </h1>
        </div>
        <Button render={<Link href="/admin/exhibits/new" />}>+ Добавить</Button>
      </header>

      {exhibits.length === 0 ? (
        <p className="text-muted-foreground border-border border-y py-16 text-center">
          Пока нет ни одного экспоната.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Год</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {exhibits.map((ex) => (
              <TableRow key={ex.id}>
                <TableCell className="font-medium">{ex.title}</TableCell>
                <TableCell className="text-muted-foreground">{ex.category.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono tabular-nums">
                  {formatYear(ex.year)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/exhibits/${ex.id}`} />}
                    >
                      Изменить
                    </Button>
                    <DeleteButton id={ex.id} action={deleteExhibit} label="экспонат" />
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
