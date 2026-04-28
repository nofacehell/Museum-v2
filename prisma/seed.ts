import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

const categories = [
  {
    slug: 'early-experiments',
    name: 'Ранние эксперименты',
    description: 'От янтаря Фалеса до лейденской банки',
  },
  {
    slug: 'galvanism',
    name: 'Гальваника',
    description: 'Вольтов столб и рождение электрохимии',
  },
  {
    slug: 'electromagnetism',
    name: 'Электромагнетизм',
    description: 'Открытия Ампера, Ома и Фарадея',
  },
  {
    slug: 'electric-light',
    name: 'Электрический свет',
    description: 'От телеграфа до лампы накаливания',
  },
  {
    slug: 'radio-waves',
    name: 'Радио и волны',
    description: 'Электромагнитные волны и лаборатория Теслы',
  },
]

const exhibits = [
  // — Ранние эксперименты —
  {
    slug: 'leyden-jar',
    title: 'Лейденская банка',
    description:
      'Первый в истории конденсатор, изобретённый независимо Питером ван Мюссенбруком и Эвальдом Юргеном фон Клейстом в 1745 году. Стеклянный сосуд с внутренней и внешней металлической обкладкой накапливал статический заряд, создавая при разряде ощутимый удар током. Именно лейденская банка позволила учёным впервые «поймать» электричество и изучать его в лаборатории. Фундамент всей будущей теории конденсаторов.',
    year: 1745,
    origin: 'Лейден, Нидерланды',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Leyden_jar.png',
    categorySlug: 'early-experiments',
  },
  {
    slug: 'franklin-lightning',
    title: 'Опыт Франклина с воздушным змеем',
    description:
      'В 1752 году Бенджамин Франклин доказал электрическую природу молнии, запустив в грозу воздушного змея с металлическим ключом. Заряд по мокрой нити достиг лейденской банки — так молния стала предметом научного изучения. Результатом опыта стало изобретение громоотвода, спасшего миллионы зданий. Франклин ввёл понятия «положительный» и «отрицательный» заряд, которыми физика пользуется до сих пор.',
    year: 1752,
    origin: 'Филадельфия, США',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/25/Benjamin_Franklin_by_Joseph_Duplessis_1778.jpg',
    categorySlug: 'early-experiments',
  },

  // — Гальваника —
  {
    slug: 'galvani-frog',
    title: 'Опыт Гальвани с лягушкой',
    description:
      'В 1780 году болонский врач Луиджи Гальвани заметил, что лапки препарированной лягушки сокращаются при касании двух разных металлов. Он назвал явление «животным электричеством», считая его источником живую ткань. Вольта опроверг эту трактовку, но именно спор двух учёных привёл к открытию химического источника тока. Гальванизм — термин, сохранившийся в языке электрохимии и гальванопластики.',
    year: 1780,
    origin: 'Болонья, Италия',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c7/Galvani-frogs-legs-electricity.jpg',
    categorySlug: 'galvanism',
  },
  {
    slug: 'volta-portrait',
    title: 'Алессандро Вольта',
    description:
      'Итальянский физик Алессандро Вольта (1745–1827) — создатель первого химического источника постоянного тока. Опровергнув теорию «животного электричества» Гальвани, он показал, что контакт двух разных металлов в растворе электролита генерирует непрерывный ток. В 1800 году Вольта представил своё изобретение Наполеону, который произвёл его в рыцари. Единица электрического напряжения «вольт» носит его имя.',
    year: 1800,
    origin: 'Павия, Италия',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Alessandro_Volta.jpeg',
    categorySlug: 'galvanism',
  },
  {
    slug: 'volta-pile',
    title: 'Вольтов столб',
    description:
      'Первая в мире электрическая батарея, созданная Алессандро Вольтой в 1800 году. Чередующиеся диски цинка и меди, разделённые суконными прокладками, смоченными солёным раствором, давали непрерывный электрический ток — нечто принципиально новое по сравнению со статическим электричеством. Вольтов столб немедленно стал инструментом науки: с его помощью Дэви в 1808 году выделил натрий, калий и кальций, а Фарадей сформулировал законы электролиза.',
    year: 1800,
    origin: 'Павия, Италия',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/VoltaBattery.JPG',
    categorySlug: 'galvanism',
  },

  // — Электромагнетизм —
  {
    slug: 'ampere-portrait',
    title: 'Андре-Мари Ампер',
    description:
      'Французский физик и математик Андре-Мари Ампер (1775–1836) в 1820 году за одну неделю сформулировал основные законы взаимодействия токов. Он установил, что параллельные проводники с током притягиваются или отталкиваются, и ввёл понятие «электродинамика». Ампер первым предположил, что магнетизм — это результат микроскопических круговых токов в веществе. Единица силы тока «ампер» носит его имя.',
    year: 1825,
    origin: 'Париж, Франция',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Ampere_Andre_1825.jpg',
    categorySlug: 'electromagnetism',
  },
  {
    slug: 'ohm-law',
    title: 'Георг Ом и закон сопротивления',
    description:
      'Немецкий физик Георг Симон Ом (1789–1854) в 1827 году экспериментально установил линейную зависимость между напряжением, током и сопротивлением проводника. Закон Ома стал краеугольным камнем электротехники: без него невозможно рассчитать ни одну цепь. При жизни учёного его открытие встретило скептицизм — Министерство образования Баварии уволило его за «несерьёзность». Признание и Королевская медаль пришли лишь за три года до смерти.',
    year: 1827,
    origin: 'Мюнхен, Германия',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Georg_Simon_Ohm3.jpg',
    categorySlug: 'electromagnetism',
  },
  {
    slug: 'faraday-induction',
    title: 'Катушка электромагнитной индукции Фарадея',
    description:
      'В 1831 году Майкл Фарадей намотал два изолированных провода на железное кольцо и обнаружил: изменение тока в одном проводнике порождает ток в другом. Это явление — электромагнитная индукция — стало физическим принципом, лежащим в основе всех генераторов, трансформаторов и электродвигателей. Катушка Фарадея — возможно, самый ценный прибор в истории электротехники: без неё не было бы современной энергетики.',
    year: 1831,
    origin: 'Лондон, Великобритания',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Induction_coil.jpg',
    categorySlug: 'electromagnetism',
  },
  {
    slug: 'electric-motor-diagram',
    title: 'Принцип работы электродвигателя постоянного тока',
    description:
      'Первый электромотор, способный совершать непрерывное вращение, был продемонстрирован Майклом Фарадеем в 1821 году. Схема, представленная в экспозиции, объясняет принцип действия коллекторного двигателя постоянного тока: взаимодействие магнитного поля и тока в обмотке ротора создаёт механический крутящий момент. К 1880-м годам электромоторы работали на заводах, трамваях и горнодобывающих предприятиях по всему миру.',
    year: 1837,
    origin: 'Берлин, Германия',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Electric_motor_cycle_2.png',
    categorySlug: 'electromagnetism',
  },

  // — Электрический свет —
  {
    slug: 'morse-telegraph',
    title: 'Телеграфный аппарат Морзе',
    description:
      'Телеграф Сэмюэла Морзе (1837) стал первой практической системой электросвязи. Комбинации точек и тире — код Морзе — позволяли передавать сообщения на тысячи километров по медному проводу со скоростью, немыслимой для эпохи почтовых карет. К 1866 году трансатлантический кабель связал Европу и Америку; телеграф изменил дипломатию, торговлю и репортажи военных корреспондентов.',
    year: 1837,
    origin: 'Нью-Йорк, США',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Morse_telegraph.jpg',
    categorySlug: 'electric-light',
  },
  {
    slug: 'joseph-swan',
    title: 'Джозеф Суон и лампа накаливания',
    description:
      'Британский физик Джозеф Суон продемонстрировал рабочую лампу накаливания с угольной нитью в 1878 году — чуть раньше Эдисона. В 1881 году его дом в Гейтсхеде стал первым в мире частным зданием с электрическим освещением. Суон и Эдисон впоследствии объединили патенты, основав компанию Ediswan. Суон также изобрёл целлулоидную фотографическую пластину и бромосеребряную бумагу.',
    year: 1878,
    origin: 'Ньюкасл, Великобритания',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Joseph_Wilson_Swan.jpg',
    categorySlug: 'electric-light',
  },
  {
    slug: 'thomas-edison',
    title: 'Томас Эдисон и система электроснабжения',
    description:
      'Эдисон не просто усовершенствовал лампу накаливания — он создал первую коммерческую систему электроснабжения. В 1882 году его электростанция на Перл-стрит в Нью-Йорке начала освещать 85 потребителей. Сеть постоянного тока, трансформаторы, счётчики, предохранители — Эдисон продумал всё звенья цепи от генератора до розетки. «Война токов» с Теслой и Вестингаузом в итоге завершилась победой переменного тока.',
    year: 1879,
    origin: 'Менло-Парк, США',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Thomas_Edison2.jpg',
    categorySlug: 'electric-light',
  },

  // — Радио и волны —
  {
    slug: 'heinrich-hertz',
    title: 'Генрих Герц и электромагнитные волны',
    description:
      'В 1888 году немецкий физик Генрих Герц экспериментально подтвердил существование электромагнитных волн, предсказанных Максвеллом. Его установка — вибратор и резонатор с искровым зазором — генерировала и принимала радиоволны на расстоянии нескольких метров. Сам Герц не предвидел практического применения своего открытия; через семь лет Маркони и Попов использовали его принцип для беспроводной связи. Единица частоты «герц» носит его имя.',
    year: 1888,
    origin: 'Карлсруэ, Германия',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Heinrich_Hertz.jpg',
    categorySlug: 'radio-waves',
  },
  {
    slug: 'tesla-laboratory',
    title: 'Никола Тесла у высоковольтного оборудования',
    description:
      'Фотография сделана около 1895 года и демонстрирует Теслу рядом с его высоковольтным трансформатором. Тесла разработал систему передачи электроэнергии на переменном токе, ставшую стандартом мировой энергетики. Его катушки резонансного трансформатора генерировали миллионы вольт и использовались для экспериментов с беспроводной передачей энергии. Победа системы Теслы–Вестингауза над постоянным током Эдисона предопределила облик электросетей XX века.',
    year: 1895,
    origin: 'Нью-Йорк, США',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Nikola_Tesla%2C_with_his_equipment_Wellcome_M0014782.jpg',
    categorySlug: 'radio-waves',
  },
  {
    slug: 'tesla-colorado',
    title: 'Лаборатория Теслы в Колорадо-Спрингс',
    description:
      'В 1899 году Тесла построил в Колорадо-Спрингс экспериментальную станцию для исследования беспроводной передачи энергии. Его гигантская катушка-трансформатор генерировала искры длиной до 40 метров и молнии, слышимые за 15 миль. В этой лаборатории Тесла утверждал, что принял сигналы внеземного происхождения — вероятно, это были помехи от атмосферных явлений. Результаты экспериментов легли в основу проекта «Башня Уорденклифф» — первой попытки создать глобальную беспроводную сеть.',
    year: 1899,
    origin: 'Колорадо-Спрингс, США',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Tesla_colorado_adjusted.jpg',
    categorySlug: 'radio-waves',
  },
]

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  }

  await db.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: 'ADMIN',
    },
  })
  console.log(`Admin user upserted: ${email}`)

  // Clean up old data
  await db.exhibit.deleteMany({})
  await db.category.deleteMany({})
  console.log('Old exhibits and categories cleared')

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    })
  }
  console.log(`Categories upserted: ${categories.length}`)

  for (const ex of exhibits) {
    const { categorySlug, ...data } = ex
    const category = await db.category.findUniqueOrThrow({ where: { slug: categorySlug } })
    await db.exhibit.upsert({
      where: { slug: data.slug },
      update: { ...data, categoryId: category.id },
      create: { ...data, categoryId: category.id },
    })
  }
  console.log(`Exhibits upserted: ${exhibits.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
