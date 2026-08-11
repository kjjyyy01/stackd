# ANIMATION.md — GSAP 모션 규칙

> Day 4~9에는 GSAP 코드 작성 금지 (PLAN.md). 이 문서의 미정 값은 Day 1(중점 축)·Day 10(모션 설계)에 채운다.

## 고정 규칙 (서비스 무관)

- **반응형 원칙**: Tailwind 브레이크포인트가 단일 기준 — 반응형 처리는 Tailwind 클래스로 우선 해결. JS 분기가 불가피한 경우(모바일 ScrollTrigger 미생성 등)에만 Tailwind config의 screens 값을 import해 matchMedia 사용 — **px 값 하드코딩 금지**
- **cleanup 규칙**: `ScrollTrigger.kill()`, `gsap.context()` revert 필수 — 언마운트 시 누수 없어야 함
- **`prefers-reduced-motion`**: 대응 필수 — 모션 축소 시에도 콘텐츠 전달에 문제 없어야 함
- **서버 렌더링 보존**: 애니메이션 적용 후에도 콘텐츠가 서버 렌더링 HTML에 존재해야 함 (SplitText 등으로 DOM을 쪼개도 원본 텍스트 접근성 유지)

## 이징 토큰

(Day 1 중점 축 확정 후 기입)

## 듀레이션 스케일

(Day 1 중점 축 확정 후 기입)

## 레퍼런스 사이트

(Day 1 확정 후 기입 — 애니메이션이 중점 축인 경우 1~2개)

## 모션 설계 (전체)

(Day 10 설계 후 기입)
