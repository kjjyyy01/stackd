"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { validateHiddenReason } from "@/lib/limits";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// 액션 게이트 — 페이지와 별개로 매번 재확인 (BR-022, PRD-09 "페이지·서버 액션 모두")
async function assertAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!isAdmin(data?.claims.sub, process.env.ADMIN_USER_IDS)) {
    redirect("/admin"); // 페이지 게이트가 404를 낸다 (§11 #1)
  }
}

// 숨김 토글 (REQ-ADMIN-003) — hidden=true면 사유 1~200자 필수 (BR-018)
export async function adminSetHidden(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "");
  const hidden = formData.get("hidden") === "true";
  if (!/^[0-9a-f]{8}$/.test(id)) redirect("/admin?err=ERR-ADMIN-002"); // BR-023

  let reason: string | null = null;
  if (hidden) {
    const parsed = validateHiddenReason(formData.get("reason"));
    if (!parsed.ok) redirect("/admin?err=ERR-ADMIN-002");
    reason = parsed.value;
  }

  // updated_at 갱신 = OG 캐시 버스팅 키 (PRD-05)
  const { error } = await createAdminClient()
    .from("workflows")
    .update({ hidden, hidden_reason: reason, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) redirect("/admin?err=ERR-ADMIN-002");
  revalidatePath("/admin");
  redirect("/admin");
}

// 처리 완료 (REQ-ADMIN-004) — 되돌리기 없음, 중복 호출은 멱등
export async function adminResolve(formData: FormData) {
  await assertAdmin();

  const feedbackId = Number(formData.get("feedbackId"));
  if (!Number.isInteger(feedbackId) || feedbackId <= 0) redirect("/admin?err=ERR-ADMIN-002");

  const { error } = await createAdminClient()
    .from("feedback")
    .update({ resolved: true })
    .eq("id", feedbackId);

  if (error) redirect("/admin?err=ERR-ADMIN-002");
  revalidatePath("/admin");
  redirect("/admin");
}
