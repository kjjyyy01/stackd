"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { children: ReactNode; slideCount: number };

// 캐러셀 셸 (EL-HOME-016) — 슬라이드는 서버 렌더 children, 여기는 화살표·카운터만.
// 스와이프는 CSS scroll-snap이라 JS 없이도 동작 (REQ-HOME-008 AC-4)
// lg 미만은 캐러셀을 풀고 세로 스택 — 콘텐츠가 뷰포트(780px)를 99px 넘어
// 가로 스와이프와 세로 스크롤이 충돌했다 (390×844 실측, 2026-08-28)
export default function HomeCarousel({ children, slideCount }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  // 보이는 슬라이드로 카운터 갱신 — 스와이프·화살표 공용
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = Array.from(el.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(slides.indexOf(e.target) + 1);
        }
      },
      { root: el, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (dir: -1 | 1) => {
    const el = track.current;
    el?.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  // xl+에서만 — lg 이하는 콘텐츠(max-w-6xl)가 뷰포트를 채워 화살표가 본문과 겹친다 (2026-08-25 실측)
  const arrowCls =
    "absolute top-1/2 z-10 hidden size-13 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-xl transition-colors hover:bg-white xl:flex";

  return (
    <div className="relative">
      <div
        ref={track}
        tabIndex={0}
        aria-label="문제와 해결 슬라이드"
        className="no-scrollbar flex flex-col lg:snap-x lg:snap-mandatory lg:flex-row lg:overflow-x-auto"
      >
        {children}
      </div>
      <button type="button" aria-label="이전 슬라이드" onClick={() => go(-1)} className={`${arrowCls} left-5`}>
        ←
      </button>
      <button type="button" aria-label="다음 슬라이드" onClick={() => go(1)} className={`${arrowCls} right-5`}>
        →
      </button>
      <span
        aria-hidden
        className="absolute bottom-4 right-4 z-10 hidden rounded-full bg-foreground/70 px-3 py-1.5 font-mono text-xs font-medium tracking-[0.08em] text-white lg:block"
      >
        {current} / {slideCount}
      </span>
    </div>
  );
}
