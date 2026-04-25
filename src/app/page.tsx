import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="font-display text-5xl font-semibold tracking-tight">Museum v2</h1>
      <p className="text-muted-foreground max-w-prose text-balance">
        Скаффолд Next.js 16 + Prisma + Tailwind. Публичные страницы появятся в Phase 3.
      </p>
      <Button render={<Link href="/admin" />} nativeButton={false}>
        Открыть админку
      </Button>
    </main>
  )
}
