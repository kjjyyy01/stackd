@AGENTS.md

# 프로젝트 규칙

> **매 세션 시작 시 `docs/PLAN.md`의 현재 Day 섹션을 확인할 것.** PLAN.md가 3주간 유일한 계획서다. 추가 아이디어는 전부 `backlog.md`로.
> **PLAN.md 지정 스킬은 변경 규모로 판단**(운용 원칙 4번) — 단순(문구·에러 메시지·단일 값)=직접 편집 / 중간(AC 추가·검증 규칙)=해당 파일만 로드해 ID·제약 확인 / 구조(화면·데이터 모델·API 계약·스코프)=풀 스킬(make-plan·make-prd·grill-me·sequential-thinking)+정합성 검사.

## 프로젝트 개요

- 3주 출시 프로젝트 — **Stackd(스택드, stackd.kr)**: **AI 워크플로우 카드** — 내 Agentic workflow(상황+단계+도구)를 카드+상세 페이지로 만들어 공유하고 갤러리에서 예시를 본다 (한국어 UI, 저장부터 GitHub 로그인, Supabase). 상세: `docs/day3-mvp-spec.md` (v2, 8/16 재판정) · `docs/day1-decisions.md`
- 일정: Day 1 = 2026-08-12(수) / **Day 20 런칭·게시 = 2026-09-08(화) 오전**, 판정일 9/22(화). Day 6 = 8/20(목), 버퍼 5일 = 9/1~9/5. *(8/20 조정 4회차 — AI Summit 8/19 하루 참가, 순손실 0. 매핑표는 `docs/PLAN.md` §일정 매핑)*
- 월 고정비 상한: **4만원/월** (도메인+DB+호스팅 합산)

## 기술 스택

- Next.js(App Router) / TypeScript / Tailwind v4 / **shadcn/ui**(radix-nova, 라이트 단일) / sonner / GSAP(Day 12~13) / **Supabase**(Auth GitHub OAuth·Postgres·RLS) / GA4(gtag 직접)

## 개발 명령어

- `npm run dev` / `npm run build` / `npm run lint`

## Git 전략 (솔로 기준)

- **첫 파일을 건드리기 전에 브랜치부터 만든다** — 코드·문서·설정 전부 예외 없음. `main`에서 편집 시작 금지(커밋 시점이 아니라 **작업 시작 시점** 규칙)
- 작업 브랜치 → Vercel 프리뷰 배포에서 확인 → main 머지(= 프로덕션 배포)
- main 직커밋은 핫픽스만
- 커밋 규칙: Conventional Commits(feat/fix/docs/chore/refactor). 트러블슈팅 해결 커밋 메시지에 원인·해결 한 줄 포함

## 핵심 원칙

- 성능 예산: **LCP 2.5초**
- 구현 후 반드시 시각 확인: chrome-devtools 스크린샷(모바일/데스크톱) + 본인 눈, 둘 다 통과해야 완료
- 반응형: Tailwind 내장 브레이크포인트(sm/md/lg/xl)만 사용 — 커스텀·별도 정의 금지
- **라이트 단일 테마** — `globals.css`의 `@custom-variant dark (&:is(.dark *))`가 shadcn의 `dark:`를 무력화한다. 지우지 말 것
- **한글 조판**: `word-break: keep-all` 필수 · 본문 행간 1.75·자간 0 · mono는 영문 기계 식별자에만 (DESIGN.md)
- 디자인 토큰 SSOT는 `DESIGN.md` — `app/globals.css`는 그 사본이다
- 문서 상호 참조: `DESIGN.md`(디자인 시스템) / `ARCHITECTURE.md`(구조) / `ANIMATION.md`(모션) / `TODO.md`(작업 목록) / `docs/PLAN.md`(계획)

## 보안 기본 규칙

- 시크릿은 환경변수로만 (`.env`는 .gitignore)
- `NEXT_PUBLIC_` 접두사는 공개돼도 되는 값에만
- 모든 사용자 입력은 서버 측 검증

## 마크업·렌더링 위생 규칙 (고정)

- 모든 콘텐츠(텍스트·헤딩)는 서버 렌더링된 HTML에 존재 — JS 실행 후에만 나타나는 콘텐츠 금지
- `"use client"` 최소화 — 애니메이션 래퍼만 클라이언트, 콘텐츠는 서버 컴포넌트 유지
- 시맨틱 마크업 강제: 페이지당 h1 1개, 헤딩 위계 준수, `<main>/<section>/<nav>` 사용
- 모든 이미지 alt 필수, 페이지별 Metadata API(title/description/OG/canonical) 필수

## 프로젝트 트리

- `app/` 라우터(src 없음) · `app/auth/`(callback·로그인 서버 액션) · `app/actions/`(서버 액션) · `app/not-found.tsx`
- `components/`(site-header·site-footer·feedback-dialog·analytics·login-event) · `components/ui/`(shadcn)
- `lib/supabase/`(server·admin) · `lib/limits.ts`(BR 제한 유틸+테스트) · `lib/analytics.ts`(GA4 track, EVT 7종) · `lib/utils.ts`(cn)
- `proxy.ts`(세션 갱신, Next 16) · `supabase/schema.sql` · `data/catalog.json` · `.env.example`
- 테스트: `npm test` (`node --test`, 도메인 로직만)

## Agent skills

### Issue tracker

이슈는 GitHub Issues(`kjjyyy01/stackd`)에서 관리, `gh` CLI 사용. See `docs/agents/issue-tracker.md`.

### Triage labels

triage 상태 라벨은 캐노니컬 5종 그대로, 분류용 카테고리 라벨 9종(Feature/BugFix 등) 병용. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — 루트 `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.
