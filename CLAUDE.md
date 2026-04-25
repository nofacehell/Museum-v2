@AGENTS.md

# Museum v2 — состояние проекта

## Что это

Дипломный проект. Переписываем `nofacehell/museum-project` с нуля.  
Цель — образцовый TS-стек, который не стыдно показать.

**Scope MVP**: только каталог экспонатов + категории + одна ADMIN-панель.  
**Вне scope**: квизы, мини-игры, события, билеты, отзывы, i18n, публичная регистрация.

## Стек

| Слой      | Выбор                                         |
| --------- | --------------------------------------------- |
| Framework | Next.js 16, App Router                        |
| Язык      | TypeScript strict                             |
| ORM / БД  | Prisma 7 + PostgreSQL (Neon в prod)           |
| Auth      | Auth.js v5 (NextAuth) credentials, один ADMIN |
| UI        | Tailwind v4 + shadcn/ui                       |
| Картинки  | Cloudinary                                    |
| Валидация | Zod v4                                        |
| Формы     | react-hook-form + zod-resolver                |
| Тесты     | Vitest (unit) + Playwright (e2e)              |
| Деплой    | Vercel + Neon                                 |

## Важно: Next.js 16 — breaking changes

- **`middleware.ts` → `proxy.ts`** — файл переименован, API идентичный (default export + `config.matcher`)
- **`typedRoutes`** вышел из `experimental` — теперь `typedRoutes: true` в корне `nextConfig`

## Важно: Prisma 7 — breaking changes

Prisma 7 изменил API. `url` и `directUrl` больше не живут в `schema.prisma`.

- **`prisma.config.ts`** — новый конфиг-файл, там `datasource.url` (используем `DIRECT_URL` для миграций)
- **`PrismaClient`** теперь требует адаптер: `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })`
- Адаптер: `@prisma/adapter-pg` + `pg` — уже в `dependencies`
- `prisma generate` больше не запускается автоматически после `migrate dev` — нужно явно

## Структура файлов (текущая)

```
museum-v2/
├── prisma/
│   ├── schema.prisma          # Модели: User, Category, Exhibit
│   ├── seed.ts                # Seed: ADMIN + 4 категории + 5 экспонатов
│   └── migrations/            # Создаётся после первой миграции
├── prisma.config.ts           # Prisma 7: datasource url, путь к schema
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/ui/         # shadcn: button, input, card, dialog, table, …
│   ├── lib/
│   │   └── db.ts              # PrismaClient singleton (с PrismaPg адаптером)
│   └── env.ts                 # @t3-oss/env-nextjs — типобезопасные env
├── src/
│   ├── proxy.ts               # Auth guard: /admin/* → /login (Next.js 16: proxy, не middleware)
│   ├── types/next-auth.d.ts   # Расширение Session типа (добавляет user.id)
│   └── components/
│       └── session-provider.tsx  # Client wrapper для next-auth SessionProvider
├── docker-compose.yml         # Postgres 16 для локальной разработки
├── .env.example               # Шаблон — заполни и скопируй в .env
└── .env                       # НЕ в git — заполни перед запуском
```

## Фазы и статус

- [x] **Фаза 0** — скаффолд, shadcn, env-валидация
- [x] **Фаза 1** — Prisma schema, docker-compose, db.ts, seed.ts, миграция в Neon
- [x] **Фаза 2** — Auth.js v5: `src/lib/auth.ts`, proxy, `/login`
- [x] **Фаза 3** — публичные страницы: главная, каталог, экспонат, категория, 404
- [x] **Фаза 4** — Admin CRUD: дашборд, экспонаты + категории, Server Actions, DeleteButton
- [ ] **Фаза 5** — загрузка картинок через Cloudinary
- [ ] **Фаза 6** — тесты (Vitest unit + Playwright e2e)
- [ ] **Фаза 7** — CI (GitHub Actions) + деплой Vercel

## Первый запуск на новой машине

```bash
# 1. Зависимости
pnpm install

# 2. Заполни .env (скопируй .env.example и подставь реальные значения)
cp .env.example .env

# Вариант A — Neon (рекомендуется):
#   DATABASE_URL = pooled connection string
#   DIRECT_URL   = non-pooled connection string

# Вариант B — локальный Docker:
docker compose up -d
#   DATABASE_URL = postgresql://museum:museum@localhost:5432/museum
#   DIRECT_URL   = то же самое

# 3. Миграция и генерация клиента
pnpm db:migrate       # создаёт таблицы и prisma/migrations/
pnpm db:generate      # генерирует @prisma/client

# 4. Seed (опционально)
pnpm db:seed

# 5. Запуск
pnpm dev
```

## Ключевые решения (зафиксированы)

- Один `User` с `role = ADMIN` — расширение ролей вне MVP
- `onDelete: Restrict` на `Exhibit → Category` — нельзя удалить категорию с экспонатами
- Seed идемпотентный (`upsert`) — безопасно запускать повторно
- Картинки в `public/` не используем — Vercel serverless не сохраняет файлы; только Cloudinary
- `prisma.config.ts` использует `DIRECT_URL` для CLI (миграции), `db.ts` использует `DATABASE_URL` (pooled) для runtime
