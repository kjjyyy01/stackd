"use server";

import { redirect } from "next/navigation";
import { matchesHandle } from "@/lib/limits";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "./workflow";

// 탈퇴 (REQ-SET-004) — 삭제 대상은 세션 uid뿐, 입력으로 uid를 받지 않는다 (IDOR 차단)
// workflows는 FK cascade로 함께 삭제된다 (BR-020). 성공 시 세션을 끊고 홈으로
export async function deleteAccount(confirm: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims.sub;
  if (!userId) return { ok: false, code: "ERR-AUTH-001" };

  // 클라 disabled와 별개로 세션 핸들과 서버에서 재대조 (AC-2 · TC-SET-004-03)
  const handle = claims.claims.user_metadata?.user_name as string | undefined;
  if (!matchesHandle(confirm, handle)) return { ok: false, code: "ERR-SET-001" };

  // auth.users 삭제는 service role만 가능 (PRD-14 service role 3곳 중 1)
  const { error } = await createAdminClient().auth.admin.deleteUser(userId);
  if (error) return { ok: false, code: "ERR-SET-001" };

  await supabase.auth.signOut(); // 계정이 사라진 세션 쿠키를 남기지 않는다
  redirect("/");
}
