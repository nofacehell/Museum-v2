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
import Link from 'next/link'

export default async function ExhibitsAdminPage() {
  const exhibits = await db.exhibit.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: { select: { name: true } } },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Экспонаты</h1>
        <Button render={<Link href="/admin/exhibits/new" />}>Создать</Button>
      </div>

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
              <TableCell className="text-muted-foreground">
                {ex.year != null
                  ? ex.year < 0
                    ? `${Math.abs(ex.year)} до н.э.`
                    : `${ex.year} г.`
                  : '—'}
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
    </div>
  )
}
