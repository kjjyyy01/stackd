# TODO.md — SCR 단위 작업 목록

> Day 3에 PRD 확정 후 SCR 단위로 채우고, 이후 매일 갱신한다.

## Day 0 잔여 (사용자)

- [x] 시작일 확정 — Day 1 = 2026-08-12(수), ~~Day 20 = 8/31(월)~~ → **Day 20 = 9/3(목) 런칭·게시**, Day 4 = 8/18(화) (8/16·17 리사이즈, PLAN §일정 매핑)
- [x] `/mattpocock-skills:setup-matt-pocock-skills` 실행 — CLAUDE.md Agent skills 블록 + docs/agents/ 3종 생성
- [x] `gh auth login` + 라벨 14종(카테고리 9 + triage 5) 등록 완료
- [x] GA4 계정 생성
- [x] GitHub repo 생성
- [x] 로컬 연결 + push (Day 0 문서 포함, 커밋 228ff5b)
- [x] Vercel 연결
- [x] Vercel 자동 배포 성공 눈으로 확인 (7683245)
- [x] 월 고정비 상한 결정 — 4만원/월
- [x] 세션 재시작 (플러그인 disable 18개 적용) — **Day 0 전체 완료** ✅
- [x] 도메인 구매·연결 — `stackd.kr` (가비아 → Vercel A/CNAME, www→apex 308, 2026-08-15) + `metadataBase` 반영

## SCR 작업 목록 (기준: `docs/prd/` v2 — **Approved 2026-08-17**)

> 2026-08-17 v2 재작성. 컷 순서(Day 11): 라이브러리 → 내 카드 수정 → 소속·역할. `/admin`은 **컷 불가**(대시보드 미사용 결정 — 신고 처리 유일 경로, 2026-08-17).

### Day 4~5 (8/18~19) — 백엔드 선배정 + 카탈로그 병행

- [x] **[본인]** Supabase 프로젝트 생성(Free) · GitHub OAuth App 등록(Client ID/Secret) · Supabase Auth Providers·URL Configuration(Site URL·Redirect: prod/preview/localhost) · Slack 앱 Incoming Webhook URL 발급 ← 8/18 U1~U6 완료. **Redirect URLs는 `**` 패턴 필수**(`http://localhost:3000/**`·`https://*.vercel.app/**`·`https://stackd.kr/**`) — 쿼리스트링 포함 glob 매칭이라 정확 URL은 `?next=`에서 실패해 Site URL로 폴백됨 *(PRD-17 환경 구성표 Local 행의 정확 경로 표기는 구식 → make-prd로 정정 필요)*
- [x] `supabase/schema.sql` — workflows·feedback·인덱스·RLS (PRD-05) → 대시보드 SQL 1회 실행 → 커밋 ← 8/18 작성 → **SQL Editor 실행 완료(사용자) → Supabase MCP로 검증(테이블 2·인덱스 2·정책 4·feedback 정책 0·advisor 이상 없음)**
- [x] `@supabase/ssr` 연결: 서버/브라우저 클라이언트·미들웨어 세션 갱신·`/auth/callback` (PRD-06) ← 8/18 코드 작성(`lib/supabase/server.ts`·`proxy.ts`(Next 16: middleware→proxy)·`app/auth/callback/route.ts`·`app/auth/actions.ts` 로그인/로그아웃 서버 액션), 브라우저 클라이언트는 쓰는 곳 생길 때. **로컬 왕복 확인 완료(8/18, chrome-devtools: 로그인→@kjjyyy01→로그아웃)** — 배포 URL 확인은 Day 5 게이트
- [ ] **[본인]** env 7종 (PRD-17) — `.env.local` + Vercel Production/Preview ← `.env.example` 작성됨(복사해서 채움, 시크릿은 채팅에 붙이지 말 것) → **8/18 `.env.local` + Vercel Production/Preview 등록 완료(사용자)**. `NEXT_PUBLIC_SITE_URL`은 양쪽 `https://stackd.kr`(로그인은 요청 호스트 사용, 코드에서 아직 미참조). `ADMIN_USER_IDS`만 U11(첫 로그인 후 uuid 복사) 대기
- [x] **[본인 눈]** 헤더 로그인/로그아웃 왕복을 **배포 URL**에서 확인 (Day 5 게이트) ← **8/18 프리뷰 URL(`stackd-git-feat-day4-supabase-…vercel.app`, 커밋 c071882 Redeploy)에서 홈·로그인·로그아웃 전부 확인(사용자 눈) — 게이트 하루 선행.** 프리뷰는 Vercel Deployment Protection(비로그인 302→SSO, 500 아님)으로 소유자만 접근. **main 머지(`ec205e7`, PR 없이 직접) 후 `stackd.kr` 프로덕션에서도 로그인 왕복 정상(사용자 확인 8/18 저녁)** — 로컬·프리뷰·프로덕션 3환경 전부 통과
- [ ] 카탈로그 수집 → `data/catalog.json` (AI agent 100~200 + 개발 스택 60~80, enum 7종) — 에이전트 작업, 병행 ← 8/18 초안 262개(agent 28·skill 46·plugin 50·mcp 55 / language 15·framework 32·tool 36, 60KB, URL 209/214 실측 200) — **[본인 눈]** 스팟체크(0번 카드가 카탈로그만으로 담기는지) 대기
- [x] 제한 유틸 1개 (BR-001·002·004·008·010~016·021 — 길이·개수·필수, 이모지 허용 — 빌더·서버 액션·OG 공용, `tdd`) ← 8/18 `lib/limits.ts` + 테스트 13건(`npm test`, node --test)
- [x] GA4 초기화 (`NEXT_PUBLIC_GA_ID`, gtag) · sonner · shadcn 재스킨 ← **8/18 세션 2 완료**(브랜치 `feat/day4-ui-base`). `DESIGN.md` 토큰 섹션 확정 → `globals.css` 토큰 구현(dark 블록 제거) → `shadcn init`(radix-nova, 라이트 단일) + button·dialog·textarea·sonner. GA4는 `components/analytics.tsx`(next/script, 측정 ID 없으면 미주입) + `lib/analytics.ts` `track()`(EVT 7종 union 타입) — **EVT-AUTH-001 `login` 발화까지 실측 확인**. **⚠️ `.env.local`의 `NEXT_PUBLIC_GA_ID`가 빈 값(`.env.example` 주석줄 그대로) — 실제 측정 ID 미입력. Vercel Production/Preview도 같은지 확인 필요** ← **[본인]**
- [ ] shadcn 나머지 4종(input·switch·badge·tabs) — 쓰는 화면 생길 때 `npx shadcn add`. 토큰이 CSS 변수라 나중에 붙여도 재스킨 자동 상속 (input=SCR-001 빌더, switch=SCR-003 공개 스위치, badge=SCR-004·007 상태, tabs=사용처 미정 → 없으면 컷)
- [x] **[본인] 테마 결정** — **라이트 단일**(8/18 사용자 결정). DESIGN.md 반영 · `globals.css`의 `prefers-color-scheme: dark` 블록·shadcn `.dark` 토큰 블록 제거 · `@custom-variant dark (&:is(.dark *))`만 남겨 shadcn 컴포넌트의 `dark:` 유틸을 무력화(이 줄을 지우면 라이트 단일이 깨짐). 다크는 backlog 행 — 토큰이 CSS 변수라 `.dark` 블록 1개로 복구 가능
- [x] 공통 레이아웃: 헤더(로고·라이브러리·로그인|내 카드·설정)·푸터(`/privacy` `/terms`·문의 dialog → `submitFeedback` + 웹훅) ← **8/18 세션 2 완료**. `site-header.tsx`(sticky, 로그인 상태별 분기, 설정·@핸들은 `sm:` 이상) · `site-footer.tsx` · `feedback-dialog.tsx`(신고·문의 공용) · `app/actions/feedback.ts`(서버 재검증 → service role insert → Slack 웹훅은 `after()`로 응답 뒤) · `lib/supabase/admin.ts`(`server-only` 가드). **실측: 실패 경로 ERR-FB-001 토스트+dialog 유지·입력 보존 / 성공 경로 DB insert 확인(feedback id 1·2, 테스트 행이라 resolved 처리) / `after()` 도입으로 액션 응답 1658ms → 294ms**
- [x] 404 페이지 (`app/not-found.tsx`, CPY-COMMON-004 + noindex) ← 위생 항목 선처리 — 푸터·내비가 아직 없는 라우트를 가리키므로 착지가 필요했음

### SCR-001 홈 `/` (PRD-SCR-001)

- [ ] 히어로 (h1 CPY-HOME-001 · 부제 CPY-HOME-008 · 예시 카드 이미지 priority)
- [ ] 빌더: 제목·상황·상황 상세 / 단계 목록(도구 카탈로그 검색·선택|직접 입력 + 메모 + 상세, 순서 이동·삭제) / 개발 스택 태그 / 소속·역할(기본값 자동)
- [ ] 초안 localStorage 저장·복원 배너 + 수정 모드 `?edit=` 로드 (BR-019)
- [ ] CTA 게이트(제목·상황·단계≥2 각 메모·상세 필수, BR-016) + EVT-BLDR-001
- [ ] 메타데이터 + 반응형 + 스크린샷·눈 확인

### SCR-003 카드 `/card` (PRD-SCR-003)

- [ ] 카드 컴포넌트 (요약: 상황 라벨·제목·@핸들/소속·WORKFLOW 단계 목록·STACK 태그·워터마크·유도 버튼) — SCR-004·라이브러리·OG 공용
- [ ] **시그니처 템플릿 1종** 시안 + 액센트 2~3 + 단계 8·태그 4 꽉 찬 검증 + **세로형 비율 확정** (OQ-006) — PNG는 클라이언트 렌더(OQ-002 라이브러리 선정)
- [ ] 공개/비공개 스위치 · 저장 버튼(로그인 게이트 → OAuth 왕복 → 자동 저장) · `saveWorkflow` 서버 액션 (id 생성 BR-023·서버 검증)
- [ ] EVT-CARD-002 `card_preview`(진입) · 저장 성공 → EVT-CARD-001 `card_create`(H-01)/003 `card_edit` → `/card-detail/{id}`
- [ ] 메타데이터(noindex) + 반응형 + 확인

### SCR-004 상세 `/card-detail/{id}` (PRD-SCR-004)

- [ ] 서버 컴포넌트 조회·404 규칙(BR-006) · 카드 + 상황 상세 + 단계별 설명 + 작성자
- [ ] `generateMetadata` 동적 title/OG + `/api/og?id=&v=` ImageResponse (폴백·캐시·한글 폰트 + 이모지 옵션 OQ-003, hidden=false 필터, 가로 별도 구성 OQ-012)
- [ ] PNG 저장(클라이언트 렌더, OQ-002) · 링크 복사 · EVT-SHARE-001(소유자, H-02)/002(타인) · CTA(utm_source=card&utm_medium=share)
- [ ] 신고 dialog(`submitFeedback` report) · 소유자 액션(수정·삭제·공개 전환) · 비공개 배지 · **hidden = 타인에게 블러 플레이스홀더 + 사유(내용 HTML 미포함)**
- [ ] 카톡/X 미리보기 육안 확인 · 비공개 타인 404 확인

### SCR-006 라이브러리 `/workflows` (PRD-SCR-006 — 컷 1순위)

- [ ] 공개·!hidden 최신순 12개 + 더 보기 · 카드 클릭 → 상세 · Empty/Error
- [ ] 메타데이터(index) + 사이트맵(공개 상세 포함) + 반응형

### SCR-007 내 카드 `/me` (PRD-SCR-007)

- [ ] 로그인 가드 · 내 목록(상태 배지) · 수정(→ `/?edit=`)·삭제·공개 전환(낙관적 갱신)

### SCR-008 설정 `/settings` (PRD-SCR-008)

- [ ] 로그인 가드 · 소속 기본값(`updateRoleDefault`) · 로그아웃 · 탈퇴(핸들 확인 → `deleteAccount` cascade)

### SCR-005 법적 `/privacy` `/terms` (PRD-SCR-005)

- [ ] 원문 2편 작성(PRD-14 PII 표 기준) + 메타데이터 (Day 4~11 내, 1시간 컷)

### OPS-001 admin `/admin` (**컷 불가** — 신고 처리 유일 경로)

- [ ] env 게이트(BR-022) · feedback 목록(미처리 필터) · hidden 토글(**사유 1~200자 필수**)·처리 완료 (service role)

### 위생 항목 (SCR 밖 — Day 4~11 내)

- [ ] ~~404~~(8/18 완료) / favicon / robots(noindex 규칙) / 정적 기본 OG / sitemap 동적
- [ ] **[본인]** 시드 워크플로우 3~5장 작성 (Day 11까지, 프로덕션에서)
