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

## SCR 작업 목록 (기준: `docs/prd/` v2 — Draft, 사용자 확정 시 Approved 전환)

> 2026-08-17 v2 재작성. 컷 순서(Day 11): 라이브러리 → 내 카드 수정 → `/admin` → 소속·역할.

### Day 4~5 (8/18~19) — 백엔드 선배정 + 카탈로그 병행

- [ ] **[본인]** Supabase 프로젝트 생성(Free) · GitHub OAuth App 등록(Client ID/Secret) · Supabase Auth Providers·URL Configuration(Site URL·Redirect: prod/preview/localhost) · Discord 웹훅 URL 발급
- [ ] `supabase/schema.sql` — workflows·feedback·인덱스·RLS (PRD-05) → 대시보드 SQL 1회 실행 → 커밋
- [ ] `@supabase/ssr` 연결: 서버/브라우저 클라이언트·미들웨어 세션 갱신·`/auth/callback` (PRD-06)
- [ ] env 7종 (PRD-17) — `.env.local` + Vercel Production/Preview
- [ ] 헤더 로그인/로그아웃 왕복을 **배포 URL**에서 확인 (Day 5 게이트)
- [ ] 카탈로그 수집 → `data/catalog.json` (AI agent 100~200 + 개발 스택 60~80, enum 7종) — 에이전트 작업, 병행
- [ ] 제한 유틸 1개 (BR-001~004·008·010~015·021, 화이트리스트 — 빌더·서버 액션·OG 공용, `tdd`)
- [ ] GA4 초기화 (`NEXT_PUBLIC_GA_ID`, gtag) · sonner · shadcn(버튼·입력·textarea·dialog·switch·badge·tabs) DESIGN 토큰 재스킨
- [ ] **테마 결정** — UI 단일(라이트/다크) vs 둘 다 → DESIGN.md / 카드 테마 비의존 / `globals.css` dark 잔재 제거
- [ ] 공통 레이아웃: 헤더(로고·라이브러리·로그인|내 카드·설정)·푸터(`/privacy` `/terms`·문의 dialog → `submitFeedback` + 웹훅)

### SCR-001 홈 `/` (PRD-SCR-001)

- [ ] 히어로 (h1 CPY-HOME-001 · 부제 CPY-HOME-008 · 예시 카드 이미지 priority)
- [ ] 빌더: 제목·상황·상황 상세 / 단계 목록(도구 카탈로그 검색·선택|직접 입력 + 메모 + 상세, 순서 이동·삭제) / 개발 스택 태그 / 소속·역할(기본값 자동)
- [ ] 초안 localStorage 저장·복원 배너 + 수정 모드 `?edit=` 로드 (BR-019)
- [ ] CTA 게이트(제목·상황·단계≥2) + EVT-BLDR-001
- [ ] 메타데이터 + 반응형 + 스크린샷·눈 확인

### SCR-003 카드 `/card` (PRD-SCR-003)

- [ ] 카드 컴포넌트 (요약: 상황 라벨·제목·@핸들/소속·WORKFLOW 단계 목록·STACK 태그·워터마크·유도 버튼) — SCR-004·라이브러리·OG 공용
- [ ] **시그니처 템플릿 1종** 시안 + 액센트 2~3 + 단계 8·태그 4 꽉 찬 검증 (OQ-006) + **비율 1200×630 = OG 재사용 결정 (OQ-008)**
- [ ] 공개/비공개 스위치 · 저장 버튼(로그인 게이트 → OAuth 왕복 → 자동 저장) · `saveWorkflow` 서버 액션 (id 생성 BR-023·서버 검증)
- [ ] EVT-CARD-001(로그인 전)·EVT-CARD-002 · 저장 성공 → `/workflows/{id}`
- [ ] 메타데이터(noindex) + 반응형 + 확인

### SCR-004 상세 `/workflows/{id}` (PRD-SCR-004)

- [ ] 서버 컴포넌트 조회·404 규칙(BR-006) · 카드 + 상황 상세 + 단계별 설명 + 작성자
- [ ] `generateMetadata` 동적 title/OG + `/api/og?id=&v=` ImageResponse (폴백·캐시·한글 폰트 OQ-003)
- [ ] PNG 저장(OG 재사용 or OQ-002) · 링크 복사 · EVT-SHARE-001 · CTA(utm_source=card&utm_medium=share)
- [ ] 신고 dialog(`submitFeedback` report) · 소유자 액션(수정·삭제·공개 전환) · 비공개/hidden 배지
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

### OPS-001 admin `/admin` (컷 3순위)

- [ ] env 게이트(BR-022) · feedback 목록(미처리 필터) · hidden 토글·처리 완료 (service role)

### 위생 항목 (SCR 밖 — Day 4~11 내)

- [ ] 404 / favicon / robots(noindex 규칙) / 정적 기본 OG / sitemap 동적
- [ ] **[본인]** 시드 워크플로우 3~5장 작성 (Day 11까지, 프로덕션에서)
