"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// GitHub 로그인 시작 — 완료 후 /auth/callback?next=… 로 복귀 (PRD-06)
export async function signInWithGitHub(formData: FormData) {
  const next = String(formData.get("next") ?? "/");
  const supabase = await createClient();

  // 요청 헤더에서 현재 origin 유도 — 로컬/프리뷰/프로덕션 공용
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) redirect("/?auth=failed");
  redirect(data.url);
}

// 로그아웃 후 홈으로
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
