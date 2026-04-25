import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-6xl font-semibold">404</h1>
      <p className="text-muted-foreground">Страница не найдена.</p>
      <Button render={<Link href="/" />} variant="outline">
        На главную
      </Button>
    </main>
  )
}
