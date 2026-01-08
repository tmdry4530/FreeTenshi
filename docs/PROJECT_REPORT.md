# FreeTenshi - Web3 Commerce Platform
## 프로젝트 개발 완료 보고서

**문서 버전**: 1.0  
**작성일**: 2026년 1월 8일  
**프로젝트명**: FreeTenshi Web3 Fashion & Art Commerce Platform

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목적
의류 및 예술 아이템을 판매하는 Web3 기반 이커머스 플랫폼 개발. 모든 상품 구매 시 NFT 인증서가 자동으로 발행되어 디지털 소유권을 증명합니다.

### 1.2 핵심 기능
| 구분 | 기능 | 설명 |
|------|------|------|
| 사용자 | 소셜 로그인 | Google 계정으로 간편 로그인 |
| 사용자 | AA 지갑 자동 생성 | 로그인 시 Account Abstraction 지갑 자동 생성 |
| 사용자 | 다중 결제 | 원화(KRW), 외화(USD), 크립토(ETH/USDT/USDC) 지원 |
| 사용자 | NFT 자동 민팅 | 구매 완료 시 NFT 인증서 자동 발행 |
| 관리자 | 상품 관리 | 상품 등록/수정/삭제 |
| 관리자 | NFT 메타데이터 자동 생성 | 상품 등록 시 IPFS에 메타데이터 자동 업로드 |
| 관리자 | 주문 관리 | 주문 현황 조회 및 처리 |

### 1.3 디자인 레퍼런스
- **AESYNCTX** (https://aesynctx-kr.com) - 미니멀/모노톤 스타일
- **YMH TOYS** (https://ymh.toys) - 컬렉터블 아이템 레이아웃

---

## 2. 기술 스택

### 2.1 Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.1.1 | React 프레임워크 (App Router) |
| React | 19.2.3 | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |
| Tailwind CSS | 4.x | 스타일링 |
| Zustand | 5.x | 클라이언트 상태 관리 |
| React Query | 5.x | 서버 상태 관리 |

### 2.2 Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js API Routes | - | REST API |
| Prisma | 7.2.0 | ORM |
| PostgreSQL | - | 데이터베이스 |
| NextAuth | 5.0 beta | 인증 |

### 2.3 Web3 / Blockchain
| 기술 | 버전 | 용도 |
|------|------|------|
| Privy | 3.x | 소셜 로그인 + AA 지갑 |
| Viem | 2.x | 블록체인 인터랙션 |
| Wagmi | 3.x | React 훅 |
| Base Sepolia | - | 테스트넷 (EVM) |
| Hardhat | 2.22.x | 스마트 컨트랙트 개발 |
| OpenZeppelin | 5.x | 컨트랙트 표준 |

### 2.4 결제 / 스토리지
| 기술 | 용도 |
|------|------|
| Stripe | 원화/외화 카드 결제 |
| Pinata | IPFS 메타데이터 저장 |

### 2.5 테스트 / 배포
| 기술 | 용도 |
|------|------|
| Playwright | E2E 테스트 |
| Vercel | 프로덕션 배포 |
| Basescan | 컨트랙트 검증 |

---

## 3. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App (React 19)                                         │
│  ├── Pages: Home, Collections, Products, Cart, Checkout         │
│  ├── Admin Dashboard: Products, Orders                          │
│  └── State: Zustand (Cart) + React Query (Server)               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS API ROUTES                          │
├─────────────────────────────────────────────────────────────────┤
│  /api/products     - 상품 CRUD                                   │
│  /api/orders       - 주문 생성/조회                               │
│  /api/payments     - Stripe/Crypto 결제                          │
│  /api/admin        - 관리자 전용 API                              │
└─────────────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
┌───────────────────┐ ┌─────────────────┐ ┌─────────────────────┐
│    PostgreSQL     │ │     Stripe      │ │   Base Blockchain   │
│   (Prisma ORM)    │ │   (Payments)    │ │   (NFT Contract)    │
├───────────────────┤ ├─────────────────┤ ├─────────────────────┤
│ • Users           │ │ • KRW 결제       │ │ • ERC-1155 NFT      │
│ • Products        │ │ • USD 결제       │ │ • 관리자 민팅        │
│ • Orders          │ │ • JPY 결제       │ │ • 메타데이터 URI     │
│ • NFTs            │ │ • Webhook        │ │                     │
│ • Collections     │ └─────────────────┘ └─────────────────────┘
└───────────────────┘                               │
                                                    ▼
                                          ┌─────────────────┐
                                          │   Pinata IPFS   │
                                          ├─────────────────┤
                                          │ • 이미지 저장    │
                                          │ • NFT 메타데이터 │
                                          └─────────────────┘
```

---

## 4. 데이터베이스 스키마

### 4.1 핵심 테이블

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │     │   Product   │     │ Collection  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ email       │     │ name        │     │ name        │
│ privyId     │◄────│ collectionId│────►│ slug        │
│ walletAddr  │     │ priceKRW    │     │ description │
└──────┬──────┘     │ priceUSD    │     └─────────────┘
       │            │ images[]    │
       │            │ stock       │
       ▼            │ nftTokenId  │
┌─────────────┐     └──────┬──────┘
│    Order    │            │
├─────────────┤            │
│ id          │            │
│ userId      │◄───────────┘
│ total       │     ┌─────────────┐
│ currency    │     │     NFT     │
│ status      │     ├─────────────┤
└──────┬──────┘     │ id          │
       │            │ tokenId     │
       ▼            │ metadataUri │
┌─────────────┐     │ ownerId     │
│  OrderItem  │────►│ productId   │
├─────────────┤     └─────────────┘
│ quantity    │
│ priceAtTime │
│ nftMinted   │
└─────────────┘
```

### 4.2 주요 Enum 타입

| Enum | 값 |
|------|-----|
| Currency | KRW, USD, JPY, ETH, USDT, USDC |
| PaymentMethod | STRIPE_KRW, STRIPE_USD, CRYPTO_ETH, CRYPTO_USDT, CRYPTO_USDC |
| OrderStatus | PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED |
| PaymentStatus | PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED |

---

## 5. 스마트 컨트랙트

### 5.1 FreeTenshi.sol (ERC-1155)

```solidity
contract FreeTenshi is ERC1155, Ownable, ERC1155Supply {
    // 관리자만 민팅 가능
    function mint(address to, uint256 id, uint256 amount, string memory tokenURI)
    
    // 배치 민팅
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts)
    
    // 토큰 URI 조회
    function uri(uint256 tokenId) returns (string memory)
}
```

### 5.2 컨트랙트 특징
- **표준**: ERC-1155 (멀티 토큰)
- **권한**: Ownable (관리자만 민팅)
- **메타데이터**: IPFS URI 저장
- **네트워크**: Base Sepolia (테스트넷) / Base (메인넷)

---

## 6. 프로젝트 구조

```
freetenshi/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # 홈페이지
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── globals.css           # 전역 스타일
│   │   ├── (shop)/               # 쇼핑몰 라우트 그룹
│   │   │   ├── cart/             # 장바구니
│   │   │   ├── checkout/         # 결제
│   │   │   ├── collections/      # 컬렉션 목록
│   │   │   └── products/[slug]/  # 상품 상세
│   │   ├── (admin)/              # 관리자 라우트 그룹
│   │   │   └── dashboard/        # 대시보드
│   │   │       ├── products/     # 상품 관리
│   │   │       └── orders/       # 주문 관리
│   │   └── api/                  # API 라우트
│   │       ├── products/         # 상품 API
│   │       ├── orders/           # 주문 API
│   │       ├── payments/         # 결제 API
│   │       └── admin/            # 관리자 API
│   ├── components/               # 재사용 컴포넌트
│   │   ├── providers/            # Context Providers
│   │   ├── shop/                 # 쇼핑몰 컴포넌트
│   │   └── ui/                   # UI 컴포넌트
│   ├── lib/                      # 유틸리티
│   │   ├── prisma.ts             # Prisma 클라이언트
│   │   ├── stripe.ts             # Stripe 설정
│   │   ├── nft.ts                # NFT 민팅 로직
│   │   └── ipfs.ts               # IPFS 업로드
│   ├── data/                     # 목업 데이터
│   │   └── mock-products.ts      # 상품/컬렉션 데이터
│   ├── store/                    # 상태 관리
│   │   └── cart.ts               # 장바구니 스토어
│   ├── config/                   # 설정
│   │   ├── site.ts               # 사이트 설정
│   │   └── chains.ts             # 블록체인 설정
│   └── types/                    # TypeScript 타입
│       └── index.ts
├── contracts/                    # 스마트 컨트랙트
│   ├── contracts/
│   │   └── FreeTenshi.sol         # NFT 컨트랙트
│   ├── scripts/
│   │   └── deploy.ts             # 배포 스크립트
│   ├── test/
│   │   └── FreeTenshi.test.ts     # 컨트랙트 테스트
│   └── hardhat.config.ts
├── prisma/
│   ├── schema.prisma             # DB 스키마
│   └── seed.ts                   # 초기 데이터
├── e2e/                          # E2E 테스트
│   ├── home.spec.ts
│   ├── collections.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── admin.spec.ts
├── docs/                         # 문서
├── vercel.json                   # Vercel 배포 설정
├── next.config.ts                # Next.js 설정
├── playwright.config.ts          # Playwright 설정
└── package.json
```

---

## 7. 페이지별 기능 명세

### 7.1 사용자 페이지

| 페이지 | 경로 | 주요 기능 |
|--------|------|-----------|
| 홈 | `/` | 히어로 배너, 컬렉션 그리드, Featured 상품, NFT 설명 섹션 |
| 컬렉션 | `/collections/all` | 전체 상품 그리드 (16개 상품) |
| 상품 상세 | `/products/[slug]` | 이미지 갤러리, 가격 (KRW/USD/ETH), 수량 선택, 장바구니 추가, NFT 정보 |
| 장바구니 | `/cart` | 상품 목록, 수량 변경, 삭제, 총액 계산 |
| 결제 | `/checkout` | 배송 정보 입력, 결제 수단 선택 (Stripe/Crypto) |

### 7.2 관리자 페이지

| 페이지 | 경로 | 주요 기능 |
|--------|------|-----------|
| 대시보드 | `/dashboard` | 통계 요약 (매출, 주문, 상품) |
| 상품 관리 | `/dashboard/products` | 상품 목록, 검색, 필터링 |
| 상품 등록 | `/dashboard/products/new` | 상품 정보 입력, 이미지 업로드, NFT 메타데이터 생성 |
| 주문 관리 | `/dashboard/orders` | 주문 목록, 상태 변경, NFT 민팅 상태 |

---

## 8. 목업 데이터

### 8.1 컬렉션 (4개)

| 컬렉션 | 설명 | 상품 수 |
|--------|------|---------|
| APPAREL | 의류 (후디, 티셔츠, 팬츠, 스웨트셔츠) | 5개 |
| ART | 한정판 아트 프린트 | 3개 |
| ACCESSORIES | 액세서리 (캡, 비니, 토트백, 양말) | 4개 |
| COLLECTIBLES | 컬렉터블 (피규어, 핀, 스티커) | 4개 |

### 8.2 상품 가격대

| 카테고리 | 가격 범위 (KRW) | 가격 범위 (USD) |
|----------|-----------------|-----------------|
| 의류 | ₩69,000 ~ ₩189,000 | $55 ~ $149 |
| 아트 | ₩250,000 ~ ₩450,000 | $200 ~ $360 |
| 액세서리 | ₩35,000 ~ ₩59,000 | $28 ~ $47 |
| 컬렉터블 | ₩15,000 ~ ₩189,000 | $12 ~ $150 |

---

## 9. 환경 변수

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://freetenshi.com"
NEXTAUTH_SECRET="..."

# Privy (소셜 로그인 + AA 지갑)
NEXT_PUBLIC_PRIVY_APP_ID="..."
PRIVY_APP_SECRET="..."

# Blockchain
NEXT_PUBLIC_CHAIN_ID="84532"
NEXT_PUBLIC_RPC_URL="https://sepolia.base.org"
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="0x..."
ADMIN_PRIVATE_KEY="..."
BASESCAN_API_KEY="..."

# IPFS / Pinata
PINATA_JWT="..."
NEXT_PUBLIC_PINATA_GATEWAY="..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="https://freetenshi.com"
NEXT_PUBLIC_APP_NAME="FreeTenshi"
```

---

## 10. 배포 가이드

### 10.1 사전 준비

1. **외부 서비스 가입 및 API 키 발급**

| 서비스 | 용도 | 가입 URL |
|--------|------|----------|
| Vercel | 호스팅 | https://vercel.com |
| Privy | 인증 | https://privy.io |
| Pinata | IPFS | https://pinata.cloud |
| Stripe | 결제 | https://stripe.com |
| Basescan | 컨트랙트 검증 | https://basescan.org |

2. **PostgreSQL 데이터베이스**
   - Vercel Postgres, Supabase, Railway 등 사용 가능

### 10.2 스마트 컨트랙트 배포

```bash
# contracts 폴더 이동
cd contracts

# 의존성 설치
pnpm install

# 테스트 실행
pnpm test

# Base Sepolia 배포 (테스트넷)
pnpm deploy:sepolia

# Base Mainnet 배포 (프로덕션)
pnpm deploy:mainnet
```

배포 후 출력되는 컨트랙트 주소를 `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`에 설정

### 10.3 웹 애플리케이션 배포

```bash
# 루트 폴더에서
cd freetenshi

# 의존성 설치
pnpm install

# Prisma 클라이언트 생성
pnpm db:generate

# 데이터베이스 마이그레이션
pnpm db:push

# 초기 데이터 삽입 (선택)
pnpm db:seed

# 로컬 빌드 테스트
pnpm build

# Vercel 배포
vercel --prod
```

### 10.4 Vercel 환경 변수 설정

Vercel 대시보드 → Project Settings → Environment Variables에서 모든 환경 변수 설정

---

## 11. 테스트

### 11.1 E2E 테스트 실행

```bash
# 테스트 실행
pnpm test

# UI 모드로 실행
pnpm test:ui

# 브라우저 표시하며 실행
pnpm test:headed
```

### 11.2 테스트 커버리지

| 테스트 파일 | 대상 | 테스트 케이스 |
|-------------|------|---------------|
| home.spec.ts | 홈페이지 | 로고, 네비게이션, 상품 그리드 |
| collections.spec.ts | 컬렉션 | 상품 목록, 필터링 |
| cart.spec.ts | 장바구니 | 추가, 수량 변경, 삭제 |
| checkout.spec.ts | 결제 | 폼 검증, 결제 플로우 |
| admin.spec.ts | 관리자 | 상품 CRUD, 주문 관리 |

### 11.3 스마트 컨트랙트 테스트

```bash
cd contracts
pnpm test
```

---

## 12. 개발 완료 현황

### 12.1 완료된 기능 (100%)

| Phase | 기능 | 상태 |
|-------|------|------|
| 1 | 프로젝트 기반 구축 (Next.js, Prisma, PostgreSQL) | ✅ 완료 |
| 2 | 스마트 컨트랙트 개발 (ERC-1155, 배포 스크립트) | ✅ 완료 |
| 3 | 인증 시스템 (Privy 소셜로그인 + AA 지갑) | ✅ 완료 |
| 4 | 관리자 대시보드 (상품 등록, NFT 메타데이터) | ✅ 완료 |
| 5 | 쇼핑몰 프론트엔드 (상품 목록/상세/장바구니) | ✅ 완료 |
| 6 | 결제 시스템 (Stripe + Crypto) | ✅ 완료 |
| 7 | 테스트 및 배포 설정 (E2E, Vercel) | ✅ 완료 |
| 8 | 목업 데이터 (4 컬렉션, 16 상품) | ✅ 완료 |

### 12.2 프로덕션 배포 전 필요 작업

| 항목 | 설명 | 우선순위 |
|------|------|----------|
| API 키 발급 | Privy, Stripe, Pinata 실제 키 발급 | 필수 |
| 컨트랙트 배포 | Base Mainnet 배포 및 Basescan 검증 | 필수 |
| 실제 상품 데이터 | 실제 상품 이미지 및 정보 교체 | 필수 |
| 도메인 연결 | 커스텀 도메인 설정 | 권장 |
| SSL 인증서 | HTTPS 설정 (Vercel 자동 제공) | 자동 |

---

## 13. 향후 확장 가능 기능

| 기능 | 설명 | 예상 기간 |
|------|------|-----------|
| 마이페이지 | 주문 내역, NFT 갤러리, 프로필 관리 | 1-2주 |
| 다국어 지원 | 한국어/영어/일본어 | 1주 |
| 알림 시스템 | 이메일/푸시 알림 | 1주 |
| 위시리스트 | 관심 상품 저장 | 3일 |
| 리뷰 시스템 | 상품 리뷰 및 평점 | 1주 |
| 쿠폰/할인 | 프로모션 시스템 | 1주 |
| 실시간 채팅 | 고객 지원 채팅 | 1-2주 |
| 분석 대시보드 | 매출/방문자 통계 | 1주 |

---

## 14. 연락처

기술적 질문이나 추가 요구사항이 있으시면 연락 주시기 바랍니다.

---

**문서 종료**

*본 보고서는 FreeTenshi 프로젝트의 개발 완료 현황을 정리한 문서입니다.*
