import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const categories = [
  { slug: 'archaeology', name: 'Археология', description: 'Артефакты древних цивилизаций' },
  { slug: 'numismatics', name: 'Нумизматика', description: 'Монеты и медали' },
  { slug: 'painting', name: 'Живопись', description: 'Картины и графика' },
  { slug: 'applied-art', name: 'Прикладное искусство', description: 'Керамика, ткани, украшения' },
]

const exhibits = [
  {
    slug: 'bronze-fibula',
    title: 'Фибула бронзовая',
    description:
      'Застёжка для одежды эпохи раннего железного века. Найдена при раскопках городища на территории Черниговской области. Характерная форма с пружиной и иглой указывает на скифский период.',
    year: -500,
    origin: 'Черниговская область',
    imageUrl:
      'https://raw.githubusercontent.com/nofacehell/museum-project/main/src/server/public/images/exhibits/fibula.jpg',
    categorySlug: 'archaeology',
  },
  {
    slug: 'roman-denarius',
    title: 'Денарий римский',
    description:
      'Серебряная монета Римской империи периода правления Марка Аврелия (161–180 н.э.). На аверсе — портрет императора, на реверсе — богиня победы Виктория.',
    year: 170,
    origin: 'Римская империя',
    imageUrl:
      'https://raw.githubusercontent.com/nofacehell/museum-project/main/src/server/public/images/exhibits/denarius.jpg',
    categorySlug: 'numismatics',
  },
  {
    slug: 'kiev-grivna',
    title: 'Гривна киевская',
    description:
      'Серебряный шестиугольный слиток — денежная единица Киевской Руси XI–XII вв. Использовалась как средство платежа при крупных торговых сделках.',
    year: 1100,
    origin: 'Киевская Русь',
    imageUrl:
      'https://raw.githubusercontent.com/nofacehell/museum-project/main/src/server/public/images/exhibits/grivna.jpg',
    categorySlug: 'numismatics',
  },
  {
    slug: 'oil-landscape',
    title: 'Пейзаж с рекой',
    description:
      'Масло на холсте, конец XIX века. Неизвестный художник передаёт характерный украинский пейзаж: широкая река в пойме, вечернее небо с облаками. Техника близка к реализму Барбизонской школы.',
    year: 1890,
    origin: 'Украина',
    imageUrl:
      'https://raw.githubusercontent.com/nofacehell/museum-project/main/src/server/public/images/exhibits/landscape.jpg',
    categorySlug: 'painting',
  },
  {
    slug: 'ceramic-jug',
    title: 'Кувшин керамический',
    description:
      'Поливная керамика, Опошня, начало XX века. Традиционная гончарная техника с характерным орнаментом в виде стилизованных цветов. Полива зелёного и коричневого цветов.',
    year: 1910,
    origin: 'Опошня, Полтавская область',
    imageUrl:
      'https://raw.githubusercontent.com/nofacehell/museum-project/main/src/server/public/images/exhibits/jug.jpg',
    categorySlug: 'applied-art',
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
