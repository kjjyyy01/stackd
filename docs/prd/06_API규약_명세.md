---
doc_id: PRD-06
title: API 규약·명세 (06+07 통합)
version: 2.0.0
status: Draft
owner: Jongyeon
last_updated: 2026-08-17
---

# 06 API 규약·명세

> 서버 표면 = **Supabase(RLS) 읽기 + 서버 액션 쓰기 + 라우트 핸들러 2개**. REST 엔드포인트를 직접 만들지 않는다 (Next.js 서버 액션이 곧 쓰기 API). "모든 SCR ≥ API 1개"는 아래 매핑으로 충족.

## 공통 규약

| 항목 | 규약 |
|---|---|
| 인증 | Supabase Auth 세션 쿠키 (`@supabase/ssr`). 서버 액션은 `createServerClient`로 세션 사용자 확인 — 미인증이면 `ERR-AUTH-001`. 로그인 필수 페이지(`/me` `/settings`) 비인증 접근 → `/?auth=required` 리다이렉트(홈에서 CPY-COMMON-005 토스트). OAuth 실패는 `/?auth=failed` — 신호 파라미터 `auth` 값 2종으로 통일 |
| 권한 | RLS가 1차, 서버 액션의 소유자 확인이 2차 (PRD-09). service role은 **feedback·admin·탈퇴 3곳만** |
| 검증 | 모든 쓰기는 **제한 유틸(BR-007)** 로 서버 측 재검증 후 DB — 클라이언트 검증은 UX용 |
| 에러 응답 | 서버 액션 반환 `{ ok: false, code: 'ERR-…' }` — 문구는 클라이언트가 CPY로 매핑 (PRD-10) |
| 멱등성 | 생성은 클라이언트가 8자 id를 미리 받지 않음 — 서버 생성. 더블 클릭은 버튼 pending 상태로 방어 |
| 페이징 | 라이브러리·내 카드: `created_at desc`, 12개 단위 offset ("더 보기") |
| 외부 호출 | Discord 웹훅 1개(알림, 실패 무시) — AI·과금형 API 없음 (기획서 판정 ③) |

## 읽기 (서버 컴포넌트, anon 또는 세션 클라이언트)

| 화면 | 쿼리 | 비고 |
|---|---|---|
| SCR-004 | `workflows` by id — RLS "public read" (비공개·hidden은 소유자만 통과, 아니면 `notFound()`) | ERR-SHARE-001 |
| SCR-006 | `workflows` where is_public && !hidden order created_at desc limit 12 offset n | ERR-LIB-001 |
| SCR-007 | `workflows` where user_id = 세션 (RLS) | 로그인 필수 |
| SCR-001 수정 모드 | `workflows` by id — 소유자 아니면 빈 빌더 + 안내 없음 | |
| OPS-001 | `feedback` + 대상 workflows — **service role** | admin 게이트 후 |

## 쓰기 (서버 액션) — 화면↔API 매핑

| 액션 | 화면 | 입력 | 처리 | 실패 코드 |
|---|---|---|---|---|
| `saveWorkflow(draft, editId?)` | SCR-003 | 빌더 상태 | 세션 확인 → 제한 유틸 검증(BR-001~004·008·010~015) → editId 있으면 소유자 확인 후 update(+updated_at) / 없으면 id 생성(BR-023, 충돌 시 재시도 3회) insert → author_handle/avatar 스냅샷 → `{ok, id}` | ERR-AUTH-001 / ERR-CARD-001(검증) / ERR-CARD-004(DB) |
| `deleteWorkflow(id)` | SCR-004·007 | id | 소유자 확인 → delete | ERR-ME-001 |
| `togglePublic(id, is_public)` | SCR-004·007 | | 소유자 확인 → update (SCR-003은 저장 전이라 `saveWorkflow` 입력에 포함) | ERR-ME-001 |
| `submitFeedback(type, body, workflowId?)` | SCR-004·푸터 | | 길이 검증(BR-021) → **service role** insert(reporter_id = 세션 or null) → Discord 웹훅 POST(실패 무시) | ERR-FB-001 |
| `signOut()` | SCR-008·헤더 | | Supabase signOut → `/` | — |
| `deleteAccount(confirmHandle)` | SCR-008 | 확인 문구(핸들) | 세션 확인 → 핸들 서버 재대조 → **service role** `auth.admin.deleteUser(uid)` → cascade → signOut → `/` | ERR-SET-001 |
| `updateRoleDefault(role)` | SCR-008 | | BR-008 검증 → `auth.updateUser({data:{role_default}})` | ERR-SET-002 |
| `adminSetHidden(id, hidden)` / `adminResolve(feedbackId)` | OPS-001 | | admin 게이트(BR-022) → **service role** update (`adminSetHidden`은 `updated_at`도 갱신 — OG `v` 버스팅) | ERR-ADMIN-001 / ERR-ADMIN-002 |

## 라우트 핸들러

### GET `/auth/callback?code=&next=`
Supabase `exchangeCodeForSession(code)` → `next`(허용: 사이트 내부 경로만, 기본 `/`)로 리다이렉트. 저장 게이트에서 출발한 로그인은 `next=/card?save=1` — `save=1` 마커가 있을 때만 복귀 후 자동 저장(로그인 상태의 일반 `/card` 진입은 자동 저장 안 함). 실패 → `/?auth=failed` (ERR-CARD-005 토스트). 로그인 트리거는 헤더 버튼·SCR-003 저장 게이트: `signInWithOAuth({provider:'github', options:{redirectTo: origin + '/auth/callback?next=…'}})`.

### GET `/api/og?id=`
| 항목 | 내용 |
|---|---|
| 구현 | next/og `ImageResponse`. anon 클라이언트로 `workflows` 조회 → RLS상 공개·비hidden만 반환 |
| 출력 | 1200×630 PNG — 카드 렌더 (제목·@핸들·상황·단계 목록·태그·워터마크). 카드 DOM 컴포넌트와 같은 데이터·같은 레이아웃 규칙 |
| 실패 | id 없음·비공개·렌더 예외 → **정적 기본 OG 이미지** (ERR-OG-001, 5xx 금지) |
| 캐시 | `Cache-Control: public, max-age=31536000, immutable` + `generateMetadata`가 `?id=…&v={updated_at epoch}`로 버스팅 |
| 폰트 | 라틴 + 한글 서브셋 임베드 — BR-003 화이트리스트가 카드 필드 커버 보장. 제작 방식 OQ-003 |
| PNG 다운로드 재사용 | SCR-004 [PNG 다운로드] = 이 응답을 fetch → blob 저장 (OQ-008 채택 시). 미채택 시 클라이언트 라이브러리(OQ-002). **비공개·hidden 카드는 anon 조회라 기본 이미지가 나오므로 소유자에게도 PNG 버튼 비활성** — 공개 전환 후 가능 (세션 기반 OG는 v1 미지원) |

## 외부 통합 (요약 — 상세 PRD-13)
Supabase(Auth·DB) / GitHub OAuth App / Discord 웹훅 / GA4 / Vercel
