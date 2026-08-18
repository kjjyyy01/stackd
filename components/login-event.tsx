"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// EVT-AUTH-001 — 콜백이 붙인 ?login=github을 보고 1회만 발화 후 URL에서 지운다
export default function LoginEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("login") !== "github") return;

    fired.current = true;
    track("login", { method: "github" });

    url.searchParams.delete("login");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  return null;
}
