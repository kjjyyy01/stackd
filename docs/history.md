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

**교훈(EOD 후보 추가)**: ⑧ 한글 웹 조판은 라틴과 다른 규칙이 최소 3개(`word-break: keep-all`, 행간 1.75, 본문 자간 0) — 영어권 디자인 시스템을 그대로 가져오면 h1부터 깨진다 ⑨ 대비비는 눈이 아니라 계산으로 — oklch L값 0.02 차이가 WCAG 통과/탈락을 가른다 ⑩ `.env.example`에 인라인 주석을 쓰면 "채웠다고 착각한 빈 값"이 생긴다(값 없는 키는 주석을 윗줄로) ⑪ 서버 액션에서 외부 웹훅은 `after()`로 — `await`하면 그 지연이 그대로 사용자 대기 시간

