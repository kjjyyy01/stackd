# TODO.md — SCR 단위 작업 목록

> Day 3에 PRD 확정 후 SCR 단위로 채우고, 이후 매일 갱신한다.

## Day 0 잔여 (사용자)

- [x] 시작일 확정 — Day 1 = 2026-08-12(수), ~~Day 20 = 8/31(월)~~ → **Day 20 = 9/2(수), 게시 9/3(목)** (8/16 리사이즈 +2일, PLAN §일정 매핑)
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

## SCR 작업 목록 (기준: `docs/prd/` — Draft, 사용자 확정 시 Approved 전환)

### 선행 (Day 4 — 빌더가 이 데이터에 의존, 최우선)

- [ ] 카탈로그 수집 → `data/catalog.json` (스키마 PRD-05 — AI agent 100~200개 Claude Code 한정 + **개발 스택 60~80개**, enum 7종)
- [ ] 검수: 0번 카드(본인 스택)가 카탈로그만으로 전부 담기는지 확인
- [ ] GA4 초기화 (`NEXT_PUBLIC_GA_ID` env + gtag 셋업)
- [ ] 공통: 레이아웃·푸터(`/privacy` + 문의·피드백 dialog)·디자인 토큰 (DESIGN.md 기준)
- [ ] **테마 결정** — UI 단일 테마(라이트/다크) vs 둘 다 → DESIGN.md 기록 / 카드는 테마 비의존 고정 팔레트 명시 / `globals.css` create-next-app 잔재 `prefers-color-scheme: dark` 제거 (2026-08-15 논의, Day 4 결정)
- [ ] 폼 서비스 선정·연동 (OQ-005) — 신고·문의·피드백 dialog 전송용
- [ ] shadcn/ui 초기화 + 필요 컴포넌트만 add (버튼·입력·탭·배지·textarea) — 기본 테마 금지, DESIGN.md 토큰으로 재스킨
- [ ] sonner 토스트 셋업
- [ ] 제한 유틸 1개 (BR-001~004·007 — 빌더·디코드·OG 공용, tdd 대상)

### SCR-001 홈 `/` (PRD-SCR-001)

- [ ] 히어로 (h1 CPY-HOME-001 "스택으로, 인사를 건넨다" + 부제 CPY-HOME-008 + 예시 카드 이미지 priority)
- [ ] 빌더: 검색 + 카테고리 필터 + 카탈로그 그리드
- [ ] 직접 입력 폼 (BR-002 검증)
- [ ] 담은 스택 바 (칩 해제·카운터 n/12·CTA 게이트)
- [ ] localStorage 내 카드 저장·복원 + "내 카드 수정하기 / 새로 만들기" 버튼 (F-008, BR-009 — `/?s=` 프리필 없음)
- [ ] EVT-BLDR-001 발화
- [ ] 메타데이터 + 반응형 + 스크린샷·눈 확인

### SCR-002 붙여넣기 파싱 (PRD-SCR-002 — 컷 1순위, 뒤로 미룸)

- [ ] 탭 UI + textarea + 추출 버튼
- [ ] 파싱 로직 2형식 (BR-005 — tdd 대상)
- [ ] 폴백 안내 + EVT-PARSE-001

### SCR-003 카드 `/card` (PRD-SCR-003)

- [ ] 카드 컴포넌트 (영어 출력·**DEV / AI AGENT 2단** 카테고리 그룹핑·워터마크) — SCR-004와 공용
- [ ] **시그니처 템플릿 1종** 시안 (명함 톤) + 액센트 컬러 2~3택 + 12개 꽉 찬 레이아웃 검증 — 레퍼런스: DESIGN.md §카드 디자인 레퍼런스 (참고용, 복제 금지)
- [ ] 닉네임(필수)·소속/역할(선택) 입력 + 게이트 (BR-003·008)
- [ ] PNG 다운로드 (OQ-002 라이브러리 선정) + 링크 복사 (인코딩 유틸 — tdd 대상)
- [ ] QR로 건네기 다이얼로그 (utm_medium=qr — 생성은 경량 라이브러리 or SVG 함수, 구현 시 선정)
- [ ] EVT-CARD-001/002 발화
- [ ] 메타데이터(noindex) + 반응형 + 확인

### SCR-004 공유 카드 `/stack` (PRD-SCR-004)

- [ ] 서버 컴포넌트 디코드·렌더 (카드 컴포넌트 재사용, BR-006/007)
- [ ] `generateMetadata` 동적 title/OG
- [ ] `/api/og` ImageResponse (PRD-06 — 폴백·캐시·한글 폰트 OQ-003 해소)
- [ ] CTA (utm_source=card&utm_medium=share) + "내 카드 수정하기" 링크(BR-009 일치 시만, F-008) + 신고 dialog (EL-SHARE-004)
- [ ] 카톡/X 미리보기 육안 확인

### SCR-005 분석 고지 `/privacy` (PRD-SCR-005)

- [ ] 정적 본문 4개 내용 + 메타데이터 (30분 컷)

### 위생 항목 (SCR 밖 — Day 4~9 내)

- [ ] 404 페이지 / favicon / robots.txt / 정적 OG 이미지 / sitemap(`/`·`/privacy`만)
