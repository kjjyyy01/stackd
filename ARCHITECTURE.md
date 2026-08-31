# ARCHITECTURE.md — 구조

> 실제 구현 기준으로 기입 (2026-08-31, Day 14 리뷰). 구조를 바꾸면 이 문서를 같은 커밋에서 고친다 —
> **문서가 거짓말하면 없느니만 못하다**(Day 14 성숙도 체크리스트 항목).

## 고정 방침 (서비스 무관)

- Next.js App Router, `src/` 없음, import alias `@/*`
- 콘텐츠는 서버 컴포넌트 — `"use client"`는 애니메이션·인터랙션 래퍼만 (예외는 아래 §컴포넌트 계층에 명시)
- 백엔드는 **관리형만** — v1은 Supabase(Auth·Postgres·RLS) 채택(Day 3 재판정). 커스텀 서버 구축은 backlog.md 행

## 폴더 구조

```
app/                    라우트 (SCR-001~008 + OPS-001)
  page.tsx              홈 = 히어로 캐러셀 + 빌더 (SCR-001)
  card/                 카드 미리보기·저장 (SCR-003)
  card-detail/[id]/     카드 상세 (SCR-004)
  workflows/            갤러리 (SCR-006)
  me/                   내 카드 (SCR-007)
  settings/             설정·탈퇴 (SCR-008)
  privacy/ terms/       법적 문서 (SCR-005)
  admin/                신고·문의 처리 (OPS-001) — service role
  actions/              서버 액션 (mutation 단일 통로)
  auth/callback/        OAuth 콜백
  api/og/               카드 동적 OG
  opengraph-image.tsx   정적 기본 OG
  robots.ts sitemap.ts not-found.tsx layout.tsx globals.css
components/             화면 컴포넌트 (21) + ui/ (shadcn)
lib/                    도메인 로직·클라이언트 (테스트는 *.test.ts 동거)
  supabase/             server.ts(세션 클라이언트) · admin.ts(service role)
proxy.ts                전 요청 세션 갱신 (Next 16에서 middleware → proxy 개명)
supabase/schema.sql     테이블·인덱스·RLS SSOT
data/catalog.json       도구 카탈로그 (262종)
```

**문서 SSOT 분담**: `DESIGN.md`(토큰·조판) / `ANIMATION.md`(모션) / `docs/prd/`(화면·도메인 규칙) / 이 문서(구조).
`app/globals.css`는 DESIGN.md의 사본, `components/workflow-card.tsx`의 색 상수는 §카드 고정 팔레트의 사본이다.

## 컴포넌트 계층

```
app/layout.tsx
├─ SiteHeader (서버) ─ MobileNav·UserMenu (클라이언트)
├─ {page}
└─ SiteFooter (서버) ─ FeedbackDialog (클라이언트)
```

**WorkflowCard가 계층의 중심** — 560×700 고정, 서버 컴포넌트, 4개 화면(SCR-003·004·006·007)이 공용한다.
PNG·OG로 나가므로 CSS 변수를 못 쓰고 색을 상수로 들고 있다.

서버 컴포넌트 5: `workflow-card` · `site-header` · `site-footer` · `analytics` · `card-transition`
(card-transition은 `<ViewTransition>` 래퍼일 뿐이라 클라이언트 지시자가 필요 없다 — 타입만 triple-slash로 참조)

클라이언트 16 — 세 부류뿐이다:
- **모션**: hero-intro · grid-stagger · scroll-reveal · home-carousel · back-to-top
- **입력·상태**: workflow-builder · tool-picker · card-preview · draft-banner · settings-forms
- **인터랙션**: card-actions · my-card-actions · feedback-dialog · mobile-nav · user-menu · login-event

> ⚠️ **원칙의 실제 예외**: `card-preview`(SCR-003 본체)는 콘텐츠 컴포넌트인데 클라이언트다.
> localStorage 초안 복원(BR-019)과 로그인 왕복 후 자동 저장이 클라이언트 상태를 요구하기 때문 —
> 이 예외를 넓히지 않는다. 콘텐츠 화면을 새로 만들 때의 기본값은 여전히 서버 컴포넌트다.

## 상태 관리 방침

**전역 상태 라이브러리 없음.** 도입 판정 결과 = 불필요. 근거:

| 상태 종류 | 보관처 |
|---|---|
| 서버 데이터 (카드·신고) | 서버 컴포넌트가 요청마다 조회 — 클라이언트 캐시 없음 |
| 세션 | 쿠키 (`@supabase/ssr`), `proxy.ts`가 갱신 |
| 폼 입력 | 해당 컴포넌트 `useState` |
| 작성 중 초안 | `localStorage` (`lib/draft.ts`, BR-019) |

컴포넌트 간 통신이 필요한 단 한 곳(빌더 ↔ 초안 배너)은 **커스텀 이벤트**(`DRAFT_EVENT`)로 잇는다 —
이 하나 때문에 스토어를 넣지 않는다. 세 번째 소비자가 생기면 그때 재판정.

## 데이터 흐름

**읽기** — 서버 컴포넌트가 직접 조회, 액션을 거치지 않는다:

```
요청 → proxy.ts(세션 갱신) → 서버 컴포넌트 → lib/supabase/server
     → Postgres [RLS 1차] → 앱에서 명시 필터 2차 → HTML
```

**쓰기** — 서버 액션이 유일한 통로:

```
클라이언트 → app/actions/* → lib/limits 검증 → lib/supabase/server
          → Postgres [RLS] → revalidatePath → redirect
```

**admin만 예외** — `lib/supabase/admin.ts`(service role)가 RLS를 우회한다. 비공개·hidden 대상까지 봐야
판단이 되기 때문(PRD-09). 우회하는 만큼 게이트를 이중으로 건다: 페이지와 서버 액션이 **각각**
`lib/admin.ts`의 `isAdmin`을 호출하고, 미허용은 404(로그인 유도 없음).

**권한은 3중** — RLS(DB) · 명시 필터(쿼리) · 게이트(라우트). 어느 하나가 뚫려도 나머지가 막는다.
Day 14에 4종 전부 실계정으로 검증했다(BR-006·018·022·024).

**외부 경계**: GitHub OAuth(로그인) · GA4(`lib/analytics.ts`, EVT 7종) · Slack 웹훅(신고 알림, 실패해도 저장은 성공).
절대 URL은 `lib/site.ts` 단일 출처 — 프리뷰는 배포 주소, 프로덕션은 상수.
