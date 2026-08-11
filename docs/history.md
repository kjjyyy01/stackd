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
