"use client";

import { useEffect, useState } from "react";

// 맨 위로 FAB (EL-HOME-023, 홈 전용) — 1뷰포트 스크롤 후 표시 (REQ-HOME-009)
export default function BackToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-white/90 text-lg shadow-lg transition-all hover:bg-white ${
        on ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
