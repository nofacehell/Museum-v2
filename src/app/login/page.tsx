'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin'

  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const fd = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    })

    setPending(false)

    if (result?.error) {
      setError('Неверный email или пароль')
      return
    }

    router.push(callbackUrl as Route)
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-muted-foreground mb-3 text-[10px] tracking-[0.3em] uppercase">
            Музей Электричества
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight">Служебный вход</h1>
          <div className="bg-foreground/15 mx-auto mt-6 h-px w-12" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase"
            >
              Пароль
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
            />
          </div>

          {error && (
            <p className="text-destructive border-destructive/30 bg-destructive/5 border px-3 py-2 text-sm">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? 'Вход…' : 'Войти'}
          </Button>
        </form>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
