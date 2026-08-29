# 작업 기록 (history)

## 2026-08-11 — Day 0: 사전 세팅

### 작업 내용

- **무엇을**: PLAN.md Day 0 체크리스트 실행 — 플러그인 정리, 필수 문서 5종 + backlog.md 작성, Next.js 스캐폴드, Notion/Obsidian 기록 시스템 준비
- **어떻게**:
  - ecc `code-reviewer` 에이전트를 `~/.claude/agents/ecc-code-reviewer.md`로 복사 후 플러그인 18개 disable (ecc, omc, superpowers-ecc, pm-* 9종, sentry, playwright, ui-ux-pro-max, notion, obsidian, claude-md-management)
  - create-next-app으로 Next.js/TS/Tailwind/App Router 스캐폴드 + git 초기 커밋
  - CLAUDE.md(매 세션 PLAN.md 확인 규칙 포함)·DESIGN.md·ARCHITECTURE.md·ANIMATION.md·TODO.md·backlog.md 작성 — 미정 값은 "(Day 1 확정 후 기입)"으로 표시
  - Notion "개발 로그" DB 생성 (속성: 날짜/유형/태그/상태), Obsidian `dev-notes/` + TIL 템플릿 생성
- **왜**: Day 4부터 매일 배포 가능한 상태를 만들고, 오케스트레이터 단일화·스코프 방어 체계를 시작 전에 고정하기 위해 (누락 시 Day 4~9 붕괴)

### 작업 결과

- 완료: 문서 5종, backlog.md, 스캐폴드+git, 에이전트 추출, 플러그인 정리, Notion DB, Obsidian 템플릿
- 사용자 잔여: 시작일 확정, `/mattpocock-skills:setup-matt-pocock-skills` 직접 실행(모델 호출 차단), GA4 계정, GitHub push + Vercel 연결, 월 고정비 상한 결정
- 도메인 준비 메모: 추천 등록업체 Cloudflare Registrar(.com 원가 약 $10.44/년) 또는 Porkbun(약 $11/년), .kr 계열 필요 시 가비아(연 2~3만원대). 구매는 Day 1 종료 직후
- 확정값(당일 저녁): Day 1 = 2026-08-12(수) → Day 20 = 8/31(월), 런칭 게시는 9/1(화) 오전 / 월 고정비 상한 4만원 / GA4 계정·GitHub repo 생성 완료
- setup-matt-pocock-skills 완료: 이슈 트래커 = GitHub Issues(gh CLI), triage 라벨 = 캐노니컬 5종 + 카테고리 라벨 9종(labels.json) 병용, 도메인 문서 = single-context. gh CLI 신규 설치(brew) — 인증 및 라벨 등록은 잔여
- 저작권 방침: MIT 요청이었으나 목적(복제 방지)과 상충함을 확인 → **All Rights Reserved**로 결정. LICENSE 파일 + README 고지 + package.json `"license": "UNLICENSED"` 적용. 완전 차단이 필요해지면 repo private 전환이 유일한 기술적 수단

## 2026-08-12 — Day 1: 3차 만에 아이디어 확정 — **Stackd** (AI 스택 카드 생성기)

### 작업 내용

- **무엇을**: 아이디어 3개를 순차 검증(2회 폐기) 끝에 **Stackd** 확정 — Day 1 산출물 전체(언어·시장, 가설, 킬 크라이테리아, 중점 축, 유입 전략, 서비스명) + grill 통과
- **어떻게**:
  - **1차 — 구독 관리 "서빗"**: 경쟁 조사로 공석 확인, 산출물 확정, grill 통과, subit.kr까지 갔으나 **폐기** (왓섭 경쟁 부담 + 원한 방향 아님)
  - **2차 — CC 맞춤 세팅 키트**: "어디에도 없는 것 + 교육 확장" 방향 재탐색, 축까지 확정했으나 grill 중 **철회** (방향 불일치). 중간에 Day 1 기록 전체 초기화(git restore) 후 기록 보존으로 재판단·복구
  - **방법 전환이 결정타**: 후보 필터링 대신 **"미래에 살기"** — 본인이 앞서 있는 위치 3개(AI 오케스트레이션 일상화 / AI 네이티브 1인 출시 프로세스 / 기록 자동화)에서 역산 → 직감 반응이 온 A(스택 공유)·E(여정 타임라인) 조사 → E는 레드오션, A를 플랫폼이 아닌 **도구형(카드 생성기)으로 뒤집어 콜드 스타트 해소** → "만들고 싶다" + grill 통과 동시 성립
  - 도메인 후보 19개 whois 확인(스택 네임스페이스 대부분 선점 — 시장 열기의 방증), stackd.kr 확보 가능 확인
- **왜**: 2회 번복의 근본 원인은 명시된 적 없던 본인 기준 — "내 방식을 보여주고 싶다"(정체성·과시형 프로덕트 지향). 관리 도구형 아이디어는 이 기준에서 반복 탈락했고, Stackd는 그 기준을 정면으로 충족

### 작업 결과

- 확정: Stackd — 문제/타겟/가설, UI 한국어+카드 영어, 킬 크라이테리아(card_create 15% / card_share 30명 / 표본 300명), 애니메이션·비주얼 축("비주얼 vs 성능 충돌 시 성능 승"), 입소문·공유 주채널+커뮤니티 부스트. 상세: `docs/day1-decisions.md` (폐기 2건 타임라인·교훈 포함)
- 문서 반영: CLAUDE.md(서비스 정의), ANIMATION.md(모션 원칙 + 레퍼런스 ray.so·githubunwrapped.com), PLAN.md 체크리스트
- 사용자 잔여: **stackd.kr 구매 — Day 2 기획서 확정 직후로 결정** (가비아 / 검색 경량화 판정이라 지연 리스크 낮음, 단 선점 리스크는 인지)

## 2026-08-14~17 — Day 3: PRD v2 확정 (v1 → 재판정 → v2 검토·최종 점검 반영 → Approved, 3일 지연)

### 작업 내용

- **무엇을**: PRD v1(`docs/prd/`, 8/15~16) 작성·피드백 2회 반영 → **8/16 제품 재판정**(grill Q1~Q25) → 기획서 v2(`docs/day3-mvp-spec.md`) → PLAN 리사이즈 2회 → **PRD v2 23개 문서 재작성·Approved**(8/17). 부수: 도메인 stackd.kr 구매·Vercel 연결·`metadataBase`, 이름 유지 확정(Stack+car·d), PLAN 운용 원칙 4(지정 스킬 필수) 명문화
- **어떻게**:
  - v1 PRD: make-prd로 SCR 5개 + SSOT 11종 → 사용자 피드백 1차(30초 폐기·개발/AI 2축 7종·레퍼런스 정리)·2차(내 카드 수정·포크 불허·h1/부제) 반영, 정합성 스크립트(`check.py` — ID 참조·AC 4종·프론트매터) 통과
  - **재판정**: "명함/QR 대면 장면이 억지"라는 사용자 의심 → grill로 경계 확정. 결과: 카드 = **상황 + 순서 있는 워크플로우 단계**(스택 목록 아님), 만든 이유 = "도구는 아는데 어떻게 쓰는지 모른다 — 실제 개발자의 워크플로우 예시", **카드(요약)+상세 페이지**, **라이브러리 v1**, **저장부터 GitHub 로그인 + Supabase(Auth·Postgres·RLS)** — Day 2 백엔드 판정 뒤집힘. 파싱(SCR-002)·QR 컷, 명함은 카드 톤에만
  - 기획서 v2: make-plan 형식, SCR 7(001 홈·003 카드·004 상세·005 법적·006 라이브러리·007 내 카드·008 설정) + `/admin` 운영 화면, 사용자 검토 11항(GitHub만·`/workflows`(→ 최종 점검에서 상세 `/card-detail/{id}`로 재결정)·"라이브러리"·닉네임→핸들 자동·상황 짧은 입력·설정 페이지·자체 admin+Discord 웹훅(→ 최종 점검에서 Slack)·h1/부제 확정) 반영
  - PLAN 리사이즈(make-plan Step 7): 1회차 8/16 지렛대 0·2·3(구현 6→8일, 폴리싱 3→2, 게릴라+리뷰 1일), 2회차 8/17 +1일 → **런칭·게시 9/3(목) 오전, 판정 9/17**. 조정 3회째부터 전제 재검토 규칙
  - PRD v2: SSOT 15종(신설 09 권한·13 써드파티·14 보안·17 환경) 직접 갱신 → 화면 문서 8개는 서브에이전트 5개 병렬 작성(SSOT ID만 참조·신규 ID는 보고) → 요청 ID 20여 개 SSOT 추가 → 정합성 통과 → 사용자 검토 8항(단계 메모·상세 필수 / `card_create`=저장 시점·`card_share`=본인만 / 탈퇴 전부 삭제 / 이모지 허용 / 핸들 자동 / 공개=검색 노출 명시 / hidden=블러+사유) 반영 → 재검사 통과 → 최종 점검 5건(상세 라우트`/card-detail/{id}` · 제목 30자 · Slack 웹훅 · **카드 세로형** = OQ-008 해소·OQ-012 신설 · `/admin` 컷 불가 승격) 반영 → **사용자 명시 승인 → 23개 Approved(8/17 저녁)** — *(중간에 확정 없이 Approved 전환했다가 사용자 지적으로 Draft 복귀 → 최종 점검 후 명시 승인으로 전환)*
- **왜**: PRD는 구현 계약이라 사용자 의도와 정확히 맞아야 함. 재판정은 Day 1 본체(개발자·공유 루프·킬 크라이테리아 15%/30명)를 유지한 채 "카드 내용 모델"만 바꾼 것 — 도구 나열로는 "어떻게 쓰는지"가 전달되지 않는다는 문제 인식이 근거. 백엔드 도입은 갤러리(예시가 모이는 곳)가 만든 이유 그 자체가 되면서 불가피

### 작업 결과

- 완료: `docs/prd/` 23개 작성·검토 반영 (SCR 7 + OPS-001 + SSOT 15) — **status Approved(8/17)**, F-001~014(003 결번), BR-001~025, ERR 24, CPY 91, EVT 7종, OQ 잔존 6(전부 구현 중 해소)
- 킬 크라이테리어 측정 정의 재정의(Day 1 주석): `card_create` = 로그인 후 신규 저장, `card_share` = 본인 카드 공유 — 수치(15%/30명/300명)는 불변
- 일정: Day 3 8/14~17(3일 지연), Day 4 = 8/18(화) 백엔드 선배정, Day 11(8/25) 컷 판정(라이브러리→수정→소속 — admin은 컷 불가로 승격), Day 20 = 9/3(목)
- 교훈: ① 지정 스킬(make-prd/make-plan/grill) 없이 수동 편집한 반영은 미검증 — PLAN 운용 원칙 4로 고정 ② 포지셔닝 은유(명함)를 사용 장면까지 확장하면 억지 기능(QR)이 생김 ③ 스코프 확대는 grill·리사이즈 프로토콜을 거쳐야 일정이 흡수 가능한지 드러남 ④ 병렬 에이전트로 화면 문서를 쓸 때는 SSOT를 먼저 잠그고 신규 ID를 보고받는 구조가 정합성을 지킴
- EOD 기록 (8/17 완료): Obsidian TIL 5건(스킬로만 수정 / 은유는 톤까지만 / 스코프 확대=grill→리사이즈 / 병렬 에이전트 SSOT 선잠금 / 결정·폴백 분산 모순) + Notion 개발 로그 6건 등록 완료(과정요약 1 · **마일스톤 "기획 과정 회고(스코프 재판정 근거)"** 1 · 트러블슈팅 4[재판정 / 수동 편집 미검증 / Approved 선전환 / admin 폴백 모순] — `개발 로그:stackd` DB)
- **grill 원문 복구 (Day 3 Q1~Q25)**: 세션 transcript에서 4라운드 문답·선택 이유 추출 → `docs/grill-log.md` Day 3 섹션 추가. 같은 시점부터 **grill-log는 로컬 전용**(`.gitignore` + `git rm --cached`, 공개 레포에서 제외 — 과거 커밋 이력엔 Day 1~2분 잔존). transcript 타임스탬프 기준 재판정 grill은 **8/17(월) 10:56~12:39**로, 문서의 "8/16 재판정" 표기는 당시 세션의 날짜 오인식(주석은 grill-log 헤더)

## 2026-08-13 — Day 2: MVP 기획서 초안 (SCR 5개 + 범위 판정 3종)

### 작업 내용

- **무엇을**: `docs/day2-mvp-spec.md` 초안 작성 — SCR 5개(상한 7 이내), 범위 판정 3종, 키워드-화면 매핑 판정, grill 대비 스코프 방어표, backlog 이동
- **어떻게**:
  - SCR 5개: ①홈(랜딩+빌더 통합) ②붙여넣기 파싱(보조 모드, **컷 1순위**) ③카드 미리보기·커스터마이즈·공유 ④공유 카드 페이지(URL 인코딩 — 백엔드 0 유지의 핵심) ⑤분석 고지. 404·favicon·OG는 SCR 밖 위생 항목
  - 범위 판정: ①**백엔드 0 확정**(관리형 서비스도 미도입 → Day 4~9 전부 프론트) ②**콘텐츠 Day 4 하루 배정**(카탈로그 100~200개 수집 — 빌더가 이 스키마에 의존하므로 최우선 선행) ③**외부 API·AI 0 확정**(파싱은 클라이언트 정규식 → pm-ai-shipping 재소환 불필요)
  - 키워드-화면 매핑: Day 1 "검색 경량화" 판정에 따라 **해당 없음** — 기본 메타데이터로 커버
  - backlog.md에 컷 항목 6건 기재 (호스팅형 URL, 갤러리, i18n, 멀티 도구 프리셋, LLM 파싱, 카탈로그 수집 파이프라인)
- **왜**: Day 2 종료 시 기능 목록 확정이 실패 조건 1번(SCR 원칙 붕괴) 방어의 핵심 — 확산 루프(생성→공유→재진입)에 필요한 최소 화면만 남기고 전부 컷

### 작업 결과

- 완료: 기획서 초안, backlog 이동, 작업 기록
- 검토 반영 (당일): 카탈로그 수집 방식 상세화(스키마 5필드 → 소스 순회 → 에이전트 변환 → 중복=인지도 컷 → `data/catalog.json` 정적) / 시장 **국내 올인** 상향 / 닉네임 **필수**(걸림목은 공유 액션 앞) / 대표 키워드 "AI 스택 카드"·"AI stack card" 확정
- **grill 통과 → 기획서 확정** (9문답): 파싱 잔류(2형식 한정)·**next/og 동적 OG**(백엔드 판정 "DB·인증·저장소 0"으로 재정의)·URL 텍스트 인코딩·구조적 악용 방어·스택 12개 상한·/privacy Day 4~9 포함·**Claude Code 생태계 한정**
- **grill 원문 복구**: Day 1의 5개 라운드(서빗→도전장→살까말까→세팅 키트→Stackd) 문답을 세션 transcript(JSONL)에서 추출, Day 2 문답과 함께 `docs/grill-log.md`로 영구 보존 — "결정의 근거 추적" 요구 해결
- **서비스명 최종 재검증 (구매 직전)**: Showstack 검토 → [showstack.app](https://showstack.app/) 동명 소프트웨어 실존으로 기각 / 무충돌 신조어 8종 검증(vibedeck은 Claude Code용 하드웨어와 충돌 — 타겟 동일, bragkit만 완전 무충돌 생존) → **Stackd 유지 확정** (자판기 앱 충돌은 무관 분야, 카드 타이틀 `'s AI Stack` 공명 + 기검증 이점. 한국어 표기는 "스택드"로 통일)
- EOD 기록 (당일 완료): Obsidian TIL 4건(동적 OG 예외 판정 / URL 페이로드 텍스트 포함 / 서비스명 구매 직전 재검증 / 무저장 구조의 악용 방어) + Notion 개발 로그 2건 등록 완료(과정요약·트러블슈팅[grill 원문 복구] — `개발 로그:stackd` DB)
- 사용자 잔여: **stackd.kr 구매(가비아, 익일 결제 예정)**
- 다음: Day 3 — 화면 스펙 + EVT- 이벤트 트래킹 스펙 동시 확정 (GA4 이벤트 명세)

## 2026-08-18 — Day 4: 백엔드 선배정 착수 (Supabase 연결 코드·스키마·제한 유틸) — 진행 중

### 작업 내용

- **무엇을**: PLAN Day 4~5 "Supabase(Auth GitHub OAuth + Postgres + RLS) 연결까지"의 **코드 측**을 먼저 작성 — 대시보드·시크릿 작업(사용자 몫)과 병렬. 세션 시작 시 "네가 할 일 / 내가 할 일" 체크리스트(U1~U13 / C1~C12)로 역할 분리
- **어떻게**:
  - 브랜치 `feat/day4-supabase` · `@supabase/ssr`·`@supabase/supabase-js` 설치
  - `supabase/schema.sql` — PRD-05·09를 SQL로 옮김: workflows(id 16진 8자 CHECK·steps 2~8 CHECK)·feedback(type enum CHECK)·인덱스 2종·RLS 4정책(owner update는 with check로 hidden·hidden_reason 고정)·feedback은 정책 없음(service role만). 재실행 안전(if not exists / drop policy if exists)
  - `.env.example` 7종(PRD-17) + `.gitignore`에 `!.env.example` 예외 (기존 `.env*` 규칙이 예제까지 무시하던 것 발견)
  - Next 16 문서(`node_modules/next/dist/docs`) 확인 — **middleware.ts는 폐기, `proxy.ts`**로 세션 갱신(`getClaims()` 조기 호출, 리다이렉트·DB 조회 없음). context7로 `@supabase/ssr` 최신 패턴(getAll/setAll 쿠키) 대조
  - `lib/supabase/server.ts`(서버 클라이언트) · `app/auth/callback/route.ts`(`exchangeCodeForSession`, `next` 내부 경로만 허용, 실패 → `/?auth=failed`) · `app/auth/actions.ts`(**서버 액션**으로 `signInWithOAuth`+`redirect` — 클라이언트 컴포넌트 없이 로그인, origin은 요청 헤더에서 유도해 로컬/프리뷰/프로덕션 공용) · `components/site-header.tsx`(로고+로그인/로그아웃 최소판, layout에 장착). 브라우저 클라이언트는 쓰는 곳이 생길 때 추가(YAGNI)
  - `lib/limits.ts` — BR-007 공용 제한 유틸을 `/tdd`(mattpocock)로 red→green: `validateWorkflow`(BR-001·002·004·008·010~015 → PRD-10 코드·필드 반환, trim 정규화 값 반환)·`validateFeedbackBody`(BR-021)·`charCount`(Intl.Segmenter grapheme — 이모지 1자, BR-003)·`LIMITS`·`CATEGORIES` 상수. 테스트 12건 `node --test`(Node 26 네이티브 TS, 의존성 0) — `npm test`
  - 카탈로그(`data/catalog.json`) 수집은 general-purpose 에이전트에 위임(로컬 플러그인 캐시 우선 → MCP 공식 레포·awesome 리스트 → 중복=인지도 컷)
- **왜**: 사용자만 할 수 있는 작업(Supabase 프로젝트·GitHub OAuth App·Slack 웹훅·env)이 오늘의 크리티컬 패스이므로, 그 대기 시간에 키 없이 쓸 수 있는 코드를 전부 끝내 Day 5 게이트(배포 URL 로그인 왕복)까지의 경로를 짧게 만든다. 시크릿은 채팅에 노출되지 않도록 `.env.example`만 다룸

### 작업 결과

- 검증: `tsc` 통과 · `eslint` 0건 · `next build` 통과(env 없이도 빌드됨 — 전 라우트 동적 렌더, 헤더 `cookies()` 때문 → LCP 예산 걸리면 Suspense/cacheComponents 분리, ponytail 주석) · `npm test` 12/12
- 카탈로그 초안: `data/catalog.json` 262개(AI 생태계 179 + 개발 스택 83, 60KB) — 로컬 플러그인 캐시 실데이터 + MCP 공식 레포·awesome 리스트, source URL 214개 중 209개 curl 200 확인(5개는 봇 차단이나 자명한 도메인). 유틸 테스트에 카탈로그 정합성(enum·길이·id 유일) 가드 1건 추가(13/13)
- **로컬 로그인 왕복 확인 완료 (8/18 오후, C7)**: 사용자 U1~U6(Supabase 프로젝트·GitHub OAuth App·Provider·URL Configuration·Slack 웹훅·`.env.local`) 완료 후 chrome-devtools로 `localhost:3000` → "GitHub로 로그인" → GitHub 승인(사용자) → `GET /auth/callback?code=…&next=/` 307 → 헤더 `@kjjyyy01` → 로그아웃 → 버튼 복귀. 에러·`auth=failed` 0
- **트러블슈팅 — Supabase Redirect URL 폴백**: 첫 시도에서 GitHub 인증 성공 후 `localhost:3000/auth/callback`이 아니라 **Site URL(`stackd.kr/?code=…`)로 튕김**. 원인: GoTrue의 허용 목록 검사는 **쿼리스트링을 포함한 전체 redirect_to를 glob 매칭** — 정확 URL `http://localhost:3000/auth/callback`은 `?next=%2F`가 붙은 실제 값과 불일치 → 허용 실패 → Site URL 폴백(프로덕션은 Site URL 호스트 일치 예외로 안 걸려 로컬·프리뷰만 재현). 해결: Redirect URLs를 `http://localhost:3000/**` · `https://*.vercel.app/**` · `https://stackd.kr/**`로 교체 → 즉시 통과. 폴백된 code는 콜백 미배포 상태라 소모되지 않았고 PKCE verifier가 localhost 쿠키에만 있어 무해
- **schema.sql 실행 완료 (8/18 오후, U7)**: Supabase MCP 플러그인을 사용자가 `/plugin`으로 연결 → 제가 `apply_migration`(원격 DDL) 시도했으나 **자동 모드 권한 분류기에 차단** → 우회하지 않고 사용자에게 선택지 제시(권한 규칙 추가 vs SQL Editor) → 사용자 선택으로 **SQL Editor에서 직접 실행**(PRD-17 문구 그대로). 이후 MCP 읽기 도구로 검증: 테이블 2(RLS on)·CHECK·FK·기본값·인덱스 2·정책 4(with check hidden 고정 확인)·feedback 정책 0·security advisor 이상 없음(feedback "정책 없음" INFO는 의도된 설계). 권한 규칙은 설명만(`permissions.ask`에 `mcp__plugin_supabase_supabase__apply_migration` 권장, `.claude/settings.local.json`) — 미적용
- **커밋·push (8/18 저녁, 사용자 지시)**: `c071882 feat: Day 4 백엔드 선배정 — Supabase 연결·schema.sql·제한 유틸·카탈로그` (18 files, +2507) → `origin/feat/day4-supabase`. 커밋 전 점검: `.env.local` gitignore 확인·`.env.example` 값 비어 있음·신규 코드 console.log/TODO 0·시크릿 접두사 그렙(`sb_secret_`·`sb_publishable_`·`hooks.slack.com`·`.supabase.co`) 매치는 PRD 문서·카탈로그 출처 URL뿐
- **배포 URL 로그인 왕복 확인 완료 — Day 5 게이트 하루 선행 (8/18 저녁, U8·U10)**: push → Vercel 프리뷰 자동 빌드 성공(env 없이도 빌드됨 — 전 라우트 동적 렌더라 `createServerClient`가 요청 시에만 실행, 즉 **빌드 성공 ≠ 런타임 성공**) → 사용자가 Vercel env 7종 Production/Preview 등록(`NEXT_PUBLIC_SITE_URL` 양쪽 `https://stackd.kr` — 로그인 리다이렉트는 `x-forwarded-host`로 요청 호스트를 쓰므로 프리뷰마다 값 바꿀 필요 없음) → Redeploy → 프리뷰 URL에서 홈 렌더·"GitHub로 로그인"·`@kjjyyy01`·로그아웃 전부 정상(사용자 눈). 부수 확인: 프리뷰는 Vercel Deployment Protection으로 비로그인 접근 시 `302 → vercel.com/sso-api`(500 아님, 소유자만 열람) — 브라우저에 SSO 쿠키가 있어 OAuth 왕복엔 영향 없음. Redirect URLs `https://*.vercel.app/**` 패턴·콜백의 `x-forwarded-host` 처리가 실제 Vercel 프록시 뒤에서 검증됨
- **main 머지·프로덕션 확인 (8/18 저녁, 사용자 지시)**: 기록 커밋 `315f414` 후 사용자 결정으로 **PR 없이** `--no-ff` 머지 `ec205e7` → `origin/main` → Vercel 프로덕션 빌드 success → `https://stackd.kr/` 200(1.26초), 서버 HTML에 "GitHub로 로그인" 렌더(Production env 주입 정상) → **사용자 브라우저에서 로그인 왕복 정상 확인**. 로컬·프리뷰·프로덕션 3환경 전부 통과 — 프로덕션은 GoTrue Site URL 호스트 예외 경로라 별도 확인이 필요했음. 로컬은 `main` 체크아웃(세션 2는 여기서 새 브랜치), `feat/day4-supabase`는 삭제하지 않음
- 미검증: `ADMIN_USER_IDS`(U11) · PRD-17 Local 행 Redirect 표기 정정(make-prd)
- **결정 — Drizzle 미도입 유지 (8/18 오후, 사용자 확정)**: "Drizzle을 도입한다면?" 검토 → v1은 계획(순수 SQL + `@supabase/ssr`)대로. 근거: ① supabase-js는 PostgREST가 JWT로 `auth.uid()`를 채워 RLS가 자동이지만 Drizzle은 Postgres 직접 접속이라 매 쿼리를 `set_config('request.jwt.claims')`+`set local role` 트랜잭션 래퍼로 감싸야 하고 한 번 빼먹으면 조용히 IDOR — PRD-09 "RLS 1차 방어" 설계와 충돌 ② `DATABASE_URL`(RLS 우회 가능한 시크릿) 추가 → PRD-17 SSOT 수정(make-prd) ③ Vercel 서버리스 × 직접 접속은 Supavisor 트랜잭션 풀러·`prepare:false` 함정 ④ 테이블 2·쿼리 ~8개에 ORM은 YAGNI, 백엔드 2일 예산 반나절 잠식 ⑤ Auth는 어차피 supabase-js라 의존성 "대체"가 아니라 "추가". 얻는 것(타입)은 `supabase gen types`로 대체 가능. **재검토 발동 조건(v2)**: 테이블 ≥4·조인 발생 / Supabase 이탈 결정 / 로컬 DB+통합 테스트 도입 — 전환 시 `drizzle-kit introspect`로 schema.sql을 그대로 뽑을 수 있어 지금 SQL로 가도 매몰비용 낮음
- **EOD TIL 후보(Day 4)**: ① ORM 도입 판단 기준 = 타입이 아니라 "누가 auth.uid()를 채우느냐"(RLS 자동성) ② Next 16 middleware→proxy 리네임 + `getClaims()` 조기 호출 패턴 ③ 시크릿 경계로 사람/에이전트 역할 분리(U/C 체크리스트) ④ Node 26 네이티브 TS로 테스트 러너 0 의존 ⑤ RLS 자기참조 서브셀렉트가 재귀 에러를 피하는 조건 ⑥ Supabase Redirect URL은 쿼리스트링 포함 glob 매칭(트러블슈팅) ⑦ 동적 렌더 앱은 env 누락이 빌드가 아니라 런타임에서 터진다 — 배포 "성공" 표시만 믿지 말고 URL을 열어볼 것 / Vercel 프리뷰 보호 302는 장애가 아님
- 잔여(Claude, 세션 2): C9 카탈로그 검수 · C10 GA4·sonner·shadcn + 공통 레이아웃 내비·푸터(선행: DESIGN.md 토큰 기입·테마 결정) / (사용자) U9 테마 결정 · U11 ADMIN_USER_IDS · EOD 기록 세션

## Day 4 세션 2 — 디자인 토큰·GA4·shadcn 재스킨·공통 레이아웃 (2026-08-18 저녁, 브랜치 `feat/day4-ui-base`)

**무엇을 / 어떻게 / 왜**

- **미커밋 문서 처리 (사용자 선택)**: main에 남아 있던 TODO·history 변경(Day 4 마무리 4줄)을 새 브랜치 `feat/day4-ui-base`로 가져와 단독 커밋 `f5e772f`. Git 전략(main 직커밋은 핫픽스만)과 직전 패턴(`315f414`) 정합
- **테마 결정 = 라이트 단일 (사용자)**: 3주 일정에서 화면 검증이 2배가 되는 걸 막는 게 이유. `globals.css`의 `prefers-color-scheme: dark` 잔재와 shadcn이 깔아준 `.dark` 토큰 블록을 제거하되 **`@custom-variant dark (&:is(.dark *))` 한 줄은 남겼다** — `.dark` 조상이 영원히 없으므로 shadcn 컴포넌트 곳곳의 `dark:` 유틸이 전부 무력화된다. 이 줄을 지우면 `dark:`가 `prefers-color-scheme`로 되살아나 라이트 단일이 깨진다(Tailwind v4 기본 동작). 다크 복구 비용은 `.dark` 블록 1개
- **DESIGN.md 토큰 확정** (`(Day 1 확정 후 기입)` 플레이스홀더 5개 → 실값): 컨테이너 단일화(`max-w-5xl` + `container-page` 유틸) · 정렬 축(좌측 고정, 본문·헤딩 중앙 정렬 금지, 예외 3곳) · 스페이싱(4px 배수만) · radius 단일(`0.5rem`) · 타이포(IBM Plex Sans KR + IBM Plex Mono) · 컬러(oklch). **컬러는 눈대중이 아니라 oklch→sRGB→WCAG 대비비를 스크립트로 실측해서 골랐다** — `--input`은 3:1(1.4.11)을 넘기려고 `L=0.64`까지 어둡게, `--primary`는 흰 글씨 4.5:1을 넘기려고 `L=0.52`. 전 토큰 AA 통과 수치를 문서에 박아뒀다
- **폰트 = IBM Plex Sans KR + IBM Plex Mono**: 한국 devtool 기본값(Pretendard)을 의도적으로 피함. 트레이드오프도 기록 — Google Fonts가 한글을 `unicode-range` 슬라이스 ~94개로 쪼개 주는데 `next/font`는 이름 있는 subset(`latin`)만 preload하므로 **한글은 preload되지 않는다**. `display:swap` + `adjustFontFallback`로 CLS는 막고 LCP는 오히려 유리하지만 짧은 FOUT은 남는다(없애려면 Pretendard 자체 호스팅 — v1은 안 함)
- **shadcn init + 4개만**: `shadcn init -d -b radix`(신버전은 `-b`가 baseColor가 아니라 radix/base/aria) → button·dialog·textarea·sonner. **나머지 4종(input·switch·badge·tabs)은 일부러 안 깔았다** — 쓰는 화면이 없어 speculative scaffolding이고, 토큰이 CSS 변수라 나중에 `npx shadcn add` 해도 재스킨이 자동 상속된다. `sonner.tsx`는 `next-themes` 의존을 걷어내고 `theme="light"` 고정
- **GA4**: `@next/third-parties` 대신 `next/script` 직접(TODO 문구가 "gtag", 의존성 0). `components/analytics.tsx`는 **측정 ID가 없으면 아무것도 심지 않는다**(로컬·프리뷰 오염 방지). `lib/analytics.ts`의 `track()`은 EVT 7종 union 타입 + `window.gtag?.()` — PRD-15 "발화 실패는 침묵"이 optional chaining으로 공짜
- **EVT-AUTH-001 `login` 배선**: 트리거(`/auth/callback`)가 이미 존재하는 유일한 이벤트라 지금 붙였다. 콜백이 `?login=github`을 붙이고 → `login-event.tsx`가 1회 발화 후 `history.replaceState`로 파라미터를 지운다. 나머지 6종은 각자 화면에서
- **공통 레이아웃**: `site-header.tsx`(sticky, 로고/라이브러리/로그인 or 내 카드·설정·@핸들·로그아웃, 설정·@핸들은 `sm:` 이상에서만 노출해 390px에서도 한 줄) · `site-footer.tsx`(`/privacy` `/terms` + 문의 dialog) · `feedback-dialog.tsx`(신고·문의 공용 — 푸터는 `contact`, SCR-004는 `report`) · `app/actions/feedback.ts` · `lib/supabase/admin.ts`
- **404**(`app/not-found.tsx`): 위생 항목이지만 지금 했다 — 푸터·내비가 아직 없는 라우트(`/privacy` `/terms` `/workflows` `/me` `/settings`)를 가리키므로 착지점이 필요했다

**작업 결과 (실측 검증)**

- `npm run lint` 0 · `npx tsc --noEmit` 0 · `npm test` 13/13 · `npm run build` 성공
- **문의 dialog 실패 경로**: 공백만 입력 → 서버 액션 0ms 조기 반환(DB 미접근) → ERR-FB-001 토스트 + **dialog 유지 + 입력 보존**(PRD-10 그대로). `<form action>` 대신 `onSubmit`을 쓴 이유가 이것 — React 19의 form action은 완료 시 폼을 리셋해 실패 때 사용자 글이 날아간다
- **문의 dialog 성공 경로**: Supabase `feedback` 테이블 insert 확인(id 1·2, `type=contact`·`reporter_id=null` 익명). 테스트 행이라 `resolved=true` 처리 — **삭제는 사용자 판단으로 남겨둠**
- **`after()` 도입으로 액션 응답 1658ms → 294ms**: Slack 웹훅(3초 타임아웃)을 `await`하면 사용자가 왕복을 그대로 기다린다. `next/server`의 `after()`로 응답 뒤로 미룸. "웹훅 실패는 저장 성공에 영향 없음"(BR-021)이 지연에도 적용돼야 한다는 해석
- **GA4 실측**: `.env.local`에 값이 없어 미주입 → 임시 ID로 dev 재기동해 검증 → `gtag('event','login',{method:'github'})` 1회 발화 + URL에서 `?login=github` 제거까지 확인
- **시각 확인**(chrome-devtools 390px·1280px + 스크린샷): 비로그인/로그인 헤더 양쪽, 푸터, dialog, 토스트, 404. 정렬 축(로고·h1·푸터 좌측 x좌표 일치) 통과
- **고친 것 3건**: ① **`word-break: keep-all` 누락** — 한글 h1이 "어떻 / 게"로 어절 한가운데서 잘렸다. 한글 웹 조판의 필수 규칙이라 `body`에 전역 + DESIGN.md 규칙으로 승격 ② **한글에 mono 적용** — 홈 eyebrow를 mono로 썼더니 IBM Plex Mono에 한글 글리프가 없어 대체 폰트로 떨어지고 자간이 어긋났다. eyebrow 자체를 삭제(헤드라인만으로 충분) + "mono는 영문 기계 식별자에만" 규칙 명문화 ③ 터치 타깃 — shadcn radix-nova 기본 버튼이 28px이라 `size="lg"`(36px)로, 본문 CTA는 44px로

**⚠️ 사용자 확인 필요 (블로킹 아님)**

- **`.env.local`의 `NEXT_PUBLIC_GA_ID`가 빈 값**이다. `.env.example`의 `NEXT_PUBLIC_GA_ID=                    # GA4 측정 ID (G-XXXXXXXXXX)` 줄을 그대로 복사해 값이 안 채워진 상태 — dotenv가 인라인 주석을 떼고 트림하면 빈 문자열. 같은 형태의 `ADMIN_USER_IDS`도 빈 값(U11로 이미 추적 중). **Vercel Production/Preview에도 같은 누락이 있는지 확인 필요** — 이대로면 프로덕션에서 GA4가 한 건도 안 잡히고, 그건 판정일(9/17) 킬 크라이테리아를 통째로 못 재는 사고다
- 배포 URL 확인은 이 브랜치를 push해 Vercel 프리뷰가 뜬 뒤

**GA4 설정 후속 (8/18 밤, 사용자 작업 + 검증)**

- **측정 ID 확보·주입**: `.env.local`의 `NEXT_PUBLIC_GA_ID`가 빈 값이던 원인 확인 — `.env.example`의 `KEY=   # 설명` 형태를 그대로 복사한 탓에 dotenv가 주석을 떼고 트림하면 빈 문자열이 된다. GA4 콘솔(관리 → 데이터 수집 및 수정 → 데이터 스트림 → 웹 스트림 → 측정 ID)에서 `G-G7ZEH4FLWE` 확보 → `.env.local` + Vercel Production/Preview 등록(사용자). **`curl`로 로컬 HTML에 `gtag/js?id=G-G7ZEH4FLWE`·`gtag('config',…)` 주입 실측** — curl은 JS를 실행하지 않아 태그 존재만 확인하고 GA 히트는 발생시키지 않는다(데이터 오염 없는 검증법)
- **`NEXT_PUBLIC_`은 빌드 타임 인라인**(Next 공식 문서: *"your app will no longer respond to changes to these environment variables … frozen with the value evaluated at build time"*) → **Vercel 대시보드에 값만 넣고 Redeploy를 안 하면 아무 일도 일어나지 않는다.** 로컬도 `npm run dev` 재시작 필요
- **GA 태그 "설치" 설정은 불필요**: GA4 콘솔이 안내하는 "직접 설치" 스니펫이 곧 `components/analytics.tsx`의 코드와 동일. GTM도 불필요(이벤트 7종 고정, 코드에서 직접 발화 → 중간 레이어 이득 없음)
- **내부 트래픽 제외 — PRD·TODO 어디에도 없던 항목을 이 세션에서 식별**: TODO의 "시드 워크플로우 3~5장 작성(프로덕션에서)"을 그대로 하면 본인 `card_create`가 GA에 잡히는데, H-01 = `card_create` 발생 총 사용자 ÷ 전체 총 사용자라 **분자·분모 양쪽이 오염**된다. 필터는 소급 적용이 안 되므로 시드 작성 전에 걸어야 한다. 경로(공식 문서 확인): ① 관리 → 데이터 수집 및 수정 → 데이터 스트림 → 웹 스트림 → 태그 설정 구성 → **더보기**(접혀 있음) → 내부 트래픽 정의 → IP `211.177.28.77` ② 관리 → 데이터 수집 및 수정 → 데이터 필터 → 필터 만들기 → 내부 트래픽 → 제외 → 상태 **활성**. **1단계만 하면 아무것도 안 걸러진다**(정의와 필터가 분리된 구조 — 가장 많이 놓치는 지점). 상태값은 테스트/활성/비활성 3종("사용"은 없음). 8/18 활성화 완료(사용자)
- **`ADMIN_USER_IDS`(U11) 해소**: Supabase `auth.users` 조회로 `e6caf467-b3de-4ea3-8d19-806c63c84ea7`(@kjjyyy01) 확보 — 대시보드를 열 필요 없이 MCP로 뽑았다. `.env.local`·Vercel 입력만 남음
- **프리뷰 확인(사용자 눈, 8/18 밤)**: `feat/day4-ui-base` 프리뷰에서 문의 dialog 정상 개폐 · 로그인/로그아웃 정상. 프로덕션 `stackd.kr`에 GA 스크립트가 없는 것은 env 문제가 아니라 **프로덕션 배포 커밋이 아직 `ec205e7`(GA 코드 미포함)이기 때문** — 설정 문제와 배포 문제를 구분하지 않으면 콘솔을 헛되이 뒤지게 된다

**교훈(EOD 후보 추가)**: ⑧ 한글 웹 조판은 라틴과 다른 규칙이 최소 3개(`word-break: keep-all`, 행간 1.75, 본문 자간 0) — 영어권 디자인 시스템을 그대로 가져오면 h1부터 깨진다 ⑨ 대비비는 눈이 아니라 계산으로 — oklch L값 0.02 차이가 WCAG 통과/탈락을 가른다 ⑩ `.env.example`에 인라인 주석을 쓰면 "채웠다고 착각한 빈 값"이 생긴다(값 없는 키는 주석을 윗줄로) ⑪ 서버 액션에서 외부 웹훅은 `after()`로 — `await`하면 그 지연이 그대로 사용자 대기 시간 ⑫ 애널리틱스는 심는 것보다 **본인 트래픽을 빼는 것**이 먼저 — 필터는 소급 적용이 안 되고, 전환율 지표는 본인이 분자·분모 양쪽에 들어간다 ⑬ "프로덕션에 안 보인다"를 만나면 설정을 의심하기 전에 **그 코드가 거기 배포돼 있는지**부터 확인


---

## 2026-08-19 — 일정 조정 3회차: AI Summit 참가에 따른 리스케줄 (런칭 9/3 → 9/8)

### 작업 내용

- **무엇을**: `docs/PLAN.md` §일정 매핑 표 전면 재작성 + 조정 이력 3회차 + 전제 재검토 3문항 기록, `CLAUDE.md`·`TODO.md`의 날짜 참조 동기화. 런칭일 **9/3(목) → 9/8(화)**, 판정일 **9/17 → 9/22(화)**, 버퍼 **0 → 4일**
- **어떻게**: make-plan 스킬 Step 7(기존 PLAN 재조정)로 진입. 누적 조정이 3회째라 프로토콜이 요구하는 **전제 재검토 3문항을 조정 전에 먼저 처리**했고, 압축 지렛대는 하나도 쓰지 않았다(스코프·폴리싱·리뷰 전부 불변). 서밋 일정은 웹 검색으로 실측 확인(8/19~21, 코엑스) 후 사용자에게 참가일을 확인받아 **8/19~20 이틀**로 확정
- **왜**: 외부 일정 충돌은 지렛대(스코프 컷)의 사유가 아니라 달력의 사유다. 버퍼 0·지렛대 0·2·3 소진 상태에서 런칭일을 사수하면 남은 수단이 **지렛대 4(화면 삭제)뿐**인데, Day 11 실측 컷 판정 장치가 아직 살아 있는 시점에 화면을 미리 자르는 건 정보가 가장 적을 때 가장 비싼 결정을 내리는 것

### 작업 결과

- **순손실은 이틀이 아니라 하루**로 정정: Day 4~5(2일 배정) 물량을 8/18 하루에 완주해 8/19분은 이미 선행 상쇄돼 있었다. 참가일이 8/19~20이므로 **8/21(금)은 가용일** → 달력은 +1일만 밀고, 런칭을 화~목 규칙에 맞춰 9/8(화)로 배치
- **여유 4일을 전액 버퍼로 회수** (배정 금지). 위치는 Day 17(기술 점검) 종료 후 ~ Day 18(런칭 포스트) 시작 전 = **9/2(수)~9/5(토)** — 앞 구간 어디서 지연이 나도 여기서 흡수되고 런칭 준비·런칭일은 고정된다. 점검에서 나온 결함을 고칠 시간이 바로 뒤에 붙는 자리이기도 하다
- 버퍼 소진 순서 고정: ① 구현-기능 지연 → ② Day 17 결함 수정 → ③ 폴리싱 원복(지렛대 2 되돌리기) → ④ QA 심화
- 전제 재검토 3문항 판정: ① 스코프 유지(실측 속도가 계획을 앞섬) ② 킬 크라이테리아 조기 발동 없음(제품 신호가 아닌 캘린더 충돌) ③ 구조 변경 2건 — Day 0 "시작일 역산"에 **외부 고정 일정 선스캔**이 없었던 것이 근본 원인, 그리고 **버퍼 0 상태가 조정 반복의 진짜 원인**이었으므로 이번 4일이 소진되면 다음 지연은 연기가 아니라 지렛대 4로만 처리
- 새 주요 날짜: Day 6 = 8/21(금) 착수 / Day 7 체크포인트 = 8/22(토) / Day 11 컷 판정 = 8/26(수) / 게릴라 테스트 = 8/29(토), 사전 섭외 마감 8/27(목) / Day 17 = 9/1(화) / Day 19 최종 배포 = 9/7(월) / **Day 20 런칭 = 9/8(화)** / 판정일 = 9/22(화)

---

## 2026-08-20 — 일정 조정 4회차: 서밋 참가 하루 축소에 따른 회복 (버퍼 4→5일, 런칭일 불변)

### 작업 내용

- **무엇을**: AI Summit 참가가 **8/19 하루**로 축소돼 8/20(목)이 가용일로 회복. `docs/PLAN.md` 매핑표에서 Day 6~17을 하루씩 앞당기고, 런칭 구간(Day 18~21·판정일)은 고정한 채 남는 1일을 **버퍼로 증액**(4→5일). `CLAUDE.md`·`TODO.md` 동기화
- **어떻게**: make-plan Step 7 + 확장 프로토콜. 늘어난 1일의 배분 우선순위는 QA 심화 → 폴리싱 심화 → **버퍼 증액** → SCR 추가인데, 앞의 두 개는 Day 11 실측 전에 배정하면 되돌리기 어려우므로 **버퍼로 넣고 소진 순서표(① 지연 → ② Day 17 결함 → ③ 폴리싱 원복 → ④ QA 심화)에 판단을 위임**했다
- **왜**: 런칭일을 하루 당기면 9/7(월)이 되어 "런칭은 화~목" 역산 규칙을 깬다. 뒤를 고정하고 앞을 당기면 규칙을 지키면서 여유만 늘어난다 — 버퍼 0이 조정 반복의 원인이었다는 3회차 진단과도 정합

### 작업 결과

- **순손실 0일**: Day 4~5(2일 배정)를 8/18 하루에 완주해 8/19 서밋분은 이미 선행 상쇄돼 있었다. 결과적으로 Day 6~17 배치가 **조정 2회차 원안과 동일**해지고, 뒤에 버퍼 5일이 붙은 형태가 됐다
- 런칭 **9/8(화)**·판정일 **9/22(화)** 불변 → PRD·기획서(`docs/prd/`, `day3-mvp-spec.md`)는 수정 대상 아님. 제품 정의·킬 크라이테리아 수치 전부 불변
- 새 날짜: Day 6 = **8/20(목)** 착수 / Day 7 체크포인트 8/21(금) / Day 11 컷 판정 8/25(화) / 게릴라 섭외 마감 8/26(수) / 게릴라 테스트 8/28(금) / Day 17 = 8/31(월) / **버퍼 9/1(화)~9/5(토) 5일**
- 조정 4회차이나 **연기가 아닌 회복 방향**이라 3회차에 못박은 "4회째 연기는 없다" 조항과 충돌하지 않음을 PLAN 이력에 명시

---

## 2026-08-20 — 지정 스킬 호출 규칙을 변경 규모 3등급으로 세분화

### 작업 내용

- **무엇을**: `docs/PLAN.md` 운용 원칙 4번을 "작성·수정 전건 스킬 필수" → **변경 규모 3등급 판정**으로 개정. `CLAUDE.md` 상단 규칙 줄과 개인 메모리(`plan-skills-mandatory`) 동기화
- **어떻게**: 등급 기준 — ① 단순 수정(UX 문구·에러 메시지·단일 값) = 스킬 없이 대상 파일 직접 편집 ② 중간 수정(AC 추가·검증 규칙 변경) = 해당 파일만 로드해 ID 형식·제약 준수만 확인, 템플릿 대조·전체 정합성 검사 생략 ③ 구조 변경(화면 추가·삭제, 데이터 모델, API 계약, 스코프) = 풀 스킬 + 정합성 검사 필수
- **왜**: 스킬의 실효는 ID 체계·SSOT 참조 정합성 관리인데, 문구 한 줄에도 풀 코스를 돌면 비용만 크고 검증할 정합성이 없다. 정합성이 실제로 흔들리는 변경에만 풀 스킬을 배정

### 작업 결과

- 2026-08-15 조항(전건 필수)은 폐기가 아니라 **구조 변경 등급으로 승계** — 스킬 없이 구조를 고치면 미검증으로 간주하고 재검증하는 조항은 그대로 유지
- 규칙 SSOT는 PLAN.md 운용 원칙 4번, `CLAUDE.md`는 요약 1줄

---

## 2026-08-20 — Day 5 카탈로그 스팟체크 판정 + PRD v2.1.0 델타(직접 입력 상시 개방)

### 작업 내용

- **무엇을**: Day 5 잔여였던 카탈로그 스팟체크를 판정하고(본인: "카탈로그 단독으로는 못 담음 → 직접 입력으로 흡수"), 그 판정을 PRD에 반영. 단계 도구·개발 스택 태그 **양쪽 모두 검색 + 직접 입력을 상시 제공**하도록 명세 변경
- **어떻게**: `make-prd`로 델타 3건 — ①`EL-HOME-011` 도구 직접 입력 진입점을 "검색 0건" 조건 → **상시 노출** ②`EL-HOME-012` 스택 태그에 직접 입력 경로 신설(`BR-002`·`ERR-BLDR-002` 확장, `CPY-HOME-031` 신설, 폼검증표 3행 분리, 엣지 케이스 #10 중복 판정) ③`PRD-17` Redirect URL을 `**` glob으로 정정(8/18 실측 사유 포함). 부수로 결번 `ERR-BLDR-007` 참조와 `BR-003` 재정의로 폐기된 "허용 외 문자" 잔재 제거. `spec-common.md` §8 정합성 검사를 스크립트로 실행(정의 338 / 참조 165, 미정의 0)
- **왜**: 카탈로그를 아무리 채워도 개인 스킬·신규 도구는 구조적으로 미수록이 된다. 기존 명세는 탈출구(직접 입력)를 "검색 0건"에만 걸어둬서, 부분 일치 결과가 뜨면 사용자가 자기 도구를 담을 수 없었다 — 스팟체크가 정확히 이 구멍을 드러냈다

### 작업 결과

- **저장 스키마 변경 0** — `steps[].tool`·`dev_stack[]`이 카탈로그 `id`가 아니라 `{name, category}` 스냅샷을 저장하는 설계라 흡수 비용이 없었다. 이 사실을 `PRD-05 §카탈로그`에 "입력 보조 레이어"로 명문화
- **서버 검증 작업 0** — `lib/limits.ts`가 이미 `dev_stack[].name`을 `BR-002`·`ERR-BLDR-002`로 검증 중이었다. 코드가 PRD보다 앞서 있었고 이번 델타로 문서가 따라잡은 형태. Day 6은 빌더 UI만 붙이면 됨
- 카탈로그 1차 보강 262 → **266개** (Radix UI·sonner·ESLint·Google Analytics — 이 저장소 실제 스택 대조로 검출). 2차 보강은 스팟체크 누락 목록 확보 후
- `status`는 `Approved` 유지 (`00 공통규약` — 수정은 make-prd로, 이력은 git 로그)
- **Git 규칙 보강**: main에서 편집을 시작한 위반이 나와 `CLAUDE.md` §Git 전략에 "첫 파일을 건드리기 전에 브랜치부터" 조항 추가. 기존 "main 직커밋은 핫픽스만"은 커밋 시점 규칙이라 편집 시작을 막지 못했다

---

## 2026-08-20 — 카탈로그 2차 보강 종결 (268개 확정) + 수집 기준 명문화

### 작업 내용

- **무엇을**: 스팟체크 판정에 이은 카탈로그 2차 보강. 결과는 **2건 추가 후 종결** — `ecc`·`superpowers-ecc`(공개 저장소 확인된 플러그인) → 266 → **268개**
- **어떻게**: 이 머신의 설치 구성(`~/.claude/plugins` 활성 12·비활성 8, MCP 1, 개인 skills 13)을 카탈로그와 대조. 활성 플러그인 12/12·MCP 1/1 전부 수록 확인, `pm-toolkit` 미수록은 마켓플레이스 단위(`pm-skills`) 수록으로 인한 입도 차이였음
- **왜**: 개인 skills 폴더 12개가 미수록으로 잡혔으나, **추가하지 않기로 판정**. ① 로컬 전용이라 다른 사용자가 선택 불가 ② `PRD-SCR-001 §13`상 카탈로그 JSON은 빌더 클라이언트 번들에 포함 — LCP 2.5초 예산 화면에 1인용 항목의 바이트를 전원에게 청구 ③ GA4 내부 트래픽 제외 필터(8/18) 때문에 본인의 `method=manual`은 집계에도 안 잡혀 검증 수단이 없음

### 작업 결과

- **수집 기준 명문화: 공개 배포 + 출처 URL 확인 가능.** 현 구성은 AI 계열 181개(공개 GitHub 90곳 — claude-plugins-official 25·superpowers 13·MCP servers 13·mattpocock/skills 11 등) + 개발 스택 87개(각 프로젝트 공식 사이트)
- 개인 스킬·미공개 도구는 **설계상 직접 입력이 정답** — 8/20 판정(직접 입력 상시 개방)이 이미 담당하는 영역
- 갱신 방식은 v1 유지: 런타임 fetch 없이 **수집은 커밋으로, 조회는 정적 import로** (외부 API 미도입 — Day 2 범위 판정). 신선도 손실은 직접 입력이 흡수하고, `method=manual` 비율이 갱신 시점 신호가 된다
- Day 5 잔여 항목 전부 종료 → Day 6(SCR-001 홈) 착수 가능

---

## 2026-08-20 — Day 0 잔여 유령 항목 정리 (PLAN.md 체크박스 동기화)

### 작업 내용

- **무엇을**: `docs/PLAN.md` Day 0 구역(77~93행)과 진행 체크리스트 306행이 전부 미체크로 남아 있던 문제. 실제로는 8/12에 완료된 항목들이었고, **새로 수행한 작업은 0건 — 전부 검증 후 체크박스만 동기화**
- **어떻게**: 항목별로 근거를 직접 확인 — 문서 5종·`backlog.md`·`docs/agents/` 3종은 파일 존재로, 플러그인 정리(ecc·omc·superpowers-ecc·pm-*·sentry·playwright)는 세션 스킬 목록 부재로, Notion `개발 로그:stackd` DB는 워크스페이스 검색으로, Obsidian `dev-notes/`는 TIL 노트 10건 이상 축적으로 확인
- **왜**: Day 5 종료 확인 중 "Day 0 잔여"가 미완료로 잡혔는데, `TODO.md`는 같은 항목을 "Day 0 전체 완료 ✅"로 기록하고 있었다. **같은 사실을 두 문서가 따로 들고 있어 한쪽만 갱신된 것** — 실체 없는 잔여가 5일간 살아남았다

### 작업 결과

- Day 0 항목 12건 중 11건 체크 완료, 롤업 항목(306행)에 검증 근거·일자 주석 추가
- **82행(`notion`·`obsidian` 구현 세션 off)은 의도적으로 미체크 유지** — 1회성 산출물이 아니라 세션마다 재적용되는 상시 운용 규칙이라, 체크를 찍으면 다음 세션에서 켜져 있어도 눈에 띄지 않는다. 실제로 이번 세션에 Notion MCP가 켜진 채 구현 브랜치에 있었고 사용자가 즉시 비활성화
- **교훈: 체크리스트에 성격이 다른 두 종류를 섞지 말 것** — 1회성 산출물(체크 후 영구 완료)과 상시 운용 규칙(매 세션 재확인)은 표기를 구분해야 한다

---

## 2026-08-20 — Day 4~5 EOD 기록 (Obsidian TIL 21건 + Notion 개발 로그 3건)

### 작업 내용

- **무엇을**: 8/18(Day 4~5)분이 미실시로 밀려 있던 EOD를 8/20 Day 5 잔여 종결분과 함께 소진. **코드 변경 0건 — 기록 전용 세션**. Day 6(SCR-001 홈)은 브랜치 생성·순환 의존 식별까지만 한 착수 단계라 **EOD 대상 아님 — 구현 종료 후 별도 기록**
- **어떻게**: `claude plugin enable`로 notion·obsidian 활성화 → **`/reload-plugins`로 세션 재시작 없이 MCP 연결**(8/13 TIL에 남겨둔 정정 사항이 이번에 길을 뚫었다). 분배는 PLAN.md §248 규칙대로 — "다음 프로젝트에서도 쓸 지식"은 Obsidian, "이 프로젝트에서 무슨 일이 있었나"는 Notion
- **왜**: 구현 세션과 기록 세션을 분리 운용(PLAN.md 82행)하느라 세션 간 전달을 메모리 파일(`day4-eod-candidates`·`day6-eod-context-harness`)로 해왔고, 그 큐를 비웠다

### 작업 결과

- **Obsidian `dev-notes/` 26 → 47건** — 신규 21건(8/18분 16 + 8/20분 5) + 기존 1건 보강. 위키링크 6개·구조(날짜/태그/4섹션) 전수 검사 통과
  - 백엔드 6: ORM 판단축=RLS 자동성 · RLS 자기참조 별칭 서브셀렉트 · Redirect URL glob · Next 16 `proxy` · Node 26 테스트 0의존 · 시크릿=사람/에이전트 경계
  - 배포 4: 빌드 성공 ≠ 동작 · "안 보인다"는 배포 커밋부터 · `.env.example` 인라인 주석 · 애널리틱스는 내부 트래픽 제외가 먼저
  - UI 6: 한글 조판 3규칙 · 대비비는 계산으로 · Tailwind v4 `dark` 무력화 · 웹훅은 `after()` · React 19 form 리셋 · 한글 폰트 preload 불가
  - 프로세스 5: 문서 규칙 vs 훅 · SSOT 선언 없으면 갈라진다 · 체크리스트 1회성/상시 분리 · 1인용 데이터를 전원 번들에 청구 금지 · 탈출구 조건부 개방 금지
- **Notion `개발 로그:stackd` 3건** — 트러블슈팅 1(Redirect URL 폴백, 8/18) + 과정요약 2(Day 4~5 8/18 · Day 5 잔여 종결 8/20). 전부 `상태=완료`
- **중복은 새 노트 대신 병합** — 8/20 판정의 "스냅샷 저장 덕에 스키마 변경 0"은 기존 `TIL-공유-URL-페이로드는-id-참조가-아니라-텍스트-포함`과 같은 주장이라 사례로 덧붙였다(vault 규칙: 노트 하나에 주장 하나)
- 메모리 파일 2건 삭제 + `MEMORY.md` 인덱스 갱신 — **소비 후 삭제되는 큐**로 설계된 파일이라 남겨두면 오늘 정리한 "유령 항목" 문제가 메모리 계층에서 재발한다
- **PLAN.md 307행(매일 EOD 블록)은 체크하지 않았다** — 오늘 명문화한 규칙(1회성 산출물 vs 상시 운용 규칙)의 첫 적용 사례

### 부수 확인

- Notion `태그` 속성이 `gsap`·`성능`·`기획`·`배포` 4종뿐이라 Day 4~5의 **인증·백엔드 축을 담을 값이 없다**. 임의 추가는 스키마가 조용히 번지므로 보류 — 필요 시 `백엔드`·`인증` 2종 추가 검토

---

## 2026-08-22 — 버퍼 소진 2: 미착수 2일(8/21~22) 흡수 — Day 6 착수 8/23으로 이동 (런칭일 불변)

### 작업 내용

- **무엇을**: 8/21(금)·8/22(토) 이틀이 Day 6 물량 **산출물 0건**(전 브랜치 커밋 0·stash 없음·app/components 신규 파일 없음)으로 지나가, 사용자 판정으로 Day 6~17을 이틀씩 평행 이동하고 남는 2일을 버퍼에서 차감(4→2일, 누적 3일). 런칭 9/8·판정일 9/22 **불변**
- **어떻게**: 버퍼 소진 순서 ①(구현-기능 지연 흡수) 정상 발동 — 조정 회차 아님, "4회째 연기 없음" 조항과 무관. PLAN.md 21곳(조정 이력·매핑표·Day별 날짜) + TODO.md 2곳 + CLAUDE.md 1곳 동기화. 8/21~22 구간은 매핑표에 별도 행(8/19 선례 형식). **게이트 7건을 Google Calendar에 등록**(`[stackd]` 접두사: Day 7 체크포인트 8/24 · Day 11 컷 판정 8/28 · Day 12 섭외 8/29 · Day 14 테스트 8/31 · Day 17 점검 9/3 · Day 20 런칭 9/8 · 판정일 9/22, 판정 기준을 설명란에)
- **왜**: 문서 속 날짜는 문서를 안 열면 울리지 않는다 — "지연"이 아니라 "미착수"가 버퍼를 깎았으므로, 날짜 규칙을 읽는 컨텍스트에서 **알림이 오는 하네스**로 승격. Day 14 게릴라 테스트가 토→월(8/31)로 재이동해 평일 오전 섭외 가능 여부 재확인 필요

### 작업 결과

- 커밋 `d88f2d5`. 잔량 2일(9/4~9/5) — **다음 지연은 지렛대 1 또는 4(화면 삭제)만 남음**

---

## 2026-08-23 — Day 6: 공용 카드 컴포넌트(OQ-006·010 판정) + 0번 카드·히어로 이미지 + SCR-001 홈 정적 완성

### 작업 내용

- **무엇을**: 8/20 판정(카드 선행)대로 **카드 컴포넌트 → OQ 판정 → 0번 카드 콘텐츠 → 히어로 이미지 → SCR-001 나머지** 순서로 진행, SCR-001 홈을 **정적 완성(본인 눈 확인 포함)**. 약 3시간(20:20~23:25), 커밋 6건
- **어떻게**:
  - `components/workflow-card.tsx`(EL-CARD-002~008) — 시그니처 단계 레일(좌측 세로선 + mono 번호), 테마 비의존 고정 팔레트. 검증 픽스처(`lib/hero-card.ts`)는 `validateWorkflow`를 실제 통과하는 값
  - **OQ-006·OQ-010 실측 판정(사용자 C안)**: 상한 픽스처(제목 30·단계 8·메모 60·태그 4) 560px에서 전문 노출 시 자연 높이 830px → 4:5가 130px·3:4가 83px 넘침, 메모 `line-clamp-1`하면 698px로 4:5(700) 수렴. 유동 폭은 320px에서 333px 넘쳐 불가 → 화면 축소는 `scale()`. 두 OQ는 하나의 트레이드오프("비율 × 상세 암시")라 후보 3개로 한 번에 판정. 확정치는 `DESIGN.md §카드 조판`이 소유, 코드 상수 `CARD_W/CARD_H`는 사본 주석
  - **하단 유도 문구 충돌 → PRD v2.2.0 델타(make-prd, 구조 변경 등급)**: "단계별 설명 보기 →"가 조판 안에 있어 PNG에 찍힘 — `EL-CARD-009`(DOM 전용·PNG 제외)·`EL-WF-001`(SCR-004 숨김) 동시 위반. sequential-thinking으로 대안 4개 → 분리안만 전 제약 만족, 사용자는 워터마크 줄 반대편 문구 1개로 합치는 안 선택(요소 2→1, PNG 속 화살표를 알고 감수). `EL-CARD-009`를 조판 안 정적 문구로 재정의, 수정 7문서(SCR-003·004·006·11·21·08·DESIGN, status Approved 유지). 정합성 9항목 — **검사가 잡은 3건**: 미정의 ID `EL-CARD-015` 참조 / 치수 값 복제 / `TC-CARD-005-01`이 이름과 다른 걸 검증해 **P0 REQ-CARD-005가 처음부터 미검증** → TC 3건 신설. 버린 대안 3건은 `21_미해결질문.md` OQ-010 행
  - **정합성 검사 6 재수행(커밋 후 사용자 지시)**: 첫 보고 "✅"는 수정 전 검사였다 — 560×700이 SCR-003 3곳, 4:5가 3문서, 클램프 서술 3문서 잔존. 소유권 재정의(치수·비율·표시 규칙=DESIGN.md / 입력 상한=PRD-08 BR-013 / 화면 문서=배치·조건만) → 계약 문서 디자인 값 0건. 커밋 `3a43ad4`에 누락 사실 명기
  - **0번 카드 v3** `lib/hero-card.ts` — WORKFLOW를 기술 스택이 아닌 **agent 계층 8단계**(superpowers → make-prd → sequential-thinking → ponytail → chrome-devtools → commit-push → claude-mem → Notion·Obsidian)로. Claude Code는 환경이라 단계가 아니라 제목에. 개인 스킬 commit-push는 카탈로그 밖 → 직접 입력 + 상세에 "직접 만든 것·감싸는 것·대체 경로" 명시. 7번 메모 61자 → "남긴다→둔다"로 60자(사용자)
  - **히어로 이미지** `public/hero-card.png` 1120×1400(2x)·235KB — 임시 `/hero-shot` 라우트에 카드만 원점 고정, chrome-devtools 560×700·DPR 2 캡처(첫 캡처의 `<nextjs-portal>` 배지는 숨김 후 재캡처) → 라우트 삭제. 접근성 트리 점검에서 `article` aria-label 추가
  - **SCR-001 홈** `app/page.tsx` — h1(CPY-HOME-001)·부제·`next/image priority`(Next 16은 `fetchpriority` 대신 `<link rel=preload as=image imagesrcset>` head 주입 — 서버 HTML 실측), 모바일 1열/`md`+ 2열, title 절대형·canonical·OG(같은 PNG 1120×1400). 서버에서 `getClaims()` → `role_default`를 빌더 기본값으로(없으면 빈 값, REQ-HOME-004 AC-3)
  - **빌더** `components/workflow-builder.tsx`(상태 1곳, `"use client"` 1개) + `components/tool-picker.tsx`(단계 7종·스택 3종 공용, 카탈로그 268 검색 + **직접 입력 상시 노출**, 중복 차단) — 제목·상황·상세 카운터(상한 초과 입력 차단 + CPY-HOME-012), 단계 추가/순서/삭제, 스택 태그 4개 상한, 소속 기본값, CTA 게이트 = `validateWorkflow` 재사용(서버 재검증과 같은 함수, BR-016), 모바일 sticky CTA, EVT-BLDR-001 `method=catalog|manual`
  - **초안** `lib/draft.ts`(TDD — `lib/draft.test.ts` 8건 red→green, `npm test` 21/21) — `stackd:draft` v2 가드, 손상·구버전 조용히 폐기, 예외 삼킴. 마운트 후 `useEffect` 1회 읽기(`useState` 초기화로 읽으면 hydration mismatch) — React 19 `react-hooks/set-state-in-effect` 린트는 사유 주석과 함께 그 한 줄만 비활성화
  - shadcn `input`·`switch` 추가 · 트러블슈팅: `localhost:3000`이 **scored** 프로젝트 서버였던 것 + 3001 동시 기동 `EADDRINUSE` → 메모리 규칙 "dev 서버는 사용자 소유(3001), 에이전트는 `curl -sf` 확인만" · chrome-devtools MCP 잔존 Chrome 8개 정리
- **왜**: 카드는 4화면 공용 최다 재사용 부품이고 히어로 LCP 후보라 플레이스홀더로 재면 예산 판정이 무효 — 그래서 홈보다 카드를 먼저. OQ 판정은 취향이 아니라 **상한 픽스처 실측**으로 해야 "비율 성립 조건"(클램프)이 드러난다. 정합성 검사 재수행·버린 대안 기록은 같은 논의가 3주 안에 반복되는 것을 막기 위함

### 작업 결과

- `tsc`·lint 클린, `npm test` 21/21, 390(1열 + 하단 sticky CTA 44px)·1440(2열) 스크린샷 가로 오버플로 0, **[본인 눈] 확인 완료 → SCR-001 정적 완성 ✅**(잔여: 수정 모드 `?edit=` — SCR-003 저장 이후)
- 브라우저 실측 통과: 카탈로그 선택·직접 입력(`step_add method=manual` 발화)·순서 이동·CTA 게이트(빈 단계에만 CPY-HOME-030)·스택 중복 차단·4개 상한·새로고침 → 배너 → "이어서 쓰기" 전 필드 복원
- 커밋 6: `af277a7`(카드+판정+델타) · `3a43ad4`(SSOT 재수행) · `43ee835`(0번 카드 v3+이미지) · `57355fc`(히어로) · `513b3fc`(빌더) · `52bb302`(눈 확인) — `origin/feat/day6-scr001-home`
- 프로젝트 메모리 2건: `plan-skills-mandatory` 보강(판단은 구현 안에 묻힌다 — 측정 끝 = 판단 지점, 버린 대안 기록) / `dev-server-ownership` 신설
- **잔여**: 액센트 스와치 2~3종(**[본인] 팔레트 미정**) · SCR-003 저장·로그인 게이트·`saveWorkflow` · 프리뷰 URL 확인(매일 배포 규칙 — 오늘 미실시) · **Day 7(8/24) 중간 체크포인트: SCR 완료율 vs 경과율**(정적 완성 1/8 + 공용 카드 부품)

---

## 2026-08-23 — Day 6 EOD 기록 (Obsidian TIL 8건 신규 + 2건 병합 · Notion 개발 로그 10건)

### 작업 내용

- **무엇을**: Day 6 EOD — 범위는 **8/20 착수 단계(Day 4~5 EOD에서 제외분) + 8/22 일정 이동 + 8/23 Day 6 구현**. 코드 변경 0건, 기록 전용 세션
- **어떻게**: `claude plugin enable notion·obsidian` → claude-mem 타임라인(8/23 관찰 154건)에서 TIL·트러블슈팅 후보 추출 → vault 기존 60건과 주제 중복 grep(포트·hydration·localStorage·preload·클램프·정합성 검사 등) 후 분배. 분배 기준은 PLAN.md §기록 시스템 — 다음 프로젝트에서도 쓸 지식은 Obsidian, 이 프로젝트의 사건은 Notion. **Notion은 원격 OAuth MCP라 `/reload-plugins` + 브라우저 승인 전까지 연결 불가** → scored 선례대로 원고를 vault `_notion-원고-stackd-Day6.md`로 먼저 백업 → 사용자 `/reload-plugins` → `authenticate`로 OAuth URL 발급 → 사용자 승인 → **같은 세션에서 `notion-create-pages` 1회 호출로 10건 일괄 등록**(8/20 `/reload-plugins`만으로 됐던 것과 달리 이번엔 인증 플로우가 한 번 더 필요했다 — 인증 만료 추정)
- **왜**: history.md에 8/22·8/23 항목이 없었다(오늘 커밋 6건은 TODO.md만 갱신) — EOD에서 작업 기록(무엇을/어떻게/왜/결과) 3항목을 함께 보충. 트러블슈팅은 당일 기록 원칙(하루 지나면 원인·해결 디테일이 증발)

### 작업 결과

- **Obsidian `dev-notes/` 60 → 68건** — 신규 8 + 기존 2 병합, 구조(날짜/태그/4섹션)·위키링크 전수 검사 통과(깨진 링크 0)
  - 프론트엔드 4: 고정 비율 카드는 최대 적재를 실측해 클램프로 수렴시킨다 · 한 요소가 정보 신호와 행동 유도를 겸하면 노출 규칙이 충돌한다 · 브라우저 저장소 복원은 마운트 후 effect에서 한 번만 읽는다 · 히어로 이미지는 2x 원본 1장이면 next/image가 srcset과 preload를 만든다
  - 도구 2: 컴포넌트를 이미지 에셋으로 구울 땐 임시 라우트와 스크린샷이 가장 싸다 · 사람과 에이전트가 같은 dev 서버를 띄우면 충돌한다, 소유권을 한쪽에 둔다
  - 프로세스 2: 정합성 검사는 수정 뒤에 다시 돌려야 통과다 · 구현 과제 안에 묻힌 판단은 측정이 끝나는 지점에서 드러난다
  - **병합 2**(vault 규칙: 노트 하나에 주장 하나): `문서를-만든-스킬로만-고쳐야…`에 8/20 변경 규모 3등급 + 8/23 적용 사례 보강 / `문서에만-있는-규칙은-지켜지지-않는다…`에 8/22 캘린더 게이트 승격 사례 추가
- **Notion `개발 로그:stackd` 20 → 30건** — 과정요약 3(8/20 착수·순환 의존 판정 / 8/22 버퍼 소진 2 / 8/23 Day 6) + 트러블슈팅 7(3000=scored·3001 충돌 / 유도 문구 스펙 충돌 / 검사 6 재수행 / 61자 메모 / dev 배지 캡처 / set-state-in-effect / Chrome 잔존 8개). 기존 페이지 형식(문제/원인/해결/소요·후속/재사용 지식, `[Stackd]` 접두 제목) 준수, 전부 `상태=완료`. 원고 백업은 `~/obsidian/resume/dev-notes/_notion-원고-stackd-Day6.md`(등록 후에도 유지)
- `CLAUDE.md` 프로젝트 트리 3줄 갱신(workflow-card·workflow-builder·tool-picker / draft·hero-card / hero-card.png) — 오늘 커밋들이 TODO.md만 건드려 트리가 뒤처져 있었다
- PLAN.md 310행(매일 EOD 블록)은 상시 운용 규칙이라 체크하지 않음(8/20 규칙 유지). TODO.md는 오늘 구현 세션에서 이미 최신 — 변경 없음

### 부수 확인

- Notion `태그` 4종(gsap·성능·기획·배포)에 **UI/프론트엔드 축이 없어** 트러블슈팅 2건(set-state-in-effect·Chrome 잔존)은 태그 없이 등록, 나머지는 가장 가까운 값(성능·배포·기획). 8/20의 '백엔드·인증' 보류와 같은 이유로 임의 추가하지 않음 — 누적 필요 시 `프론트엔드`까지 3종 한 번에 검토
- 구현 세션에 `notion`·`obsidian` 플러그인을 켜둔 채로 넘어가지 않도록 **EOD 종료 시 두 플러그인 disable**(PLAN.md 85행 상시 규칙 — 8/20 위반 선례) — 이번 세션 종료 시 `claude plugin disable`로 처리

---

## 2026-08-24 — Day 7: 홈 히어로 방향 탐색 → 풀뷰포트 캐러셀 시안 동결 (아티팩트 SSOT) + Day 8 이식 결정

### 작업 내용

- **무엇을**: 홈(SCR-001) 히어로 폴리시 작업을 코드에서 시작했다가 방향 탐색 단계임을 인지하고 **아티팩트 HTML 시안으로 전환**, 저녁까지 십수 회 반복해 시안을 동결. **Day 8(8/25) 이식을 사용자 확정**. 프로젝트 코드 커밋 0건(의도적 — 시안 단계)
- **어떻게**:
  - 브랜치 `feat/day7-hero-polish` 생성 후 `app/page.tsx`에 A안(히어로 CTA "바로 만들기" 앵커)·B안(3단계 스트립) 직접 추가 → 이후 시안에 흡수돼 **미커밋 보류**(Day 8 새 브랜치 생성 때 처리 방향 확인 — `day8-hero-carousel-port` 메모리 절차 1)
  - 컨셉 목업(헤드라인·배경 후보) → 아티팩트 게시(블리드 히어로·풀와이드 캐러셀 방향 확정) → 반복: 캐러셀 최상단 히어로화(슬라이드 1 = h1+부제+CTA+카톡 공유 장면 DOM, 2 = 무질서→순서, 3 = 길다vs한 장) / 확대 2라운드(h1 데스크톱 4.5rem, 카드 축소율 0.38/0.52) / **3단계 스트립 제거**(과정 레일과 정보 중복) / **마무리 CTA 제거 + "맨 위로" FAB**(목적지가 바로 위 빌더라 U턴 무의미, FAB는 1뷰포트 스크롤 후 표시·캐러셀 화살표와 같은 중립 어휘) / 최종 순서 = 캐러셀 → 블리드 카드 쇼케이스 → 과정 레일 → 빌더 → 푸터
  - **시안 동결 → PRD 대조**: 15개 요소 중 시안 부재는 초안 복원 배너(EL-HOME-004) 1개, 실질 스펙 변경은 EL-HOME-003(정적 priority 이미지 → 라이브 카드 재사용) 1건. **미결 6건은 make-prd 안건으로 이관**(LCP 재판정 / 서버·클라 경계 / 배너 위치 / GA4 캐러셀 이벤트 / FAB 범위 / 스와이프 힌트) — 시안 미디어쿼리(640/768/1024)는 Tailwind sm/md/lg와 일치 확인
  - 결정 2건: **빌더 v1 홈 내장 유지**(`/new` 분리는 판정일 후 데이터로 재검토) / **Day 8 이식 = 구조 변경 등급**(make-prd 풀 스킬 + 정합성 검사, 정적만 — GSAP 금지 구간이라 캐러셀은 CSS scroll-snap, 카드 마크업 `workflow-card.tsx` 재사용, 카톡 장면 DOM 재현)
  - backlog 3건(도구 링크 3단): 자동 링크(카탈로그 URL 조인 — Day 11 컷 판정 때 SCR-004 AC 흡수 검토) / 직접 첨부(런칭 후) / "에이전트용으로 복사"(판정일 후 1순위 실험)
  - 핸드오프: 메모리 `day8-hero-carousel-port` — 시안 SSOT는 **아티팩트 URL**(로컬 스크래치패드 파일은 세션과 함께 증발할 수 있어 승격), 이식 절차 4단계 + 미결 6건 수록
- **왜**: 레이아웃 탐색을 코드에서 하면 반복마다 커밋·컴포넌트 경계·PRD 정합성 비용이 붙는다 — 단일 HTML 시안에서 돌리고 확정본만 이식. 동결 시점에 PRD와 대조해 미결을 안건 목록으로 넘겨야 반복이 실제로 끝난다

### 작업 결과

- 시안 동결 · Day 8 아침 이식 시작 확정. 코드 변경: 커밋 0, 미커밋 2파일(`backlog.md`는 EOD 커밋 / `app/page.tsx` +19줄 보류)
- **Day 7 중간 체크포인트(게이트일)**: PLAN 재확인 — 버퍼 잔량 2일(9/4~9/5)·Day 11(8/28) 컷 게이트 활성·Day 12(8/29) 테스터 섭외 데드라인. SCR-003 저장 플로우 미착수 상태에서 이식에 Day 8 하루를 쓰면 기준선(18.3%) 미달 위험 — **사용자 인지 하에 이식 우선 결정**

---

## 2026-08-24 — Day 7 EOD 기록 (Obsidian TIL 4건 신규 · Notion 원고 3건 스테이징)

### 작업 내용

- **무엇을**: Day 7 EOD — 범위는 8/24 하루(시안 전용 날). 코드 변경 0건, 기록 전용
- **어떻게**: claude-mem 타임라인에서 후보 추출 → vault 기존 68건과 주제 중복 grep(CTA·FAB·아티팩트·시안·스크래치패드) 후 분배. Notion은 원격 OAuth MCP라 Day 6 선례대로 원고를 `_notion-원고-stackd-Day7.md`로 먼저 스테이징 → `/reload-plugins` + 브라우저 승인 후 같은 세션 등록
- **왜**: 트러블슈팅 당일 기록 원칙. Day 7은 구현이 없어 트러블슈팅 0건 — 대신 설계 판단(결정 로그)이 기록 대상

### 작업 결과

- **Obsidian `dev-notes/` 68 → 72건** — 신규 4, 전부 시안 동결 점검에서 나온 설계 판단 지식
  - 디자인 2: 마무리 CTA는 목적지가 바로 위면 U턴이다 · 같은 정보를 두 시각 어휘로 반복하면 한쪽은 군더더기다
  - 프로세스 2: 시안 반복은 코드 밖에서 돌리고 확정만 이식한다 · 세션 산출물은 URL로 승격해야 다음 세션에 살아남는다
- **Notion 원고 스테이징**: 진행 요약 1(Day 7 시안 동결) + 결정 로그 3(D7-01 CTA 제거·FAB / D7-02 빌더 홈 내장 유지 / D7-03 Day 8 이식·리스크 인지) — 등록은 OAuth 승인 후
- `backlog.md` 커밋(도구 링크 3단 — 8/24 세션 산출). `app/page.tsx` A안·B안 +19줄은 **미커밋 유지** — Day 8 브랜치 생성 시 처리 방향을 사용자와 확인(메모리 절차 1)
- PLAN.md 316행 Day 7 체크포인트 항목은 **미체크 유지** — 공식 판정(완료율 vs 경과율 실측)이 Day 8 아침 기준선으로 이월됐고, status 전환은 사용자 명시 지시 때만
- EOD 종료 시 notion 플러그인 disable(PLAN.md 85행 상시 규칙)

---

## 2026-08-25 — Day 8: 홈 캐러셀 이식 — PRD v3.0.0(미결 6건 판정) + 정적 구현 + 반응형 실측 조정

### 작업 내용

- **무엇을**: Day 7 동결 시안(아티팩트 SSOT)을 SCR-001 홈에 이식. make-prd 풀 스킬로 PRD 구조 수정 → 정적 구현 → 브레이크포인트별 실측 조정(사용자 실기기 피드백 반영)
- **어떻게**:
  - 브랜치: 미커밋 A/B안 +19줄 **폐기**(사용자 판정 — 캐러셀 설계가 두 요소를 흡수·제거 확정) → `feat/day8-hero-carousel` 생성
  - **make-prd 풀 스킬**: `SCR-001_홈.md` **v3.0.0**(EL-HOME-016~024 신설, EL-HOME-003 재정의 — 정적 이미지→라이브 카드 4곳 서버 렌더, REQ-HOME-008 캐러셀·009 FAB 신설, TC 4건) / 카피사전 v2.3.0(CPY-HOME-032~057 신규 26건, 029 결번) / 미해결질문 v2.3.0(**OQ-013** 스와이프 발견성 — Day 14 게릴라 관찰) / **DESIGN.md §홈 캐러셀 조판 신설**(치수 SSOT — 8/23 판례대로 화면 문서의 값 복제 제거). 정합성 검사 9항목 통과
  - **미결 6건 판정(사용자 확정)**: ①LCP 후보 = 슬라이드 1 h1(이미지 없음, `hero-card.png`는 OG 전용 잔존) ②`"use client"` 3곳만(캐러셀 컨트롤·FAB·빌더 — 슬라이드 콘텐츠는 서버 children) ③초안 배너 헤더 아래 전역(이어서 쓰기 = `#builder` 스크롤+복원) ④GA4 슬라이드 이벤트 추가 안 함(EVT 7종 동결) ⑤FAB 홈 전용 ⑥스와이프 힌트 미채택 + Day 14 검증
  - **구현**: 신규 3 — `home-carousel.tsx`(scroll-snap 셸, IntersectionObserver 카운터) · `draft-banner.tsx`(CustomEvent 1종으로 빌더와 연결 — 형제 클라 컴포넌트라 localStorage+이벤트가 최소 결합) · `back-to-top.tsx` / 수정 3 — `app/page.tsx` 전면(캐러셀 3장 서버 렌더·카톡 장면 DOM 재현·쇼케이스 블리드·과정 레일·빌더 헤딩) · `workflow-builder.tsx`(배너 분리, pending을 ref로) · `globals.css`(`--chat-bg`·`--chat-me` 토큰, `scroll-behavior: smooth` — 부드러운 이동은 전부 네이티브, GSAP 금지 구간 준수)
  - **반응형 실측 3회전(390·768·1440, 사용자 피드백 병행)**: 모바일 슬라이드 1을 한 화면에 수렴(카톡 카드 0.26·여백/타이포 압축) / 태블릿 md 2열 진입 시 타이포 한 단계 축소(h1 어절별 줄바꿈 해소) / 캐러셀 화살표 md+→**xl+**(lg 이하 본문 겹침 실측) / viz 화살표(→)는 wrap 구간에서 자체 줄+90° 회전(↓) / **쇼케이스 모바일 블리드 제거**(0.58 중앙 — "카드 잘림" 피드백 해소, 블리드는 sm+) / CTA 게이트 시각 비활성(`button.tsx` base에 `aria-disabled:opacity-50` — 진짜 disabled 대신 클릭 시 부족 항목 안내가 살아있는 패턴)
  - **가로 오버플로(390→504px) 근본 해결**: `transform: scale`은 페인트만 축소하고 레이아웃 560px이 그리드 최소폭을 민다 → 축소 슬롯 `overflow-hidden` + 과정 레일 트랙 `minmax(0,1fr)` + 공유 줄 `overflow-hidden`(truncate URL의 intrinsic 기여 차단) — 390=390 정확 일치
- **왜**: 시안 동결 → PRD 판정 → 구현 순서를 지켜야 이식 중 스코프가 흔들리지 않는다. 시안은 데스크톱 기준이라 모바일·태블릿 결함은 실측으로만 드러난다 — 스크린샷+실기기 이중 확인 루프가 3개 결함(잘림·줄바꿈·겹침)을 잡았다

### 작업 결과

- `npm run build` ✓ / `lint` 0건 / `test` 21/21. 정적 렌더 검사(TC-HOME-008-02) 통과 — 슬라이드 2·3 텍스트가 서버 HTML에 존재(JS 없이 스와이프 탐색 가능)
- 스크린샷 검증: 390(슬라이드 1 한 화면·카운터 노출·오버플로 0) / 768(h1 2줄·화살표 숨김·↓ 흐름) / 1440(시안 일치·화살표 여백 안착). 사용자 실기기 확인: 캐러셀·쇼케이스·과정 레일·배너 위치 OK, 지적 2건(반응형·CTA 비활성) 반영 완료
- **눈 확인 라운드 2 (사용자 지적 2건 반영)**: ①문의·피드백 모달 입력창 협소 — shadcn Textarea가 `field-sizing-content + min-h-16`이라 `rows` 무시(64px 렌더) → 호출부 `min-h-40`(160px) 명시 ②태블릿 쇼케이스 카드 잘림 — md 2열 열 폭 336px에 카드 0.85×560=476px(30% 잘림) → **md도 블리드 없이 0.58 수렴**. 두 건 모두 768·390 재실측 통과, build·lint 재검증 ✓
- **눈 확인 라운드 3**: ①모바일 쇼케이스 확대 문의 — 카드는 560 고정 조판이라 폰트만 확대 불가, scale 상한은 열 폭이 결정(390 폰 최대 0.639). 유동 스케일(calc 나눗셈) 시도했으나 `scale()` 숫자 타입 이슈로 잘림 발생 → **사용자 판정으로 0.58 고정 유지(롤백)** ②lg(1024) 쇼케이스 잘림 — lg 원본(1.0)·−10vw는 1024 뷰포트 여백(32px)이 뻗침(102px)을 못 흡수해 70px 잘림 → 0.85·가장자리 터치로 1차 수정했으나 "너무 딱 붙는다"(사용자) → **lg `0.8`·블리드 없음(뷰포트 우측 32px 여백), 원본 블리드는 xl+로** — 1024(rightGap 32px)·1280 실측 통과. 블리드 원칙 확정: "잘리지 않고, 밀착하지도 않는다 — 여백이 뻗침을 흡수하고 남는 폭에서만"(DESIGN.md)
- 잔여: **본인 눈 최종 확인 → 커밋** / 체크포인트 판정(완료율 vs 경과율−15%p)은 EOD에서 사용자 판정

---

## 2026-08-25 — Day 8 EOD 기록 (커밋 0114ee9 · 체크포인트 산정 — 기준선 미달, 판정 대기)

### 작업 내용

- **무엇을**: Day 8 EOD — 본작업(캐러셀 이식) 커밋·push 마감 + Day 7에서 이월된 중간 체크포인트 공식 산정 + commit-push 스킬 개정
- **어떻게**:
  - 눈 확인 3라운드 최종 승인("이상없어") 후 커밋 `0114ee9`(feat, 14파일 +566/−68) → origin push, Vercel 프리뷰 자동 배포. **main 머지는 프리뷰 눈 확인 후 별도 판정**
  - 체크포인트 산정은 Day 7 판례 척도 유지 — 경과율 = 구현-기능 6일(Day 6~11) 중 경과일 ÷ 6, 완료율 = SCR 8개 중 정적 완성 수 ÷ 8
  - **commit-push 스킬 개정(사용자 지시)**: `0114ee9`가 논리 단위 4개(PRD 확정·구현·fix 라운드·기록)를 한 커밋에 묶은 데 대한 교정 — 무조건 `git add .` 제거, 단위별 선택 스테이징 + 분할 기준("이 커밋만 revert해도 나머지가 성립하는가") 명문화. 메모리 `commit-granularity` 병행 저장
- **왜**: 공식 판정이 Day 8 아침 기준선(18.3%)으로 이월돼 있었다(8/24 기록). 산정까지가 에이전트 몫, 프로토콜 발동 여부는 사용자 판정

### 작업 결과

- **체크포인트 산정 (이월된 공식 판정)**:

| 항목 | 값 |
|---|---|
| 경과율 (구현 6일 중 2일 경과, Day 8 아침 기준) | 33.3% |
| 기준선 (경과율 − 15%p) | **18.3%** |
| 완료율 (SCR 8개 중 정적 완성 1개 — SCR-001) | **12.5%** |
| 판정식 | 12.5% < 18.3% → **기준선 미달 (−5.8%p)** |

- 미달은 Day 7에 사전 인지된 리스크의 실현("이식에 Day 8 하루를 쓰면 기준선 미달 위험 — 사용자 인지 하에 이식 우선 결정"). Day 8 산출물이 0은 아니나(SCR-001 v3 재완성 — PRD·구현·반응형 실측) 완료율 정수는 SCR-001 안의 재작업이라 움직이지 않았다
- 참고 수치: EOD 시점(= Day 9 아침) 기준선은 50% − 15%p = **35%**. 잔여 = Day 9~11 사흘에 7화면(SCR-003 저장 플로우·004·006·007·008·005·OPS-001) — 화면당 약 0.43일로 용량 게이트 휴리스틱(백엔드 v1 포함 시 1.0일/화면) 대비 부족. 단 Day 11(8/28) 저녁 컷 판정 게이트가 이미 활성
- **프로토콜 발동 여부 = 사용자 판정 대기** — PLAN 44행 순서: 지렛대 0(버퍼 잔량 2일) → 1(출시 준비 페이즈 이월 가능 항목 제거, 위험 거의 없음) → 4(화면 컷: 갤러리 → 내 카드 관리 → 소속·역할 — Day 11 게이트와 접속). PLAN.md 316행 체크 표기는 판정 후에만
- **판정 (8/25 밤, 사용자)**: **지렛대 발동 유보** — Day 9(8/26)를 타이트하게 진행해 밀린 물량(SCR-003 저장 플로우 + SCR-004)과 원래 Day 9 물량을 만회. 버퍼·슬랙은 건드리지 않고, 만회 실패 시 Day 11(8/28) 저녁 컷 게이트에서 실측 기반 재판정. PLAN.md 316행 체크 표기는 별도 지시 시
- **EOD 마감(8/25 밤, 새 세션)**: docs 커밋 `789ac1f` push → Obsidian TIL 5건 신규(transform-scale 레이아웃 함정 · Textarea field-sizing · 블리드 원칙 · aria-disabled 안내 클릭 · 형제 클라 CustomEvent) + Notion 원고 Day 8 스테이징 → **Notion 등록 완료**(연결 회복 확인, 재로그인 불필요) — Day 7 이월분 1 + Day 8 요약·결정 1 + 트러블슈팅 5 = 7페이지, DB 15→22건

---

## 2026-08-26 — Day 9: 만회 진행 — SCR-003·004·005 + OPS-001 + 위생 묶음, Day 6~9 main 머지·프로덕션 첫 배포

### 작업 내용

- **무엇을**: Day 8 판정("지렛대 유보 — Day 9 타이트 진행으로 만회")에 따른 실행. 밀린 SCR-003 저장 플로우·SCR-004 상세 + 원래 Day 9 물량(SCR-005 법적·OPS-001 admin·위생 묶음) + 미결 OQ 3건(002·003·012) 해소를 하루에 26커밋으로 처리
- **어떻게**:
  - **SCR-003** `app/actions/workflow.ts`(BR-007·023·025) · `app/card/page.tsx` · `components/card-preview.tsx` — 미로그인은 게이트→OAuth 왕복 후 `?save=1` 자동 저장. 터치 타깃 위반 2건 수정(저장 CTA 32→44px, 복귀 링크 25→45px)
  - **SCR-004** 서버 조회·404(BR-006). 조회를 `cache()`로 감싸 `generateMetadata`+본문 2회 호출을 **DB 1회**로. 형식 위반 id는 조회 없이 404
  - **OQ-002 → PNG 저장**: `html-to-image` 동적 import(초기 번들 제외, LCP 예산) → `toBlob(pixelRatio:2)` 1120×1400. `/api/og`(가로 1200×630)는 용도가 달라 재사용 안 함(OQ-008 동시 해소)
  - **OQ-003·012 → 동적 OG** `/api/og?id=&v=`: Google Fonts `text=` 런타임 서브셋으로 카드당 8~9KB(완성형 TTF는 `ImageResponse` 500KB 상한 초과, woff2는 satori 미지원) + 가로 텍스트 요약 레이아웃. 실측 0.47초·45KB
  - **SCR-005** `/privacy`·`/terms`(PRD-14 원문) · **OPS-001** `lib/admin.ts`(BR-022)+`app/actions/admin.ts`+`app/admin/page.tsx` · **위생** `app/robots.ts`·`app/sitemap.ts`·정적 기본 OG·미사용 이미지 6종 제거
  - **`lib/site.ts` 신설** — 절대 URL SSOT(프리뷰=`VERCEL_URL` / 프로덕션=상수 / 로컬=env). metadataBase·sitemap·robots의 중복 하드코딩을 흡수
- **왜**: Day 11(8/28) 저녁 컷 판정 게이트 전에 화면 정수를 올려야 지렛대 4(화면 컷)를 피할 여지가 생긴다. 또 프로덕션이 Day 5 코드에 멈춰 있어 `/card-detail`·`/api/og`가 아예 없었고, OG 검증의 절반이 여기서 막혀 있었다 — 머지가 검증의 선행 조건이었다

### 작업 결과

- 게이트: `build` ✓ / `lint` 0 / `test` **25 pass** / `tsc` 0
- `feat/day9-scr003-save` → main 머지 `40748fc`(41커밋, Day 6~9 통합) → **프로덕션 배포·전 라우트 검증 통과**
- **카카오톡 미리보기 정상**(본인 확인) — 카드 제목·단계가 그려진 동적 OG. 비공개 전환 실측: 타인 상세 404 · 사이트맵 제외 · `/api/og` 새 `v`는 기본 이미지(37,518b / 동적 45,353b)
- 시드 카드(`5eed0001`) 프로덕션 제거 — 현재 `workflows=0`
- 트러블슈팅 8건(하이드레이션 확장 주입 · 중첩 세그먼트 og:image 덮임 · satori 커넥션 리셋 · 프리뷰 OG 두 겹 · robots 접두사 매칭 · CDN 캐시 오진 · 캐러셀 텍스처 겹침 · EL-CARD-009 사양 모순) — 상세는 아래 EOD 기록
- **Day 10 이월(8/26 본인 지시)**: SCR-003 실제 OAuth 저장 왕복 본인 눈 확인 · OPS-001 admin 세션 목록·토글 실동작 검증(**재시딩 선행 필요** — `node --env-file=.env.local seed.ts`) · X(트위터) 미리보기 미확인 · 카드 액센트 팔레트 2~3종 미정(EL-CARD-010)

---

## 2026-08-26 — Day 9 EOD 기록 (Obsidian TIL 7신규·2병합 / Notion 9페이지)

### 작업 내용

- **무엇을**: Day 9 EOD 기록 블록 — claude-mem 세션 컨텍스트와 26커밋의 커밋 메시지를 소스로 트러블슈팅 8건·결정 5건을 이중 기록(PLAN.md §기록 시스템)
- **어떻게**:
  - **Obsidian(재사용 지식) 신규 7건**: satori 렌더 실패는 try/catch를 빠져나가 커넥션 리셋으로 나타난다 · OG 폰트는 런타임 서브셋 fetch로 번들 상한을 피한다 · metadataBase를 프로덕션으로 고정하면 프리뷰에서 OG를 못 고친다 · 중첩 세그먼트가 openGraph를 선언하면 상위 파일 규약 이미지가 덮인다 · robots disallow는 접두사 매칭이라 끝 앵커가 필요하다 · CDN 캐시 키에 공개 여부가 없으면 비공개 전환이 소급되지 않는다 · 하이드레이션 불일치가 확장 프로그램 주입이면 한 겹만 억제한다
  - **Obsidian 기존 2건 병합**: `satori-OG-이미지는-줄바꿈을-접고-oklch를-모른다`에 제약 ⑤(JSX 텍스트+표현식도 자식 여러 개) 추가 / `공유-카드-이미지는-값-복제가-아니라-DOM-래스터화로`에 html-to-image 클론이 부모 `transform`을 상속하지 않는다 + 캡처 직전 가시성 토글 패턴 추가
  - **Notion(과정 기록) 9페이지**: 과정요약 1(진행 요약 + 결정 로그 D9-01~05) + 트러블슈팅 8(TS-D9-01~08). 원고는 `_notion-원고-stackd-Day9.md`로 스테이징 후 배치 등록
- **왜**: PLAN.md 규칙상 **트러블슈팅 로그만은 당일 기록**(하루 지나면 원인·해결의 디테일이 증발). Day 9는 "코드는 맞는데 경계가 틀린" 결함이 4건(환경·상속·경로·캐시 무효화)이라 재현 조건까지 남겨야 재사용 가치가 생긴다

### 작업 결과

- Obsidian vault 92 → **99 노트**, 깨진 위키링크 **0**(전수 검사)
- Notion「개발 로그:stackd」**9페이지 등록 완료** — 태그는 캐노니컬 4종(gsap·성능·기획·배포)만 있어 배포 축 4건에만 부여, 나머지는 추측 대신 미태깅 유지(Day 6 판례)
- CLAUDE.md 프로젝트 트리에 `lib/site.ts` 반영

---

## 2026-08-27 — Day 10: SCR-001 `?edit=` 수정 모드 + SCR-007 내 카드 + 도구 검색 결함

### 작업 내용

- **무엇을**: 구현-기능 구간 5일차(남은 구현일 2일). ①SCR-001 마지막 조각 `?edit=` 수정 모드 ②SCR-007 `/me` 신규 ③Day 11 배정이던 도구 검색 `description` 매칭을 당겨서 처리
- **어떻게**:
  - **`?edit=` (`94a30b2`)**: 착수 전 탐색에서 **배관 절반이 이미 있었다** — `Draft.editId`(`lib/draft.ts:9`)·`saveWorkflow`의 update 분기·`card-preview.tsx`의 `d.editId` 전달·`card_edit` 이벤트 분기가 8/26 SCR-003 작업에 포함돼 있었다. 남은 건 로드 쪽뿐이라 신규 코드가 계획보다 작았다. TODO에 적힌 "빌더에 `initial` prop 자리만"은 사실과 달라 **자리조차 없었고** 신설했다. 초안↔DB 충돌은 SCR-001 §11 #3을 그대로 구현(같은 카드면 배너, 다르면 안내 없이 폐기). `/card`→`/` 즉시 복원은 `sessionStorage` — URL 파라미터로는 링크 클릭만 덮이고 **브라우저 뒤로가기가 빠진다**
  - **SCR-007 (`7df5ff1`)**: 서버 페이지 + 클라이언트 액션 컴포넌트 1개. 구현 중 **미구현 전제 3건**이 드러나 함께 처리 — `revalidatePath` 사용처가 프로젝트 전체 0건 / `?auth=required`·`?auth=failed` 토스트 미구현(SCR-001 §6에 명세만 있었음) / EL-ME-010의 "ERR 신규 필요"는 `ERR-LIB-001` 재사용으로 해소
  - **도구 검색 (`0c60a53`)**: `rank()`로 이름 0·설명 1·미일치 2를 매겨 필터 + 안정 정렬
- **왜**:
  - **컷 순서가 작업 순서를 뒤집는다.** 미착수 화면 3개(006·007·008)에 2일뿐인데 PLAN.md 컷 순서가 `①갤러리(006) → ②내 카드 수정 → ③소속·역할`이므로, **먼저 잘릴 006이 아니라 007에 시간을 썼다** — 컷 판정 후에도 남는 코드다
  - `?edit=`은 SCR-001을 닫는 조각이자 SCR-007 "수정" 동선의 선행이라 같은 날 묶는 것이 자연스러웠다
  - 도구 검색은 신규 기능이 아니라 **SCR-001 결함**이고, Day 11 시드 카드 작성(본인)이 이 검색에 의존한다

### 작업 결과

- **RLS 전제 정정 1건(보안)**: `"public read"` 정책이 `is_public or auth.uid()=user_id`라 **타인의 공개 카드도 조회된다.** 계획 단계에서 "RLS가 소유자 필터 역할"로 적었으나 오판 — `?edit=`·`/me` 양쪽에 `user_id` 명시 필터를 걸었다. RLS 단독이면 타인 카드 내용이 빌더에 채워지는 정보 노출이 발생한다(저장은 `saveWorkflow`가 막지만 로드가 뚫린다)
- **도구 검색 실측**: `review` **5 → 10건**(상위 3건은 이름 히트 유지) · `pair programming` **0 → 1건**(Aider). 8/26 조사치와 일치
- 검증: `tsc` 0 errors · `lint` 0 · `test` 25 pass · `build` 통과(`/me` 라우트 생성 확인)
- **브라우저 실측(dev 3000)에서 결함 1건 발견·수정 (`279dae5`)**: `/card` 복귀 시 **즉시 복원과 배너가 동시에** 나타났다. 원인은 resume 플래그를 빌더가 `clearResume()`로 소비하고 배너가 그 값을 읽는 구조 — 두 컴포넌트의 effect 실행 순서에 결과가 좌우됐고, dev의 Strict Mode 이중 실행에서 배너가 "플래그 없음"을 봤다. **계획 단계에서 "배너 effect가 먼저 돈다"는 가정을 적어둔 것이 화근** — 순서에 기대는 설계 자체를 지웠다(`isResuming()`이 첫 호출에 저장소를 비우고 결과를 모듈 메모리에 캐시 → 누가 먼저 묻든 같은 답). 코드는 오히려 짧아졌다
- 실측 통과 항목: 비로그인 `/me` → 307 `/?auth=required` + 토스트 1건 + URL 정리 / `?edit=`은 파라미터 정리에서 보존(`auth`만 제거) / `?edit=없는id` → 빈 빌더 / `/card`→`/` 즉시 복원 후 재진입 시 배너 복귀(1회성 유지) / 도구 검색 UI **10건·이름 히트 우선**(설명으로만 걸린 `executing-plans`는 뒤로) / 가로 오버플로 0
- ⚠️ **미완**: `/me` 목록·배지·스위치·삭제와 `?edit=` 값 로드·초안 충돌 3케이스는 **로그인 + 저장된 카드가 있어야** 검증된다 → 본인의 OAuth 저장(Day 10 이월 항목)과 함께 처리. [본인 눈] 확인도 그때
- EVT-BLDR-001은 손댈 필요가 없었다 — `track("step_add")`가 사용자 클릭 경로 1곳뿐이라 수정 모드 로드 시 미발화(§11 #5)가 자동 충족

### 후속 (같은 날) — 수정 흐름 결함 3라운드

- **무엇을**: 로그인+저장된 카드가 생기면서 열린 실측에서 결함이 연쇄로 드러났다. 3라운드에 걸쳐 수정 — ①완료 지점 부재 ②`editId` 눌러앉음 ③**앞의 수정이 만든 새 구멍 2건**
- **어떻게**:
  - **1라운드 `c55809b`** — 수정 모드에 "수정 완료"가 어디에도 없었다. 빌더 헤딩·CTA·저장 버튼이 전부 생성 모드 문구 그대로. **PRD 공백이 원인** — EL-HOME-014에 `CPY-HOME-006` 하나뿐이라 조건 분기가 명세에 없었다. `CPY-HOME-058`(헤딩)·`CPY-HOME-059`(CTA)·`CPY-CARD-020`(저장) 3건 신설 후 4곳 분기. 겸사겸사 `/card` h1이 `CPY-CARD-019`와 어긋나 있던 것도 정정
  - **2라운드 `ae3b4b4`** — 새 카드를 만드는데 "수정 완료"가 떴다. `editId`를 **넣는 경로는 있는데 빼는 경로가 없어** 초안에 영구히 남았다. 비수정 진입 시 제거 추가
  - **3라운드 `690bbc5`** — sequential-thinking으로 상태 축(URL·세션·조회결과·초안 `editId`·resume·배너응답)을 나열해 진입 경로 8종 전수 대조. **2라운드가 낸 새 구멍 2건**이 나왔다:
    - **복제본 생성** — `editId` 제거가 무조건이라 수정 모드에서도 떼어져, §11 #3의 "이어서 쓰기"가 update가 아닌 **insert**로 흘렀다(원본 잔존 + 복제본 생성). `!init`일 때만 제거하도록 좁힘
    - **`/card` 튕김** — 초기값을 초안에 쓰지 않는 가드 때문에 아무것도 안 고치면 초안이 없어 `router.replace('/')`. BR-019상 **초안이 `/card`로 가는 유일한 통로**다. 게다가 그 가드가 막으려던 "첫 진입 배너"는 §11 #4가 **허용하는** 동작 — 존재할 이유가 없었다
    - 추가로 기존 오안내 1건: `saveWorkflow` update 0행이 `ERR-AUTH-001`("로그인이 필요해요")을 반환했다. 세션은 위에서 확인했으므로 인증 문제가 아니다 → `ERR-CARD-006`+`CPY-CARD-021` 신설
- **왜**: 1·2라운드는 **증상 대응**이었고 그래서 새 결함을 심었다. 3라운드에서 축을 나열해 조합을 훑은 것이 유일하게 유효한 방법이었다 — 복제본 생성은 사용자가 "이어서 쓰기"를 실제로 눌러 중복 카드를 발견할 때까지 증상으로 드러나지 않는다

### 후속 작업 결과

- **자기 회귀 2건 적발**: 3라운드에서 찾은 구멍 3개 중 **2개가 직전 커밋들이 만든 것**. 원 증상(잘못된 버튼 문구)보다 결과가 나쁘다 — 복제본은 데이터 손상이다
- **가드 하나는 명세를 안 읽고 넣은 것**: "첫 진입에 배너는 이상하다"는 직관으로 만들었는데 §11 #4가 요구하는 동작이었다. 직관이 명세와 충돌하면 명세를 먼저 볼 것
- `ERR-CARD-006`은 **자동 재시도를 하지 않는다** — 수정을 의도했는데 말없이 새 카드가 생기면 안 된다. 초안의 `editId`만 떼어 버튼이 "저장하기"로 정정되고, 다시 누르는 것은 사용자 판단
- 브라우저 실측 8경로 전부 통과: 없는 id 저장 → `ERR-CARD-006` 토스트 + 버튼 정정 / 재저장 → 새 카드 `adc8594f` + 초안 폐기(BR-019) / `/?edit=` → 헤딩·CTA·값 로드 / 안 고치고 미리보기 → `/card` 유지 / 수정 중 재진입 → 배너 + `editId` 유지 → 이어서 쓰기 후에도 유지
- `tsc` 0 · `lint` 0 · `test` 25 pass
- ⚠️ 검증 부산물: 프로덕션 DB에 카드 `adc8594f`("테스트1") 1장 잔존 — `/me`에서 삭제 가능

### 후속 2 — 복귀 링크가 수정 모드를 잃던 문제 (`395c3f0`)

- **무엇을**: `/card`에서 "돌아가서 수정하기"로 돌아오면 빌더가 생성 모드로 보이고(`카드 만들기`) `#builder` 스크롤도 없었다 (8/27 사용자 보고)
- **어떻게**: 복귀 링크 `href`를 `draft.editId ? '/?edit={id}' : '/'`로. 스크롤 조건은 `init || resuming`으로 확장. SCR-001 §6·SCR-003 EL-CARD-014에 명세 추가
- **왜**: **수정 모드 판정이 두 기준으로 갈려 있었다** — 빌더 UI(헤딩·CTA·스크롤)는 서버가 읽은 URL `?edit=`을, `/card` 저장 버튼은 초안의 `editId`를 본다. 복귀 링크가 `href="/"`라 URL의 `?edit=`만 증발했고, **화면은 "카드 만들기"인데 저장은 update로 나갔다.** 문구 불일치보다 이쪽이 위험하다 — 새로 만드는 줄 알고 누르면 기존 카드가 덮어써진다
- **결과**:
  - 실측: 복귀 링크 `href="/?edit=adc8594f"` / 복귀 후 CTA "수정한 내용 확인하기" / 배너 없이 즉시 복원(§6) / tsc 0 · lint 0 · test 통과
  - **[본인 눈] 통과(8/27)** — 스크롤·`?edit=` 유지·CTA 문구 3항목. 스크롤은 `scroll-behavior: smooth`(rAF 기반)라 hidden 탭에서 구조적으로 검증 불가 → 이 항목은 앞으로도 사람이 봐야 한다
  - 부수 효과: 수정 중 새로고침해도 모드가 유지된다(URL이 상태를 들고 있으므로)
  - **스크롤은 엣지 14가 `?edit=` 진입만 다뤄 §6 복귀가 빠져 있었다** — 명세 공백이 원인이고, 생성 모드 복귀도 같은 결함이었다(사용자가 아직 안 밟았을 뿐)
  - SCR-004 소유자 CTA는 **유지 판정**(사용자, 8/27). 다만 PRD-15:45가 그 UTM을 "루프 작동 직접 증거"로 쓰므로 소유자 클릭이 공유 유입에 섞인다 → `backlog.md` §개선에 기록, 판정일 수치 해석 시 감안

### 후속 3 — admin 검증 (OPS-001)

- **무엇을**: Day 10 이월 항목. 재시딩 → `/admin` 실측 → 시드 제거까지
- **어떻게**: 신고 1건만 만들던 `seed.ts`를 **목데이터 6건**으로 확장 — 길이(250자/한 줄)·타입 3종(report·contact·feedback)·처리 상태·`reporter_id` null 여부를 흩뜨렸다. 판단 대상이 레이아웃이라 균질한 데이터로는 검증이 안 된다
- **왜**: PRD §16은 md+ 테이블인데 구현은 카드형이다(본문 500자+라 테이블이 안 읽힌다는 판단). **이 이탈이 맞는지 보려면 긴 본문이 실제로 하나 있어야** 한다 — 짧은 것만 있으면 테이블도 멀쩡해 보인다
- **결과**:
  - 실측 통과: 게이트 · 목록 · 타입 배지 3종 · 긴 본문 4줄 가독 · 신고자 로그인/익명 · 처리 완료 → 기본 필터 제거 · `?all=1` 배지·토글(TC-ADMIN-004-01) · hidden 토글(TC-ADMIN-003-01/02, 본인)
  - **§16 이탈 승인**(본인) — 카드형 유지
  - **`--clean` 결함 1건**: `workflow_id = SEED_ID`로만 지워서 **대상 없는 문의·피드백(workflow_id null)이 남는다**. 본문 `[시드]` 마커 삭제로 변경 — 8/18 실데이터 2건은 마커가 없어 보존됐다. 정리 스크립트는 생성 데이터가 늘 때 함께 늘어나야 한다는 사례
  - 시드 제거 완료 — 프로덕션에 실데이터만 잔존
  - **`seed.ts` 추적 제외 판정**(본인) — 로컬 보존 + `.gitignore`. `git add -A`가 `.claude/`·`.serena/`와 함께 끌어들인 것을 머지 직전 `git diff --stat`에서 적발

### 후속 4 — 액센트 팔레트 3종 (EL-CARD-010)

- **무엇을**: 카드 액센트가 `ink` 1종뿐이라 스와치 UI가 통째로 숨어 있던 것(`swatches.length > 1` 조건)을 3종으로 열었다
- **어떻게**: `ink`(`#111419`) + `navy`(`#2863ab`) + `forest`(`#0b7643`). 후보는 oklch로 계산해 hex·대비를 함께 제시하고 본인이 A안 판정
- **왜**: PRD-05가 "DESIGN.md 팔레트 2~3종"을 참조하는데 **DESIGN.md에 그 정의가 없었다** — 참조 대상이 비어 있는 상태였다. 값만 넣으면 다음에 늘릴 때 기준이 없으므로 §카드 고정 팔레트 절을 신설해 선정 규칙까지 적었다
- **결과**:
  - **선정 기준 2줄이 전부다**: ①명도 `oklch L = 0.50` 고정 — 더 밝으면 흰 배경 위 텍스트가 안 읽히고, 더 어두우면 색이 죽어 ink와 구분이 안 된다. 고정하면 세 색이 **시각적으로 같은 무게**를 갖는다 ②흰색 대비 4.5:1 하한
  - **대비를 한 번만 재면 되는 이유**: 액센트는 단계 뱃지(배경, 흰 글씨)와 "단계별 설명 보기 →"(텍스트, 흰 배경) 양쪽에 쓰이는데 **역할이 반대라 대비비는 같은 값**이다. 실측 18.5 / 6.0 / 5.7:1 전부 AA
  - 카드는 PNG·OG로 렌더돼 CSS 변수를 못 쓴다 → 코드가 하드코딩 hex를 갖고 DESIGN.md가 SSOT, 코드는 사본
  - 코드 증분 거의 0 — 스와치 UI 조건이 이미 있었고, 기존 카드는 `ACCENTS[accent] ?? INK` 폴백으로 무영향
  - 실측(dev): 스와치 3개 렌더 · navy·forest 전환 시 뱃지와 하단 문구가 함께 반영

---

## 2026-08-28 — Day 11: 헤더 내비 마감 + SCR-006 라이브러리 · SCR-008 설정 (전 화면 완성, 컷 0건)

### 작업 내용

- **무엇을**: 헤더가 링크만 하고 라우트가 없어 **프로덕션에서 404였던 `/workflows`·`/settings` 두 화면**을 구현하고, 전날 브랜치(`feat/header-nav`)를 main에 머지했다. Day 11 스코프 컷 판정 대상이던 마지막 두 SCR이다
- **어떻게**:
  - 먼저 `feat/header-nav` push → main 머지(`b7cc09a`) — 헤더 64px·햄버거 내비·lg 미만 세로 스택. **머지가 404를 새로 만들지 않는지 확인 후 진행**했다(`git show main:components/site-header.tsx`로 확인 — main에 이미 두 링크가 있어 404는 기존 상태였다)
  - SCR-008: `app/settings/page.tsx`(서버) + `app/actions/account.ts` + `components/settings-forms.tsx`(클라 1파일 2컴포넌트)
  - SCR-006: `app/workflows/page.tsx`(**클라이언트 컴포넌트 0개**) + `lib/paginate.ts`
- **왜**: PLAN Day 4~11의 완료 조건이 "전 화면 정적 완성(반응형 포함)"이고, 오늘 저녁이 스코프 컷 판정일이다. 두 화면이 미완이면 라이브러리(컷 1순위)를 버려야 했다

### 작업 결과

#### 1. SCR-008 설정 (`da397ba`)

- **BR-003과 카피가 어긋나 있었다** — `CPY-CARD-007`은 "한글·영문·숫자로 20자까지"인데 BR-003은 **문자 제한 없음(이모지·특수문자 허용), 길이만 적용**이다. 여기서 설정에만 문자셋 정규식을 넣었으면 **빌더는 통과시키는 입력을 설정이 거부**하는 비대칭이 생겼다 → 규칙(BR-003)을 따르고, `validateRole`을 추출해 `validateWorkflow`의 role 검사까지 같은 함수로 돌렸다. 카피는 PRD-11이 SSOT라 문구는 그대로 둔다
- **신규 배선 0인 부분이 있었다**: `app/page.tsx:65`가 이미 `user_metadata.role_default`를 읽어 빌더에 넘기고 있었다 — 읽는 쪽만 있고 **쓰는 쪽이 없던** 상태여서 저장 액션만 추가하면 TC-SET-002-02가 성립한다
- 로그아웃은 기존 `signOut` 재사용 + `<form action>` — JS 없이 동작(§13). 탈퇴는 세션 uid만 삭제 대상으로 삼아 IDOR을 원천 차단하고, 클라 `disabled`와 별개로 서버가 세션 핸들과 재대조한다
- 실측: 미로그인 `/settings` → `/` + "로그인이 필요해요"(TC-SET-001-01) · 탈퇴 버튼 disabled → 핸들 **대소문자 무시** 일치 시 해제 → 불일치 시 재잠금(TC-SET-004-01, React 제어 입력에 값 주입해 확인 — 제출은 하지 않음)

#### 2. SCR-006 라이브러리 (`6c65c53`)

- **명시 필터가 보안 경계다** — RLS "public read"는 `is_public or auth.uid() = user_id`라 **로그인 세션에서는 본인 비공개 행이 통과**한다. 앱에서 `.eq("is_public", true).eq("hidden", false)`를 걸지 않으면 자기 비공개 카드가 공개 목록에 뜬다. 사이트맵이 같은 이유로 이미 앱 필터를 쓰고 있었다
- 13행을 조회해 12행만 렌더 — 13번째 존재가 곧 다음 페이지 판정이라 `count` 쿼리가 따로 필요 없다
- 실측: `?page=abc·0·-1·1.5` → 200(1페이지) · `?page=2·99`(0건) → **307 `/workflows`**
- **반응형 결함 1건 — 시각 확인이 아니었으면 못 잡았다**: `max-w-6xl`은 border-box라 **패딩이 max-width 안에 포함**되는데 이를 놓치고 열 폭을 계산해 xl에서 카드 슬롯이 열을 **17px 초과**했다(li 341.3 vs slot 358). 슬롯의 `overflow-hidden`이 가로 스크롤을 막아 `scrollWidth` 검사로는 **정상으로 보인다** — 열 폭과 슬롯 폭을 직접 비교해야만 드러난다. `--s` 0.64 → 0.6으로 수정 후 7개 뷰포트(360/390/640/768/1024/1280/1440) 재측정, 전부 열 안에 수렴·넘침 0

#### 3. Day 11 스코프 컷 판정 — **컷 0건**

- SCR **8/8 = 100%**, 컷 1순위(라이브러리) 포함 삭제 대상 없음. 버퍼 잔량 2일 유지(소진 0)
- 근거: 두 화면 모두 기존 자산 재사용(`workflow-card`·`signOut`·`login-event`·`Input`/`Button`)으로 신규 파일 5개·반나절 규모였다
- 잔여는 화면이 아니라 **[본인] 실행 항목 3건**(시드 3~5장 · 기본값 저장 왕복 · 탈퇴 실동작) — 화면 삭제로 해결되는 종류가 아니라 컷 대상이 아니다
- ⚠️ **순서 제약 발견**: `schema.sql:11`의 `on delete cascade` 때문에 **탈퇴 시험이 시드를 전멸**시킨다. 탈퇴 확인 → 시드 작성 순서를 TODO에 고정했다. 시드 중 1장은 비공개로 남겨야 SCR-006 §11 #4(본인 비공개 카드 미노출)를 실증할 수 있다 — 현재 공개 1건뿐이라 미검증

#### 4. 검증

- tsc 0 · lint 0 · **test 31 pass**(신규 6건: `validateRole` 2 · `matchesHandle` 1 · paginate 3) · build 통과(`/settings`·`/workflows` 둘 다 동적 라우트로 생성)

### 후속 1 — 탈퇴 확인을 dialog로 (사용자 지시, 8/28)

- **무엇을**: 설정 페이지에 인라인으로 있던 탈퇴 안내·확인 입력·버튼을 **버튼 하나**로 줄이고, 확인 입력은 dialog 안에서 받도록 바꿨다 (PRD SCR-008 v1.1.0 — EL-SET-007 신설)
- **어떻게**: `my-card-actions.tsx`의 삭제 확인 dialog 패턴을 그대로 가져왔다 — shadcn `Dialog`가 이미 설치돼 있어 신규 의존성·신규 컴포넌트 0
- **왜**: 파괴적 행동을 한 단계 뒤로 미룬다. 인라인 폼은 스크롤하다 눈에 들어오는 위치에 확인 입력이 항상 떠 있는 구조였다
- **결과**:
  - **추가로 넣은 것은 "닫을 때 입력 초기화" 하나**다. 없으면 핸들을 친 채 닫았다가 다시 열었을 때 **탈퇴 버튼이 이미 열린 상태로 뜬다** — dialog화가 만들어낸 신규 상태라 원래 인라인 구조에는 없던 문제다 (TC-SET-004-04 신설)
  - 실측: 트리거 → dialog 오픈 + 확인 입력 자동 포커스 / disabled → 대소문자 무시 일치 시 해제 → 불일치 재잠금 → 취소 후 재오픈 시 입력 `""`·다시 disabled / 취소·ESC 모두 닫힘 / 버튼 44px
  - **계측 함정 1건**: 닫은 직후 `document.querySelector('[role="dialog"]')`가 계속 잡혀 "안 닫힌다"고 오판할 뻔했다. `data-state`를 보니 `closed`였다 — 백그라운드 탭에서는 CSS exit 애니메이션이 안 돌아 `animationend`가 안 뜨고, Radix가 노드를 남긴다. **dialog 닫힘 판정은 노드 존재가 아니라 `data-state`로 해야 한다**
  - 미변경 판정: `destructive` 변형이 `bg-destructive/10` 소프트 틴트라 **disabled(opacity-50)와 육안 구분이 약하다**. 다만 "핸들이 일치해야 탈퇴 버튼이 열려요" 문구가 상태를 말로 설명해 §15("색만 금지")는 충족하고, `buttonVariants` 수정은 카드 삭제 dialog까지 번져 범위 밖이라 그대로 둔다

### 후속 2 — destructive 버튼을 solid로 (사용자 판정, 8/28)

- **무엇을**: `buttonVariants`의 `destructive`를 소프트 틴트(`bg-destructive/10` + 붉은 글씨)에서 **solid**(`bg-destructive` + 흰 글씨)로 바꿨다. 함께 설정 페이지의 탈퇴 **트리거**는 `outline`으로 내렸다
- **어떻게**: 사용처를 먼저 훑었더니 **규칙이 이미 서 있었다** — `card-actions.tsx:149`·`my-card-actions.tsx:109` 둘 다 트리거는 `outline`, 확인 dialog의 실행 버튼만 `destructive`다. 즉 `destructive` **Button**은 원래부터 "되돌릴 수 없는 최종 실행" 전용이었고, 내가 만든 설정 트리거만 그 규칙을 어기고 있었다. Badge는 `badge.tsx`에 별도 cva가 있어 영향 없음(admin 숨김 배지·상세 신고 배지 그대로)
- **왜**: 소프트 틴트는 `disabled:opacity-50`과의 차이가 **불투명도 하나뿐**이었다. 배경이 이미 10% 틴트라 disabled에서 5% 틴트가 되고 글자만 절반 흐려져, "누를 수 있는 상태"가 육안으로 안 읽혔다. 확인 dialog의 실행 버튼이 화면마다 다르면 그게 더 어색하다는 사용자 판정으로 공용 변형을 고쳤다
- **결과**:
  - 실측: 확인 버튼 `#be222a` 배경 + 흰 글씨 **6.08:1**(AA 통과) / 트리거 `#f9fafb` 배경 + `#be222a` 글씨 **5.82:1** / 버튼 높이 44px
  - disabled(연한 분홍) ↔ enabled(진한 적색) 차이가 명확해졌다
  - DESIGN.md에 대비 실측값 + **파괴적 버튼 규칙**(solid=최종 실행, outline=트리거) 신설
  - **판단 과정의 결함 1건**: 처음에 이 문제를 보고할 때 "공용 variant를 고치면 카드 삭제까지 번진다"만 근거로 들어 **전부 아니면 전무처럼 제시**했다. 이 버튼 하나에만 className을 주는 국소 수정이 있었는데 그 선택지를 빼먹었다. 범위 밖이라 안 고친 것 자체는 맞았지만, 선택지를 좁혀 보고한 건 잘못이다

### 후속 3 — 탈퇴 트리거 solid 환원 + 커서 복원 (사용자 판정, 8/28)

- **무엇을**: ① 설정의 탈퇴 트리거를 `outline`에서 다시 **solid destructive**로 ② 클릭 가능한 모든 요소에 `cursor: pointer` 복원
- **어떻게**:
  - ①은 `variant="destructive"` 환원. 후속 2에서 세웠던 "트리거는 언제나 outline" 규칙을 **무게 기준으로 다시 갈랐다** — 계정 단위 종결 행동(탈퇴)은 단독으로 놓이므로 solid, 목록 항목 안에서 수정 버튼과 나란히 놓이는 인라인 카드 삭제는 outline
  - ②는 컴포넌트마다 `cursor-pointer`를 붙이는 대신 `globals.css` base 레이어에 **선택자 3줄**로 한 번에: `button:not(:disabled):not([aria-disabled="true"])` · `summary` · `label:has(button, input[type="checkbox"], input[type="radio"])`
- **왜**: **Tailwind v4 Preflight가 `button`의 커서를 `default`로 되돌린다**(v3에서는 pointer였다). 그래서 shadcn 버튼 전부가 손가락 커서 없이 렌더되고 있었다. 컴포넌트별로 붙이면 반드시 빠뜨리는 곳이 생기므로 전역 규칙이 맞다
- **결과**:
  - 실측(홈 20개 요소): `<a>`·`<button>` 전부 pointer / **비활성 제외 정확**
    - "카드 만들기"는 `aria-disabled`라 `not-allowed` 유지 — `buttonVariants`의 기존 규칙을 덮지 않는다
    - **텍스트 입력의 `<label>`은 default 유지**가 의도다. `label:has(...)`가 컨트롤을 감싼 라벨만 고르므로 빌더의 제목·상황 라벨은 안 걸린다
  - 합성 검증: Switch 감싼 라벨 pointer / 텍스트 라벨 default / summary pointer / 버튼 pointer / 비활성 버튼 default
  - DESIGN.md에 **커서 규칙**과 갱신된 **파괴적 버튼 규칙**(최종 실행=항상 solid, 트리거=무게로 결정) 기록
  - ⚠️ 이 시점에 로컬 세션이 끊겼다 — 프로덕션에서 탈퇴가 실행돼 그 계정의 JWT가 무효화됐고, localhost 쿠키가 만료되면서 `/settings`가 `/?auth=required`로 리다이렉트됐다. 탈퇴 트리거의 solid 렌더 육안 확인은 프리뷰 몫으로 남는다(변형 색은 dialog 실행 버튼에서 이미 6.08:1로 실측)

### 후속 5 — 소속·역할 기본값 기능 삭제 (사용자 판정, 8/28)

- **무엇을**: 설정의 "소속·역할 기본값" 폼과 그 저장 경로를 통째로 제거. 소속·역할은 빌더에서 **카드마다 직접 입력**한다(BR-008 필드 자체는 유지)
- **어떻게**: 삭제 전에 **전수 맵부터 떴다** — `grep -rn "roleDefault\|role_default\|updateRoleDefault"`. 코드 6곳 + PRD 7개 문서였다
  - 코드: `app/settings/page.tsx` · `components/settings-forms.tsx`(RoleDefaultForm 삭제) · `app/actions/account.ts`(updateRoleDefault 삭제) · `app/page.tsx` · `components/workflow-builder.tsx`(prop 삭제) · `lib/limits.test.ts`(주석)
  - PRD: SCR-008(v2.0.0 — EL-SET-003·REQ-SET-002·TC-SET-002-01/02 삭제) · SCR-001 · SCR-005 · PRD-05 · PRD-06 · PRD-10 · PRD-11
- **왜**: 사용자 판정. PLAN 컷 순서 4순위(소속·역할 필드)의 **부분 적용**이다 — 필드는 남기고 기본값 저장만 잘랐다
- **결과**:
  - **`SCR-005_분석고지.md`의 개인정보 수집 항목 표에까지 `user_metadata.role_default`가 들어 있었다.** 수집하지 않는 항목을 수집한다고 적어두면 그것도 부정확한 고지라 함께 제거. 다만 `/privacy` **본문**은 "소속·역할 — 선택 입력 항목"이라고만 적혀 있어 **법적 고지문 수정은 불필요**했다(확인 후 미변경)
  - `validateRole`은 **남긴다** — `validateWorkflow`가 빌더의 role 필드 검증에 그대로 쓴다. 함께 지웠으면 빌더 검증이 통째로 빠질 뻔했다
  - 정합성 재검사: 코드 잔여 **0**, PRD 잔여는 §1의 삭제 기록 1줄뿐
  - 검증: tsc 0 · lint 0 · test 31 pass · build 통과

### 후속 6 — 헤더 계정 메뉴 dropdown (사용자 요청, 8/28~29)

- **무엇을**: 로그인 시 데스크톱 내비에 4개(내 카드·설정·@핸들·로그아웃)로 나열되던 계정 항목을 **@핸들 클릭 dropdown 1개**로 축약
- **어떻게**: shadcn `dropdown-menu` 추가(Radix DropdownMenu). `radix-ui`가 이미 있어 **신규 의존성 0**, `button.tsx` 무변조(설치 전 백업 후 diff로 확인). 트리거만 클라이언트(`components/user-menu.tsx`)이고 헤더는 서버 컴포넌트 유지
- **왜**: 내비에 개인 메뉴가 나열되면 공개 링크(라이브러리)와 계정 항목의 위계가 안 보인다
- **결과**:
  - 모바일 Sheet는 **미변경** — lg 미만은 이미 같은 항목을 갖고 있어 중복 렌더가 없다
  - **명시적 손실**: dropdown은 열릴 때 포털로 붙으므로 **JS 없이는 로그아웃에 도달할 수 없다**(`/me`·`/settings`는 URL 직접 입력 가능). 기존 헤더 주석 "링크 전체가 서버 HTML에 존재한다"를 그에 맞게 수정. 모바일 Sheet가 이미 같은 성질이라 선례는 있음
  - **버그 1건**: `data-state`는 트리거에 붙는데 아이콘에 `data-[state=open]:rotate-180`을 직접 걸어 아무 일도 안 일어났다. 빌드·타입 체크를 통과하고 에러도 없어 **열어봐야만 발견된다** → 트리거에 `group`, 아이콘은 `group-data-[state=open]:`로 수정
  - **계측 오류 1건 (중요)**: 수정 후에도 "회전이 안 된다"고 판단했는데 틀렸다. **Tailwind v4는 `rotate-180`을 `transform: rotate()`가 아니라 CSS 독립 속성 `rotate: 180deg`로 낸다.** `getComputedStyle(el).transform`을 보면 영원히 `none`이다 — 봐야 할 건 `.rotate`다. 부수 확인: v4의 `transition-transform`은 `transform, translate, scale, rotate`를 모두 포함해 애니메이션은 정상
  - **Radix 트리거는 `click`이 아니라 `pointerdown`에 반응한다** — 합성 `.click()`으로는 안 열려 "안 된다"고 오판하기 쉽다. 실제 클릭(요소 ref)으로 검증해야 한다
  - 실측: 메뉴 열림 · 항목 3종 · 아이콘 `rotate` 180deg↔none · ESC 닫힘 · **실제 키 입력 ↓ → roving focus가 "내 카드"로 이동**(합성 keydown으로는 메뉴 컨테이너에 머물러 검증 불가)
