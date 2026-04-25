import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О музее',
  description: 'История и миссия нашего музея.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">О музее</h1>
      <div className="prose prose-neutral max-w-none">
        <p>
          Наш музей — хранитель исторической памяти региона. Коллекция насчитывает тысячи
          экспонатов: археологические находки, нумизматика, живопись и предметы прикладного
          искусства.
        </p>
        <p>
          Миссия музея — сохранять и популяризировать культурное наследие, делать историю доступной
          для каждого.
        </p>
      </div>
    </div>
  )
}
