import "server-only";
import { createClient } from "@supabase/supabase-js";

// service role = RLS 우회. 쓰는 곳은 feedback·admin·탈퇴 3곳뿐 (PRD-06)
// "server-only"가 클라이언트 번들에 섞이면 빌드가 실패한다 — 시크릿 유출 방지
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
