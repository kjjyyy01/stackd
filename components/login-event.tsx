"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

// ?auth= 사유별 안내 (PRD-09 세션 만료 · SCR-001 §6)
const AUTH_COPY: Record<string, string> = {
  required: "로그인이 필요해요", // CPY-COMMON-005 · ERR-AUTH-001 (인증 게이트 리다이렉트)
  failed: "GitHub 로그인이 완료되지 않았어요 — 다시 시도해주세요", // CPY-CARD-011 · ERR-CARD-005
};

// 인증 쿼리 파라미터를 1회만 처리하고 URL에서 지운다 (새로고침·공유 시 재발화 방지)
// ?login=github → EVT-AUTH-001 · ?auth={사유} → 토스트. ?edit= 등 다른 파라미터는 건드리지 않는다
export default function LoginEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const url = new URL(window.location.href);
    const login = url.searchParams.get("login");
    const auth = url.searchParams.get("auth");
    if (login !== "github" && !auth) return;

    fired.current = true;
    if (login === "github") track("login", { method: "github" });
    if (auth && AUTH_COPY[auth]) toast.error(AUTH_COPY[auth]);

    url.searchParams.delete("login");
    url.searchParams.delete("auth");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  return null;
}
