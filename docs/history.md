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
- 사용자 잔여: **stackd.kr 구매(가비아)** + EOD 기록 블록
- 다음: Day 2 — MVP 기획서 (SCR 5~7개, 범위 판정 3종 — 카탈로그 100~200개 수집이 콘텐츠 판정 대상)
