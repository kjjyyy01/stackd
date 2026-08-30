/// <reference types="react/canary" />
// ViewTransition 타입 활성화 — 타입 전용이라 번들에 흔적 없음, 프로젝트에 1회면 충분
import { ViewTransition } from "react";
import type { ReactNode } from "react";

// 카드 morph 페어링 (ANIMATION.md #3·#4) — 라우트 간 같은 name끼리 연결.
// default="none": 이름 있는 카드가 무관한 전환마다 각자 crossfade하는 것을 막는다.
// 미지원 브라우저는 일반 내비게이션으로 폴백 (Next 16 네이티브, 설정 0)
export default function CardTransition({ id, children }: { id: string; children: ReactNode }) {
  return (
    <ViewTransition name={`card-${id}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
