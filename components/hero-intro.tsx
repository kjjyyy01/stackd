"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = { className?: string; children: ReactNode };

// 히어로 오케스트레이션 (ANIMATION.md #1) — 셸만 클라이언트, 콘텐츠는 서버 children.
// 숨김은 hydration 후 gsap이 건다 — JS 실패 시 서버 HTML이 그대로 보인다
export default function HeroIntro({ className, children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // reduce 사용자는 등록 자체를 안 한다 — CSS 킬스위치는 GSAP을 못 막는다
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // 텍스트 열 fade-up → 카톡 장면이 채팅처럼 순차 등장 (총 1.05s ≤ 상한 1.2s)
      tl.from('[data-hero="text"]', { y: 12, opacity: 0, duration: 0.6 }).from(
        '[data-hero="chat"] > *',
        { y: 12, opacity: 0, duration: 0.5, stagger: 0.15 },
        0.25,
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
