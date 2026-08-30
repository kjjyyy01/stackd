"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { className?: string; children: ReactNode };

// 스크롤 리빌 셸 (ANIMATION.md #6) — [data-reveal] 자식을 진입 시 1회 등장.
// 요소별 트리거라 스크롤 속도가 곧 stagger — 인위적 지연 없음.
// 숨김은 hydration 후 gsap이 건다 — JS 실패 시 서버 HTML 그대로 보인다
export default function ScrollReveal({ className, children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // reduce 사용자는 등록 자체를 안 한다 — CSS 킬스위치는 GSAP을 못 막는다
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      for (const el of root.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? []) {
        // 값 left/right = 가로 슬라이드, 빈 값 = fade-up
        const dir = el.dataset.reveal;
        gsap.from(el, {
          x: dir === "left" ? -64 : dir === "right" ? 64 : 0,
          y: dir ? 0 : 16,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          // 75% — 요소가 화면 안쪽에 들어온 뒤 재생돼야 이동이 눈에 담긴다
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }
    });
    return () => mm.revert(); // 컨텍스트가 ScrollTrigger까지 정리 (cleanup 규칙)
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
