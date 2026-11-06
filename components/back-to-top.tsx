"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// 맨 위로 FAB (EL-HOME-023, 홈 전용) — 1뷰포트 스크롤 후 표시 (REQ-HOME-009)
export default function BackToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // shadcn Button — 포커스 링·비활성 처리 공용, 크기·위치만 FAB 값(DESIGN.md 3rem)
    <Button
      variant="outline"
      size="icon"
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-50 size-12 rounded-full border-border bg-white/90 shadow-lg hover:bg-white ${
        on ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp />
    </Button>
  );
}
