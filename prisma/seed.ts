import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const collections = [
  {
    id: 'col-1',
    name: 'APPAREL',
    nameKo: '의류',
    nameEn: 'Apparel',
    slug: 'apparel',
    description: 'Premium streetwear collection',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'col-2',
    name: 'ART',
    nameKo: '아트',
    nameEn: 'Art',
    slug: 'art',
    description: 'Limited edition art prints and collectibles',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'col-3',
    name: 'ACCESSORIES',
    nameKo: '액세서리',
    nameEn: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with our accessories',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'col-4',
    name: 'COLLECTIBLES',
    nameKo: '컬렉터블',
    nameEn: 'Collectibles',
    slug: 'collectibles',
    description: 'Rare collectible items',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    isActive: true,
    sortOrder: 4,
  },
]

const products = [
  {
    name: 'OVERSIZED HOODIE BLACK',
    nameKo: '오버사이즈 후디 블랙',
    nameEn: 'Oversized Hoodie Black',
    slug: 'oversized-hoodie-black',
    description:
      'Premium heavyweight cotton hoodie with embroidered logo. Oversized fit for ultimate comfort.',
    descriptionKo: '프리미엄 헤비웨이트 코튼 후디. 자수 로고 디테일. 오버사이즈 핏으로 편안한 착용감.',
    priceKRW: 189000,
    priceUSD: 149,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    ],
    stock: 50,
    maxPerOrder: 3,
    collectionSlug: 'apparel',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'GRAPHIC TEE WHITE',
    nameKo: '그래픽 티셔츠 화이트',
    nameEn: 'Graphic Tee White',
    slug: 'graphic-tee-white',
    description: 'Classic fit t-shirt with front graphic print. 100% organic cotton.',
    descriptionKo: '클래식 핏 티셔츠. 전면 그래픽 프린트. 100% 오가닉 코튼.',
    priceKRW: 69000,
    priceUSD: 55,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    stock: 120,
    maxPerOrder: 5,
    collectionSlug: 'apparel',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'GRAPHIC TEE BLACK',
    nameKo: '그래픽 티셔츠 블랙',
    nameEn: 'Graphic Tee Black',
    slug: 'graphic-tee-black',
    description: 'Classic fit t-shirt with front graphic print. 100% organic cotton.',
    descriptionKo: '클래식 핏 티셔츠. 전면 그래픽 프린트. 100% 오가닉 코튼.',
    priceKRW: 69000,
    priceUSD: 55,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    stock: 85,
    maxPerOrder: 5,
    collectionSlug: 'apparel',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'CARGO PANTS OLIVE',
    nameKo: '카고 팬츠 올리브',
    nameEn: 'Cargo Pants Olive',
    slug: 'cargo-pants-olive',
    description: 'Relaxed fit cargo pants with multiple pockets. Durable cotton twill.',
    descriptionKo: '릴렉스드 핏 카고 팬츠. 멀티 포켓 디자인. 내구성 있는 코튼 트윌.',
    priceKRW: 159000,
    priceUSD: 125,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    stock: 40,
    maxPerOrder: 2,
    collectionSlug: 'apparel',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'CREWNECK SWEATSHIRT GREY',
    nameKo: '크루넥 스웨트셔츠 그레이',
    nameEn: 'Crewneck Sweatshirt Grey',
    slug: 'crewneck-sweatshirt-grey',
    description: 'Heavyweight cotton sweatshirt with ribbed cuffs and hem.',
    descriptionKo: '헤비웨이트 코튼 스웨트셔츠. 립 커프스와 밑단.',
    priceKRW: 139000,
    priceUSD: 110,
    images: [
      'https://images.unsplash.com/photo-1572495532056-8583af1cbae0?w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    ],
    stock: 60,
    maxPerOrder: 3,
    collectionSlug: 'apparel',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'ART PRINT "GENESIS" #001',
    nameKo: '아트 프린트 "제네시스" #001',
    nameEn: 'Art Print "Genesis" #001',
    slug: 'art-print-genesis-001',
    description:
      'Limited edition giclée print on archival paper. Signed and numbered. Edition of 50.',
    descriptionKo: '한정판 지클레 프린트. 아카이벌 페이퍼. 서명 및 넘버링. 50부 한정.',
    priceKRW: 250000,
    priceUSD: 200,
    images: [
      'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
      'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    ],
    stock: 50,
    maxPerOrder: 1,
    collectionSlug: 'art',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'ART PRINT "VOID" #002',
    nameKo: '아트 프린트 "보이드" #002',
    nameEn: 'Art Print "Void" #002',
    slug: 'art-print-void-002',
    description:
      'Limited edition giclée print on archival paper. Signed and numbered. Edition of 30.',
    descriptionKo: '한정판 지클레 프린트. 아카이벌 페이퍼. 서명 및 넘버링. 30부 한정.',
    priceKRW: 350000,
    priceUSD: 280,
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
      'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=800&q=80',
    ],
    stock: 30,
    maxPerOrder: 1,
    collectionSlug: 'art',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'ART PRINT "DUALITY" #003',
    nameKo: '아트 프린트 "듀얼리티" #003',
    nameEn: 'Art Print "Duality" #003',
    slug: 'art-print-duality-003',
    description:
      'Limited edition giclée print on archival paper. Signed and numbered. Edition of 25.',
    descriptionKo: '한정판 지클레 프린트. 아카이벌 페이퍼. 서명 및 넘버링. 25부 한정.',
    priceKRW: 450000,
    priceUSD: 360,
    images: [
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    ],
    stock: 25,
    maxPerOrder: 1,
    collectionSlug: 'art',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'BASEBALL CAP BLACK',
    nameKo: '베이스볼 캡 블랙',
    nameEn: 'Baseball Cap Black',
    slug: 'baseball-cap-black',
    description: 'Six-panel cap with embroidered logo. Adjustable strap.',
    descriptionKo: '6패널 캡. 자수 로고. 조절 가능한 스트랩.',
    priceKRW: 59000,
    priceUSD: 47,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80',
    ],
    stock: 100,
    maxPerOrder: 3,
    collectionSlug: 'accessories',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'BEANIE CHARCOAL',
    nameKo: '비니 차콜',
    nameEn: 'Beanie Charcoal',
    slug: 'beanie-charcoal',
    description: 'Ribbed knit beanie with woven label. One size fits all.',
    descriptionKo: '립 니트 비니. 우븐 라벨. 프리사이즈.',
    priceKRW: 45000,
    priceUSD: 36,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
      'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?w=800&q=80',
    ],
    stock: 150,
    maxPerOrder: 5,
    collectionSlug: 'accessories',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'TOTE BAG NATURAL',
    nameKo: '토트백 내추럴',
    nameEn: 'Tote Bag Natural',
    slug: 'tote-bag-natural',
    description: 'Heavy canvas tote bag with screen print. Inner pocket.',
    descriptionKo: '헤비 캔버스 토트백. 스크린 프린트. 내부 포켓.',
    priceKRW: 49000,
    priceUSD: 39,
    images: [
      'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80',
    ],
    stock: 200,
    maxPerOrder: 5,
    collectionSlug: 'accessories',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'SOCKS PACK (3 PAIRS)',
    nameKo: '양말 팩 (3켤레)',
    nameEn: 'Socks Pack (3 Pairs)',
    slug: 'socks-pack-3-pairs',
    description: 'Cotton blend crew socks. Pack of 3 with different designs.',
    descriptionKo: '코튼 블렌드 크루 양말. 3가지 디자인 세트.',
    priceKRW: 35000,
    priceUSD: 28,
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80',
      'https://images.unsplash.com/photo-1631541911232-1c9f8b0d75e7?w=800&q=80',
    ],
    stock: 300,
    maxPerOrder: 10,
    collectionSlug: 'accessories',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'VINYL FIGURE "PEPE" ED.1',
    nameKo: '비닐 피규어 "페페" 에디션1',
    nameEn: 'Vinyl Figure "Pepe" Edition 1',
    slug: 'vinyl-figure-pepe-ed1',
    description: 'Hand-painted vinyl figure. 8 inches tall. Limited to 100 pieces worldwide.',
    descriptionKo: '핸드페인팅 비닐 피규어. 20cm. 전세계 100개 한정.',
    priceKRW: 189000,
    priceUSD: 150,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=80',
    ],
    stock: 100,
    maxPerOrder: 1,
    collectionSlug: 'collectibles',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'VINYL FIGURE "DOOLY" ED.1',
    nameKo: '비닐 피규어 "둘리" 에디션1',
    nameEn: 'Vinyl Figure "Dooly" Edition 1',
    slug: 'vinyl-figure-dooly-ed1',
    description: 'Hand-painted vinyl figure. 8 inches tall. Limited to 100 pieces worldwide.',
    descriptionKo: '핸드페인팅 비닐 피규어. 20cm. 전세계 100개 한정.',
    priceKRW: 189000,
    priceUSD: 150,
    images: [
      'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
    ],
    stock: 0,
    maxPerOrder: 1,
    collectionSlug: 'collectibles',
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'ENAMEL PIN SET',
    nameKo: '에나멜 핀 세트',
    nameEn: 'Enamel Pin Set',
    slug: 'enamel-pin-set',
    description: 'Set of 5 enamel pins with different designs. Comes in display box.',
    descriptionKo: '5가지 디자인 에나멜 핀 세트. 디스플레이 박스 포함.',
    priceKRW: 45000,
    priceUSD: 36,
    images: [
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    ],
    stock: 200,
    maxPerOrder: 5,
    collectionSlug: 'collectibles',
    isActive: true,
    isFeatured: false,
  },
  {
    name: 'STICKER PACK VOL.1',
    nameKo: '스티커 팩 Vol.1',
    nameEn: 'Sticker Pack Vol.1',
    slug: 'sticker-pack-vol1',
    description: 'Pack of 10 vinyl stickers. Waterproof and UV resistant.',
    descriptionKo: '비닐 스티커 10장 세트. 방수 및 자외선 차단.',
    priceKRW: 15000,
    priceUSD: 12,
    images: [
      'https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=800&q=80',
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&q=80',
    ],
    stock: 500,
    maxPerOrder: 20,
    collectionSlug: 'collectibles',
    isActive: true,
    isFeatured: false,
  },
]

async function main() {
  console.log('Seeding database...')

  console.log('Creating admin user...')
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123!',
      name: 'Admin',
    },
  })

  console.log('Creating collections...')
  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: collection,
      create: collection,
    })
  }

  console.log('Creating products...')
  for (const product of products) {
    const collection = await prisma.collection.findUnique({
      where: { slug: product.collectionSlug },
    })

    const { collectionSlug, ...productData } = product

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...productData,
        collectionId: collection?.id,
      },
      create: {
        ...productData,
        collectionId: collection?.id,
      },
    })
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
