# Museum v2

Виртуальный музей электричества — каталог экспонатов с админ-панелью.
Дипломный проект, переписанный с нуля на современном TypeScript-стеке.

## Стек

| Слой      | Технология                         |
| --------- | ---------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Язык      | TypeScript strict                  |
| ORM / БД  | Prisma 7 + PostgreSQL (Neon)       |
| Auth      | Auth.js v5 (NextAuth) credentials  |
| UI        | Tailwind v4 + Base UI              |
| Картинки  | Cloudinary (signed upload)         |
| Валидация | Zod v4                             |
| Формы     | react-hook-form + zodResolver      |
| Тесты     | Vitest (unit) + Playwright (e2e)   |
| CI/CD     | GitHub Actions + Vercel            |

## Локальный запуск

```bash
# 1. Зависимости
pnpm install

# 2. Переменные окружения
cp .env.example .env
# Заполни .env реальными значениями (см. ниже)

# 3. Миграции и генерация Prisma Client
pnpm db:migrate
pnpm db:generate

# 4. Seed (опционально — создаст админа и тестовые данные)
pnpm db:seed

# 5. Dev-сервер
pnpm dev
```

Открой [localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная                          | Назначение                                         |
| ----------------------------------- | -------------------------------------------------- |
| `DATABASE_URL`                      | Pooled connection string (runtime)                 |
| `DIRECT_URL`                        | Non-pooled URL (для миграций)                      |
| `AUTH_SECRET`                       | 32+ символа, `openssl rand -base64 32`             |
| `AUTH_URL`                          | Публичный URL приложения (обязателен в prod)       |
| `CLOUDINARY_CLOUD_NAME`             | Имя облака Cloudinary                              |
| `CLOUDINARY_API_KEY`                | API key                                            |
| `CLOUDINARY_API_SECRET`             | API secret (только сервер)                         |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | То же облако, доступно клиенту                     |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY`    | API key, доступен клиенту (для подписанных upload) |
| `ADMIN_EMAIL`                       | Email для seed-скрипта                             |
| `ADMIN_PASSWORD`                    | Пароль для seed-скрипта (мин. 8 символов)          |

## Команды

```bash
pnpm dev            # dev-сервер
pnpm build          # production-сборка (включает prisma generate)
pnpm start          # запуск production-сборки

pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm format         # Prettier write
pnpm format:check   # Prettier check

pnpm test           # unit-тесты (Vitest)
pnpm test:watch     # watch-режим
pnpm test:e2e       # e2e-тесты (Playwright)

pnpm db:migrate     # создать миграцию (dev)
pnpm db:deploy      # применить миграции (prod)
pnpm db:generate    # сгенерировать @prisma/client
pnpm db:seed        # запустить seed
pnpm db:studio      # открыть Prisma Studio
```

## Деплой на Vercel

1. Создать проект в [Vercel](https://vercel.com/new), импортировать репозиторий.
2. Framework preset — **Next.js** (определится автоматически).
3. В **Project Settings → Environment Variables** добавить все переменные из `.env.example`.
   - `AUTH_URL` = публичный URL Vercel (`https://your-app.vercel.app`).
   - `DATABASE_URL` / `DIRECT_URL` — connection strings из Neon.
4. Сборка использует `pnpm build`, который запускает `prisma generate && next build`.
5. После первого деплоя выполнить миграции: локально `pnpm db:deploy` (с production `DATABASE_URL` в `.env`).
6. (Опционально) запустить seed: `pnpm db:seed`.

## CI

GitHub Actions запускает на каждый push/PR в `main`:
lint → typecheck → format:check → unit-тесты.

См. [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Структура

```
museum-v2/
├── prisma/                    # схема, миграции, seed
├── public/                    # статика
├── src/
│   ├── app/
│   │   ├── (public)/          # публичные страницы (главная, каталог, о музее)
│   │   ├── admin/             # защищённая админ-панель
│   │   ├── api/               # API routes (auth, cloudinary-sign)
│   │   ├── login/             # страница входа
│   │   └── layout.tsx
│   ├── components/
│   │   ├── admin/             # формы, sidebar, delete-button
│   │   ├── public/            # header, footer, exhibit-card
│   │   └── ui/                # shadcn-стиль примитивы
│   ├── lib/
│   │   ├── actions/           # server actions
│   │   ├── auth.ts            # Auth.js конфиг
│   │   ├── db.ts              # Prisma singleton
│   │   ├── format.ts          # formatYear
│   │   ├── slug.ts            # slugify
│   │   └── validations/       # Zod-схемы
│   ├── env.ts                 # типобезопасные env (@t3-oss/env-nextjs)
│   └── proxy.ts               # auth guard для /admin/* (Next.js 16: proxy, не middleware)
├── tests/                     # unit-тесты
├── e2e/                       # e2e-тесты (Playwright)
└── prisma.config.ts           # Prisma 7 datasource
```
