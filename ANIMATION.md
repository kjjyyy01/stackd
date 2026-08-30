# ANIMATION.md — GSAP 모션 규칙

> Day 4~9에는 GSAP 코드 작성 금지 (PLAN.md). 이 문서의 미정 값은 Day 1(중점 축)·Day 10(모션 설계)에 채운다.

## 고정 규칙 (서비스 무관)

- **반응형 원칙**: Tailwind 브레이크포인트가 단일 기준 — 반응형 처리는 Tailwind 클래스로 우선 해결. JS 분기가 불가피한 경우(모바일 ScrollTrigger 미생성 등)에만 Tailwind config의 screens 값을 import해 matchMedia 사용 — **px 값 하드코딩 금지**
- **cleanup 규칙**: `ScrollTrigger.kill()`, `gsap.context()` revert 필수 — 언마운트 시 누수 없어야 함
- **`prefers-reduced-motion`**: 대응 필수 — 모션 축소 시에도 콘텐츠 전달에 문제 없어야 함
- **서버 렌더링 보존**: 애니메이션 적용 후에도 콘텐츠가 서버 렌더링 HTML에 존재해야 함 (SplitText 등으로 DOM을 쪼개도 원본 텍스트 접근성 유지)

## 모션 원칙 (Day 1 확정, 2026-08-12 — Stackd)

- **중점 축 = 애니메이션·비주얼** 확정. 우선 원칙: 비주얼 vs 성능 충돌 시 **성능 승** (LCP 2.5초)
- 카드의 비주얼이 곧 제품 — "공유하고 싶어지는" 순간(카드 생성·완성 연출)에 모션을 집중, 입력 동선은 즉각 반응 우선

## 이징 토큰 (Day 12 확정, 2026-08-30)

2종으로 제한 — 토큰이 늘면 일관성이 죽는다.

| 토큰 | GSAP | CSS 등가 | 용도 |
|---|---|---|---|
| `enter` | `power3.out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 모든 등장·진입 (기본값) |
| `move` | `power2.inOut` | `ease-in-out` 근사 | 이미 화면에 있는 요소의 이동 |

## 듀레이션 스케일 (Day 12 확정, 2026-08-30)

| 스케일 | 값 | 용도 |
|---|---|---|
| 상태 전이 | 150ms | hover·active·focus (기존 Tailwind `transition` 유지) |
| 뷰 전환 | 250ms | View Transition 기본값 (브라우저 기본 사용) |
| 등장 연출 | 500ms | 히어로·완성 연출의 개별 요소 |
| 오케스트레이션 상한 | 1.2s | 타임라인 총합이 이를 넘으면 컷 |
| stagger | 60ms / 150ms | 단계 레일 노드 / 히어로 채팅 장면 간격 |

## 레퍼런스 사이트 (Day 1 확정 — Day 10 설계 시 교체 가능)

1. **ray.so** — "붙여넣으면 아름다운 출력"의 기준점: 입력→출력 전환의 즉각성, 커스터마이즈 UI의 절제
2. **githubunwrapped.com** — 개발자 정체성 카드의 연출 기준점: 공유 욕구를 만드는 완성 연출("내 결과 자랑하기"까지의 모션 흐름)

## 모션 설계 (전체 — Day 12 확정, 2026-08-30)

> 기술 배분: **페이지 전환 = React `<ViewTransition>`**(Next 16 네이티브, 미지원 브라우저 자동 폴백) / **연출 = GSAP**(타임라인 시퀀싱이 필요한 2곳만). 목표 수준: ray.so의 "입력→출력 즉각성" + githubunwrapped의 완성 연출.

| # | 대상 | 용어 | 스펙 |
|---|---|---|---|
| 1 | 홈 히어로 슬라이드 1 | Orchestration + Stagger | GSAP 타임라인: 텍스트 열(h1·부제·CTA) fade-up 0.6s → 카톡 장면(말풍선1 → 말풍선2 → 카드 미리보기)이 채팅처럼 순차 등장, 각 0.5s·간격 0.15s·y 12px. `enter` 이징 |
| 2 | `/card` 카드 등장 | Scale in + Stagger | 컨테이너 `scale(0.96)+opacity 0 → 1` 0.5s + 단계 레일 노드 60ms stagger. 로드 즉시 시작(지연 금지 — 즉각성이 레퍼런스 기준) |
| 3 | 갤러리·`/me` → 상세 | Shared element transition | `<ViewTransition name={card-${id}}>`로 카드 페어링 — 그리드 카드가 상세 카드로 morph |
| 4 | 저장 → 상세 | Continuity transition | #3과 같은 name을 `/card` 미리보기에 부여. 상태 갱신·push 배칭 리스크는 수동 pending으로 해소 — **2026-08-30 프리뷰 실저장 판정: 정상(본인 확인)** |
| 5 | 갤러리 그리드 진입 | Stagger | mount 시 fade-up y 16px·0.5s·**60ms stagger** `enter` (`grid-stagger.tsx`) — 컷 권고(morph 페어 충돌 우려)였으나 **2026-08-30 프리뷰 본인 눈 판정으로 채택**, 충돌 미관측 |
| 6 | 홈 쇼케이스·과정 레일 | Scroll reveal (Slide in) | `[data-reveal="left|right"]` 요소별 트리거(`top 75%`·once) 가로 슬라이드 **x 64px·0.7s** `enter` — 쇼케이스: 텍스트←왼쪽·카드←오른쪽 / 레일 단계: 좌우 교차. 빈 값은 fade-up 폴백. 섹션 overflow-hidden 필수(모바일 패딩 16px < x) (2026-08-30 fade-up→가로 슬라이드, 강도 24px→64px·80%→75% 상향 — 둘 다 사용자 눈 판정) |

**기각** (find-animation-opportunities 게이트): 헤더 내비(고빈도 — 금지) · tool-picker(입력 동선 즉각 반응 원칙) · draft-banner(레이아웃 미는 배너라 등장 모션이 본문 점프를 연출) · 상세 단계 목록 리빌(읽는 콘텐츠) · Radix 계열(기본 모션 존재) · 빌더 단계 추가/삭제(마이크로 — backlog).

**reduced-motion 이중 가드**: ① GSAP은 CSS 킬스위치를 통과한다 — `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` 안에서만 등록. reduce 사용자는 숨김 자체가 실행되지 않아 콘텐츠 무손실. ② `::view-transition-*` 의사요소는 `*` 셀렉터에 안 잡힌다 — globals.css에 명시 규칙 필요.

**서버 렌더링 보존**: 초기 숨김은 CSS가 아니라 hydration 후 `gsap.set()` — JS 실패 시 콘텐츠가 그대로 보인다. 첫 페인트에 h1이 온전히 그려져 LCP도 애니메이션 이전에 기록된다.
