import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О музее',
  description: 'История и миссия Музея Электричества.',
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-5xl">
      {/* Header */}
      <header className="border-border mb-16 border-b pb-12">
        <p className="text-muted-foreground mb-4 text-xs tracking-[0.3em] uppercase">О музее</p>
        <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl">
          Хранители <span className="text-primary italic">искры</span>
        </h1>
      </header>

      {/* Lead + facts */}
      <section className="mb-20 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-display text-2xl leading-[1.5] font-light tracking-tight text-balance">
            Музей Электричества — это не только собрание приборов и документов. Это история
            человеческого любопытства, проходящая через века: от первых наблюдений за статическими
            разрядами до электрификации целых стран.
          </p>
        </div>
        <dl className="space-y-0 text-sm">
          <FactRow term="Основан" value="2026" />
          <FactRow term="Экспонатов" value="1 200+" />
          <FactRow term="Площадь" value="2 400 м²" />
          <FactRow term="Залов" value="12" />
        </dl>
      </section>

      {/* Mission */}
      <section className="mb-20 grid gap-10 lg:grid-cols-3">
        <h2 className="font-display text-3xl font-medium tracking-tight">Миссия</h2>
        <div className="text-foreground/85 space-y-6 text-base leading-[1.8] lg:col-span-2">
          <p>
            Мы собираем, изучаем и показываем артефакты, изменившие представление человечества об
            энергии. От янтарных стержней Фалеса Милетского до промышленных трансформаторов начала
            XX века — каждый предмет в нашей коллекции рассказывает свою историю.
          </p>
          <p>
            Главная задача музея — сделать историю электричества осязаемой и понятной. Мы проводим
            экскурсии, лекции и образовательные программы для школьников, студентов и всех, кто
            хочет понять, как мысль становится силой, а сила — повседневностью.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="border-border my-20 border-y py-20 text-center">
        <blockquote className="mx-auto max-w-3xl">
          <p className="font-display text-2xl leading-relaxed font-light tracking-tight text-balance italic sm:text-3xl">
            «Я не потерпел поражения. Я просто нашёл десять тысяч способов, которые не работают.»
          </p>
          <footer className="text-muted-foreground mt-6 text-xs tracking-[0.2em] uppercase">
            Томас Эдисон
          </footer>
        </blockquote>
      </section>

      {/* History */}
      <section className="grid gap-10 lg:grid-cols-3">
        <h2 className="font-display text-3xl font-medium tracking-tight">История</h2>
        <div className="text-foreground/85 space-y-6 text-base leading-[1.8] lg:col-span-2">
          <p>
            Идея музея появилась как ответ на простой вопрос: где в одном месте можно увидеть, как
            развивалось понимание электричества? Не отдельный электрический прибор в музее техники,
            не один зал в политехническом — а целостный нарратив, прослеживающий путь от
            древнегреческих опытов до современных энергосетей.
          </p>
          <p>
            Сегодня в наших залах представлены копии первых лейденских банок, рабочие модели
            генераторов Фарадея, оригинальные лампы Эдисона и Свана, телеграфные аппараты Морзе, а
            также документы, фотографии и личные вещи учёных и инженеров.
          </p>
        </div>
      </section>
    </article>
  )
}

function FactRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="border-border flex items-baseline justify-between gap-4 border-b py-3">
      <dt className="text-muted-foreground text-xs tracking-[0.15em] uppercase">{term}</dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  )
}
