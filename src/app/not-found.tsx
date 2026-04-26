import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground mb-4 text-[10px] tracking-[0.3em] uppercase">
        Ошибка 404
      </p>
      <h1 className="font-display text-7xl leading-[1] font-medium tracking-tight sm:text-9xl">
        Не <span className="text-primary italic">найдено</span>
      </h1>
      <div className="bg-foreground/15 my-8 h-px w-16" />
      <p className="text-muted-foreground mb-10 max-w-md text-base leading-relaxed text-balance">
        Этот зал музея пока закрыт на реставрацию или экспоната с таким названием не существует.
      </p>
      <Button render={<Link href="/" />} variant="outline" size="lg">
        Вернуться ко входу
      </Button>
    </main>
  )
}
