import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GitHub OAuth 콜백 — code를 세션으로 교환 후 next(내부 경로만)로 이동 (PRD-06)
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/";
  // 오픈 리다이렉트 방지 — "/"로 시작하되 "//"는 불허
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // 프록시(Vercel) 뒤에서는 원래 호스트로 복귀
      const forwardedHost = request.headers.get("x-forwarded-host");
      const base =
        process.env.NODE_ENV === "development" || !forwardedHost
          ? origin
          : `https://${forwardedHost}`;
      // EVT-AUTH-001 표식 — 착지 페이지에서 1회 발화 후 URL에서 지운다
      const dest = new URL(next, base);
      dest.searchParams.set("login", "github");
      return NextResponse.redirect(dest);
    }
  }

  // 실패 → 홈에서 ERR-CARD-005 토스트 (초안 유지)
  return NextResponse.redirect(`${origin}/?auth=failed`);
}
