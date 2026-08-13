@AGENTS.md

# 프로젝트 규칙

> **매 세션 시작 시 `docs/PLAN.md`의 현재 Day 섹션을 확인할 것.** PLAN.md가 3주간 유일한 계획서다. 추가 아이디어는 전부 `backlog.md`로.

## 프로젝트 개요

- 3주 출시 프로젝트 — **Stackd(스택드, stackd.kr)**: AI 스택 카드 생성기 — 설정을 붙여넣으면 공유하고 싶어지는 스택 카드 생성 (한국어 UI·영어 카드, 비로그인). 상세: `docs/day1-decisions.md`
- 일정: Day 1 = 2026-08-12(수) / Day 20 런칭 = 2026-08-31(월) — 커뮤니티 게시는 9/1(화) 오전 권장
- 월 고정비 상한: **4만원/월** (도메인+DB+호스팅 합산)

## 기술 스택

- Next.js(App Router) / TypeScript / Tailwind CSS / GSAP

## 개발 명령어

- `npm run dev` / `npm run build` / `npm run lint`

## Git 전략 (솔로 기준)

- 작업 브랜치 → Vercel 프리뷰 배포에서 확인 → main 머지(= 프로덕션 배포)
- main 직커밋은 핫픽스만
- 커밋 규칙: Conventional Commits(feat/fix/docs/chore/refactor). 트러블슈팅 해결 커밋 메시지에 원인·해결 한 줄 포함

## 핵심 원칙

- 성능 예산: **LCP 2.5초**
- 구현 후 반드시 시각 확인: chrome-devtools 스크린샷(모바일/데스크톱) + 본인 눈, 둘 다 통과해야 완료
- 반응형: Tailwind 내장 브레이크포인트(sm/md/lg/xl)만 사용 — 커스텀·별도 정의 금지
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

- create-next-app 기본 구조 (`app/` 라우터, src 디렉토리 없음)
- (Day 3 PRD 확정 후 실제 구조 반영)

## Agent skills

### Issue tracker

이슈는 GitHub Issues(`kjjyyy01/stackd`)에서 관리, `gh` CLI 사용. See `docs/agents/issue-tracker.md`.

### Triage labels

triage 상태 라벨은 캐노니컬 5종 그대로, 분류용 카테고리 라벨 9종(Feature/BugFix 등) 병용. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — 루트 `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.
