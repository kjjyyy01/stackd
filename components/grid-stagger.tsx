"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = { className?: string; children: ReactNode };

// 갤러리 그리드 진입 stagger (ANIMATION.md #5) — mount 시 60ms 간격 fade-up.
// 복귀 morph와의 충돌은 2026-08-30 본인 눈 판정에서 미관측 — 채택 확정
export default function GridStagger({ className, children }: Props) {
  const root = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.current?.children ?? [], {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06, // ANIMATION.md #5 = 30~80ms
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <ul ref={root} className={className}>
      {children}
    </ul>
  );
}
