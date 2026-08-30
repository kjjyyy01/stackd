"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = { className?: string; children: ReactNode };

// ⚠️ 판정용 임시 구현 (ANIMATION.md #5) — 본인 눈 판정 후 채택/컷 결정.
// 갤러리 그리드 li를 mount 시 60ms stagger fade-up.
// 컷 근거를 실증하는 지점: 상세 → 갤러리 복귀 시 morph 도착 슬롯이 opacity 0
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
